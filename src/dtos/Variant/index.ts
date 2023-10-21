import { ColorDto } from '../Color'
import { ImageDto } from '../Image'
import { StockDto } from '../Stock'

export interface VariantCreateDto {
	price: number
	basePrice: number
	colors: ColorDto[]
	highlighted: boolean
}

export interface VariantUpdateDto {
	price?: number
	basePrice?: number
	colors?: ColorDto[]
	highlighted?: boolean
	stocks?: StockDto[]
	active?: boolean
}

export interface VariantImageDto {
	id: number
	image: ImageDto
	isMain: boolean
}

export interface VariantDto {
	id: number
	price: number
	basePrice: number
	colors: ColorDto[]
	highlighted: boolean
	active: boolean
	images: VariantImageDto[]
	stocks: StockDto[]
}
