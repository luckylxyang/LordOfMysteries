// Google AdMob 激励视频广告集成

// AdMob 配置
const ADMOB_CONFIG = {
  // 测试广告单元 ID（开发阶段使用）
  REWARDED_AD_UNIT_ID: import.meta.env.VITE_ADMOB_REWARDED_AD_ID || 'ca-app-pub-3940256099942544/5224354917',

  // 生产环境广告单元 ID（需要在 AdMob 后台创建）
  // PRODUCTION_AD_UNIT_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX'
}

let rewardedAdLoaded = false

/**
 * 初始化 AdMob SDK
 * 只在移动设备或支持的环境中加载
 */
export async function initAdMob(): Promise<boolean> {
  // 检查是否在移动设备环境
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  if (!isMobile) {
    console.log('AdMob: 非移动设备，跳过广告加载')
    return false
  }

  try {
    // 动态加载 AdMob SDK
    if (!document.getElementById('admob-script')) {
      const script = document.createElement('script')
      script.id = 'admob-script'
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3940256099942544'
      script.async = true
      script.crossOrigin = 'anonymous'

      script.onload = () => {
        console.log('AdMob: SDK 加载成功')
        loadRewardedAd()
      }

      script.onerror = () => {
        console.error('AdMob: SDK 加载失败')
      }

      document.head.appendChild(script)
    }

    return true
  } catch (error) {
    console.error('AdMob 初始化失败:', error)
    return false
  }
}

/**
 * 加载激励视频广告
 */
function loadRewardedAd() {
  try {
    // 创建广告容器
    let adContainer = document.getElementById('admob-rewarded-ad-container')
    if (!adContainer) {
      adContainer = document.createElement('div')
      adContainer.id = 'admob-rewarded-ad-container'
      adContainer.style.display = 'none'
      document.body.appendChild(adContainer)
    }

    // 对于真实环境，这里需要调用 AdMob API 加载广告
    // 由于 AdMob Web SDK 的限制，我们使用模拟实现

    console.log('AdMob: 准备加载激励视频广告')
    rewardedAdLoaded = true

  } catch (error) {
    console.error('加载广告失败:', error)
  }
}

/**
 * 显示激励视频广告
 * @returns Promise<boolean> - 用户是否完整观看了广告
 */
export async function showRewardedAd(): Promise<boolean> {
  // 非移动环境或开发环境，直接返回 true（模拟观看成功）
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  if (!isMobile || import.meta.env.DEV) {
    console.log('AdMob: 开发环境或非移动设备，模拟广告观看')
    // 模拟广告加载延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    return true
  }

  if (!rewardedAdLoaded) {
    console.warn('AdMob: 广告未加载')
    return false
  }

  return new Promise((resolve) => {
    try {
      // 显示模拟广告
      showMockAd().then((watched) => {
        if (watched) {
          // 广告观看完成，重新加载
          setTimeout(() => loadRewardedAd(), 1000)
        }
        resolve(watched)
      })
    } catch (error) {
      console.error('显示广告失败:', error)
      resolve(false)
    }
  })
}

/**
 * 显示模拟广告（用于演示）
 */
async function showMockAd(): Promise<boolean> {
  return new Promise((resolve) => {
    // 创建广告模态框
    const modal = document.createElement('div')
    modal.id = 'ad-mock-modal'
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.95);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      color: white;
      font-family: system-ui, -apple-system, sans-serif;
    `

    modal.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <div style="font-size: 1.5rem; margin-bottom: 1rem;">🎬 广告演示</div>
        <div style="font-size: 1rem; margin-bottom: 2rem; opacity: 0.8;">
          激励视频广告播放中...
        </div>
        <div style="
          width: 300px;
          height: 250px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        ">
          <span style="font-size: 3rem;">📺</span>
        </div>
        <div id="ad-timer" style="font-size: 1.2rem; margin-bottom: 1.5rem;">
          广告剩余时间: 5 秒
        </div>
        <button id="ad-skip-btn" style="
          padding: 0.75rem 2rem;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 1rem;
          opacity: 0.5;
          pointer-events: none;
        ">
          跳过广告
        </button>
      </div>
    `

    document.body.appendChild(modal)

    let timeLeft = 5
    const timerEl = modal.querySelector('#ad-timer') as HTMLElement
    const skipBtn = modal.querySelector('#ad-skip-btn') as HTMLButtonElement

    const timer = setInterval(() => {
      timeLeft--
      timerEl.textContent = `广告剩余时间: ${timeLeft} 秒`

      if (timeLeft <= 0) {
        clearInterval(timer)
        skipBtn.textContent = '关闭广告'
        skipBtn.style.opacity = '1'
        skipBtn.style.pointerEvents = 'auto'
        skipBtn.onclick = () => {
          document.body.removeChild(modal)
          resolve(true)
        }
      } else if (timeLeft <= 3) {
        skipBtn.style.opacity = '1'
        skipBtn.style.pointerEvents = 'auto'
        skipBtn.onclick = () => {
          document.body.removeChild(modal)
          resolve(false) // 提前跳过，不算完成
        }
      }
    }, 1000)

    // 防止用户按 ESC 关闭
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
      }
    })
  })
}

/**
 * 检查广告是否已加载
 */
export function isAdLoaded(): boolean {
  return rewardedAdLoaded
}

/**
 * 获取广告配置信息
 */
export function getAdConfig() {
  return {
    isConfigured: !!import.meta.env.VITE_ADMOB_REWARDED_AD_ID,
    adUnitId: ADMOB_CONFIG.REWARDED_AD_UNIT_ID,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }
}
