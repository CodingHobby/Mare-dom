const path = require('path')
module.exports = {
	entry: path.join(__dirname, 'src', 'dom.js'),
	output: {
		path: path.join(__dirname, 'lib'),
		filename: 'mare-dom.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				}
			}
		]
	}
}