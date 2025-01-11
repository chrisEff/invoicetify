import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

import translationsDE from '../locales/de.json'
import translationsEN from '../locales/en.json'

interface TranslationsContextInterface {
	language: string
	setLanguage: (language: string) => void
	translations: typeof translationsDE | typeof translationsEN
}

const TranslationsContext = createContext<TranslationsContextInterface>(undefined)

export const useTranslations = () => {
	const context = useContext(TranslationsContext)
	if (context === undefined) {
		throw new Error('useTranslations must be used within TranslationsProvider')
	}

	return context
}

export const TranslationsProvider = ({ children }: PropsWithChildren) => {
	const [language, setLanguage] = useState('en')
	const [translations, setTranslations] = useState(translationsEN)

	useEffect(() => {
		async function loadLanguage() {
			const lang = await window.electronAPI.storeGet('settings.language')
			setLanguage(lang)
		}
		loadLanguage()
	})

	useEffect(() => {
		setTranslations(language === 'de' ? translationsDE : translationsEN)
	}, [language])

	return (
		<TranslationsContext.Provider value={{ language, setLanguage, translations }}>
			{children}
		</TranslationsContext.Provider>
	)
}
