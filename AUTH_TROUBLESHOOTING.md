# 认证问题排查指南

## 快速诊断

访问 `/auth-diagnostic` 页面运行自动诊断工具，或按照以下步骤手动排查：

## 1. 检查浏览器控制台

打开浏览器开发者工具（F12），查看Console标签页中的错误信息：

### 常见错误类型：

**网络错误：**
```
Failed to fetch
TypeError: Failed to fetch
```
- **原因**: 无法连接到后端服务器
- **解决方案**: 检查后端服务是否运行，网络连接是否正常

**CORS错误：**
```
Access to fetch at 'http://47.242.127.155:8000/auth/google/callback' from origin 'http://localhost:3000' has been blocked by CORS policy
```
- **原因**: 后端未配置CORS允许前端域名
- **解决方案**: 后端需要添加CORS配置

**404错误：**
```
HTTP 404: Not Found
```
- **原因**: 后端API端点不存在
- **解决方案**: 检查后端是否正确实现了相关端点

**500错误：**
```
HTTP 500: Internal Server Error
```
- **原因**: 后端服务器内部错误
- **解决方案**: 检查后端日志，修复服务器错误

## 2. 检查后端API端点

### 必需的后端端点：

1. **GET /auth/google**
   - 应该重定向到Google OAuth授权页面
   - 测试: 直接访问 `http://47.242.127.155:8000/auth/google`

2. **POST /auth/google/callback**
   - 接收授权码并返回访问令牌
   - 请求体: `{"code": "authorization_code", "state": "optional_state"}`
   - 响应: `{"access_token": "jwt_token", "user": {...}}`

### 测试后端连接：

```bash
# 测试后端是否可访问
curl http://47.242.127.155:8000/docs

# 测试Google认证端点
curl -I http://47.242.127.155:8000/auth/google

# 测试回调端点
curl -X POST http://47.242.127.155:8000/auth/google/callback \
  -H "Content-Type: application/json" \
  -d '{"code": "test-code", "state": "test-state"}'
```

## 3. 检查Google OAuth配置

### 重定向URL配置：
- 开发环境: `http://localhost:3000/auth/callback`
- 生产环境: `https://yourdomain.com/auth/callback`

### 客户端ID和密钥：
- 确保后端正确配置了Google OAuth客户端ID和密钥
- 检查环境变量是否正确设置

## 4. 检查网络和防火墙

### 网络连接测试：
```bash
# 测试服务器连通性
ping 47.242.127.155

# 测试端口连通性
telnet 47.242.127.155 8000
```

### 防火墙设置：
- 确保8000端口对外开放
- 检查云服务器安全组配置

## 5. 常见问题解决方案

### 问题1: 无法连接到服务器
**症状**: 控制台显示 "Failed to fetch" 错误
**解决方案**:
1. 检查后端服务是否运行
2. 检查网络连接
3. 检查防火墙设置
4. 尝试使用不同的网络环境

### 问题2: CORS错误
**症状**: 控制台显示CORS相关错误
**解决方案**:
后端需要添加CORS配置，允许前端域名：
```python
# FastAPI示例
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 问题3: 404错误
**症状**: 控制台显示 "HTTP 404" 错误
**解决方案**:
1. 检查后端路由配置
2. 确保端点路径正确
3. 检查HTTP方法是否正确

### 问题4: 授权码无效
**症状**: 后端返回401或400错误
**解决方案**:
1. 检查授权码是否过期（通常5分钟内有效）
2. 确保state参数匹配
3. 检查Google OAuth配置

### 问题5: 响应格式错误
**症状**: 前端无法解析后端响应
**解决方案**:
确保后端返回正确的JSON格式：
```json
{
  "access_token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

## 6. 调试步骤

1. **打开浏览器开发者工具**
2. **访问 `/auth-diagnostic` 页面**
3. **点击"运行所有测试"**
4. **查看测试结果**
5. **根据错误信息采取相应措施**

## 7. 日志分析

### 前端日志：
- 打开浏览器控制台
- 查看Network标签页的请求详情
- 查看Console标签页的错误信息

### 后端日志：
- 检查后端服务器日志
- 查看OAuth相关的错误信息
- 检查数据库连接状态

## 8. 联系支持

如果问题仍然存在，请提供以下信息：
1. 浏览器控制台的完整错误信息
2. 网络请求的详细信息
3. 后端服务器的错误日志
4. 使用的浏览器和操作系统版本
5. 网络环境描述

## 9. 预防措施

1. **定期检查后端服务状态**
2. **监控API端点的可用性**
3. **设置适当的错误监控**
4. **定期更新依赖包**
5. **备份重要配置**
