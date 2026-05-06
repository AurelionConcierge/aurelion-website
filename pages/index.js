import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import AICareAdvisor from '../components/AICareAdvisor'
import MembershipComparison from '../components/MembershipComparison'
import {
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  HeartIcon,
  SparklesIcon,
  PhoneIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <>
      <Head>
        <title>Aurelion Concierge Care | Premium Private Home Healthcare in Malaysia</title>
        <meta name="description" content="Luxury private home healthcare with VIP concierge service. 24-hour managed care, immediate deployment within 24-48 hours across Penang, KL, Melaka, JB." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="overflow-hidden">
        {/* ========== HERO SECTION ========== */}
        <section className="relative min-h-screen flex items-center bg-glow pt-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#C5A572]/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#C5A572]/3 to-transparent rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-6 py-20 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 bg-[#C5A572]/10 border border-[#C5A572]/20 rounded-full px-4 py-2 text-xs text-[#C5A572] uppercase tracking-wider mb-8">
                  <SparklesIcon className="w-4 h-4" />
                  Premium Concierge Healthcare
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold leading-tight mb-8">
                  Because Your<br/>
                  Loved Ones Deserve{' '}
                  <span className="text-gradient">Exceptional<br/>Care</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
                  Private Care. Elevated to a Concierge Experience.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="btn-gold text-lg px-8 py-4 inline-flex items-center gap-2">
                    Book Consultation
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                  <Link href="/services" className="btn-outline-gold text-lg px-8 py-4">
                    Explore Services
                  </Link>
                </div>
              </div>

              <div className="animate-fade-in-up animate-delay-2 grid grid-cols-2 gap-4">
                {[
                  { icon: ClockIcon, stat: '24-48hrs', label: 'Immediate Deployment' },
                  { icon: UserGroupIcon, stat: '100+', label: 'Certified Caregivers' },
                  { icon: ShieldCheckIcon, stat: '24/7', label: 'Managed Care System' },
                  { icon: HeartIcon, stat: '500+', label: 'Families Served' },
                ].map((item, i) => (
                  <div key={i} className="glass-card p-6 text-center">
                    <item.icon className="w-8 h-8 text-[#C5A572] mx-auto mb-3" />
                    <p className="stat-number text-2xl">{item.stat}</p>
                    <p className="text-gray-500 text-xs mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== TRUST STRIP ========== */}
        <section className="border-y border-[#C5A572]/10 py-8 bg-[#060F1E]/50">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 text-gray-500 text-sm uppercase tracking-widest">
            <span className="flex items-center gap-2"><CheckBadgeIcon className="w-5 h-5 text-[#C5A572]" /> Licensed & Insured</span>
            <span className="flex items-center gap-2"><CheckBadgeIcon className="w-5 h-5 text-[#C5A572]" /> Background Checked</span>
            <span className="flex items-center gap-2"><CheckBadgeIcon className="w-5 h-5 text-[#C5A572]" /> Medical Professionals</span>
            <span className="flex items-center gap-2"><CheckBadgeIcon className="w-5 h-5 text-[#C5A572]" /> Confidential Care</span>
          </div>
        </section>

        {/* ========== SERVICES SECTION ========== */}
        <section id="services" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              subtitle="What We Offer"
              title="Comprehensive Care Solutions"
              description="From hourly assistance to 24-hour managed care, every service is delivered with concierge-level attention to detail."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: '24-Hour Stay-In Care', desc: 'Continuous support and companionship around the clock.' },
                { name: '12-Hour Care', desc: 'Focused assistance during specific periods.' },
                { name: 'Hourly Care', desc: 'Flexible support as needed.' },
                { name: 'Stroke Care', desc: 'Specialized post-stroke recovery and adaptation.' },
                { name: 'Dementia Care', desc: 'Compassionate support for individuals with dementia.' },
                { name: 'Bedridden Care', desc: 'Comprehensive care for limited mobility.' },
                { name: 'Post-Hospital Recovery', desc: 'Smooth recovery at home after discharge.' },
                { name: 'Night Care', desc: 'Overnight support for safety and peace of mind.' },
                { name: 'Medication Assistance', desc: 'Reminders and help with prescribed medications.' },
              ].map((service, i) => (
                <div key={i} className="glass-card p-8 group cursor-pointer">
                  <div className="w-12 h-12 bg-[#C5A572]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#C5A572]/20 transition">
                    <HeartIcon className="w-6 h-6 text-[#C5A572]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{service.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/services" className="btn-outline-gold inline-flex items-center gap-2">
                View All Services
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========== AI CARE ADVISOR ========== */}
        <AICareAdvisor />

        {/* ========== HOW IT WORKS ========== */}
        <section className="py-24 px-6 bg-[#060F1E]/30">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              subtitle="Our Process"
              title="How It Works"
              description="An efficient and clear process from start to finish."
            />
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Free Consultation', desc: 'Share your needs via phone, WhatsApp, or our online form. We listen carefully.' },
                { step: '02', title: 'Personalized Care Plan', desc: 'Our team creates a tailored care plan matching your specific requirements.' },
                { step: '03', title: 'Care Begins Within 48 Hours', desc: 'A vetted, professional caregiver is deployed to your home swiftly.' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#C5A572] to-[#E2C99D] rounded-full flex items-center justify-center mx-auto mb-6 text-[#0A1628] text-2xl font-display font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== PRICING PREVIEW ========== */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              subtitle="Transparent Pricing"
              title="Flexible Care Packages"
              description="Designed to meet your specific needs with no hidden costs."
            />
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: '24-Hour Stay-In', price: 'RM250-400', unit: '/day', popular: false, features: ['Continuous care', 'Best for long-term', 'Managed system'] },
                { name: 'Monthly Package', price: 'RM6,500-9,000', unit: '/month', popular: true, features: ['Most popular', 'Cost effective', 'Priority deployment'] },
                { name: 'Hourly Care', price: 'RM35-50', unit: '/hour', popular: false, features: ['As needed', 'Flexible schedule', 'No commitment'] },
              ].map((pkg, i) => (
                <div key={i} className={`glass-card p-8 text-center relative ${pkg.popular ? 'border-[#C5A572]/40' : ''}`}>
                  {pkg.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#C5A572] to-[#D4B896] text-[#0A1628] px-5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Popular
                    </span>
                  )}
                  <h3 className="text-xl font-semibold mb-2 text-white">{pkg.name}</h3>
                  <div className="my-6">
                    <span className="text-4xl font-display font-bold text-[#C5A572]">{pkg.price}</span>
                    <span className="text-gray-500 text-sm ml-1">{pkg.unit}</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm text-gray-400">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-center justify-center gap-2">
                        <CheckBadgeIcon className="w-4 h-4 text-[#C5A572]" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-gold w-full block text-center">Enquire Now</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== MEMBERSHIP COMPARISON ========== */}
        <MembershipComparison />

        {/* ========== LOCATIONS ========== */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              subtitle="Service Areas"
              title="Available Across Malaysia"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Penang', 'Kuala Lumpur', 'Melaka', 'Johor Bahru'].map((city, i) => (
                <div key={i} className="glass-card p-6 text-center">
                  <p className="text-lg font-semibold text-white">{city}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== FINAL CTA ========== */}
        <section className="py-24 px-6 bg-[#060F1E]/50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#C5A572]/10 border border-[#C5A572]/20 rounded-full px-4 py-2 text-xs text-[#C5A572] uppercase tracking-wider mb-6">
              Limited Availability
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
              Ready to Experience <span className="text-gradient">Exceptional Care</span>?
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Early consultation is recommended. Our premium care arrangements are limited.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/60185959688" target="_blank" className="btn-gold text-lg px-8 py-4 inline-flex items-center gap-2" rel="noreferrer">
                <PhoneIcon className="w-5 h-5" />
                WhatsApp Us
              </a>
              <Link href="/contact" className="btn-outline-gold text-lg px-8 py-4">
                Contact Page
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
