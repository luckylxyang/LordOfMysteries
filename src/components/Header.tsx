import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import GoogleAuth from './GoogleAuth'
import './Header.css'

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-symbol">⚜</span>
          <span className="logo-text">LotM</span>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/directory" className="nav-link">{t.common.explorePathways}</Link>
          <Link to="/plot-search" className="nav-link">
            {t.common.plotSearch || 'Plot Search'}
          </Link>
        </nav>
        <div className="header-actions">
          <GoogleAuth />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
