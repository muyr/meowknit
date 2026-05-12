import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from '../App.vue'
import WorkCard from '../components/WorkCard.vue'
import WorkDetail from '../components/WorkDetail.vue'
import { getWorkCta, works } from '../data/works'
import type { Work } from '../types/work'

describe('App', () => {
  it('shows the brand hero and featured works', () => {
    const wrapper = mount(App)
    const featuredWorks = works.filter((work) => work.featured)

    expect(wrapper.text()).toContain('Meowknit')
    expect(wrapper.text()).toContain('精选作品')

    for (const work of featuredWorks) {
      expect(wrapper.text()).toContain(work.name)
    }
  })

  it('shows all works by default and filters by category after clicking a category', async () => {
    const wrapper = mount(App)

    for (const work of works) {
      expect(wrapper.text()).toContain(work.name)
    }

    await wrapper.get('[data-test="category-filter-pet-accessory"]').trigger('click')

    expect(wrapper.text()).toContain('猫云朵小领巾')
    expect(wrapper.text()).not.toContain('Momo 奶油短开衫')
  })

  it('opens a work detail when a work card is clicked', async () => {
    const wrapper = mount(App)

    await wrapper.get('[data-test="work-card-momo-cardigan"]').trigger('click')

    const detail = wrapper.get('[data-test="work-detail"]')

    expect(detail.text()).toContain('Momo 奶油短开衫')
    expect(detail.text()).toContain('奶油白与蜜桃粉交织')
  })

  it('shows an Etsy CTA for listed works and an inquiry CTA for unlisted works', async () => {
    const wrapper = mount(App)

    await wrapper.get('[data-test="work-card-momo-cardigan"]').trigger('click')
    expect(wrapper.get('[data-test="work-cta"]').text()).toContain('在 Etsy 查看')

    await wrapper.get('[data-test="work-card-window-sun-coaster-set"]').trigger('click')
    expect(wrapper.get('[data-test="work-cta"]').text()).toContain('咨询定制')
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
      },
    })
    const detail = mount(WorkDetail, {
      props: {
        work: workWithRealImage,
        cta: getWorkCta(workWithRealImage),
        categoryLabel: '家居织物',
      },
    })

    expect(card.get('img[alt="真实作品图片"]').attributes('src')).toBe('/sample-work.jpg')
    expect(detail.get('img[alt="真实作品图片"]').attributes('src')).toBe('/sample-work.jpg')
  })
})
