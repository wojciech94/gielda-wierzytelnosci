import React from 'react'
import { Debt } from '../types/debt'

interface TableHeaderProps {
	columns: string[]
	onSort: (column: keyof Debt) => void
	sortColumn: string
	sortDirection: 'asc' | 'desc'
}

export const TableHeader: React.FC<TableHeaderProps> = ({ columns, onSort, sortColumn, sortDirection }) => {
	const handleSort = (column: keyof Debt) => {
		onSort(column)
	}

	return (
		<thead>
			<tr>
				{columns.map(column => (
					<th key={column} onClick={() => handleSort(column as keyof Debt)} style={{ cursor: 'pointer' }}>
						{column}
						{/* Dodanie ikony wskazującej kierunek sortowania */}
						{sortColumn === column && <span>{sortDirection === 'asc' ? ' 🔼' : ' 🔽'}</span>}
					</th>
				))}
			</tr>
		</thead>
	)
}
