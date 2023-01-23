export enum Size {
	PP = 'PP',
	P = 'P',
	M = 'M',
	G = 'G',
	GG = 'GG'
}

export interface StockDto {
	id: number
	size: Size
	quantity: number
}
