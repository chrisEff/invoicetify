import { PDFDownloadLink } from '@react-pdf/renderer'
import React, { useEffect, useState } from 'react'

import type { Recipient, Details, LineItem, Settings } from '../types'
import DetailsForm from './DetailsForm'
import LineItemsForm from './LineItemsForm'
import Pdf from './Pdf'
import RecipientForm from './RecipientForm'
import SettingsForm from './Settings'
import { TranslationsProvider, useTranslations } from '../context/TranslationsContext'

const App = () => {
	const { translations: i18n } = useTranslations()

	const devMode = false
	const [tab, setTab] = useState<string>('recipient')
	const [showSettings, setShowSettings] = useState<boolean>(false)
	const [settings, setSettings] = useState<Settings>(null)
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
	})
	const [lineItems, setLineItems] = useState<Array<LineItem>>([])

	async function fetchSettings() {
		const fetchedSettings = await window.electronAPI.storeGet('settings')
		setSettings(fetchedSettings)
	}

	useEffect(() => {
		if (settings === null) {
			fetchSettings()
		}
	})

	useEffect(() => {
		if (settings) {
			settings.language !== null && window.electronAPI.storeSet('settings.language', settings.language)
			settings.fontSize !== null && window.electronAPI.storeSet('settings.fontSize', settings.fontSize)
			settings.senderAddress !== null && window.electronAPI.storeSet('settings.senderAddress', settings.senderAddress)
			settings.introductoryText !== null &&
				window.electronAPI.storeSet('settings.introductoryText', settings.introductoryText)
			settings.closingText !== null && window.electronAPI.storeSet('settings.closingText', settings.closingText)
			settings.footer !== null && window.electronAPI.storeSet('settings.footer', settings.footer)
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
			date: '01.01.2025',
		})
		setLineItems([
			{
				title: 'Item 1',
				quantity: 3,
				unitPrice: 49.99,
			},
			{
				title: 'Item 3',
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

	return (
		<>
			{showSettings && <SettingsForm {...{ settings, setSettings, setShowSettings }} />}
			<div style={{ position: 'fixed', top: '10px', right: '10px' }}>
				{devMode && <button onClick={fillDummyData}>Fill</button>}{' '}
				{settings && (
					<PDFDownloadLink
						document={
							<TranslationsProvider>
								<Pdf {...{ recipient, details, lineItems, settings }} />
							</TranslationsProvider>
						}
						fileName={i18n.invoice + '.pdf'}
					>
						{/* @ts-ignore PDFDownloadLink actually supports passing a function in the `children` prop */}
						{({ loading }) => (loading ? '' : <button>{i18n.exportPdf}</button>)}
					</PDFDownloadLink>
				)}{' '}
				<button onClick={() => setShowSettings(true)}>{i18n.settings.header}</button>
			</div>
			<h2>{i18n.invoice}</h2>
			<nav>
				<div className={tab === 'recipient' ? 'active' : ''} onClick={() => setTab('recipient')}>
					{i18n.tabs.recipient}
				</div>
				<div className={tab === 'details' ? 'active' : ''} onClick={() => setTab('details')}>
					{i18n.tabs.details}
				</div>
				<div className={tab === 'lineItems' ? 'active' : ''} onClick={() => setTab('lineItems')}>
					{i18n.tabs.lineItems}
				</div>
			</nav>
			<main>
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
			</main>
		</>
	)
}

export default App
