const { PATH } = require('./CONSTANTS')
const { getEnteries } = require('./GET_ENTERIES')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const mode = process.env.NODE_ENV
const enteries = getEnteries()
const entry = {}

enteries.forEach(({
  path,
  name
}) => {
  entry[name] = `${path}/${name}.ts`
})

const copyPlugin = mode === 'development'
  ? [
      new CopyWebpackPlugin({
        patterns: [
          { from: PATH.images, to: 'images/[name][ext]' }
        ]
      })]
  : []

const configBase = {
  entry,
  output: {
    filename: 'js/[name].js',
    path: PATH.dist,
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  optimization: {
    concatenateModules: true
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'

      },
      {

        test: /\.ts$/,
        exclude: '/../node_modules/',
        include: `${PATH.src}`,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'stylus-loader'
          }
        ]
      },
      {
        test: /\.(sc|sa)ss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false
          }
        },
        {
          loader: 'pug-html-loader',
          options: {
            exports: false,
            pretty: true
          }
        }]

      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.ico$/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    ...copyPlugin,
    ...enteries.map(({
											 path,
											 name
										 }) => {
      console.log(path, name)
      return new HTMLWebpackPlugin({
        template: `${path}/${name}.pug`,
        filename: `${name}.html`
      })
    }
    )
  ]
}

module.exports = { configBase }
