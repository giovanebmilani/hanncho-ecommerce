export interface PaginatedDto<T> {
	data: T[]
	page: number
	perPage: number
	total: number
}
