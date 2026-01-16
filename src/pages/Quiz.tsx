import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { questionsFull } from '../data/questionsFull'
import { questionsFullEn } from '../data/questionsFullEn'
import { pathwaysFull } from '../data/pathwaysFull'
import { pathwaysFullEn } from '../data/pathwaysFullEn'
import './Quiz.css'

export default function Quiz() {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  // 根据语言选择问题
  const currentQuestions = useMemo(() => {
    return language === 'en' ? questionsFullEn : questionsFull
  }, [language])

  // 根据语言选择途径数据（用于评分）
  const currentPathways = language === 'en' ? pathwaysFullEn : pathwaysFull

  const progress = ((currentQuestion + 1) / currentQuestions.length) * 100

  const handleAnswer = (optionIndex: number) => {
    if (isAnimating) return

    const newAnswers = [...answers, optionIndex]
    setAnswers(newAnswers)

    if (currentQuestion < currentQuestions.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      // 计算结果 - 初始化所有途径的分数为0
      const scores: Record<string, number> = {}
      Object.keys(currentPathways).forEach(id => {
        scores[id] = 0
      })

      newAnswers.forEach((answerIndex, questionIndex) => {
        const question = currentQuestions[questionIndex]
        const selectedOption = question.options[answerIndex]
        Object.entries(selectedOption.weights).forEach(([pathwayId, weight]) => {
          if (scores[pathwayId] !== undefined) {
            scores[pathwayId] += weight
          }
        })
      })

      // 找出最高分的途径
      const resultPathwayId = Object.entries(scores).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0]

      // 延迟跳转到结果页，让用户看到最后一题的选择
      setTimeout(() => {
        navigate(`/result/${resultPathwayId}`, {
          state: { scores, answers: newAnswers }
        })
      }, 500)
    }
  }

  return (
    <div className="quiz-container">
      <div className="fog-background"></div>
      <div className="quiz-content">
        <div className="quiz-header">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="question-counter">
            {currentQuestion + 1} / {currentQuestions.length}
          </div>
        </div>

        <div className={`question-card ${isAnimating ? 'fade-out' : ''}`}>
          <div className="rune-decoration">
            <span className="rune-top">⚜</span>
          </div>
          <h2 className="question-text">
            {currentQuestions[currentQuestion].text}
          </h2>
          <div className="options-list">
            {currentQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleAnswer(index)}
              >
                <span className="option-indicator">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
