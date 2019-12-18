const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const DEVELOPMENT_BACKEND_URL = 'http://localhost:3003/api';
const PRODUCTION_BACKEND_URL = '/api';

const DEVELOPMENT_OUTPUT_DIR  = 'build';
const PRODUCTION_OUTPUT_DIR = 'deploy';

const config = (env, argv) => {
  const mode = argv.mode;
	const isDevelopmentMode = mode === 'development';
	const backendUrl =
    isDevelopmentMode ? DEVELOPMENT_BACKEND_URL : PRODUCTION_BACKEND_URL;
	const outputDir =
		isDevelopmentMode ? DEVELOPMENT_OUTPUT_DIR : PRODUCTION_OUTPUT_DIR;
	return {
		entry: './src/index.js',
		output: {
			path: path.resolve(__dirname, outputDir),
			filename: 'app.js',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					query: {
						presets: ['@babel/preset-react'],
					},
				},
				{
					test: /\.css$/,
					loaders: ['style-loader', 'css-loader'],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './public/index.html',
			}),
			new Webpack.DefinePlugin({
				BACKEND_URL: JSON.stringify(backendUrl),
			}),
		],
// en saa uglifieria toimimaan, ei tue ecmaScript 2015:ta (const)
//		optimization: {
//			minimizer: [new UglifyJsPlugin()],
//		},
		devtool: 'source-map',
		devServer: {
			contentBase: path.resolve(__dirname, 'build'),
			compress: true,
			port: 3000,
		},
	}};

module.exports = config;



