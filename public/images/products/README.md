# 产品媒体目录

把真实产品图片和本地视频放在这个目录下。

推荐命名：

- 使用英文小写、数字和连字符。
- 文件名尽量和产品 `slug` 对应。
- 示例：`momo-cardigan-front.jpg`、`momo-cardigan-detail.jpg`。
- 视频示例：`crochet-dumpling-keychain-video.mp4`。

在 `src/content/products.ts` 中引用图片时，路径从 `/images/products/` 开始：

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

`gradient` 是图片加载前或没有真实图片时的占位背景，建议保留。

本地视频在 `src/content/products.ts` 中使用 `videoSrc` 引用：

```ts
videoSrc: '/images/products/crochet-dumpling-keychain-video.mp4'
```
