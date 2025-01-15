import { Document, Page, Text, View } from '@react-pdf/renderer'
import React from 'react'
import { Style } from '@react-pdf/types/style'

import type { Recipient, Details, LineItem, Settings } from '../types'
import { useTranslations } from '../context/TranslationsContext'

const styles: { [key: string]: Style } = {
	Page: {
		fontFamily: 'Helvetica',
		padding: '2cm',
	},
	table: {
		marginTop: '1cm',
	},
	tableRow: {
		display: 'flex',
		flexDirection: 'row',
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
}

interface PdfProps {
	recipient: Recipient
	details: Details
	lineItems: Array<LineItem>
	settings: Settings
}

const Pdf = ({ recipient, details, lineItems, settings }: PdfProps) => {
	const { translations: i18n } = useTranslations()

	const total = lineItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0)

	return (
		<Document>
			<Page size="A4" style={{ ...styles.Page, fontSize: settings.fontSize }}>
				<View style={{ marginTop: '3.5cm', minHeight: '3cm' }}>
					<Text style={{ fontSize: '6pt', marginBottom: '0.5cm', textDecoration: 'underline' }}>
						{settings.senderAddress}
					</Text>
					<Text>
						{recipient.firstName} {recipient.lastName}
					</Text>
					<Text>{recipient.street}</Text>
					<Text>
						{recipient.zipcode} {recipient.city}
					</Text>
				</View>

				<View style={{ marginLeft: '12.5cm' }}>
					<Text>
						{i18n.details.date}: {details.date}
					</Text>
					<Text>
						{i18n.details.customerNo}: {details.customerNo}
					</Text>
				</View>

				<View style={{ marginTop: '1cm' }}>
					<Text style={{ fontFamily: 'Helvetica-Bold' }}>
						{i18n.invoice} {details.invoiceNo}
					</Text>
					{details.servicePeriodStart && (
						<Text>
							{i18n.details.servicePeriod}: {details.servicePeriodStart}
							{details.servicePeriodEnd && <> - {details.servicePeriodEnd}</>}
						</Text>
					)}
					{recipient.salutation && (
						<>
							<Text> </Text>
							<Text>
								{recipient.salutation === 'dearSirOrMadam'
									? i18n.salutations.dearSirOrMadam
									: i18n.salutations[recipient.salutation] + ' ' + recipient.lastName}
								,
							</Text>
						</>
					)}
					<Text> </Text>
					<Text>{settings.introductoryText}</Text>
				</View>

				<View style={styles.table}>
					<View style={{ ...styles.tableRow, fontFamily: 'Helvetica-Bold' }}>
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
						<View key={index} style={styles.tableRow}>
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
								<Text>{item.unitPrice}</Text>
							</View>
							<View style={styles.amount}>
								<Text>{(item.quantity * item.unitPrice).toFixed(2)} €</Text>
							</View>
						</View>
					))}
					<View style={styles.tableRow}>
						<Text> </Text>
					</View>
					<View style={{ ...styles.tableRow, fontFamily: 'Helvetica-Bold' }}>
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

				<View>
					<Text> </Text>
					<Text> </Text>
					<Text>
						<Text>{settings.closingText}</Text>
					</Text>
					<Text> </Text>
					<Text> </Text>
					<Text>{i18n.kindRegards}</Text>
					<Text> </Text>
					<Text> </Text>
					{/* TODO add signature */}
					<Text>Jonathan Doe</Text>
				</View>

				<View
					style={{
						borderTop: '1px solid black',
						display: 'flex',
						flexDirection: 'row',
						fontSize: '9pt',
						position: 'absolute',
						bottom: '1.5cm',
						width: '17cm',
					}}
				>
					{settings.footer.map((item, index) => (
						<View key={index} style={{ minWidth: '3cm', paddingRight: '2mm' }}>
							<Text>{item}</Text>
						</View>
					))}
				</View>
			</Page>
		</Document>
	)
}

export default Pdf
