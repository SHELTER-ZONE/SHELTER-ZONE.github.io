import { defineConfig } from 'windicss/helpers'

export default defineConfig({
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
