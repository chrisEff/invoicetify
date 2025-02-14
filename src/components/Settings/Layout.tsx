import React, { ChangeEvent } from 'react'

import { FormControl, FormLabel, TextField } from '@mui/material'

import { useTranslations } from '../../context/TranslationsContext'
import type { Settings } from '../../types'

interface LayoutProps {
	settings: Settings
	setSettings: (callback: (settings: Settings) => Settings) => void
}

const Layout = ({ settings, setSettings }: LayoutProps) => {
	const { translations: i18n } = useTranslations()

	const updateFontSize = (e: ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, fontSize: parseInt(e.target.value) }))

	const updatePaddingLeft = (e: ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, padding: { ...existing.padding, left: parseInt(e.target.value) } }))
	const updatePaddingRight = (e: ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, padding: { ...existing.padding, right: parseInt(e.target.value) } }))
	const updatePaddingTop = (e: ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, padding: { ...existing.padding, top: parseInt(e.target.value) } }))
	const updatePaddingBottom = (e: ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, padding: { ...existing.padding, bottom: parseInt(e.target.value) } }))

	return (
		<>
			<TextField
				label={i18n.settings.fontSize}
				defaultValue={settings.fontSize}
				onChange={updateFontSize}
				margin="normal"
			/>
			<FormControl margin="dense">
				<FormLabel>{i18n.settings.padding.title} (cm)</FormLabel>
				<TextField
					label={i18n.settings.padding.top}
					defaultValue={settings.padding.top}
					type="number"
					slotProps={{ htmlInput: { step: '0.1' } }}
					onChange={updatePaddingTop}
					margin="dense"
				/>
				<TextField
					label={i18n.settings.padding.bottom}
					defaultValue={settings.padding.bottom}
					type="number"
					slotProps={{ htmlInput: { step: '0.1' } }}
					onChange={updatePaddingBottom}
					margin="dense"
				/>
				<TextField
					label={i18n.settings.padding.left}
					defaultValue={settings.padding.left}
					type="number"
					slotProps={{ htmlInput: { step: '0.1' } }}
					onChange={updatePaddingLeft}
					margin="dense"
				/>
				<TextField
					label={i18n.settings.padding.right}
					defaultValue={settings.padding.right}
					type="number"
					slotProps={{ htmlInput: { step: '0.1' } }}
					onChange={updatePaddingRight}
					margin="dense"
				/>
			</FormControl>
		</>
	)
}

export default Layout
