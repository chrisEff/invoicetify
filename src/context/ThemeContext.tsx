import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

import { createTheme, CssBaseline, GlobalStyles, ThemeProvider as MaterialThemeProvider } from '@mui/material'

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
				fontSize: '2.4rem',
				fontWeight: 300,
			},
			h2: {
				fontSize: '2.1rem',
				fontWeight: 300,
			},
			h3: {
				fontSize: '1.8rem',
				fontWeight: 300,
			},
			h4: {
				fontSize: '1.5rem',
				fontWeight: 300,
			},
			h5: {
				fontSize: '1.2rem',
				fontWeight: 300,
			},
			h6: {
				fontSize: '1.0rem',
				fontWeight: 300,
			},
		},
		components: {
			MuiPaper: {
				styleOverrides: {
					root: {
						padding: '2rem',
					},
				},
			},
			MuiTabs: {
				styleOverrides: {
					root: {
						marginBottom: '1rem',
					},
				},
			},
		},
		palette: {
			mode: darkMode ? 'dark' : 'light',
		},
	})

	return (
		<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
			<GlobalStyles
				styles={() => ({
					body: {
						padding: '2rem',
					},
					'h1, h2, h3, h4, h5, h6, label, div[role=tooltip], th': {
						userSelect: 'none',
					},
				})}
			/>
			<MaterialThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MaterialThemeProvider>
		</ThemeContext.Provider>
	)
}
