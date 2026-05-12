# 产品内容维护指南

这个项目的 MVP 先用代码库管理产品内容。你主要需要关注两个位置：

- `src/content/`：管理双语分类、双语产品描述、链接和占位色。
- `public/images/products/`：存放真实产品图片。

## 推荐目录结构

```text
src/
  content/
    README.md
    catalog.ts
    craftCategories.ts
    products.ts
    usageCategories.ts
  types/
    work.ts
public/
  images/
    products/
      README.md
      momo-cardigan-front.jpg
      momo-cardigan-detail.jpg
```

## 添加产品

1. 将产品图片放入 `public/images/products/`。
2. 打开 `src/content/products.ts`。
3. 在 `products` 数组里复制一个已有产品对象。
4. 修改 `slug`、`name`、`usageCategory`、`craftCategory`、`description`、`images`、`featured` 和链接字段。
5. 运行 `npm run test -- --run` 和 `npm run build`。

## 产品字段说明

- `slug`：产品唯一标识，用英文小写和连字符，例如 `momo-cardigan`。
- `name`：页面展示的产品名，需要同时维护 `zh-CN` 和 `en`。
- `usageCategory`：用途分类 id，必须来自 `src/content/usageCategories.ts`。
- `craftCategory`：工艺分类 id，必须来自 `src/content/craftCategories.ts`。
- `description`：简短产品介绍，需要同时维护 `zh-CN` 和 `en`。
- `images`：产品图片列表。
- `featured`：是否标记为精选。
- `etsyUrl`：如果产品有 Etsy 链接，填写这个字段。
- `inquiryUrl`：如果希望访客咨询，填写这个字段。
- `socialUrl`：如果只想引导关注社交账号，填写这个字段。

## 图片字段说明

```ts
images: [
  {
    src: '/images/products/momo-cardigan-front.jpg',
    alt: {
      'zh-CN': 'Momo 奶油短开衫正面图',
      en: 'Front view of the Momo cream cropped cardigan',
    },
    gradient: 'linear-gradient(135deg, #f8decf 0%, #fff6e9 48%, #d68e7a 100%)',
  },
]
```

- `src`：真实图片路径，从 `/images/products/` 开始。
- `alt`：图片说明，需要同时维护 `zh-CN` 和 `en`，帮助可访问性和搜索理解。
- `gradient`：没有真实图片或图片加载前的占位背景，建议保留。

## 分类维护

分类分成两个文件维护：

- `src/content/usageCategories.ts`：用途分类，例如家居、首饰、宠物用品、包袋、礼物。
- `src/content/craftCategories.ts`：工艺分类，例如梭编、钩针、绳编、针织。

分类的 `label` 和 `description` 也需要同时维护 `zh-CN` 和 `en`。

如果新增分类，需要同时：

1. 在 `src/types/work.ts` 的 `UsageCategoryId` 或 `CraftCategoryId` 中添加新的分类 id。
2. 在对应的 `usageCategories.ts` 或 `craftCategories.ts` 添加分类名称和描述。
3. 在 `src/content/products.ts` 的产品中使用新分类。
