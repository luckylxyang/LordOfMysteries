import { useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { searchChapters, type ChapterPlot } from '../data/chaptersTemplate'
import chapters from '../data/chapters'
import chaptersEn from '../data/chaptersEn'
import { analyzePlotQuery as aiAnalyzePlotQuery } from '../utils/chatApi'
import './PlotSearch.css'

export default function PlotSearch() {
  const { t, language } = useLanguage()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ChapterPlot[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)

  // 根据语言导入对应的章节数据
  const allChapters: ChapterPlot[] = useMemo(() => {
    return language === 'en' ? chaptersEn : chapters
  }, [language])

  // 执行搜索
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)
    setAiAnalysis(null)

    try {
      // 步骤1: 使用AI分析用户查询
      const langCode = language === 'en' ? 'en' : 'zh'
      const analysis = await aiAnalyzePlotQuery(searchQuery, langCode)

      // 构建AI分析展示对象（包含所有信息）
      const analysisDisplay = {
        confidence: analysis.confidence || 70,
        intent: analysis.intent || 'chapter_search',
        characters: analysis.characters,
        locations: analysis.locations,
        timeline: analysis.timeline,
        events: analysis.events,
        matchedPhrases: analysis.matchedPhrases || [],
        keywords: analysis.keywords
      }

      setAiAnalysis(JSON.stringify(analysisDisplay))

      // 步骤2: 使用AI提取的关键词进行搜索
      const searchTerms = [
        ...analysis.keywords,
        ...analysis.characters,
        ...analysis.searchSuggestions
      ]

      // 搜索并合并结果
      let allResults: ChapterPlot[] = []
      searchTerms.forEach(term => {
        const termResults = searchChapters(allChapters, term)
        allResults = [...allResults, ...termResults]
      })

      // 去重（按章节号）
      const uniqueResults = Array.from(
        new Map(allResults.map(ch => [ch.chapterNumber, ch])).values()
      )

      setResults(uniqueResults)
      setHasSearched(true)
    } catch (error) {
      console.error('Search error:', error)
      // 降级为普通搜索
      const searchResults = searchChapters(allChapters, searchQuery)
      setResults(searchResults)
      setHasSearched(true)
    } finally {
      setIsSearching(false)
    }
  }, [allChapters, language])

  // 处理搜索提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
  }

  // 清除搜索 - 恢复页面初始状态
  const handleClear = () => {
    setQuery('')
    setResults([])
    setHasSearched(false)
    setAiAnalysis(null)
  }

  // 示例问题快速选择
  const exampleQuestions = [
    { zh: "克莱恩第一次遇见阿蒙", en: "When does Klein first meet Amon" },
    { zh: "塔罗会第一次聚会", en: "First Tarot Club gathering" },
    { zh: "克莱恩成为诡秘之主", en: "Klein becomes the Lord of Mysteries" },
    { zh: "真实造物主篇章", en: "True Creator storyline" },
    { zh: "穿越开局", en: "Transmigration beginning" },
    { zh: "阿兹克老师", en: "Teacher Azik" }
  ]

  return (
    <div className="plot-search-container">
      <div className="fog-background"></div>
      <div className="plot-search-content">
        {/* 头部 */}
        <div className="search-header">
          <Link to="/" className="back-link">← {t.common.back}</Link>
          <h1 className="search-title">
            <span className="rune-start">⚜</span>
            {language === 'en' ? 'Plot Search' : '剧情搜索'}
            <span className="rune-end">⚜</span>
          </h1>
          <p className="search-subtitle">
            {language === 'en'
              ? 'Ask anything about the plot, and AI will find the chapters'
              : '用自然语言提问，AI帮你找到对应章节'}
          </p>
        </div>

        {/* 搜索框 */}
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder={
                language === 'en'
                  ? "e.g., 'When does Klein first meet Amon?'"
                  : "例如：克莱恩第一次遇见阿蒙是在哪一章？"
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className="clear-button"
                onClick={handleClear}
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="submit"
            className="search-button"
            disabled={!query.trim() || isSearching}
          >
            {isSearching
              ? (language === 'en' ? 'Searching...' : '搜索中...')
              : (language === 'en' ? 'Search Plot' : '搜索剧情')}
          </button>
        </form>

        {/* 示例问题 */}
        {!hasSearched && !query && (
          <div className="example-questions">
            <p className="example-title">
              {language === 'en' ? 'Try asking:' : '试试问：'}
            </p>
            <div className="example-buttons">
              {exampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  className="example-button"
                  onClick={() => {
                    setQuery(language === 'en' ? q.en : q.zh)
                    performSearch(language === 'en' ? q.en : q.zh)
                  }}
                >
                  {language === 'en' ? q.en : q.zh}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 搜索状态提示 */}
        {hasSearched && results.length === 0 && !isSearching && (
          <div className="no-results">
            <div className="no-results-icon">📜</div>
            <h3>
              {language === 'en' ? 'No chapters found' : '未找到相关章节'}
            </h3>
            <p>
              {language === 'en'
                ? 'Try different keywords or describe the plot in another way'
                : '尝试不同的关键词或换个方式描述剧情'}
            </p>
          </div>
        )}

        {/* 搜索结果 */}
        {hasSearched && results.length > 0 && (
          <div className="search-results">
            {/* AI分析结果 - 增强版 */}
            {aiAnalysis && (() => {
              const analysisData = JSON.parse(aiAnalysis)
              return (
                <div className="ai-analysis-card">
                  <div className="ai-analysis-header">
                    <span className="ai-icon">🤖</span>
                    <h3>AI分析</h3>
                    <div className={`confidence-badge confidence-${analysisData.confidence >= 80 ? 'high' : analysisData.confidence >= 60 ? 'medium' : 'low'}`}>
                      置信度: {analysisData.confidence}%
                    </div>
                  </div>

                  {/* 匹配到的关键短语 */}
                  {analysisData.matchedPhrases && analysisData.matchedPhrases.length > 0 && (
                    <div className="analysis-section">
                      <div className="analysis-label">🎯 识别到:</div>
                      <div className="matched-phrases">
                        {analysisData.matchedPhrases.map((phrase: string, idx: number) => (
                          <span key={idx} className="matched-phrase-badge">"{phrase}"</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 提取的信息 */}
                  <div className="analysis-grid">
                    {analysisData.characters && analysisData.characters.length > 0 && (
                      <div className="analysis-item">
                        <span className="analysis-icon">👤</span>
                        <div className="analysis-content">
                          <div className="analysis-item-label">人物</div>
                          <div className="analysis-item-value">
                            {analysisData.characters.join(', ')}
                          </div>
                        </div>
                      </div>
                    )}

                    {analysisData.locations && analysisData.locations.length > 0 && (
                      <div className="analysis-item">
                        <span className="analysis-icon">📍</span>
                        <div className="analysis-content">
                          <div className="analysis-item-label">地点</div>
                          <div className="analysis-item-value">
                            {analysisData.locations.join(', ')}
                          </div>
                        </div>
                      </div>
                    )}

                    {analysisData.timeline && (
                      <div className="analysis-item">
                        <span className="analysis-icon">⏰</span>
                        <div className="analysis-content">
                          <div className="analysis-item-label">时间</div>
                          <div className="analysis-item-value">{analysisData.timeline}</div>
                        </div>
                      </div>
                    )}

                    {analysisData.events && analysisData.events.length > 0 && (
                      <div className="analysis-item">
                        <span className="analysis-icon">⚡</span>
                        <div className="analysis-content">
                          <div className="analysis-item-label">事件</div>
                          <div className="analysis-item-value">
                            {analysisData.events.slice(0, 2).join('; ')}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 搜索意图 */}
                  <div className="analysis-intent">
                    <span className="intent-label">🔍 搜索类型:</span>
                    <span className="intent-value">
                      {analysisData.intent === 'chapter_search' && '查找章节'}
                      {analysisData.intent === 'character_info' && '角色信息'}
                      {analysisData.intent === 'plot_explanation' && '剧情解释'}
                      {analysisData.intent === 'location_info' && '地点信息'}
                    </span>
                  </div>
                </div>
              )
            })()}

            <div className="results-header">
              <h2>
                {language === 'en' ? 'Found Results' : '搜索结果'}
                <span className="results-count">({results.length})</span>
              </h2>
            </div>

            <div className="results-list">
              {results.map((chapter) => (
                <div key={chapter.chapterNumber} className="result-card">
                  <div className="result-card-header">
                    <span className="chapter-number">
                      第{chapter.chapterNumber}章
                    </span>
                    <span className="chapter-volume">{chapter.volume}</span>
                  </div>

                  <h3 className="chapter-title">{chapter.title}</h3>

                  <p className="chapter-summary">{chapter.summary}</p>

                  {/* 标签 */}
                  <div className="chapter-tags">
                    {chapter.characters.slice(0, 3).map((char) => (
                      <span key={char} className="tag character-tag">
                        👤 {char}
                      </span>
                    ))}
                    {chapter.locations.slice(0, 2).map((loc) => (
                      <span key={loc} className="tag location-tag">
                        📍 {loc}
                      </span>
                    ))}
                    {chapter.keywords.slice(0, 3).map((kw) => (
                      <span key={kw} className="tag keyword-tag">
                        🏷️ {kw}
                      </span>
                    ))}
                  </div>

                  {/* 相关事件 */}
                  {chapter.events.length > 0 && (
                    <div className="chapter-events">
                      <strong>
                        {language === 'en' ? 'Key Events:' : '关键事件:'}
                      </strong>
                      <ul>
                        {chapter.events.map((event, idx) => (
                          <li key={idx}>{event}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 时间线索 */}
                  {chapter.timeline && (
                    <div className="chapter-timeline">
                      ⏰ {chapter.timeline}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
