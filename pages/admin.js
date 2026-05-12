import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'
import {
  CalendarDaysIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ArrowLeftIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline'

const adminEmails = ['eztradetoday@gmail.com', 'care@aurelionconcierge.com']

export default function Admin() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('bookings')
  const [bookings, setBookings] = useState([])
  const [profiles, setProfiles] = useState([])
  const [referrals, setReferrals] = useState([])
  const [stats, setStats] = useState({ totalBookings: 0, totalUsers: 0, totalReferrals: 0 })

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
      return
    }
    if (!adminEmails.includes(session.user.email)) {
      router.push('/dashboard')
      return
    }
    setUser(session.user)
    fetchAllData()
    setLoading(false)
  }

  async function fetchAllData() {
    try {
      const [bookingsRes, profilesRes, referralsRes] = await Promise.all([
        supabase.from('bookings').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(100),
        supabase.from('profiles').select('*', { count: 'exact' }).limit(100),
        supabase.from('referrals').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(100),
      ])

      const bookingsData = bookingsRes.data || []
      const profilesData = profilesRes.data || []
      const referralsData = referralsRes.data || []

      setBookings(bookingsData)
      setProfiles(profilesData)
      setReferrals(referralsData)
      setStats({
        totalBookings: bookingsData.length,
        totalUsers: profilesData.length,
        totalReferrals: referralsData.length,
      })
    } catch (err) {
      console.error('Admin fetch error:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#C5A572] border-t-transparent rounded-full"></div>
      </div>
    )
  }

  const tabs = [
    { id: 'bookings', label: 'Bookings', icon: CalendarDaysIcon, count: stats.totalBookings },
    { id: 'users', label: 'Users', icon: UserGroupIcon, count: stats.totalUsers },
    { id: 'referrals', label: 'Referrals', icon: CurrencyDollarIcon, count: stats.totalReferrals },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24 px-6 bg-glow min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-display font-semibold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm mt-1">Manage your care business</p>
            </div>
            <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm">
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`glass-card p-6 text-left transition ${
                  activeTab === tab.id ? 'border-[#C5A572]/40' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-[#C5A572]/10 rounded-xl flex items-center justify-center">
                    <tab.icon className="w-6 h-6 text-[#C5A572]" />
                  </div>
                  <span className="text-3xl font-display font-bold text-[#C5A572]">{tab.count}</span>
                </div>
                <p className="text-gray-400 text-sm mt-3">{tab.label}</p>
              </button>
            ))}
          </div>

          {/* BOOKINGS TABLE */}
          {activeTab === 'bookings' && (
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <ClipboardDocumentListIcon className="w-6 h-6 text-[#C5A572]" />
                All Bookings
              </h3>
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarDaysIcon className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500">No bookings yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 uppercase text-xs tracking-wider border-b border-gray-800">
                        <th className="pb-3 pr-4">Date</th>
                        <th className="pb-3 pr-4">Service</th>
                        <th className="pb-3 pr-4">Customer</th>
                        <th className="pb-3 pr-4">Phone</th>
                        <th className="pb-3 pr-4">Email</th>
                        <th className="pb-3 pr-4">Time</th>
                        <th className="pb-3">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b, i) => (
                        <tr key={i} className="border-b border-gray-800/50 text-gray-300">
                          <td className="py-3 pr-4 whitespace-nowrap">{b.date}</td>
                          <td className="py-3 pr-4">{b.service}</td>
                          <td className="py-3 pr-4 font-medium text-white">{b.name}</td>
                          <td className="py-3 pr-4">{b.phone}</td>
                          <td className="py-3 pr-4 text-gray-500">{b.email || '—'}</td>
                          <td className="py-3 pr-4">{b.time}</td>
                          <td className="py-3 text-gray-500 max-w-[200px] truncate">{b.notes || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* USERS TABLE */}
          {activeTab === 'users' && (
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <UserGroupIcon className="w-6 h-6 text-[#C5A572]" />
                Registered Users ({profiles.length})
              </h3>
              {profiles.length === 0 ? (
                <div className="text-center py-12">
                  <UserGroupIcon className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500">No users yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 uppercase text-xs tracking-wider border-b border-gray-800">
                        <th className="pb-3 pr-4">Referral Code</th>
                        <th className="pb-3 pr-4">Membership</th>
                        <th className="pb-3 pr-4">Name</th>
                        <th className="pb-3 pr-4">Phone</th>
                        <th className="pb-3">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profiles.map((p, i) => (
                        <tr key={i} className="border-b border-gray-800/50 text-gray-300">
                          <td className="py-3 pr-4 font-mono text-[#C5A572]">{p.referral_code || '—'}</td>
                          <td className="py-3 pr-4">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              p.membership_level === 'vip' ? 'bg-yellow-500/10 text-yellow-400' :
                              p.membership_level === 'premium' ? 'bg-[#C5A572]/10 text-[#C5A572]' :
                              'bg-gray-500/10 text-gray-400'
                            }`}>
                              {p.membership_level || 'basic'}
                            </span>
                          </td>
                          <td className="py-3 pr-4 text-white">{p.full_name || '—'}</td>
                          <td className="py-3 pr-4">{p.phone || '—'}</td>
                          <td className="py-3 text-gray-500">{p.created_at ? new Date(p.created_at).toLocaleDateString() : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* REFERRALS TABLE */}
          {activeTab === 'referrals' && (
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <CurrencyDollarIcon className="w-6 h-6 text-[#C5A572]" />
                Referral History ({referrals.length})
              </h3>
              {referrals.length === 0 ? (
                <div className="text-center py-12">
                  <CurrencyDollarIcon className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500">No referrals yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 uppercase text-xs tracking-wider border-b border-gray-800">
                        <th className="pb-3 pr-4">Amount</th>
                        <th className="pb-3 pr-4">Status</th>
                        <th className="pb-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referrals.map((r, i) => (
                        <tr key={i} className="border-b border-gray-800/50 text-gray-300">
                          <td className="py-3 pr-4 font-semibold text-white">RM{r.reward_amount}</td>
                          <td className="py-3 pr-4">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              r.status === 'paid' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                            }`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="py-3 text-gray-500">{r.created_at ? new Date(r.created_at).toLocaleDateString() : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
