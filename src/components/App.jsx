import { PDFDownloadLink } from '@react-pdf/renderer'
import * as React from 'react'

import i18n from '../locales/index.js'
import DetailsForm from './DetailsForm.jsx'
import LineItemsForm from './LineItemsForm.jsx'
import Pdf from './Pdf.jsx'
import RecipientForm from './RecipientForm.jsx'

const App = () => {
	const devMode = false
	const [tab, setTab] = React.useState('recipient')
	const [recipient, setRecipient] = React.useState({
		firstName: '',
		lastName: '',
		street: '',
		zipcode: '',
		city: '',
	})
	const [details, setDetails] = React.useState({
		customerNo: '',
		invoiceNo: '',
		date: '',
	})
	const [lineItems, setLineItems] = React.useState([])

	return (
		<>
			{devMode && (
				<button
					style={{ position: 'fixed', top: '10px', right: '10px' }}
					onClick={() => {
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
					}}
				>
					fill
				</button>
			)}
			<h2>{i18n.invoice}</h2>
			<nav>
				<div className={tab === 'recipient' ? 'active' : ''} onClick={() => setTab('recipient')}>
					Empfänger
				</div>
				<div className={tab === 'details' ? 'active' : ''} onClick={() => setTab('details')}>
					Details
				</div>
				<div className={tab === 'lineItems' ? 'active' : ''} onClick={() => setTab('lineItems')}>
					Positionen
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
				<PDFDownloadLink document={<Pdf {...{ recipient, details, lineItems }} />} fileName={i18n.invoice + '.pdf'}>
					{({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
				</PDFDownloadLink>
			</main>
		</>
	)
}

export default App
