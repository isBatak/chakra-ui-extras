import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['libs/chakra-ui-headroom/index.tsx'],
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false
})
