const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

const clientConfig = {
  mode: 'production',
  entry: { app: ['./src/index.jsx'] },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist', 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    chrome: 65,
                  },
                },
              ],
              '@babel/preset-react',
            ],
            plugins: ['emotion'],
          },
        },
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
  },
}

const serverConfig = {
  mode: 'production',
  entry: './server/server.prod.ts',
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 10,
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: 'public',
          filter: (resPath) => {
            if (path.parse(resPath).base === 'index.html') {
              return false
            }
            return true
          },
        },
        { from: 'tmp', to: 'tmp' },
        { from: '.env', to: '' },
      ],
    }),
  ],
}

module.exports = [clientConfig, serverConfig]
