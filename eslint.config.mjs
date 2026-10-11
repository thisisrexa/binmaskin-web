import { defineConfig } from '@fullstacksjs/eslint-config';

export default defineConfig(
  {
    typescript: { tsconfigRootDir: import.meta.dirname },
    tailwind: { entryPoint: './src/app/globals.css' },
    rules: {
      'max-lines-per-function': 'off',
    },
  },
  {
    ignores: ['scripts/**'],
  },
  {
    // shadcn/ui + framer-motion patterns: variant exports, motion values, context objects
    files: ['src/components/ui/**/*.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
      '@eslint-react/no-unstable-context-value': 'off',
      '@eslint-react/no-leaked-conditional-rendering': 'off',
      '@eslint-react/immutability': 'off',
      '@eslint-react/no-array-index-key': 'off',
      '@eslint-react/no-use-context': 'off',
      '@eslint-react/no-context-provider': 'off',
      '@typescript-eslint/no-shadow': 'off',
    },
  },
);
