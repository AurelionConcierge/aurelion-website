import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import AICareAdvisor from '../components/AICareAdvisor'
import MembershipComparison from '../components/MembershipComparison'
import BookingForm from '../components/BookingForm'
import PromoPopup from '../components/PromoPopup'
import SmartImage from '../components/SmartImage'
import { useLang } from '../lib/i18n'
import { IMAGES, OG_IMAGE } from '../lib/images'
import { SERVICES, HOME_SERVICE_KEYS, CITIES, WHATSAPP_NUMBER } from '../lib/content'
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
  const { t } = useLang()

  const stats = [
    { icon: ClockIcon, stat: '24-48hrs', label: { en: 'Fast Deployment', zh: '快速安排', ms: 'Penempatan Pantas' } },
    { icon: UserGroupIcon, stat: '200+', label: { en: 'Certified Caregivers', zh: '认证护理员', ms: 'Penjaga Bertauliah' } },
    { icon: ShieldCheckIcon, stat: '24/7', label: { en: 'Managed Care', zh: '全天候管理', ms: 'Penjagaan Terurus' } },
    { icon: HeartIcon, stat: '1,000+', label: { en: 'Families Served', zh: '服务家庭', ms: 'Keluarga Dilayani' } },
  ]

  const trust = [
    { en: 'Licensed & Insured', zh: '持牌并已投保', ms: 'Berlesen & Berinsurans' },
    { en: 'Background Checked', zh: '背景审查', ms: 'Semakan Latar Belakang' },
    { en: 'Medical Professionals', zh: '医疗专业人员', ms: 'Profesional Perubatan' },
    { en: '100% Confidential', zh: '绝对保密', ms: '100% Sulit' },
  ]

  const steps = [
    {
      step: '01',
      title: { en: 'Free Consultation', zh: '免费咨询', ms: 'Konsultasi Percuma' },
      desc: {
        en: 'Tell us your needs via WhatsApp, phone, or our online form. We listen and advise, with no obligation.',
        zh: '通过 WhatsApp、电话或网上表格告诉我们您的需要。我们会耐心聆听并给出建议，没有任何义务。',
        ms: 'Beritahu keperluan anda melalui WhatsApp, telefon atau borang dalam talian. Kami mendengar dan menasihati tanpa sebarang obligasi.',
      },
    },
    {
      step: '02',
      title: { en: 'Personalized Care Plan', zh: '个人化护理计划', ms: 'Pelan Penjagaan Peribadi' },
      desc: {
        en: "Our care manager designs a tailored plan matching your loved one's medical needs, language, and personality.",
        zh: '护理经理会根据亲人的医疗需要、语言和性格，量身制定护理计划。',
        ms: 'Pengurus penjagaan kami merangka pelan khusus mengikut keperluan perubatan, bahasa dan personaliti insan tersayang anda.',
      },
    },
    {
      step: '03',
      title: { en: 'Care Begins in 24-48 Hours', zh: '24-48 小时内开始照护', ms: 'Penjagaan Bermula Dalam 24-48 Jam' },
      desc: {
        en: 'A fully vetted, experienced caregiver arrives at your doorstep, supported by our 24/7 management team.',
        zh: '经过严格审核、经验丰富的护理员上门服务，背后有我们 24/7 的管理团队支援。',
        ms: 'Penjaga berpengalaman yang telah disaring sepenuhnya tiba di pintu rumah anda, disokong oleh pasukan pengurusan 24/7 kami.',
      },
    },
  ]

  const packages = [
    {
      name: { en: '24-Hour Stay-In', zh: '24小时住家看护', ms: 'Tinggal Bersama 24 Jam' },
      price: 'RM250-400', unit: { en: '/day', zh: '/天', ms: '/hari' }, popular: false,
      features: [
        { en: 'Continuous professional care', zh: '不间断专业照护', ms: 'Penjagaan profesional berterusan' },
        { en: 'Ideal for long-term needs', zh: '适合长期需要', ms: 'Sesuai untuk keperluan jangka panjang' },
        { en: '24/7 management support', zh: '24/7 管理支援', ms: 'Sokongan pengurusan 24/7' },
      ],
    },
    {
      name: { en: 'Monthly Care Package', zh: '月护理配套', ms: 'Pakej Penjagaan Bulanan' },
      price: 'RM6,500-9,000', unit: { en: '/month', zh: '/月', ms: '/bulan' }, popular: true,
      features: [
        { en: 'Best value for ongoing care', zh: '长期照护最划算', ms: 'Nilai terbaik untuk penjagaan berterusan' },
        { en: 'Priority caregiver matching', zh: '优先配对护理员', ms: 'Padanan penjaga keutamaan' },
        { en: 'Dedicated care manager', zh: '专属护理经理', ms: 'Pengurus penjagaan khusus' },
      ],
    },
    {
      name: { en: 'Hourly Flexible Care', zh: '按小时弹性护理', ms: 'Penjagaan Fleksibel Mengikut Jam' },
      price: 'RM35-50', unit: { en: '/hour', zh: '/小时', ms: '/jam' }, popular: false,
      features: [
        { en: 'Pay only for hours needed', zh: '按实际时数付费', ms: 'Bayar untuk jam yang diperlukan sahaja' },
        { en: 'No long-term commitment', zh: '无需长期合约', ms: 'Tiada komitmen jangka panjang' },
        { en: 'Same caregiver where possible', zh: '尽量安排同一位护理员', ms: 'Penjaga yang sama jika boleh' },
      ],
    },
  ]

  return (
    <>
      <Head>
        <title>Private Home Healthcare Malaysia | Aurelion Concierge Care</title>
        <meta name="description" content="Premium private home healthcare services in Penang, KL, Melaka & JB. 24-hour care, dementia & stroke recovery, post-hospital care. VIP concierge-level nursing at home. Free consultation." />
        <meta name="keywords" content="home healthcare Malaysia, private nurse Malaysia, dementia care Penang, stroke recovery KL, elderly care JB, home nursing Melaka, 24 hour caregiver, post hospital care Malaysia, 居家护理, 看护, penjagaan di rumah" />
        <meta property="og:title" content="Private Home Healthcare Malaysia | Aurelion Concierge Care" />
        <meta property="og:description" content="Premium private home healthcare with VIP concierge service. 24-hour managed care across Penang, KL, Melaka & JB." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aurelionconcierge.com" />
      </Head>

      <Navbar />
      <PromoPopup />

      <main className="overflow-hidden">
        {/* ========== HERO SECTION ========== */}
        <section className="relative min-h-screen flex items-center pt-20 bg-glow">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#C5A572]/10 to-transparent rounded-full blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto px-6 py-16 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-[#0A1628]/60 backdrop-blur border border-[#C5A572]/30 rounded-full px-4 py-2 text-xs text-[#C5A572] uppercase tracking-wider mb-8">
                <SparklesIcon className="w-4 h-4" />
                {t({ en: "Malaysia's Premium Home Healthcare", zh: '马来西亚高端居家护理', ms: 'Penjagaan Kesihatan di Rumah Premium Malaysia' })}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold leading-tight mb-8">
                {t({ en: 'Your Loved Ones Deserve', zh: '您的至亲，值得', ms: 'Insan Tersayang Anda Layak' })}{t({ en: ' ', zh: '', ms: ' ' })}
                <span className="text-gradient">{t({ en: 'World-Class Care at Home', zh: '在家享有世界级照护', ms: 'Penjagaan Bertaraf Dunia di Rumah' })}</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
                {t({
                  en: 'Private nursing, elderly care, and post-hospital recovery — delivered with 5-star concierge service across Penang, KL, Melaka, and Johor Bahru.',
                  zh: '私人护理、长者照护及出院后康复，以五星级礼宾服务，覆盖槟城、吉隆坡、马六甲和新山。',
                  ms: 'Kejururawatan peribadi, penjagaan warga emas dan pemulihan selepas hospital — dengan perkhidmatan concierge 5 bintang di Pulau Pinang, KL, Melaka dan Johor Bahru.',
                })}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#booking" className="btn-gold text-lg px-8 py-4 inline-flex items-center gap-2">
                  {t({ en: 'Book Free Consultation', zh: '预约免费咨询', ms: 'Tempah Konsultasi Percuma' })}
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <Link href="/services" className="btn-outline-gold text-lg px-8 py-4 bg-[#0A1628]/40 backdrop-blur">
                  {t({ en: 'View All Services', zh: '查看所有服务', ms: 'Lihat Semua Perkhidmatan' })}
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-8 text-gray-400 text-sm">
                <span className="flex items-center gap-1"><CheckBadgeIcon className="w-4 h-4 text-green-400" /> {t({ en: 'Licensed Nurses', zh: '持牌护士', ms: 'Jururawat Berlesen' })}</span>
                <span className="flex items-center gap-1"><CheckBadgeIcon className="w-4 h-4 text-green-400" /> {t({ en: '24-48hr Deployment', zh: '24-48小时内安排', ms: 'Penempatan 24-48 Jam' })}</span>
              </div>
            </div>

            {/* 右侧主图（带金色边框） */}
            <div className="relative animate-fade-in-up animate-delay-1">
              <div className="absolute -inset-3 rounded-[2rem] border border-[#C5A572]/25 hidden sm:block"></div>
              <SmartImage
                src={IMAGES.hero}
                alt={t({ en: 'Aurelion caregiver holding hands with an elderly woman at home', zh: 'Aurelion 护理员在家中握着长者的手', ms: 'Penjaga Aurelion memegang tangan warga emas di rumah' })}
                className="h-80 sm:h-[28rem] lg:h-[34rem] rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
                imgClassName="object-[30%_center]"
                eager
              />
              <div className="absolute -bottom-5 left-5 sm:-left-6 glass-card !rounded-2xl !bg-[#0F1D32]/90 px-5 py-4 flex items-center gap-3">
                <ShieldCheckIcon className="w-8 h-8 text-[#C5A572]" />
                <div>
                  <p className="text-white font-semibold text-sm">{t({ en: '24/7 Managed Care', zh: '24/7 全天候管理', ms: 'Penjagaan Terurus 24/7' })}</p>
                  <p className="text-gray-400 text-xs">{t({ en: 'Penang · KL · Melaka · JB', zh: '槟城 · 吉隆坡 · 马六甲 · 新山', ms: 'P. Pinang · KL · Melaka · JB' })}</p>
                </div>
              </div>
            </div>
            </div>

            {/* 数据卡片 */}
            <div className="animate-fade-in-up animate-delay-2 grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
              {stats.map((item, i) => (
                <div key={i} className="glass-card !bg-[#0F1D32]/70 p-5 text-center">
                  <item.icon className="w-7 h-7 text-[#C5A572] mx-auto mb-2" />
                  <p className="stat-number !text-2xl">{item.stat}</p>
                  <p className="text-gray-400 text-xs mt-1">{t(item.label)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== TRUST STRIP ========== */}
        <section className="border-y border-[#C5A572]/10 py-8 bg-[#060F1E]/50">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 text-gray-500 text-sm uppercase tracking-widest">
            {trust.map((item, i) => (
              <span key={i} className="flex items-center gap-2"><CheckBadgeIcon className="w-5 h-5 text-[#C5A572]" /> {t(item)}</span>
            ))}
          </div>
        </section>

        {/* ========== SERVICES SECTION ========== */}
        <section id="services" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              subtitle={t({ en: 'What We Offer', zh: '我们的服务', ms: 'Apa Yang Kami Tawarkan' })}
              title={t({ en: 'Comprehensive Home Care Services', zh: '全面的居家护理服务', ms: 'Perkhidmatan Penjagaan di Rumah yang Menyeluruh' })}
              description={t({
                en: 'From hourly companionship to 24-hour specialized nursing, every service is delivered with concierge-level professionalism and compassion.',
                zh: '从按小时陪伴到 24 小时专科护理，每项服务都以礼宾级的专业与关怀提供。',
                ms: 'Daripada teman mengikut jam hingga kejururawatan khusus 24 jam, setiap perkhidmatan diberikan dengan profesionalisme dan belas kasihan bertaraf concierge.',
              })}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {HOME_SERVICE_KEYS.map(k => SERVICES.find(s => s.key === k)).map((service) => (
                <Link key={service.key} href="/services" className="glass-card overflow-hidden group block">
                  <div className="relative">
                    <SmartImage src={service.image} alt={t(service.name)} className="aspect-[16/9]" imgClassName={`${service.focus || 'object-center'} transition-transform duration-700 group-hover:scale-105`} />
                  </div>
                  <div className="p-6 pt-4">
                    <h3 className="text-lg font-semibold mb-2 text-white">{t(service.name)}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{t(service.short)}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/services" className="btn-outline-gold inline-flex items-center gap-2">
                {t({ en: `View All ${SERVICES.length} Services`, zh: `查看全部 ${SERVICES.length} 项服务`, ms: `Lihat Semua ${SERVICES.length} Perkhidmatan` })}
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
              subtitle={t({ en: 'Simple Process', zh: '简单流程', ms: 'Proses Mudah' })}
              title={t({ en: 'How to Get Started', zh: '如何开始', ms: 'Cara Bermula' })}
              description={t({
                en: "Three easy steps to bring professional care to your loved one's home.",
                zh: '三个简单步骤，把专业照护带到亲人家中。',
                ms: 'Tiga langkah mudah untuk membawa penjagaan profesional ke rumah insan tersayang anda.',
              })}
            />
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <SmartImage src={IMAGES.howItWorks} alt="" className="h-72 sm:h-96 lg:h-[30rem] rounded-3xl border border-[#C5A572]/20" />
              <div className="space-y-8">
                {steps.map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-16 h-16 shrink-0 bg-gradient-to-br from-[#C5A572] to-[#E2C99D] rounded-full flex items-center justify-center text-[#0A1628] text-xl font-display font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{t(item.title)}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{t(item.desc)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== PRICING PREVIEW ========== */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              subtitle={t({ en: 'Transparent Pricing', zh: '价格透明', ms: 'Harga Telus' })}
              title={t({ en: 'Care Packages for Every Need', zh: '满足不同需要的护理配套', ms: 'Pakej Penjagaan Untuk Setiap Keperluan' })}
              description={t({
                en: 'No hidden fees. Every sen goes to quality care for your loved one.',
                zh: '没有隐藏收费，每一分钱都用在亲人的优质照护上。',
                ms: 'Tiada caj tersembunyi. Setiap sen untuk penjagaan berkualiti insan tersayang anda.',
              })}
            />
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, i) => (
                <div key={i} className={`glass-card p-8 text-center relative ${pkg.popular ? 'border-[#C5A572]/40' : ''}`}>
                  {pkg.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#C5A572] to-[#D4B896] text-[#0A1628] px-5 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                      {t({ en: 'Most Popular', zh: '最受欢迎', ms: 'Paling Popular' })}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold mb-2 text-white">{t(pkg.name)}</h3>
                  <div className="my-6">
                    <span className="text-4xl font-display font-bold text-[#C5A572]">{pkg.price}</span>
                    <span className="text-gray-500 text-sm ml-1">{t(pkg.unit)}</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm text-gray-400">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-center justify-center gap-2">
                        <CheckBadgeIcon className="w-4 h-4 text-[#C5A572] shrink-0" /> {t(f)}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-gold w-full block text-center">{t({ en: 'Get Started', zh: '立即开始', ms: 'Mulakan' })}</Link>
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
              subtitle={t({ en: 'Where We Serve', zh: '服务地区', ms: 'Kawasan Perkhidmatan' })}
              title={t({ en: 'Available Across Malaysia', zh: '服务遍及马来西亚', ms: 'Tersedia di Seluruh Malaysia' })}
              description={t({
                en: 'Our caregivers are ready to deploy across these major cities and surrounding areas.',
                zh: '我们的护理员随时可以到以下主要城市及周边地区服务。',
                ms: 'Penjaga kami sedia ditempatkan di bandar-bandar utama ini dan kawasan sekitarnya.',
              })}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CITIES.map((loc, i) => (
                <div key={i} className="glass-card p-6 text-center">
                  <p className="text-lg font-semibold text-white">{t(loc.city)}</p>
                  <p className="text-gray-500 text-xs mt-1">{t(loc.area)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== FINAL CTA ========== */}
        <section className="py-24 px-6 bg-[#060F1E]/50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#C5A572]/10 border border-[#C5A572]/20 rounded-full px-4 py-2 text-xs text-[#C5A572] uppercase tracking-wider mb-6">
              {t({ en: 'Limited Caregiver Availability', zh: '护理员名额有限', ms: 'Kekosongan Penjaga Terhad' })}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
              {t({ en: 'Your Family Deserves the', zh: '您的家人值得', ms: 'Keluarga Anda Layak Menerima' })}{t({ en: ' ', zh: '', ms: ' ' })}
              <span className="text-gradient">{t({ en: 'Very Best Care', zh: '最好的照护', ms: 'Penjagaan Terbaik' })}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              {t({
                en: 'Join 1,000+ Malaysian families who trust Aurelion for their loved ones. Free consultation — no obligation.',
                zh: '已有超过 1,000 个马来西亚家庭把至亲托付给 Aurelion。免费咨询，没有任何义务。',
                ms: 'Sertai lebih 1,000 keluarga Malaysia yang mempercayai Aurelion untuk insan tersayang mereka. Konsultasi percuma — tanpa obligasi.',
              })}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="btn-gold text-lg px-8 py-4 inline-flex items-center gap-2" rel="noreferrer">
                <PhoneIcon className="w-5 h-5" />
                {t({ en: 'WhatsApp Us Now', zh: '立即 WhatsApp 我们', ms: 'WhatsApp Kami Sekarang' })}
              </a>
              <Link href="/contact" className="btn-outline-gold text-lg px-8 py-4">
                {t({ en: 'Other Ways to Reach Us', zh: '其他联系方式', ms: 'Cara Lain Menghubungi Kami' })}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
