# PROGRESS.md

## 1. 项目目标和技术栈
- 项目目标：做一个本地运行的 PhD 日常工作台，把起居打卡、专注计时、任务管理、时间块日历、习惯饮食、情绪记录、手机克制、投稿管理、里程碑和数据看板整合到同一个页面里。
- 技术栈：单文件 HTML + 原生 JavaScript + Tailwind CSS + Chart.js + Font Awesome。
- 数据存储：浏览器本地 `localStorage`，支持导出和导入 JSON 备份。
- 运行环境：本地浏览器页面，不依赖后端。

## 2. 已完成的部分
- 首页总览已经完成，包含今日专注、今日出勤段数、已完成任务、投稿项目数等核心信息。
- 已加入 SHU 个性化内容，包括博士起点、学习时长、3 年和 3.5 年毕业倒计时、英国节假日倒计时、每日鼓励卡。
- 起居与考勤模块已完成，包含起床打卡、睡觉打卡、上午下午晚上三时段记录、请假管理、出勤日历。
- 时间块日历模块已完成，可以按日期记录多个时间块，并在日历中查看当天安排。
- 专注与任务模块已完成，包含专注计时器、任务列表、任务绑定专注、手动补录专注记录、任务分类标签。
- 习惯与饮食模块已完成，包含习惯打卡和饮食日志。
- 情绪与观心模块已完成，包含心情选择、情绪说明、观心反思和历史记录。
- 手机克制与成就模块已完成，包含手机克制记录和自动解锁成就系统。
- 投稿管理模块已完成，包含新增投稿项目、状态切换、优先级、期刊信息、字数和图片限制、伦理和版权状态、看板展示、截止日期 7 天内红色警告。
- 博士里程碑模块已完成，已经从投稿管理中拆分出来,支持独立添加、编辑、要求清单和过程日志。
- 导师会议记录模块已完成，支持记录会议日期、参会导师（Cagri/Cansu）、议题、备注和行动项清单，含 action item 勾选与追加。
- 写作进度模块已完成，支持按文档（博士章节/期刊论文/年度报告）追踪目标字数和当前字数，支持每日字数日志，展示进度条和统计。
- 田野记录模块已完成，按标准格式记录日期、地点、天气、主要观察、照片说明和理论联想，匹配 phd.md 田野记录规范。
- 数据看板模块已完成，包含专注、出勤、手机克制、习惯、投稿阶段的统计图表。
- 设置和数据管理模块已完成，包含存储键查看、导出、导入、修复、清理和预览。
- 中英文切换已完整覆盖：静态文案走 I18N 字典、动态渲染走 `localeText()` 和 `EN_DYNAMIC_REPLACEMENTS`、按钮文案走 `EN_GLOBAL_TEXT_REPLACEMENTS`、占位符走 `EN_PLACEHOLDER_REPLACEMENTS`、select 选项走 `OPTION_LABEL_MAP_EN`、弹窗（alert/confirm/prompt）全部用 `localeText()` 包装。
- 新模块（导师会议、写作进度、田野记录）的所有静态标题、按钮、占位符、select 选项均已完成双语覆盖，经过浏览器预览验证无中文残留。

### 2026-04-21 新增（视觉重设计 + 多功能扩展）

- **视觉重设计（Apple 磨玻璃 + 暖色莫兰迪）**：
  - Tailwind 自定义 `dopamine` 色板全部替换为暖色低饱和（terracotta / sand / sage / cocoa），无粉红
  - body 背景改为淡暖色渐变 `#FAF7F1 → #F5F1E8 → #F8F4EC` + 三个低透明度径向光斑
  - `.soft-card` 使用 `backdrop-filter: blur(22-24px) saturate(1.08-1.1)`，hover `translateY(-2px)`
  - section 切换加 `sectionFadeIn .22s ease-out`，pulseRing 用于专注态
  - 覆盖 Tailwind 默认 `orange / rose / pink / yellow / amber` 色阶，防默认粉色泄漏
  - 侧栏标题改为 `Shu's PhD Studio`，副标题 `田野 · 写作 · 投稿 / Fieldwork · Writing · Submission`

