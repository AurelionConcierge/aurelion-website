import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'
import { getReward, SERVICE_LABELS, getFirstServiceDiscount } from '../lib/referralRewards'
import {
  UserIcon,
  TicketIcon,
  CurrencyDollarIcon,
  ClipboardDocumentIcon,
  ShareIcon,
  ArrowRightIcon,
  SparklesIcon,
  ClockIcon,
  GiftIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [referrals, setReferrals] = useState([])
  const [cashBalance, setCashBalance] = useState(0)
  const [voucherBalance, setVoucherBalance] = useState(0)
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
    await loadDashboardData(session.user)
    setLoading(false)
  }

  async function loadDashboardData(currentUser) {
    try {
      // 获取或创建 profile
      let { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single()

      if (!profileData) {
        const code = generateReferralCode()
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert({
            id: currentUser.id,
            referral_code: code,
            membership_level: 'basic',
          })
          .select()
          .single()
        profileData = newProfile
      }

      if (!profileData.referral_code) {
        const code = generateReferralCode()
        await supabase
          .from('profiles')
          .update({ referral_code: code })
          .eq('id', currentUser.id)
        profileData.referral_code = code
      }

      setProfile(profileData)

      // 获取推荐记录（所有状态的）
      const { data: referralData } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', currentUser.id)
        .order('created_at', { ascending: false })

      const refs = referralData || []
      setReferrals(refs)

      // 计算现金和抵用券余额
      let cash = 0
      let voucher = 0
      refs.forEach(r => {
        // 只计算已发放或可提现的
        if (r.status === 'paid' || r.status === 'eligible') {
          if (r.reward_type === 'cash') {
            cash += r.reward_amount || 0
          } else {
            voucher += r.reward_amount || 0
          }
        }
      })
      setCashBalance(cash)
      setVoucherBalance(voucher)

    } catch (err) {
      console.error('Dashboard load error:', err)
    }
  }

  function generateReferralCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = 'AUR'
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
  }

  const referralLink = profile?.referral_code
    ? `https://aurelionconcierge.com/signup?ref=${profile.referral_code}`
    : ''

  function copyReferralLink() {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function shareWhatsApp() {
    if (referralLink) {
      const text = encodeURIComponent(
        `🌟 Get premium home healthcare with Aurelion Concierge Care!\n\nUse my referral link for a special discount on your first booking:\n${referralLink}\n\nYour loved ones deserve exceptional care. ❤️`
      )
      window.open(`https://wa.me/?text=${text}`, '_blank')
    }
  }

  const membershipLevel = profile?.membership_level || 'basic'
  const discount = getFirstServiceDiscount(membershipLevel)

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
              { id: 'referrals', label: 'Referrals', icon: TicketIcon },
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
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-[#0A1628]/80 rounded-xl p-5">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Membership</p>
                    <p className="text-2xl font-display font-bold text-[#C5A572] capitalize">
                      {membershipLevel}
                    </p>
                  </div>
                  <div className="bg-[#0A1628]/80 rounded-xl p-5">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Referral Code</p>
                    <p className="text-lg font-mono font-bold text-white">
                      {profile?.referral_code || '---'}
                    </p>
                  </div>
                  <div className="bg-[#0A1628]/80 rounded-xl p-5">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Cash Balance</p>
                    <div className="flex items-center gap-1">
                      <BanknotesIcon className="w-5 h-5 text-green-400" />
                      <p className="text-2xl font-display font-bold text-green-400">RM{cashBalance}</p>
                    </div>
                  </div>
                  <div className="bg-[#0A1628]/80 rounded-xl p-5">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Vouchers</p>
                    <div className="flex items-center gap-1">
                      <GiftIcon className="w-5 h-5 text-blue-400" />
                      <p className="text-2xl font-display font-bold text-blue-400">RM{voucherBalance}</p>
                    </div>
                  </div>
                </div>
                {discount > 0 && (
                  <div className="mt-4 bg-[#C5A572]/5 border border-[#C5A572]/20 rounded-xl p-4 text-sm text-[#C5A572]">
                    🎉 As a <strong>{membershipLevel}</strong> member, you get <strong>{discount}% off</strong> your first service booking!
                  </div>
                )}
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
                      <p className="text-white font-medium">Earn Rewards</p>
                      <p className="text-gray-500 text-sm">Refer friends and earn</p>
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
              {/* 余额总览 */}
              <div className="glass-card p-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <CurrencyDollarIcon className="w-6 h-6 text-[#C5A572]" />
                  Your Rewards
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-[#0A1628]/80 rounded-xl p-6 text-center">
                    <BanknotesIcon className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Cash Balance</p>
                    <p className="text-3xl font-display font-bold text-green-400">RM{cashBalance}</p>
                    <p className="text-gray-600 text-xs mt-1">Min withdrawal: RM10</p>
                  </div>
                  <div className="bg-[#0A1628]/80 rounded-xl p-6 text-center">
                    <GiftIcon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Voucher Balance</p>
                    <p className="text-3xl font-display font-bold text-blue-400">RM{voucherBalance}</p>
                    <p className="text-gray-600 text-xs mt-1">For service payments only</p>
                  </div>
                </div>

                {/* 分享区域 */}
                <div className="bg-[#0A1628]/80 rounded-xl p-6 border border-gray-800">
                  <p className="text-white font-medium mb-3">Your Referral Link</p>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      readOnly
                      value={referralLink}
                      className="flex-1 bg-[#0A1628] border border-gray-700 rounded-xl px-4 py-3 text-gray-400 text-sm outline-none"
                    />
                    <button
                      onClick={copyReferralLink}
                      className="bg-[#C5A572]/10 border border-[#C5A572]/30 rounded-xl px-4 py-3 text-[#C5A572] hover:bg-[#C5A572]/20 transition flex items-center gap-2 whitespace-nowrap"
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
                {referrals.length === 0 ? (
                  <div className="text-center py-12">
                    <TicketIcon className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500">No referrals yet</p>
                    <p className="text-gray-600 text-sm mt-1">Share your link to earn rewards!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500 uppercase text-xs tracking-wider border-b border-gray-800">
                          <th className="pb-3 pr-4">Amount</th>
                          <th className="pb-3 pr-4">Type</th>
                          <th className="pb-3 pr-4">Status</th>
                          <th className="pb-3 pr-4">Date</th>
                          <th className="pb-3">Eligible</th>
                        </tr>
                      </thead>
                      <tbody>
                        {referrals.map((r, i) => {
                          const isVoucher = r.reward_type === 'voucher'
                          const canWithdraw = r.status === 'eligible' || r.status === 'paid'
                          const eligibleDate = r.eligible_date
                            ? new Date(r.eligible_date).toLocaleDateString()
                            : 'Immediate'
                          return (
                            <tr key={i} className="border-b border-gray-800/50 text-gray-300">
                              <td className="py-3 pr-4 font-semibold text-white">RM{r.reward_amount}</td>
                              <td className="py-3 pr-4">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  isVoucher ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'
                                }`}>
                                  {isVoucher ? 'Voucher' : 'Cash'}
                                </span>
                              </td>
                              <td className="py-3 pr-4">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  r.status === 'paid' ? 'bg-green-500/10 text-green-400' :
                                  r.status === 'eligible' ? 'bg-blue-500/10 text-blue-400' :
                                  'bg-yellow-500/10 text-yellow-400'
                                }`}>
                                  {r.status === 'paid' ? 'Withdrawn' :
                                   r.status === 'eligible' ? 'Available' : 'Pending'}
                                </span>
                              </td>
                              <td className="py-3 pr-4 text-gray-500">{new Date(r.created_at).toLocaleDateString()}</td>
                              <td className="py-3 text-gray-500 text-xs">{eligibleDate}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
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
