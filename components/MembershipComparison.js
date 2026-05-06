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
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

const tiers = [
  {
    name: 'Basic',
    tagline: 'Free Membership',
    price: 'Free',
    period: 'forever',
    color: 'from-gray-500 to-gray-400',
    bgColor: 'bg-gray-500/5',
    borderColor: 'border-gray-700',
    badge: null,
    description: 'Get started with priority access to our care services.',
    features: [
      { icon: PhoneIcon, text: 'Free Initial Consultation', included: true },
      { icon: ClockIcon, text: 'Priority Booking', included: true },
      { icon: CheckBadgeIcon, text: 'Access to All Services', included: true },
      { icon: UserGroupIcon, text: 'Standard Caregiver Pool', included: true },
      { icon: ShieldCheckIcon, text: 'Faster Deployment', included: false },
      { icon: HeartIcon, text: 'Discounted Hourly Rate', included: false },
      { icon: StarIcon, text: 'Dedicated Support Manager', included: false },
      { icon: ShieldCheckIcon, text: 'Fixed Caregiver Priority', included: false },
      { icon: SparklesIcon, text: 'Emergency Replacement', included: false },
      { icon: ShieldCheckIcon, text: 'Hospital Coordination Priority', included: false },
    ],
    cta: 'Sign Up Free',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Premium Family',
    tagline: 'Most Popular',
    price: 'RM199',
    period: '/month',
    color: 'from-[#C5A572] to-[#D4B896]',
    bgColor: 'bg-[#C5A572]/5',
    borderColor: 'border-[#C5A572]/30',
    badge: '🔥 BEST VALUE',
    description: 'The perfect balance of priority care and affordability. Designed for families who want peace of mind without compromise.',
    features: [
      { icon: PhoneIcon, text: 'Free Initial Consultation', included: true },
      { icon: ClockIcon, text: 'Priority Booking', included: true },
      { icon: CheckBadgeIcon, text: 'Access to All Services', included: true },
      { icon: UserGroupIcon, text: 'Faster Deployment (Priority)', included: true, highlight: true },
      { icon: HeartIcon, text: 'Discounted Hourly Rate (10% Off)', included: true, highlight: true },
      { icon: ShieldCheckIcon, text: 'Dedicated Support Manager', included: true, highlight: true },
      { icon: StarIcon, text: 'Fixed Caregiver Priority', included: false },
      { icon: SparklesIcon, text: 'Emergency Replacement', included: false },
      { icon: ShieldCheckIcon, text: 'Hospital Coordination Priority', included: false },
    ],
    cta: 'Join Premium Family',
    href: '/contact',
    highlighted: true,
  },
  {
    name: 'VIP Concierge',
    tagline: 'Ultimate Peace of Mind',
    price: 'RM800–1,500',
    period: '/month',
    color: 'from-yellow-500 to-amber-400',
    bgColor: 'bg-yellow-500/5',
    borderColor: 'border-yellow-500/20',
    badge: '👑 PREMIUM',
    description: 'The highest level of care. Fixed caregiver, dedicated manager, and total continuity. For those who accept nothing less than the best.',
    features: [
      { icon: PhoneIcon, text: 'Free Initial Consultation', included: true },
      { icon: ClockIcon, text: 'Priority Booking', included: true },
      { icon: CheckBadgeIcon, text: 'Access to All Services', included: true },
      { icon: UserGroupIcon, text: 'Faster Deployment (Top Priority)', included: true },
      { icon: HeartIcon, text: 'Best Available Rates', included: true },
      { icon: ShieldCheckIcon, text: 'Dedicated Care Manager', included: true },
      { icon: StarIcon, text: 'Fixed Caregiver Priority', included: true, highlight: true },
      { icon: SparklesIcon, text: 'Emergency Replacement System', included: true, highlight: true },
      { icon: ShieldCheckIcon, text: 'Hospital Coordination Priority', included: true, highlight: true },
      { icon: HeartIcon, text: 'Personalized Care Plan', included: true, highlight: true },
    ],
    cta: 'Apply for VIP',
    href: '/contact',
    highlighted: false,
  },
]

export default function MembershipComparison() {
  const [billingCycle, setBillingCycle] = useState('monthly')

  return (
    <section className="py-24 px-6 relative overflow-hidden" id="membership">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060F1E]/50 via-transparent to-[#060F1E]/50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 标题 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#C5A572]/10 border border-[#C5A572]/20 rounded-full px-5 py-2 text-sm text-[#C5A572] mb-6">
            <SparklesIcon className="w-5 h-5" />
            <span className="uppercase tracking-wider font-medium">Membership Tiers</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Choose Your <span className="text-gradient">Level of Care</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From free access to full concierge service. Every tier is designed to give you exactly what your family needs.
          </p>
        </div>

        {/* 计费周期切换 */}
        <div className="flex justify-center mb-16">
          <div className="bg-[#0A1628] border border-gray-800 rounded-full p-1 inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                billingCycle === 'monthly' ? 'bg-[#C5A572] text-[#0A1628]' : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                billingCycle === 'annual' ? 'bg-[#C5A572] text-[#0A1628]' : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual <span className="text-xs opacity-75">(Save 15%)</span>
            </button>
          </div>
        </div>

        {/* 三级卡片 */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 border transition-all duration-500 hover:-translate-y-2 ${
                tier.highlighted
                  ? 'border-[#C5A572]/40 bg-[#C5A572]/5 shadow-[0_0_60px_rgba(197,165,114,0.08)] md:scale-105'
                  : 'border-gray-800 bg-[#0A1628]/50 hover:border-gray-700'
              }`}
            >
              {/* 徽章 */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span
                    className={`bg-gradient-to-r ${tier.color} text-[#0A1628] px-5 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap`}
                  >
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* 头部 */}
              <div className="text-center mb-8 pt-2">
                <h3 className="text-xl font-semibold text-white mb-1">{tier.name}</h3>
                <p className="text-gray-500 text-sm">{tier.tagline}</p>
                <div className="my-6">
                  <span className={`text-4xl font-display font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                    {tier.price}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">
                    {billingCycle === 'annual' && tier.price !== 'Free' ? '/month*' : tier.period}
                  </span>
                </div>
                {billingCycle === 'annual' && tier.price !== 'Free' && (
                  <p className="text-xs text-[#C5A572] -mt-4 mb-2">*Billed annually at 15% discount</p>
                )}
                <p className="text-gray-500 text-sm leading-relaxed">{tier.description}</p>
              </div>

              {/* 功能列表 */}
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
                      {feature.text}
                    </span>
                    {feature.highlight && (
                      <span className="ml-auto text-[#C5A572] text-[10px] uppercase tracking-wider font-bold">KEY</span>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={tier.href}
                className={`block text-center py-3 rounded-full font-semibold transition text-sm ${
                  tier.highlighted
                    ? 'btn-gold'
                    : tier.name === 'Basic'
                    ? 'btn-outline-gold'
                    : 'btn-outline-gold'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* 底部署名 */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            All plans include background-checked, professionally trained caregivers.{' '}
            <Link href="/contact" className="text-[#C5A572] hover:underline">
              Contact us
            </Link>{' '}
            for custom enterprise plans.
          </p>
        </div>
      </div>
    </section>
  )
}
