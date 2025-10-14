import fs from 'node:fs/promises';
import path from 'node:path';
import TurndownService from 'turndown';
import puppeteer from 'puppeteer';

const START_URL = process.env.DOCS_URL || 'https://wavespeed.ai/docs/docs';
const OUTPUT_DIR = path.resolve(process.cwd(), 'src/docs');
const ASSET_DIR = path.resolve(process.cwd(), 'public/docs-assets');
const MAX_PAGES = Number(process.env.MAX_PAGES || 200);
const SAME_HOST_ONLY = true;
const ALLOW_PATH_PREFIX = '/docs';

async function ensureDir(dir) { await fs.mkdir(dir, { recursive: true }); }

function slugifyPath(u) {
    const url = new URL(u);
    let p = url.pathname.replace(/^\/+/, '').replace(/\/$/, '');
    if (!p) p = 'README';
    return p.replace(/[^a-zA-Z0-9/_-]+/g, '-');
}

async function saveMarkdown(markdown, relPath) {
    const outPath = path.join(OUTPUT_DIR, `${relPath}.md`);
    await ensureDir(path.dirname(outPath));
    await fs.writeFile(outPath, markdown, 'utf8');
}

async function downloadAsset(page, srcUrl) {
    try {
        const url = new URL(srcUrl);
        const outPath = path.join(ASSET_DIR, url.pathname);
        await ensureDir(path.dirname(outPath));
        const res = await fetch(srcUrl);
        if (!res.ok) return;
        const buf = Buffer.from(await res.arrayBuffer());
        await fs.writeFile(outPath, buf);
    } catch {}
}

function discoverLinksFromHtml(html, base) {
    const links = new Set();
    const regex = /href=\"([^\"]+)\"/g;
    let m;
    while ((m = regex.exec(html))) {
        try {
            const u = new URL(m[1], base);
            if (SAME_HOST_ONLY && u.host !== new URL(base).host) continue;
            u.hash = '';
            if (!u.pathname.startsWith(ALLOW_PATH_PREFIX)) continue;
            links.add(u.href);
        } catch {}
    }
    return Array.from(links);
}

async function autoScroll(page) {
    await page.evaluate(async() => {
        await new Promise((resolve) => {
            let total = 0;
            const distance = 600;
            const timer = setInterval(() => {
                const { scrollHeight } = document.body;
                window.scrollBy(0, distance);
                total += distance;
                if (total >= scrollHeight - window.innerHeight - 50) {
                    clearInterval(timer);
                    resolve();
                }
            }, 150);
        });
    });
}

async function run() {
    await ensureDir(OUTPUT_DIR);
    await ensureDir(ASSET_DIR);

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setUserAgent('wavespeed-md-scraper/1.0');

    const queue = [START_URL];
    const visited = new Set();
    const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
    let count = 0;

    while (queue.length && count < MAX_PAGES) {
        const url = queue.shift();
        if (!url || visited.has(url)) continue;
        visited.add(url);

        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
            await autoScroll(page);
            // 某些页面有分页/折叠，尝试展开常见折叠元素
            await page.evaluate(() => {
                document.querySelectorAll('details').forEach((d) => (d.open = true));
                document.querySelectorAll('[aria-expanded="false"]').forEach((el) => el.setAttribute('aria-expanded', 'true'));
            });
            const html = await page.content();

            // 抓取主区域（如果有 main），否则用 body
            const mainHtml = await page.evaluate(() => {
                const main = document.querySelector('main') || document.body;
                // 移除无关节点
                main.querySelectorAll('script, style, noscript').forEach((el) => el.remove());
                return main.innerHTML;
            });

            // 下载图片资源，并重写到 /docs-assets 路径
            const imgSrcs = await page.$$eval('img[src]', (imgs) => imgs.map((i) => i.getAttribute('src')));
            for (const src of imgSrcs) {
                try {
                    const abs = new URL(src, url).href;
                    await downloadAsset(page, abs);
                } catch {}
            }

            const rewrittenHtml = mainHtml.replace(/(<img[^>]+src=")([^"]+)(")/g, (m, p1, p2, p3) => {
                try {
                    const abs = new URL(p2, url);
                    return `${p1}/docs-assets${abs.pathname}${p3}`;
                } catch { return m; }
            });

            const md = turndown.turndown(rewrittenHtml);
            const header = `# ${new URL(url).pathname}\n\n来源: ${url}\n\n`;
            const slug = slugifyPath(url);
            await saveMarkdown(header + md, slug);
            count += 1;

            // 发现更多链接
            const more = discoverLinksFromHtml(html, url);
            for (const m of more)
                if (!visited.has(m)) queue.push(m);
            console.log('Saved:', slug);
        } catch (e) {
            console.warn('Skip', url, e.message);
        }
    }

    await browser.close();
    console.log('Done. Saved', count, 'pages to', OUTPUT_DIR);
}

run().catch((e) => {
    console.error(e);
    process.exit(1);
});