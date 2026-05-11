import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage('')
    setSuccess(false)

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      setMessage(error.message)
    } else if (data.user) {
      setMessage('Login successful!')
      setSuccess(true)
      // 跳转到 Dashboard
      setTimeout(() => {
        router.push('/dashboard')
      }, 800)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-card p-8">
        <h1 className="text-2xl font-display font-semibold text-[#C5A572] mb-6">Member Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A1628] border border-gray-700 rounded-xl p-3 text-white outline-none focus:border-[#C5A572] transition"
              required
            />
          </div>
          <button type="submit" className="btn-gold w-full py-3 text-base">
            Sign In
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-sm text-center ${success ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}

        <p className="mt-6 text-gray-600 text-sm text-center">
          Don't have an account?{' '}
          <a href="/signup" className="text-[#C5A572] hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  )
}
