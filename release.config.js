export default {
	branches: [
		'main',
		{ name: 'alpha', prerelease: true },
		{ name: 'beta', prerelease: true },
		{ name: 'rc', prerelease: true },
	],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		['@semantic-release/npm', { npmPublish: false }],
		'@semantic-release/git',
	],
}
