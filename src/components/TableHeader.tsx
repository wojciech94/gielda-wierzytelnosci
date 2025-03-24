import React from 'react'
import { Debt } from '../types/debt'

interface ColumnObject {
	key: string
	name: string
	className: string
}

interface TableHeaderProps {
	columns: ColumnObject[]
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
			<tr className='text-gray text-medium'>
				{columns.map(column => (
					<th className={column.className} key={column.key} onClick={() => handleSort(column.key as keyof Debt)}>
						<div>
							{sortColumn === column.key && <span>{sortDirection === 'asc' ? '▲ ' : '▼ '}</span>}
							{column.name}
							{column.name === 'Dłużnik' && <span className='d-md-none'>{', NIP'}</span>}
						</div>
					</th>
				))}
			</tr>
		</thead>
	)
}
