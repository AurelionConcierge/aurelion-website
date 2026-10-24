import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'
import { useLang } from '../lib/i18n'
import { CITIES, COVERAGE, WHATSAPP_NUMBER } from '../lib/content'

export default function Contact() {
  const { t } = useLang()
  return (
    <>
      <Head>
        <title>Contact Aurelion | Free Home Care Consultation Malaysia &amp; Singapore</title>
        <meta name="description" content="Contact Aurelion Concierge Care for a free, no-obligation consultation. WhatsApp, call, or email us. We serve all of Peninsular Malaysia and Singapore. Response within 5 minutes." />
        <link rel="canonical" href="https://aurelionconcierge.com/contact" />
      </Head>

      <Navbar />
      <main className="pt-24 pb-24 px-6 bg-glow min-h-screen">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            subtitle={t({ en: 'Get In Touch', zh: '联系我们', ms: 'Hubungi Kami' })}
            title={t({ en: "Let's Discuss Your Care Needs", zh: '一起讨论您的护理需要', ms: 'Mari Bincang Keperluan Penjagaan Anda' })}
            description={t({
              en: "Free consultation. No obligation. We're here to help you find the best care solution for your loved one.",
              zh: '免费咨询，没有任何义务。我们会帮您为亲人找到最合适的照护方案。',
              ms: 'Konsultasi percuma. Tanpa obligasi. Kami sedia membantu anda mencari penyelesaian penjagaan terbaik untuk insan tersayang.',
            })}
          />

          <div className="space-y-6">
            {/* WhatsApp - 最突出 */}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="glass-card p-6 sm:p-8 flex items-center gap-4 sm:gap-6 hover:border-green-500/50 transition group border-green-500/20" rel="noreferrer">
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover:bg-green-500/20 transition">
                <PhoneIcon className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-left flex-1">
                <p className="text-sm text-green-400 font-medium">{t({ en: 'Fastest Response', zh: '回复最快', ms: 'Respons Terpantas' })}</p>
                <p className="text-xl font-semibold text-white">{t({ en: 'WhatsApp Us', zh: 'WhatsApp 联系我们', ms: 'WhatsApp Kami' })}</p>
                <p className="text-gray-400 text-sm">+60 18 595 9688</p>
              </div>
              <span className="hidden sm:inline text-green-400 text-sm font-medium">{t({ en: 'Usually <5 min →', zh: '通常 5 分钟内 →', ms: 'Biasanya <5 min →' })}</span>
            </a>

            {/* Phone */}
            <a href="tel:+60185959688" className="glass-card p-6 sm:p-8 flex items-center gap-4 sm:gap-6 hover:border-[#C5A572]/50 transition group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-[#C5A572]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#C5A572]/20 transition">
                <PhoneIcon className="w-8 h-8 text-[#C5A572]" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400">{t({ en: 'Phone Call', zh: '电话', ms: 'Panggilan Telefon' })}</p>
                <p className="text-xl font-semibold text-white">+60 18 595 9688</p>
                <p className="text-gray-500 text-sm">{t({ en: 'Mon-Sun, 8am-10pm', zh: '星期一至日，早上 8 点至晚上 10 点', ms: 'Isnin-Ahad, 8pg-10mlm' })}</p>
              </div>
            </a>

            {/* Email */}
            <a href="mailto:care@aurelionconcierge.com" className="glass-card p-6 sm:p-8 flex items-center gap-4 sm:gap-6 hover:border-[#C5A572]/50 transition group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-[#C5A572]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#C5A572]/20 transition">
                <EnvelopeIcon className="w-8 h-8 text-[#C5A572]" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-sm text-gray-400">{t({ en: 'Email Us', zh: '电邮', ms: 'E-mel Kami' })}</p>
                <p className="text-lg sm:text-xl font-semibold text-white break-all">care@aurelionconcierge.com</p>
                <p className="text-gray-500 text-sm">{t({ en: 'We reply within 2 hours', zh: '2 小时内回复', ms: 'Kami membalas dalam 2 jam' })}</p>
              </div>
            </a>

            {/* 营业时间 & 地点 */}
            <div className="glass-card p-8">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <ClockIcon className="w-5 h-5 text-[#C5A572]" />
                    <span className="text-white font-semibold">{t({ en: 'Operating Hours', zh: '营业时间', ms: 'Waktu Operasi' })}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{t({ en: 'Monday - Sunday', zh: '星期一至星期日', ms: 'Isnin - Ahad' })}</p>
                  <p className="text-gray-400 text-sm">8:00 AM - 10:00 PM</p>
                  <p className="text-gray-600 text-xs mt-2">{t({ en: 'Care services operate 24/7', zh: '护理服务 24/7 运作', ms: 'Perkhidmatan penjagaan beroperasi 24/7' })}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPinIcon className="w-5 h-5 text-[#C5A572]" />
                    <span className="text-white font-semibold">{t({ en: 'Service Areas', zh: '服务地区', ms: 'Kawasan Perkhidmatan' })}</span>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    {CITIES.map((c, i) => (
                      <p key={i} className="text-gray-400">
                        📍 <span className="text-gray-300">{t(c.city)}</span>
                        <span className="text-gray-500"> — {t(c.area)}</span>
                      </p>
                    ))}
                  </div>
                  <p className="text-gray-600 text-xs mt-3">{t(COVERAGE.notServed)}</p>
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
