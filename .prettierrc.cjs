module.exports = {
  singleQuote: true,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 120,

  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],

  importOrder: [
    '^react$',
    '^next/(.*)$',

    '<THIRD_PARTY_MODULES>',

    '^@app/(.*)$',
    '^@widgets/(.*)$',
    '^@features/(.*)$',
    '^@entities/(.*)$',
    '^@shared/(.*)$',

    '^@/*',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
