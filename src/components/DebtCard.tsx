import React from 'react'
import { Debt } from '../types/debt'

interface DebtCardProps {
	debt: Debt
}

export const DebtCard: React.FC<DebtCardProps> = ({ debt }) => {
	return (
		<div className='debt-card'>
			<div className='debt-card__name'>{debt.Name}</div>
			<div className='debt-card__amount'>{debt.Value}</div>
			<div className='debt-card__due-date'>{debt.Date}</div>
		</div>
	)
}
