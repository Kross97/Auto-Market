module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript',
  ],
  rules: {
    "no-return-assign": 0,
    "consistent-return": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "eqeqeq": 0,
    "class-methods-use-this": 0,
    "import/no-cycle": 0,
    "no-case-declarations": 0,
  },
};
