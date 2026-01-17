import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import './Home.css'

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="home-container">
      <div className="fog-background"></div>
      <div className="home-content">
        <div className="mystical-border">
          <h1 className="title pulse-glow">
            <span className="rune">✧</span>
            {t.home.title}
            <span className="rune">✧</span>
          </h1>
          <p className="subtitle">{t.home.subtitle}</p>
          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-symbol">⚜</span>
            <span className="divider-line"></span>
          </div>
          <p className="description">
            {t.home.description.split('\n').map((line: string, i: number) => (
              <span key={i}>
                {line}
                {i < t.home.description.split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
          <Link to="/quiz" className="ritual-button">
            <span className="button-text">{t.home.startButton}</span>
            <span className="button-symbol">⚝</span>
          </Link>
          <div className="features">
            <div className="feature-item">
              <span className="feature-icon">🔮</span>
              <span>{t.home.features.evaluation}</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎴</span>
              <span>{t.home.features.identityCard}</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📖</span>
              <span>{t.home.features.directory}</span>
            </div>
          </div>
        </div>
        <Link to="/directory" className="directory-link">
          {t.home.directoryLink}
        </Link>

        {/* 罗塞尔日记入口 */}
        <Link to="/responder" className="diary-entry" title={t.home.diaryEntry || 'Roselle\'s Diary'}>
          <div className="diary-book">
            <div className="diary-cover">📔</div>
            <div className="diary-sparkle">✨</div>
          </div>
        </Link>
      </div>
    </div>
  )
}
