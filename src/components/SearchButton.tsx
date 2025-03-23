import React from 'react'

interface Props {
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	className?: string
}

export const SearchButton: React.FC<Props> = ({ onClick, className }) => {
	return (
		<button onClick={onClick} className={`${className}`}>
			SZUKAJ
		</button>
	)
}
