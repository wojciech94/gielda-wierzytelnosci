export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout> | null = null

	return (...args: Parameters<T>) => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}

		timeoutId = setTimeout(() => {
			func(...args)
		}, delay)
	}
}

export function formatDate(date: string) {
	const [rr, mm, dd] = date.split('T')[0].split('-')
	return `${dd}-${mm}-${rr}`
}
