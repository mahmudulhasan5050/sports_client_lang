import { useState, useEffect } from 'react'
import { FaGlobe } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const languages = [
    { code: 'en', label: 'English' },
    { code: 'fi', label: 'Suomi' }
]

const LanguageSelector = () => {
    const [selectedLang, setSelectedLang] = useState<string>()
    const [open, setOpen] = useState(false)
    const { i18n } = useTranslation()

    useEffect(() => {
        const storedLang = localStorage.getItem('language') || 'fi'
        setSelectedLang(storedLang)
        i18n.changeLanguage(storedLang)
    }, [i18n])

    const changeLanguageHandle = (lang: string) => {
        setSelectedLang(lang)
        i18n.changeLanguage(lang)
        localStorage.setItem('language', lang)
        setOpen(false)
        // Add functionality to update language context or refresh translations
    }

    return (
        <div className="relative">
            <button
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition duration-300"
                onClick={() => setOpen(!open)}
            >
                <FaGlobe className="text-lg" />
                <span className="font-semibold">{languages.find((l) => l.code === selectedLang)?.label}</span>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguageHandle(lang.code)}
                            className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                                selectedLang === lang.code ? 'font-bold text-blue-600' : 'text-gray-700'
                            }`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LanguageSelector
