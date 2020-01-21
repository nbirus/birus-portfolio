/* eslint-disable */
const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

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
		plugins: [
			new PrerenderSPAPlugin({
				staticDir: path.join(__dirname, 'dist'),
				// Required - Routes to render.
				routes: ['/'],
			}),
		],
	},
}
/* eslint-enable */
