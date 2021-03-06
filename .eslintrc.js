module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        bracketSpacing: true,
        semi: true,
        arrowParens: 'avoid',
        printWidth: 180,
        trailingComma: 'es5',
      },
    ],
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/self-closing-comp': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
  },
};
