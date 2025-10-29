import React, { ChangeEvent } from 'react'

import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'

import { useTranslations } from '../context/TranslationsContext'
import type { Details, DocumentType } from '../types'

interface DetailsFormProps {
	details: Details
	setDetails: (cb: (existing: Details) => Details) => void
}

const DetailsForm = function ({ details, setDetails }: DetailsFormProps) {
	const { translations: i18n } = useTranslations()

	const updateDocumentType = (e: ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, documentType: e.target.value as DocumentType }))

	const updateCustomerNo = (e: ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, customerNo: e.target.value }))

	const updateInvoiceNo = (e: ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, invoiceNo: e.target.value }))

	const updateOrdereNo = (e: ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, orderNo: e.target.value }))

	const updateDate = (e: ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, date: e.target.value }))

	const updateServicePeriodStart = (e: ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, servicePeriodStart: e.target.value }))

	const updateServicePeriodEnd = (e: ChangeEvent<HTMLInputElement>) =>
		setDetails((existing: Details) => ({ ...existing, servicePeriodEnd: e.target.value }))

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', width: '500px', maxWidth: '50%' }}>
			<FormControl margin="dense">
				<FormLabel>{i18n.details.documentType}</FormLabel>
				<RadioGroup value={details.documentType} onChange={updateDocumentType}>
					<FormControlLabel value="invoice" control={<Radio />} label={i18n.invoice} />
					<FormControlLabel value="deliveryNote" control={<Radio />} label={i18n.deliveryNote} />
				</RadioGroup>
			</FormControl>
			<TextField
				label={i18n.details.customerNo}
				value={details.customerNo}
				onChange={updateCustomerNo}
				margin="dense"
			/>
			<TextField label={i18n.details.invoiceNo} value={details.invoiceNo} onChange={updateInvoiceNo} margin="dense" />
			<TextField label={i18n.details.orderNo} value={details.orderNo} onChange={updateOrdereNo} margin="dense" />
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
