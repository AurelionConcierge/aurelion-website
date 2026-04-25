import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Login successful!')
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full border border-gray-800 p-8 rounded-2xl">
        <h1 className="text-2xl text-gold mb-6">Member Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white" required />
          <button type="submit" className="w-full bg-gold text-dark py-3 rounded-full font-semibold">Sign In</button>
        </form>
        {message && <p className="mt-4 text-sm text-red-400">{message}</p>}
        <p className="mt-4 text-gray-500 text-sm">Don't have an account? <a href="/signup" className="text-gold">Sign up</a></p>
      </div>
    </div>
  )
}
