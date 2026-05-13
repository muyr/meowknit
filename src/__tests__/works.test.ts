import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { DEFAULT_LOCALE, locales } from '../i18n/locales'
import {
  getCraftCategories,
  getUsageCategories,
  getWorkCta,
  getWorks,
  products,
  rawCraftCategories,
  rawUsageCategories,
} from '../content/catalog'

const works = getWorks(DEFAULT_LOCALE)
const usageCategories = getUsageCategories(DEFAULT_LOCALE)
const craftCategories = getCraftCategories(DEFAULT_LOCALE)

describe('works data', () => {
  it('provides at least five portfolio works with unique slugs', () => {
    expect(works.length).toBeGreaterThanOrEqual(5)

    const slugs = works.map((work) => work.slug)

    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('keeps separate usage and craft category sets', () => {
    expect(usageCategories.map((category) => category.id)).toEqual([
      'home',
      'jewelry',
      'pet-goods',
      'bags',
      'gifts',
      'charms',
    ])
    expect(craftCategories.map((category) => category.id)).toEqual([
      'tatting',
      'crochet',
      'macrame',
      'knitting',
      'silk-wrapped',
    ])
  })

  it('supports Simplified Chinese and English content for every product and category type', () => {
    expect(locales).toEqual(['zh-CN', 'en'])

    for (const product of products) {
      for (const locale of locales) {
        expect(product.name[locale].trim()).not.toHaveLength(0)
        expect(product.description[locale].trim()).not.toHaveLength(0)

        for (const image of product.images) {
          expect(image.alt[locale].trim()).not.toHaveLength(0)
        }

        for (const variant of product.variants ?? []) {
          expect(variant.label[locale].trim()).not.toHaveLength(0)
        }
      }
    }

    for (const category of [...rawUsageCategories, ...rawCraftCategories]) {
      for (const locale of locales) {
        expect(category.label[locale].trim()).not.toHaveLength(0)
        expect(category.description[locale].trim()).not.toHaveLength(0)
      }
    }
  })

  it('uses only declared usage and craft categories', () => {
    const usageCategoryIds = new Set(usageCategories.map((category) => category.id))
    const craftCategoryIds = new Set(craftCategories.map((category) => category.id))

    for (const work of works) {
      expect(usageCategoryIds.has(work.usageCategory.id)).toBe(true)
      expect(craftCategoryIds.has(work.craftCategory.id)).toBe(true)
    }
  })

  it('provides renderable content and images for every work', () => {
    for (const work of works) {
      expect(work.name.trim()).not.toHaveLength(0)
      expect(work.description.trim()).not.toHaveLength(0)
      expect(work.usageCategory.label.trim()).not.toHaveLength(0)
      expect(work.craftCategory.label.trim()).not.toHaveLength(0)
      expect(work.images.length).toBeGreaterThanOrEqual(1)

      for (const image of work.images) {
        expect(image.alt.trim()).not.toHaveLength(0)
        expect(Boolean(image.src?.trim() || image.gradient.trim())).toBe(true)
      }
    }
  })

  it('includes the crochet dumpling keychain as a featured charm', () => {
    const dumplingKeychain = works.find((work) => work.slug === 'crochet-dumpling-keychain')

    expect(dumplingKeychain).toBeDefined()
    expect(dumplingKeychain?.name).toBe('饺子钥匙扣')
    expect(dumplingKeychain?.usageCategory.id).toBe('charms')
    expect(dumplingKeychain?.craftCategory.id).toBe('crochet')
    expect(dumplingKeychain?.images.map((image) => image.src)).toEqual([
      '/images/products/crochet-dumpling-keychain-1.jpg',
      '/images/products/crochet-dumpling-keychain-2.jpg',
      '/images/products/crochet-dumpling-keychain-3.jpg',
    ])
    expect(dumplingKeychain?.videoSrc).toBe('/images/products/crochet-dumpling-keychain-video.mp4')
    expect(dumplingKeychain?.featured).toBe(true)
    expect(dumplingKeychain?.etsyUrl).toBe('https://www.etsy.com/shop/meowknit')
  })

  it('includes the crochet pet snood as a featured pet good', () => {
    const petSnood = works.find((work) => work.slug === 'crochet-pet-snood')

    expect(petSnood).toBeDefined()
    expect(petSnood?.name).toBe('宠物围脖')
    expect(petSnood?.usageCategory.id).toBe('pet-goods')
    expect(petSnood?.craftCategory.id).toBe('crochet')
    expect(petSnood?.images.map((image) => image.src)).toEqual([
      '/images/products/crochet-pet-snood-1.jpg',
      '/images/products/crochet-pet-snood-2.jpg',
      '/images/products/crochet-pet-snood-3.jpg',
      '/images/products/crochet-pet-snood-4.jpg',
    ])
    expect(petSnood?.featured).toBe(true)
    expect(petSnood?.etsyUrl).toBe('https://www.etsy.com/shop/meowknit')
  })

  it('includes the crochet Shaun sheep figurine with multiple local videos', () => {
    const shaunSheep = works.find((work) => work.slug === 'crochet-shaun-sheep-figurine')

    expect(shaunSheep).toBeDefined()
    expect(shaunSheep?.name).toBe('小羊肖恩摆件')
    expect(shaunSheep?.usageCategory.id).toBe('home')
    expect(shaunSheep?.craftCategory.id).toBe('crochet')
    expect(shaunSheep?.images.map((image) => image.src)).toEqual([
      '/images/products/crochet-shaun-sheep-figurine-1.jpg',
      '/images/products/crochet-shaun-sheep-figurine-2.jpg',
    ])
    expect(shaunSheep?.videoSrcs).toEqual([
      '/images/products/crochet-shaun-sheep-figurine-video-1.mp4',
      '/images/products/crochet-shaun-sheep-figurine-video-2.mp4',
    ])
    expect(shaunSheep?.featured).toBe(true)
    expect(shaunSheep?.etsyUrl).toBe('https://www.etsy.com/shop/meowknit')
  })

  it('includes the crochet Oreo keychain as a featured charm with local video', () => {
    const oreoKeychain = works.find((work) => work.slug === 'crochet-oreo-keychain')

    expect(oreoKeychain).toBeDefined()
    expect(oreoKeychain?.name).toBe('奥利奥钥匙链')
    expect(oreoKeychain?.usageCategory.id).toBe('charms')
    expect(oreoKeychain?.craftCategory.id).toBe('crochet')
    expect(oreoKeychain?.images.map((image) => image.src)).toEqual([
      '/images/products/crochet-oreo-keychain-1.jpg',
      '/images/products/crochet-oreo-keychain-2.jpg',
      '/images/products/crochet-oreo-keychain-3.jpg',
    ])
    expect(oreoKeychain?.videoSrc).toBe('/images/products/crochet-oreo-keychain-video.mp4')
    expect(oreoKeychain?.featured).toBe(true)
    expect(oreoKeychain?.etsyUrl).toBe('https://www.etsy.com/shop/meowknit')
  })

  it('includes the Chinese style hairpin as a featured silk-wrapped jewelry piece', () => {
    const chineseHairpin = works.find((work) => work.slug === 'silk-wrapped-chinese-hairpin')

    expect(chineseHairpin).toBeDefined()
    expect(chineseHairpin?.name).toBe('中国风发簪')
    expect(chineseHairpin?.usageCategory.id).toBe('jewelry')
    expect(chineseHairpin?.craftCategory.id).toBe('silk-wrapped')
    expect(chineseHairpin?.images.map((image) => image.src)).toEqual([
      '/images/products/silk-wrapped-chinese-hairpin-1.jpg',
      '/images/products/silk-wrapped-chinese-hairpin-2.jpg',
    ])
    expect(chineseHairpin?.featured).toBe(true)
    expect(chineseHairpin?.etsyUrl).toBe('https://www.etsy.com/shop/meowknit')
  })

  it('includes the crochet figurine series as featured home pieces', () => {
    const expectedFigurines = [
      ['crochet-mushroom-figurine', '蘑菇钩针摆件', '/images/products/crochet-mushroom-figurine.jpg'],
      ['crochet-baba-mandarin-figurine', '耙耙柑钩针摆件', '/images/products/crochet-baba-mandarin-figurine.jpg'],
      ['crochet-carrot-figurine', '萝卜钩针摆件', '/images/products/crochet-carrot-figurine.jpg'],
      ['crochet-scallion-figurine', '大葱钩针摆件', '/images/products/crochet-scallion-figurine.jpg'],
      ['crochet-garlic-figurine', '大蒜钩针摆件', '/images/products/crochet-garlic-figurine.jpg'],
    ] as const

    for (const [slug, name, imageSrc] of expectedFigurines) {
      const figurine = works.find((work) => work.slug === slug)

      expect(figurine).toBeDefined()
      expect(figurine?.name).toBe(name)
      expect(figurine?.usageCategory.id).toBe('home')
      expect(figurine?.craftCategory.id).toBe('crochet')
      expect(figurine?.images.map((image) => image.src)).toEqual([imageSrc])
      expect(figurine?.featured).toBe(true)
      expect(figurine?.etsyUrl).toBe('https://www.etsy.com/shop/meowknit')
    }
  })

  it('supports optional detail videos and variants that point to existing images', () => {
    const richWork = works.find((work) => work.youtubeVideoId && work.variants?.length)

    expect(richWork).toBeDefined()

    for (const work of works) {
      expect(work.youtubeVideoId ?? '').not.toContain('youtube.com')

      for (const variant of work.variants ?? []) {
        expect(variant.label.trim()).not.toHaveLength(0)
        expect(variant.imageIndex).toBeGreaterThanOrEqual(0)
        expect(variant.imageIndex).toBeLessThan(work.images.length)
      }
    }
  })

  it('derives an Etsy CTA for works with an Etsy URL', () => {
    const etsyWork = works.find((work) => work.etsyUrl)

    expect(etsyWork).toBeDefined()
    expect(getWorkCta(etsyWork!)).toEqual({
      label: '在 Etsy 查看',
      href: etsyWork!.etsyUrl,
      type: 'etsy',
    })
  })

  it('derives an inquiry or social CTA for works without an Etsy URL', () => {
    const inquiryWork = works.find((work) => !work.etsyUrl)

    expect(inquiryWork).toBeDefined()

    const cta = getWorkCta(inquiryWork!)

    expect(['inquiry', 'social']).toContain(cta.type)
    expect(cta.label).not.toHaveLength(0)
    expect(cta.href).toMatch(/^https?:\/\//)
  })

  it('keeps a public product image folder for maintainers', () => {
    const productImageReadme = resolve(process.cwd(), 'public/images/products/README.md')

    expect(existsSync(productImageReadme)).toBe(true)
  })
})
