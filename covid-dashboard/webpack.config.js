const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = () => {

  const config = {
    devtool: 'inline-source-map',
    entry: {
      main: [path.resolve(__dirname, './src/js/index.js'), './src/sass/style.scss']
    },
    output: {
    filename: 'script.js',
    path: path.resolve(__dirname, './dist'),
    assetModuleFilename: './assets/[name][ext]',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              },
              {
                test: /\.s[ac]ss$/i,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader, 
                    options: {
                        publicPath: '',
                    }
                  },
                  {
                    loader: "css-loader"
                  },
                  {
                    loader: "sass-loader"
                  }
              ]
              },
              {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
              },
              {
                test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
                type: 'asset/inline',
              } 
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './src/html/index.html'), 
          filename: 'index.html', 
          favicon: './src/assets/icons/virus.svg',
      }),
    ]
  }
  return config; 
};