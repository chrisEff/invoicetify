import React, { useEffect, useState } from 'react'

import {
	AutoAwesome as AutoAwesomeIcon,
	PictureAsPdfOutlined as PictureAsPdfOutlinedIcon,
	Settings as SettingsIcon,
} from '@mui/icons-material'
import { Box, Button, Paper, Tab, Tabs, Tooltip, Typography } from '@mui/material'
import { PDFDownloadLink } from '@react-pdf/renderer'

import { TranslationsProvider, useTranslations } from '../context/TranslationsContext'
import type { Details, LineItem, Recipient, Settings } from '../types'
import DetailsForm from './DetailsForm'
import LineItemsForm from './LineItemsForm'
import Pdf from './Pdf/Pdf'
import RecipientForm from './RecipientForm'
import SettingsForm from './Settings/Settings'

const App = () => {
	const { translations: i18n } = useTranslations()

	const [devMode, setDevMode] = useState<boolean>(false)
	const [tab, setTab] = useState<string>('recipient')
	const [showPdfButton, setShowPdfButton] = useState<boolean>(true)
	const [showSettings, setShowSettings] = useState<boolean>(false)
	const [settings, _setSettings] = useState<Settings>(null)
	const [recipient, setRecipient] = useState<Recipient>({
		salutation: null,
		firstName: '',
		lastName: '',
		street: '',
		zipcode: '',
		city: '',
	})
	const [details, setDetails] = useState<Details>({
		customerNo: '',
		invoiceNo: '',
		date: '',
		servicePeriodStart: '',
		servicePeriodEnd: '',
	})
	const [lineItems, _setLineItems] = useState<Array<LineItem>>([])

	// Workaround for a bug in react-pdf that causes the App to crash when an item is removed from an array
	// see https://github.com/diegomura/react-pdf/issues/2978
	const setLineItems = (cb: ((existing: Array<LineItem>) => Array<LineItem>) | Array<LineItem>) => {
		_setLineItems(cb)
		setShowPdfButton(false)
	}

	const setSettings = (cb: ((existing: Settings) => Settings) | Settings) => {
		_setSettings(cb)
		setShowPdfButton(false)
	}

	useEffect(() => {
		setShowPdfButton(true)
	}, [lineItems, settings])

	// --- End of workaround ---

	async function fetchSettings() {
		const fetchedSettings = (await window.electronAPI.storeGet('settings')) as Settings
		setSettings(fetchedSettings)
		const fetchedDevMode = (await window.electronAPI.storeGet('devMode')) as boolean
		setDevMode(fetchedDevMode)
	}

	useEffect(() => {
		if (settings === null) {
			fetchSettings()
		}
	})

	useEffect(() => {
		if (settings) {
			window.electronAPI.storeSet('settings', settings)
		}
	}, [settings])

	const fillDummyData = () => {
		setRecipient({
			salutation: 'dearMr',
			firstName: 'John',
			lastName: 'Doe',
			street: 'Fakestreet 123',
			zipcode: '12345',
			city: 'Faketown',
		})
		setDetails({
			customerNo: '12345',
			invoiceNo: '12345-67890',
			date: '2025-01-01',
			servicePeriodStart: '2024-09-26',
			servicePeriodEnd: '2024-11-01',
		})
		setLineItems([
			{
				title: 'Item 1',
				quantity: 3,
				unitPrice: 49.99,
			},
			{
				title: 'Item 2',
				quantity: 7,
				unitPrice: 129.9,
			},
			{
				title: 'Item 3',
				quantity: 2,
				unitPrice: 27.63,
			},
		])
	}

	const handleH1Click = () => {
		if (recipient.firstName === 'dev' && recipient.lastName === 'admin') {
			window.electronAPI.storeSet('devMode', !devMode)
			setDevMode(!devMode)
		}
	}

	return (
		<>
			{showSettings && <SettingsForm {...{ settings, setSettings, setShowSettings }} />}
			<Box sx={{ position: 'fixed', top: '10px', right: '10px' }}>
				{devMode && (
					<Tooltip title="Auto-fill with dummy data">
						<Button onClick={fillDummyData}>
							<AutoAwesomeIcon />
						</Button>
					</Tooltip>
				)}
				{settings && showPdfButton && (
					<PDFDownloadLink
						document={
							<TranslationsProvider>
								<Pdf {...{ recipient, details, lineItems, settings }} />
							</TranslationsProvider>
						}
						fileName={i18n.invoice + '.pdf'}
					>
						{({ loading }) =>
							loading ? (
								''
							) : (
								<Tooltip title={i18n.exportPdf}>
									<Button>
										<PictureAsPdfOutlinedIcon />
									</Button>
								</Tooltip>
							)
						}
					</PDFDownloadLink>
				)}
				<Tooltip title={i18n.settings.header}>
					<Button onClick={() => setShowSettings(true)}>
						<SettingsIcon />
					</Button>
				</Tooltip>
			</Box>
			<Typography variant="h1" onClick={handleH1Click}>
				{i18n.invoice}
			</Typography>

			<Tabs value={tab} onChange={(e, value) => setTab(value)}>
				<Tab label={i18n.tabs.recipient} value="recipient" />
				<Tab label={i18n.tabs.details} value="details" />
				<Tab label={i18n.tabs.lineItems} value="lineItems" />
			</Tabs>
			<main>
				<Paper elevation={8}>
					{(() => {
						switch (tab) {
							case 'details':
								return <DetailsForm {...{ details, setDetails }} />
							case 'lineItems':
								return <LineItemsForm {...{ lineItems, setLineItems }} />
							case 'recipient':
							default:
								return <RecipientForm {...{ recipient, setRecipient }} />
						}
					})()}
				</Paper>
			</main>
		</>
	)
}

export default App
