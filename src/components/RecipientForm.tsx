import React, { ChangeEvent } from 'react'

import type { Recipient } from '../types'
import { useTranslations } from '../context/TranslationsContext'

interface RecipientFormProps {
	recipient: Recipient
	setRecipient: Function
}

const RecipientForm = function ({ recipient, setRecipient }: RecipientFormProps) {
	const { translations: i18n } = useTranslations()

	const updateSalutation = (e: ChangeEvent<HTMLInputElement>) =>
		setRecipient((existing: Recipient) => ({ ...existing, salutation: e.target.value }))
	const updateFirstName = (e: ChangeEvent<HTMLInputElement>) =>
		setRecipient((existing: Recipient) => ({ ...existing, firstName: e.target.value }))
	const updateLastName = (e: ChangeEvent<HTMLInputElement>) =>
		setRecipient((existing: Recipient) => ({ ...existing, lastName: e.target.value }))
	const updateStreet = (e: ChangeEvent<HTMLInputElement>) =>
		setRecipient((existing: Recipient) => ({ ...existing, street: e.target.value }))
	const updateZipcode = (e: ChangeEvent<HTMLInputElement>) =>
		setRecipient((existing: Recipient) => ({ ...existing, zipcode: e.target.value }))
	const updateCity = (e: ChangeEvent<HTMLInputElement>) =>
		setRecipient((existing: Recipient) => ({ ...existing, city: e.target.value }))

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
			<input type="text" id="firstName" maxLength={100} value={recipient.firstName} onChange={updateFirstName} />
			<br />
			<label htmlFor="lastName">{i18n.recipient.lastName}:</label>
			<input type="text" id="lastName" maxLength={100} value={recipient.lastName} onChange={updateLastName} />
			<br />
			<label htmlFor="street">{i18n.recipient.street}:</label>
			<input type="text" id="street" maxLength={100} value={recipient.street} onChange={updateStreet} />
			<br />
			<label htmlFor="zipcode">{i18n.recipient.zipcode}:</label>
			<input type="text" id="zipcode" maxLength={100} value={recipient.zipcode} onChange={updateZipcode} />
			<br />
			<label htmlFor="city">{i18n.recipient.city}:</label>
			<input type="text" id="city" maxLength={100} value={recipient.city} onChange={updateCity} />
			<br />
		</div>
	)
}

export default RecipientForm
