const path = require('path')

const babelOptions = {
  presets: ['@babel/preset-env']
};

module.exports = {
  mode: 'development',

  entry: {
    main: './src/Main.ts'
  },

  output: {path: path.resolve(__dirname, 'dist'), filename: '[name]_bundle.js'},

  devtool: 'inline-source-map',
  devServer: {contentBase: './dist'},

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ], // order of module resolution by extension
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {loader: 'babel-loader', options: babelOptions}, {loader: 'ts-loader'}
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{loader: 'babel-loader', options: babelOptions}]
      }
    ]
  }
}