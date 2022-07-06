module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  plugins: [

  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'vue/valid-v-slot': ['error', {
      allowModifiers: true
    }],
    camelcase: [
      0,
      { ignoreGlobals: true, properties: 'never', ignoreImports: true, ignoreDestructuring: true }
    ]
  }
}
