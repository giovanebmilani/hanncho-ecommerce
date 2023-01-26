import { CategoryDto } from '../Category'
import { ColorDto } from '../Color'

export interface ProductCreateDto {
	name: string
	description: string
	categoryId: number
}

export interface ProductUpdateDto {
	id: number
	name: string
	description: string
	categoryId: number
}

export interface ProductDto {
	id: number
	name: string
	description: string
	category: CategoryDto
}

export interface PublicProductDto {
	id: number
	name: string
	description: string
	category: CategoryDto
	color: ColorDto
	price: number
	basePrice: number
	soldOut: boolean
	avaliableSizes: string[]
}

export interface PublicProductListDto {
	id: number
	name: string
	price: number
	basePrice: number
	soldOut: boolean
	mainImage: { url: string }
}

export class FilterStringParam {
	contains?: string
	eq?: string
}

export interface ProductFilterDto {
	name?: FilterStringParam
	categoryId?: number
}

export interface PublicProductFilterDto {
	categoryId?: number
	colorId?: number
	highlighted?: boolean
	sale?: boolean
}