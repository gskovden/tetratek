const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },
  mode: 'development',
  // stats: {
  //   children: true,
  // },
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8081, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: '/node_modules/'
    },
    // добавили правило для обработки файлов
    {
      // регулярное выражение, которое ищет все файлы с такими расширениями
      test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf|webp)$/,
      type: 'asset/resource'
    },
    {
      // применять это правило только к CSS-файлам
      test: /\.css$/,
      // при обработке этих файлов нужно использовать
      // MiniCssExtractPlugin.loader и css-loader
      use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
        options: { importLoaders: 1 }
      },
        // Добавьте postcss-loader
      'postcss-loader']
    },
  ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        favicon: "./src/images/logo/logo.ico"
      }),
      new HtmlWebpackPlugin({  // Also generate a .html
        filename: 'about.html',
        template: 'src/about.html',
        favicon: "./src/images/logo/logo.ico"
      }),
      new HtmlWebpackPlugin({  // Also generate a .html
        filename: 'cases.html',
        template: 'src/cases.html',
        favicon: "./src/images/logo/logo.ico"
      }),
      new HtmlWebpackPlugin({  // Also generate a .html
        filename: 'contacts.html',
        template: 'src/contacts.html',
        favicon: "./src/images/logo/logo.ico"
      }),
      new HtmlWebpackPlugin({  // Also generate a .html
        filename: 'news.html',
        template: 'src/news.html',
        favicon: "./src/images/logo/logo.ico"
      }),
      new HtmlWebpackPlugin({  // Also generate a .html
        filename: 'technology.html',
        template: 'src/technology.html',
        favicon: "./src/images/logo/logo.ico"
      }),
      new HtmlWebpackPlugin({  // Also generate a .html
        filename: 'template_mail.html',
        template: 'src/template_mail.html'
      }),
      new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
      new CopyWebpackPlugin({
        patterns: [
            {
                from: __dirname + '/src/sendmail.php', // откуда
                to: __dirname + '/dist' // куда
            },
            {
              from: __dirname + '/inputmask.es6.js', // откуда
              to: __dirname + '/dist' // куда
          },
          {
            from: __dirname + '/inputmask.js', // откуда
            to: __dirname + '/dist' // куда
        },
        {
          from: __dirname + '/.htaccess', // откуда
          to: __dirname + '/dist' // куда
      }
        ]
    }),
    new CleanWebpackPlugin(),
    ] 
  }; 