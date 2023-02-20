import { ImageDto } from '../Image'

export interface CollectionCreateDto {
	name: string
	description: string
	highlightColorHex: string
}

export interface CollectionDto {
	id: number
	name: string
	description: string
	highlightColorHex: string
	image?: ImageDto
}
