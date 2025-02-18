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
		devMode: false,
		settings: {
			language: 'en',
			darkMode: true,
			fontFamily: 'OpenSans',
			fontSize: 10,
			padding: {
				left: 2,
				right: 2,
				top: 2,
				bottom: 2,
			},
			senderAddress: '',
			contactDetails: '',
			introductoryText: '',
			closingText: '',
			footer: [],
		},
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
