export interface AccountLoginDto {
	storeId: number
	username: string
	password: string
}

export interface AuthDto {
	token: string
}

export interface AccountDto {
	id: number
	username: string
}
