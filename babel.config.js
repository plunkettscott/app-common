module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/env',
        {
          targets: {
            browsers: 'Last 2 Chrome versions, Firefox ESR',
            node: '8.9',
          },
        },
      ],
      [
        '@babel/preset-react',
        {
          development: process.env.BABEL_ENV !== 'build',
        },
      ],
      '@babel/preset-typescript',
    ],
    // plugins: [
    //   '@babel/plugin-proposal-class-properties',
    //   '@babel/plugin-transform-typescript',
    // ],
    env: {
      build: {
        ignore: [
          '**/dist',
          '**/*.test.tsx',
          '**/*.test.ts',
          '__snapshots__',
          '__tests__',
          '__stories__',
        ],
      },
    },
    ignore: ['node_modules'],
  };
};
