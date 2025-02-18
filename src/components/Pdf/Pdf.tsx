import React from 'react'

import { Document, Font, Page, Text, View } from '@react-pdf/renderer'
// eslint-disable-next-line import/no-unresolved
import { Style } from '@react-pdf/types/style'

import { useTranslations } from '../../context/TranslationsContext'
// @ts-expect-error font files are not recognized by typescript
import OpenSansBold from '../../fonts/OpenSans/OpenSans-Bold.ttf'
// @ts-expect-error font files are not recognized by typescript
import OpenSansRegular from '../../fonts/OpenSans/OpenSans-Regular.ttf'
// @ts-expect-error font files are not recognized by typescript
import RobotoBold from '../../fonts/Roboto/Roboto-Bold.ttf'
// @ts-expect-error font files are not recognized by typescript
import RobotoRegular from '../../fonts/Roboto/Roboto-Regular.ttf'
// @ts-expect-error font files are not recognized by typescript
import RobotoMonoBold from '../../fonts/RobotoMono/RobotoMono-Bold.ttf'
// @ts-expect-error font files are not recognized by typescript
import RobotoMonoRegular from '../../fonts/RobotoMono/RobotoMono-Regular.ttf'
// @ts-expect-error font files are not recognized by typescript
import RobotoSerifBold from '../../fonts/RobotoSerif/RobotoSerif-Bold.ttf'
// @ts-expect-error font files are not recognized by typescript
import RobotoSerifRegular from '../../fonts/RobotoSerif/RobotoSerif-Regular.ttf'
import type { Details, LineItem, Recipient, Settings } from '../../types'
import Footer from './Footer'
import Header from './Header'
import Table from './Table'
import TextView from './TextView'

interface PdfProps {
	recipient: Recipient
	details: Details
	lineItems: Array<LineItem>
	settings: Settings
}

const Pdf = ({ recipient, details, lineItems, settings }: PdfProps) => {
	const { translations: i18n } = useTranslations()

	Font.register({
		family: 'OpenSans',
		fonts: [
			{
				src: OpenSansRegular,
				fontWeight: 400,
			},
			{
				src: OpenSansBold,
				fontWeight: 700,
			},
		],
	})
	Font.register({
		family: 'Roboto',
		fonts: [
			{
				src: RobotoRegular,
				fontWeight: 400,
			},
			{
				src: RobotoBold,
				fontWeight: 700,
			},
		],
	})
	Font.register({
		family: 'RobotoMono',
		fonts: [
			{
				src: RobotoMonoRegular,
				fontWeight: 400,
			},
			{
				src: RobotoMonoBold,
				fontWeight: 700,
			},
		],
	})
	Font.register({
		family: 'RobotoSerif',
		fonts: [
			{
				src: RobotoSerifRegular,
				fontWeight: 400,
			},
			{
				src: RobotoSerifBold,
				fontWeight: 700,
			},
		],
	})

	const styles: { [key: string]: Style } = {
		Page: {
			fontFamily: settings.fontFamily,
			fontSize: settings.fontSize,
			paddingLeft: settings.padding.left + 'cm',
			paddingRight: settings.padding.right + 'cm',
			paddingTop: settings.padding.top + 'cm',
			paddingBottom: settings.padding.bottom + 2 + 'cm', // add 2cm for footer
		},
		addresses: {
			display: 'flex',
			flexDirection: 'row',
			marginTop: '0.5cm',
			minHeight: '3cm',
		},
		senderAddress: {
			fontSize: '6pt',
			marginBottom: '0.5cm',
			textDecoration: 'underline',
		},
		contactDetails: {
			alignItems: 'flex-end',
			flexGrow: 1,
			fontSize: settings.fontSize * 0.8,
			textAlign: 'right',
		},
		details: {
			marginLeft: '12.5cm',
		},
		subject: {
			fontWeight: 'bold',
			marginTop: '1cm',
		},
	}

	const getSalutation = () => {
		if (!recipient.salutation) {
			return ''
		}
		if (recipient.salutation === 'dearSirOrMadam') {
			return i18n.salutations.dearSirOrMadam
		}
		return i18n.salutations[recipient.salutation] + ' ' + recipient.lastName
	}

	const salutation = getSalutation()

	return (
		<Document>
			<Page size="A4" style={styles.Page}>
				<Header />

				<View style={styles.addresses}>
					<View>
						<Text style={styles.senderAddress}>{settings.senderAddress}</Text>
						<Text>
							{recipient.firstName} {recipient.lastName}
						</Text>
						<Text>{recipient.street}</Text>
						<Text>
							{recipient.zipcode} {recipient.city}
						</Text>
					</View>
					<View style={styles.contactDetails}>
						<Text>{settings.contactDetails}</Text>
					</View>
				</View>

				<View style={styles.details}>
					<Text>
						{i18n.details.date}: {new Date(details.date).toLocaleDateString(settings.language)}
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
						{i18n.details.servicePeriod}: {new Date(details.servicePeriodStart).toLocaleDateString(settings.language)}
						{details.servicePeriodEnd && (
							<> - {new Date(details.servicePeriodEnd).toLocaleDateString(settings.language)}</>
						)}
					</Text>
				)}

				{salutation && (
					<TextView emptyLinesBefore={1}>
						<>{salutation},</>
					</TextView>
				)}

				<TextView emptyLinesBefore={1} emitEmptyLinesAfter={1}>
					<>{settings.introductoryText}</>
				</TextView>

				<Table lineItems={lineItems} />

				<TextView emptyLinesBefore={2}>
					<>{settings.closingText}</>
				</TextView>

				<Footer settings={settings} />
			</Page>
		</Document>
	)
}

export default Pdf
