import Store from 'electron-store'

const defaults = {
	window: {
		width: 960,
		height: 600,
		x: null,
		y: null,
	},
}

const store = new Store({ defaults })

export default store
