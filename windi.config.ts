import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  shortcuts: {
    full: 'w-full h-full',
    viewPx: 'px-[30px]',
  },
  theme: {
    extend: {
      fontSize: {
        pageTitle: '48px',
        sectionTitle: '30px',

        mPageTitle: '24px',
        mSectionTitle: '20px',

        md: '18px',
        normal: '16px',
        sub: '14px',
        sm: '12px',
      },
      colors: {
        'primary-bg': 'var(--primary-bg)',
        primary: 'var(--primary)',
        base: 'var(--base)',
        danger: 'var(--danger)',
      },
      borderRadius: {
        normal: '6px',
        sub: '4px',
      },
      screens: {
        tablet: '640px',
        mb: '425px',
      },
    },
  },
})
