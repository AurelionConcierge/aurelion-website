import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import { HeartIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Head from 'next/head'

const services = [
  { name: '24-Hour Stay-In Care', desc: 'Continuous professional care and companionship around the clock. Perfect for elderly parents, bedridden patients, or anyone needing full-time supervision. Our caregivers live in and become part of the family routine.' },
  { name: 'Post-Hospital Recovery Care', desc: 'Smooth, safe transition from hospital to home. Our nurses manage wound care, medication schedules, mobility exercises, and monitor for complications.' },
  { name: 'Dementia and Alzheimer Care', desc: 'Specialized, compassionate care for loved ones with memory loss. Caregivers trained in dementia communication techniques, safety protocols, and creating calming daily routines.' },
  { name: 'Stroke Rehabilitation', desc: 'Post-stroke recovery program focusing on regaining mobility, speech, and independence. Includes prescribed exercises, medication management, and emotional support.' },
  { name: 'Bedridden Patient Care', desc: 'Complete assistance for immobile patients. Includes feeding, bathing, diaper changing, pressure sore prevention, and passive range-of-motion exercises.' },
  { name: 'Elderly Companion Care', desc: 'Social engagement and daily living assistance for seniors who prefer not to manage medical care alone. Company, meal preparation, light housekeeping, and medication reminders included.' },
  { name: '12-Hour Day/Night Care', desc: 'Dedicated care during waking hours or overnight supervision. Ideal for families who can manage part of the day but need professional help during specific periods.' },
  { name: 'Hourly Flexible Care', desc: 'As-needed assistance. From a few hours of respite care to accompanying your loved one to medical appointments. No minimum commitment.' },
  { name: 'Medication Management', desc: 'Professional oversight of complex medication schedules. We ensure the right medicine at the right time, track side effects, and coordinate with your doctor.' },
  { name: 'Physiotherapy at Home', desc: 'Certified physiotherapists provide rehabilitation sessions in the comfort of your home. Available as an add-on to any care package.' },
  { name: 'Medical Escort Service', desc: 'We accompany your loved one to hospital appointments, dialysis sessions, or check-ups. Transportation can be arranged.' },
  { name: 'Hospital Admission Coordination', desc: 'Full management of hospital admissions and discharges on behalf of the family. Paperwork, doctor communication, and bedside support.' },
]

export default function Services() {
  return (
    <>
      <Head>
        <title>Home Care Services Malaysia | 24-Hour Nursing, Dementia and Stroke Care</title>
        <meta name="description" content="Professional home healthcare services across Malaysia. 24-hour nursing, dementia care, stroke recovery, bedridden patient care, elderly companion. All with concierge-level service. Serving Penang, KL, Melaka, JB." />
        <link rel="canonical" href="https://aurelionconcierge.com/services" />
      </Head>

      <Navbar />
      <main className="pt-24 pb-24 px-6 bg-glow min-h-screen">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            subtitle="Our Expertise"
            title="Complete Home Healthcare Services"
            description="Every service is delivered by trained, background-checked professionals who treat your loved one like family. Available across Penang, KL, Melaka and JB."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="glass-card p-8 group">
                <div className="w-12 h-12 bg-[#C5A572]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#C5A572]/20 transition">
                  <HeartIcon className="w-6 h-6 text-[#C5A572]" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">{s.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link href="/contact" className="btn-gold inline-flex items-center gap-2 text-lg px-8 py-4">
              Enquire About a Service
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
