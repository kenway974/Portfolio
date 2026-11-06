import { defineConfig } from 'vitest/config'

// Tests unitaires (logique et données) et tests SEO (sur le build, dans dist/).
export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
})
