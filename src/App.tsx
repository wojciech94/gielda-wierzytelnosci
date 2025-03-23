import React, { useState, useEffect } from 'react'
import './styles/main.less'
import { Header } from './components/Header'
import { fetchDebts } from './services/debtService'
import { Debt } from './types/debt'
import { DebtTable } from './components/DebtTable'
import { ThemeProvider } from './context/ThemeContext'
import { useToast } from './context/ToastContext'
import ToastContainer from './components/ToastContainer'

const App: React.FC = () => {
	const [sortColumn, setSortColumn] = useState<keyof Debt>('Name')
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
	const [filteredDebts, setFilteredDebts] = useState<Debt[]>([])
	const [topDebts, setTopDebts] = useState<Debt[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const { addToast } = useToast()

	useEffect(() => {
		const fetchData = async () => {
			const fetchedDebts = await fetchDebts()
			setFilteredDebts(fetchedDebts.data)
			setTopDebts(fetchedDebts.data)
			if (fetchedDebts.error) {
				addToast(fetchedDebts.error)
			}
		}

		fetchData()
	}, [])

	const handleSort = (column: keyof Debt) => {
		const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc'
		setSortColumn(column)
		setSortDirection(newDirection)

		const sortedDebts = [...filteredDebts].sort((a, b) => {
			const aValue = a[column as keyof Debt]
			const bValue = b[column as keyof Debt]

			if (typeof aValue === 'number' && typeof bValue === 'number') {
				return newDirection === 'asc' ? aValue - bValue : bValue - aValue
			}

			if (typeof aValue === 'string' && typeof bValue === 'string') {
				return newDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
			}

			return 0
		})

		setFilteredDebts(sortedDebts)
	}

	const handleSetFilteredDebts = (data: Debt[]) => {
		if (data.length > 0) {
			setFilteredDebts(data)
		} else {
			setFilteredDebts(topDebts)
		}
	}

	return (
		<ThemeProvider>
			<Header handleSetFilteredDebts={handleSetFilteredDebts} setIsLoading={setIsLoading} />
			<DebtTable
				debts={filteredDebts}
				onSort={handleSort}
				sortColumn={sortColumn}
				sortDirection={sortDirection}
				isLoading={isLoading}
			/>
			<ToastContainer />
		</ThemeProvider>
	)
}

export default App
