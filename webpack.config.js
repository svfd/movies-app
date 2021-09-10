const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {

	const { mode } = argv;

	const isDev = mode === 'development';
	const isProd = mode === 'production';

	const getPlugins = () => {

		const plugins = [
			new HtmlWebpackPlugin({
				template: 'public/index.html',
				publicPath: '/'
			}),
		];

		if (isProd) {
			plugins.push(
				new MiniCssExtractPlugin({filename: 'main-[hash:8].css'}),
				new CleanWebpackPlugin()
			);
		}

		return plugins;
	};

	const getStyleLoaders = () => {

		const loaders = [];

		if (isDev) {
			loaders.push('style-loader');
		}

		if (isProd) {
			loaders.push(MiniCssExtractPlugin.loader);
		}

		loaders.push('css-loader');

		return loaders;
	};

	return {
		entry: path.resolve(__dirname, 'src/index.js'),
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'bundle.js'
		},
		mode,
		plugins: getPlugins(),
		module: {
			rules: [
				// Js loader
				{
					exclude: /node_modules/,
					test: /\.js$/,
					loader: 'babel-loader'
				},
				{
					test: /\.(woff2?|ttf)$/i,
					use: [{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts'
						}
					}]
				},
				// Images loader
				{
					test: /\.(png|jpe?g|svg)$/i,
					use: [{
						loader: 'file-loader',
						options: {
							outputPath: 'images',
							name: '[name]-[sha1:hash:7].[ext]'
						}
					}]
				},
				// Css loader
				{
					test: /\.css$/,
					use: getStyleLoaders()
				},
				// Less loader
				{
					test: /\.less$/,
					use: [...getStyleLoaders(), 'less-loader']
				}
			],
		},
		// server
		target: isDev ? 'web' : 'browserslist',
		devtool: isDev ? 'inline-source-map' : false,
		devServer: {
			contentBase: path.resolve(__dirname, 'build'),
			watchContentBase: true,
			hot: true,
			port: 3000,
			// host: '', you can use your ip address here
			overlay: true,
			historyApiFallback: true
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, '/src')
			}
		}
	}
};