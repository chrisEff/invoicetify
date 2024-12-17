import * as React from 'react'

import i18n from '../locales/index.js'
import DetailsForm from './DetailsForm.jsx'
import LineItemsForm from './LineItemsForm.jsx'
import RecipientForm from './RecipientForm.jsx'

const App = () => {
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
			</main>
		</>
	)
}

export default App
