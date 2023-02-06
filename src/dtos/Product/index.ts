import { CategoryDto } from '../Category'
import { ColorDto } from '../Color'
import { ImageDto } from '../Image'
import { VariantImageDto } from '../Variant'

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

export interface PublicVariantImageDto {
	url: string
	isMain: boolean
}

export interface ProductResumeDto {
	id: number
	color: ColorDto
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
	images: PublicVariantImageDto[]
	variants: ProductResumeDto[]
	size?: string
}

export interface ProductCartDto {
	id: number
	size?: string
	quantity: number
}

export interface PublicProductListDto {
	id: number
	name: string
	price: number
	basePrice: number
	soldOut: boolean
	description: string
	images: PublicVariantImageDto[]
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
	product?: {
		categoryId?: number
		'name[contains]'?: string
	}
	categoryId?: number
	colorId?: number
	highlighted?: boolean
	sale?: boolean
}
