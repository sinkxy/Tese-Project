const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''

module.exports = (options = {}) => ({
  entry: {
      vendor: './src/vendor',
      index: './src/main.js',
      app: ["babel-polyfill", "./src/main.js"]  //兼容IE
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
	/*new webpack.NormalModuleReplacementPlugin(
		/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/,
		'element-ui/lib/locale/lang/zh-TW'
	)*/
	//线上发布时去掉生产环境的console.log
	new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
        },
        sourceMap: true
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8010,
	disableHostCheck: true,
    proxy: {
    '/kong/auth': {
        target: 'http://localhost:8008',
        changeOrigin: true,
        pathRewrite: {
          '^/kong/auth': ''
        }
    },
    '/kong/rightmanage': {
        target: 'http://localhost:8008',
        changeOrigin: true,
        pathRewrite: {
          '^/kong': ''
        }
    },
    '/kong/jm-schedule': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        pathRewrite: {
            '^/kong': ''
        }
    },
	'/kong/leave_system': {
        target: 'http://localhost:8808',
        changeOrigin: true,
        pathRewrite: {
          '^/kong': ''
        }
    },
	'/kong/': {
        target: 'http://192.168.101.31:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/kong': ''
        }
      }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})
