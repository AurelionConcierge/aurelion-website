import { useState, useEffect } from 'react'
import { PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { POPUP_EVENT } from './ChatWidget'
import { useLang } from '../lib/i18n'
import { WHATSAPP_NUMBER, PROMO } from '../lib/content'

const topics = [
  {
    id: 'general',
    label: { en: 'General Inquiry', zh: '一般咨询', ms: 'Pertanyaan Umum' },
    message: {
      en: 'I would like to know more about your home healthcare services.',
      zh: '我想多了解你们的居家护理服务。',
      ms: 'Saya ingin tahu lebih lanjut tentang perkhidmatan penjagaan kesihatan di rumah anda.',
    },
  },
  {
    id: 'promo',
    label: { en: `${PROMO.price}/month Offer`, zh: `${PROMO.price}/月 优惠`, ms: `Tawaran ${PROMO.price}/bulan` },
    message: {
      en: `I'm interested in the 24-Hour Stay-In Care promotion at ${PROMO.price}/month.`,
      zh: `我对 24小时住家看护 ${PROMO.price}/月 的优惠有兴趣。`,
      ms: `Saya berminat dengan promosi Penjagaan Tinggal Bersama 24 Jam pada harga ${PROMO.price}/bulan.`,
    },
  },
  {
    id: 'pricing',
    label: { en: 'Pricing & Packages', zh: '价格与配套', ms: 'Harga & Pakej' },
    message: {
      en: 'I am interested in your care packages and pricing. Can you share the details?',
      zh: '我对你们的护理配套和价格有兴趣，可以告诉我详情吗？',
      ms: 'Saya berminat dengan pakej penjagaan dan harga anda. Boleh kongsikan butirannya?',
    },
  },
  {
    id: 'vip',
    label: { en: 'VIP Concierge', zh: 'VIP 礼宾护理', ms: 'Concierge VIP' },
    message: {
      en: 'I want to learn more about the VIP Concierge Care plan (RM800-1500/month).',
      zh: '我想了解 VIP 礼宾护理计划（RM800-1500/月）。',
      ms: 'Saya ingin tahu lebih lanjut tentang pelan Penjagaan Concierge VIP (RM800-1500/bulan).',
    },
  },
  {
    id: 'urgent',
    label: { en: 'Urgent Care Needed', zh: '急需护理', ms: 'Perlukan Penjagaan Segera' },
    message: {
      en: 'I need urgent home care assistance. Please contact me as soon as possible.',
      zh: '我急需居家护理协助，请尽快联系我。',
      ms: 'Saya memerlukan bantuan penjagaan di rumah dengan segera. Sila hubungi saya secepat mungkin.',
    },
  },
]

export default function WhatsAppButton() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [selectedTopic, setSelectedTopic] = useState(null)

  useEffect(() => {
    const onOtherOpen = (e) => { if (e.detail !== 'whatsapp') setOpen(false) }
    window.addEventListener(POPUP_EVENT, onOtherOpen)
    return () => window.removeEventListener(POPUP_EVENT, onOtherOpen)
  }, [])

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next) window.dispatchEvent(new CustomEvent(POPUP_EVENT, { detail: 'whatsapp' }))
  }

  const handleSend = () => {
    const body = t(selectedTopic?.message || {
      en: 'I need home healthcare assistance.',
      zh: '我需要居家护理协助。',
      ms: 'Saya memerlukan bantuan penjagaan kesihatan di rumah.',
    })
    const greeting = name.trim()
      ? t({ en: `Hi Aurelion, my name is ${name.trim()}.`, zh: `您好 Aurelion，我是${name.trim()}。`, ms: `Hai Aurelion, nama saya ${name.trim()}.` })
      : t({ en: 'Hi Aurelion,', zh: '您好 Aurelion，', ms: 'Hai Aurelion,' })
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${greeting} ${body}`)}`
    window.open(url, '_blank')
    setOpen(false)
    setName('')
    setSelectedTopic(null)
  }

  return (
    <>
      <button
        onClick={toggle}
        aria-label={t({ en: 'Contact us on WhatsApp', zh: '通过 WhatsApp 联系我们', ms: 'Hubungi kami di WhatsApp' })}
        className="fixed bottom-24 right-6 bg-green-500 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl z-40 hover:scale-110 transition-transform hover:bg-green-400"
        style={{ boxShadow: '0 4px 20px rgba(34, 197, 94, 0.4)' }}
      >
        <PhoneIcon className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed bottom-40 right-6 w-80 max-w-[calc(100vw-3rem)] bg-[#0F1D32] border border-green-500/20 rounded-2xl shadow-2xl z-40 overflow-hidden">
          <div className="bg-green-500 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-white" />
              <span className="text-white font-semibold text-sm">{t({ en: 'WhatsApp Us', zh: 'WhatsApp 联系我们', ms: 'WhatsApp Kami' })}</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label={t({ en: 'Close', zh: '关闭', ms: 'Tutup' })} className="text-white/80 hover:text-white">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <p className="text-gray-300 text-xs">{t({ en: 'We typically reply within 5 minutes.', zh: '我们通常在 5 分钟内回复。', ms: 'Kami biasanya membalas dalam masa 5 minit.' })}</p>

            <div>
              <label className="text-gray-400 text-xs mb-1 block">{t({ en: 'Your Name (optional)', zh: '您的名字（选填）', ms: 'Nama Anda (pilihan)' })}</label>
              <input
                type="text"
                placeholder={t({ en: 'Enter your name', zh: '输入您的名字', ms: 'Masukkan nama anda' })}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0A1628] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-green-500 transition"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs mb-1 block">{t({ en: 'What would you like to discuss?', zh: '您想咨询什么？', ms: 'Apa yang ingin anda bincangkan?' })}</label>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      selectedTopic?.id === topic.id
                        ? 'bg-green-500/20 border border-green-500/40 text-green-300'
                        : 'bg-[#0A1628] border border-gray-700 text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    {t(topic.label)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSend}
              className="w-full bg-green-500 text-white py-3 rounded-full font-semibold text-sm hover:bg-green-400 transition"
            >
              {t({ en: 'Start WhatsApp Chat', zh: '开始 WhatsApp 聊天', ms: 'Mula Sembang WhatsApp' })}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
