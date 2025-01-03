import * as React from 'react'

import i18n from '../locales'
import type { Details } from '../types'

interface DetailsFormProps {
	details: Details
	setDetails: Function
}

const DetailsForm = function ({ details, setDetails }: DetailsFormProps) {
	const updateCustomerNo = (e: React.ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, customerNo: e.target.value }))
	const updateInvoiceNo = (e: React.ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, invoiceNo: e.target.value }))
	const updateDate = (e: React.ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, date: e.target.value }))

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '500px', maxWidth: '50%' }}>
			<label htmlFor="customerNo">{i18n.details.customerNo}:</label>
			<input type="text" id="customerNo" value={details.customerNo} onChange={updateCustomerNo} />
			<br />
			<label htmlFor="invoiceNo">{i18n.details.invoiceNo}:</label>
			<input type="text" id="invoiceNo" value={details.invoiceNo} onChange={updateInvoiceNo} />
			<br />
			<label htmlFor="date">{i18n.details.date}:</label>
			<input type="text" id="date" value={details.date} onChange={updateDate} />
			<br />
		</div>
	)
}

export default DetailsForm
