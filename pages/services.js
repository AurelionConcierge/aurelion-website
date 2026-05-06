import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import { HeartIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const services = [
  { name: '24-Hour Stay-In Care', desc: 'Continuous support and companionship around the clock. Designed for families seeking long-term stability and consistent care.' },
  { name: '12-Hour Care', desc: 'Focused assistance during specific periods. Ideal for daytime or specific-need care within a 12-hour period.' },
  { name: 'Hourly Care', desc: 'Flexible care services available on an as-needed basis.' },
  { name: 'Stroke Care', desc: 'Specialized care for post-stroke recovery and adaptation.' },
  { name: 'Dementia Care', desc: 'Compassionate and understanding support for individuals with dementia.' },
  { name: 'Bedridden Care', desc: 'Comprehensive care for those with limited mobility.' },
  { name: 'Post-Hospital Recovery', desc: 'Assistance to ensure a smooth recovery at home.' },
  { name: 'Night Care', desc: 'Overnight support for safety and peace of mind.' },
  { name: 'Mobility & Rehabilitation Support', desc: 'Aids in movement and recovery exercises.' },
  { name: 'Medication Assistance', desc: 'Reminders and help with taking medications as prescribed.' },
  { name: 'Nursing Procedures', desc: 'Professional nursing care and treatments (by arrangement).' },
  { name: 'Physiotherapy', desc: 'Provided by certified physiotherapists. Separate professional service.' },
  { name: 'Medical Escort', desc: 'Assistance and support during medical appointments or hospital visits.' },
  { name: 'Hospital Coordination', desc: 'Seamless management of hospital appointments and admissions.' },
]

export default function Services() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24 px-6 bg-glow min-h-screen">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            subtitle="What We Offer"
            title="Our Services"
            description="Every service is delivered with concierge-level attention, ensuring dignity, respect, and professional excellence."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="glass-card p-8 group">
                <div className="w-12 h-12 bg-[#C5A572]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#C5A572]/20 transition">
                  <HeartIcon className="w-6 h-6 text-[#C5A572]" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{s.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link href="/pricing" className="btn-gold inline-flex items-center gap-2 text-lg px-8 py-4">
              View Transparent Pricing
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
