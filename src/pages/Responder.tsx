import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { generateRosetteResponse } from '../data/rosetteResponses'
import './Responder.css'

// 暂时不使用这些常量
// const DAILY_FREE_QUESTIONS = 3
// const STORAGE_KEY = 'responder-usage'

// interface UsageData {
//   date: string
//   count: number
// }

export default function Responder() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // 暂时放开限制
  // const [remainingFree, setRemainingFree] = useState(DAILY_FREE_QUESTIONS)
  // const [showPaymentModal, setShowPaymentModal] = useState(false)

  // 暂时不需要加载使用次数
  // useEffect(() => {
  //   const loadUsage = () => {
  //     const stored = localStorage.getItem(STORAGE_KEY)
  //     if (stored) {
  //       const data: UsageData = JSON.parse(stored)
  //       const today = new Date().toISOString().split('T')[0]

  //       if (data.date === today) {
  //         setRemainingFree(Math.max(0, DAILY_FREE_QUESTIONS - data.count))
  //       } else {
  //         // 新的一天，重置计数
  //         localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: 0 }))
  //         setRemainingFree(DAILY_FREE_QUESTIONS)
  //       }
  //     }
  //   }
  //   loadUsage()
  // }, [])

  // const saveUsage = (count: number) => {
  //   const today = new Date().toISOString().split('T')[0]
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count }))
  // }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    // 暂时放开限制，允许无限使用
    // if (remainingFree <= 0) {
    //   setShowPaymentModal(true)
    //   return
    // }

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // 暂时不更新使用次数
    // const stored = localStorage.getItem(STORAGE_KEY)
    // let newCount = 1
    // if (stored) {
    //   const data: UsageData = JSON.parse(stored)
    //   const today = new Date().toISOString().split('T')[0]
    //   if (data.date === today) {
    //     newCount = data.count + 1
    //   }
    // }
    // saveUsage(newCount)
    // setRemainingFree(Math.max(0, DAILY_FREE_QUESTIONS - newCount))

    try {
      // 调用 GLM-4 API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          language: language
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))

        // 如果 API 调用失败，使用备用响应
        console.warn('API call failed, using fallback:', errorData)
        const fallbackResponse = generateRosetteResponse(userMessage, language)
        setMessages(prev => [...prev, { role: 'ai', content: fallbackResponse }])
        setIsLoading(false)
        return
      }

      const data = await response.json()
      const aiResponse = data.message

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }])

    } catch (error) {
      console.error('Chat error:', error)

      // 网络错误或其他异常，使用备用响应
      const fallbackResponse = generateRosetteResponse(userMessage, language)
      setMessages(prev => [...prev, { role: 'ai', content: fallbackResponse }])
    } finally {
      setIsLoading(false)
    }
  }

  // 暂时不需要支付相关函数
  // const handleWatchAd = () => {
  //   // TODO: 集成激励视频广告
  //   alert('广告播放中...（需要集成 AdMob 或其他广告SDK）')
  //   setShowPaymentModal(false)
  //   setRemainingFree(prev => prev + 3)
  // }

  // const handlePayment = () => {
  //   // TODO: 集成支付系统
  //   alert('跳转支付页面...（需要集成 Stripe 或其他支付系统）')
  //   setShowPaymentModal(false)
  // }

  return (
    <div className="responder-container">
      <div className="fog-background"></div>

      <div className="responder-content">
        {/* 返回按钮 */}
        <button className="back-button" onClick={() => navigate('/')}>
          ← {t.common.back}
        </button>

        {/* 标题区域 */}
        <div className="diary-header">
          <div className="diary-icon">📔</div>
          <h1 className="diary-title">Roselle's Diary</h1>
          <p className="diary-subtitle">{t.responder.subtitle}</p>
        </div>

        {/* 使用次数提示 */}
        <div className="usage-indicator">
          <span className="spirit-text">
            {t.responder.spiritValue}: ∞
          </span>
          <span className="usage-text">(无限使用)</span>
        </div>

        {/* 消息列表 */}
        <div className="messages-container">
          {messages.length === 0 && (
            <div className="welcome-message">
              <p>{t.responder.welcome}</p>
              <div className="example-questions">
                <p className="examples-title">{t.responder.examples}:</p>
                <button
                  className="example-btn"
                  onClick={() => setInput(language === 'zh' ? '罗塞尔大帝的真实身份是什么？' : 'What is Roselle Gustav\'s true identity?')}
                >
                  {language === 'zh' ? '🔍 罗塞尔的真实身份' : '🔍 Roselle\'s Identity'}
                </button>
                <button
                  className="example-btn"
                  onClick={() => setInput(language === 'zh' ? '如何晋升为非凡者？' : 'How to become a Beyonder?')}
                >
                  {language === 'zh' ? '🔮 非凡者晋升' : '🔮 Beyonder Advancement'}
                </button>
                <button
                  className="example-btn"
                  onClick={() => setInput(language === 'zh' ? '什么是源堡？' : 'What is the Castle?')}
                >
                  {language === 'zh' ? '🏰 源堡的秘密' : '🏰 The Castle'}
                </button>
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="message-content">
                {msg.role === 'ai' && <div className="ai-avatar">👤</div>}
                <p>{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message ai">
              <div className="message-content">
                <div className="ai-avatar">👤</div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 输入区域 */}
        <div className="input-container">
          <input
            type="text"
            className="message-input"
            placeholder={t.responder.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            // disabled={remainingFree <= 0}
          />
          <button
            className="send-button"
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? '...' : '✧'}
          </button>
        </div>

        {/* 支付弹窗 */}
        {/* 暂时隐藏支付弹窗
        {showPaymentModal && (
          <div className="payment-modal-overlay" onClick={() => setShowPaymentModal(false)}>
            <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
              <h3>{t.responder.outOfSpirit}</h3>
              <p>{t.responder.getMoreSpirit}:</p>
              <div className="payment-options">
                <button className="payment-option ad-option" onClick={handleWatchAd}>
                  <div className="option-icon">📺</div>
                  <div className="option-text">
                    <div className="option-title">{t.responder.watchAd}</div>
                    <div className="option-desc">+3 {t.responder.spiritValue}</div>
                  </div>
                </button>
                <button className="payment-option pay-option" onClick={handlePayment}>
                  <div className="option-icon">💎</div>
                  <div className="option-text">
                    <div className="option-title">{t.responder.unlockFull}</div>
                    <div className="option-desc">{t.responder.unlimitedAccess}</div>
                  </div>
                </button>
              </div>
              <button className="close-modal" onClick={() => setShowPaymentModal(false)}>
                {t.common.close}
              </button>
            </div>
          </div>
        )}
        */}
      </div>
    </div>
  )
}
