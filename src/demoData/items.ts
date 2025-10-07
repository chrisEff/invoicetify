import { getRandomNumber } from '../util/getRandomNumber'

const items = [
	{
		title: 'T-Shirt, size: M, color: blue',
		quantity: 1,
		unitPrice: 19.9,
		vat: 19,
	},
	{
		title: 'Sweater, size: M, color: orange',
		quantity: 1,
		unitPrice: 49.9,
		vat: 19,
	},
	{
		title: 'Jeans, size: 32, color: black',
		quantity: 1,
		unitPrice: 99.9,
		vat: 19,
	},
	{
		title: 'Socks, size: 43-46, color: white',
		quantity: 1,
		unitPrice: 5.99,
		vat: 19,
	},
]

export const getRandomItems = () => {
	const count = getRandomNumber(1, items.length)

	return [...items].sort(() => Math.random() - 0.5).slice(0, count)
}
