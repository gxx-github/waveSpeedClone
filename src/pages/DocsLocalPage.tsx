import React, { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import 'prism-themes/themes/prism-vs.min.css';
import GithubSlugger from 'github-slugger';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// 动态导入 docs 目录下的所有 md 文件
const docsModules = import.meta.glob('../docs/**/*.md', { as: 'raw' });

type DocIndex = Record<string, { path: string; title: string }>;

const Container = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 1rem;
  padding: 1rem 2rem;
  width: 100%;
  flex: 1;
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 72px;
  align-self: start;
  max-height: calc(100vh - 72px);
  overflow: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding-right: 1rem;
`;

const Main = styled.section`
  min-height: calc(100vh - 72px);
  padding-bottom: 2rem;
`;

const MarkdownBody = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  word-break: break-word;

  h1, h2, h3, h4, h5, h6 {
    margin: 1.2em 0 0.6em;
    font-weight: 700;
    line-height: 1.3;
  }
  h1 { font-size: 1.8rem; }
  h2 { font-size: 1.6rem; }
  h3 { font-size: 1.4rem; }
  h4 { font-size: 1.2rem; }
  h5 { font-size: 1.05rem; }
  h6 { font-size: 1rem; opacity: 0.9; }

  p { margin: 0.8em 0; }
  ul, ol { padding-left: 1.5em; margin: 0.6em 0; }
  li { margin: 0.3em 0; }

  a { color: ${({ theme }) => theme.colors.primary}; text-decoration: none; }
  a:hover { text-decoration: underline; }

  hr {
    border: none;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
    margin: 1.5rem 0;
  }

  code { 
    background: ${({ theme }) => theme.colors.surface};
    padding: 0.15em 0.35em;
    border-radius: 4px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.95em;
  }

  pre code {
    background: transparent;
    padding: 0;
  }

  pre {
    background: ${({ theme }) => theme.colors.cardBackground};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 1rem;
    overflow: auto;
    box-shadow: 0 1px 0 rgba(0,0,0,0.02) inset;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }
  th, td {
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 0.5rem 0.75rem;
    text-align: left;
  }
  thead { background: ${({ theme }) => theme.colors.surface}; }

  img { max-width: 100%; height: auto; border-radius: 6px; }

  blockquote {
    margin: 1rem 0;
    padding: 0.75rem 1rem;
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
    border-radius: 0 8px 8px 0;
  }

  kbd {
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-bottom-width: 2px;
    padding: 0.1em 0.4em;
    border-radius: 4px;
    font-size: 0.85em;
  }

  mark {
    background: #fff3bf;
    padding: 0 0.2em;
    border-radius: 2px;
  }
`;

const NavItem = styled(Link)<{ $active?: boolean }>`
  display: block;
  padding: 0.5rem 0.25rem;
  border-radius: 0.5rem;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  font-weight: 500;
  &:hover { color: ${({ theme }) => theme.colors.primary}; }
`;

const Toc = styled.div`
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
`;

const TocItem = styled.a<{ $level: number; $active?: boolean }>`
  display: block;
  padding: 0.25rem 0.25rem;
  margin-left: ${({ $level }) => ($level - 1) * 12}px;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  font-size: 0.9rem;
  text-decoration: none;
  &:hover { color: ${({ theme }) => theme.colors.primary}; }
`;

function normalizeKey(key: string): string {
  // ../docs/docs/docs-api/alibaba/alibaba-qwen-image-translate.md -> docs/docs-api/alibaba/alibaba-qwen-image-translate
  const noPrefix = key.replace(/^\.\.\//, '');
  const withoutRoot = noPrefix.replace(/^docs\//, '');
  return withoutRoot.replace(/\.md$/, '');
}

const DocsLocalPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const index: DocIndex = useMemo(() => {
    const idx: DocIndex = {};
    for (const fullPath of Object.keys(docsModules)) {
      const key = normalizeKey(fullPath);
      const title = key
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      idx[key] = { path: fullPath, title };
    }
    return idx;
  }, []);

  const slug = new URLSearchParams(location.search).get('p') || 'docs/docs';
  const firstKey = useMemo(() => Object.keys(index).sort()[0], [index]);
  const fallback = index[slug] ? slug : (index['docs/docs'] ? 'docs/docs' : (firstKey || ''));
  const active = fallback;

  const [Content, setContent] = useState<string>('');
  const [toc, setToc] = useState<Array<{ text: string; id: string; level: number }>>([]);

  useEffect(() => {
    const mod = index[active]?.path ? docsModules[index[active].path] : undefined;
    if (!mod) return setContent('# 未找到文档');
    (async () => {
      // @ts-ignore - vite glob returns function
      const raw: string = await mod();
      setContent(raw);
    })();
  }, [active, index]);

  useEffect(() => {
    const lines = Content.split('\n');
    const slugger = new GithubSlugger();
    const items: Array<{ text: string; id: string; level: number }> = [];
    for (const line of lines) {
      const m = /^(#{1,4})\s+(.+)$/.exec(line.trim());
      if (m) {
        const level = m[1].length;
        const text = m[2].replace(/[#`*_/()]/g, '').trim();
        const id = slugger.slug(text);
        items.push({ text, id, level });
      }
    }
    setToc(items);
  }, [Content]);

  const navItems = useMemo(() => {
    return Object.entries(index)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, meta]) => {
        const last = key.split('/').pop() || key;
        const title = last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        return (
          <NavItem key={key} to={`?p=${encodeURIComponent(key)}`} $active={key === active}>
            {title}
          </NavItem>
        );
      });
  }, [index, active]);

  return (
    <Container>
      <Sidebar>
        {navItems}
        {toc.length > 0 && (
          <Toc>
            {toc.map((h) => (
              <TocItem key={h.id} href={`#${h.id}`} $level={h.level}>
                {h.text}
              </TocItem>
            ))}
          </Toc>
        )}
      </Sidebar>
      <Main>
        <MarkdownBody>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              [rehypePrism, { ignoreMissing: true }],
            ]}
            components={{
              table: (props: React.HTMLAttributes<HTMLTableElement>) => (<table {...props} />),
              blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (<blockquote {...props} />),
              a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (<a {...props} target="_blank" rel="noreferrer" />),
            }}
          >
            {Content}
          </ReactMarkdown>
        </MarkdownBody>
      </Main>
    </Container>
  );
};

export default DocsLocalPage;


