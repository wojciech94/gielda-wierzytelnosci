export interface Debt {
	Id: number
	Name: string
	Value: number
	Date: string
	NIP: string
}

export interface DebtResponse {
	data: Debt[]
	error: string
}
