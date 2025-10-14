import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const START_URL = process.env.DOCS_URL || 'https://wavespeed.ai/docs/docs';
const OUTPUT_DIR = path.resolve(__dirname, '../src/docs');
const MAX_PAGES = Number(process.env.MAX_PAGES || 20);
const SAME_HOST_ONLY = true;
const ALLOW_PATH_PREFIX = '/docs';

function slugify(input) {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9\/_-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/\/-/g, '/')
        .replace(/(^-|-$)/g, '');
}

async function ensureDir(dir) {
    await fs.mkdir(dir, { recursive: true });
}

async function saveMarkdown(markdown, outPath) {
    await ensureDir(path.dirname(outPath));
    await fs.writeFile(outPath, markdown, 'utf8');
}

function extractMainContent(html, baseUrl) {
    const dom = new JSDOM(html);
    const { document } = dom.window;
    // 尝试选择主内容节点，否则退回 body
    const main = document.querySelector('main') || document.querySelector('#__next') || document.body;
    // 移除脚本/样式
    main.querySelectorAll('script, style, noscript').forEach((el) => el.remove());
    // 绝对化链接
    main.querySelectorAll('a[href]').forEach((a) => {
        try {
            const u = new URL(a.getAttribute('href'), baseUrl);
            a.setAttribute('href', u.href);
        } catch {}
    });
    return main.innerHTML;
}

async function fetchPage(url) {
    const res = await fetch(url, { headers: { 'user-agent': 'wavespeed-clone/1.0' } });
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    return await res.text();
}

function discoverLinks(html, baseUrl) {
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const links = new Set();
    document.querySelectorAll('a[href]').forEach((a) => {
        try {
            const u = new URL(a.getAttribute('href'), baseUrl);
            if (SAME_HOST_ONLY && u.host !== new URL(baseUrl).host) return;
            if (!u.pathname.startsWith(ALLOW_PATH_PREFIX)) return;
            // 过滤锚点
            u.hash = '';
            links.add(u.href);
        } catch {}
    });
    return Array.from(links);
}

async function crawl(startUrl) {
    const queue = [startUrl];
    const visited = new Set();
    const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

    let count = 0;
    await ensureDir(OUTPUT_DIR);

    while (queue.length && count < MAX_PAGES) {
        const url = queue.shift();
        if (!url || visited.has(url)) continue;
        visited.add(url);
        console.log(`Fetching: ${url}`);
        try {
            const html = await fetchPage(url);
            const mainHtml = extractMainContent(html, url);
            const md = turndown.turndown(mainHtml);
            const u = new URL(url);
            const name = slugify(u.pathname.replace(/^\/+/, '').replace(/\/$/, '')) || 'README';
            const outName = name.endsWith('.md') ? name : `${name}.md`;
            const outPath = path.join(OUTPUT_DIR, outName);
            const withHeader = `# ${u.pathname}\n\n来源: ${u.href}\n\n` + md;
            await saveMarkdown(withHeader, outPath);
            count += 1;
            const more = discoverLinks(html, url);
            for (const link of more) {
                if (!visited.has(link)) queue.push(link);
            }
        } catch (e) {
            console.warn(`Skip ${url}:`, e.message);
        }
    }
    console.log(`Done. Saved ${count} pages under ${OUTPUT_DIR}`);
}

crawl(START_URL).catch((e) => {
    console.error(e);
    process.exit(1);
});