import React, { ChangeEvent } from 'react'

import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'

import { useTranslations } from '../context/TranslationsContext'
import type { Recipient, Salutation } from '../types'

interface RecipientFormProps {
	recipient: Recipient
	setRecipient: (cb: (existing: Recipient) => Recipient) => void
}

const RecipientForm = function ({ recipient, setRecipient }: RecipientFormProps) {
	const { translations: i18n } = useTranslations()

	const updateSalutation = (e: ChangeEvent<HTMLInputElement>) =>
		setRecipient((existing: Recipient) => ({ ...existing, salutation: e.target.value as Salutation }))
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
		<Box sx={{ display: 'flex', flexDirection: 'column', width: '500px', maxWidth: '50%' }}>
			<FormControl margin="dense">
				<FormLabel>{i18n.recipient.salutation}</FormLabel>
				<RadioGroup value={recipient.salutation} onChange={updateSalutation}>
					<FormControlLabel
						value="dearMs"
						control={<Radio />}
						label={i18n.salutations.dearMs + ' [' + i18n.recipient.lastName + '],'}
					/>
					<FormControlLabel
						value="dearMr"
						control={<Radio />}
						label={i18n.salutations.dearMr + ' [' + i18n.recipient.lastName + '],'}
					/>
					<FormControlLabel value="dearSirOrMadam" control={<Radio />} label={i18n.salutations.dearSirOrMadam + ','} />
				</RadioGroup>
			</FormControl>
			<TextField
				label={i18n.recipient.firstName}
				value={recipient.firstName}
				onChange={updateFirstName}
				margin="dense"
			/>
			<TextField label={i18n.recipient.lastName} value={recipient.lastName} onChange={updateLastName} margin="dense" />
			<TextField label={i18n.recipient.street} value={recipient.street} onChange={updateStreet} margin="dense" />
			<TextField label={i18n.recipient.zipcode} value={recipient.zipcode} onChange={updateZipcode} margin="dense" />
			<TextField label={i18n.recipient.city} value={recipient.city} onChange={updateCity} margin="dense" />
		</Box>
	)
}

export default RecipientForm
