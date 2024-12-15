import PropTypes from 'prop-types'
import * as React from 'react'

import i18n from '../locales/de.json'

const DetailsForm = function ({ details, setDetails }) {
	const updateCustomerNo = e => setDetails(existing => ({ ...existing, customerNo: e.target.value }))
	const updateInvoiceNo = e => setDetails(existing => ({ ...existing, invoiceNo: e.target.value }))
	const updateDate = e => setDetails(existing => ({ ...existing, date: e.target.value }))

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

DetailsForm.propTypes = {
	details: PropTypes.shape({
		customerNo: PropTypes.string.isRequired,
		invoiceNo: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
	}).isRequired,
	setDetails: PropTypes.func.isRequired,
}

export default DetailsForm
