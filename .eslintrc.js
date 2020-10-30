module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		es6: true,
	},
	extends: ['airbnb-base'],
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		camelcase: [0, { properties: 'always' }],
		'consistent-return': [0, { treatUndefinedAsUnspecified: false }],
		indent: [0],
		'no-tabs': [0],
		props: false,
	},
};
