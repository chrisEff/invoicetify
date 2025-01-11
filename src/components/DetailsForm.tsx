import React, { ChangeEvent } from 'react'

import type { Details } from '../types'
import { useTranslations } from '../context/TranslationsContext'

interface DetailsFormProps {
	details: Details
	setDetails: Function
}

const DetailsForm = function ({ details, setDetails }: DetailsFormProps) {
	const { translations: i18n } = useTranslations()

	const updateCustomerNo = (e: ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, customerNo: e.target.value }))
	const updateInvoiceNo = (e: ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, invoiceNo: e.target.value }))
	const updateDate = (e: ChangeEvent<HTMLInputElement>) =>
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
