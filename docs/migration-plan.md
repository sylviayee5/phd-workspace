# 迁移计划：桌面单机版 → 桌面 + 手机 + 云同步

> 起点：v1.0-before-mobile（git tag，已打）
> 目标：一套数据，多端同步，手机可用，离线也能用
> **当前状态（2026-04-23）：核心目标已达成，桌面 PWA + Supabase 云同步全部跑通。**

## 关键事实

### 两个 Supabase 项目的用途
Shu 账号下有两个 Supabase project：

1. **`sylviayee5's Project`**（ref `exzigbuwkvrhyjtpizad`）= **正在用的**
   - Table `workspace_sync`，row id `shu_phd_v2`
   - 持续同步真实数据，`app/phd-workspace-v3.html` 里 `SUPABASE_URL` / `SUPABASE_KEY` 指向这个
   - anon JWT key 已修正（之前错写成 sb_publishable_... 导致认证失败，2026-04-23 修复）

2. **`phd-workspace`**（ref `rjkdtbvohnddbihxioqz`）= **今天新建，空置**
   - Table `workspace_sync`，row id `shu_phd_v3`
   - 建时以为要迁移，后发现旧项目数据是最新的，**不再使用**
   - 保留不删（免费层支持 2 个项目，没成本），留作将来实验用

### app 的同步机制（已在生产）
- `saveState()` 触发后，防抖 5 秒自动 `syncPush` 到云
- 页面加载时 `autoSyncOnLoad` 双向判断：云端无数据 → 推送，云端较新 → 静默拉取
- 设置页 `云端同步 · Supabase` 卡显示最后推/拉时间 + 手动按钮 + 开关

## 七阶段路线图（回顾）

### Phase 0：Supabase 项目就绪 ✅（完成于更早，2026-04-22）
- Shu 已有账号，旧 project 已建表、配 RLS、装同步代码

### Phase 0.5：目录重构 + 快照 ✅（2026-04-23）
- [x] git tag `v1.0-before-mobile`
- [x] 新建 `shared/` `assets/` `pwa/` `docs/` 目录
- [x] 创建三份占位文档

### Phase 1：PWA 外壳 ✅（2026-04-23）
- [x] `assets/icon-192.png` + `icon-512.png`（terracotta 底白 S）
- [x] `assets/manifest.json`
- [x] `pwa/service-worker.js` + `app/sw.js`（GitHub Pages scope workaround）
- [x] `phd-workspace-v3.html` 加 manifest link / theme-color / apple-touch-icon / SW register
- [x] 验证：Edge 地址栏出现安装按钮 → 已装到 Launchpad
- [x] Service Worker 显示 activated and running

### Phase 2：Supabase 数据库 ✅（早已完成）
- 旧 project 的 `workspace_sync` 表早就建好并持续在用
- 今天额外在新 project 建了份表（`shu_phd_v3`），未使用

### Phase 3：云同步 key 修复 ✅（2026-04-23）
- 旧 `SUPABASE_KEY` 用的是 `sb_publishable_...` 新格式 key，认证不过导致同步失败
- 换回标准 JWT anon key (`eyJ...`) 后，saveState → 5s 后自动推送正常
- commit `2579f18`

### Phase 4：手机端使用（验证）✅（2026-04-23）
- PWA 在手机浏览器「添加到主屏幕」
- 打开后从 Supabase 自动拉取，数据与电脑一致

### 未来可选改进（没急迫性）
- [ ] 邮箱 Magic Link 登录：把 RLS 从 `to anon allow_all` 改为 `auth.uid() = user_id`（单用户也可做）
- [ ] 独立 `mobile.html`：为手机端精简布局（见 `docs/mobile-design.md`）
- [ ] Service Worker 缓存 Supabase GET 请求，实现真正离线读
- [ ] 离线写入队列：断网时先排队，恢复后批量推送

## 风险与回滚

- 崩了 → `git checkout v1.0-before-mobile` 回 desktop-only 桌面版
- 云数据损坏 → localStorage 还在；设置页有「从剪贴板导入 JSON」恢复入口
- Supabase 欠费/跑路 → 前端仍能单机跑 localStorage
- localStorage 不删：即使云同步整体失败，本地数据还在
- 每周至少一次 JSON 导出备份（已有流程）

## 不做的事

- 不重写 UI 风格
- 不改现有数据结构字段名（除非 Supabase 强制要求）
- 不引入 React / Vue / 构建工具（保持单文件静态站点）
