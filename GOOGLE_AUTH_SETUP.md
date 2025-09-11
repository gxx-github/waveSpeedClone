# 谷歌登录流程配置说明

## 概述
本项目已完善了谷歌OAuth登录流程，包括前端和后端集成。

## 功能特性
- ✅ 谷歌OAuth登录按钮
- ✅ OAuth回调处理页面
- ✅ 用户状态管理
- ✅ 错误处理和加载状态
- ✅ 响应式UI设计

## 文件修改说明

### 1. AuthContext.tsx
- 添加了 `loginWithGoogle` 方法
- 添加了 `setUser` 方法供OAuth回调使用
- 支持重定向到谷歌OAuth授权页面

### 2. API客户端 (client.ts)
- 添加了 `getGoogleAuthUrl` 方法
- 添加了 `handleGoogleCallback` 方法处理OAuth回调

### 3. LoginModal.tsx
- 添加了谷歌登录按钮
- 包含Google官方图标
- 添加了分隔线和样式

### 4. LoginPage.tsx
- 更新为使用AuthContext的谷歌登录方法
- 改进了按钮样式和交互

### 5. OAuthCallback.tsx (新文件)
- 处理OAuth回调逻辑
- 解析URL参数中的code和state
- 调用后端API完成认证
- 提供加载状态和错误处理

### 6. App.tsx
- 添加了 `/auth/callback` 路由

## 后端API端点

### 1. 谷歌OAuth授权
```
GET /auth/google
```
- 重定向到谷歌OAuth授权页面
- 用户授权后重定向到 `/auth/callback?code=xxx&state=xxx`

### 2. OAuth回调处理
```
POST /auth/google/callback
```
- 接收授权码(code)和状态(state)
- 返回访问令牌和用户信息

请求体：
```json
{
  "code": "authorization_code_from_google",
  "state": "optional_state_parameter"
}
```

响应：
```json
{
  "access_token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

## 环境变量配置

建议在 `.env` 文件中配置：
```
VITE_API_BASE_URL=http://47.242.127.155:8000
```

## 使用流程

1. 用户点击"使用Google登录"按钮
2. 重定向到 `/auth/google` 端点
3. 后端重定向到Google OAuth授权页面
4. 用户授权后，Google重定向到 `/auth/callback`
5. 前端处理回调，调用后端API完成认证
6. 成功后跳转到仪表板页面

## 安全注意事项

- 确保后端正确验证state参数防止CSRF攻击
- 使用HTTPS在生产环境中
- 妥善处理错误情况
- 验证JWT令牌的有效性

## 测试

1. 启动开发服务器：`npm run dev`
2. 访问登录页面
3. 点击"使用Google登录"按钮
4. 完成Google授权流程
5. 验证是否正确跳转到仪表板
