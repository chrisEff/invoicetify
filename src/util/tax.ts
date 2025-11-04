export const getNetAmount = (grossAmount: number, taxPercentage: number): number =>
	(grossAmount / (100 + taxPercentage)) * 100

export const getTaxAmount = (grossAmount: number, taxPercentage: number): number =>
	(grossAmount / (100 + taxPercentage)) * taxPercentage
