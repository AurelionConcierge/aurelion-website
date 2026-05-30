import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [refCode, setRefCode] = useState('')

  useEffect(() => {
    if (router.query.ref) {
      setRefCode(router.query.ref)
    }
  }, [router.query.ref])

  const handleSignUp = async (e) => {
    e.preventDefault()
    
    const { data, error } = await supabase.auth.signUp({ email, password })
    
    if (error) {
      setMessage(error.message)
      return
    }

    // 如果有推荐码，建立推荐关系并创建初始 referral 记录
    if (refCode && data.user) {
      setTimeout(async () => {
        try {
          // 查找推荐人
          const { data: referrer } = await supabase
            .from('profiles')
            .select('id')
            .eq('referral_code', refCode)
            .single()

          if (referrer) {
            // 1. 更新被推荐人的 referred_by 字段
            await supabase
              .from('profiles')
              .update({ referred_by: referrer.id })
              .eq('id', data.user.id)

            // 2. 在 referrals 表创建初始记录（金额为空，等待管理员发放）
            await supabase.from('referrals').insert({
              referrer_id: referrer.id,
              referred_user_id: data.user.id,
              reward_amount: null,
              reward_type: null,
              service_type: null,
              status: 'pending',
            })
          }
        } catch (err) {
          console.error('Referral relationship error:', err)
        }
      }, 2000)
    }

    setMessage('Account created! Redirecting...')
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-card p-8">
        <h1 className="text-2xl font-display font-semibold text-[#C5A572] mb-2">Create Account</h1>
        <p className="text-gray-500 text-sm mb-6">Join Aurelion Concierge Care</p>

        {refCode && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6 text-sm text-green-400">
            🎉 You have been referred! You will get a special discount on your first booking.
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Email</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0A1628] border border-gray-700 rounded-xl p-3 text-white outline-none focus:border-[#C5A572] transition"
              required
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A1628] border border-gray-700 rounded-xl p-3 text-white outline-none focus:border-[#C5A572] transition"
              required
              minLength={6}
            />
          </div>
          {refCode && (
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Referral Code</label>
              <input
                type="text"
                value={refCode}
                readOnly
                className="w-full bg-[#0A1628]/50 border border-[#C5A572]/30 rounded-xl p-3 text-[#C5A572] outline-none"
              />
            </div>
          )}
          <button type="submit" className="btn-gold w-full py-3 text-base">
            Create Account
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-sm ${message.includes('error') || message.includes('wrong') ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </p>
        )}

        <p className="mt-6 text-gray-600 text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-[#C5A572] hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  )
}
