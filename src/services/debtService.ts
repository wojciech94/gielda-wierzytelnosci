import { Debt } from '../types/debt'

export const fetchDebts = async (): Promise<Debt[]> => {
	const response = await fetch('https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetTopDebts')
	const data = await response.json()
	return data
}

export const fetchFilteredDebts = async (data: { phrase: string }): Promise<Debt[]> => {
	try {
		const url = 'https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetFilteredDebts'
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({ phrase: data.phrase }),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (response.ok) {
			const result = await response.json()
			return result || []
		}

		console.error('Phrase is too short')
		return []
	} catch (error) {
		console.error('Error occurred while fetching debts:', error)
		return []
	}
}

export const fetDebtsCount = async (): Promise<number> => {
	const response = await fetch('https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetDebtsCount')
	if (!response.ok) {
		console.error('Failed to fetch debts count')
		return 0
	}

	const data = await response.json()
	return data || 0
}
