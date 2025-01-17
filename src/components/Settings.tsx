import React, { ChangeEvent, CSSProperties, useRef } from 'react'

import { AddCircle, Close, RemoveCircle } from '@mui/icons-material'
import {
	Box,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material'

import { useTranslations } from '../context/TranslationsContext'
import type { Settings } from '../types'

const styles: { [key: string]: CSSProperties } = {
	dialog: {
		backgroundColor: 'rgba(0,0,0, 0.7)',
		border: 'none',
		display: 'flex',
		padding: 0,
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 9999,
	},
	dialogContent: {
		backgroundColor: 'white',
		flexGrow: 1,
		margin: '60px 80px',
		padding: '20px 40px 20px 20px',
		position: 'relative',
	},
	dialogContentScroll: {
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

	const updateLanguage = (e: ChangeEvent<HTMLInputElement>) => {
		setLanguage(e.target.value)
		setSettings(existing => ({ ...existing, language: e.target.value }))
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
		<dialog open style={styles.dialog}>
			<div style={styles.dialogContent}>
				<div style={styles.dialogContentScroll}>
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<Close style={styles.closeButton} onClick={() => setShowSettings(false)} />
						<Typography variant="h2">{i18n.settings.header}</Typography>
						<FormControl margin="dense">
							<FormLabel>{i18n.settings.language}</FormLabel>
							<RadioGroup value={settings.language} onChange={updateLanguage}>
								<FormControlLabel value="en" control={<Radio />} label="🇬🇧" />
								<FormControlLabel value="de" control={<Radio />} label="🇩🇪" />
							</RadioGroup>
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
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
							}}
						>
							{!settings.footer.length && (
								<>
									<div style={{ color: 'silver', padding: 5 }}>
										<pre>
											No footer
											<br />
											sections
											<br />
											added yet.
										</pre>
									</div>
								</>
							)}
							{settings.footer.map((item, index) => (
								<div key={index} style={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
									<pre style={{ flexGrow: 1 }}>{item}</pre>
									<Tooltip title={i18n.settings.remove}>
										<RemoveCircle onClick={() => removeFooterSection(index)} />
									</Tooltip>
								</div>
							))}
						</div>
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
				</div>
			</div>
		</dialog>
	)
}

export default Settings
