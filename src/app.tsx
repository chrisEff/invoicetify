import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import * as React from 'react'

import { ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'

import App from './components/App'
import { TranslationsProvider } from './context/TranslationsContext'
import theme from './theme'

const root = createRoot(document.body)
root.render(
	<ThemeProvider theme={theme}>
		<TranslationsProvider>
			<App />
		</TranslationsProvider>
	</ThemeProvider>,
)
