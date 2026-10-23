# Google 登录与档案同步

实现使用 Supabase PKCE，浏览器回调为 `/auth/callback`。旧 `/api/auth/callback` 仅为兼容入口，安全跳转到页面。

完整配置、数据库权限、跨设备冲突规则及验证步骤见 [云端配置说明](docs/CLOUD_SETUP.md)。本地没有配置时仍可使用访客档案。
