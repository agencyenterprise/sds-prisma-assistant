module.exports = {
  singleQuote: true,
  semi: false,
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    require.resolve('prettier-plugin-tailwindcss'),
    require.resolve('@trivago/prettier-plugin-sort-imports'),
  ],
}
