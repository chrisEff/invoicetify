module.exports = {
	filterResults: name => {
		// 1.7.4 (+later) has an incompatibility with electron forge
		return !(name === '@vercel/webpack-asset-relocator-loader')
	},
}
