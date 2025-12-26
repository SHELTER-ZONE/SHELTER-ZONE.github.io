import { defineConfig } from 'unocss'
import { generateUnoThemeColors } from '@proladon/shelter-ui/core'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'

const shColors = generateUnoThemeColors()

export default defineConfig({
  // ...UnoCSS options
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      ...shColors,
    },
  },
})
