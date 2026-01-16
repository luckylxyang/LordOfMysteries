import { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { pathwaysFull } from '../data/pathwaysFull'
import { pathwaysFullEn } from '../data/pathwaysFullEn'
import { generateCommentaryFull } from '../data/evaluationsFull'
import { generateCommentaryFullEn } from '../data/evaluationsFullEn'
import { generateCardSVG, svgToBlob } from '../utils/clientCardGenerator'
import { Pathway, QuizResult } from '../types'
import './Result.css'

interface LocationState {
  scores: Record<string, number>
  answers: number[]
}

export default function Result() {
  const { pathwayId } = useParams<{ pathwayId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState
  const { language, t } = useLanguage()

  const [pathway, setPathway] = useState<Pathway | null>(null)
  const [cardImageUrl, setCardImageUrl] = useState<string>('')
  const [userName, setUserName] = useState('')

  // 根据语言选择途径数据和评估函数
  const currentPathways = useMemo(() => {
    return language === 'en' ? pathwaysFullEn : pathwaysFull
  }, [language])

  const generateCommentaryCurrent = useMemo(() => {
    return language === 'en' ? generateCommentaryFullEn : generateCommentaryFull
  }, [language])

  useEffect(() => {
    if (!pathwayId || !currentPathways[pathwayId]) {
      navigate('/')
      return
    }

    setPathway(currentPathways[pathwayId])

    // 生成卡片图片
    generateCard(currentPathways[pathwayId])
  }, [pathwayId, navigate, currentPathways])

  const generateCard = async (pathwayData: Pathway) => {
    try {
      // 使用客户端 SVG 生成（备用方案，无需服务端 Canvas）
      const commentary = generateCommentaryCurrent(pathwayData, userName || 'Seeker')
      const svg = generateCardSVG(pathwayData, userName || 'Seeker', commentary)
      const blob = await svgToBlob(svg)
      const url = URL.createObjectURL(blob)
      setCardImageUrl(url)
    } catch (error) {
      console.error('Failed to generate card:', error)
    }
  }

  const handleDownload = () => {
    if (cardImageUrl) {
      const link = document.createElement('a')
      link.href = cardImageUrl
      link.download = `mysteries-${pathway?.id}-card.png`
      link.click()
    }
  }

  const handleShare = async () => {
    if (navigator.share && cardImageUrl) {
      try {
        await navigator.share({
          title: language === 'en' ? 'Above the Gray Fog - Beyonder Assessment' : '灰雾之上 - 非凡者评估',
          text: `${t.result.yourPathway} ${pathway?.name}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Share cancelled or failed:', error)
      }
    }
  }

  const handleRetest = () => {
    navigate('/quiz')
  }

  if (!pathway) {
    return <div className="loading">{t.common.loading}</div>
  }

  const commentary = generateCommentaryCurrent(pathway, userName || 'Seeker')

  return (
    <div className="result-container">
      <div className="fog-background"></div>
      <div className="result-content">
        <div className="result-header">
          <span className="rune">⚜</span>
          <h1 className="result-title">{t.result.title}</h1>
          <span className="rune">⚜</span>
        </div>

        <div className="pathway-info">
          <div className="pathway-symbol">{pathway.symbol}</div>
          <h2 className="pathway-name">
            {t.result.sequence} {pathway.sequence}: {pathway.name}
          </h2>
          <p className="pathway-description">{pathway.description}</p>
        </div>

        <div className="card-display">
          {cardImageUrl ? (
            <img src={cardImageUrl} alt="Identity Card" className="card-image" />
          ) : (
            <div className="card-placeholder">{t.result.generatingCard}</div>
          )}
        </div>

        <div className="commentary-section">
          <h3 className="section-title">
            <span className="title-icon">✦</span>
            {t.result.commentaryTitle}
          </h3>
          <p className="commentary-text">{commentary}</p>
        </div>

        <div className="action-buttons">
          <button onClick={handleDownload} className="action-button primary" disabled={!cardImageUrl}>
            <span className="button-icon">⬇</span>
            {t.common.saveCard}
          </button>
          <button onClick={handleShare} className="action-button secondary">
            <span className="button-icon">↗</span>
            {t.common.shareResult}
          </button>
          <button onClick={handleRetest} className="action-button tertiary">
            <span className="button-icon">↻</span>
            {t.common.retest}
          </button>
        </div>

        <div className="characteristics">
          <h4 className="characteristics-title">{t.result.pathwayCharacteristics}</h4>
          <ul className="characteristics-list">
            {pathway.characteristics.map((char, index) => (
              <li key={index} className="characteristic-item">
                <span className="bullet">✧</span>
                {char}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
