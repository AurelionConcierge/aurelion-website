import { useState, useEffect, useCallback } from 'react'
import { XMarkIcon, CheckBadgeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { useLang } from '../lib/i18n'
import { IMAGES } from '../lib/images'
import { PROMO, WHATSAPP_NUMBER } from '../lib/content'
import SmartImage from './SmartImage'

/**
 * 优惠弹窗：24小时住家看护月配套 RM5,588
 * 每次打开首页或价格页都会弹出（延迟 1.2 秒，先让访客看到页面）。
 * 优惠结束后：把首页和 pricing 页里的 <PromoPopup /> 删掉即可。
 */
export default function PromoPopup({ bookingHref = '#booking' }) {
  const [open, setOpen] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  const close = useCallback(() => setOpen(false), [])

  // 按 Esc 关闭
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  if (!open) return null

  const waText = encodeURIComponent(
    t({
      en: `Hi Aurelion, I'm interested in the 24-Hour Stay-In Care promotion at ${PROMO.price}/month. Please share the details.`,
      zh: `您好 Aurelion，我对 24小时住家看护 ${PROMO.price}/月 的优惠有兴趣，请告诉我详情。`,
      ms: `Hai Aurelion, saya berminat dengan promosi Penjagaan Tinggal Bersama 24 Jam pada harga ${PROMO.price}/bulan. Sila kongsikan butirannya.`,
    })
  )

  const features = [
    { en: 'Live-in caregiver, 24 hours a day', zh: '护理员住家，24小时照顾', ms: 'Penjaga tinggal bersama, 24 jam sehari' },
    { en: 'Supported by our care management team', zh: '由我们的护理管理团队跟进', ms: 'Disokong oleh pasukan pengurusan penjagaan kami' },
    { en: 'Care can begin in 24–48 hours', zh: '最快 24–48 小时内开始服务', ms: 'Penjagaan boleh bermula dalam 24–48 jam' },
  ]

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-title"
    >
      <div
        className="animate-pop-in relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#0F1D32] border border-[#C5A572]/40 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label={t({ en: 'Close', zh: '关闭', ms: 'Tutup' })}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* 图片 */}
        <div className="relative">
          <SmartImage src={IMAGES.promo} alt="" className="h-44 sm:h-52" eager />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1D32] via-[#0F1D32]/30 to-transparent" />
          <span className="absolute left-5 bottom-3 bg-gradient-to-r from-[#C5A572] to-[#E2C99D] text-[#0A1628] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {t({ en: 'Special Offer', zh: '特别优惠', ms: 'Tawaran Istimewa' })}
          </span>
        </div>

        <div className="px-6 sm:px-8 pt-4 pb-7 text-center">
          <h2 id="promo-title" className="text-2xl font-display font-semibold text-white mb-1">
            {t({ en: '24-Hour Stay-In Care', zh: '24小时住家看护', ms: 'Penjagaan Tinggal Bersama 24 Jam' })}
          </h2>
          <p className="text-gray-400 text-sm mb-5">
            {t({ en: 'Monthly package', zh: '月配套', ms: 'Pakej bulanan' })}
          </p>

          <div className="flex items-end justify-center gap-3 mb-1">
            <span className="text-5xl font-display font-bold text-gradient leading-none">{PROMO.price}</span>
            <span className="text-gray-400 text-sm mb-1">{t({ en: '/month', zh: '/月', ms: '/bulan' })}</span>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            {t({ en: 'Usually from', zh: '原价', ms: 'Harga biasa dari' })}{' '}
            <span className="line-through">{PROMO.usual}</span>
            {t({ en: '/month', zh: ' 起/月', ms: '/bulan' })}
          </p>

          <ul className="space-y-2.5 mb-7 text-sm text-gray-300 text-left max-w-xs mx-auto">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckBadgeIcon className="w-5 h-5 text-[#C5A572] flex-shrink-0" />
                <span>{t(f)}</span>
              </li>
            ))}
          </ul>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            onClick={close}
            className="btn-gold w-full py-4 text-base flex items-center justify-center gap-2"
          >
            <PhoneIcon className="w-5 h-5" />
            {t({ en: 'Claim Offer on WhatsApp', zh: 'WhatsApp 咨询优惠', ms: 'Tuntut Tawaran di WhatsApp' })}
          </a>
          <a
            href={bookingHref}
            onClick={close}
            className="block mt-3 text-sm text-[#C5A572] hover:underline"
          >
            {t({ en: 'Or book a free consultation', zh: '或预约免费咨询', ms: 'Atau tempah konsultasi percuma' })}
          </a>

          <p className="text-gray-600 text-[11px] mt-5 leading-relaxed">
            {t({
              en: 'Terms apply. Subject to care assessment and caregiver availability.',
              zh: '受条款约束。须经护理评估，并视护理员档期而定。',
              ms: 'Terma dikenakan. Tertakluk kepada penilaian penjagaan dan ketersediaan penjaga.',
            })}
          </p>
        </div>
      </div>
    </div>
  )
}
