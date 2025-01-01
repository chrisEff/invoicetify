import PropTypes from 'prop-types'
import React from 'react'

import i18n from '../locales'

const styles = {
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

const Settings = ({ settings, setSettings, setShowSettings }) => {
	const updateLanguage = e => setSettings(existing => ({ ...existing, language: e.target.value }))
	const updateFontSize = e => setSettings(existing => ({ ...existing, fontSize: e.target.value }))

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
			<label htmlFor="fontSize">{i18n.settings.fontSize}:</label>
			<input type="number" id="fontSize" defaultValue={settings.fontSize} onChange={updateFontSize} />
		</dialog>
	)
}

Settings.propTypes = {
	settings: PropTypes.object.isRequired,
	setSettings: PropTypes.func.isRequired,
	setShowSettings: PropTypes.func.isRequired,
}

export default Settings
