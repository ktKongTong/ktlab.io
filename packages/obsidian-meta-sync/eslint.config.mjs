
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["src/**/*.{ts,tsx}"],
        ignores: ["**/*.config.{js,mjs,ts}","dist"],
        languageOptions: {
            parserOptions: {
                project: ['./packages/*/tsconfig.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
);
