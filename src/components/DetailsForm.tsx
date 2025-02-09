import React, { ChangeEvent } from 'react'

import { Box, FormControl, TextField } from '@mui/material'

import { useTranslations } from '../context/TranslationsContext'
import type { Details } from '../types'

interface DetailsFormProps {
	details: Details
	setDetails: (cb: (existing: Details) => Details) => void
}

const DetailsForm = function ({ details, setDetails }: DetailsFormProps) {
	const { translations: i18n } = useTranslations()

	const updateCustomerNo = (e: ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, customerNo: e.target.value }))

	const updateInvoiceNo = (e: ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, invoiceNo: e.target.value }))

	const updateDate = (e: ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, date: e.target.value }))

	const updateServicePeriodStart = (e: ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, servicePeriodStart: e.target.value }))

	const updateServicePeriodEnd = (e: ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, servicePeriodEnd: e.target.value }))

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', width: '500px', maxWidth: '50%' }}>
			<TextField
				label={i18n.details.customerNo}
				value={details.customerNo}
				onChange={updateCustomerNo}
				margin="dense"
			/>
			<TextField label={i18n.details.invoiceNo} value={details.invoiceNo} onChange={updateInvoiceNo} margin="dense" />
			<FormControl sx={{ filled: '1' }} margin="dense">
				<TextField
					label={i18n.details.date}
					value={details.date}
					onChange={updateDate}
					type={'date'}
					slotProps={{ inputLabel: { shrink: true } }}
				/>
			</FormControl>
			<Box sx={{ display: 'flex', flexDirection: 'row' }}>
				<TextField
					label={i18n.details.servicePeriodStart}
					value={details.servicePeriodStart}
					onChange={updateServicePeriodStart}
					type={'date'}
					slotProps={{ inputLabel: { shrink: true } }}
					sx={{ flexGrow: 1 }}
					margin="dense"
				/>
				<TextField
					label={i18n.details.servicePeriodEnd}
					value={details.servicePeriodEnd}
					onChange={updateServicePeriodEnd}
					type={'date'}
					slotProps={{ inputLabel: { shrink: true } }}
					sx={{ flexGrow: 1 }}
					margin="dense"
				/>
			</Box>
		</Box>
	)
}

export default DetailsForm
