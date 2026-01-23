import React, { FormEvent, useRef, useState } from 'react'

import { AddCircle, AutoAwesome as AutoAwesomeIcon, RemoveCircle } from '@mui/icons-material'
import { Box, Button, Fab, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip } from '@mui/material'

import { useTranslations } from '../context/TranslationsContext'
import { getRandomItems } from '../demoData/items'
import type { LineItem } from '../types'

interface LineItemsFormProps {
	lineItems: Array<LineItem>
	setLineItems: (cb: ((existing: Array<LineItem>) => Array<LineItem>) | Array<LineItem>) => void
	devMode?: boolean
}

export const LineItemsForm = function ({ lineItems, setLineItems, devMode }: LineItemsFormProps) {
	const { translations: i18n } = useTranslations()

	const [dataComplete, setDataComplete] = useState(false)
	const titleRef = useRef<HTMLInputElement>(null)
	const quantityRef = useRef<HTMLInputElement>(null)
	const unitPriceRef = useRef<HTMLInputElement>(null)
	const vatRef = useRef<HTMLInputElement>(null)

	const addLineItem = () => {
		const newItem = {
			title: titleRef.current.value,
			quantity: parseFloat(quantityRef.current.value),
			unitPrice: parseFloat(unitPriceRef.current.value),
			vat: parseFloat(vatRef.current.value),
		}

		setLineItems((existing: Array<LineItem>) => [...existing, newItem])

		titleRef.current.value = ''
		quantityRef.current.value = ''
		unitPriceRef.current.value = ''
		vatRef.current.value = ''
		onInputChange()
	}

	const removeLineItem = (index: number) => {
		setLineItems((existing: Array<LineItem>) => existing.filter((item, i) => i !== index))
	}

	const onInputChange = () => {
		if (titleRef.current.value !== '' && quantityRef.current.value !== '' && unitPriceRef.current.value !== '') {
			setDataComplete(true)
		} else {
			setDataComplete(false)
		}
	}

	const fillDummyData = () => {
		setLineItems(getRandomItems())
	}

	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
				<Box sx={{ position: 'absolute', top: '0px', right: '0px' }}>
					{devMode && (
						<Tooltip title="Auto-fill with dummy data">
							<Button onClick={fillDummyData}>
								<AutoAwesomeIcon />
							</Button>
						</Tooltip>
					)}
				</Box>
				<form
					onSubmit={(e: FormEvent<HTMLFormElement>) => {
						e.preventDefault()
						dataComplete && addLineItem()
					}}
				>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>{i18n.lineItems.itemNo}</TableCell>
								<TableCell>{i18n.lineItems.title}</TableCell>
								<TableCell sx={{ width: '10em' }}>{i18n.lineItems.quantity}</TableCell>
								<TableCell sx={{ width: '10em' }}>{i18n.lineItems.unitPrice}</TableCell>
								<TableCell sx={{ width: '10em' }}>{i18n.lineItems.vat}</TableCell>
								<TableCell sx={{ width: '10em' }}>{i18n.lineItems.amount}</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{lineItems.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{item.title}</TableCell>
									<TableCell>{item.quantity}</TableCell>
									<TableCell>{item.unitPrice.toFixed(2)}</TableCell>
									<TableCell>{item.vat ?? '-'}</TableCell>
									<TableCell>{(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
									<TableCell>
										<Fab onClick={() => removeLineItem(index)} size="small">
											<RemoveCircle />
										</Fab>
									</TableCell>
								</TableRow>
							))}
							<TableRow>
								<TableCell></TableCell>
								<TableCell>
									<TextField sx={{ width: '100%' }} onChange={onInputChange} inputRef={titleRef} />
								</TableCell>
								<TableCell>
									<TextField onChange={onInputChange} inputRef={quantityRef} type="number" />
								</TableCell>
								<TableCell>
									<TextField onChange={onInputChange} inputRef={unitPriceRef} type="number" />
								</TableCell>
								<TableCell>
									<TextField onChange={onInputChange} inputRef={vatRef} type="number" />
								</TableCell>
								<TableCell></TableCell>
								<TableCell>
									<Fab onClick={addLineItem} size="small" disabled={!dataComplete}>
										<AddCircle />
									</Fab>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</form>
			</Box>
		</>
	)
}
