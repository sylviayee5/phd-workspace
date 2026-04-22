# PhD Workspace 本地长期使用说明

## 目录用途
- app: 工作台 HTML 主文件
- data/daily-backups: 日常备份 JSON
- data/monthly-snapshots: 每月归档快照
- data/restore-tested: 已验证可恢复的备份
- logs: 备份与恢复记录

## 推荐使用方式
1. 打开 app/phd-workspace-v2.html。
2. 每天结束前在“设置 / 数据管理”点击“下载 JSON 备份”。
3. 将备份文件移动到 data/daily-backups。
4. 每周至少一次做恢复演练，将验证通过的备份复制到 data/restore-tested。
5. 每月最后一天复制一份到 data/monthly-snapshots。

## 备份命名建议
- 日常备份: YYYYMMDD_phd-workspace-backup.json
- 月度快照: YYYYMM_phd-workspace-snapshot.json
- 恢复验证通过: YYYYMMDD_restore-tested.json

## 最低维护节奏
- 每日: 导出一次 JSON
- 每周: 恢复演练一次
- 每月: 月末快照一次

## 注意
- 本页数据主要保存在浏览器 localStorage，不等于硬盘文件。
- 清缓存、切换浏览器配置可能导致本地数据消失。
- 导入会覆盖当前数据，导入前先导出当前版本。