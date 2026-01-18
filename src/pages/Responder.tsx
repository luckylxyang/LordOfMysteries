import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { generateRosetteResponse } from '../data/rosetteResponses'
import { sendChatMessage } from '../utils/chatApi'
import './Responder.css'

const DAILY_FREE_QUESTIONS = 30
const STORAGE_KEY = 'responder-usage'

interface UsageData {
  date: string
  count: number
}

export default function Responder() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [remainingFree, setRemainingFree] = useState(DAILY_FREE_QUESTIONS)

  // 加载使用次数并检查日期刷新
  useEffect(() => {
    const loadUsage = () => {
      const stored = localStorage.getItem(STORAGE_KEY)
      const today = new Date().toISOString().split('T')[0]

      if (stored) {
        const data: UsageData = JSON.parse(stored)

        if (data.date === today) {
          // 同一天，使用剩余次数
          setRemainingFree(Math.max(0, DAILY_FREE_QUESTIONS - data.count))
        } else {
          // 新的一天，重置计数（每天0点自动刷新）
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: 0 }))
          setRemainingFree(DAILY_FREE_QUESTIONS)
        }
      } else {
        // 首次使用，初始化
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: 0 }))
        setRemainingFree(DAILY_FREE_QUESTIONS)
      }
    }

    loadUsage()

    // 设置定时器，每分钟检查一次是否跨天（处理用户长时间不刷新页面）
    const checkDateChange = setInterval(() => {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data: UsageData = JSON.parse(stored)
        const today = new Date().toISOString().split('T')[0]

        if (data.date !== today) {
          // 跨天了，重置
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: 0 }))
          setRemainingFree(DAILY_FREE_QUESTIONS)
        }
      }
    }, 60000) // 每分钟检查一次

    return () => clearInterval(checkDateChange)
  }, [])

  const saveUsage = (count: number) => {
    const today = new Date().toISOString().split('T')[0]
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count }))
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    if (remainingFree <= 0) {
      alert(`${t.responder.outOfSpirit}\n\n每天 0 点自动刷新，请明天再来！`)
      return
    }

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // 更新使用次数
    const stored = localStorage.getItem(STORAGE_KEY)
    let newCount = 1
    if (stored) {
      const data: UsageData = JSON.parse(stored)
      const today = new Date().toISOString().split('T')[0]
      if (data.date === today) {
        newCount = data.count + 1
      }
    }
    saveUsage(newCount)
    setRemainingFree(Math.max(0, DAILY_FREE_QUESTIONS - newCount))

    try {
      // 调用 GLM-4 API (自动检测本地/生产环境)
      const data = await sendChatMessage(userMessage, language)
      const aiResponse = data.message

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }])

    } catch (error) {
      console.error('Chat error:', error)

      // API 调用失败，使用备用响应
      const fallbackResponse = generateRosetteResponse(userMessage, language)
      setMessages(prev => [...prev, { role: 'ai', content: fallbackResponse }])
    } finally {
      setIsLoading(false)
    }
  }

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
            {t.responder.spiritValue}: {remainingFree}
          </span>
          <span className="usage-text">/ {DAILY_FREE_QUESTIONS}</span>
          <span className="refresh-tip">每天 0 点刷新</span>
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
            disabled={remainingFree <= 0}
          />
          <button
            className="send-button"
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? '...' : '✧'}
          </button>
        </div>
      </div>
    </div>
  )
}
