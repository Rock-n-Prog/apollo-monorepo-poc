module.exports = {
  root: true,
  extends: ['@acme/eslint-config/next.js'],
  rules: {
    // Fix for codegen. Once the API is deployed, run codegen in CI and remove this override.
    'import/no-unresolved': 'off',
  },
};
