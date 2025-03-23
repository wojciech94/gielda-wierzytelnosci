import { createContext, useState, useContext, useEffect, ReactNode } from 'react'

interface ThemeContextType {
	theme: 'light' | 'dark'
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
	}

	useEffect(() => {
		document.body.classList.remove('light', 'dark')
		document.body.classList.add(theme)
	}, [theme])

	const value: ThemeContextType = { theme, toggleTheme }

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}

export default ThemeContext
