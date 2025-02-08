import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

import { createTheme, CssBaseline, ThemeProvider as MaterialThemeProvider } from '@mui/material'

interface ThemeContextInterface {
	darkMode: boolean
	setDarkMode: (darkMode: boolean) => void
}

const ThemeContext = createContext<ThemeContextInterface>(undefined)

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error('useTheme must be used within ThemeProvider')
	}

	return context
}

export const ThemeProvider = ({ children }: PropsWithChildren) => {
	const [darkMode, setDarkMode] = useState(true)

	useEffect(() => {
		async function loadDarkMode() {
			const darkMode = (await window.electronAPI.storeGet('settings.darkMode')) as boolean
			setDarkMode(darkMode)
		}
		loadDarkMode()
	})

	const theme = createTheme({
		typography: {
			h1: {
				fontSize: '3rem',
			},
			h2: {
				fontSize: '2.5rem',
			},
			h3: {
				fontSize: '2rem',
			},
			h4: {
				fontSize: '1.5rem',
			},
			h5: {
				fontSize: '1.25rem',
			},
			h6: {
				fontSize: '1rem',
			},
		},
		palette: {
			mode: darkMode ? 'dark' : 'light',
		},
	})

	return (
		<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
			<MaterialThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MaterialThemeProvider>
		</ThemeContext.Provider>
	)
}
