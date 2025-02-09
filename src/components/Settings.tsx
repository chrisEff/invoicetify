import React, { ChangeEvent, CSSProperties, useRef } from 'react'

import { AddCircle, Close, RemoveCircle } from '@mui/icons-material'
import {
	Box,
	FormControl,
	FormControlLabel,
	FormLabel,
	Modal,
	Radio,
	RadioGroup,
	Switch,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material'

import { useTheme } from '../context/ThemeContext'
import { useTranslations } from '../context/TranslationsContext'
import type { Settings } from '../types'

const styles: { [key: string]: CSSProperties } = {
	dialogContent: {
		backgroundColor: 'background.paper',
		margin: '60px 80px',
		padding: '20px 40px 20px 20px',
		position: 'relative',
		height: 'calc(100% - 120px)',
	},
	dialogContentScroll: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		overflow: 'auto',
	},
	closeButton: {
		position: 'absolute',
		top: 10,
		right: 10,
		cursor: 'pointer',
	},
}

interface SettingsProps {
	settings: Settings
	setSettings: (callback: (settings: Settings) => Settings) => void
	setShowSettings: (showSettings: boolean) => void
}

const Settings = ({ settings, setSettings, setShowSettings }: SettingsProps) => {
	const footerRef = useRef(null)

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

	const updateFontSize = (e: ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, fontSize: parseInt(e.target.value) }))

	const updateSenderAddress = (e: ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, senderAddress: e.target.value }))
	const updateIntroductoryText = (e: ChangeEvent<HTMLTextAreaElement>) =>
		setSettings(existing => ({ ...existing, introductoryText: e.target.value }))
	const updateClosingText = (e: ChangeEvent<HTMLTextAreaElement>) =>
		setSettings(existing => ({ ...existing, closingText: e.target.value }))

	const addFooterSection = () => {
		if (footerRef.current.value) {
			setSettings(existing => ({ ...existing, footer: [...existing.footer, footerRef.current.value] }))
			footerRef.current.value = ''
		}
	}
	const removeFooterSection = (index: number) => {
		setSettings(existing => ({ ...existing, footer: existing.footer.filter((item, i) => i !== index) }))
	}

	if (!settings) {
		return null
	}

	return (
		<Modal open>
			<Box sx={styles.dialogContent}>
				<Close sx={styles.closeButton} onClick={() => setShowSettings(false)} />
				<Box sx={styles.dialogContentScroll}>
					<Typography variant="h2">{i18n.settings.header}</Typography>
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
					<TextField
						label={i18n.settings.fontSize}
						defaultValue={settings.fontSize}
						onChange={updateFontSize}
						margin="normal"
					/>
					<TextField
						label={i18n.settings.senderAddress}
						defaultValue={settings.senderAddress}
						onChange={updateSenderAddress}
						fullWidth
						margin="normal"
					/>
					<TextField
						label={i18n.settings.introductoryText}
						defaultValue={settings.introductoryText}
						onChange={updateIntroductoryText}
						fullWidth
						multiline
						rows={5}
						margin="normal"
					/>
					<TextField
						label={i18n.settings.closingText}
						defaultValue={settings.closingText}
						onChange={updateClosingText}
						fullWidth
						multiline
						rows={5}
						margin="normal"
					/>
					<br />
					<FormLabel>Footer:</FormLabel>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
						}}
					>
						{!settings.footer.length && (
							<>
								<Box sx={{ color: 'silver', padding: 5 }}>
									<pre>
										No footer
										<br />
										sections
										<br />
										added yet.
									</pre>
								</Box>
							</>
						)}
						{settings.footer.map((item, index) => (
							<Box key={index} sx={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
								<Box sx={{ flexGrow: 1, whiteSpace: 'pre' }}>{item}</Box>
								<Tooltip title={i18n.settings.remove}>
									<RemoveCircle onClick={() => removeFooterSection(index)} />
								</Tooltip>
							</Box>
						))}
					</Box>
					{settings.footer.length < 5 && (
						<>
							<TextField inputRef={footerRef} multiline rows={4} />
							<br />
							<Tooltip title={i18n.settings.add}>
								<AddCircle onClick={addFooterSection} />
							</Tooltip>
						</>
					)}
				</Box>
			</Box>
		</Modal>
	)
}

export default Settings
