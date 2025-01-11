import * as React from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App'
import { TranslationsProvider } from './context/TranslationsContext'

const root = createRoot(document.body)
root.render(
	<TranslationsProvider>
		<App />
	</TranslationsProvider>,
)
