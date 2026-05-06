import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { supabase } from '../lib/supabase'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    checkUser()
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
    return () => authListener.subscription.unsubscribe()
  }, [])

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    setUser(session?.user || null)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/90 backdrop-blur-xl border-b border-[#C5A572]/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-[#C5A572] to-[#E2C99D] rounded-lg flex items-center justify-center">
            <span className="text-[#0A1628] font-bold text-sm">A</span>
          </div>
          <span className="text-xl font-display font-semibold text-[#C5A572] tracking-wider">AURELION</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-gray-400">
          <Link href="/services" className="hover:text-[#C5A572] transition-colors">Services</Link>
          <Link href="/pricing" className="hover:text-[#C5A572] transition-colors">Pricing</Link>
          <Link href="/vip" className="hover:text-[#C5A572] transition-colors">VIP</Link>
          <Link href="/contact" className="hover:text-[#C5A572] transition-colors">Contact</Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-[#C5A572] hover:text-white transition">
                <UserCircleIcon className="w-5 h-5" />
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 transition text-xs">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-gold !py-2 !px-5 !text-xs">Member Login</Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A1628]/95 backdrop-blur-xl border-t border-[#C5A572]/10 px-6 py-4 space-y-4">
          <Link href="/services" className="block text-gray-400 hover:text-[#C5A572] transition" onClick={() => setMobileOpen(false)}>Services</Link>
          <Link href="/pricing" className="block text-gray-400 hover:text-[#C5A572] transition" onClick={() => setMobileOpen(false)}>Pricing</Link>
          <Link href="/vip" className="block text-gray-400 hover:text-[#C5A572] transition" onClick={() => setMobileOpen(false)}>VIP</Link>
          <Link href="/contact" className="block text-gray-400 hover:text-[#C5A572] transition" onClick={() => setMobileOpen(false)}>Contact</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="block text-[#C5A572] hover:text-white transition" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="block text-gray-500 hover:text-red-400 transition">Logout</button>
            </>
          ) : (
            <Link href="/login" className="btn-gold w-full block text-center" onClick={() => setMobileOpen(false)}>Member Login</Link>
          )}
        </div>
      )}
    </nav>
  )
}
