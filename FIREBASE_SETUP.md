# Firebase Google 登录配置指南

## 步骤 1: 创建 Firebase 项目

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 点击"添加项目"
3. 输入项目名称（例如：`lord-of-mysteries-quiz`）
4. 可以选择不启用 Google Analytics
5. 点击"创建项目"

## 步骤 2: 启用 Google 登录

1. 在 Firebase Console 中，进入你的项目
2. 点击左侧菜单的"Authentication"
3. 点击"开始使用"或"设置登录方法"
4. 选择"Google"登录提供商
5. 启用 Google 登录
6. **重要**: 在"授权域名"中添加:
   - `localhost` (本地开发)
   - `lotm.space` (你的域名)
   - `vercel.app` (如果使用 Vercel 预览)
7. 保存配置

## 步骤 3: 获取 Firebase 配置

1. 点击项目设置图标（齿轮）
2. 滚动到"您的应用"部分
3. 选择 Web 应用（</> 图标）
4. 记录下配置信息（不需要添加 Firebase SDK）

你会看到类似这样的配置：
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
}
```

## 步骤 4: 配置环境变量

### 本地开发

在 `.env` 文件中添加：

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### Vercel 部署

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入你的项目 → Settings → Environment Variables
3. 添加以下环境变量（去掉 `VITE_` 前缀）：

| 名称 | 值 |
|------|-----|
| `VITE_FIREBASE_API_KEY` | 你的 API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | your-project.firebaseapp.com |
| `VITE_FIREBASE_PROJECT_ID` | your-project-id |
| `VITE_FIREBASE_STORAGE_BUCKET` | your-project.appspot.com |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | 你的 sender ID |
| `VITE_FIREBASE_APP_ID` | 你的 app ID |

## 步骤 5: 安装 Firebase SDK

```bash
npm install firebase
```

如果遇到 npm 缓存权限问题，尝试：

```bash
# 清理缓存并重新安装
rm -rf node_modules package-lock.json
npm install
```

或者使用其他包管理器：

```bash
# Yarn
yarn add firebase

# pnpm
pnpm add firebase
```

## 步骤 6: 测试 Google 登录

### 本地测试

1. 启动开发服务器：`npm run dev`
2. 访问 http://localhost:3000
3. 点击右上角的"使用 Google 账号继续"按钮
4. 选择你的 Google 账号授权
5. 登录成功后会显示你的头像和用户名

### 部署测试

1. 推送代码到 GitHub
2. Vercel 自动部署
3. 访问你的 Vercel 域名测试

## 常见问题

### Q: 点击登录按钮没有反应？
A:
- 检查浏览器控制台是否有错误
- 确认 Firebase 配置是否正确
- 检查是否启用了 Google 登录提供商

### Q: 登录时出现 "auth/unauthorized-domain" 错误？
A:
- 在 Firebase Console 中添加你的域名到授权域名列表
- 本地开发确保添加了 `localhost`

### Q: 部署后无法登录？
A:
- 确认 Vercel 环境变量配置正确
- 检查 Firebase Console 中是否添加了你的域名

### Q: npm install 失败？
A:
- 清理 npm 缓存：`npm cache clean --force`
- 使用其他包管理器（yarn 或 pnpm）

## Firebase 配置说明

Firebase 配置中的关键字段：

- **apiKey**: 用于识别你的 Firebase 项目
- **authDomain**: Firebase 认证域名
- **projectId**: 你的 Firebase 项目 ID
- **storageBucket**: Cloud Storage 存储桶（可选）
- **messagingSenderId**: FCM 发送者 ID（用于推送通知）
- **appId**: Firebase App ID

所有这些信息都可以在 Firebase Console 的项目设置中找到。
