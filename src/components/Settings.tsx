import React, { ChangeEvent, CSSProperties, useRef } from 'react'

import type { Settings } from '../types'
import { useTranslations } from '../context/TranslationsContext'

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
		fontSize: '32px',
		position: 'absolute',
		top: 5,
		right: 5,
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
					<div style={styles.closeButton} onClick={() => setShowSettings(false)}>
						🆇
					</div>
					<h2>{i18n.settings.header}</h2>
					{i18n.settings.language}:
					<input type="radio" name="lang" value="en" onChange={updateLanguage} checked={settings.language === 'en'} />
					🇬🇧
					<input type="radio" name="lang" value="de" onChange={updateLanguage} checked={settings.language === 'de'} />
					🇩🇪
					<br />
					<br />
					<label htmlFor="fontSize">{i18n.settings.fontSize}:</label>
					<input type="number" id="fontSize" defaultValue={settings.fontSize} onChange={updateFontSize} />
					<br />
					<br />
					<label htmlFor="senderAddress">{i18n.settings.senderAddress}:</label>
					<br />
					<input
						id="senderAddress"
						style={{ width: '50em' }}
						defaultValue={settings.senderAddress}
						onChange={updateSenderAddress}
					/>
					<br />
					<br />
					<label htmlFor="introductoryText">{i18n.settings.introductoryText}:</label>
					<br />
					<textarea
						id="introductoryText"
						rows={5}
						onChange={updateIntroductoryText}
						defaultValue={settings.introductoryText}
						style={{ minHeight: '3em', minWidth: '20em', width: '50em' }}
					/>
					<br />
					<br />
					<label htmlFor="closingText">{i18n.settings.closingText}:</label>
					<br />
					<textarea
						id="closingText"
						rows={5}
						onChange={updateClosingText}
						defaultValue={settings.closingText}
						style={{ minHeight: '3em', minWidth: '20em', width: '50em' }}
					/>
					<br />
					<br />
					<label htmlFor="footer">Footer:</label>
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
							<div key={index} style={{ padding: 5 }}>
								<pre>{item}</pre>
								<input type="button" value="-" onClick={() => removeFooterSection(index)} />
							</div>
						))}
					</div>
					{settings.footer.length < 5 && (
						<>
							<textarea id="footer" ref={footerRef} rows={4} cols={40}></textarea>
							<br />
							<input type="button" value="➕" onClick={addFooterSection} />
						</>
					)}
				</div>
			</div>
		</dialog>
	)
}

export default Settings
