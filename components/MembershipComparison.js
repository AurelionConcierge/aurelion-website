import { useState } from 'react'
import Link from 'next/link'
import {
  CheckBadgeIcon,
  StarIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  PhoneIcon,
  SparklesIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { useLang } from '../lib/i18n'

const F = {
  consult: { en: 'Free Initial Consultation', zh: '免费初步咨询', ms: 'Konsultasi Awal Percuma' },
  booking: { en: 'Priority Booking', zh: '优先预约', ms: 'Tempahan Keutamaan' },
  all: { en: 'Access to All Services', zh: '可使用所有服务', ms: 'Akses kepada Semua Perkhidmatan' },
  pool: { en: 'Standard Caregiver Pool', zh: '标准护理员团队', ms: 'Kumpulan Penjaga Standard' },
  faster: { en: 'Faster Deployment', zh: '更快安排', ms: 'Penempatan Lebih Pantas' },
  fasterP: { en: 'Faster Deployment (Priority)', zh: '更快安排（优先）', ms: 'Penempatan Lebih Pantas (Keutamaan)' },
  fasterT: { en: 'Faster Deployment (Top Priority)', zh: '更快安排（最优先）', ms: 'Penempatan Lebih Pantas (Keutamaan Tertinggi)' },
  hourly: { en: 'Discounted Hourly Rate', zh: '按小时收费优惠', ms: 'Kadar Sejam Diskaun' },
  hourly10: { en: 'Discounted Hourly Rate (10% Off)', zh: '按小时收费 9 折', ms: 'Kadar Sejam Diskaun (10% Potongan)' },
  bestRate: { en: 'Best Available Rates', zh: '最优惠价格', ms: 'Kadar Terbaik' },
  supportMgr: { en: 'Dedicated Support Manager', zh: '专属支援经理', ms: 'Pengurus Sokongan Khusus' },
  careMgr: { en: 'Dedicated Care Manager', zh: '专属护理经理', ms: 'Pengurus Penjagaan Khusus' },
  fixed: { en: 'Fixed Caregiver Priority', zh: '优先固定护理员', ms: 'Keutamaan Penjaga Tetap' },
  emergency: { en: 'Emergency Replacement', zh: '紧急替补', ms: 'Penggantian Kecemasan' },
  emergencySys: { en: 'Emergency Replacement System', zh: '紧急替补机制', ms: 'Sistem Penggantian Kecemasan' },
  hospital: { en: 'Hospital Coordination Priority', zh: '优先医院协调', ms: 'Keutamaan Penyelarasan Hospital' },
  plan: { en: 'Personalized Care Plan', zh: '个人化护理计划', ms: 'Pelan Penjagaan Peribadi' },
}

const tiers = [
  {
    key: 'basic',
    name: { en: 'Basic', zh: '基本会员', ms: 'Asas' },
    tagline: { en: 'Free Membership', zh: '免费会员', ms: 'Keahlian Percuma' },
    price: { en: 'Free', zh: '免费', ms: 'Percuma' },
    free: true,
    period: { en: 'forever', zh: '永久', ms: 'selamanya' },
    color: 'from-gray-500 to-gray-400',
    badge: null,
    description: {
      en: 'Get started with priority access to our care services.',
      zh: '优先使用我们的护理服务，从这里开始。',
      ms: 'Mulakan dengan akses keutamaan kepada perkhidmatan penjagaan kami.',
    },
    features: [
      { icon: PhoneIcon, text: F.consult, included: true },
      { icon: ClockIcon, text: F.booking, included: true },
      { icon: CheckBadgeIcon, text: F.all, included: true },
      { icon: UserGroupIcon, text: F.pool, included: true },
      { icon: ShieldCheckIcon, text: F.faster, included: false },
      { icon: HeartIcon, text: F.hourly, included: false },
      { icon: StarIcon, text: F.supportMgr, included: false },
      { icon: ShieldCheckIcon, text: F.fixed, included: false },
      { icon: SparklesIcon, text: F.emergency, included: false },
      { icon: ShieldCheckIcon, text: F.hospital, included: false },
    ],
    cta: { en: 'Sign Up Free', zh: '免费注册', ms: 'Daftar Percuma' },
    href: '/signup',
    highlighted: false,
  },
  {
    key: 'premium',
    name: { en: 'Premium Family', zh: '尊享家庭会员', ms: 'Keluarga Premium' },
    tagline: { en: 'Most Popular', zh: '最受欢迎', ms: 'Paling Popular' },
    price: { en: 'RM199', zh: 'RM199', ms: 'RM199' },
    period: { en: '/month', zh: '/月', ms: '/bulan' },
    color: 'from-[#C5A572] to-[#D4B896]',
    badge: { en: '🔥 BEST VALUE', zh: '🔥 最超值', ms: '🔥 NILAI TERBAIK' },
    description: {
      en: 'The perfect balance of priority care and affordability. Designed for families who want peace of mind without compromise.',
      zh: '优先照护与实惠价格的完美平衡，适合想要安心又不想妥协的家庭。',
      ms: 'Keseimbangan sempurna antara penjagaan keutamaan dan kemampuan. Direka untuk keluarga yang mahukan ketenangan fikiran tanpa kompromi.',
    },
    features: [
      { icon: PhoneIcon, text: F.consult, included: true },
      { icon: ClockIcon, text: F.booking, included: true },
      { icon: CheckBadgeIcon, text: F.all, included: true },
      { icon: UserGroupIcon, text: F.fasterP, included: true, highlight: true },
      { icon: HeartIcon, text: F.hourly10, included: true, highlight: true },
      { icon: ShieldCheckIcon, text: F.supportMgr, included: true, highlight: true },
      { icon: StarIcon, text: F.fixed, included: false },
      { icon: SparklesIcon, text: F.emergency, included: false },
      { icon: ShieldCheckIcon, text: F.hospital, included: false },
    ],
    cta: { en: 'Join Premium Family', zh: '加入尊享家庭会员', ms: 'Sertai Keluarga Premium' },
    href: '/contact',
    highlighted: true,
  },
  {
    key: 'vip',
    name: { en: 'VIP Concierge', zh: 'VIP 礼宾会员', ms: 'Concierge VIP' },
    tagline: { en: 'Ultimate Peace of Mind', zh: '极致安心', ms: 'Ketenangan Fikiran Mutlak' },
    price: { en: 'RM800–1,500', zh: 'RM800–1,500', ms: 'RM800–1,500' },
    period: { en: '/month', zh: '/月', ms: '/bulan' },
    color: 'from-yellow-500 to-amber-400',
    badge: { en: '👑 PREMIUM', zh: '👑 尊贵', ms: '👑 PREMIUM' },
    description: {
      en: 'The highest level of care. Fixed caregiver, dedicated manager, and total continuity. For those who accept nothing less than the best.',
      zh: '最高级别的照护：固定护理员、专属经理、照护完全连续。只为追求最好的您。',
      ms: 'Tahap penjagaan tertinggi. Penjaga tetap, pengurus khusus dan kesinambungan penuh. Untuk mereka yang hanya mahukan yang terbaik.',
    },
    features: [
      { icon: PhoneIcon, text: F.consult, included: true },
      { icon: ClockIcon, text: F.booking, included: true },
      { icon: CheckBadgeIcon, text: F.all, included: true },
      { icon: UserGroupIcon, text: F.fasterT, included: true },
      { icon: HeartIcon, text: F.bestRate, included: true },
      { icon: ShieldCheckIcon, text: F.careMgr, included: true },
      { icon: StarIcon, text: F.fixed, included: true, highlight: true },
      { icon: SparklesIcon, text: F.emergencySys, included: true, highlight: true },
      { icon: ShieldCheckIcon, text: F.hospital, included: true, highlight: true },
      { icon: HeartIcon, text: F.plan, included: true, highlight: true },
    ],
    cta: { en: 'Apply for VIP', zh: '申请 VIP', ms: 'Mohon VIP' },
    href: '/contact',
    highlighted: false,
  },
]

export default function MembershipComparison() {
  const [billingCycle, setBillingCycle] = useState('monthly')
  const { t } = useLang()

  return (
    <section className="py-24 px-6 relative overflow-hidden" id="membership">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060F1E]/50 via-transparent to-[#060F1E]/50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#C5A572]/10 border border-[#C5A572]/20 rounded-full px-5 py-2 text-sm text-[#C5A572] mb-6">
            <SparklesIcon className="w-5 h-5" />
            <span className="uppercase tracking-wider font-medium">{t({ en: 'Membership Tiers', zh: '会员等级', ms: 'Peringkat Keahlian' })}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            {t({ en: 'Choose Your', zh: '选择您的', ms: 'Pilih' })}{t({ en: ' ', zh: '', ms: ' ' })}
            <span className="text-gradient">{t({ en: 'Level of Care', zh: '照护等级', ms: 'Tahap Penjagaan Anda' })}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t({
              en: 'From free access to full concierge service. Every tier is designed to give you exactly what your family needs.',
              zh: '从免费会员到全方位礼宾服务，每个等级都为满足您家庭的需要而设计。',
              ms: 'Daripada akses percuma hingga perkhidmatan concierge penuh. Setiap peringkat direka untuk memberi apa yang keluarga anda perlukan.',
            })}
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="bg-[#0A1628] border border-gray-800 rounded-full p-1 inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                billingCycle === 'monthly' ? 'bg-[#C5A572] text-[#0A1628]' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t({ en: 'Monthly', zh: '月付', ms: 'Bulanan' })}
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                billingCycle === 'annual' ? 'bg-[#C5A572] text-[#0A1628]' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t({ en: 'Annual', zh: '年付', ms: 'Tahunan' })} <span className="text-xs opacity-75">{t({ en: '(Save 15%)', zh: '（省 15%）', ms: '(Jimat 15%)' })}</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.key}
              className={`relative rounded-2xl p-8 border transition-all duration-500 hover:-translate-y-2 ${
                tier.highlighted
                  ? 'border-[#C5A572]/40 bg-[#C5A572]/5 shadow-[0_0_60px_rgba(197,165,114,0.08)] md:scale-105'
                  : 'border-gray-800 bg-[#0A1628]/50 hover:border-gray-700'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className={`bg-gradient-to-r ${tier.color} text-[#0A1628] px-5 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap`}>
                    {t(tier.badge)}
                  </span>
                </div>
              )}

              <div className="text-center mb-8 pt-2">
                <h3 className="text-xl font-semibold text-white mb-1">{t(tier.name)}</h3>
                <p className="text-gray-500 text-sm">{t(tier.tagline)}</p>
                <div className="my-6">
                  <span className={`text-4xl font-display font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                    {t(tier.price)}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">
                    {billingCycle === 'annual' && !tier.free ? t({ en: '/month*', zh: '/月*', ms: '/bulan*' }) : t(tier.period)}
                  </span>
                </div>
                {billingCycle === 'annual' && !tier.free && (
                  <p className="text-xs text-[#C5A572] -mt-4 mb-2">{t({ en: '*Billed annually at 15% discount', zh: '*按年付费，享 85 折', ms: '*Dibilkan setiap tahun dengan diskaun 15%' })}</p>
                )}
                <p className="text-gray-500 text-sm leading-relaxed">{t(tier.description)}</p>
              </div>

              <div className="space-y-3 mb-8">
                {tier.features.map((feature, j) => (
                  <div
                    key={j}
                    className={`flex items-center gap-3 text-sm ${
                      feature.included ? 'text-gray-300' : 'text-gray-600 line-through'
                    }`}
                  >
                    {feature.included ? (
                      <CheckBadgeIcon className={`w-5 h-5 flex-shrink-0 ${feature.highlight ? 'text-[#C5A572]' : 'text-green-500'}`} />
                    ) : (
                      <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-600">—</span>
                    )}
                    <span className={feature.highlight ? 'text-white font-medium' : ''}>
                      {t(feature.text)}
                    </span>
                    {feature.highlight && (
                      <span className="ml-auto text-[#C5A572] text-[10px] uppercase tracking-wider font-bold">{t({ en: 'KEY', zh: '重点', ms: 'UTAMA' })}</span>
                    )}
                  </div>
                ))}
              </div>

              <Link
                href={tier.href}
                className={`block text-center py-3 rounded-full font-semibold transition text-sm ${tier.highlighted ? 'btn-gold' : 'btn-outline-gold'}`}
              >
                {t(tier.cta)}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            {t({
              en: 'All plans include background-checked, professionally trained caregivers.',
              zh: '所有配套均由通过背景审查、受过专业训练的护理员提供服务。',
              ms: 'Semua pelan termasuk penjaga terlatih secara profesional yang telah melalui semakan latar belakang.',
            })}{t({ en: ' ', zh: '', ms: ' ' })}
            <Link href="/contact" className="text-[#C5A572] hover:underline">
              {t({ en: 'Contact us', zh: '联系我们', ms: 'Hubungi kami' })}
            </Link>{t({ en: ' ', zh: '', ms: ' ' })}
            {t({ en: 'for custom enterprise plans.', zh: '了解企业定制配套。', ms: 'untuk pelan korporat khas.' })}
          </p>
        </div>
      </div>
    </section>
  )
}
