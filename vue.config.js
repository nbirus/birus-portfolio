/* eslint-disable */
module.exports = {
	configureWebpack: {
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: ['sass-loader'],
				},
			],
		},
	},
}
/* eslint-enable */
