import React, { useState } from 'react'
import { Debt } from '../types/debt'
import { fetchFilteredDebts } from '../services/debtService'
import { SearchButton } from './SearchButton'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../context/ToastContext'

interface HeaderProps {
	handleSetFilteredDebts: (data: Debt[]) => void
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header: React.FC<HeaderProps> = ({ handleSetFilteredDebts, setIsLoading }) => {
	const [query, setQuery] = useState('')
	const { theme, toggleTheme } = useTheme()
	const { addToast } = useToast()

	const filterDebts = async (phrase: string) => {
		setIsLoading(true)
		const response = await fetchFilteredDebts({ phrase })

		setTimeout(() => {
			if (response.error) {
				addToast(response.error)
			}
			handleSetFilteredDebts(response.data)
			setIsLoading(false)
		}, 500)
	}

	return (
		<header className='flex w-100 bg-primary'>
			<div className='flex flex-col flex-1 gap-1'>
				<label htmlFor='filterId' className='text-white text-medium align-self-start'>
					Podaj NIP lub nazwę dłużnika
				</label>
				<div className='button-group'>
					<input
						id='filterId'
						className='button-group__input'
						type='text'
						value={query}
						placeholder='Szukaj dłużnika...'
						onChange={e => setQuery(e.target.value)}
					/>
					<SearchButton className='button-group__button' onClick={() => filterDebts(query)} />
				</div>
			</div>
			<button className='theme-toggle-button' onClick={toggleTheme}>
				{theme === 'light' ? '🌙' : '☀️'}
			</button>
		</header>
	)
}
