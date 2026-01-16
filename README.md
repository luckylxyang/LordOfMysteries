# 灰雾之上 - 诡秘之主非凡者评估

基于《诡秘之主》世界观的非凡者准入评估 Web 应用。

## 项目特性

- **非凡者评估器**: 7 道心理测试题，匹配 5 条核心途径
- **身份卡生成器**: 基于测试结果生成可保存的图片卡片
- **神秘学导航**: 途径说明与 SEO 优化
- **哥特神秘学风格**: 沉浸式的视觉体验

## 技术栈

- **前端**: Vite + React + TypeScript
- **路由**: React Router v7
- **图片生成**: Node.js + Canvas (服务端)
- **UI**: 纯 CSS，哥特/神秘学风格

## 安装与运行

### 1. 安装前端依赖

```bash
# 如果遇到 npm 缓存权限问题，可以尝试：
npm install --cache /tmp/npm-cache

# 或者使用 yarn/pnpm
yarn install
# 或
pnpm install
```

### 2. 安装服务端依赖

```bash
# 在 server 目录下安装 canvas
cd server
npm install canvas
cd ..
```

### 3. 启动开发服务器

**终端 1 - 启动图片生成服务**:
```bash
npm run server
# 服务运行在 http://localhost:3001
```

**终端 2 - 启动前端开发服务器**:
```bash
npm run dev
# 前端运行在 http://localhost:3000
```

### 4. 访问应用

打开浏览器访问: http://localhost:3000

## 项目结构

```
LordOfMysteries/
├── src/
│   ├── pages/          # 页面组件
│   │   ├── Home.tsx    # 首页
│   │   ├── Quiz.tsx    # 测试页
│   │   ├── Result.tsx  # 结果页
│   │   └── Directory.tsx # 途径图鉴
│   ├── data/           # 数据文件
│   │   ├── pathways.ts       # 途径数据
│   │   ├── questions.ts      # 测试问题
│   │   └── evaluations.ts    # 评语生成系统
│   ├── types/          # TypeScript 类型
│   └── main.tsx        # 入口文件
├── server/
│   └── generator.cjs   # 图片生成服务
└── package.json
```

## 核心功能说明

### 评估算法

每道题目为不同途径提供不同权重，最终计算总分最高的途径作为结果。

### 评语生成

使用预设模板 + 随机组合的方式生成个性化评语，无需外部 API。

### 图片卡片生成

服务端使用 Canvas API 生成 400x250 像素的图片卡片，包含：
- 途径符号与名称
- 途径描述
- 用户个性化评语
- 哥特风格装饰

## 后续扩展

- [ ] 增加更多途径（目标 22 条）
- [ ] 添加用户登录与历史记录
- [ ] 社交分享功能完善
- [ ] 移动端优化
- [ ] 集成 LLM 生成评语

## 开发说明

### 问题缓存权限问题解决

如果遇到 `EACCES` 权限错误：
```bash
# 方案 1: 清理 npm 缓存
npm cache clean --force

# 方案 2: 使用临时缓存目录
npm install --cache /tmp/npm-cache

# 方案 3: 修复权限
sudo chown -R $(whoami) ~/.npm
```

### 添加新途径

编辑 `src/data/pathways.ts` 添加新的途径对象，然后在 `src/data/questions.ts` 中添加对应的题目权重。

## License

MIT
