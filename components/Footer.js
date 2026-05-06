import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#060F1E] border-t border-[#C5A572]/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#C5A572] to-[#E2C99D] rounded-lg flex items-center justify-center">
                <span className="text-[#0A1628] font-bold text-sm">A</span>
              </div>
              <span className="text-lg font-display font-semibold text-[#C5A572]">AURELION</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Private Care. Elevated to a<br/>Concierge Experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <Link href="/services" className="block hover:text-[#C5A572] transition">24-Hour Care</Link>
              <Link href="/services" className="block hover:text-[#C5A572] transition">Dementia Care</Link>
              <Link href="/services" className="block hover:text-[#C5A572] transition">Stroke Recovery</Link>
              <Link href="/services" className="block hover:text-[#C5A572] transition">Post-Hospital Care</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <Link href="/vip" className="block hover:text-[#C5A572] transition">VIP Program</Link>
              <Link href="/pricing" className="block hover:text-[#C5A572] transition">Pricing</Link>
              <Link href="/contact" className="block hover:text-[#C5A572] transition">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <p>+60 18 595 9688</p>
              <p>care@aurelionconcierge.com</p>
              <p className="mt-3 text-xs text-gray-600">
                Penang · Kuala Lumpur · Melaka · Johor Bahru
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#C5A572]/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© 2026 Aurelion Concierge Care. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="/privacy" className="hover:text-[#C5A572] transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#C5A572] transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
