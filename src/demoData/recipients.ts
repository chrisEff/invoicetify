import { Salutation } from '../types'

export const recipients = [
	{
		salutation: 'dearMr' as Salutation,
		firstName: 'Clark',
		lastName: 'Kent',
		street: '321 Maple Street',
		zipcode: '67524',
		city: 'Smallville',
	},
	{
		salutation: 'dearMs' as Salutation,
		firstName: 'Lois',
		lastName: 'Lane',
		street: '76 Main Street',
		zipcode: '33866',
		city: 'Metropolis',
	},
	{
		salutation: 'dearSirOrMadam' as Salutation,
		firstName: '',
		lastName: 'LuthorCorp Ltd.',
		street: '478 2nd Street',
		zipcode: '33866',
		city: 'Metropolis',
	},
]

export const getRandomRecipient = () => {
	return recipients[Math.floor(Math.random() * recipients.length)]
}
