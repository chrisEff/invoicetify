import * as React from 'react'
import { useRef } from 'react'

import i18n from '../locales'
import type { LineItem } from '../types'

interface LineItemsFormProps {
	lineItems: Array<LineItem>
	setLineItems: Function
}

const LineItemsForm = function ({ lineItems, setLineItems }: LineItemsFormProps) {
	const [dataComplete, setDataComplete] = React.useState(false)
	const titleRef = useRef<HTMLInputElement>(null)
	const quantityRef = useRef<HTMLInputElement>(null)
	const unitPriceRef = useRef<HTMLInputElement>(null)

	const addLineItem = () => {
		const newItem = {
			title: titleRef.current.value,
			quantity: parseFloat(quantityRef.current.value),
			unitPrice: parseFloat(unitPriceRef.current.value),
		}

		setLineItems((existing: Array<LineItem>) => [...existing, newItem])

		titleRef.current.value = ''
		quantityRef.current.value = ''
		unitPriceRef.current.value = ''
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

	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<form
					onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
						e.preventDefault()
						dataComplete && addLineItem()
					}}
				>
					<table>
						<thead>
							<tr>
								<th>{i18n.lineItems.itemNo}</th>
								<th>{i18n.lineItems.title}</th>
								<th style={{ width: '10em' }}>{i18n.lineItems.quantity}</th>
								<th style={{ width: '10em' }}>{i18n.lineItems.unitPrice}</th>
								<th style={{ width: '10em' }}>{i18n.lineItems.amount}</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{lineItems.map((item, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{item.title}</td>
									<td>{item.quantity}</td>
									<td>{item.unitPrice.toFixed(2)}</td>
									<td>{(item.quantity * item.unitPrice).toFixed(2)}</td>
									<td>
										<button onClick={() => removeLineItem(index)}>➖</button>
									</td>
								</tr>
							))}
							<tr>
								<td></td>
								<td>
									<input
										type="text"
										id="title"
										ref={titleRef}
										onChange={onInputChange}
										style={{ width: 'calc(100% - 1em)' }}
									/>
								</td>
								<td>
									<input
										type="number"
										id="quantity"
										ref={quantityRef}
										onChange={onInputChange}
										style={{ width: 'calc(100% - 1em)' }}
									/>
								</td>
								<td>
									<input
										type="number"
										id="unitPrice"
										ref={unitPriceRef}
										onChange={onInputChange}
										style={{ width: 'calc(100% - 1em)' }}
									/>
								</td>
								<td></td>
								<td>
									<button onClick={addLineItem} disabled={!dataComplete}>
										➕
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		</>
	)
}

export default LineItemsForm
