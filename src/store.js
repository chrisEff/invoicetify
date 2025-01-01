import dot from 'dot-object'
import Store from 'electron-store'

const defaults = {
	main: {
		window: {
			width: 960,
			height: 600,
			x: null,
			y: null,
		},
	},
	renderer: {
		language: 'en',
		fontSize: 12,
	},
}

const store = new Store({ defaults })

// If a single nested property of an (otherwise present) object is missing in the store,
// electron-store does not set its default value. So we're taking care of it here...
Object.entries(dot.dot(defaults)).forEach(([key, value]) => {
	if (!store.has(key)) {
		store.set(key, value)
	}
})

export default store
