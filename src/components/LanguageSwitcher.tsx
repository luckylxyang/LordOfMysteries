import { useLanguage } from '../i18n/LanguageContext'
import './LanguageSwitcher.css'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const handleToggle = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh')
  }

  return (
    <button
      className="language-switcher"
      onClick={handleToggle}
      aria-label="Toggle language"
    >
      <span className={`lang-option ${language === 'zh' ? 'active' : ''}`}>
        中文
      </span>
      <span className="lang-divider">/</span>
      <span className={`lang-option ${language === 'en' ? 'active' : ''}`}>
        EN
      </span>
    </button>
  )
}
