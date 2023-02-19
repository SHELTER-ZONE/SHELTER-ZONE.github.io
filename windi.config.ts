import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  shortcuts: {
    full: 'w-full h-full',
  },
  theme: {
    extend: {
      colors: {
        'primary-bg': 'var(--primary-bg)',
        primary: 'var(--primary)',
        base: 'var(--base)',
      },
    },
  },
})
