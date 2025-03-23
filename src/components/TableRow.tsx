import React from 'react'
import { Debt } from '../types/debt'
import { formatDate } from '../utils/helpers'

interface TableRowProps {
	debt: Debt
	key: number
}

export const TableRow: React.FC<TableRowProps> = ({ debt }) => {
	return (
		<tr>
			<td>
				<div className='text-medium'>
					<div className='text-sm text-sm-normal'>{debt.Name.split(' (')[0]}</div>
				</div>
				<div className='d-md-none'>{debt.NIP}</div>
			</td>
			<td className='table-col-2 text-center text-medium d-none d-md-table-cell'>
				<div>{debt.NIP}</div>
			</td>
			<td className='table-col-2 text-center text-medium'>
				<div>{debt.Value}</div>
			</td>
			<td className='table-col-3 text-center'>
				<div>{formatDate(debt.Date)}</div>
			</td>
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
