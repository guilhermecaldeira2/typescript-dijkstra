module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@Database': './src/Database',
          '@ENUMS': './src/ENUMS',
          '@Models': './src/Models',
          '@SystemEntities': './src/SystemEntities',
          '@Utils': './src/Utils',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
