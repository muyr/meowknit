import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { DEFAULT_LOCALE, locales } from '../i18n/locales'
import { getCategories, getWorkCta, getWorks, products, rawCategories } from '../content/catalog'

const works = getWorks(DEFAULT_LOCALE)
const categories = getCategories(DEFAULT_LOCALE)

describe('works data', () => {
  it('provides at least five portfolio works with unique slugs', () => {
    expect(works.length).toBeGreaterThanOrEqual(5)

    const slugs = works.map((work) => work.slug)

    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('keeps the MVP category set between five and six categories', () => {
    expect(categories.length).toBeGreaterThanOrEqual(5)
    expect(categories.length).toBeLessThanOrEqual(6)
  })

  it('supports Simplified Chinese and English content for every product and category', () => {
    expect(locales).toEqual(['zh-CN', 'en'])

    for (const product of products) {
      for (const locale of locales) {
        expect(product.name[locale].trim()).not.toHaveLength(0)
        expect(product.description[locale].trim()).not.toHaveLength(0)

        for (const image of product.images) {
          expect(image.alt[locale].trim()).not.toHaveLength(0)
        }
      }
    }

    for (const category of rawCategories) {
      for (const locale of locales) {
        expect(category.label[locale].trim()).not.toHaveLength(0)
        expect(category.description[locale].trim()).not.toHaveLength(0)
      }
    }
  })

  it('uses only declared categories', () => {
    const categoryIds = new Set(categories.map((category) => category.id))

    for (const work of works) {
      expect(categoryIds.has(work.category)).toBe(true)
    }
  })

  it('provides renderable content and images for every work', () => {
    for (const work of works) {
      expect(work.name.trim()).not.toHaveLength(0)
      expect(work.description.trim()).not.toHaveLength(0)
      expect(work.images.length).toBeGreaterThanOrEqual(1)

      for (const image of work.images) {
        expect(image.alt.trim()).not.toHaveLength(0)
        expect(Boolean(image.src?.trim() || image.gradient.trim())).toBe(true)
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
