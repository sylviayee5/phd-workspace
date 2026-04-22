# CLAUDE.md（phd-workspace 项目指令）

本文件是 `1-PhD/04-daily/phd-workspace/` 的项目级 Claude 指令。与 `~/Projects/CLAUDE.md` 配合使用，不要与全局指令冲突。

## 1. 项目定位

- 本地单文件 PhD 工作台，入口 `app/phd-workspace-v2.html`
- 不依赖构建工具，不依赖后端，数据全部进浏览器 `localStorage`
- 主使用者：Shu（Loughborough PhD 在读，研究 urban fallow / inhuman micro-ecologies）

## 2. 目录和关键文件

```
app/phd-workspace-v2.html   # 唯一前端入口
data/                       # 备份（daily-backups / monthly-snapshots / restore-tested）
logs/                       # 备份 / 恢复日志
README.md                   # 使用说明
PROGRESS.md                 # 阶段性开发状态
```

## 3. 运行与调试

- 默认双击 `app/phd-workspace-v2.html` 即可
- 需要跨域 API（如 Open-Meteo 天气）时，推荐本地静态服务：
  - `cd 1-PhD/04-daily/phd-workspace`
  - `python3 -m http.server 8000`
  - 访问 `http://localhost:8000/app/phd-workspace-v2.html`

## 4. 技术栈

- Tailwind CDN（`cdn.tailwindcss.com`），配置注入 `dopamine` / `calm` 色板
- Chart.js 4.4.x，统一用 `buildChart(key, canvasId, type, labels, datasets, yCfg)` 封装
- Font Awesome 6，图标放在标题左侧和按钮
- Flatpickr 4.6 强制英文日期格式 `d/m/Y`，底层存 `YYYY-MM-DD`
- 无打包，无 npm，所有依赖走 CDN

## 5. 数据存储约定

- 主 key：`STORAGE_KEY`（保留历史，不要改名）
- 兼容 key：`LEGACY_STORAGE_KEYS`
- 所有新字段必须在 `defaultState()` 和 `loadState()` 同步补齐，加 `Array.isArray` / `typeof === 'object'` 校验
- 不允许删除已有字段，只做追加和兼容
- 重要结构（2026-04 后稳定）：
  - `attendance`, `timeBlocks`, `tasks`, `focus{active,sessions}`, `habits{list,logs}`, `foods`
  - `mood`, `reflections`, `phone{logs}`
  - `submissions`, `milestones`, `meetings`, `writing{documents,dailyLogs}`, `fieldwork`
  - `countdowns`（自定义倒计时）
  - `outings`（出门记录，含 tag）
  - `weeklyReviews`（ISO 周 key → {done, stuck, next}）
  - `social`（社交触点打点）
  - `energy`（每日 {morning, evening} 1-5 分）
  - `fieldworkPrep`（`{nextTripDate, items:[{id,text,done}]}`）

## 6. i18n 规范

- 全局 `uiLocale` ∈ `{zh, en}`，保存在 `UI_LOCALE_KEY`
- 静态文案走 `I18N.zh / I18N.en` + `applyLocaleStaticText()`
- 动态拼接文案必须经过 `localeText(zh, en)` 或 `tt(key)`，不允许把中文硬编码进渲染字符串
- 新增模块必须双语，若只写中文视为未完成
- 语言切换后需要立即刷新界面：`applyLocaleStaticText(); applyDynamicLocaleText(); renderAll();`

## 7. 颜色与视觉

- 背景：低饱和暖色（Morandi 调性），无粉红
- 卡片：`.soft-card`（磨玻璃 `backdrop-filter: blur(22-24px) saturate(1.08-1.1)`）
- 色板通过 Tailwind `dopamine.*` token 调用，禁止直接写死 hex
- 默认色 `orange / rose / pink / yellow / amber` 在 Tailwind 配置中已覆盖为暖色中性值，避免默认粉红泄漏
- 新增图表配色从以下范围选：`#C49B8A / #A87360 / #D9C9A3 / #A8B5A0 / #B8A78C / #8A6F5C / #B88A73 / #B8C4A3`
- 动效尺度：卡片 hover `translateY(-2px)` + `.22s ease`，section 切换 `sectionFadeIn .22s`

## 8. Coding 规则（项目内）

- 函数命名 camelCase，变量英文
- 中文仅用于界面文案和注释
- `renderXxx()` 只做渲染，`bindXxx()` 只做事件绑定，`saveState()` 后必须调用对应 render 刷新
- 新增模块 bind 函数必须在 `init()` 中显式注册；新增 `window.xxx = xxx` 全局只用于 HTML `onclick`
- 新增 HTML 元素使用语义化 id（`countdownAddBtn` 而不是 `btn1`）
- 新增 Chart 必须走 `buildChart()`，不直接 `new Chart`
- 新增日期输入必须加入 `DATE_PICKER_IDS` 列表，交给 flatpickr 统一处理

## 9. 边界（不允许的改动）

- 不删除任何已有 state 字段
- 不随意改 `STORAGE_KEY` 名称
- 不移除已确认功能（投稿管理、里程碑、数据看板、备份导入导出、双语切换）
- 不强制全局大重构，每次改动尽量局部、可逆
- 涉及"清空"/"覆盖"/"重置"必须保留确认提示
- 不做大规模视觉重构（配色已固化，微调可以，推翻不行）
- 不引入新依赖（除非用户明确要求）

## 10. 每次改动前的自检清单

- [ ] 动到的 state 字段是否在 `defaultState()` 和 `loadState()` 都加了兼容？
- [ ] 新增文案是否同时写了 `zh` 和 `en`？
- [ ] 新增 render 函数是否在合适的父 render 中被调用？
- [ ] 新增 bind 函数是否在 `init()` 中注册？
- [ ] 新增 `onclick` 是否在 `window.xxx` 导出？
- [ ] 日期输入是否加入 `DATE_PICKER_IDS`？
- [ ] 是否破坏了现有导入导出兼容性？
- [ ] 两段 inline `<script>` 是否仍通过 `node --check` 语法？
