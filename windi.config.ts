import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  shortcuts: {
    full: 'w-full h-full',
  },
  theme: {
    extend: {
      fontSize: {
        pageTitle: '24px',
        sectionTitle: '20px',
      },
      colors: {
        'primary-bg': 'var(--primary-bg)',
        primary: 'var(--primary)',
        base: 'var(--base)',
      },
    },
  },
})
