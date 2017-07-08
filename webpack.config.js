const path = require('path')

module.exports = {
	entry: path.join(__dirname, 'demo', 'app.js'),
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	}
}