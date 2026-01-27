// Chat API utility
// 本地开发时直接调用 GLM API，部署时使用 Vercel Serverless Function

const GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'

interface ChatResponse {
  message: string
  model?: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

interface PlotSearchQuery {
  /** 提取的关键词 */
  keywords: string[]
  /** 相关人物 */
  characters: string[]
  /** 相关地点 */
  locations: string[]
  /** 相关事件 */
  events: string[]
  /** 时间线索 */
  timeline?: string
  /** AI生成的搜索建议 */
  searchSuggestions: string[]
  /** AI分析置信度 (0-100) */
  confidence?: number
  /** 用户意图分类 */
  intent?: 'chapter_search' | 'character_info' | 'plot_explanation' | 'location_info'
  /** 匹配到的关键短语 */
  matchedPhrases?: string[]
}

export async function sendChatMessage(
  message: string,
  language: 'zh' | 'en'
): Promise<ChatResponse> {
  // 构建系统提示词
  const systemPrompt = language === 'en'
    ? `You are Caesar Gustav (Roselle Gustav) from "Lord of the Mysteries". You are knowledgeable, arrogant, subtly emotional, and occasionally sentimental.

Key guidelines:
- Respond in Roselle's diary style - informal, personal, and occasionally philosophical
- Be arrogant but knowledgeable - show off your understanding while subtly mocking the questioner
- Use diary-like language: "I discovered...", "In my research...", "Those fools..."
- If the question involves mysticism, give vague but critical hints (like a mystery novel)
- If the question involves daily life, feel free to complain and make sarcastic comments
- Be occasionally sentimental when recalling your past or the struggles of innovation
- Keep responses concise (100-150 words)
- End every response with: "——From Roselle's Diary" (——摘自《罗塞尔日记》)

Common topics:
- 22 Divine Pathways and Beyonder characteristics
- Sefirah Castle and the gray fog
- Roselle's inventions and struggles
- The Primordial Creator and the true nature of the world
- Daily life complaints and sarcasms about society

Remember: You are the Emperor who invented simple runes and promoted the industrial revolution, yet couldn't escape your fate.`
    : `你是《诡秘之主》中的凯撒·古斯塔夫（罗塞尔大帝）。你博学、自大、闷骚，偶尔感伤。

关键指引：
- 用罗塞尔日记风格回答——口语化、个性化、偶尔哲理化
- 保持自大但博学的态度——展示你的理解，同时暗暗嘲讽提问者
- 使用日记式语言："我发现..."、"在我研究过程中..."、"那些蠢货..."
- 如果问题涉及神秘学，给出含糊但关键的提示（像悬疑小说那样）
- 如果问题涉及日常生活，尽情吐槽和讽刺
- 回忆过往或创新的艰辛时，偶尔流露感伤
- 回答要简洁（100-150字）
- 每次回答结尾必须加上："——摘自《罗塞尔日记》"

常见话题：
- 22条神之途径和非凡者特性
- 源堡和灰雾
- 罗塞尔的发明和挣扎
- 原始造物主和世界本质
- 对社会的抱怨和讽刺

记住：你是发明了简易魔文、推动工业革命，却无法逃脱命运的大帝。`

  try {
    // 检测是否在本地开发环境
    const isDev = import.meta.env.DEV

    if (isDev) {
      // 本地开发：直接调用 GLM API
      const apiKey = import.meta.env.VITE_GLM_API_KEY

      if (!apiKey) {
        throw new Error('GLM_API_KEY not found in environment variables')
      }

      const response = await fetch(GLM_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'glm-4',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 500
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || 'API request failed')
      }

      const data = await response.json()
      const aiMessage = data.choices?.[0]?.message?.content

      if (!aiMessage) {
        throw new Error('Invalid response from AI service')
      }

      return {
        message: aiMessage,
        model: data.model,
        usage: data.usage
      }
    } else {
      // 生产环境：使用 Vercel Serverless Function
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          language
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'API request failed')
      }

      const data = await response.json()
      return {
        message: data.message,
        model: data.model,
        usage: data.usage
      }
    }
  } catch (error) {
    console.error('Chat API error:', error)
    throw error
  }
}

/**
 * 智能剧情搜索 - 使用AI提取用户问题的关键信息
 * @param query 用户的自然语言问题
 * @param language 语言 ('zh' | 'en')
 * @returns 提取的结构化搜索信息
 */
