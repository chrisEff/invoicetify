import React from 'react'

import { Text, View } from '@react-pdf/renderer'
// eslint-disable-next-line import/no-unresolved
import { Style } from '@react-pdf/types/style'

import { useTranslations } from '../../context/TranslationsContext'
import type { LineItem } from '../../types'

interface TableProps {
	lineItems: Array<LineItem>
}

const Table = ({ lineItems }: TableProps) => {
	const { translations: i18n } = useTranslations()

	const styles: { [key: string]: Style } = {
		table: {},
		tableHeader: {
			fontWeight: 'bold',
		},
		tableRow: {
			display: 'flex',
			flexDirection: 'row',
		},
		tableRowOdd: {
			display: 'flex',
			flexDirection: 'row',
			backgroundColor: 'lightgrey',
		},
		itemNo: {
			width: '50px',
		},
		title: {
			flexGrow: 1,
		},
		quantity: {
			width: '100px',
		},
		unitPrice: {
			width: '100px',
		},
		amount: {
			textAlign: 'right',
			width: '100px',
		},
		total: {
			fontWeight: 'bold',
		},
	}

	const total = lineItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0)

	return (
		<View style={styles.table}>
			<View style={{ ...styles.tableRow, ...styles.tableHeader }}>
				<View style={styles.itemNo}>
					<Text>{i18n.lineItems.itemNo}</Text>
				</View>
				<View style={styles.title}>
					<Text>{i18n.lineItems.title}</Text>
				</View>
				<View style={styles.quantity}>
					<Text>{i18n.lineItems.quantity}</Text>
				</View>
				<View style={styles.unitPrice}>
					<Text>{i18n.lineItems.unitPrice}</Text>
				</View>
				<View style={styles.amount}>
					<Text>{i18n.lineItems.amount}</Text>
				</View>
			</View>
			{lineItems.map((item, index) => (
				<View key={index} style={index % 2 === 0 ? styles.tableRowOdd : styles.tableRow}>
					<View style={styles.itemNo}>
						<Text>{index + 1}</Text>
					</View>
					<View style={styles.title}>
						<Text>{item.title}</Text>
					</View>
					<View style={styles.quantity}>
						<Text>{item.quantity}</Text>
					</View>
					<View style={styles.unitPrice}>
						<Text>{item.unitPrice.toFixed(2)} €</Text>
					</View>
					<View style={styles.amount}>
						<Text>{(item.quantity * item.unitPrice).toFixed(2)} €</Text>
					</View>
				</View>
			))}
			<View style={styles.tableRow}>
				<Text> </Text>
			</View>
			<View style={{ ...styles.tableRow, ...styles.total }}>
				<View style={styles.title}>
					<Text> </Text>
				</View>
				<View style={styles.unitPrice}>
					<Text>{i18n.lineItems.total}:</Text>
				</View>
				<View style={styles.amount}>
					<Text>{total} €</Text>
				</View>
			</View>
		</View>
	)
}

export default Table
