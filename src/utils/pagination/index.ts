import { PaginatedDto } from '../../dtos/Pagination'

export function extractNextPageNumber<T>(page: PaginatedDto<T>) {
	if (page.page * page.perPage < page.total) return page.page + 1
}

export function extractPrevPageNumber<T>(page: PaginatedDto<T>) {
	if (page.page > 1) return page.page - 1
}
