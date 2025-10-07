import moment from 'moment'

import { getRandomNumber } from '../util/getRandomNumber'

export const getRandomDetails = () => {
	const now = moment()
	const customerNo = getRandomNumber(10000, 99999).toString()
	const invoiceNo = customerNo + '-' + getRandomNumber(1000, 9999)

	return {
		customerNo,
		invoiceNo,
		date: now.clone().format('YYYY-MM-DD'),
		servicePeriodStart: now.clone().subtract(7, 'days').format('YYYY-MM-DD'),
		servicePeriodEnd: now.clone().subtract(4, 'days').format('YYYY-MM-DD'),
	}
}
