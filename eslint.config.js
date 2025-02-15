import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { rules } from 'eslint-plugin-vue'

// 配置 ESLint（一个代码检查工具）的规则和设置。帮助开发者识别和修复代码中的问题，确保代码的一致性和可维护性
export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.vue', '**/*.ts', '**/*.mts', '**/*.tsx'] // 允许所有 Vue 和 TypeScript 文件
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'] // 确保未忽略任何单词命名的文件
  },
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,
  rules['vue/no-multiple-template-root']
]
