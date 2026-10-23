# 部署

构建：`npm run build`，静态产物位于 `dist/`。当前纯浏览器版本可以直接部署到 Vercel，无需配置后台或登录。保留的 API 函数统一停用，返回 `404 disabled`，OAuth 兼容回调跳转到本机档案页。

当前服务端实现与 Supabase 迁移、Google PKCE 回调、环境变量和验收步骤统一见 [CLOUD_SETUP.md](docs/CLOUD_SETUP.md)。请使用该说明，旧版前端 `VITE_GLM_API_KEY` 配置已经停用。

本地实现与测试不代表已经发布。未来重新开放云端功能前，再完成配置文档中的集成验收；资料范围见 [内容核验记录](docs/CANON_AUDIT.md)。
