import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import { StarIcon, ShieldCheckIcon, UserGroupIcon, ClockIcon, DocumentTextIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const features = [
  { icon: UserGroupIcon, title: 'Fixed Caregiver Priority', desc: 'Ensuring continuity and familiarity in care.' },
  { icon: ShieldCheckIcon, title: 'Dedicated Care Manager', desc: 'A single point of contact for seamless coordination.' },
  { icon: ClockIcon, title: 'Priority Scheduling', desc: 'Flexible and immediate arrangement of care services.' },
  { icon: ShieldCheckIcon, title: 'Backup Replacement System', desc: 'Guaranteed support with pre-arranged backup caregivers.' },
  { icon: DocumentTextIcon, title: 'Personalized Care Plan', desc: 'Tailored services to meet unique individual needs.' },
  { icon: BuildingOfficeIcon, title: 'Hospital Coordination Priority', desc: 'Fast-track hospital appointments and admissions.' },
]

export default function VIP() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24 px-6 bg-glow min-h-screen">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            subtitle="Premium Experience"
            title="VIP Concierge Care"
            description="Unmatched consistency, familiarity, and peace of mind. Designed to minimize disruption and ensure continuity."
          />
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((f, i) => (
              <div key={i} className="glass-card p-8 group">
                <div className="w-14 h-14 bg-[#C5A572]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C5A572]/20 transition">
                  <f.icon className="w-7 h-7 text-[#C5A572]" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Pricing CTA */}
          <div className="glass-card p-10 md:p-16 text-center border-[#C5A572]/30">
            <StarIcon className="w-10 h-10 text-[#C5A572] mx-auto mb-4" />
            <h3 className="text-2xl font-display font-semibold mb-6">Monthly VIP Upgrade</h3>
            <p className="text-gray-400 mb-2">Investment for complete peace of mind</p>
            <p className="text-5xl font-display font-bold text-[#C5A572] mb-8">RM800 – 1,500</p>
            <Link href="/contact" className="btn-gold text-lg px-10 py-4 inline-block">
              Apply for VIP Care
            </Link>
            <p className="text-gray-600 text-xs mt-4">Limited availability. Early consultation recommended.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