- **Analytics 看板扩展**：汇总卡从 4 张增至 8 张；图表从 5 张增至 15 张，覆盖写作（每日字数、文档进度条）、会议（按月分导师堆叠、Action Items 环形）、里程碑（整体完成率、即将到期）、田野（按月频次、地点分布）、心情（类型分布、每日趋势）；`buildChart()` 升级支持 doughnut / pie / stacked。

- **倒计时板块（Countdown）**：首页卡片，自动汇总里程碑 / 投稿 / 会议 / 田野行程 / 田野准备下次出发，支持手动添加自定义项，按 ≤7 天红 / 8-30 天琥珀 / >30 天中性三色分级，最多展示 9 条。

- **拉夫堡天气 widget（Open-Meteo）**：侧栏日期下方，30 分钟缓存，按 WMO weather_code 分太阳旋转 / 云飘 / 雨脉动 / 雪旋转 / 雷闪 / 雾脉动六种 CSS 动效，不展示日出日落（按用户要求省略）。

- **出门记录（Outings）**：习惯饮食页新卡，六标签（校园 / 购物 / 散步 / 社交 / 田野 / 其他），统计连续在家天数 + 近 7 天 / 30 天出门次数，可写备注，一键删除。

- **周日周回顾（Weekly Review）**：按 ISO 周 key 存储；每周日自动在首页显示三字段卡（本周做了什么 / 卡在哪 / 下周三件事），保存或关闭后隐藏。

- **社交触点（Social Touchpoints）**：首页卡，Cagri 导师 / Cansu 副导 / 真真 / Simon / 家人五个联系人，一键打点，展示近 30 天次数 + 最近打点。

- **能量检查（Energy Check）**：首页卡，早晨 / 晚间各一次 1-5 分按钮，展示近 7 天平均。

- **田野准备清单**：田野 section 新卡，下次出发日期 + 可勾选条目列表，倒计时自动同步到首页倒计时板块。

- **Analytics 新增两张图**：阅读 / 写作时间比（按 focus 分类 study+research vs writing 堆叠柱图 + 区间比值），每日能量趋势（折线）。

- **state 新增字段**（全部向后兼容）：`countdowns`, `outings`, `weeklyReviews`, `social`, `energy`, `fieldworkPrep{nextTripDate, items}`。

- **i18n 覆盖**：全部新文案双语，`applyLocaleStaticText()` 运行时刷新新卡片标题、占位符、按钮文案。

### 2026-04-22 新增（云端同步 + GitHub Pages + UI 改进）

- **GitHub Pages 部署**：
  - Repo: `https://github.com/sylviayee5/phd-workspace`
  - 访问地址: `https://sylviayee5.github.io/phd-workspace/app/phd-workspace-v2.html`
  - 分支: `main`，根目录 `/`，手机 / 电脑均可访问

- **Supabase 云端同步**：
  - URL: `https://exzigbuwkvrhyjtpizad.supabase.co`，Table: `workspace_sync`，Row ID: `shu_phd_v2`
  - RLS 开启，policy `allow_all` 已配置
  - 页面加载自动双向判断：无云端数据 → 自动推送；云端比本地新 → 静默拉取
  - 自动同步默认开启，可在设置页手动关闭
  - 解决了手机 / 电脑 localStorage 不互通的根本问题

- **社交触点 UI 全面改进**：
  - 最近打点从文字列表改为彩色 tag 样式（今天 / 昨天 / 日期+时间）
  - 点击联系人卡片弹出月历历史弹窗，左右切换月份，点日期查看当天记录，底部图例
  - 三处颜色（卡片数字、最近 tag、月历圆点）统一为莫兰迪色 inline hex，彻底解决 Tailwind CDN 动态 class 不渲染问题
  - 颜色映射常量 `SOCIAL_COLOR_HEX` 集中管理，全部 inline `style` 渲染

- **天气 widget 升级为三城市**：
  - 从单城市（拉夫堡）扩展为拉夫堡 / 惠州 / 成都三城市横排
  - 每城市显示天气图标、温度、城市名、当地实时时间（`Intl.DateTimeFormat` 自动处理时区）
  - 三个 API 请求并行发出（open-meteo 免费），30 分钟缓存，失败时降级显示旧缓存
  - 常量 `WEATHER_CITIES` 管理城市配置（lat / lon / tz）

