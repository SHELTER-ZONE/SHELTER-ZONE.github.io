import { defineConfig } from 'unocss'
import { transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
