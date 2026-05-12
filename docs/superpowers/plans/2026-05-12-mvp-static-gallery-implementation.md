# Meowknit MVP 静态作品集实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**目标：** 初始化仓库并搭建一个可部署到 Vercel 的 Vue 静态作品集 MVP，用于跑通从代码编写、验证、提交到 GitHub 自动上线的流程。

**架构：** 使用 Vite + Vue + TypeScript 构建单页静态网站。作品数据放在本地结构化 TypeScript 文件中，图片使用仓库静态资源，页面由组件组合出首页、分类筛选、作品网格和作品详情弹窗/区域。

**技术栈：** Vue、Vite、TypeScript、Vitest、@vue/test-utils、jsdom、CSS。

---

## 文件结构

- 创建 `package.json`：npm 脚本、依赖和项目信息。
- 创建 `index.html`：Vite 入口 HTML。
- 创建 `vite.config.ts`：Vue 插件与测试环境配置。
- 创建 `tsconfig.json`、`tsconfig.node.json`：TypeScript 配置。
- 创建 `src/main.ts`：挂载 Vue 应用。
- 创建 `src/App.vue`：页面结构和交互状态。
- 创建 `src/content/`：产品分类、产品数据和 catalog 入口。
- 保留 `src/data/works.ts`：兼容旧导入的 re-export。
- 创建 `src/types/work.ts`：作品数据类型。
- 创建 `src/components/*.vue`：品牌头图、分类筛选、作品网格、作品卡片、作品详情、站点页脚。
- 创建 `src/assets/styles.css`：全站样式。
- 创建 `src/__tests__/works.test.ts`：验证作品数据结构和分类一致性。
- 创建 `src/__tests__/App.test.ts`：验证页面渲染、分类筛选和 CTA。
- 创建 `README.md`：本地开发、测试、构建、Vercel 部署说明。
- 创建 `.gitignore`：忽略依赖、构建产物、环境文件和本地缓存。

## Task 1: 初始化 Vue/Vite 工程和测试工具

**Files:**
- Create: `.gitignore`
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `src/main.ts`
- Create: `src/App.vue`
- Create: `src/assets/styles.css`

- [ ] **Step 1: 写入最小 Vite + Vue + TypeScript 工程文件**

创建能运行、能测试、能构建的基础工程。`App.vue` 先只渲染品牌名和一句 MVP 文案。

- [ ] **Step 2: 安装依赖**

Run: `npm install`

Expected: creates `node_modules` and `package-lock.json`.

- [ ] **Step 3: 验证基础工程**

Run: `npm run build`

Expected: build exits with code 0 and creates `dist/`.

## Task 2: 实现静态作品集数据和页面

**Files:**
- Create: `src/types/work.ts`
- Create: `src/content/categories.ts`
- Create: `src/content/products.ts`
- Create: `src/content/catalog.ts`
- Create: `src/content/README.md`
- Create: `public/images/products/README.md`
- Modify: `src/data/works.ts`
- Create: `src/components/HeroSection.vue`
- Create: `src/components/CategoryFilter.vue`
- Create: `src/components/WorkGrid.vue`
- Create: `src/components/WorkCard.vue`
- Create: `src/components/WorkDetail.vue`
- Create: `src/components/SiteFooter.vue`
- Modify: `src/App.vue`
- Modify: `src/assets/styles.css`
- Create: `src/__tests__/works.test.ts`
- Create: `src/__tests__/App.test.ts`

- [ ] **Step 1: 先写作品数据测试**

测试应验证：所有作品 slug 唯一、每个作品分类存在、至少有 5 个作品、作品 CTA 可根据 Etsy 链接或咨询入口得到有效结果。

Run: `npm run test -- src/__tests__/works.test.ts`

Expected before implementation: fails because data module does not exist.

- [ ] **Step 2: 实现作品类型、分类和示例数据**

创建 5-6 个作品类型分类和一组示例作品。示例图片可以先使用 `logo.jpg` 或 CSS 渐变占位，但数据结构必须支持多图、简短描述、可选 Etsy 链接和可选咨询入口。

- [ ] **Step 3: 运行数据测试**

Run: `npm run test -- src/__tests__/works.test.ts`

Expected after implementation: passes.

- [ ] **Step 4: 先写页面行为测试**

测试应验证：首页显示品牌名和精选作品；点击分类后只显示该分类作品；点击作品后显示详情；有 Etsy 链接的作品显示 Etsy CTA，没有 Etsy 链接的作品显示咨询或关注 CTA。

Run: `npm run test -- src/__tests__/App.test.ts`

Expected before UI implementation: fails because UI behavior is missing.

- [ ] **Step 5: 实现页面组件和样式**

页面应包含品牌头图、分类筛选、响应式作品网格、作品详情区域/弹窗、页脚。视觉方向为温暖、时尚、手工感、图片主导。

- [ ] **Step 6: 运行页面测试和构建**

Run: `npm run test`

Expected: all tests pass.

Run: `npm run build`

Expected: build exits with code 0.

## Task 3: 文档、最终验证和 GitHub 提交

**Files:**
- Create: `README.md`
- Modify: existing project docs only if needed for accuracy.

- [ ] **Step 1: 写 README**

README 应说明项目目标、本地运行、测试、构建、内容维护方式和 Vercel/GitHub 自动部署流程。

- [ ] **Step 2: 最终验证**

Run: `npm run test`

Expected: all tests pass.

Run: `npm run build`

Expected: build exits with code 0.

- [ ] **Step 3: 提交并推送**

Run: `git status --short`

Expected: shows intended new project files.

Run: `git add .`

Run: `git commit -m "Initialize Meowknit static gallery MVP"`

Run: `git push -u origin main`

Expected: push succeeds and GitHub receives the initial project commit.
