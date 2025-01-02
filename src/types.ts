export interface Recipient {
	salutation: 'dearMr' | 'dearMs' | 'dearSirOrMadam'
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
}

export interface LineItem {
	title: string
	quantity: number
	unitPrice: number
}

export interface Settings {
	fontSize: number
}
