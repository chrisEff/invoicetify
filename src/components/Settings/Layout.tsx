import '../../fonts/fonts.css'

import React, { ChangeEvent } from 'react'

import { FormControl, FormLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import { useTranslations } from '../../context/TranslationsContext'
import type { FontFamily, Settings } from '../../types'

interface LayoutProps {
	settings: Settings
	setSettings: (callback: (settings: Settings) => Settings) => void
}

const Layout = ({ settings, setSettings }: LayoutProps) => {
	const { translations: i18n } = useTranslations()

	const updateFontFamily = (e: ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, fontFamily: e.target.value as FontFamily }))
	const updateFontSize = (e: ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, fontSize: parseInt(e.target.value) }))

	const updatePaddingLeft = (e: ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, padding: { ...existing.padding, left: parseFloat(e.target.value) } }))
	const updatePaddingRight = (e: ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, padding: { ...existing.padding, right: parseFloat(e.target.value) } }))
	const updatePaddingTop = (e: ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, padding: { ...existing.padding, top: parseFloat(e.target.value) } }))
	const updatePaddingBottom = (e: ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, padding: { ...existing.padding, bottom: parseFloat(e.target.value) } }))

	return (
		<>
			<FormControl>
				{/* Yes, we need the label twice here, otherwise it will look broken. (Possible bug in MUI?) */}
				<InputLabel>{i18n.settings.fontFamily}</InputLabel>
				<Select
					label={i18n.settings.fontFamily}
					variant={'outlined'}
					value={settings.fontFamily}
					onChange={updateFontFamily}
				>
					<MenuItem value={'OpenSans'} style={{ fontFamily: 'OpenSans' }}>
						Open Sans
					</MenuItem>
					<MenuItem value={'Roboto'} style={{ fontFamily: 'Roboto' }}>
						Roboto
					</MenuItem>
					<MenuItem value={'RobotoMono'} style={{ fontFamily: 'RobotoMono' }}>
						Roboto Mono
					</MenuItem>
					<MenuItem value={'RobotoSerif'} style={{ fontFamily: 'RobotoSerif' }}>
						Roboto Serif
					</MenuItem>
				</Select>
			</FormControl>
			<TextField
				label={i18n.settings.fontSize}
				defaultValue={settings.fontSize}
				type="number"
				slotProps={{ htmlInput: { min: 4, max: 20 } }}
				onChange={updateFontSize}
				margin="normal"
			/>
			<FormControl margin="dense">
				<FormLabel>{i18n.settings.padding.title} (cm)</FormLabel>
				<TextField
					label={i18n.settings.padding.top}
					defaultValue={settings.padding.top}
					type="number"
					slotProps={{ htmlInput: { min: 0, max: 5, step: '0.1' } }}
					onChange={updatePaddingTop}
					margin="dense"
				/>
				<TextField
					label={i18n.settings.padding.bottom}
					defaultValue={settings.padding.bottom}
					type="number"
					slotProps={{ htmlInput: { min: 0, max: 5, step: '0.1' } }}
					onChange={updatePaddingBottom}
					margin="dense"
				/>
				<TextField
					label={i18n.settings.padding.left}
					defaultValue={settings.padding.left}
					type="number"
					slotProps={{ htmlInput: { min: 0, max: 5, step: '0.1' } }}
					onChange={updatePaddingLeft}
					margin="dense"
				/>
				<TextField
					label={i18n.settings.padding.right}
					defaultValue={settings.padding.right}
					type="number"
					slotProps={{ htmlInput: { min: 0, max: 5, step: '0.1' } }}
					onChange={updatePaddingRight}
					margin="dense"
				/>
			</FormControl>
		</>
	)
}

export default Layout
