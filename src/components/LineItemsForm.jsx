import PropTypes from 'prop-types'
import * as React from 'react'
import { useRef } from 'react'

import i18n from '../locales/index.js'

const LineItemsForm = function ({ lineItems, setLineItems }) {
	const [dataComplete, setDataComplete] = React.useState(false)
	const titleRef = useRef()
	const quantityRef = useRef()
	const unitPriceRef = useRef()

	const addLineItem = () => {
		const newItem = {
			title: titleRef.current.value,
			quantity: parseFloat(quantityRef.current.value),
			unitPrice: parseFloat(unitPriceRef.current.value),
		}

		setLineItems(existing => [...existing, newItem])

		titleRef.current.value = ''
		quantityRef.current.value = ''
		unitPriceRef.current.value = ''
		onInputChange()
	}

	const removeLineItem = index => {
		setLineItems(existing => existing.filter((item, i) => i !== index))
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
				<form onSubmit={e => e.preventDefault() && dataComplete && addLineItem()}>
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

LineItemsForm.propTypes = {
	lineItems: PropTypes.array.isRequired,
	setLineItems: PropTypes.func.isRequired,
}

export default LineItemsForm
