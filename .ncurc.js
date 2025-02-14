module.exports = {
	filterResults: (name, semver) => {
		// 1.7.4 has an incompatibility with electron forge
		return !(name === '@vercel/webpack-asset-relocator-loader' && semver.upgradedVersion === '1.7.4')
	},
}
