import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { supabase } from '../lib/supabase'
import { useLang, LANGS } from '../lib/i18n'

const adminEmails = ['eztradetoday@gmail.com', 'care@aurelionconcierge.com']

const NAV = [
  { href: '/services', label: { en: 'Services', zh: '服务', ms: 'Perkhidmatan' } },
  { href: '/pricing', label: { en: 'Pricing', zh: '价格', ms: 'Harga' } },
  { href: '/vip', label: { en: 'VIP', zh: 'VIP', ms: 'VIP' } },
  { href: '/contact', label: { en: 'Contact', zh: '联系我们', ms: 'Hubungi' } },
]

export function LanguageSwitcher({ className = '' }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`inline-flex items-center rounded-full border border-[#C5A572]/30 p-0.5 normal-case tracking-normal ${className}`} role="group" aria-label="Language">
      {LANGS.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          title={l.name}
          className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition ${
            lang === l.code ? 'bg-[#C5A572] text-[#0A1628]' : 'text-gray-400 hover:text-white'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()
  const { t } = useLang()

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

  const isAdmin = user && adminEmails.includes(user.email)
  const labels = {
    dashboard: { en: 'Dashboard', zh: '会员中心', ms: 'Papan Pemuka' },
    logout: { en: 'Logout', zh: '退出', ms: 'Log Keluar' },
    login: { en: 'Member Login', zh: '会员登录', ms: 'Log Masuk Ahli' },
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/90 backdrop-blur-xl border-b border-[#C5A572]/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <img src="/images/logo-ac.png" alt="Aurelion Concierge" width="53" height="40" className="h-10 w-auto" />
          <span className="text-lg sm:text-xl font-display font-semibold text-[#C5A572] tracking-wider">AURELION</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7 text-sm uppercase tracking-widest text-gray-400">
          {NAV.map(item => (
            <Link key={item.href} href={item.href} className="hover:text-[#C5A572] transition-colors">{t(item.label)}</Link>
          ))}

          {user ? (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link href="/admin" className="text-gray-500 hover:text-[#C5A572] transition text-xs">
                  Admin
                </Link>
              )}
              <Link href="/dashboard" className="flex items-center gap-2 text-[#C5A572] hover:text-white transition">
                <UserCircleIcon className="w-5 h-5" />
                {t(labels.dashboard)}
              </Link>
              <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 transition text-xs">
                {t(labels.logout)}
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-gold !py-2 !px-5 !text-xs">{t(labels.login)}</Link>
          )}

          <LanguageSwitcher />
        </div>

        {/* Mobile: language + menu toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button className="text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0A1628]/95 backdrop-blur-xl border-t border-[#C5A572]/10 px-6 py-4 space-y-4">
          {NAV.map(item => (
            <Link key={item.href} href={item.href} className="block text-gray-400 hover:text-[#C5A572] transition" onClick={() => setMobileOpen(false)}>{t(item.label)}</Link>
          ))}
          {user ? (
            <>
              {isAdmin && (
                <Link href="/admin" className="block text-gray-500 hover:text-[#C5A572] transition" onClick={() => setMobileOpen(false)}>Admin</Link>
              )}
              <Link href="/dashboard" className="block text-[#C5A572] hover:text-white transition" onClick={() => setMobileOpen(false)}>{t(labels.dashboard)}</Link>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="block text-gray-500 hover:text-red-400 transition">{t(labels.logout)}</button>
            </>
          ) : (
            <Link href="/login" className="btn-gold w-full block text-center" onClick={() => setMobileOpen(false)}>{t(labels.login)}</Link>
          )}
        </div>
      )}
    </nav>
  )
}
