import { useLanguage } from '../i18n/LanguageContext'
import './Footer.css'

export default function Footer() {
  const { language } = useLanguage()

  const openEmail = () => {
    const subject = encodeURIComponent('Feedback - Lord of the Mysteries')
    const body = encodeURIComponent('Hi,\n\nI would like to share feedback about:\n\n')
    window.location.href = `mailto:luckyliuxyang@gmail.com?subject=${subject}&body=${body}`
  }

  return (
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
  )
}
