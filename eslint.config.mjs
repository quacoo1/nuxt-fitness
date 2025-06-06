import antfu from '@antfu/eslint-config'

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(antfu({
  type: 'app',
  typescript: true,
  formatters: true,
  ignores: ['.pnpm-store/**', '**/migrations/*'],
}, {
  rules: {
    'style/brace-style': ['error', '1tbs', {
      allowSingleLine: true,
    }],
    'ts/no-redeclare': 'off',
    'ts/consistent-type-definitions': ['error', 'type'],
    'no-console': ['warn'],
    'antfu/no-top-level-await': ['off'],
    'node/prefer-global/process': ['off'],
    'node/no-process-env': ['off'],
    'perfectionist/sort-imports': ['error', {
      tsconfigRootDir: '.',
    }],
    'unicorn/filename-case': ['error', {
      case: 'kebabCase',
      ignore: ['README.md'],
    }],
    'vue/no-multiple-template-root': ['off'],
  },
}))
