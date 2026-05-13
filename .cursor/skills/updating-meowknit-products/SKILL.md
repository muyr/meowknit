---
name: updating-meowknit-products
description: Use when adding or updating MeowKnit product/work entries from Chinese source text, including product attributes, bilingual translations, images, local videos, variants, YouTube videos, Etsy links, and content validation.
---

# Updating MeowKnit Products

## Purpose

Use this skill when the user wants to add or update works/products for the MeowKnit site. The user may write product information in Chinese; treat Chinese as the source of truth and translate required localized fields into English.

## Source Files

- Product data: `src/content/products.ts`
- Usage categories: `src/content/usageCategories.ts`
- Craft categories: `src/content/craftCategories.ts`
- Types/schema: `src/types/work.ts`
- Product images and videos: `public/images/products/`
- Maintenance docs: `docs/content-management.md`, `src/content/README.md`

## Required Input

Before editing, make sure the product request has enough information:

- Whether this is a new product or an update to an existing `slug`.
- Chinese product name and Chinese description.
- `usageCategory`: one of `home`, `jewelry`, `pet-goods`, `bags`, `gifts`, `charms`.
- `craftCategory`: one of `tatting`, `crochet`, `macrame`, `knitting`, `silk-wrapped`.
- At least one image entry with either `src` or `gradient`, plus Chinese `alt`.
- Whether the work is `featured`.
- CTA target: `etsyUrl`, `inquiryUrl`, or `socialUrl`.

Optional fields:

- `youtubeVideoId`: YouTube video ID only, not a full URL.
- `videoSrc`: single local video path from `/images/products/`, preferably `.mp4`, such as `/images/products/example-video.mp4`.
- `videoSrcs`: multiple local video paths from `/images/products/`, preferably `.mp4`.
- `variants`: color/style options with Chinese labels and target `imageIndex`.
- Additional images, real media filenames, or placeholder gradient preferences.

If required information is missing, ask concise clarifying questions before editing. If the user gives a full YouTube URL, extract the video ID.

## Translation Rules

- Preserve brand spelling as `MeowKnit`.
- Keep product names natural in English; do not transliterate unless the name is intentionally branded.
- Translate descriptions warmly and concisely, matching the handmade portfolio tone.
- Translate image `alt` text literally enough to describe the visible image.
- Translate variant labels as short labels, e.g. `奶油白` -> `Cream White`.
- Do not translate URLs, slugs, category ids, or file paths.

## Editing Workflow

1. Read `src/types/work.ts`, `src/content/products.ts`, `src/content/usageCategories.ts`, and `src/content/craftCategories.ts`.
2. Confirm the requested categories exist. If not, ask whether to add new categories before changing product data.
3. For a new product, create a unique kebab-case `slug` from the English name or a concise English description.
4. Add or update the matching object in `products`.
5. Fill every localized field with both `zh-CN` and `en`.
6. For images:
   - Real images use paths like `/images/products/example-front.jpg`.
   - Placeholder images must keep a meaningful `gradient`.
   - Every image needs localized `alt`.
7. For local videos:
   - Copy videos into `public/images/products/`.
   - Use stable kebab-case names like `crochet-dumpling-keychain-video.mp4`.
   - Reference one video with `videoSrc`; reference multiple videos with `videoSrcs`.
8. For variants:
   - Use stable lowercase ids like `cream`, `peach`, `navy`.
   - Ensure every `imageIndex` is within the `images` array.
9. Do not change Vue components unless the requested product information requires a schema or UI change.
10. Update docs only if the content schema changes.

## Validation

After edits, run:

```bash
npm run test -- --run
npm run build
```

Also use lints for touched files when available. If validation fails, fix the issue before reporting completion.

## Example User Input

```text
新增作品：樱桃红梭编耳环
用途：首饰
工艺：梭编
描述：轻盈的红色梭编耳环，适合节日和日常点缀。
图片：cherry-tatting-earrings-front.jpg，alt：樱桃红梭编耳环正面
精选：是
Etsy：https://www.etsy.com/...
变体：樱桃红对应第 0 张图
```

Expected action: add a `RawWork` entry in `src/content/products.ts` with bilingual name, description, image alt, variant label, valid category ids, and CTA URL.
