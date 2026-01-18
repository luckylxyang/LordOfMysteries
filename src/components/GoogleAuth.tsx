import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../utils/supabaseClient'
import './GoogleAuth.css'

interface UserProfile {
  id: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export default function GoogleAuth() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 检查是否已配置
    if (!isSupabaseConfigured()) {
      return
    }

    // 检查现有会话
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || null,
            displayName: session.user.user_metadata?.full_name || session.user.email || null,
            photoURL: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || null,
          })
        }
      } catch (err) {
        console.error('检查会话失败:', err)
      }
    }

    checkSession()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || null,
          displayName: session.user.user_metadata?.full_name || session.user.email || null,
          photoURL: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || null,
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSignIn = async () => {
    if (!isSupabaseConfigured()) {
      setError('Supabase 未配置，无法登录')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        throw error
      }
    } catch (err: any) {
      console.error('Google 登录失败:', err)
      setError(err.message || '登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      setUser(null)
      console.log('登出成功')
    } catch (err: any) {
      console.error('登出失败:', err)
      setError(err.message || '登出失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="google-login-container">
      {!isSupabaseConfigured() ? (
        // Supabase 未配置
        <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'rgba(244, 228, 188, 0.7)', padding: '1rem' }}>
          Google 登录暂未配置
        </div>
      ) : user ? (
        // 已登录：显示用户名和登出按钮
        <div className="user-profile">
          <div className="user-name">{user.displayName || '用户'}</div>
          <button
            className="logout-button"
            onClick={handleSignOut}
            disabled={loading}
          >
            {loading ? '...' : '✕'}
          </button>
        </div>
      ) : (
        // 未登录：显示登录按钮
        <>
          <button
            className="google-login-button"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <svg className="google-icon" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.2c0-.637-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c2.516-2.318 3.684-5.735 3.684-9.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.444 0-4.528-1.656-5.273-3.9H.686v2.352A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                  <path d="M3.727 10.522a5.41 5.41 0 0 1 0-3.044V5.126H.686A8.997 8.997 0 0 0 9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259a5.41 5.41 0 0 1-8.32-1.04z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .686 5.126l3.041 2.352C4.472 5.236 6.556 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                <span>使用 Google 账号继续</span>
              </>
            )}
          </button>
          {error && <div className="error-message">{error}</div>}
        </>
      )}
    </div>
  )
}
