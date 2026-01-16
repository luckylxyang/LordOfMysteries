const http = require('http')
const { createCanvas } = require('canvas')

const PORT = 3001

// 生成身份卡片
async function generateCard(data) {
  const { pathway, userName, commentary } = data

  // 创建画布 (400x250 适合分享)
  const canvas = createCanvas(400, 250)
  const ctx = canvas.getContext('2d')

  // 背景 - 渐变
  const gradient = ctx.createLinearGradient(0, 0, 400, 250)
  gradient.addColorStop(0, '#1a0a2e')
  gradient.addColorStop(0.5, '#0d0d0d')
  gradient.addColorStop(1, '#1a0a2e')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 400, 250)

  // 边框
  ctx.strokeStyle = '#c9a227'
  ctx.lineWidth = 3
  ctx.strokeRect(10, 10, 380, 230)

  // 内边框
  ctx.strokeStyle = 'rgba(201, 162, 39, 0.3)'
  ctx.lineWidth = 1
  ctx.strokeRect(15, 15, 370, 220)

  // 符号
  ctx.font = '48px serif'
  ctx.fillStyle = '#c9a227'
  ctx.textAlign = 'center'
  ctx.fillText(pathway.symbol, 200, 55)

  // 途径名称
  ctx.font = 'bold 24px serif'
  ctx.fillStyle = '#c9a227'
  ctx.textAlign = 'center'
  ctx.fillText(`序列 ${pathway.sequence}: ${pathway.name}`, 200, 100)

  // 分隔线
  ctx.strokeStyle = 'rgba(201, 162, 39, 0.5)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(50, 115)
  ctx.lineTo(350, 115)
  ctx.stroke()

  // 描述 (截断以适应)
  ctx.font = '12px serif'
  ctx.fillStyle = '#f4e4bc'
  ctx.textAlign = 'center'

  const maxWidth = 340
  const description = pathway.description.length > 40
    ? pathway.description.substring(0, 38) + '...'
    : pathway.description
  ctx.fillText(description, 200, 135)

  // 用户名
  ctx.font = 'bold 14px serif'
  ctx.fillStyle = '#c9a227'
  ctx.fillText(userName, 200, 165)

  // 评语 (截断到两行)
  ctx.font = '11px serif'
  ctx.fillStyle = 'rgba(244, 228, 188, 0.8)'

  const maxCommentaryWidth = 340
  let commentaryText = commentary
  if (commentaryText.length > 50) {
    commentaryText = commentaryText.substring(0, 48) + '...'
  }
  ctx.fillText(commentaryText, 200, 190)

  // 底部装饰
  ctx.font = '20px serif'
  ctx.fillStyle = 'rgba(201, 162, 39, 0.5)'
  ctx.textAlign = 'center'
  ctx.fillText('⚜ 灰雾之上 ⚜', 200, 225)

  // 返回图片 Buffer
  return canvas.toBuffer('image/png')
}

// HTTP 服务器
const server = http.createServer(async (req, res) => {
  // 设置 CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  if (req.url === '/api/generate-card' && req.method === 'POST') {
    let body = ''

    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', async () => {
      try {
        const data = JSON.parse(body)
        const imageBuffer = await generateCard(data)

        res.writeHead(200, {
          'Content-Type': 'image/png',
          'Content-Length': imageBuffer.length
        })
        res.end(imageBuffer)
      } catch (error) {
        console.error('Error generating card:', error)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Failed to generate card' }))
      }
    })
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
  }
})

server.listen(PORT, () => {
  console.log(`Card generation server running on http://localhost:${PORT}`)
})
