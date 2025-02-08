import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import * as React from 'react'

import { createRoot } from 'react-dom/client'

import App from './components/App'
import { ThemeProvider } from './context/ThemeContext'
import { TranslationsProvider } from './context/TranslationsContext'

const root = createRoot(document.body)
root.render(
	<ThemeProvider>
		<TranslationsProvider>
			<App />
		</TranslationsProvider>
	</ThemeProvider>,
)
