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
	const columns = [
		{ key: 'Name', name: 'Dłużnik', className: '' },
		{ key: 'NIP', name: 'Nip', className: 'text-center table-col-2 d-none d-md-table-cell' },
		{ key: 'Value', name: 'Kwota zadłużenia', className: 'text-center text-md-nowrap table-col-2' },
		{ key: 'Date', name: 'Data powstania zobowiązania', className: 'text-center table-col-3' },
	]

	return (
		<table>
			<TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} sortDirection={sortDirection} />
			<tbody>
				{isLoading || debts.length === 0 ? (
					<TablePlaceholderRow count={debts.length} />
				) : (
					debts.map(debt => <TableRow key={debt.Id} debt={debt} />)
				)}
			</tbody>
		</table>
	)
}
