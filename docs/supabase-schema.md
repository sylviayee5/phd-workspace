# Supabase 数据库结构设计

> 状态：待填写（Phase 2）
> 等用户注册 Supabase 账号、拿到 Project URL 和 anon key 后开始。

## 设计原则

- 单用户（Shu 自己用），但预留 `user_id` 字段以便将来扩展
- 数据结构尽量贴合现有 `state` 对象的字段，减少迁移工作量
- 云端为主存，localStorage 作为离线缓存层
- 使用 Row Level Security（RLS）确保只有本人能读写

## 表结构草稿（待细化）

### attendance
- date (date, PK)
- user_id (uuid, FK to auth.users)
- wake (time)
- sleep (time)
- leave (time)
- periods (jsonb)  存 morning/afternoon/evening 的 segments 数组
- updated_at (timestamptz)

### meetings
- id (text, PK)
- user_id (uuid, FK)
- date (date)
- title (text)
- start_time (time)
- end_time (time)
- supervisors (text[])
- agenda (text)
- notes (text)
- action_items (jsonb)
- updated_at (timestamptz)

### （其他表：writing / submissions / milestones / fieldwork / reflections / settings……待补充）

## 待定问题

- [ ] 是否需要一个单独的 `user_settings` 表还是全部塞在 localStorage？
- [ ] 长文本字段（agenda、notes、reflections）是否需要全文搜索？Supabase 支持 pg_trgm / tsvector。
- [ ] 数据量评估：每天大约新增多少行？
- [ ] 是否启用 Realtime 订阅（双设备同步）？

## 参考

- Supabase 文档：https://supabase.com/docs
- RLS 策略：https://supabase.com/docs/guides/auth/row-level-security
