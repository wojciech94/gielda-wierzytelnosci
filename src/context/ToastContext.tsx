import { createContext, useContext, useState, ReactNode } from 'react'

interface Toast {
	id: number
	message: string
}

interface ToastContextType {
	toasts: Toast[]
	addToast: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = (): ToastContextType => {
	const context = useContext(ToastContext)
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider')
	}
	return context
}

interface ToastProviderProps {
	children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
	const [toasts, setToasts] = useState<Toast[]>([])

	const addToast = (message: string) => {
		const id = new Date().getTime()
		setToasts(prevToasts => [...prevToasts, { id, message }])

		setTimeout(() => {
			setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
		}, 5000)
	}

	return <ToastContext.Provider value={{ toasts, addToast }}>{children}</ToastContext.Provider>
}
