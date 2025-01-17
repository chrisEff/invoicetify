import pluginJs from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	importPlugin.flatConfigs.recommended,
	{ ignores: ['.webpack/'] },
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
		},
		rules: {
			'import/no-duplicates': 'error',
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						// Side effect imports.
						['^\\u0000'],
						// Node.js builtins prefixed with `node:`.
						['^node:'],
						['^react$'],
						// Packages.
						// Things that start with a letter (or digit or underscore), or `@` followed by a letter.
						['^@?\\w'],
						// Absolute imports and other imports such as Vue-style `@/foo`.
						// Anything not matched in another group.
						['^'],
						// Relative imports.
						// Anything that starts with a dot.
						['^\\.'],
					],
				},
			],
		},
	},
	{
		settings: {
			'import/resolver': {
				node: {
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			},
		},
	},
]
