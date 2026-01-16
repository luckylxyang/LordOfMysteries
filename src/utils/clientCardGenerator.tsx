import { Pathway } from '../types'

// 将长文本分割为多行
function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split('')
  const lines: string[] = []
  let currentLine = ''

  for (const char of words) {
    if (currentLine.length >= maxCharsPerLine) {
      lines.push(currentLine)
      currentLine = char
    } else {
      currentLine += char
    }
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines.slice(0, 2) // 最多2行
}

// 客户端生成 SVG 卡片（备用方案）
export function generateCardSVG(
  pathway: Pathway,
  userName: string,
  commentary: string
): string {
  // 截断评语为最多30个字符，约15个中文字
  const maxCommentaryLength = 30
  let truncatedCommentary = commentary
  if (commentary.length > maxCommentaryLength) {
    truncatedCommentary = commentary.substring(0, maxCommentaryLength - 2) + '...'
  }

  // 截断描述为最多35个字符
  const maxDescLength = 35
  let truncatedDesc = pathway.description
  if (pathway.description.length > maxDescLength) {
    truncatedDesc = pathway.description.substring(0, maxDescLength - 2) + '...'
  }

  // 生成多行评语
  const commentaryLines = wrapText(truncatedCommentary, 20)

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="420" height="280">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a0a2e;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#0d0d0d;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a0a2e;stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- 背景 -->
      <rect width="420" height="280" fill="url(#bg)" />

      <!-- 外边框 -->
      <rect x="10" y="10" width="400" height="260"
            fill="none" stroke="#c9a227" stroke-width="3" />

      <!-- 内边框 -->
      <rect x="15" y="15" width="390" height="250"
            fill="none" stroke="rgba(201, 162, 39, 0.3)" stroke-width="1" />

      <!-- 符号 -->
      <text x="210" y="55" text-anchor="middle" font-size="42" fill="#c9a227">${pathway.symbol}</text>

      <!-- 途径名称 -->
      <text x="210" y="95" text-anchor="middle" font-size="20" font-weight="bold" fill="#c9a227">
        Seq ${pathway.sequence}: ${pathway.name}
      </text>

      <!-- 分隔线 -->
      <line x1="50" y1="110" x2="370" y2="110" stroke="rgba(201, 162, 39, 0.5)" stroke-width="1" />

      <!-- 描述 -->
      <text x="210" y="130" text-anchor="middle" font-size="11" fill="#f4e4bc">
        ${truncatedDesc}
      </text>

      <!-- 用户名 -->
      <text x="210" y="160" text-anchor="middle" font-size="13" font-weight="bold" fill="#c9a227">
        ${userName}
      </text>

      <!-- 评语 (多行) -->
      ${commentaryLines.map((line, index) => `
        <text x="210" y="${185 + index * 18}" text-anchor="middle" font-size="10" fill="rgba(244, 228, 188, 0.85)">
          ${line}
        </text>
      `).join('')}

      <!-- 底部装饰 -->
      <text x="210" y="250" text-anchor="middle" font-size="14" fill="rgba(201, 162, 39, 0.5)">
        ⚜ Above the Gray Fog ⚜
      </text>
    </svg>
  `

  return svg
}

// 将 SVG 转换为可下载的图片
export function svgToBlob(svg: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = 420
    canvas.height = 280
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Failed to get canvas context'))
      return
    }

    const img = new Image()
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to create blob'))
        }
      }, 'image/png')
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load SVG image'))
    }

    img.src = url
  })
}
