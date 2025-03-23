import React from 'react'
import { useToast } from '../context/ToastContext'

const ToastContainer: React.FC = () => {
	const { toasts } = useToast()

	return (
		<div className='toast-container'>
			{toasts.map(toast => (
				<div key={toast.id} className={`toast error`}>
					{toast.message}
				</div>
			))}
		</div>
	)
}

export default ToastContainer
