import React, { ChangeEvent } from 'react'

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Switch } from '@mui/material'

import { useTheme } from '../../context/ThemeContext'
import { useTranslations } from '../../context/TranslationsContext'
import type { Settings } from '../../types'

interface GeneralProps {
	settings: Settings
	setSettings: (callback: (settings: Settings) => Settings) => void
}

const General = ({ settings, setSettings }: GeneralProps) => {
	const { setLanguage, translations: i18n } = useTranslations()
	const { darkMode, setDarkMode } = useTheme()

	const updateLanguage = (e: ChangeEvent<HTMLInputElement>) => {
		setLanguage(e.target.value)
		setSettings(existing => ({ ...existing, language: e.target.value }))
	}

	const updateDarkMode = (e: ChangeEvent<HTMLInputElement>) => {
		setDarkMode(e.target.checked)
		setSettings(existing => ({ ...existing, darkMode: e.target.checked }))
	}

	return (
		<>
			<FormControl margin="dense">
				<FormLabel>{i18n.settings.language}</FormLabel>
				<RadioGroup value={settings.language} onChange={updateLanguage}>
					<FormControlLabel value="en" control={<Radio />} label="🇬🇧" />
					<FormControlLabel value="de" control={<Radio />} label="🇩🇪" />
				</RadioGroup>
			</FormControl>
			<FormControl margin="dense">
				<FormLabel>{i18n.settings.darkMode}</FormLabel>
				<Switch checked={darkMode} onChange={updateDarkMode} />
			</FormControl>
		</>
	)
}

export default General
