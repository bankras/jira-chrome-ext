import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.init.ts',
        coverage: {
            provider: 'v8',
            reportsDirectory: './coverage',
            reporter: ['lcov', 'text-summary'],
        }
    },
})
