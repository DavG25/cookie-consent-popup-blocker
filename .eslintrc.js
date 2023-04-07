module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb/base',
  ],
  rules: {
    'no-param-reassign': ['error', { props: false }],
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  globals: {
    chrome: false,
  },
};
