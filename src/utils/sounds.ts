/**
 * Sound effects utility for Roselle's Diary
 * 使用 Web Audio API 生成羽毛笔在纸上摩擦的声音
 */

let audioContext: AudioContext | null = null

/**
 * 初始化 AudioContext (需要用户交互后才能调用)
 */
function initAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioContext
}

/**
 * 生成羽毛笔在纸上摩擦的声音
 * 使用白噪声 + 滤波器模拟纸张摩擦效果
 */
export function playQuillSound(): void {
  try {
    const ctx = initAudioContext()

    // 创建音频上下文时间
    const now = ctx.currentTime
    const duration = 0.5 // 0.5秒

    // 创建白噪声源
    const bufferSize = ctx.sampleRate * duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)

    // 生成白噪声
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    // 创建带通滤波器 - 模拟纸张摩擦的中频声音
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 2000 // 中频
    filter.Q.value = 1 // 频宽

    // 创建低通滤波器 - 让声音更柔和
    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.value = 4000

    // 创建增益节点 - 控制音量
    const gainNode = ctx.createGain()

    // 音量包络：快速上升 -> 缓慢下降
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05) // 快速上升
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration) // 缓慢下降

    // 连接音频节点
    noise.connect(filter)
    filter.connect(lowpass)
    lowpass.connect(gainNode)
    gainNode.connect(ctx.destination)

    // 播放声音
    noise.start(now)
    noise.stop(now + duration)
  } catch (error) {
    console.error('Error playing quill sound:', error)
  }
}

/**
 * 预加载音效（可选）
 */
export function preloadSounds(): void {
  // 初始化 AudioContext（需要用户交互）
  try {
    initAudioContext()
  } catch (error) {
    console.warn('Could not initialize audio context:', error)
  }
}
