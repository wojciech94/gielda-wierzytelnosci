import React from 'react'
import { Debt } from '../types/debt'
import { formatDate } from '../utils/helpers'

interface TableRowProps {
	debt: Debt
	key: number
	isLoading: boolean
}

export const TableRow: React.FC<TableRowProps> = ({ key, debt, isLoading }) => {
	return (
		<tr key={key}>
			<td>{isLoading ? <div className='placeholder'></div> : debt.Id}</td>
			<td>{isLoading ? <div className='placeholder'></div> : debt.Name}</td>
			<td>{isLoading ? <div className='placeholder'></div> : debt.Value}</td>
			<td>{isLoading ? <div className='placeholder'></div> : formatDate(debt.Date)}</td>
		</tr>
	)
}

export const TablePlaceholderRow = ({ count }: { count: number }) => {
	const newCount = count > 4 ? count : 5
	const placeholders = new Array(newCount).fill('')

	return (
		<>
			{placeholders.map((_, index) => (
				<tr key={index}>
					<td>
						<div className='placeholder'></div>
					</td>
					<td>
						<div className='placeholder'></div>
					</td>
					<td>
						<div className='placeholder'></div>
					</td>
					<td>
						<div className='placeholder'></div>
					</td>
				</tr>
			))}
		</>
	)
}
