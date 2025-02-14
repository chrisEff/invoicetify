import React, { CSSProperties, useState } from 'react'

import { Close } from '@mui/icons-material'
import { Box, Modal, Tab, Tabs, Typography } from '@mui/material'

import { useTranslations } from '../../context/TranslationsContext'
import type { Settings } from '../../types'
import Content from './Content'
import General from './General'
import Layout from './Layout'

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
	const { translations: i18n } = useTranslations()

	const [tab, setTab] = useState<string>('general')

	if (!settings) {
		return null
	}

	return (
		<Modal open>
			<Box sx={styles.dialogContent}>
				<Close sx={styles.closeButton} onClick={() => setShowSettings(false)} />
				<Box sx={styles.dialogContentScroll}>
					<Typography variant="h2">{i18n.settings.header}</Typography>
					<Tabs value={tab} onChange={(e, value) => setTab(value)}>
						<Tab label={i18n.settings.tabs.general} value="general" />
						<Tab label={i18n.settings.tabs.layout} value="layout" />
						<Tab label={i18n.settings.tabs.content} value="content" />
					</Tabs>

					{(() => {
						switch (tab) {
							case 'layout':
								return <Layout {...{ settings, setSettings }} />
							case 'content':
								return <Content {...{ settings, setSettings }} />
							case 'recipient':
							default:
								return <General {...{ settings, setSettings }} />
						}
					})()}
				</Box>
			</Box>
		</Modal>
	)
}

export default Settings
