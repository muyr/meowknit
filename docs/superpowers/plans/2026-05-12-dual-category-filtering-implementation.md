# MeowKnit 双分类筛选实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将作品集从单一分类改为“用途分类 + 工艺分类”双维度筛选，并在卡片和详情页展示两个标签。

**Architecture:** `src/content/` 拆分为 `usageCategories.ts` 和 `craftCategories.ts`，产品从 `category` 改为 `usageCategory` 与 `craftCategory`。`catalog.ts` 根据 locale 输出页面可渲染数据，`App.vue` 维护两个筛选状态并执行组合筛选。

**Tech Stack:** Vue、TypeScript、Vitest、Vite。

---

## 文件结构

- 修改 `src/types/work.ts`：新增 `UsageCategoryId`、`CraftCategoryId`、双分类原始和渲染类型。
- 新建 `src/content/usageCategories.ts`：用途分类双语数据。
- 新建 `src/content/craftCategories.ts`：工艺分类双语数据。
- 修改 `src/content/products.ts`：产品改为 `usageCategory` 和 `craftCategory`。
- 修改 `src/content/catalog.ts`：输出用途分类、工艺分类、产品双标签。
- 修改 `src/App.vue`：维护用途和工艺两个筛选状态。
- 修改 `src/components/CategoryFilter.vue`：支持复用为带标题的筛选组。
- 修改 `src/components/WorkCard.vue`、`src/components/WorkDetail.vue`：展示用途和工艺标签。
- 修改 `src/i18n/locales.ts`：新增用途/工艺筛选文案。
- 修改 `src/__tests__/works.test.ts`、`src/__tests__/App.test.ts`：覆盖数据合法性和组合筛选。
- 更新 `docs/content-management.md`、`src/content/README.md`、`README.md`。

## Task 1: 数据模型和数据测试

**Files:**
- Modify: `src/types/work.ts`
- Create: `src/content/usageCategories.ts`
- Create: `src/content/craftCategories.ts`
- Modify: `src/content/products.ts`
- Modify: `src/content/catalog.ts`
- Test: `src/__tests__/works.test.ts`

- [ ] **Step 1: 写失败测试**

在 `src/__tests__/works.test.ts` 中验证：
- 每个产品都有合法的 `usageCategory` 和 `craftCategory`。
- 每个用途分类和工艺分类都有 `zh-CN` 与 `en`。
- `getWorks('zh-CN')` 返回的产品包含可渲染的 `usageCategory` 与 `craftCategory` 标签。

Run: `npm run test -- src/__tests__/works.test.ts --run`

Expected: 失败，因为当前产品仍使用单一 `category`。

- [ ] **Step 2: 实现类型和内容数据**

将产品字段改为：

```ts
usageCategory: 'home'
craftCategory: 'crochet'
```

并新增用途分类：`home`、`jewelry`、`pet-goods`、`bags`、`gifts`；工艺分类：`tatting`、`crochet`、`macrame`、`knitting`。

- [ ] **Step 3: 更新 catalog**

`catalog.ts` 导出：
- `getUsageCategories(locale)`
- `getCraftCategories(locale)`
- `getWorks(locale)`
- `rawUsageCategories`
- `rawCraftCategories`

`Work` 渲染对象应包含双标签字段，供组件直接展示。

## Task 2: 双筛选 UI 和页面行为

**Files:**
- Modify: `src/i18n/locales.ts`
- Modify: `src/App.vue`
- Modify: `src/components/CategoryFilter.vue`
- Modify: `src/components/WorkCard.vue`
- Modify: `src/components/WorkDetail.vue`
- Test: `src/__tests__/App.test.ts`

- [ ] **Step 1: 写失败测试**

在 `src/__tests__/App.test.ts` 中验证：
- 作品集页显示“用途”和“工艺”两组筛选。
- 选择用途会过滤作品。
- 选择工艺会过滤作品。
- 同时选择用途和工艺会组合过滤。
- 卡片或详情展示用途与工艺标签。
- 英文页面显示英文筛选文案。

Run: `npm run test -- src/__tests__/App.test.ts --run`

Expected: 失败，因为 UI 仍只有单一筛选组。

- [ ] **Step 2: 实现双筛选状态**

`App.vue` 新增：
- `activeUsageCategory`
- `activeCraftCategory`

组合筛选逻辑：产品必须同时满足已选用途和已选工艺。

- [ ] **Step 3: 更新组件展示**

`CategoryFilter.vue` 变成可复用筛选组，接收 `title`、`allLabel`、`categories`、`activeCategory`。

`WorkCard.vue` 和 `WorkDetail.vue` 展示两个标签：用途与工艺。

## Task 3: 文档和验证

**Files:**
- Modify: `README.md`
- Modify: `docs/content-management.md`
- Modify: `src/content/README.md`

- [ ] **Step 1: 更新维护文档**

说明产品需要维护 `usageCategory` 与 `craftCategory`，分类分别在 `usageCategories.ts` 和 `craftCategories.ts`。

- [ ] **Step 2: 完整验证**

Run: `npm run test -- --run`

Expected: 所有测试通过。

Run: `npm run build`

Expected: 类型检查和生产构建通过。
