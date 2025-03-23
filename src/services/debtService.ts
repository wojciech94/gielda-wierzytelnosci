import { Debt, DebtResponse } from './../types/debt'

export const fetchDebts = async (): Promise<DebtResponse> => {
	const response = await fetch('https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetTopDebts')
	if (!response.ok) {
		const errorData = await response.json()
		const errorText: string = errorData?.message ? errorData.message : 'Failed to fetch top Debts'
		return { data: [], error: errorText }
	}
	const data: Debt[] = await response.json()
	const sortedDebts = [...data].sort((a, b) => {
		const aValue = a['Name' as keyof Debt]
		const bValue = b['Name' as keyof Debt]

		if (typeof aValue === 'string' && typeof bValue === 'string') {
			return aValue.localeCompare(bValue)
		}

		return 0
	})
	return { data: sortedDebts, error: '' }
}

export const fetchFilteredDebts = async ({ phrase }: { phrase: string }): Promise<DebtResponse> => {
	const url = 'https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetFilteredDebts'

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ phrase }),
		})

		if (!response.ok) {
			throw new Error('Wyszukiwana fraza jest zbyt krótka!')
		}

		const data = await response.json()
		return { data: data ?? [], error: '' }
	} catch {
		return { data: [], error: 'Wyszukiwana fraza jest zbyt krótka!' }
	}
}

export const fetDebtsCount = async (): Promise<number> => {
	const response = await fetch('https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetDebtsCount')
	if (!response.ok) {
		console.error('Błąd pobierania liczby zadłużeń')
		return 0
	}

	const data = await response.json()
	return data || 0
}
