const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlwebpackPlugin =  require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: ['./src/index.js', './src/App.css'],
	"mode":"development",
	output: {
		path: path.resolve(__dirname, 'dist') ,
		filename: 'bundle.js',
		chunkFilename: '[id].js',
		publicPath: ''
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	}, 
	module:{
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}, {
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{loader: 'style-loader'},
					{
						loader: 'css-loader',
						options:{
							  importLoaders: 1,
				              modules: true,
				              camelCase: true,
				              localIdentName: '[path][name]__[local]__[hash:base64:5]',
						}
					},{
						loader: 'postcss-loader',
						options:{
							ident: 'postcss',
							plugins: () =>[
								autoprefixer({
									"browsers":[
										"> 1%",
										"last 2 versions"
									]
								})
							]
						}
					}
				]
			},{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader?limit=8000&name=images/[name].[ext]',
			}
		]
	},
	plugins: [
		new HtmlwebpackPlugin({
			template: __dirname+'/src/index.html',
			filename: 'index.html',
			inject:'body',
		})
	]
};