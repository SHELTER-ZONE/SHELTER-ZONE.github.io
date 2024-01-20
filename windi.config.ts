import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  shortcuts: {
    full: 'w-full h-full',
    viewPx: 'px-[20px] mb:(px-[50px])',
    viewPt: 'pt-[80px] mb:(pt-[150px])',
    'w-fit': 'w-[fit-content]',
    'h-fit': 'h-[fit-content]',
    viewMax: 'max-w-[1440px]',
  },
  theme: {
    extend: {
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
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        action: 'var(--action)',
      },
      borderRadius: {
        normal: '6px',
        sub: '4px',
      },
      screens: {
        desktop: '1280px',
        laptop: '1024px',
        tablet: '768px',
        md: '640px',
        small: '480px',
      },
    },
  },
})
