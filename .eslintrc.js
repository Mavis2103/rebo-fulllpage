module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    camelcase: [0, { properties: 'always' }],
  },
};
