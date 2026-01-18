// Vercel Serverless Function for GLM-4 API
// 这个函数在服务器端运行，保护 API Key 不暴露给前端

import type { VercelRequest, VercelResponse } from '@vercel/node'

const GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message, language } = req.body

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' })
    }

    // 从环境变量获取 API Key
    const apiKey = process.env.GLM_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' })
    }

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

    // 调用 GLM-4 API
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
      console.error('GLM API Error:', errorData)
      return res.status(response.status).json({
        error: 'AI service temporarily unavailable',
        details: errorData.error?.message || 'Unknown error'
      })
    }

    const data = await response.json()

    // 提取 AI 回复
    const aiMessage = data.choices?.[0]?.message?.content

    if (!aiMessage) {
      return res.status(500).json({ error: 'Invalid response from AI service' })
    }

    return res.status(200).json({
      message: aiMessage,
      model: data.model,
      usage: data.usage
    })

  } catch (error) {
    console.error('Chat API Error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
