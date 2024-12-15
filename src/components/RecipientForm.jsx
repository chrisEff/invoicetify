import PropTypes from 'prop-types'
import * as React from 'react'

import i18n from '../locales/de.json'

const RecipientForm = function ({ recipient, setRecipient }) {
	const updateSalutation = e => setRecipient(existing => ({ ...existing, salutation: e.target.value }))
	const updateFirstName = e => setRecipient(existing => ({ ...existing, firstName: e.target.value }))
	const updateLastName = e => setRecipient(existing => ({ ...existing, lastName: e.target.value }))
	const updateStreet = e => setRecipient(existing => ({ ...existing, street: e.target.value }))
	const updateZipcode = e => setRecipient(existing => ({ ...existing, zipcode: e.target.value }))
	const updateCity = e => setRecipient(existing => ({ ...existing, city: e.target.value }))

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '500px', maxWidth: '50%' }}>
			{i18n.recipient.salutation}:
			<label>
				<input type="radio" value="dearMs" checked={recipient.salutation === 'dearMs'} onChange={updateSalutation} />
				{i18n.salutations.dearMs} [{i18n.recipient.lastName}]
			</label>
			<label>
				<input type="radio" value="dearMr" checked={recipient.salutation === 'dearMr'} onChange={updateSalutation} />
				{i18n.salutations.dearMr} [{i18n.recipient.lastName}]
			</label>
			<label>
				<input
					type="radio"
					value="dearSirOrMadam"
					checked={recipient.salutation === 'dearSirOrMadam'}
					onChange={updateSalutation}
				/>
				{i18n.salutations.dearSirOrMadam}
			</label>
			<br />
			<label htmlFor="firstName">{i18n.recipient.firstName}:</label>
			<input type="text" id="firstName" maxLength="100" value={recipient.firstName} onChange={updateFirstName} />
			<br />
			<label htmlFor="lastName">{i18n.recipient.lastName}:</label>
			<input type="text" id="lastName" maxLength="100" value={recipient.lastName} onChange={updateLastName} />
			<br />
			<label htmlFor="street">{i18n.recipient.street}:</label>
			<input type="text" id="street" maxLength="100" value={recipient.street} onChange={updateStreet} />
			<br />
			<label htmlFor="zipcode">{i18n.recipient.zipcode}:</label>
			<input type="text" id="zipcode" maxLength="100" value={recipient.zipcode} onChange={updateZipcode} />
			<br />
			<label htmlFor="city">{i18n.recipient.city}:</label>
			<input type="text" id="city" maxLength="100" value={recipient.city} onChange={updateCity} />
			<br />
		</div>
	)
}

RecipientForm.propTypes = {
	recipient: PropTypes.shape({
		salutation: PropTypes.string.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		street: PropTypes.string.isRequired,
		zipcode: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
	}).isRequired,
	setRecipient: PropTypes.func.isRequired,
}

export default RecipientForm
