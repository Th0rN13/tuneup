module.exports = {
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'camelcase': ["off"],
    'underscores': ["allow"],
    'operator-linebreak': ["error", "after"],
    'quotes': ["error", "double", { "avoidEscape": true }],
    'semi': ["error", "always"],
    // how to fix <script> additional indent issue?
    'indent': ["off"],
    'indent-legacy': ["error", 2],
    // how to fix typescript import\export types?
    'no-unused-vars': ["off"],
  },
  extends: [
    '@nuxtjs'
  ]
}