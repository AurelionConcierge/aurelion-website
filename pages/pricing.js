import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import { CheckBadgeIcon, StarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const packages = [
  {
    name: 'Hourly Care',
    price: 'RM35–50',
    unit: '/hour',
    desc: 'Flexible support as needed',
    features: ['As needed basis', 'Flexible scheduling', 'No long-term commitment', 'Professional caregivers'],
    popular: false,
  },
  {
    name: '24-Hour Stay-In',
    price: 'RM250–400',
    unit: '/day',
    desc: 'Continuous care around the clock',
    features: ['24/7 continuous care', 'Companionship included', 'Long-term stability', 'Managed care system'],
    popular: false,
  },
  {
    name: 'Monthly Package',
    price: 'RM6,500–9,000',
    unit: '/month',
    desc: 'Best for families seeking long-term care',
    features: ['Cost effective', 'Priority deployment', 'Dedicated care manager', 'Full care coordination'],
    popular: true,
  },
]

const addons = [
  'Nursing Procedures – Professional nursing care and treatments',
  'Physiotherapy – Certified physiotherapist (separate service)',
  'Medical Escort – Hospital appointment support',
  'Hospital Coordination – Admission & appointment management',
]

export default function Pricing() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24 px-6 bg-glow min-h-screen">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            subtitle="Transparent Pricing"
            title="Flexible Care Packages"
            description="No hidden fees. Every package is tailored to your loved one's needs."
          />
          
          {/* Price Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {packages.map((pkg, i) => (
              <div key={i} className={`glass-card p-8 text-center relative ${pkg.popular ? 'border-[#C5A572]/50 shadow-[0_0_40px_rgba(197,165,114,0.08)]' : ''}`}>
                {pkg.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#C5A572] to-[#D4B896] text-[#0A1628] px-5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <StarIcon className="w-3 h-3" /> Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold mb-1 text-white">{pkg.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{pkg.desc}</p>
                <div className="my-6">
                  <span className="text-4xl font-display font-bold text-[#C5A572]">{pkg.price}</span>
                  <span className="text-gray-500 text-sm ml-1">{pkg.unit}</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-gray-400 text-left">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <CheckBadgeIcon className="w-4 h-4 text-[#C5A572] flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-gold w-full block text-center">Enquire Now</Link>
              </div>
            ))}
          </div>

          {/* Add-On Services */}
          <div className="glass-card p-10 md:p-16">
            <h3 className="text-2xl font-display font-semibold mb-4 text-[#C5A572]">Enhance Your Care</h3>
            <p className="text-gray-400 mb-8">Add-on services to complete the care experience</p>
            <div className="grid md:grid-cols-2 gap-4">
              {addons.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckBadgeIcon className="w-5 h-5 text-[#C5A572] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{a}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-6">* Add-on services are arranged upon request. Prices vary based on requirements.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
