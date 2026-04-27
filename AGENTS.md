# AGENTS.md — Glean PhD Workspace

> 给所有 AI agents（Claude / Gemini / Copilot / Cursor 等）的明确指令。
> 编辑此项目前请先读完本文件。

---

## 当前版本（CURRENT）

**唯一应该被编辑的应用文件：**

```
app/phd-workspace-v3.html
```

所有新功能、bug 修复、UI 调整都只改 V3。
PWA、service worker、landing CTA 全部指向 V3。

---

## 不要碰的目录

| 路径 | 说明 |
|---|---|
| `app/archive/` | 历史版本归档，**只读** |
| `app/archive/phd-workspace-v2.html` | V2 旧版，已停止维护 |
| `.claude/worktrees/` | Claude 内部工作树，与本项目无关 |

如果你被要求"修改 phd-workspace-v2"，那是误读。请改 v3。

---

## 文件分工速查

| 文件 | 作用 | 何时编辑 |
|---|---|---|
| `app/phd-workspace-v3.html` | 主应用（SPA，~7000 行） | 默认编辑这个 |
| `app/index.html` | 视频背景 landing 页 | 改首页文案/视觉 |
| `app/sw.js` | Service worker 加载器 | 极少改 |
| `pwa/service-worker.js` | SW 主体，含 `CACHE_VERSION` | 部署新版本时**升级 CACHE_VERSION** |
| `assets/manifest.json` | PWA manifest，`start_url` 指向 v3 | 改 icon / 主题色 |
| `assets/icon-{192,512}.png` | App icon（蒲公英 Glean logo） | 改图标时同时换两张 |
| `index.html` (root) | 重定向到 `app/index.html` | 不动 |
| `app/VERSIONS.html` | 版本索引页 | 新增版本时同步更新 |

---

## 部署流程

1. 改完 `app/phd-workspace-v3.html`
2. **升级** `pwa/service-worker.js` 的 `CACHE_VERSION`（格式 `v{n}-{date}-{slug}`）
3. `git add -A && git commit -m "feat: ..."`
4. `git -c http.version=HTTP/1.1 push`（避免 HTTP/2 framing 错误）
5. 实时站点：https://sylviayee5.github.io/phd-workspace/app/phd-workspace-v3.html

---

## 写作 / 代码规范

- 中文回复，代码注释中文，文件名/变量名英文
- 不用破折号（em dash / en dash），用逗号或括号替代
- 不用 "not X, but Y" / "Rather than..." 句式
- localStorage key: `phd_master_workspace_merged_v2_shu`（**不要改**，会丢数据）
- Supabase row id: `shu_phd_v2`（**不要改**）

---

## URL 速查

| 用途 | URL |
|---|---|
| 入口 | https://sylviayee5.github.io/phd-workspace/ |
| Landing | https://sylviayee5.github.io/phd-workspace/app/ |
| **V3 当前** | https://sylviayee5.github.io/phd-workspace/app/phd-workspace-v3.html |
| 版本索引 | https://sylviayee5.github.io/phd-workspace/app/VERSIONS.html |
| V2 归档 | https://sylviayee5.github.io/phd-workspace/app/archive/phd-workspace-v2.html |

---

最后更新 2026-04-27
