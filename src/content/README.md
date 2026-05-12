# 内容维护入口

这个目录用于维护网站展示的产品内容，尽量不要在组件里直接改文案。

## 常用文件

- `products.ts`：维护产品双语名称、双语描述、图片、精选状态和 Etsy/咨询链接。
- `usageCategories.ts`：维护用途分类的双语名称和说明，例如家居、首饰、宠物用品。
- `craftCategories.ts`：维护工艺分类的双语名称和说明，例如梭编、钩针、绳编。
- `catalog.ts`：把产品和两类分类组合成网站可用的数据，并生成 CTA。

## 添加一个产品

1. 把产品图片放到 `public/images/products/`。
2. 在 `products.ts` 的 `products` 数组里新增一项。
3. `slug` 必须唯一，建议使用英文小写和连字符，例如 `cream-cat-scarf`。
4. `usageCategory` 必须使用 `usageCategories.ts` 中已经存在的分类 id。
5. `craftCategory` 必须使用 `craftCategories.ts` 中已经存在的分类 id。
6. 图片路径写成 `/images/products/your-file.jpg`。
7. 如果有本地视频，视频路径写成 `/images/products/your-file.mov` 或 `/images/products/your-file.mp4`，并填到 `videoSrc`。

如果暂时没有真实图片，可以先只写 `gradient` 占位背景；有真实图片后再补 `src`。

产品名称、描述和图片 `alt` 都需要同时填写：

```ts
name: {
  'zh-CN': 'Momo 奶油短开衫',
  en: 'Momo Cream Cropped Cardigan',
}
```
