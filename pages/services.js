import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import SmartImage from '../components/SmartImage'
import { ArrowRightIcon, MoonIcon, HandRaisedIcon, TruckIcon, BuildingOffice2Icon, HeartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Head from 'next/head'
import { useLang } from '../lib/i18n'
import { SERVICES } from '../lib/content'

// 没有照片的服务使用的图标
const ICONS = {
  dayNight: MoonIcon,
  physio: HandRaisedIcon,
  escort: TruckIcon,
  hospital: BuildingOffice2Icon,
}

export default function Services() {
  const { t } = useLang()
  const withPhoto = SERVICES.filter(s => s.image)
  const withoutPhoto = SERVICES.filter(s => !s.image)

  return (
    <>
      <Head>
        <title>Home Care Services Malaysia | 24-Hour Nursing, Dementia and Stroke Care</title>
        <meta name="description" content="Professional home healthcare services across Malaysia. 24-hour nursing, dementia care, stroke recovery, bedridden patient care, elderly companion. All with concierge-level service. Serving Penang, KL, Melaka, JB." />
        <link rel="canonical" href="https://aurelionconcierge.com/services" />
      </Head>

      <Navbar />
      <main className="pt-24 pb-24 px-6 bg-glow min-h-screen">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            subtitle={t({ en: 'Our Expertise', zh: '我们的专长', ms: 'Kepakaran Kami' })}
            title={t({ en: 'Complete Home Healthcare Services', zh: '全方位居家护理服务', ms: 'Perkhidmatan Penjagaan Kesihatan di Rumah yang Lengkap' })}
            description={t({
              en: 'Every service is delivered by trained, background-checked professionals who treat your loved one like family. Available across Penang, KL, Melaka and JB.',
              zh: '每项服务都由受过训练、通过背景审查的专业人员提供，像对待家人一样照顾您的亲人。服务覆盖槟城、吉隆坡、马六甲和新山。',
              ms: 'Setiap perkhidmatan diberikan oleh profesional terlatih yang telah melalui semakan latar belakang, yang menjaga insan tersayang anda seperti keluarga sendiri. Tersedia di Pulau Pinang, KL, Melaka dan JB.',
            })}
          />

          {/* 有照片的服务 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {withPhoto.map((s) => (
              <div key={s.key} className="glass-card overflow-hidden group flex flex-col">
                <div className="relative">
                  <SmartImage src={s.image} alt={t(s.name)} className="aspect-[16/9]" imgClassName="object-center transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0F1D32] to-transparent"></div>
                </div>
                <div className="p-6 pt-3 flex-1">
                  <h3 className="text-lg font-semibold mb-3 text-white">{t(s.name)}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{t(s.desc)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 其他服务（暂时没有照片，用图标显示） */}
          {withoutPhoto.length > 0 && (
            <div className="mt-20">
              <h3 className="text-center text-2xl font-display font-semibold text-white mb-10">
                {t({ en: 'More Services', zh: '其他服务', ms: 'Perkhidmatan Lain' })}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {withoutPhoto.map((s) => {
                  const Icon = ICONS[s.key] || HeartIcon
                  return (
                    <div key={s.key} className="glass-card p-7 group">
                      <div className="w-14 h-14 bg-[#C5A572]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#C5A572]/20 transition">
                        <Icon className="w-7 h-7 text-[#C5A572]" />
                      </div>
                      <h4 className="text-lg font-semibold mb-3 text-white">{t(s.name)}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{t(s.desc)}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="text-center mt-16">
            <Link href="/contact" className="btn-gold inline-flex items-center gap-2 text-lg px-8 py-4">
              {t({ en: 'Enquire About a Service', zh: '咨询服务详情', ms: 'Tanya Tentang Perkhidmatan' })}
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
