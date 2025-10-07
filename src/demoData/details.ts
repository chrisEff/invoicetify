import moment from 'moment'

import { Details, DocumentType } from '../types'
import { getRandomNumber } from '../util/getRandomNumber'

export const getRandomDetails = (documentType = 'invoice' as DocumentType): Details => {
	const now = moment()
	const customerNo = getRandomNumber(10000, 99999).toString()
	const invoiceNo = customerNo + '-' + getRandomNumber(1000, 9999)

	return {
		documentType,
		customerNo,
		invoiceNo,
		date: now.clone().format('YYYY-MM-DD'),
		servicePeriodStart: now.clone().subtract(7, 'days').format('YYYY-MM-DD'),
		servicePeriodEnd: now.clone().subtract(4, 'days').format('YYYY-MM-DD'),
	}
}
