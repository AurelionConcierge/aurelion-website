import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'
import {
  UserIcon,
  TicketIcon,
  CurrencyDollarIcon,
  ClipboardDocumentIcon,
  ShareIcon,
  ArrowRightIcon,
  SparklesIcon,
  ClockIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [referralData, setReferralData] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
      return
    }
    setUser(session.user)
    fetchReferralData(session.access_token)
    setLoading(false)
  }

  async function fetchReferralData(token) {
    try {
      const res = await fetch('/api/referral', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (!data.error) {
        setReferralData(data)
      }
    } catch (err) {
      console.error('Failed to fetch referral data:', err)
    }
  }

  function copyReferralLink() {
    if (referralData?.referralLink) {
      navigator.clipboard.writeText(referralData.referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function shareWhatsApp() {
    if (referralData?.referralLink) {
      const text = encodeURIComponent(
        `🌟 Get premium home healthcare with Aurelion Concierge Care!\n\nUse my referral link for a special discount on your first booking:\n${referralData.referralLink}\n\nYour loved ones deserve exceptional care. ❤️`
      )
      window.open(`https://wa.me/?text=${text}`, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#C5A572] border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24 px-6 bg-glow min-h-screen">
        <div className="max-w-5xl mx-auto">
          {/* 标题 */}
          <div className="mb-12">
            <h1 className="text-3xl font-display font-semibold text-white mb-2">
              Welcome, {user?.email?.split('@')[0] || 'Member'}
            </h1>
            <p className="text-gray-400">Your care concierge dashboard</p>
          </div>

          {/* 标签切换 */}
          <div className="flex gap-2 mb-10 border-b border-gray-800 pb-4">
            {[
              { id: 'overview', label: 'Overview', icon: UserIcon },
              { id: 'referrals', label: 'Referral Program', icon: TicketIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-[#C5A572] text-[#0A1628]'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* ===== OVERVIEW TAB ===== */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* 会员状态卡片 */}
              <div className="glass-card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#C5A572]/10 rounded-2xl flex items-center justify-center">
                    <UserIcon className="w-7 h-7 text-[#C5A572]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Account Status</h3>
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#0A1628]/80 rounded-xl p-5">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Membership</p>
                    <p className="text-2xl font-display font-bold text-[#C5A572] capitalize">
                      {referralData?.profile?.membership_level || 'Basic'}
                    </p>
                  </div>
                  <div className="bg-[#0A1628]/80 rounded-xl p-5">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Referral Code</p>
                    <p className="text-lg font-mono font-bold text-white">
                      {referralData?.profile?.referral_code || '---'}
                    </p>
                  </div>
                  <div className="bg-[#0A1628]/80 rounded-xl p-5">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total Earned</p>
                    <p className="text-2xl font-display font-bold text-green-400">
                      RM{referralData?.totalEarned || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* 快速操作 */}
              <div className="glass-card p-8">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <SparklesIcon className="w-5 h-5 text-[#C5A572]" />
                  Quick Actions
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <a href="/contact" className="bg-[#0A1628]/80 rounded-xl p-5 flex items-center gap-4 hover:border-[#C5A572]/30 border border-transparent transition group">
                    <div className="w-12 h-12 bg-[#C5A572]/10 rounded-xl flex items-center justify-center group-hover:bg-[#C5A572]/20 transition">
                      <ClockIcon className="w-6 h-6 text-[#C5A572]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Book Care Service</p>
                      <p className="text-gray-500 text-sm">Schedule a consultation</p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-gray-600 ml-auto" />
                  </a>
                  <button
                    onClick={() => setActiveTab('referrals')}
                    className="bg-[#0A1628]/80 rounded-xl p-5 flex items-center gap-4 hover:border-[#C5A572]/30 border border-transparent transition group text-left"
                  >
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-green-500/20 transition">
                      <CurrencyDollarIcon className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Earn RM200</p>
                      <p className="text-gray-500 text-sm">Refer a friend</p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-gray-600 ml-auto" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== REFERRALS TAB ===== */}
          {activeTab === 'referrals' && (
            <div className="space-y-8">
              {/* 推荐统计 */}
              <div className="glass-card p-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <CurrencyDollarIcon className="w-6 h-6 text-[#C5A572]" />
                  Referral Earnings
                </h3>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#0A1628]/80 rounded-xl p-5 text-center">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Total Earned</p>
                    <p className="text-3xl font-display font-bold text-green-400">RM{referralData?.totalEarned || 0}</p>
                  </div>
                  <div className="bg-[#0A1628]/80 rounded-xl p-5 text-center">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Pending</p>
                    <p className="text-3xl font-display font-bold text-yellow-400">RM{referralData?.pendingAmount || 0}</p>
                  </div>
                  <div className="bg-[#0A1628]/80 rounded-xl p-5 text-center">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Per Referral</p>
                    <p className="text-3xl font-display font-bold text-[#C5A572]">RM200</p>
                  </div>
                </div>

                {/* 分享区域 */}
                <div className="bg-[#0A1628]/80 rounded-xl p-6 border border-gray-800">
                  <p className="text-white font-medium mb-3">Your Referral Link</p>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      readOnly
                      value={referralData?.referralLink || ''}
                      className="flex-1 bg-[#0A1628] border border-gray-700 rounded-xl px-4 py-3 text-gray-400 text-sm outline-none"
                    />
                    <button
                      onClick={copyReferralLink}
                      className="bg-[#C5A572]/10 border border-[#C5A572]/30 rounded-xl px-4 py-3 text-[#C5A572] hover:bg-[#C5A572]/20 transition flex items-center gap-2"
                    >
                      <ClipboardDocumentIcon className="w-5 h-5" />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <button
                    onClick={shareWhatsApp}
                    className="mt-4 w-full bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 text-green-400 hover:bg-green-500/20 transition flex items-center justify-center gap-2"
                  >
                    <ShareIcon className="w-5 h-5" />
                    Share on WhatsApp
                  </button>
                </div>
              </div>

              {/* 推荐记录 */}
              <div className="glass-card p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Referral History</h3>
                {referralData?.referrals?.length > 0 ? (
                  <div className="space-y-3">
                    {referralData.referrals.map((ref, i) => (
                      <div key={i} className="bg-[#0A1628]/80 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckBadgeIcon className={`w-5 h-5 ${ref.status === 'paid' ? 'text-green-400' : 'text-yellow-400'}`} />
                          <div>
                            <p className="text-white text-sm font-medium">RM{ref.reward_amount}</p>
                            <p className="text-gray-500 text-xs">{new Date(ref.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ref.status === 'paid' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {ref.status === 'paid' ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TicketIcon className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500">No referrals yet</p>
                    <p className="text-gray-600 text-sm mt-1">Share your link to earn RM200 per referral!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
