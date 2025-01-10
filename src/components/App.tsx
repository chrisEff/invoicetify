import { PDFDownloadLink } from '@react-pdf/renderer'
import * as React from 'react'
import { useEffect, useState } from 'react'

import i18n from '../locales/index'
import type { Recipient, Details, LineItem, Settings } from '../types'
import DetailsForm from './DetailsForm'
import LineItemsForm from './LineItemsForm'
import Pdf from './Pdf'
import RecipientForm from './RecipientForm'
import SettingsForm from './Settings'

const App = () => {
	const devMode = false
	const [tab, setTab] = React.useState<string>('recipient')
	const [showSettings, setShowSettings] = useState<boolean>(false)
	const [settings, setSettings] = useState<Settings>({
		language: null,
		fontSize: null,
	})
	const [recipient, setRecipient] = React.useState<Recipient>({
		salutation: null,
		firstName: '',
		lastName: '',
		street: '',
		zipcode: '',
		city: '',
	})
	const [details, setDetails] = React.useState<Details>({
		customerNo: '',
		invoiceNo: '',
		date: '',
	})
	const [lineItems, setLineItems] = React.useState<Array<LineItem>>([])

	useEffect(() => {
		async function fetchSettings() {
			const language = await window.electronAPI.storeGet('language')
			const fontSize = await window.electronAPI.storeGet('fontSize')
			setSettings(existing => ({ ...existing, language, fontSize }))
		}
		if (settings.language === null) {
			fetchSettings()
		}
	})

	useEffect(() => {
		settings.language !== null && window.electronAPI.storeSet('language', settings.language)
		settings.fontSize !== null && window.electronAPI.storeSet('fontSize', settings.fontSize)
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
				<PDFDownloadLink
					document={<Pdf {...{ recipient, details, lineItems, settings }} />}
					fileName={i18n.invoice + '.pdf'}
				>
					{/* @ts-ignore PDFDownloadLink actually supports passing a function in the `children` prop */}
					{({ loading }) => (loading ? '' : <button>Save PDF</button>)}
				</PDFDownloadLink>{' '}
				<button onClick={() => setShowSettings(true)}>Settings</button>
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
