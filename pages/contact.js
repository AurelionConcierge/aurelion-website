import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24 px-6 bg-glow min-h-screen">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            subtitle="Get In Touch"
            title="Contact Us"
            description="Limited availability for premium care arrangements. Early consultation is recommended."
          />
          
          <div className="space-y-6">
            {/* WhatsApp */}
            <a href="https://wa.me/60185959688" target="_blank" className="glass-card p-8 flex items-center gap-6 hover:border-[#C5A572]/50 transition group">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover:bg-green-500/20 transition">
                <PhoneIcon className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400">WhatsApp</p>
                <p className="text-xl font-semibold text-white">+60 18 595 9688</p>
              </div>
            </a>

            {/* Phone */}
            <div className="glass-card p-8 flex items-center gap-6 hover:border-[#C5A572]/50 transition group">
              <div className="w-16 h-16 bg-[#C5A572]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#C5A572]/20 transition">
                <PhoneIcon className="w-8 h-8 text-[#C5A572]" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-xl font-semibold text-white">+60 18 595 9688</p>
              </div>
            </div>

            {/* Email */}
            <a href="mailto:care@aurelionconcierge.com" className="glass-card p-8 flex items-center gap-6 hover:border-[#C5A572]/50 transition group">
              <div className="w-16 h-16 bg-[#C5A572]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#C5A572]/20 transition">
                <EnvelopeIcon className="w-8 h-8 text-[#C5A572]" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-xl font-semibold text-white">care@aurelionconcierge.com</p>
              </div>
            </a>

            {/* Locations */}
            <div className="glass-card p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <MapPinIcon className="w-6 h-6 text-[#C5A572]" />
                <span className="text-white font-semibold">Service Areas</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-400">
                <span>Penang</span>
                <span>Kuala Lumpur</span>
                <span>Melaka</span>
                <span>Johor Bahru</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
