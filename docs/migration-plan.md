# 迁移计划：桌面单机版 → 桌面 + 手机 + 云同步

> 起点：v1.0-before-mobile（git tag，已打）
> 目标：一套数据，多端同步，手机可用，离线也能用

## 七阶段路线图

### Phase 0：用户注册 Supabase（进行中）
- [ ] Shu 注册 Supabase 账号（GitHub 登录）
- [ ] 新建 project（推荐区域：Singapore 或 London）
- [ ] 拿到 Project URL 和 anon public key
- [ ] 填入 shared/supabase-client.js

### Phase 0.5：目录重构 + 快照（已完成 2026-04-23）
- [x] git tag v1.0-before-mobile
- [x] 新建 shared/ assets/ pwa/ docs/ 目录
- [x] 创建三份占位文档
- [x] 暂不改名 phd-workspace-v3.html（保留 GitHub Pages 链接有效）

### Phase 1：PWA 外壳（可先于 Supabase 完成）
- [ ] 制作 icon-192.png / icon-512.png（可用现有 logo 或简单设计）
- [ ] 编写 assets/manifest.json
- [ ] 编写 pwa/service-worker.js（先做离线缓存，不做后台同步）
- [ ] 在 phd-workspace-v3.html `<head>` 加 manifest link + 注册 service worker
- [ ] 验证：Chrome 地址栏出现「安装」按钮；手机 Safari「添加到主屏幕」成功

### Phase 2：Supabase 数据库结构设计
- [ ] 按 docs/supabase-schema.md 的草稿在 Supabase Dashboard 建表
- [ ] 配置 RLS 策略
- [ ] 在 Dashboard 手动插入一行测试数据

### Phase 3：邮箱 Magic Link 登录
- [ ] shared/auth.js：signIn / signOut / getUser
- [ ] 桌面页面加「登录 / 退出」按钮
- [ ] 未登录状态仍可本地使用（降级）

### Phase 4：localStorage → Supabase 双写
- [ ] shared/data-layer.js 封装 read / write
- [ ] 写操作：localStorage 立即写 + Supabase 异步写
- [ ] 读操作：优先 Supabase，失败降级 localStorage
- [ ] 冲突策略：以 updated_at 较新的为准

### Phase 5：一次性数据迁移
- [ ] 写一个「导入到云」按钮：读当前 localStorage，上传到 Supabase
- [ ] 先在 Supabase Dashboard 确认数据完整
- [ ] 保留 localStorage 作为本地缓存，不清空

### Phase 6：手机响应式 / 独立手机页
- [ ] 决策：是改造 v3.html 做响应式，还是新建 mobile.html？（见 docs/mobile-design.md）
- [ ] 核心日常操作（打卡、查看今日任务）优先
- [ ] 文字编辑密集型功能（写作、反思）次优先

### Phase 7：集成 + 离线处理
- [ ] Service Worker 缓存 Supabase 读请求
- [ ] 离线写入排队，恢复连接后批量同步
- [ ] 桌面 / 手机 双端实机测试

## 风险与回滚

- 任何阶段崩了都能 `git checkout v1.0-before-mobile` 回到桌面单机版
- localStorage 不删：即使云同步整体失败，本地数据还在
- 每周至少一次 JSON 导出备份（已有流程）

## 不做的事

- 不重写 UI 风格
- 不改现有数据结构字段名（除非 Supabase 强制要求）
- 不引入 React / Vue / 构建工具（保持单文件静态站点）
