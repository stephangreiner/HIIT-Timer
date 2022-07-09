module.exports = {
	globDirectory: 'Desktop/',
	globPatterns: [
		'**/*.{ini,mp3,png,html,json,js,css,crdownload,msi,lnk}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};