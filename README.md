# MeowKnit

MeowKnit 是个人手工品牌静态作品集 MVP，用于按用途（家居、首饰、宠物用品等）和工艺（梭编、钩针、绳编、针织）展示作品。

当前项目是基于 Vite + Vue + TypeScript 的静态网站，目标是先跑通作品展示、内容维护和 Vercel 自动部署流程。

## 本地开发

安装依赖：

```bash
npm install
```

启动本地开发服务器：

```bash
npm run dev
```

## 验证命令

运行测试：

```bash
npm run test
```

构建生产版本：

```bash
npm run build
```

## 内容维护

产品内容主要维护在 `src/content/`：

- `src/content/products.ts` 定义产品列表、双语描述、精选状态、图片和 CTA 链接。
- `src/content/usageCategories.ts` 定义双语用途分类。
- `src/content/craftCategories.ts` 定义双语工艺分类。
- `src/content/catalog.ts` 根据当前语言组合产品和两类分类，并根据 Etsy、咨询或社交链接生成展示按钮。

作品类型维护在 `src/types/work.ts`：

- `UsageCategoryId` 和 `CraftCategoryId` 定义可用分类 ID。
- `WorkCategory`、`WorkImage`、`Work` 和 `WorkCta` 定义作品集数据结构。

真实产品图片放在 `public/images/products/`。图片字段通过 `images` 数组维护。每张图片至少需要双语 `alt` 和 `gradient`；`gradient` 作为当前 MVP 的占位图背景。接入真实图片时，在图片对象中添加 `src`，例如 `/images/products/momo-cardigan-front.jpg`，并继续保留有意义的中英文 `alt` 文案用于可访问性和内容说明。

网站支持 `/zh-CN` 和 `/en` 两个语言路径，默认语言是简体中文。

更详细的维护说明见 `docs/content-management.md`。

## 部署流程

1. 将 GitHub 仓库连接到 Vercel。
2. 在 Vercel 中选择当前 Vite 项目，使用默认构建命令 `npm run build`。
3. 后续 push 到 `main` 分支后，由 Vercel 自动触发构建并部署静态站点。

## MVP 范围

当前 MVP 包含：

- 静态作品展示。
- 按用途和工艺两种分类浏览作品。
- 查看作品详情。
- 混合 CTA：支持 Etsy 链接、咨询入口和社交关注入口。

当前暂不包含：

- 自研后台。
- 登录。
- 支付。
- 购物车。
