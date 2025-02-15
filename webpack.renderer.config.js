import rules from './webpack.rules.js'

rules.push({
	test: /\.css$/,
	use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
})

rules.push({
	test: /\.ttf/,
	type: 'asset/resource',
})

export default {
	// Put your normal webpack config below here
	resolve: {
		extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
	},
	module: {
		rules,
	},
}
