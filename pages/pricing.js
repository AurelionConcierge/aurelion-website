import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import PromoPopup from '../components/PromoPopup'
import { CheckBadgeIcon, StarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useLang } from '../lib/i18n'

const packages = [
  {
    name: { en: 'Hourly Care', zh: '按小时护理', ms: 'Penjagaan Mengikut Jam' },
    price: 'RM35–50',
    unit: { en: '/hour', zh: '/小时', ms: '/jam' },
    desc: { en: 'Flexible support as needed', zh: '按需提供弹性协助', ms: 'Sokongan fleksibel mengikut keperluan' },
    features: [
      { en: 'As needed basis', zh: '按需安排', ms: 'Mengikut keperluan' },
      { en: 'Flexible scheduling', zh: '时间安排灵活', ms: 'Jadual fleksibel' },
      { en: 'No long-term commitment', zh: '无需长期合约', ms: 'Tiada komitmen jangka panjang' },
      { en: 'Professional caregivers', zh: '专业护理员', ms: 'Penjaga profesional' },
    ],
    popular: false,
  },
  {
    name: { en: '24-Hour Stay-In', zh: '24小时住家看护', ms: 'Tinggal Bersama 24 Jam' },
    price: 'RM250–400',
    unit: { en: '/day', zh: '/天', ms: '/hari' },
    desc: { en: 'Continuous care around the clock', zh: '全天候不间断照护', ms: 'Penjagaan berterusan sepanjang masa' },
    features: [
      { en: '24/7 continuous care', zh: '24/7 不间断照护', ms: 'Penjagaan berterusan 24/7' },
      { en: 'Companionship included', zh: '包括陪伴', ms: 'Termasuk teman' },
      { en: 'Long-term stability', zh: '长期稳定', ms: 'Kestabilan jangka panjang' },
      { en: 'Managed care system', zh: '有系统的护理管理', ms: 'Sistem penjagaan terurus' },
    ],
    popular: false,
  },
  {
    name: { en: 'Monthly Package', zh: '月配套', ms: 'Pakej Bulanan' },
    price: 'RM6,500–9,000',
    unit: { en: '/month', zh: '/月', ms: '/bulan' },
    desc: { en: 'Best for families seeking long-term care', zh: '最适合需要长期照护的家庭', ms: 'Terbaik untuk keluarga yang mencari penjagaan jangka panjang' },
    features: [
      { en: 'Cost effective', zh: '更划算', ms: 'Jimat kos' },
      { en: 'Priority deployment', zh: '优先安排', ms: 'Penempatan keutamaan' },
      { en: 'Dedicated care manager', zh: '专属护理经理', ms: 'Pengurus penjagaan khusus' },
      { en: 'Full care coordination', zh: '全面护理协调', ms: 'Penyelarasan penjagaan penuh' },
    ],
    popular: true,
  },
]

const addons = [
  { en: 'Nursing Procedures – Professional nursing care and treatments', zh: '护理程序 – 专业护理与治疗', ms: 'Prosedur Kejururawatan – Rawatan dan penjagaan kejururawatan profesional' },
  { en: 'Physiotherapy – Certified physiotherapist (separate service)', zh: '物理治疗 – 合格物理治疗师（另行收费）', ms: 'Fisioterapi – Ahli fisioterapi bertauliah (perkhidmatan berasingan)' },
  { en: 'Medical Escort – Hospital appointment support', zh: '陪同就医 – 陪同前往医院复诊', ms: 'Iringan Perubatan – Sokongan temujanji hospital' },
  { en: 'Hospital Coordination – Admission & appointment management', zh: '医院协调 – 住院及预约安排', ms: 'Penyelarasan Hospital – Pengurusan kemasukan & temujanji' },
]

export default function Pricing() {
  const { t } = useLang()

  return (
    <>
      <Head>
        <title>Home Care Pricing Malaysia | Aurelion Concierge Care</title>
        <meta name="description" content="Transparent home care pricing in Malaysia. Hourly care from RM35, 24-hour stay-in care from RM250/day, monthly packages available. No hidden fees." />
        <link rel="canonical" href="https://aurelionconcierge.com/pricing" />
      </Head>
      <Navbar />
      <PromoPopup bookingHref="/#booking" />
      <main className="pt-24 pb-24 px-6 bg-glow min-h-screen">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            subtitle={t({ en: 'Transparent Pricing', zh: '价格透明', ms: 'Harga Telus' })}
            title={t({ en: 'Flexible Care Packages', zh: '弹性护理配套', ms: 'Pakej Penjagaan Fleksibel' })}
            description={t({
              en: "No hidden fees. Every package is tailored to your loved one's needs.",
              zh: '没有隐藏收费，每个配套都按亲人的需要量身定制。',
              ms: 'Tiada caj tersembunyi. Setiap pakej disesuaikan mengikut keperluan insan tersayang anda.',
            })}
          />

          {/* Price Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {packages.map((pkg, i) => (
              <div key={i} className={`glass-card p-8 text-center relative ${pkg.popular ? 'border-[#C5A572]/50 shadow-[0_0_40px_rgba(197,165,114,0.08)]' : ''}`}>
                {pkg.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#C5A572] to-[#D4B896] text-[#0A1628] px-5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
                    <StarIcon className="w-3 h-3" /> {t({ en: 'Popular', zh: '热门', ms: 'Popular' })}
                  </span>
                )}
                <h3 className="text-xl font-semibold mb-1 text-white">{t(pkg.name)}</h3>
                <p className="text-gray-500 text-sm mb-6">{t(pkg.desc)}</p>
                <div className="my-6">
                  <span className="text-4xl font-display font-bold text-[#C5A572]">{pkg.price}</span>
                  <span className="text-gray-500 text-sm ml-1">{t(pkg.unit)}</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-gray-400 text-left">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <CheckBadgeIcon className="w-4 h-4 text-[#C5A572] flex-shrink-0" /> {t(f)}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-gold w-full block text-center">{t({ en: 'Enquire Now', zh: '立即咨询', ms: 'Tanya Sekarang' })}</Link>
              </div>
            ))}
          </div>

          {/* Add-On Services */}
          <div className="glass-card p-10 md:p-16">
            <h3 className="text-2xl font-display font-semibold mb-4 text-[#C5A572]">{t({ en: 'Enhance Your Care', zh: '附加服务', ms: 'Tingkatkan Penjagaan Anda' })}</h3>
            <p className="text-gray-400 mb-8">{t({ en: 'Add-on services to complete the care experience', zh: '让照护更完整的附加服务', ms: 'Perkhidmatan tambahan untuk melengkapkan pengalaman penjagaan' })}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {addons.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckBadgeIcon className="w-5 h-5 text-[#C5A572] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t(a)}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-6">
              {t({
                en: '* Add-on services are arranged upon request. Prices vary based on requirements.',
                zh: '* 附加服务按要求安排，价格视需要而定。',
                ms: '* Perkhidmatan tambahan diaturkan atas permintaan. Harga berbeza mengikut keperluan.',
              })}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
