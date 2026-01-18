import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!

serve(async (req) => {
  try {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'

    if (code) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey)

      // 交换 code 为 session
      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (!error) {
        // 成功，重定向回应用
        const origin = req.headers.get('origin') ?? 'http://localhost:3000'
        return new Response(null, {
          status: 302,
          headers: {
            'Location': `${origin}${next}`,
          },
        })
      }

      console.error('Auth callback error:', error)
    }

    // 错误处理
    const origin = req.headers.get('origin') ?? 'http://localhost:3000'
    return new Response(null, {
      status: 302,
      headers: {
        'Location': `${origin}/auth/error`,
      },
    })
  } catch (error) {
    console.error('Auth callback exception:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
