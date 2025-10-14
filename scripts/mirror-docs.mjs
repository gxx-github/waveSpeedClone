import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const START_URL = process.env.DOCS_URL || 'https://wavespeed.ai/docs/docs';
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const BASE_PREFIX = '/wavespeed-docs';
const OUTPUT_DIR = path.join(PUBLIC_DIR, BASE_PREFIX);
const SAME_HOST_ONLY = true;
const ALLOW_PATH_PREFIX = '/docs';
const MAX_PAGES = Number(process.env.MAX_PAGES || 60);

async function ensureDir(dir) { await fs.mkdir(dir, { recursive: true }); }

function toLocalAssetPath(u) {
    const url = new URL(u);
    return path.join(OUTPUT_DIR, url.pathname);
}

function toLocalPagePath(u) {
    const url = new URL(u);
    const p = url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
    return path.join(OUTPUT_DIR, p, 'index.html');
}

function toLocalHref(u) {
    const url = new URL(u);
    // 将绝对路径改写为 /wavespeed-docs + 原路径
    return BASE_PREFIX + url.pathname + (url.pathname.endsWith('/') ? '' : '/');
}

async function fetchText(url) {
    const res = await fetch(url, { headers: { 'user-agent': 'wavespeed-mirror/1.0' } });
    if (!res.ok) throw new Error(`Fetch ${url} failed: ${res.status}`);
    return await res.text();
}

async function fetchBuffer(url) {
    const res = await fetch(url, { headers: { 'user-agent': 'wavespeed-mirror/1.0' } });
    if (!res.ok) throw new Error(`Fetch ${url} failed: ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
}

function discoverLinks(html, baseUrl) {
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const out = new Set();
    document.querySelectorAll('a[href]').forEach((a) => {
        try {
            const u = new URL(a.getAttribute('href'), baseUrl);
            if (SAME_HOST_ONLY && u.host !== new URL(baseUrl).host) return;
            u.hash = '';
            if (!u.pathname.startsWith(ALLOW_PATH_PREFIX)) return;
            out.add(u.href);
        } catch {}
    });
    return Array.from(out);
}

function collectAssets(dom, baseUrl) {
    const { document } = dom.window;
    const urls = new Set();
    const push = (val) => {
        try { urls.add(new URL(val, baseUrl).href); } catch {}
    };
    document.querySelectorAll('link[rel="stylesheet"][href]').forEach((el) => push(el.getAttribute('href')));
    document.querySelectorAll('script[src]').forEach((el) => push(el.getAttribute('src')));
    document.querySelectorAll('img[src]').forEach((el) => push(el.getAttribute('src')));
    return Array.from(urls);
}

async function rewriteAndSavePage(url, html) {
    const dom = new JSDOM(html);
    const { document } = dom.window;

    // 重写站内链接为 /wavespeed-docs 前缀
    document.querySelectorAll('a[href]').forEach((a) => {
        try {
            const u = new URL(a.getAttribute('href'), url);
            if (u.host !== new URL(url).host) return;
            if (!u.pathname.startsWith(ALLOW_PATH_PREFIX)) return;
            a.setAttribute('href', toLocalHref(u.href));
        } catch {}
    });

    // 重写静态资源为本地路径
    const rewriteSrc = (el, attr) => {
        const v = el.getAttribute(attr);
        if (!v) return;
        try {
            const u = new URL(v, url);
            el.setAttribute(attr, BASE_PREFIX + u.pathname);
        } catch {}
    };
    document.querySelectorAll('link[rel="stylesheet"][href]').forEach((el) => rewriteSrc(el, 'href'));
    document.querySelectorAll('script[src]').forEach((el) => rewriteSrc(el, 'src'));
    document.querySelectorAll('img[src]').forEach((el) => rewriteSrc(el, 'src'));

    // 注入 <base>，确保相对路径解析
    const head = document.querySelector('head');
    if (head && !document.querySelector('base')) {
        const baseEl = document.createElement('base');
        baseEl.setAttribute('href', BASE_PREFIX + '/');
        head.prepend(baseEl);
    }

    const outPath = toLocalPagePath(url);
    await ensureDir(path.dirname(outPath));
    await fs.writeFile(outPath, '<!DOCTYPE html>\n' + dom.serialize(), 'utf8');
    return dom;
}

async function saveAsset(u) {
    const out = toLocalAssetPath(u);
    await ensureDir(path.dirname(out));
    const buf = await fetchBuffer(u);
    await fs.writeFile(out, buf);
}

async function crawl(startUrl) {
    const queue = [startUrl];
    const visited = new Set();
    let count = 0;
    await ensureDir(OUTPUT_DIR);

    while (queue.length && count < MAX_PAGES) {
        const url = queue.shift();
        if (!url || visited.has(url)) continue;
        visited.add(url);
        console.log('Page:', url);
        try {
            const html = await fetchText(url);
            const dom = await rewriteAndSavePage(url, html);
            count += 1;
            // 下载资产
            const assets = collectAssets(dom, url);
            for (const a of assets) {
                try { await saveAsset(a); } catch (e) { console.warn('Asset fail', a, e.message); }
            }
            // 发现更多页面
            const more = discoverLinks(html, url);
            for (const m of more)
                if (!visited.has(m)) queue.push(m);
        } catch (e) {
            console.warn('Skip page', url, e.message);
        }
    }
    console.log(`Mirrored ${count} pages -> ${OUTPUT_DIR}`);
}

crawl(START_URL).catch((e) => {
    console.error(e);
    process.exit(1);
});