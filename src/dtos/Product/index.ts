import { CategoryDto } from '../Category'

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

export interface ProductFilterDto {
	categoryId?: number
}
