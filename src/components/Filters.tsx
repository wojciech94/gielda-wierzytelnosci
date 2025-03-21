import React, { useState } from 'react'
import { Debt } from '../types/debt'
import { fetchFilteredDebts } from '../services/debtService'
import { SearchButton } from './SearchButton'

interface FiltersProps {
	setFilteredDebts: React.Dispatch<React.SetStateAction<Debt[]>>
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const Filters: React.FC<FiltersProps> = ({ setFilteredDebts, setIsLoading }) => {
	const [query, setQuery] = useState('')

	const filterDebts = async (phrase: string) => {
		setIsLoading(true)
		const data = await fetchFilteredDebts({ phrase })
		setIsLoading(false)
		setFilteredDebts(data || [])
	}

	return (
		<div className='button-group'>
			<input
				className='button-group__input'
				type='text'
				value={query}
				placeholder='Szukaj dłużnika...'
				onChange={e => setQuery(e.target.value)}
			/>
			<SearchButton className='button-group__button' onClick={() => filterDebts(query)} />
		</div>
	)
}
