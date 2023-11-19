import { CategoryDto } from '../Category'
import { CollectionDto } from '../Collection'
import { ColorDto } from '../Color'

export interface ProductCreateDto {
	name: string
	description: string
	categoryId: number
	collectionId: number | null
}

export interface ProductUpdateDto {
	id: number
	name: string
	description: string
	categoryId: number
	collectionId: number | null
}

export interface ProductDto {
	id: number
	name: string
	description: string
	category: CategoryDto
	collection: CollectionDto
}

export interface PublicVariantImageDto {
	url: string
	isMain: boolean
}

export interface ProductResumeDto {
	id: number
	colors: ColorDto[]
}

export interface PublicProductDto {
	id: number
	name: string
	description: string
	category: CategoryDto
	collection: CollectionDto
	colors: ColorDto[]
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
	collectionId?: number | null
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