- **天气升级为独立大板块 + 室外体感温度**（commit `ab91b98` / `69ab033`）：
  - 三城市卡片加大，显示当前温度、体感温度（`apparent_temperature`）、最低/最高温、本地时间
  - 右侧新增「拉夫堡详情」子卡：风向 + 风速 + 阵风、今日降雨概率、湿度、UV 防晒指数、穿衣建议
  - 穿衣建议按体感温度 6 档自动切换（厚羽绒 / 厚外套 / 薄外套 / 长袖 / 薄长袖 / 短袖），雨天自动加「带伞」提示
  - UV 指数按 5 档标注（Low / Moderate / High / Very High / Extreme + 中文防晒建议）
  - 风向用 16 方位中英双语标签
  - 所有拼接改为字符串 `+`，避免模板字面量嵌套问题

- **首页重构为 3 区域**（commit `75c23fe`）：
  - 原先 6 层堆叠内容过多，重整为 Hero → 今日行动 → 背景信息 三段
  - **区域 1 Hero**：身份（Shu + 副标题）+ 4 个统计数字（今日专注 / 出勤段数 / 完成任务 / 投稿项目）
  - **区域 2 今日行动**（4 列）：今日待做 / 最近专注记录 / 最近投稿提醒 / 今日心情 & 观心
  - **区域 3 背景信息**（2 列）：左倒计时（里程碑+投稿+会议+自定义+博士时长+节假日合并）/ 右三地天气
  - 博士时长倒计时和英国节假日倒计时从独立卡片并入倒计时面板底部小区
  - 鼓励语卡从首页移除（DOM 元素隐藏保留 ID 供 JS 使用）
  - 社交触点 + 能量检查从首页迁移到「情绪与观心」页顶部（功能不变，只换位置）

### 2026-04-23 新增（Modal UX + 会议日历 + 目录重构）

- **Modal 交互统一**：
  - 全部 9 个弹窗（任务、专注补录、投稿、里程碑、会议、田野、反思、导入、会议日详情）统一改为 `flex items-center justify-center` + `backdrop-blur-lg` 磨砂玻璃效果，内层 `bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl`
  - 原先 CSS 缺 `flex` 导致 modal 偏上；修复后所有弹窗真正居中
  - 原生 `prompt()` 替换为自定义 `inputModal` + `showInputModal()` Promise helper（上午 / 下午 / 晚间时段手动补录时间），支持 Enter 提交 / Esc 取消

- **会议日历**：
  - meetings section 新增月 / 周视图切换日历
  - 月视图 7 列网格，过去日显示灰色小点，今日高亮琥珀色，未来日蓝色
  - 点击任一日期弹出当日会议列表（`openMeetingDayModal`）
  - 日期统一格式化为 `DD MMM YYYY`（如 `06 Oct 2025`）

- **会议卡片样式迭代**（三轮后定稿）：
  - 最终方案：长条 `<details>` 展开卡，折叠时显示日期 + 标题 + 导师徽标 + 时长
  - 展开后显示 议程 / 备注 / Action Items + Edit / Delete 按钮
  - 统一函数 `meetingDetailsHtml(m, {defaultOpen, compact})`：upcoming 默认展开，past 默认折叠

- **Phase 0.5 目录重构**（为手机 + Supabase 云同步做准备）：
  - 打 git tag `v1.0-before-mobile` 作为回滚快照
  - 新建目录：`shared/`（共用 JS 模块）、`assets/`（PWA 图标 + manifest）、`pwa/`（service worker）、`docs/`（设计文档）
  - 新建占位文档：`docs/supabase-schema.md`、`docs/migration-plan.md`、`docs/mobile-design.md`
  - **`phd-workspace-v3.html` 暂不改名**，避免破坏 GitHub Pages 链接 `https://sylviayee5.github.io/phd-workspace/app/phd-workspace-v3.html`，改名留到后期配合重定向一起做
  - 七阶段迁移路线图见 `docs/migration-plan.md`（Phase 0 Supabase 注册进行中）

## 3. 正在做的部分
- **桌面 PWA + 云同步已上线**：app 已可从 Edge 安装到 Launchpad，自动同步到 Supabase（旧 project `sylviayee5's Project`），手机 / 电脑数据互通
- 核心目标达成，后续主要是观察稳定性与视情况做手机端精简版

