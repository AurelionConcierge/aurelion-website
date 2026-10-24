import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import SmartImage from '../components/SmartImage'
import { ArrowRightIcon, MoonIcon, HandRaisedIcon, TruckIcon, BuildingOffice2Icon, HeartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Head from 'next/head'
import { useLang } from '../lib/i18n'
import { SERVICES } from '../lib/content'

// 还没有照片的服务，在照片位置显示的图标
const ICONS = {
  dayNight: MoonIcon,
  physio: HandRaisedIcon,
  escort: TruckIcon,
  hospital: BuildingOffice2Icon,
}

export default function Services() {
  const { t } = useLang()

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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s) => {
              const Icon = ICONS[s.key] || HeartIcon
              return (
                <div key={s.key} className="glass-card overflow-hidden group flex flex-col">
                  <div className="relative">
                    {s.image ? (
                      <SmartImage src={s.image} alt={t(s.name)} className="aspect-[16/9]" imgClassName={`${s.focus || 'object-center'} transition-transform duration-700 group-hover:scale-105`} />
                    ) : (
                      // 暂时没有照片：在同样大小的位置显示金色图标
                      <div className="aspect-[16/9] bg-gradient-to-br from-[#1a2b45] via-[#13233d] to-[#2a2416] flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border border-[#C5A572]/40 bg-[#C5A572]/10 flex items-center justify-center">
                          <Icon className="w-10 h-10 text-[#C5A572]" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-7 pt-5 flex-1">
                    <h3 className="text-xl font-semibold mb-3 text-white">{t(s.name)}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{t(s.desc)}</p>
                  </div>
                </div>
              )
            })}
          </div>

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
