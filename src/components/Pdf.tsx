import React from 'react'

import { Document, Page, Text, View } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types/style'

import { useTranslations } from '../context/TranslationsContext'
import type { Details, LineItem, Recipient, Settings } from '../types'

interface PdfProps {
	recipient: Recipient
	details: Details
	lineItems: Array<LineItem>
	settings: Settings
}

const Pdf = ({ recipient, details, lineItems, settings }: PdfProps) => {
	const { translations: i18n } = useTranslations()

	const styles: { [key: string]: Style } = {
		Page: {
			fontFamily: 'Helvetica',
			fontSize: settings.fontSize,
			paddingLeft: settings.padding.left + 'cm',
			paddingRight: settings.padding.right + 'cm',
			paddingTop: settings.padding.top + 'cm',
			paddingBottom: settings.padding.bottom + 'cm',
		},
		addresses: {
			marginTop: '3.5cm',
			minHeight: '3cm',
		},
		senderAddress: {
			fontSize: '6pt',
			marginBottom: '0.5cm',
			textDecoration: 'underline',
		},
		details: {
			marginLeft: '12.5cm',
		},
		subject: {
			fontFamily: 'Helvetica-Bold',
			marginTop: '1cm',
		},
		table: {
			marginTop: '1cm',
		},
		tableHeader: {
			fontFamily: 'Helvetica-Bold',
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
		total: {
			fontFamily: 'Helvetica-Bold',
		},
		footer: {
			borderTop: '1px solid black',
			display: 'flex',
			flexDirection: 'row',
			fontSize: '9pt',
			position: 'absolute',
			bottom: '1.5cm',
			width: '17cm',
		},
		footerSection: {
			minWidth: '3cm',
			paddingRight: '2mm',
		},
	}

	const total = lineItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0)

	return (
		<Document>
			<Page size="A4" style={styles.Page}>
				<View style={styles.addresses}>
					<Text style={styles.senderAddress}>{settings.senderAddress}</Text>
					<Text>
						{recipient.firstName} {recipient.lastName}
					</Text>
					<Text>{recipient.street}</Text>
					<Text>
						{recipient.zipcode} {recipient.city}
					</Text>
				</View>

				<View style={styles.details}>
					<Text>
						{i18n.details.date}: {details.date}
					</Text>
					<Text>
						{i18n.details.customerNo}: {details.customerNo}
					</Text>
				</View>

				<Text style={styles.subject}>
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

				<View style={styles.footer}>
					{settings.footer.map((item, index) => (
						<View key={index} style={styles.footerSection}>
							<Text>{item}</Text>
						</View>
					))}
				</View>
			</Page>
		</Document>
	)
}

export default Pdf
