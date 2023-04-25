import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  shortcuts: {
    full: 'w-full h-full',
  },
  theme: {
    extend: {
      fontSize: {
        pageTitle: '48px',
        sectionTitle: '30px',

        mPageTitle: '24px',
        mSectionTitle: '20px',

        sub: '14px',
        sm: '12px',
      },
      colors: {
        'primary-bg': 'var(--primary-bg)',
        primary: 'var(--primary)',
        base: 'var(--base)',
      },
      screens: {
        tablet: '640px',
        mb: '425px',
      },
    },
  },
})
