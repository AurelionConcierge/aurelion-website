import Link from 'next/link'
import { useLang } from '../lib/i18n'
import { COVERAGE } from '../lib/content'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="bg-[#060F1E] border-t border-[#C5A572]/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo-ac.png" alt="" width="48" height="36" className="h-9 w-auto" />
              <span className="text-lg font-display font-semibold text-[#C5A572]">AURELION</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t({
                en: 'Private Care. Elevated to a Concierge Experience.',
                zh: '私人护理，提升至礼宾级体验。',
                ms: 'Penjagaan Peribadi. Dipertingkat ke Pengalaman Concierge.',
              })}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t({ en: 'Services', zh: '服务', ms: 'Perkhidmatan' })}</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <Link href="/services" className="block hover:text-[#C5A572] transition">{t({ en: '24-Hour Care', zh: '24小时看护', ms: 'Penjagaan 24 Jam' })}</Link>
              <Link href="/services" className="block hover:text-[#C5A572] transition">{t({ en: 'Dementia Care', zh: '失智症护理', ms: 'Penjagaan Demensia' })}</Link>
              <Link href="/services" className="block hover:text-[#C5A572] transition">{t({ en: 'Stroke Recovery', zh: '中风康复', ms: 'Pemulihan Strok' })}</Link>
              <Link href="/services" className="block hover:text-[#C5A572] transition">{t({ en: 'Post-Hospital Care', zh: '出院后护理', ms: 'Penjagaan Selepas Hospital' })}</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t({ en: 'Company', zh: '关于我们', ms: 'Syarikat' })}</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <Link href="/vip" className="block hover:text-[#C5A572] transition">{t({ en: 'VIP Program', zh: 'VIP 计划', ms: 'Program VIP' })}</Link>
              <Link href="/pricing" className="block hover:text-[#C5A572] transition">{t({ en: 'Pricing', zh: '价格', ms: 'Harga' })}</Link>
              <Link href="/contact" className="block hover:text-[#C5A572] transition">{t({ en: 'Contact', zh: '联系我们', ms: 'Hubungi' })}</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t({ en: 'Contact', zh: '联系方式', ms: 'Hubungi' })}</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <p>+60 18 595 9688</p>
              <p>care@aurelionconcierge.com</p>
              <p className="mt-3 text-xs text-gray-600">
                {t(COVERAGE.short)}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#C5A572]/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© 2026 Aurelion Concierge Care. {t({ en: 'All rights reserved.', zh: '版权所有。', ms: 'Hak cipta terpelihara.' })}</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="/privacy" className="hover:text-[#C5A572] transition">{t({ en: 'Privacy Policy', zh: '隐私政策', ms: 'Dasar Privasi' })}</Link>
            <Link href="/terms" className="hover:text-[#C5A572] transition">{t({ en: 'Terms of Service', zh: '服务条款', ms: 'Terma Perkhidmatan' })}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
