# 登录、云端档案与 AI 服务配置

当前按用户要求暂时关闭所有后台与登录功能。`npm run dev` 提供网页预览，API 返回 `404 disabled`，不会新增额度、事件或反馈数据。以下是后续恢复云端功能时使用的配置说明。

恢复时需先审阅并修改 `src/config/features.ts` 的 `BACKEND_ENABLED`，同时恢复 App 中的登录回调、通信与反馈路由，以及档案、搜索和页脚入口。只填写环境变量不会重新开启功能。既有本地数据和云端代码均保留。

2026-10-23：用户决定先验收本地预览，云端配置稍后处理。本轮未配置真实 Supabase / GLM 项目；以下步骤为后续接入说明，不能视为真实登录、跨设备同步或 AI 调用已经验收通过。

## Supabase

1. 在自己的 Supabase 项目 SQL Editor 执行 `supabase/migrations/20261022_lotm.sql`。
2. 在 Authentication → Providers 启用 Google，并配置 Google OAuth。Google 的回调地址应为该 Supabase 项目的 `/auth/v1/callback`，不是本站页面。
3. 在 Supabase 的 Redirect URLs 中允许本站 `/auth/callback`，本地调试时加入 `http://127.0.0.1:3000/auth/callback`；部署时加入实际域名的对应地址。
4. 将 `.env.example` 复制为 `.env.local`，填写 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`。这些是浏览器端项目配置，数据权限由 RLS 和数据库函数校验。
5. API 另需服务端的 `SUPABASE_URL`、`SUPABASE_SERVICE_ROLE_KEY` 和足够长的随机 `LOTM_QUOTA_SECRET`。**Service Role 和 AI 密钥不能使用 `VITE_` 前缀，也不能放入前端文件。**

登录使用 PKCE；Supabase 客户端在回调页面初始化时自动交换 code。页面等待初始化完成，不额外发起第二次交换。参见 [Supabase PKCE 文档](https://supabase.com/docs/guides/auth/sessions/pkce-flow)。

云端档案按用户隔离，表只允许本人读取。保存由 `save_lotm_archive` 函数根据当前登录身份写入，调用者不能提供另一个用户 ID。版本号用于发现跨设备冲突；未同步的本地修改不会被远端静默覆盖。重试上传会明确以本地版本更新云端，操作前可以导出备份。访客资料需用户点击“合并”后才进入登录档案。

## AI 与额度

服务端配置 `GLM_API_KEY`，可用 `GLM_MODEL` 选择账户可用的模型。当前默认 `glm-4-flash`；实际模型可用性与账号权限需在对应服务中核对。没有密钥时，普通搜索仍然可用，短笺显示明确标注的预设同人文字。

- 搜索分析与短笺共享每日 20 次服务端额度，按网络地址的加盐摘要识别，UTC 零点重置。同一网络下的设备可能共享额度，清除浏览器数据不会重置它。
- 上游已发起的失败调用也会消耗次数；未配置服务时不消耗。重复请求 ID 不会再次调用上游。
- 用户文本限制 500 字符；请求体限制 12KB；AI 上游超时 15 秒。搜索分析必须返回有界的关键词数组。
- 生产环境要求持久化数据库；缺少它时接口失败并由页面回退，不能退化为易失的内存额度。
- 在 Vercel 部署时使用平台提供的 `x-vercel-forwarded-for` 识别来源，参见 [Vercel 请求头文档](https://vercel.com/docs/headers/request-headers)。本地模式忽略用户传入的转发头。

Vercel 自动构建 `api/` 下的 Node 函数。保留当前 `vercel.json` 的 API 路由和页面回退即可；构建命令为 `npm run build`。普通静态托管只能提供访客页面，AI、反馈、服务端统计需另外承载 API。

## 运维与验证

`npm test` 包含真实本地 PostgreSQL 引擎上的迁移、用户权限隔离、乐观锁和额度函数验证，也覆盖浏览器档案同步队列的竞态。它不等同于已经登录过你的 Google / Supabase 生产项目。

当前工作区没有实际服务配置。正式使用云端功能前，需要用两个测试账号验证登录、退出和切换，再用两台设备验证保存、恢复及冲突提示；AI 需做一次真实成功调用及额度耗尽检查。此处没有替你创建外部账号、修改线上数据库或发布站点。

本地检查事件可运行 `npm run report`；其中开发验收产生的数据不能当作真实用户基线。生产统计与反馈可以在 Supabase SQL Editor 中查询：

```sql
select name, count(*) as events
from public.lotm_events
where created_at >= now() - interval '14 days'
group by name order by name;

select id, category, content_id, message, created_at
from public.lotm_feedback
order by created_at desc limit 100;

-- 定期清理过期额度记录；历史额度不影响当天判断。
delete from public.lotm_quotas
where day < (timezone('UTC',now())::date - 7);
```

统计不发送昵称、答案、搜索词或登录身份。`share_attempt` 是尝试分享，`share_landing` 是通用链接落地；`card_download` 表示图片生成并交给浏览器下载，不能证明用户最终保存了文件。`return_visit` 表示该浏览器距离上次访问至少 30 分钟后再次打开，不是跨设备的独立用户数。
