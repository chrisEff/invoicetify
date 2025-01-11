import React, { useRef } from 'react'

import i18n from '../locales'
import type { Settings } from '../types'

const styles: { [key: string]: React.CSSProperties } = {
	dialog: {
		height: 'calc(100% - 80px)',
		width: 'calc(100% - 80px)',
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

	const updateLanguage = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, language: e.target.value }))
	const updateFontSize = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, fontSize: parseInt(e.target.value) }))

	const updateSenderAddress = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSettings(existing => ({ ...existing, senderAddress: e.target.value }))
	const updateIntroductoryText = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setSettings(existing => ({ ...existing, introductoryText: e.target.value }))
	const updateClosingText = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
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
			<input id="senderAddress" size={80} defaultValue={settings.senderAddress} onChange={updateSenderAddress} />
			<br />
			<br />
			<label htmlFor="introductoryText">{i18n.settings.introductoryText}:</label>
			<br />
			<textarea
				id="introductoryText"
				rows={4}
				cols={80}
				onChange={updateIntroductoryText}
				defaultValue={settings.introductoryText}
			/>
			<br />
			<br />
			<label htmlFor="closingText">{i18n.settings.closingText}:</label>
			<br />
			<textarea id="closingText" rows={4} cols={80} onChange={updateClosingText} defaultValue={settings.closingText} />
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
			<textarea id="footer" ref={footerRef} rows={4} cols={40}></textarea>
			<br />
			<input type="button" value="➕" onClick={addFooterSection} />
		</dialog>
	)
}

export default Settings
