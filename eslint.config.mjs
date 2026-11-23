import { defineConfig, globalIgnores } from 'eslint/config'
import love from 'eslint-config-love'
import prettier from 'eslint-config-prettier/flat'
import { qwikEslint9Plugin } from 'eslint-plugin-qwik'

const TS_FILES = ['**/*.{ts,tsx,mts}']

export default defineConfig([
  { ...love, files: TS_FILES },

  { files: TS_FILES, extends: [qwikEslint9Plugin.configs.recommended] },

  {
    files: TS_FILES,
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-misused-promises': 'off'
    }
  },

  {
    files: ['src/lib/utils/logger.ts', 'tests/e2e/mock/server.ts'],
    rules: {
      'no-console': 'off'
    }
  },

  prettier,

  globalIgnores([
    'node_modules/**',
    'dist/**',
    'server/**',
    '.vercel/**',
    'tmp/**',
    'playwright-report/**',
    'test-results/**'
  ])
])
