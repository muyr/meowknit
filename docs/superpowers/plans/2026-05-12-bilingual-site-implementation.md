# MeowKnit 双语网站实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**目标：** 在现有 Vue 静态作品集 MVP 上支持简体中文和英语，让访客可通过 `/zh-CN` 与 `/en` 访问对应语言版本，并可在页面中切换语言。

**架构：** 不引入大型 i18n 依赖。新增 `src/i18n/` 管语言类型、UI 文案和路径解析；将 `src/content/` 的可翻译产品/分类字段改为双语结构；由 `catalog.ts` 根据当前语言输出页面可直接渲染的数据。

**Tech Stack:** Vue、TypeScript、Vitest、Vite、History API。

---

## 文件结构

- 创建 `src/i18n/locales.ts`：定义 `Locale`、默认语言、语言列表、UI 文案。
- 创建 `src/i18n/routing.ts`：解析路径语言、生成语言路径。
- 修改 `src/types/work.ts`：增加可翻译字段类型和可渲染产品/分类类型。
- 修改 `src/content/categories.ts`：分类名和描述改为双语。
- 修改 `src/content/products.ts`：产品名、描述、图片 alt 改为双语。
- 修改 `src/content/catalog.ts`：新增按语言获取分类、产品和 CTA 的函数。
- 修改 `src/App.vue`：管理当前语言，传入翻译后内容和 UI 文案。
- 修改 `src/components/*.vue`：移除硬编码中文，接收 UI 文案和翻译后数据。
- 修改 `src/__tests__/works.test.ts`：验证每个产品/分类都有中英文内容。
- 修改 `src/__tests__/App.test.ts`：验证中文默认、英文路径、语言切换和 CTA。
- 修改 `docs/content-management.md`、`README.md`：说明双语内容维护方式。

## Task 1: 建立 i18n 基础类型和路径工具

**Files:**
- Create: `src/i18n/locales.ts`
- Create: `src/i18n/routing.ts`
- Modify: `src/types/work.ts`
- Test: `src/__tests__/works.test.ts`

- [ ] **Step 1: 写失败测试**

测试 `src/__tests__/works.test.ts` 应要求：

- `products` 的 `name`、`description`、每张图片 `alt` 都包含 `zh-CN` 和 `en`。
- `categories` 的 `label` 和 `description` 都包含 `zh-CN` 和 `en`。
- 可用语言为 `zh-CN` 和 `en`。

Run: `npm run test -- src/__tests__/works.test.ts --run`

Expected: 失败，因为当前内容仍是单语言字符串。

- [ ] **Step 2: 实现基础 i18n 类型**

`src/i18n/locales.ts` 应导出：

- `type Locale = 'zh-CN' | 'en'`
- `DEFAULT_LOCALE = 'zh-CN'`
- `locales = ['zh-CN', 'en'] as const`
- `uiCopy`，包含 hero、分类筛选、作品区、CTA、页脚、语言切换和关闭按钮文案。

`src/i18n/routing.ts` 应导出：

- `getLocaleFromPath(pathname: string): Locale`
- `getLocalePath(locale: Locale): string`

- [ ] **Step 3: 更新产品类型**

`src/types/work.ts` 应支持：

- `LocalizedText = Record<Locale, string>`
- 原始内容类型使用双语字段。
- 渲染内容类型保留当前组件容易消费的单语言字符串字段。

## Task 2: 改造内容数据和 catalog 输出

**Files:**
- Modify: `src/content/categories.ts`
- Modify: `src/content/products.ts`
- Modify: `src/content/catalog.ts`
- Modify: `src/data/works.ts`
- Test: `src/__tests__/works.test.ts`

- [ ] **Step 1: 将分类和产品内容改为双语**

所有产品和分类的中文内容保留现有表达，补充自然英文文案。共享字段如 `slug`、`category`、`featured`、链接、图片 `src` 和 `gradient` 不重复翻译。

- [ ] **Step 2: 在 catalog 中按语言生成渲染数据**

`catalog.ts` 应导出：

- `getCategories(locale: Locale)`
- `getWorks(locale: Locale)`
- `getWorkCta(work, locale)`
- 兼容导出 `categories`、`products`、`works`，供测试或旧代码读取原始数据。

- [ ] **Step 3: 运行内容测试**

Run: `npm run test -- src/__tests__/works.test.ts --run`

Expected: 通过。

## Task 3: 更新页面语言状态和组件文案

**Files:**
- Modify: `src/App.vue`
- Modify: `src/components/HeroSection.vue`
- Modify: `src/components/CategoryFilter.vue`
- Modify: `src/components/WorkGrid.vue`
- Modify: `src/components/WorkDetail.vue`
- Modify: `src/components/SiteFooter.vue`
- Modify: `src/assets/styles.css`
- Test: `src/__tests__/App.test.ts`

- [ ] **Step 1: 写页面行为失败测试**

测试应覆盖：

- 默认路径显示中文内容。
- `window.location.pathname = '/en'` 时显示英文 Hero、英文分类、英文产品名。
- 点击语言切换按钮后显示另一种语言。
- 英文 CTA 显示英文文案但链接保持不变。
- 分类筛选在英文下仍能过滤。

Run: `npm run test -- src/__tests__/App.test.ts --run`

Expected: 失败，因为页面还没有语言状态和切换 UI。

- [ ] **Step 2: 实现页面语言状态**

`App.vue` 从 `window.location.pathname` 读取初始语言，计算翻译后的 `categories`、`works` 和 `copy`，并提供语言切换函数。切换时更新路径到 `/zh-CN` 或 `/en`。

- [ ] **Step 3: 更新组件 props**

组件不应硬编码中文 UI 文案。需要通过 props 接收：

- Hero 文案。
- 分类“全部作品”文案。
- 作品区标题。
- 关闭按钮文案。
- 页脚文案。
- 语言切换文案。

- [ ] **Step 4: 运行页面测试**

Run: `npm run test -- src/__tests__/App.test.ts --run`

Expected: 通过。

## Task 4: 文档和最终验证

**Files:**
- Modify: `docs/content-management.md`
- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-05-12-bilingual-site-design.md` only if implementation reveals wording that should be clarified.

- [ ] **Step 1: 更新维护文档**

说明产品内容现在需要维护 `zh-CN` 和 `en` 两套文案，并给出产品图片 alt 的双语示例。

- [ ] **Step 2: 最终验证**

Run: `npm run test -- --run`

Expected: 所有测试通过。

Run: `npm run build`

Expected: 类型检查和 Vite 构建通过。

- [ ] **Step 3: 检查 git 状态**

Run: `git status --short`

Expected: 只包含本轮双语、logo 和内容结构相关改动。
