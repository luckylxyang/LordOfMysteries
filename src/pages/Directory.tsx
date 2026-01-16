import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { allPathwaysFull } from '../data/pathwaysFull'
import { allPathwaysFullEn } from '../data/pathwaysFullEn'
import './Directory.css'

export default function Directory() {
  const { t, language } = useLanguage()

  // 根据语言选择途径数据 - 现在显示全部22条途径
  const currentPathways = useMemo(() => {
    return language === 'en' ? allPathwaysFullEn : allPathwaysFull
  }, [language])

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
          <p className="intro-text">
            {t.directory.intro}
          </p>
        </div>

        <div className="pathways-grid">
          {currentPathways.map((pathway) => (
            <div key={pathway.id} className="pathway-card">
              <div className="pathway-card-header">
                <span className="pathway-symbol">{pathway.symbol}</span>
                <div className="pathway-meta">
                  <h3 className="pathway-card-name">{pathway.name}</h3>
                  <span className="sequence-badge">
                    {t.result.sequence} {pathway.sequence}
                  </span>
                </div>
              </div>
              <p className="pathway-card-description">{pathway.description}</p>
              <ul className="pathway-features">
                {pathway.characteristics.slice(0, 3).map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-bullet">✦</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/quiz" className="test-pathway-link">
                {t.directory.testPathway}
              </Link>
            </div>
          ))}
        </div>

        <div className="seo-content">
          <h2 className="section-heading">关于途径体系</h2>
          <div className="content-block">
            <h3 className="subsection-title">{t.directory.sections.advancement.title}</h3>
            <p className="content-text">
              {t.directory.sections.advancement.content}
            </p>
          </div>

          <div className="content-block">
            <h3 className="subsection-title">{t.directory.sections.choice.title}</h3>
            <p className="content-text">
              {t.directory.sections.choice.content}
            </p>
          </div>

          <div className="content-block">
            <h3 className="subsection-title">{t.directory.sections.mvp.title}</h3>
            <p className="content-text">
              {t.directory.sections.mvp.content}
            </p>
          </div>

          <div className="content-block">
            <h3 className="subsection-title">{t.directory.sections.knowledge.title}</h3>
            <p className="content-text">
              {t.directory.sections.knowledge.content}
            </p>
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
