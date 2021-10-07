module.exports = {
  root: true,
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }],
    'vue/html-self-closing':'off',
    'no-undef': 'off',
    'camelcase': 'off',
    "no-return-assign": 'error' 
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
  }
}
