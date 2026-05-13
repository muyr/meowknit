import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from '../App.vue'
import WorkCard from '../components/WorkCard.vue'
import WorkDetail from '../components/WorkDetail.vue'
import { getCraftCategories, getUsageCategories, getWorkCta, getWorks } from '../content/catalog'
import { DEFAULT_LOCALE, uiCopy } from '../i18n/locales'
import type { Work } from '../types/work'

const works = getWorks(DEFAULT_LOCALE)
const usageCategories = getUsageCategories(DEFAULT_LOCALE)
const craftCategories = getCraftCategories(DEFAULT_LOCALE)
const homeCategory = usageCategories.find((category) => category.id === 'home')!
const knittingCategory = craftCategories.find((category) => category.id === 'knitting')!

describe('App', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
    document.title = 'MeowKnit | Handmade Portfolio'
  })

  it('shows the header and home page by default', () => {
    const wrapper = mount(App)

    expect(wrapper.find('[data-test="site-header"]').exists()).toBe(true)
    expect(wrapper.get('[data-test="nav-home"]').attributes('href')).toBe('/zh-CN')
    expect(wrapper.get('[data-test="nav-works"]').attributes('href')).toBe('/zh-CN/works')
    expect(wrapper.get('[data-test="nav-about"]').attributes('href')).toBe('/zh-CN/about')
    expect(wrapper.get('[data-test="nav-etsy"]').attributes('href')).toBe('https://www.etsy.com/shop/meowknit')
    expect(wrapper.get('[data-test="nav-market"]').attributes('href')).toBe('/zh-CN/market')
    expect(
      wrapper.findAll('.site-nav a').map((link) => link.attributes('data-test')),
    ).toEqual(['nav-home', 'nav-works', 'nav-etsy', 'nav-market', 'nav-about'])
    expect(wrapper.text()).toContain('MeowKnit')
    expect(wrapper.text()).not.toContain('关于一织猫')
    expect(wrapper.text()).toContain('精选作品')
    expect(wrapper.get('[data-test="brand-logo"]').attributes('alt')).toBe('MeowKnit 一织猫品牌 logo')
    expect(wrapper.get('[data-test="locale-switch-zh-CN"]').attributes('aria-pressed')).toBe('true')
  })

  it('shows featured works on the home page and opens their detail', async () => {
    const wrapper = mount(App)
    const featuredWorks = works.filter((work) => work.featured)

    for (const work of featuredWorks) {
      expect(wrapper.text()).toContain(work.name)
    }

    expect(wrapper.text()).not.toContain('猫云朵小领巾')

    await wrapper.get('[data-test="work-card-momo-cardigan"]').trigger('click')

    expect(window.location.pathname).toBe('/zh-CN/works/momo-cardigan')

    const detail = wrapper.get('[data-test="work-detail"]')
    expect(detail.text()).toContain('Momo 奶油短开衫')
    expect(detail.text()).toContain('奶油白与蜜桃粉交织')
  })

  it('renders About as a separate localized page', async () => {
    const wrapper = mount(App)

    await wrapper.get('[data-test="nav-about"]').trigger('click')

    expect(window.location.pathname).toBe('/zh-CN/about')
    expect(wrapper.text()).toContain('关于一织猫')
    expect(wrapper.text()).not.toContain('精选作品')
  })

  it('renders Works as a separate localized page', async () => {
    const wrapper = mount(App)
    const featuredWorks = works.filter((work) => work.featured)

    await wrapper.get('[data-test="nav-works"]').trigger('click')

    expect(window.location.pathname).toBe('/zh-CN/works')
    expect(wrapper.text()).toContain('精选作品')
    expect(wrapper.text()).not.toContain('关于一织猫')

    for (const work of featuredWorks) {
      expect(wrapper.text()).toContain(work.name)
    }
  })

  it('renders Market as a separate localized page', async () => {
    const wrapper = mount(App)

    await wrapper.get('[data-test="nav-market"]').trigger('click')

    expect(window.location.pathname).toBe('/zh-CN/market')
    expect(wrapper.text()).toContain('集市')
    expect(wrapper.text()).toContain('近期集市')
    expect(wrapper.text()).not.toContain('精选作品')
  })

  it('renders English content from the /en path', () => {
    window.history.pushState({}, '', '/en')
    const wrapper = mount(App)

    expect(wrapper.text()).toContain('Handmade portfolio')
    expect(wrapper.text()).toContain('Momo Cream Cropped Cardigan')
    expect(wrapper.text()).not.toContain('Momo 奶油短开衫')
    expect(document.title).toBe('MeowKnit | Handmade Portfolio')
  })

  it('updates the document title when switching languages', async () => {
    window.history.pushState({}, '', '/zh-CN')
    const wrapper = mount(App)

    expect(document.title).toBe('MeowKnit | 手工作品集')

    await wrapper.get('[data-test="locale-switch-en"]').trigger('click')

    expect(document.title).toBe('MeowKnit | Handmade Portfolio')
  })

  it('renders English works from the /en/works path', () => {
    window.history.pushState({}, '', '/en/works')
    const wrapper = mount(App)

    expect(wrapper.text()).toContain('Usage')
    expect(wrapper.text()).toContain('Craft')
    expect(wrapper.text()).toContain('Knitting')
    expect(wrapper.text()).toContain('Momo Cream Cropped Cardigan')
    expect(wrapper.text()).not.toContain('Momo 奶油短开衫')
  })

  it('switches between English and Simplified Chinese while preserving the page', async () => {
    window.history.pushState({}, '', '/zh-CN/works')
    const wrapper = mount(App)

    expect(wrapper.text()).toContain('Momo 奶油短开衫')

    await wrapper.get('[data-test="locale-switch-en"]').trigger('click')

    expect(wrapper.text()).toContain('Momo Cream Cropped Cardigan')
    expect(wrapper.get('[data-test="locale-switch-en"]').attributes('aria-pressed')).toBe('true')
    expect(window.location.pathname).toBe('/en/works')

    await wrapper.get('[data-test="locale-switch-zh-CN"]').trigger('click')

    expect(wrapper.text()).toContain('Momo 奶油短开衫')
    expect(window.location.pathname).toBe('/zh-CN/works')
  })

  it('shows all works by default and filters by usage and craft categories', async () => {
    window.history.pushState({}, '', '/zh-CN/works')
    const wrapper = mount(App)

    expect(wrapper.text()).toContain('用途')
    expect(wrapper.text()).toContain('工艺')

    for (const work of works) {
      expect(wrapper.text()).toContain(work.name)
    }

    await wrapper.get('[data-test="usage-category-filter-pet-goods"]').trigger('click')

    expect(wrapper.text()).toContain('猫云朵小领巾')
    expect(wrapper.text()).not.toContain('Momo 奶油短开衫')

    await wrapper.get('[data-test="usage-category-filter-all"]').trigger('click')
    await wrapper.get('[data-test="craft-category-filter-knitting"]').trigger('click')

    expect(wrapper.text()).toContain('Momo 奶油短开衫')
    expect(wrapper.text()).not.toContain('姜糖 Market Bag')

    await wrapper.get('[data-test="craft-category-filter-all"]').trigger('click')
    await wrapper.get('[data-test="craft-category-filter-crochet"]').trigger('click')
    await wrapper.get('[data-test="usage-category-filter-gifts"]').trigger('click')

    expect(wrapper.text()).toContain('拿铁色迷你兔')
    expect(wrapper.text()).not.toContain('Momo 奶油短开衫')
  })

  it('opens a work detail when a work card is clicked', async () => {
    window.history.pushState({}, '', '/zh-CN/works')
    const wrapper = mount(App)

    await wrapper.get('[data-test="work-card-momo-cardigan"]').trigger('click')

    expect(window.location.pathname).toBe('/zh-CN/works/momo-cardigan')

    const detail = wrapper.get('[data-test="work-detail"]')

    expect(detail.text()).toContain('Momo 奶油短开衫')
    expect(detail.text()).toContain('奶油白与蜜桃粉交织')
  })

  it('renders a work detail page from a direct localized URL', () => {
    window.history.pushState({}, '', '/zh-CN/works/momo-cardigan')
    const wrapper = mount(App)

    expect(wrapper.text()).toContain('Momo 奶油短开衫')
    expect(wrapper.text()).toContain('奶油白与蜜桃粉交织')
    expect(wrapper.find('[data-test="work-detail"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="work-detail-main-row"]').exists()).toBe(true)
    expect(wrapper.get('[data-test="work-detail-main-row"]').find('[data-test="work-video"]').exists()).toBe(
      false,
    )
    expect(wrapper.get('[data-test="work-video"]').attributes('src')).toContain(
      'https://www.youtube.com/embed/',
    )
    expect(wrapper.findAll('[data-test="work-detail-thumbnail"]')).toHaveLength(2)
    expect(wrapper.find('[data-test="work-card-ginger-market-bag"]').exists()).toBe(false)
  })

  it('renders local product media for the dumpling keychain detail page', () => {
    window.history.pushState({}, '', '/zh-CN/works/crochet-dumpling-keychain')
    const wrapper = mount(App)

    expect(wrapper.text()).toContain('饺子钥匙扣')
    expect(wrapper.findAll('[data-test="work-detail-thumbnail"]')).toHaveLength(3)
    expect(wrapper.get('[data-test="work-detail-active-image"]').attributes('src')).toBe(
      '/images/products/crochet-dumpling-keychain-1.jpg',
    )
    expect(wrapper.get('[data-test="work-local-video"]').attributes('src')).toBe(
      '/images/products/crochet-dumpling-keychain-video.mp4',
    )
  })

  it('renders multiple local videos for the Shaun sheep figurine detail page', () => {
    window.history.pushState({}, '', '/zh-CN/works/crochet-shaun-sheep-figurine')
    const wrapper = mount(App)

    expect(wrapper.text()).toContain('小羊肖恩摆件')
    expect(wrapper.findAll('[data-test="work-detail-thumbnail"]')).toHaveLength(2)
    expect(wrapper.findAll('[data-test="work-local-video"]').map((video) => video.attributes('src'))).toEqual([
      '/images/products/crochet-shaun-sheep-figurine-video-1.mp4',
      '/images/products/crochet-shaun-sheep-figurine-video-2.mp4',
    ])
  })

  it('switches the detail image when a thumbnail or variant is selected', async () => {
    window.history.pushState({}, '', '/zh-CN/works/momo-cardigan')
    const wrapper = mount(App)

    expect(wrapper.get('[data-test="work-detail-active-image"]').attributes('aria-label')).toBe(
      '奶油白短款针织开衫正面',
    )

    await wrapper.findAll('[data-test="work-detail-thumbnail"]')[1].trigger('click')

    expect(wrapper.get('[data-test="work-detail-active-image"]').attributes('aria-label')).toBe(
      '蜜桃粉短款针织开衫细节',
    )

    await wrapper.get('[data-test="work-variant-cream"]').trigger('click')

    expect(wrapper.get('[data-test="work-detail-active-image"]').attributes('aria-label')).toBe(
      '奶油白短款针织开衫正面',
    )
    expect(wrapper.get('[data-test="work-variant-cream"]').attributes('aria-pressed')).toBe('true')
  })

  it('preserves the work detail page when switching languages', async () => {
    window.history.pushState({}, '', '/zh-CN/works/momo-cardigan')
    const wrapper = mount(App)

    await wrapper.get('[data-test="locale-switch-en"]').trigger('click')

    expect(window.location.pathname).toBe('/en/works/momo-cardigan')
    expect(wrapper.text()).toContain('Momo Cream Cropped Cardigan')
    expect(wrapper.text()).not.toContain('Momo 奶油短开衫')
  })

  it('returns from a detail page to the localized works list', async () => {
    window.history.pushState({}, '', '/zh-CN/works/momo-cardigan')
    const wrapper = mount(App)

    await wrapper.get('.detail-close').trigger('click')

    expect(window.location.pathname).toBe('/zh-CN/works')
    expect(wrapper.find('[data-test="work-detail"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="work-card-momo-cardigan"]').exists()).toBe(true)
  })

  it('shows an Etsy CTA for listed works and an inquiry CTA for unlisted works', async () => {
    window.history.pushState({}, '', '/zh-CN/works')
    const wrapper = mount(App)

    await wrapper.get('[data-test="work-card-momo-cardigan"]').trigger('click')
    const etsyHref = wrapper.get('[data-test="work-cta"]').attributes('href')
    expect(wrapper.get('[data-test="work-cta"]').text()).toContain('在 Etsy 查看')

    await wrapper.get('.detail-close').trigger('click')
    await wrapper.get('[data-test="work-card-window-sun-coaster-set"]').trigger('click')
    expect(wrapper.get('[data-test="work-cta"]').text()).toContain('咨询定制')

    window.history.pushState({}, '', '/en/works')
    const englishWrapper = mount(App)
    await englishWrapper.get('[data-test="work-card-momo-cardigan"]').trigger('click')

    expect(englishWrapper.get('[data-test="work-cta"]').text()).toContain('View on Etsy')
    expect(englishWrapper.get('[data-test="work-cta"]').attributes('href')).toBe(etsyHref)
  })

  it('renders thumbnails for every image in the selected work detail', () => {
    const workWithMultipleImages: Work = {
      slug: 'multi-image-sample',
      name: '多图样品',
      usageCategory: homeCategory,
      craftCategory: knittingCategory,
      description: '用于确认详情页会展示全部图片。',
      images: [
        {
          alt: '多图样品正面',
          gradient: 'linear-gradient(135deg, #fff, #f0c7a2)',
        },
        {
          alt: '多图样品细节',
          gradient: 'linear-gradient(135deg, #f0c7a2, #80614b)',
        },
      ],
      featured: false,
      inquiryUrl: 'https://www.instagram.com/meowknit',
    }

    const wrapper = mount(WorkDetail, {
      props: {
        work: workWithMultipleImages,
        cta: getWorkCta(workWithMultipleImages),
        usageCategoryLabel: '家居',
        craftCategoryLabel: '针织',
        copy: uiCopy['zh-CN'],
      },
    })

    expect(wrapper.findAll('[data-test="work-detail-thumbnail"]')).toHaveLength(
      workWithMultipleImages.images.length,
    )
  })

  it('uses real image sources when a work image provides src', () => {
    const workWithRealImage: Work = {
      slug: 'real-image-sample',
      name: '真实图片样品',
      usageCategory: homeCategory,
      craftCategory: knittingCategory,
      description: '用于确认真实图片会优先渲染。',
      images: [
        {
          src: '/sample-work.jpg',
          alt: '真实作品图片',
          gradient: 'linear-gradient(135deg, #fff, #f0c7a2)',
        },
      ],
      featured: false,
      inquiryUrl: 'https://www.instagram.com/meowknit',
    }

    const card = mount(WorkCard, {
      props: {
        work: workWithRealImage,
        usageCategoryLabel: '家居',
        craftCategoryLabel: '针织',
        featuredLabel: '精选',
      },
    })
    const detail = mount(WorkDetail, {
      props: {
        work: workWithRealImage,
        cta: getWorkCta(workWithRealImage),
        usageCategoryLabel: '家居',
        craftCategoryLabel: '针织',
        copy: uiCopy['zh-CN'],
      },
    })

    expect(card.get('img[alt="真实作品图片"]').attributes('src')).toBe('/sample-work.jpg')
    expect(detail.get('img[alt="真实作品图片"]').attributes('src')).toBe('/sample-work.jpg')
  })
})
