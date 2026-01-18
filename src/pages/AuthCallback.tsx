import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // 从 URL hash 和 search 中获取参数
        const params = new URLSearchParams(window.location.search)
        const hashParams = new URLSearchParams(window.location.hash.substring(1))

        const code = params.get('code') || hashParams.get('code')
        const error = params.get('error') || hashParams.get('error')
        const errorDescription = params.get('error_description') || hashParams.get('error_description')
        const accessToken = hashParams.get('access_token')

        if (error) {
          console.error('Auth error:', error, errorDescription)
          navigate('/?error=' + encodeURIComponent(errorDescription || error))
          return
        }

        // 如果有 access_token（implicit flow），直接设置 session
        if (accessToken) {
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: hashParams.get('refresh_token') || '',
          })

          if (sessionError) {
            console.error('Error setting session:', sessionError)
            navigate('/?error=' + encodeURIComponent(sessionError.message))
            return
          }

          console.log('Successfully authenticated:', data.user?.email)
          navigate('/')
          return
        }

        // 如果有 code（PKCE flow），交换为 session
        if (code) {
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

          if (exchangeError) {
            console.error('Error exchanging code for session:', exchangeError)
            navigate('/?error=' + encodeURIComponent(exchangeError.message))
            return
          }

          console.log('Successfully authenticated:', data.user?.email)
          navigate('/')
          return
        }

        // 既没有 code 也没有 access_token
        console.error('No code or access_token in URL')
        console.log('URL search:', window.location.search)
        console.log('URL hash:', window.location.hash)
        navigate('/?error=no_code_or_token')
      } catch (err) {
        console.error('Auth callback error:', err)
        navigate('/?error=unknown_error')
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      color: 'var(--parchment)',
      fontSize: '1.2rem'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(201, 162, 39, 0.3)',
        borderTopColor: 'var(--gold-accent)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem'
      }}></div>
      <p>正在登录...</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
