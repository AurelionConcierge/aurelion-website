import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import AICareAdvisor from '../components/AICareAdvisor'
import MembershipComparison from '../components/MembershipComparison'
import BookingForm from '../components/BookingForm'
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
        <title>Private Home Healthcare Malaysia | Aurelion Concierge Care</title>
        <meta name="description" content="Premium private home healthcare services in Penang, KL, Melaka & JB. 24-hour care, dementia & stroke recovery, post-hospital care. VIP concierge-level nursing at home. Free consultation." />
        <meta name="keywords" content="home healthcare Malaysia, private nurse Malaysia, dementia care Penang, stroke recovery KL, elderly care JB, home nursing Melaka, 24 hour caregiver, post hospital care Malaysia" />
        <meta property="og:title" content="Private Home Healthcare Malaysia | Aurelion Concierge Care" />
        <meta property="og:description" content="Premium private home healthcare with VIP concierge service. 24-hour managed care across Penang, KL, Melaka & JB." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aurelionconcierge.com" />
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
                  {`Malaysia's Premium Home Healthcare`}
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold leading-tight mb-8">
                  Your Loved Ones<br/>
                  Deserve <span className="text-gradient">World-Class<br/>Care at Home</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
                  Private nursing, elderly care, and post-hospital recovery — delivered with 5-star concierge service across Penang, KL, Melaka, and Johor Bahru.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="#booking" className="btn-gold text-lg px-8 py-4 inline-flex items-center gap-2">
                    Book Free Consultation
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                  <Link href="/services" className="btn-outline-gold text-lg px-8 py-4">
                    View All Services
                  </Link>
                </div>
                <div className="flex items-center gap-6 mt-8 text-gray-500 text-sm">
                  <span className="flex items-center gap-1"><CheckBadgeIcon className="w-4 h-4 text-green-400" /> Licensed Nurses</span>
                  <span className="flex items-center gap-1"><CheckBadgeIcon className="w-4 h-4 text-green-400" /> 24-48hr Deployment</span>
                </div>
              </div>

              <div className="animate-fade-in-up animate-delay-2 grid grid-cols-2 gap-4">
                {[
                  { icon: ClockIcon, stat: '24-48hrs', label: 'Fast Deployment' },
                  { icon: UserGroupIcon, stat: '200+', label: 'Certified Caregivers' },
                  { icon: ShieldCheckIcon, stat: '24/7', label: 'Managed Care' },
                  { icon: HeartIcon, stat: '1,000+', label: 'Families Served' },
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
            <span className="flex items-center gap-2"><CheckBadgeIcon className="w-5 h-5 text-[#C5A572]" /> 100% Confidential</span>
          </div>
        </section>

        {/* ========== SERVICES SECTION ========== */}
        <section id="services" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              subtitle="What We Offer"
              title="Comprehensive Home Care Services"
              description="From hourly companionship to 24-hour specialized nursing, every service is delivered with concierge-level professionalism and compassion."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: '24-Hour Stay-In Care', desc: 'Round-the-clock professional care and companionship for complete peace of mind.' },
                { name: 'Post-Hospital Recovery', desc: 'Smooth transition from hospital to home with skilled nursing support.' },
{ name: 'Dementia Care', desc: 'Specialized, compassionate care for dementia patients and their families.' },                { name: 'Stroke Rehabilitation', desc: 'Dedicated post-stroke recovery focusing on mobility and daily living.' },
                { name: 'Bedridden Patient Care', desc: 'Full assistance including feeding, hygiene, and pressure sore prevention.' },
                { name: 'Elderly Companion Care', desc: 'Social engagement, medication reminders, and daily activity support.' },
                { name: '12-Hour Day/Night Care', desc: 'Focused care during daytime or overnight for safety.' },
                { name: 'Hourly Flexible Care', desc: 'As-needed assistance — perfect for occasional support.' },
                { name: 'Medication Management', desc: 'Timely reminders and professional administration of prescribed medications.' },
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
                View All 10 Services
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========== AI CARE ADVISOR ========== */}
        <AICareAdvisor />

        {/* ========== BOOKING FORM ========== */}
        <BookingForm />

        {/* ========== HOW IT WORKS ========== */}
        <section className="py-24 px-6 bg-[#060F1E]/30">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              subtitle="Simple Process"
              title="How to Get Started"
              description="Three easy steps to bring professional care to your loved one's home."
            />
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Free Consultation', desc: `Tell us your needs via WhatsApp, phone, or our online form. We listen and advise — no obligation.` },
                { step: '02', title: 'Personalized Care Plan', desc: `Our care manager designs a tailored plan matching your loved one's medical needs, language, and personality.` },
                { step: '03', title: 'Care Begins in 24-48 Hours', desc: 'A fully vetted, experienced caregiver arrives at your doorstep, supported by our 24/7 management team.' },
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
              title="Care Packages for Every Need"
              description="No hidden fees. Every sen goes to quality care for your loved one."
            />
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: '24-Hour Stay-In', price: 'RM250-400', unit: '/day', popular: false, features: ['Continuous professional care', 'Ideal for long-term needs', '24/7 management support'] },
                { name: 'Monthly Care Package', price: 'RM6,500-9,000', unit: '/month', popular: true, features: ['Best value for ongoing care', 'Priority caregiver matching', 'Dedicated care manager'] },
                { name: 'Hourly Flexible Care', price: 'RM35-50', unit: '/hour', popular: false, features: ['Pay only for hours needed', 'No long-term commitment', 'Same caregiver where possible'] },
              ].map((pkg, i) => (
                <div key={i} className={`glass-card p-8 text-center relative ${pkg.popular ? 'border-[#C5A572]/40' : ''}`}>
                  {pkg.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#C5A572] to-[#D4B896] text-[#0A1628] px-5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Most Popular
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
                  <Link href="/contact" className="btn-gold w-full block text-center">Get Started</Link>
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
              subtitle="Where We Serve"
              title="Available Across Malaysia"
              description="Our caregivers are ready to deploy across these major cities and surrounding areas."
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { city: 'Penang', area: 'Island & Mainland' },
                { city: 'Kuala Lumpur', area: 'KL & Selangor' },
                { city: 'Melaka', area: 'City & Suburbs' },
                { city: 'Johor Bahru', area: 'JB & Iskandar' },
              ].map((loc, i) => (
                <div key={i} className="glass-card p-6 text-center">
                  <p className="text-lg font-semibold text-white">{loc.city}</p>
                  <p className="text-gray-500 text-xs mt-1">{loc.area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== FINAL CTA ========== */}
        <section className="py-24 px-6 bg-[#060F1E]/50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#C5A572]/10 border border-[#C5A572]/20 rounded-full px-4 py-2 text-xs text-[#C5A572] uppercase tracking-wider mb-6">
              Limited Caregiver Availability
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
              Your Family Deserves the <span className="text-gradient">Very Best Care</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Join 1,000+ Malaysian families who trust Aurelion for their loved ones. Free consultation — no obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/60185959688" target="_blank" className="btn-gold text-lg px-8 py-4 inline-flex items-center gap-2" rel="noreferrer">
                <PhoneIcon className="w-5 h-5" />
                WhatsApp Us Now
              </a>
              <Link href="/contact" className="btn-outline-gold text-lg px-8 py-4">
                Other Ways to Reach Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
