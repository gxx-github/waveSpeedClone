# 使用官方 Node.js LTS 作为构建阶段（更轻量）
FROM node:20.17 as builder
# 设置工作目录
WORKDIR /app

# 仅复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖（包括 devDependencies，用于构建）
# RUN npm install
RUN corepack enable && yarn install --frozen-lockfile


# 复制所有源代码
COPY . .

# 构建前端项目
RUN yarn build
# RUN npm run build

# 生产环境运行镜像（只包含构建后的静态文件）
FROM nginx:alpine

# 复制构建产物到 Nginx 目录
# COPY ./dist /usr/share/nginx/html
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露 HTTP 端口
EXPOSE 80

# 运行 Nginx
CMD ["nginx", "-g", "daemon off;"]