module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  env: {
    browser: true,
  },
  rules: {
    "vue/script-indent": ["error", 2, {
      "baseIndent": 1,
      "switchCase": 0,
    }]
  },
  extends: [
    "plugin:vue/recommended",
    "@vue/typescript",
  ],
  plugins: [
    "vue",
    "@typescript-eslint"
  ],
}