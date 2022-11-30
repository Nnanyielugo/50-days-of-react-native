module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        alias: {
          _assets: './assets',
        },
      },
    ],
  ],
};