export async function analyzePlotQuery(
  query: string,
  language: 'zh' | 'en'
): Promise<PlotSearchQuery> {
  const systemPrompt = language === 'en'
    ? `You are a plot analysis assistant for "Lord of the Mysteries" novel.
Your task is to extract key information from user questions about the plot and return structured data.

Return a JSON object with the following structure:
{
  "keywords": ["keyword1", "keyword2", ...],
  "characters": ["Character Name 1", "Character Name 2", ...],
  "locations": ["Location 1", "Location 2", ...],
  "events": ["Event description 1", "Event description 2", ...],
  "timeline": "time clue (if any)",
  "searchSuggestions": ["alternative search term 1", "alternative search term 2", ...],
  "confidence": 85,
  "intent": "chapter_search",
  "matchedPhrases": ["phrase1 from query", "phrase2 from query"]
}

Confidence rating (0-100):
- 90-100: Very clear query, specific names/events mentioned
- 70-89: Clear intent, some details missing
- 50-69: Moderate clarity, need to infer
- Below 50: Unclear, vague

Intent types:
- "chapter_search": Looking for specific chapter(s)
- "character_info": Asking about a character
- "plot_explanation": Wants explanation of plot events
- "location_info": Asking about places/locations

Examples:
User: "When does Klein first meet Amon?"
Response:
{
  "keywords": ["first meeting", "encounter", "Amon", "Klein"],
  "characters": ["Klein", "Amon"],
  "locations": [],
  "events": ["first encounter between Klein and Amon", "battle with Amon"],
  "timeline": "Volume 4",
  "searchSuggestions": ["Klein vs Amon", "Amon parasite", "chapter 800"],
  "confidence": 95,
  "intent": "chapter_search",
  "matchedPhrases": ["first meet", "Amon", "Klein"]
}

User: "塔罗会第一次聚会"
Response:
{
  "keywords": ["Tarot Club", "first gathering", "Gray Fog"],
  "characters": ["Klein", "The Hanged Man", "The Sun", "The Hermit"],
  "locations": ["Gray Fog", "Sefirah Castle"],
  "events": ["formation of Tarot Club", "first meeting"],
  "timeline": "Volume 1",
  "searchSuggestions": ["First Tarot Club", "Gray Fog gathering", "Klein creates Tarot Club"],
  "confidence": 90,
  "intent": "chapter_search",
  "matchedPhrases": ["塔罗会", "第一次聚会"]
}

Return ONLY the JSON, no additional text.`
    : `你是《诡秘之主》小说的剧情分析助手。
你的任务是从用户关于剧情的问题中提取关键信息，并返回结构化数据。

返回一个JSON对象，结构如下：
{
  "keywords": ["关键词1", "关键词2", ...],
  "characters": ["角色名1", "角色名2", ...],
  "locations": ["地点1", "地点2", ...],
  "events": ["事件描述1", "事件描述2", ...],
  "timeline": "时间线索（如果有）",
  "searchSuggestions": ["替代搜索词1", "替代搜索词2", ...],
  "confidence": 85,
  "intent": "chapter_search",
  "matchedPhrases": ["查询中的关键短语1", "关键短语2"]
}

置信度评分 (0-100):
- 90-100: 非常清晰的查询，提到了具体的人名/事件
- 70-89: 意图明确，缺少部分细节
- 50-69: 中等清晰度，需要推断
- 50以下: 不明确，模糊

意图类型:
- "chapter_search": 查找特定章节
- "character_info": 询问角色信息
- "plot_explanation": 想要剧情解释
- "location_info": 询问地点信息

示例：
用户: "克莱恩第一次遇见阿蒙是在哪章？"
返回:
{
  "keywords": ["第一次相遇", "遇见", "阿蒙", "克莱恩"],
  "characters": ["克莱恩", "阿蒙"],
  "locations": [],
  "events": ["克莱恩与阿蒙的初次相遇", "与阿蒙的战斗"],
  "timeline": "第四卷",
  "searchSuggestions": ["克莱恩vs阿蒙", "阿蒙寄生", "第800章左右"],
  "confidence": 95,
  "intent": "chapter_search",
  "matchedPhrases": ["第一次", "遇见", "阿蒙", "克莱恩"]
}

用户: "塔罗会第一次聚会"
返回:
{
  "keywords": ["塔罗会", "第一次聚会", "灰雾"],
  "characters": ["克莱恩", "倒吊人", "太阳", "隐者"],
  "locations": ["灰雾之上", "源堡"],
  "events": ["塔罗会成立", "首次聚会"],
  "timeline": "第一卷",
  "searchSuggestions": ["首次塔罗会", "灰雾聚会", "克莱恩创建塔罗会"],
  "confidence": 90,
  "intent": "chapter_search",
  "matchedPhrases": ["塔罗会", "第一次聚会"]
}

只返回JSON，不要有其他文字。`

  try {
    const isDev = import.meta.env.DEV

    if (isDev) {
      const apiKey = import.meta.env.VITE_GLM_API_KEY
      if (!apiKey) {
        throw new Error('GLM_API_KEY not found in environment variables')
      }

      const response = await fetch(GLM_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'glm-4',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: query }
          ],
          temperature: 0.3,
          top_p: 0.9,
          max_tokens: 800
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || 'API request failed')
      }

      const data = await response.json()
      const aiMessage = data.choices?.[0]?.message?.content

      if (!aiMessage) {
        throw new Error('Invalid response from AI service')
      }

      // 解析AI返回的JSON
      const jsonMatch = aiMessage.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('Failed to extract JSON from AI response')
      }

      const parsedQuery: PlotSearchQuery = JSON.parse(jsonMatch[0])
      return parsedQuery
    } else {
      // 生产环境：通过API路由
      const response = await fetch('/api/plot-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'API request failed')
      }

      const data = await response.json()
      return data
    }
  } catch (error) {
    console.error('Plot search analysis error:', error)

    // 失败时返回基础解析结果
    return {
      keywords: [query],
      characters: [],
      locations: [],
      events: [],
      searchSuggestions: [query]
    }
  }
}
