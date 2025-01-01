import { Document, Page, Text, View } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import React from 'react'

import i18n from '../locales'

const styles = {
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

const Pdf = ({ recipient, details, lineItems, settings }) => {
	const total = lineItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0)

	return (
		<Document>
			<Page size="A4" style={{ ...styles.Page, fontSize: settings.fontSize }}>
				<View style={{ marginTop: '3.5cm', minHeight: '3cm' }}>
					<Text style={{ fontSize: '6pt', marginBottom: '0.5cm', textDecoration: 'underline' }}>
						{/* TODO implement sender address */}
						My Awesome Company • My Street 123 • 12345 My City
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
					<Text>
						{/* TODO implement service period */}
						{i18n.details.servicePeriod}: 26.09.2024 - 01.11.2024
					</Text>
					<Text> </Text>
					<Text>
						{recipient.salutation === 'dearSirOrMadam'
							? i18n.salutations.dearSirOrMadam
							: i18n.salutations[recipient.salutation] + ' ' + recipient.lastName}
						,
					</Text>
					<Text> </Text>
					{/* TODO add introductory text */}
					<Text>
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
						dolore magna aliquyam erat, sed diam voluptua
					</Text>
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
					{/* TODO add closing text */}
					<Text>
						Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
						commodo consequat.
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
						fontSize: '9pt',
						position: 'absolute',
						bottom: '1.5cm',
						width: '17cm',
					}}
				>
					{/* TODO add bank details etc. */}
					<Text>Awesome Bank</Text>
					<Text>IBAN: DE12 3456 7890 1234 5678 90</Text>
					<Text>BIC: AWESOMEBANK</Text>
				</View>
			</Page>
		</Document>
	)
}

Pdf.propTypes = {
	recipient: PropTypes.shape({
		salutation: PropTypes.string.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		street: PropTypes.string.isRequired,
		zipcode: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
	}).isRequired,
	details: PropTypes.shape({
		customerNo: PropTypes.string.isRequired,
		invoiceNo: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
	}).isRequired,
	lineItems: PropTypes.array.isRequired,
	setDetails: PropTypes.func.isRequired,
	settings: PropTypes.shape({
		fontSize: PropTypes.string.isRequired,
	}),
}

export default Pdf
