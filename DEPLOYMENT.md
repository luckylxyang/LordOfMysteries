# 部署配置指南

## 环境变量配置

### 本地开发

1. 复制环境变量示例文件：
```bash
cp .env.example .env.local
```

2. 在 `.env.local` 中配置你的 GLM API Key：
```
GLM_API_KEY=your_api_key_here
```

3. 启动开发服务器：
```bash
npm run dev
```

### Vercel 部署

#### 步骤 1: 配置环境变量

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入你的项目 → Settings → Environment Variables
3. 添加以下环境变量：

| 名称 | 值 | 环境 |
|------|-----|------|
| `GLM_API_KEY` | 你的 GLM API Key | Production, Preview, Development |

#### 步骤 2: 获取 GLM API Key

1. 访问 [智谱AI开放平台](https://open.bigmodel.cn/usercenter/apikeys)
2. 登录并创建新的 API Key
3. 复制 API Key 到 Vercel 环境变量中

#### 步骤 3: 部署

推送代码到 GitHub 后，Vercel 会自动部署：

```bash
git add .
git commit -m "feat: integrate GLM-4 AI"
git push
```

## API 端点

### POST /api/chat

调用 GLM-4 进行对话

**请求体：**
```json
{
  "message": "罗塞尔大帝是谁？",
  "language": "zh"
}
```

**响应：**
```json
{
  "message": "罗塞尔·古斯塔夫是鲁恩王国的开国大帝...",
  "model": "glm-4",
  "usage": {
    "prompt_tokens": 50,
    "completion_tokens": 100,
    "total_tokens": 150
  }
}
```

## 安全说明

✅ **安全实践：**
- API Key 存储在服务器端环境变量中
- 使用 Vercel Serverless Functions 代理请求
- 前端无法直接访问 API Key

❌ **不要这样做：**
- 不要将 API Key 提交到 Git 仓库
- 不要在前端代码中硬编码 API Key
- 不要在 .env 文件中提交真实的 API Key（使用 .env.example）

## 故障排查

### API 调用失败

如果 API 调用失败，系统会自动降级到预设回复。

查看浏览器控制台获取详细错误信息。

### 本地开发测试

1. 确保已安装依赖：`npm install`
2. 配置 `.env.local` 文件
3. 运行：`npm run dev`
4. 访问：http://localhost:3000/responder

### Vercel 部署测试

1. 推送代码到 GitHub
2. 在 Vercel Dashboard 查看部署日志
3. 访问部署的 URL 测试功能

## 费用说明

GLM-4 API 按使用量计费：

- GLM-4: ¥0.5/千tokens
- GLM-4-Flash: ¥0.1/千tokens (推荐用于生产环境)

建议：
- 开发环境使用 GLM-4-Flash 降低成本
- 生产环境根据需要选择模型
- 在 API 代码中修改 `model` 参数切换模型

更多信息：[智谱AI定价](https://open.bigmodel.cn/pricing)