### 2026-04-23 补充（云同步修复 + PWA 验证）

- **同步失效问题定位**：`SUPABASE_KEY` 一度写成新格式 `sb_publishable_...`，该格式对 REST API 认证不通过，导致 `saveState` 触发的 `syncPush` 全部失败
  - 修复：换回标准 JWT anon key（`eyJ...`），提交 `2579f18`
  - 验证：设置页「云端同步」卡显示「刚刚推送成功」，Table Editor 中 `updated_at` 实时更新
- **两个 Supabase 项目的用途澄清**（避免未来混淆）：
  - `sylviayee5's Project`（ref `exzigbuwkvrhyjtpizad`）+ row `shu_phd_v2` = **生产**，app 代码里指向这个
  - `phd-workspace`（ref `rjkdtbvohnddbihxioqz`）+ row `shu_phd_v3` = 今天新建后未使用，保留不删
- **PWA 已在 Edge 安装成独立 app**，图标出现在 Launchpad 和 Finder `Microsoft Edge 应用`
- **手机端验证**：PWA 在手机浏览器可「添加到主屏幕」，数据与电脑一致

## 4. 还没开始的部分
- 还没有做真正的多语言资源文件拆分，当前还是单文件内联字典和替换逻辑。
- 还没有把所有 native date picker 的系统级语言问题彻底改成自定义日期组件。
- 还没有做移动端深度适配收尾，只做了当前页面的基础可用性。
- 还没有做更严格的数据校验和错误提示体系。
- 还没有把这个工作台拆成多文件模块，当前仍是单页大文件结构。
- 任务分类标签与 Analytics 图表的联通尚未实现。
- 社交 / 能量 / 出门数据尚未进入 Analytics 看板（仅在首页和生活页有汇总，待数据积累后再加图表）。
- 周日回顾的历史记录尚无列表入口（数据已存，需要补一个查看页）。
- 旧 contactId 小写（如 "zhenzhen"）匹配不到联系人，历史数据显示灰色，属遗留问题未处理。

## 5. 已经定下来的设计方向
- 配色方向：暖色系加柔和低饱和调性，整体偏 Morandi 感，不走生硬高饱和科技风。
- 字体方向：以系统可读性和学术工具的稳定感为主，不追求花哨字体。
- 布局逻辑：左侧偏总览和状态，右侧偏操作和明细，核心信息优先可见，减少来回切页。
- 交互逻辑：所有关键数据尽量就地编辑，不强迫用户跳转到别的页面。
- 模块逻辑：起居、专注、习惯、情绪、投稿、里程碑、看板彼此独立，但共享同一套数据。
- 语言切换方案：保留 `zh / en` 双语切换，静态文本走字典，动态内容走渲染层翻译，选项值单独映射，页面语言状态会被本地记忆。

## 6. 踩过的坑或特殊决定
- 只靠全局文本替换不够，因为很多中文是 JS 动态拼出来的，所以后来改成了函数级本地化。
- 选项翻译不能直接靠文本节点替换，否则会误伤控件值，所以单独做了 option 映射和归一化处理。
- `EN_GLOBAL_TEXT_REPLACEMENTS` 中的词条顺序非常关键：长词条必须排在短词条之前，否则短词条先匹配会破坏长词条的替换（例如"添加文档"必须排在"添加"之前）。
- 里程碑最开始和投稿管理绑在一起，后来拆开了，因为这两类东西的生命周期不一样，绑在一起会让流程显得很乱。
- AI 导入识别功能试过一次，但失败后移除了，避免把一个不稳定功能留在主工作流里。
- 为了让英国用户能直接使用，很多模块不只是翻译字面意思，还补了更自然的英文表达。
- 日期和时间展示尽量统一成英国用户能理解的格式，但原生浏览器日期控件的弹窗语言仍可能受系统环境影响。
- 这套 app 现在的重点不是"再加很多功能"，而是把已有功能打磨到可长期使用。
- 移动端同步的根本问题是 localStorage 不跨设备，推荐方案是 Firebase Realtime Database（免费层）+ GitHub Pages 托管，尚未实施。
