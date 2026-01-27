import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import './Footer.css'

export default function Footer() {
  const { language } = useLanguage()
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)

  const openGitHubIssue = () => {
    window.open('https://github.com/luckylxyang/LordOfMysteries/issues', '_blank')
  }

  const openEmail = () => {
    const subject = encodeURIComponent('Feedback - Lord of the Mysteries')
    const body = encodeURIComponent('Hi,\n\nI would like to share feedback about:\n\n')
    window.location.href = `mailto:luckyliuxyang@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          {/* 反馈部分 */}
          <div className="footer-section">
            <h3 className="footer-title">
              {language === 'en' ? 'Feedback' : '反馈'}
            </h3>
            <p className="footer-description">
              {language === 'en'
                ? 'Found a bug or have a suggestion? Let us know!'
                : '发现Bug或有建议？请告诉我们！'}
            </p>
            <div className="footer-actions">
              <button className="footer-button github-button" onClick={openGitHubIssue}>
                <span className="button-icon">🐛</span>
                <span className="button-text">
                  {language === 'en' ? 'Report on GitHub' : 'GitHub反馈'}
                </span>
              </button>
              <button className="footer-button email-button" onClick={openEmail}>
                <span className="button-icon">📧</span>
                <span className="button-text">
                  {language === 'en' ? 'Send Email' : '发送邮件'}
                </span>
              </button>
            </div>
          </div>

          {/* 链接部分 */}
          <div className="footer-section">
            <h3 className="footer-title">
              {language === 'en' ? 'Links' : '链接'}
            </h3>
            <div className="footer-links">
              <a href="https://github.com/luckylxyang/LordOfMysteries" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="/directory">
                {language === 'en' ? 'Pathways' : '途径图鉴'}
              </a>
              <a href="/plot-search">
                {language === 'en' ? 'Plot Search' : '剧情搜索'}
              </a>
              <a href="/responder">
                {language === 'en' ? "Roselle's Diary" : '罗塞尔日记'}
              </a>
            </div>
          </div>

          {/* 版权部分 */}
          <div className="footer-section">
            <h3 className="footer-title">
              {language === 'en' ? 'About' : '关于'}
            </h3>
            <p className="footer-text">
              {language === 'en'
                ? 'A fan-made tool for Lord of the Mysteries novel'
                : '《诡秘之主》小说粉丝工具'}
            </p>
            <p className="footer-copyright">
              © 2025 LotM.Space
            </p>
          </div>
        </div>
      </footer>

      {/* 反馈模态框（可选） */}
      {showFeedbackModal && (
        <div className="feedback-modal-overlay" onClick={() => setShowFeedbackModal(false)}>
          <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
            <div className="feedback-modal-header">
              <h2>
                {language === 'en' ? 'Send Feedback' : '发送反馈'}
              </h2>
              <button
                className="modal-close"
                onClick={() => setShowFeedbackModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="feedback-modal-body">
              <p className="feedback-hint">
                {language === 'en'
                  ? 'Choose your preferred way to send feedback:'
                  : '选择你喜欢的方式反馈：'}
              </p>
              <div className="feedback-options">
                <button className="feedback-option" onClick={openGitHubIssue}>
                  <span className="option-icon">🐛</span>
                  <div className="option-content">
                    <h4>GitHub Issues</h4>
                    <p>
                      {language === 'en'
                        ? 'Report bugs and request features'
                        : '报告Bug和功能请求'}
                    </p>
                  </div>
                </button>
                <button className="feedback-option" onClick={openEmail}>
                  <span className="option-icon">📧</span>
                  <div className="option-content">
                    <h4>Email</h4>
                    <p>
                      {language === 'en'
                        ? 'Send private feedback or questions'
                        : '发送私人反馈或问题'}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
