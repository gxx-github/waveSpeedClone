import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = command === 'build' || mode === 'production';
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: [
        "same-runtime/dist/jsx-dev-runtime",
        "same-runtime/dist/jsx-runtime",
      ],
    },
    define: {
      // 确保环境变量在构建时可用
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify('http://47.242.127.155:8000'),
    },
    server: {
      port: 8000,
      host: '0.0.0.0',
      // 只在开发环境使用代理
      ...(isProduction ? {} : {
        proxy: {
          // 确保前端路由 /auth/callback 由 SPA 处理，而不是被代理到后端
          '/auth/callback': {
            target: 'http://47.242.127.155:8000',
            changeOrigin: true,
            secure: false,
            bypass: (req, _res) => {
              if (req.url && req.url.startsWith('/auth/callback')) {
                // 让 Vite 返回 index.html，从而进入 React Router 的 OAuthCallback 页面
                return '/index.html';
              }
            },
          },
          // 同样处理 /auth/google/callback 以兼容后端固定回调路径
          '/auth/google/callback': {
            target: 'http://47.242.127.155:8000',
            changeOrigin: true,
            secure: false,
            // 仅当浏览器直接打开回调路径（期望HTML）时返回 index.html；
            // XHR/Fetch（Accept: application/json 或带 X-Requested-With）则走真实后端返回 JSON。
            bypass: (req, _res) => {
              const accept = (req.headers && (req.headers as any)['accept']) || '';
              const xrw = (req.headers && (req.headers as any)['x-requested-with']) || '';
              const isHtml = typeof accept === 'string' && accept.includes('text/html');
              const isGet = req.method === 'GET';
              const isAjax = typeof xrw === 'string' && xrw.toLowerCase() === 'xmlhttprequest';
              if (req.url && req.url.startsWith('/auth/google/callback') && isGet && isHtml && !isAjax) {
                return '/index.html';
              }
              // 其他情况不处理，交由代理到后端
            },
          },
          // 代理所有 /api 请求到后端
          '/api': {
            target: 'http://47.242.127.155:8000',
            changeOrigin: true,
            secure: false,
            configure: (proxy, _options) => {
              proxy.on('error', (err, _req, _res) => {
                console.log('proxy error', err);
              });
              proxy.on('proxyReq', (proxyReq, req, _res) => {
                console.log('Sending Request to the Target:', req.method, req.url);
              });
              proxy.on('proxyRes', (proxyRes, req, _res) => {
                console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
              });
            },
          },
          // 代理所有 /api 请求到后端
          '/users': {
            target: 'http://47.242.127.155:8000',
            changeOrigin: true,
            secure: false,
            configure: (proxy, _options) => {
              proxy.on('error', (err, _req, _res) => {
                console.log('proxy error', err);
              });
              proxy.on('proxyReq', (proxyReq, req, _res) => {
                console.log('Sending Request to the Target:', req.method, req.url);
              });
              proxy.on('proxyRes', (proxyRes, req, _res) => {
                console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
              });
            },
          },
          // 代理所有 /auth 请求到后端
          '/auth': {
            target: 'http://47.242.127.155:8000',
            changeOrigin: true,
            secure: false,
            bypass: (req, _res) => {
              if (req.url && (req.url.startsWith('/auth/callback') || req.url.startsWith('/auth/google/callback'))) {
                // 避免 /auth/callback 被此规则代理
                return '/index.html';
              }
            },
            configure: (proxy, _options) => {
              proxy.on('error', (err, _req, _res) => {
                console.log('proxy error', err);
              });
              proxy.on('proxyReq', (proxyReq, req, _res) => {
                console.log('Sending Request to the Target:', req.method, req.url);
              });
              proxy.on('proxyRes', (proxyRes, req, _res) => {
                console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
              });
            },
          },
          // 代理所有 /docs 请求到后端（用于API文档）
          '/docs': {
            target: 'http://47.242.127.155:8000',
            changeOrigin: true,
            secure: false,
          },
        },
      }),
    },
  };
});
