import React, { useState, useEffect } from 'react'
import './styles/main.less'
import { Filters } from './components/Filters'
import { fetchDebts } from './services/debtService'
import { Debt } from './types/debt'
import { DebtTable } from './components/DebtTable'

const App: React.FC = () => {
	const [sortColumn, setSortColumn] = useState<keyof Debt>('Name')
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
	const [filteredDebts, setFilteredDebts] = useState<Debt[]>([])
  const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			const fetchedDebts = await fetchDebts()
			setFilteredDebts(fetchedDebts)
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

	return (
		<div className='app'>
			<header className='bg-primary'>
				<Filters setFilteredDebts={setFilteredDebts} setIsLoading={setIsLoading} />
			</header>
			<DebtTable debts={filteredDebts} onSort={handleSort} sortColumn={sortColumn} sortDirection={sortDirection} isLoading={isLoading}/>
		</div>
	)
}

export default App
