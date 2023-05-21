module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  quoteProps: 'consistent',
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  bracketSameLine: false,
  jsxSingleQuote: true,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
};
