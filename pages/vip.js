import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import { StarIcon, ShieldCheckIcon, UserGroupIcon, ClockIcon, DocumentTextIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useLang } from '../lib/i18n'

const features = [
  {
    icon: UserGroupIcon,
    title: { en: 'Fixed Caregiver Priority', zh: '优先固定护理员', ms: 'Keutamaan Penjaga Tetap' },
    desc: { en: 'Ensuring continuity and familiarity in care.', zh: '确保照护的连续性和熟悉感。', ms: 'Memastikan kesinambungan dan kebiasaan dalam penjagaan.' },
  },
  {
    icon: ShieldCheckIcon,
    title: { en: 'Dedicated Care Manager', zh: '专属护理经理', ms: 'Pengurus Penjagaan Khusus' },
    desc: { en: 'A single point of contact for seamless coordination.', zh: '单一联系人，协调更顺畅。', ms: 'Satu titik hubungan untuk penyelarasan yang lancar.' },
  },
  {
    icon: ClockIcon,
    title: { en: 'Priority Scheduling', zh: '优先排班', ms: 'Penjadualan Keutamaan' },
    desc: { en: 'Flexible and immediate arrangement of care services.', zh: '灵活、即时地安排护理服务。', ms: 'Susunan perkhidmatan penjagaan yang fleksibel dan segera.' },
  },
  {
    icon: ShieldCheckIcon,
    title: { en: 'Backup Replacement System', zh: '后备替补机制', ms: 'Sistem Penggantian Sandaran' },
    desc: { en: 'Guaranteed support with pre-arranged backup caregivers.', zh: '预先安排后备护理员，确保服务不中断。', ms: 'Sokongan terjamin dengan penjaga sandaran yang telah diaturkan.' },
  },
  {
    icon: DocumentTextIcon,
    title: { en: 'Personalized Care Plan', zh: '个人化护理计划', ms: 'Pelan Penjagaan Peribadi' },
    desc: { en: 'Tailored services to meet unique individual needs.', zh: '按个人独特需要量身定制服务。', ms: 'Perkhidmatan disesuaikan untuk keperluan unik setiap individu.' },
  },
  {
    icon: BuildingOfficeIcon,
    title: { en: 'Hospital Coordination Priority', zh: '优先医院协调', ms: 'Keutamaan Penyelarasan Hospital' },
    desc: { en: 'Fast-track hospital appointments and admissions.', zh: '加快安排医院预约和住院。', ms: 'Mempercepatkan temujanji dan kemasukan hospital.' },
  },
]

export default function VIP() {
  const { t } = useLang()
  return (
    <>
      <Head>
        <title>VIP Concierge Home Care | Aurelion Concierge Care</title>
        <meta name="description" content="VIP concierge home care in Malaysia: fixed caregiver priority, dedicated care manager, backup caregivers and hospital coordination priority." />
        <link rel="canonical" href="https://aurelionconcierge.com/vip" />
      </Head>
      <Navbar />
      <main className="pt-24 pb-24 px-6 bg-glow min-h-screen">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            subtitle={t({ en: 'Premium Experience', zh: '尊享体验', ms: 'Pengalaman Premium' })}
            title={t({ en: 'VIP Concierge Care', zh: 'VIP 礼宾护理', ms: 'Penjagaan Concierge VIP' })}
            description={t({
              en: 'Unmatched consistency, familiarity, and peace of mind. Designed to minimize disruption and ensure continuity.',
              zh: '无可比拟的稳定、熟悉与安心。专为减少变动、确保照护连续性而设计。',
              ms: 'Konsistensi, kebiasaan dan ketenangan fikiran yang tiada tandingan. Direka untuk mengurangkan gangguan dan memastikan kesinambungan.',
            })}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((f, i) => (
              <div key={i} className="glass-card p-8 group">
                <div className="w-14 h-14 bg-[#C5A572]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C5A572]/20 transition">
                  <f.icon className="w-7 h-7 text-[#C5A572]" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{t(f.title)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(f.desc)}</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-10 md:p-16 text-center border-[#C5A572]/30">
            <StarIcon className="w-10 h-10 text-[#C5A572] mx-auto mb-4" />
            <h3 className="text-2xl font-display font-semibold mb-6">{t({ en: 'Monthly VIP Upgrade', zh: '每月 VIP 升级', ms: 'Naik Taraf VIP Bulanan' })}</h3>
            <p className="text-gray-400 mb-2">{t({ en: 'Investment for complete peace of mind', zh: '为完全安心而投资', ms: 'Pelaburan untuk ketenangan fikiran sepenuhnya' })}</p>
            <p className="text-5xl font-display font-bold text-[#C5A572] mb-8">RM800 – 1,500</p>
            <Link href="/contact" className="btn-gold text-lg px-10 py-4 inline-block">
              {t({ en: 'Apply for VIP Care', zh: '申请 VIP 护理', ms: 'Mohon Penjagaan VIP' })}
            </Link>
            <p className="text-gray-600 text-xs mt-4">
              {t({ en: 'Limited availability. Early consultation recommended.', zh: '名额有限，建议尽早咨询。', ms: 'Kekosongan terhad. Konsultasi awal disyorkan.' })}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
