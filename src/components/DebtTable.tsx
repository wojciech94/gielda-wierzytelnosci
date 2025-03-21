import { TableHeader } from './TableHeader'
import { Debt } from '../types/debt'
import { TablePlaceholderRow, TableRow } from './TableRow'

type Props = {
	debts: Debt[]
	onSort: (column: keyof Debt) => void
	sortColumn: keyof Debt
	sortDirection: 'asc' | 'desc'
	isLoading: boolean
}

export const DebtTable = ({ debts, onSort, sortColumn, sortDirection, isLoading }: Props) => {
	const columns = ['Id', 'Name', 'Value', 'Date']
	const elements = debts.length

	return (
		<table>
			<TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} sortDirection={sortDirection} />
			<tbody>
				{isLoading || elements === 0 ? (
					<TablePlaceholderRow count={debts.length} />
				) : (
					debts.map(debt => <TableRow key={debt.Id} debt={debt} isLoading={isLoading} />)
				)}
			</tbody>
		</table>
	)
}
