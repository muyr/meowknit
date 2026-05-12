# Meowknit

Meowknit 是个人手工品牌静态作品集 MVP，用于展示手工针织、钩针包袋、家居织物、宠物配件、迷你玩偶和节日礼物等作品。

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

作品数据维护在 `src/data/works.ts`：

- `categories` 定义作品分类。
- `works` 定义作品列表、分类、描述、精选状态和 CTA 链接。
- `getWorkCta()` 根据作品是否有 Etsy、咨询或社交链接生成展示按钮。

作品类型维护在 `src/types/work.ts`：

- `WorkCategoryId` 定义可用分类 ID。
- `WorkCategory`、`WorkImage`、`Work` 和 `WorkCta` 定义作品集数据结构。

图片字段通过 `images` 数组维护。每张图片至少需要 `alt` 和 `gradient`；`gradient` 作为当前 MVP 的占位图背景。后续接入真实图片时，可以在图片对象中添加 `src`，并继续保留有意义的 `alt` 文案用于可访问性和内容说明。

## 部署流程

1. 将 GitHub 仓库连接到 Vercel。
2. 在 Vercel 中选择当前 Vite 项目，使用默认构建命令 `npm run build`。
3. 后续 push 到 `main` 分支后，由 Vercel 自动触发构建并部署静态站点。

## MVP 范围

当前 MVP 包含：

- 静态作品展示。
- 按分类浏览作品。
- 查看作品详情。
- 混合 CTA：支持 Etsy 链接、咨询入口和社交关注入口。

当前暂不包含：

- 自研后台。
- 登录。
- 支付。
- 购物车。
