import { defineConfig } from 'unocss'
import { transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  shortcuts: {
    full: 'w-full h-full',
    viewPx: 'px-[40px] md:px-[20px]',
    viewPt: 'pt-[100px] md:pt-[70px]',
    'w-fit': 'w-[fit-content]',
    'h-fit': 'h-[fit-content]',
    viewMax: 'max-w-[1440px]',
  },
  theme: {
    fontSize: {
      pageTitle: '48px',
      sectionTitle: '30px',

      mPageTitle: '24px',
      mSectionTitle: '20px',

      sm: '12px',
      sub: '14px',
      normal: '16px',
      md: '18px',
      lg: '20px',
      xl: '24px',
    },
    colors: {
      'primary-bg': 'var(--primary-bg)',
      'secondary-bg': 'var(--secondary-bg)',
      primary: 'var(--primary)',
      base: 'var(--base)',
      'base-prime': 'var(--base-prime)',
      danger: 'var(--danger)',
      warning: 'var(--warning)',
      action: 'var(--action)',
    },
    borderRadius: {
      normal: '6px',
      sub: '4px',
    },
    breakpoints: {
      desktop: '1280px',
      laptop: '1024px',
      tablet: '768px',
      md: '640px',
      small: '480px',
    },
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
