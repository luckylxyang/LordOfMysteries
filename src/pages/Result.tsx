import { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { pathwaysFull } from '../data/pathwaysFull'
import { pathwaysFullEn } from '../data/pathwaysFullEn'
import { generateCommentaryFull } from '../data/evaluationsFull'
import { generateCommentaryFullEn } from '../data/evaluationsFullEn'
import { generateCardSVG, svgToBlob } from '../utils/clientCardGenerator'
import { Pathway } from '../types'
import './Result.css'

export default function Result() {
  const { pathwayId } = useParams<{ pathwayId: string }>()
  const navigate = useNavigate()
  const { language, t } = useLanguage()

  const [pathway, setPathway] = useState<Pathway | null>(null)
  const [cardImageUrl, setCardImageUrl] = useState<string>('')
  const [userName] = useState('')

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
    const shareUrl = `https://lotm.space${window.location.pathname}`
    const shareText = language === 'en'
      ? `I got "${pathway?.name}" in the Beyonder Assessment!\n\n${t.result.yourPathway} ${pathway?.name}\n\nTake the test: ${shareUrl}`
      : `我在非凡者评估中获得了「${pathway?.name}」！\n\n${t.result.yourPathway} ${pathway?.name}\n\n来测测你的途径：${shareUrl}`

    // 尝试使用原生分享 API
    if (navigator.share) {
      try {
        await navigator.share({
          title: language === 'en' ? 'Above the Gray Fog - Beyonder Assessment' : '灰雾之上 - 非凡者评估',
          text: shareText,
          url: shareUrl,
        })
        return
      } catch (error) {
        console.log('Share cancelled or failed:', error)
      }
    }

    // 备用方案：复制到剪贴板
    try {
      await navigator.clipboard.writeText(shareText)
      alert(language === 'en' ? 'Link copied to clipboard!' : '链接已复制到剪贴板！')
    } catch (error) {
      console.error('Failed to copy:', error)
      // 最后的备用方案：手动提示
      prompt(
        language === 'en' ? 'Copy this link to share:' : '复制此链接分享：',
        shareUrl
      )
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
