import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// 检查 Supabase 是否已配置
export function isSupabaseConfigured(): boolean {
  return !!(
    supabaseUrl &&
    supabaseUrl !== '' &&
    supabaseUrl !== 'your-supabase-project-url' &&
    supabaseAnonKey &&
    supabaseAnonKey !== '' &&
    supabaseAnonKey !== 'your-supabase-anon-key'
  )
}

// 懒加载创建 Supabase 客户端
let clientInstance: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase 未配置')
  }

  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey)
  }

  return clientInstance
}

// 向后兼容的导出
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    const client = getSupabaseClient()
    return client[prop as keyof typeof client]
  }
})
