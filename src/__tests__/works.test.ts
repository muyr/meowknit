import { describe, expect, it } from 'vitest'
import { categories, getWorkCta, works } from '../data/works'

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
})
