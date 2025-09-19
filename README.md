# WaveSpeed Clone 部署文档

## 项目概述

这是一个基于 React + TypeScript + Vite 的前端项目，使用 styled-components 进行样式管理，支持 Google OAuth 认证。

## 技术栈

- **前端框架**: React 18.3.1
- **构建工具**: Vite 6.3.5
- **语言**: TypeScript 5.6.3
- **样式**: styled-components 6.1.19
- **路由**: React Router DOM 7.7.0
- **包管理器**: Bun / Yarn

## 环境要求

- Node.js >= 18.0.0
- Bun >= 1.0.0 (推荐) 或 Yarn >= 1.22.0
- 现代浏览器支持 ES2020+

## 环境配置

### 1. 环境变量文件

项目包含以下环境变量文件：

- `.env` - 开发环境配置
- `.env.production` - 生产环境配置  
- `.env.example` - 环境变量示例文件

#### 环境变量说明

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `VITE_API_BASE_URL` | API 服务器地址 | `http://47.242.127.155:8000` |

### 2. 配置环境变量

#### 开发环境
```bash
# 复制示例文件
cp .env.example .env

# 编辑 .env 文件，设置正确的 API 地址
VITE_API_BASE_URL=http://your-api-server.com:8000
```

#### 生产环境
```bash
# 编辑 .env.production 文件
VITE_API_BASE_URL=https://your-production-api.com
```

## 本地开发

### 1. 安装依赖

```bash
# 使用 Bun (推荐)
bun install

# 或使用 Yarn
yarn install

# 或使用 npm
npm install
```

### 2. 启动开发服务器

```bash
# 使用 Bun
bun run dev

# 或使用 Yarn
yarn dev

# 或使用 npm
npm run dev
```

开发服务器将在 `http://localhost:3000` 启动。

### 3. 其他开发命令

```bash
# 类型检查
bun run lint

# 代码格式化
bun run format

# 构建项目
bun run build

# 预览构建结果
bun run preview
```

## 生产部署

### 1. 构建项目

```bash
# 构建生产版本
bun run build

# 构建文件将输出到 dist/ 目录
```

### 2. 部署选项

#### 选项 1: Netlify 部署 (推荐)

项目已配置 Netlify 部署：

1. **连接 GitHub 仓库**
   - 登录 [Netlify](https://netlify.com)
   - 点击 "New site from Git"
   - 选择 GitHub 仓库

2. **配置构建设置**
   - Build command: `bun run build`
   - Publish directory: `dist`
   - 环境变量在 Netlify 控制台设置

3. **设置环境变量**
   在 Netlify 控制台的 Site settings > Environment variables 中添加：
   ```
   VITE_API_BASE_URL=https://your-production-api.com
   ```

4. **自动部署**
   - 推送到主分支将自动触发部署
   - 每次构建都会生成预览链接

#### 选项 2: Vercel 部署

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **部署**
   ```bash
   vercel --prod
   ```

3. **配置环境变量**
   在 Vercel 控制台设置环境变量

#### 选项 3: 静态文件服务器

1. **构建项目**
   ```bash
   bun run build or yarn build
   ```

2. **上传 dist/ 目录**
   将 `dist/` 目录内容上传到任何静态文件服务器

3. **配置服务器**
   确保服务器支持 SPA 路由重定向（所有路由都指向 `index.html`）

### 3. 服务器配置

#### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理（如果需要）
    location /api/ {
        proxy_pass http://your-api-server.com:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Apache 配置示例

在 `dist/` 目录创建 `.htaccess` 文件：

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## 环境变量管理

### 开发环境
- 使用 `.env` 文件
- 文件已添加到 `.gitignore`，不会提交到版本控制

### 生产环境
- 使用 `.env.production` 文件
- 或在部署平台设置环境变量
- 确保敏感信息不会暴露在客户端代码中

## 构建优化

### 1. 代码分割
项目已配置自动代码分割，按路由和组件自动分割代码。

### 2. 资源优化
- 图片自动压缩
- CSS 自动压缩
- JavaScript 自动压缩和混淆

### 3. 缓存策略
- 静态资源使用长期缓存
- HTML 文件使用短期缓存

## 故障排除

### 1. 构建失败
```bash
# 清理缓存
rm -rf node_modules dist
bun install
bun run build
```

### 2. 环境变量不生效
- 确保环境变量以 `VITE_` 开头
- 重启开发服务器
- 检查 `.env` 文件格式

### 3. 路由问题
- 确保服务器配置了 SPA 重定向
- 检查 `_redirects` 文件（Netlify）
- 检查 `netlify.toml` 配置

### 4. API 请求失败
- 检查 `VITE_API_BASE_URL` 配置
- 确认 API 服务器可访问
- 检查 CORS 设置

## 监控和维护

### 1. 性能监控
- 使用浏览器开发者工具
- 监控 Core Web Vitals
- 定期检查构建包大小

### 2. 安全检查
- 定期更新依赖包
- 检查环境变量安全性
- 监控 API 请求安全性

### 3. 备份策略
- 代码仓库备份
- 环境变量备份
- 部署配置备份

## 联系支持

如有部署问题，请检查：
1. 环境变量配置
2. 构建日志
3. 浏览器控制台错误
4. 网络连接状态

---

**注意**: 请确保在生产环境中使用 HTTPS，并正确配置 CORS 和安全头。
