import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { canonicalPathways } from '../data/canonicalPathways'
import './Directory.css'

export default function Directory() {
  const { t, language } = useLanguage()
  const isEnglish = language === 'en'

  const currentPathways = useMemo(() => canonicalPathways.map((pathway) => ({
    ...pathway,
    name: isEnglish ? pathway.sequence9En : pathway.sequence9,
    deity: isEnglish ? pathway.sequence0En : pathway.sequence0,
  })), [isEnglish])

  return (
    <div className="directory-container">
      <div className="fog-background"></div>
      <div className="directory-content">
        <div className="directory-header">
          <Link to="/" className="back-link">← {t.common.back}</Link>
          <h1 className="directory-title">
            <span className="rune-start">⚜</span>
            {t.directory.title}
            <span className="rune-end">⚜</span>
          </h1>
          <p className="directory-subtitle">{t.directory.subtitle}</p>
        </div>

        <div className="directory-intro">
          <p className="intro-text">{t.directory.intro}</p>
        </div>

        <div className="pathways-grid">
          {currentPathways.map((pathway) => (
            <article key={pathway.id} className="pathway-card">
              <div className="pathway-card-header">
                <span className="pathway-symbol" aria-hidden="true">{pathway.symbol}</span>
                <div className="pathway-meta">
                  <h3 className="pathway-card-name">{pathway.name}</h3>
                  <span className="sequence-badge">{t.result.sequence} 9</span>
                </div>
              </div>
              <p className="pathway-card-description">
                {isEnglish ? 'Sequence 0' : '序列 0'} · {pathway.deity}
              </p>
              <Link to={`/directory/${pathway.id}`} className="test-pathway-link">
                {isEnglish ? 'Explore pathway →' : '查看途径与序列 →'}
              </Link>
            </article>
          ))}
        </div>

        <div className="seo-content">
          <h2 className="section-heading">{isEnglish ? 'About the Sequence System' : '关于序列体系'}</h2>
          <div className="content-block">
            <h3 className="subsection-title">{t.directory.sections.advancement.title}</h3>
            <p className="content-text">{t.directory.sections.advancement.content}</p>
          </div>
          <div className="content-block">
            <h3 className="subsection-title">{t.directory.sections.knowledge.title}</h3>
            <p className="content-text">{t.directory.sections.knowledge.content}</p>
          </div>
        </div>

        <div className="directory-footer">
          <Link to="/quiz" className="cta-button">
            <span className="cta-text">{t.directory.cta.text}</span>
            <span className="cta-icon">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
