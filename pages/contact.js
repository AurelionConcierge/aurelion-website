import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Aurelion | Free Home Care Consultation Malaysia</title>
        <meta name="description" content="Contact Aurelion Concierge Care for a free, no-obligation consultation. WhatsApp, call, or email us. We serve Penang, KL, Melaka & Johor Bahru. Response within 5 minutes." />
        <link rel="canonical" href="https://aurelionconcierge.com/contact" />
      </Head>

      <Navbar />
      <main className="pt-24 pb-24 px-6 bg-glow min-h-screen">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            subtitle="Get In Touch"
            title="Let's Discuss Your Care Needs"
            description="Free consultation. No obligation. We're here to help you find the best care solution for your loved one."
          />

          <div className="space-y-6">
            {/* WhatsApp - 最突出 */}
            <a href="https://wa.me/60185959688" target="_blank" className="glass-card p-8 flex items-center gap-6 hover:border-green-500/50 transition group border-green-500/20" rel="noreferrer">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover:bg-green-500/20 transition">
                <PhoneIcon className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-left flex-1">
                <p className="text-sm text-green-400 font-medium">Fastest Response</p>
                <p className="text-xl font-semibold text-white">WhatsApp Us</p>
                <p className="text-gray-400 text-sm">+60 18 595 9688</p>
              </div>
              <span className="text-green-400 text-sm font-medium">Usually &lt;5 min →</span>
            </a>

            {/* Phone */}
            <a href="tel:+60185959688" className="glass-card p-8 flex items-center gap-6 hover:border-[#C5A572]/50 transition group">
              <div className="w-16 h-16 bg-[#C5A572]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#C5A572]/20 transition">
                <PhoneIcon className="w-8 h-8 text-[#C5A572]" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400">Phone Call</p>
                <p className="text-xl font-semibold text-white">+60 18 595 9688</p>
                <p className="text-gray-500 text-sm">Mon-Sun, 8am-10pm</p>
              </div>
            </a>

            {/* Email */}
            <a href="mailto:care@aurelionconcierge.com" className="glass-card p-8 flex items-center gap-6 hover:border-[#C5A572]/50 transition group">
              <div className="w-16 h-16 bg-[#C5A572]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#C5A572]/20 transition">
                <EnvelopeIcon className="w-8 h-8 text-[#C5A572]" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400">Email Us</p>
                <p className="text-xl font-semibold text-white">care@aurelionconcierge.com</p>
                <p className="text-gray-500 text-sm">We reply within 2 hours</p>
              </div>
            </a>

            {/* 营业时间 & 地点 */}
            <div className="glass-card p-8">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <ClockIcon className="w-5 h-5 text-[#C5A572]" />
                    <span className="text-white font-semibold">Operating Hours</span>
                  </div>
                  <p className="text-gray-400 text-sm">Monday - Sunday</p>
                  <p className="text-gray-400 text-sm">8:00 AM - 10:00 PM</p>
                  <p className="text-gray-600 text-xs mt-2">Care services operate 24/7</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPinIcon className="w-5 h-5 text-[#C5A572]" />
                    <span className="text-white font-semibold">Service Areas</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-gray-400 text-sm">
                    <span>📍 Penang</span>
                    <span>📍 Kuala Lumpur</span>
                    <span>📍 Melaka</span>
                    <span>📍 Johor Bahru</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
