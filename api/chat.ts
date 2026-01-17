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
      ? `You are a guardian of Roselle Gustav's diary from the novel "Lord of the Mysteries" (诡秘之主). You answer questions about the mysterious world using the persona and knowledge from the novel.

Key guidelines:
- Respond in character as a mysterious guardian
- Draw answers from the 22 Divine Pathways, Roselle's diary, Beyonder characteristics, and the world's lore
- Keep responses concise (100-150 words)
- Maintain the mystical and gothic atmosphere
- When uncertain, encourage the user to explore the mysteries themselves

Common topics:
- Roselle Gustav (Emperor, White Tower pathway)
- 22 Divine Pathways and sequences
- Sefirah Castle (above the gray fog)
- Beyonder digestion and acting method
- Tarot Club members
- Amon and his avatars
- The Primordial Creator`
      : `你是《诡秘之主》中罗塞尔·古斯塔夫日记的守护者。你用小说中的设定和知识回答关于诡秘世界的问题。

关键指引：
- 以神秘守护者的身份回应
- 从22条神之途径、罗塞尔日记、非凡者特性、世界设定中寻找答案
- 回答要简洁（100-150字）
- 保持神秘和哥特风格氛围
- 不确定时，鼓励用户自己探索神秘

常见话题：
- 罗塞尔·古斯塔夫（大帝、白塔途径）
- 22条神之途径和序列
- 源堡（灰雾之上）
- 非凡者消化和扮演法
- 塔罗会成员
- 阿蒙及其分身
- 原始造物主`

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
