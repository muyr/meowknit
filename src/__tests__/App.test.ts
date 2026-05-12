import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from '../App.vue'
import WorkCard from '../components/WorkCard.vue'
import WorkDetail from '../components/WorkDetail.vue'
import { getWorkCta, getWorks } from '../content/catalog'
import { DEFAULT_LOCALE, uiCopy } from '../i18n/locales'
import type { Work } from '../types/work'

const works = getWorks(DEFAULT_LOCALE)

describe('App', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
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
    ).toEqual(['nav-home', 'nav-works', 'nav-about', 'nav-etsy', 'nav-market'])
    expect(wrapper.text()).toContain('Meowknit')
    expect(wrapper.text()).not.toContain('关于一织猫')
    expect(wrapper.text()).not.toContain('精选作品')
    expect(wrapper.get('[data-test="brand-logo"]').attributes('alt')).toBe('Meowknit 一织猫品牌 logo')
    expect(wrapper.get('[data-test="locale-switch-zh-CN"]').attributes('aria-pressed')).toBe('true')
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
    expect(wrapper.text()).not.toContain('Momo Cream Cropped Cardigan')
    expect(wrapper.text()).not.toContain('Momo 奶油短开衫')
  })

  it('renders English works from the /en/works path', () => {
    window.history.pushState({}, '', '/en/works')
    const wrapper = mount(App)

    expect(wrapper.text()).toContain('Knitwear')
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

  it('shows all works by default and filters by category after clicking a category', async () => {
    window.history.pushState({}, '', '/zh-CN/works')
    const wrapper = mount(App)

    for (const work of works) {
      expect(wrapper.text()).toContain(work.name)
    }

    await wrapper.get('[data-test="category-filter-pet-accessory"]').trigger('click')

    expect(wrapper.text()).toContain('猫云朵小领巾')
    expect(wrapper.text()).not.toContain('Momo 奶油短开衫')
  })

  it('opens a work detail when a work card is clicked', async () => {
    window.history.pushState({}, '', '/zh-CN/works')
    const wrapper = mount(App)

    await wrapper.get('[data-test="work-card-momo-cardigan"]').trigger('click')

    const detail = wrapper.get('[data-test="work-detail"]')

    expect(detail.text()).toContain('Momo 奶油短开衫')
    expect(detail.text()).toContain('奶油白与蜜桃粉交织')
  })

  it('shows an Etsy CTA for listed works and an inquiry CTA for unlisted works', async () => {
    window.history.pushState({}, '', '/zh-CN/works')
    const wrapper = mount(App)

    await wrapper.get('[data-test="work-card-momo-cardigan"]').trigger('click')
    const etsyHref = wrapper.get('[data-test="work-cta"]').attributes('href')
    expect(wrapper.get('[data-test="work-cta"]').text()).toContain('在 Etsy 查看')

    await wrapper.get('[data-test="work-card-window-sun-coaster-set"]').trigger('click')
    expect(wrapper.get('[data-test="work-cta"]').text()).toContain('咨询定制')

    window.history.pushState({}, '', '/en/works')
    const englishWrapper = mount(App)
    await englishWrapper.get('[data-test="work-card-momo-cardigan"]').trigger('click')

    expect(englishWrapper.get('[data-test="work-cta"]').text()).toContain('View on Etsy')
    expect(englishWrapper.get('[data-test="work-cta"]').attributes('href')).toBe(etsyHref)
  })

  it('renders every image for the selected work detail', () => {
    const workWithMultipleImages: Work = {
      slug: 'multi-image-sample',
      name: '多图样品',
      category: 'home-decor',
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
        categoryLabel: '家居织物',
        copy: uiCopy['zh-CN'],
      },
    })

    expect(wrapper.findAll('[data-test="work-detail-image"]')).toHaveLength(
      workWithMultipleImages.images.length,
    )
  })

  it('uses real image sources when a work image provides src', () => {
    const workWithRealImage: Work = {
      slug: 'real-image-sample',
      name: '真实图片样品',
      category: 'home-decor',
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
        categoryLabel: '家居织物',
        featuredLabel: '精选',
      },
    })
    const detail = mount(WorkDetail, {
      props: {
        work: workWithRealImage,
        cta: getWorkCta(workWithRealImage),
        categoryLabel: '家居织物',
        copy: uiCopy['zh-CN'],
      },
    })

    expect(card.get('img[alt="真实作品图片"]').attributes('src')).toBe('/sample-work.jpg')
    expect(detail.get('img[alt="真实作品图片"]').attributes('src')).toBe('/sample-work.jpg')
  })
})
