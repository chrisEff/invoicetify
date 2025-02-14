export type Salutation = 'dearMr' | 'dearMs' | 'dearSirOrMadam'

export interface Recipient {
	salutation: Salutation
	firstName: string
	lastName: string
	street: string
	zipcode: string
	city: string
}

export interface Details {
	customerNo: string
	invoiceNo: string
	date: string
	servicePeriodStart: string
	servicePeriodEnd: string
}

export interface LineItem {
	title: string
	quantity: number
	unitPrice: number
}

export interface Settings {
	language: string
	fontSize: number
	padding: {
		left: number
		right: number
		top: number
		bottom: number
	}
	senderAddress: string
	introductoryText: string
	closingText: string
	footer: Array<string>
}
