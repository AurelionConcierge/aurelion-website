import { useState, useEffect, useRef } from 'react'
import { useLang } from '../lib/i18n'
import { PROMO } from '../lib/content'

// 本地知识库回答（三语）
// 英文/马来文按整词匹配，避免 'hi' 误中 "which"、'rm' 误中 "form"。
// 中文关键词没有单词边界，直接匹配。顺序有意义：越具体的意图越前面。
const RULES = [
  {
    test: /\b(price|prices|pricing|cost|costs|fee|fees|rate|rates|charge|charges|promo|promotion|offer|discount|harga|caj|kos|yuran|tawaran|promosi|rm\s?\d*)\b|价格|价钱|费用|收费|多少钱|优惠|配套/i,
    reply: {
      en: `Our pricing:\n\n• 24-Hour Stay-In Care: RM250-400/day\n• Monthly Package: RM6,500-9,000/month\n• Hourly Care: RM35-50/hour\n\n🎉 Current offer: 24-Hour Stay-In Care monthly package at ${PROMO.price}/month.\n\nWould you like a personalized recommendation? Try our AI Care Advisor on the homepage!`,
      zh: `我们的价格：\n\n• 24小时住家看护：RM250-400/天\n• 月配套：RM6,500-9,000/月\n• 按小时护理：RM35-50/小时\n\n🎉 现有优惠：24小时住家看护月配套只需 ${PROMO.price}/月。\n\n想要个人化建议？欢迎使用首页的 AI 护理顾问！`,
      ms: `Harga kami:\n\n• Penjagaan Tinggal Bersama 24 Jam: RM250-400/hari\n• Pakej Bulanan: RM6,500-9,000/bulan\n• Penjagaan Mengikut Jam: RM35-50/jam\n\n🎉 Tawaran semasa: Pakej bulanan Penjagaan Tinggal Bersama 24 Jam pada ${PROMO.price}/bulan.\n\nMahu cadangan peribadi? Cuba Penasihat Penjagaan AI di laman utama!`,
    },
  },
  {
    test: /\b(book|booking|appointment|consult|consultation|schedule|tempah|tempahan|temujanji|konsultasi)\b|预约|预订|咨询/i,
    reply: {
      en: "Great! You can book a free consultation by:\n\n• WhatsApp: +60 18 595 9688\n• Email: care@aurelionconcierge.com\n• Or click 'Book Free Consultation' on our homepage\n\nWould you like me to help with anything else?",
      zh: '好的！您可以通过以下方式预约免费咨询：\n\n• WhatsApp：+60 18 595 9688\n• 电邮：care@aurelionconcierge.com\n• 或在首页点「预约免费咨询」\n\n还有其他我可以帮忙的吗？',
      ms: "Bagus! Anda boleh menempah konsultasi percuma melalui:\n\n• WhatsApp: +60 18 595 9688\n• E-mel: care@aurelionconcierge.com\n• Atau klik 'Tempah Konsultasi Percuma' di laman utama\n\nAda apa-apa lagi yang boleh saya bantu?",
    },
  },
  {
    test: /\b(vip|premium|concierge|membership|member|keahlian|ahli)\b|会员/i,
    reply: {
      en: 'Our VIP Concierge (RM800-1,500/month) includes: Fixed Caregiver Priority, Dedicated Care Manager, Priority Scheduling, Backup Replacement System, Personalized Care Plan, and Hospital Coordination Priority. Would you like to learn more?',
      zh: '我们的 VIP 礼宾计划（RM800-1,500/月）包括：优先固定护理员、专属护理经理、优先排班、后备替补机制、个人化护理计划及优先医院协调。想了解更多吗？',
      ms: 'Concierge VIP kami (RM800-1,500/bulan) termasuk: Keutamaan Penjaga Tetap, Pengurus Penjagaan Khusus, Penjadualan Keutamaan, Sistem Penggantian Sandaran, Pelan Penjagaan Peribadi dan Keutamaan Penyelarasan Hospital. Mahu tahu lebih lanjut?',
    },
  },
  {
    test: /\b(services?|perkhidmatan|stroke|strok|dementia|demensia|bedridden|terlantar|nurse|nursing|jururawat|caregiver|penjaga)\b|服务|护理|看护|中风|失智|卧床/i,
    reply: {
      en: 'We offer: 24-Hour Care, 12-Hour Care, Hourly Care, Stroke Care, Dementia Care, Bedridden Care, Post-Hospital Recovery, Night Care, Mobility Rehab, Medication Assistance, Physiotherapy, Medical Escort and Hospital Coordination. Which one are you interested in?',
      zh: '我们提供：24小时看护、12小时护理、按小时护理、中风护理、失智症护理、卧床护理、出院后康复、夜间护理、行动康复、协助用药、居家物理治疗、陪同就医及住院协调。您对哪一项有兴趣？',
      ms: 'Kami menawarkan: Penjagaan 24 Jam, Penjagaan 12 Jam, Penjagaan Mengikut Jam, Penjagaan Strok, Penjagaan Demensia, Penjagaan Terlantar, Pemulihan Selepas Hospital, Penjagaan Malam, Pemulihan Pergerakan, Bantuan Ubat, Fisioterapi, Iringan Perubatan dan Penyelarasan Hospital. Yang mana anda berminat?',
    },
  },
  {
    test: /\b(location|locations|area|areas|where|mana|kawasan|lokasi|penang|pinang|kl|kuala lumpur|selangor|melaka|malacca|johor|jb)\b|地区|哪里|槟城|吉隆坡|马六甲|新山|雪兰莪/i,
    reply: {
      en: 'We serve Penang, Kuala Lumpur, Melaka, and Johor Bahru. Our caregivers can be deployed to your home within 24-48 hours.',
      zh: '我们的服务地区包括槟城、吉隆坡、马六甲和新山。护理员可在 24-48 小时内上门服务。',
      ms: 'Kami berkhidmat di Pulau Pinang, Kuala Lumpur, Melaka dan Johor Bahru. Penjaga kami boleh ditempatkan di rumah anda dalam masa 24-48 jam.',
    },
  },
  {
    test: /\b(hello|hi|hey|hai|halo|helo|help|tolong|bantu)\b|你好|您好|哈喽/i,
    reply: {
      en: "Hello! I'm Aurelion's virtual concierge. I can help you with:\n\n• Our services and pricing\n• VIP membership details\n• Service locations\n• How to get started\n\nWhat would you like to know?",
      zh: '您好！我是 Aurelion 的虚拟礼宾助理，可以为您介绍：\n\n• 我们的服务和价格\n• VIP 会员详情\n• 服务地区\n• 如何开始\n\n请问您想了解什么？',
      ms: 'Hai! Saya concierge maya Aurelion. Saya boleh membantu dengan:\n\n• Perkhidmatan dan harga kami\n• Butiran keahlian VIP\n• Kawasan perkhidmatan\n• Cara bermula\n\nApa yang anda ingin tahu?',
    },
  },
]

const FALLBACK = {
  en: 'Thank you for your question. For a detailed consultation, please:\n\n• WhatsApp us: +60 18 595 9688\n• Email: care@aurelionconcierge.com\n\nOr try our AI Care Advisor on the homepage for an instant care recommendation!',
  zh: '谢谢您的提问。如需详细咨询，请：\n\n• WhatsApp：+60 18 595 9688\n• 电邮：care@aurelionconcierge.com\n\n或使用首页的 AI 护理顾问，立即获得护理建议！',
  ms: 'Terima kasih atas soalan anda. Untuk konsultasi terperinci, sila:\n\n• WhatsApp kami: +60 18 595 9688\n• E-mel: care@aurelionconcierge.com\n\nAtau cuba Penasihat Penjagaan AI di laman utama untuk cadangan segera!',
}

const GREETING = {
  en: "Hello! I'm Aurelion's virtual concierge. How can I help you today? You can ask me about our services, pricing, VIP plans, or locations.",
  zh: '您好！我是 Aurelion 的虚拟礼宾助理。请问今天有什么可以帮您？您可以问我服务、价格、VIP 计划或服务地区。',
  ms: 'Hai! Saya concierge maya Aurelion. Bagaimana saya boleh membantu anda hari ini? Anda boleh bertanya tentang perkhidmatan, harga, pelan VIP atau lokasi kami.',
}

export function getLocalResponse(message) {
  const rule = RULES.find(r => r.test.test(message))
  return rule ? rule.reply : FALLBACK
}

// 聊天窗和 WhatsApp 弹窗共用这个事件，保证同一时间只开一个
export const POPUP_EVENT = 'aurelion:popup-open'

export default function ChatWidget() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  // 助理的消息保存为三语对象，切换语言时会跟着变
  const [chat, setChat] = useState([{ role: 'assistant', content: GREETING }])
  const bottomRef = useRef(null)

  useEffect(() => {
    const onOtherOpen = (e) => { if (e.detail !== 'chat') setOpen(false) }
    window.addEventListener(POPUP_EVENT, onOtherOpen)
    return () => window.removeEventListener(POPUP_EVENT, onOtherOpen)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat, open])

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next) window.dispatchEvent(new CustomEvent(POPUP_EVENT, { detail: 'chat' }))
  }

  const sendMessage = () => {
    const text = msg.trim()
    if (!text) return
    setChat(prev => [...prev, { role: 'user', content: text }])
    setMsg('')
    const reply = getLocalResponse(text)
    setTimeout(() => {
      setChat(prev => [...prev, { role: 'assistant', content: reply }])
    }, 500)
  }

  return (
    <>
      <button
        onClick={toggle}
        aria-label={open ? t({ en: 'Close chat', zh: '关闭聊天', ms: 'Tutup sembang' }) : t({ en: 'Open chat', zh: '打开聊天', ms: 'Buka sembang' })}
        className="fixed bottom-6 right-6 bg-[#C5A572] text-[#0A1628] w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl z-50 hover:scale-110 transition-transform"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-40 right-6 w-80 max-w-[calc(100vw-3rem)] h-96 max-h-[calc(100vh-12rem)] bg-[#0F1D32] border border-[#C5A572]/20 rounded-2xl shadow-2xl flex flex-col z-50">
          <div className="p-4 border-b border-[#C5A572]/10 flex justify-between items-center">
            <span className="text-[#C5A572] font-semibold text-sm">{t({ en: 'Aurelion Concierge', zh: 'Aurelion 礼宾助理', ms: 'Concierge Aurelion' })}</span>
            <button onClick={() => setOpen(false)} aria-label={t({ en: 'Close chat', zh: '关闭聊天', ms: 'Tutup sembang' })} className="text-gray-400 hover:text-white">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
            {chat.map((c, i) => (
              <div key={i} className={`${c.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block px-3 py-2 rounded-lg whitespace-pre-line text-left ${
                  c.role === 'user' ? 'bg-[#C5A572] text-[#0A1628]' : 'bg-gray-800 text-gray-200'
                }`}>
                  {t(c.content)}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="p-3 border-t border-[#C5A572]/10 flex">
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing) sendMessage()
              }}
              className="flex-1 min-w-0 bg-gray-800 text-white rounded-l-lg p-2 text-sm outline-none"
              placeholder={t({ en: 'Type a message...', zh: '输入消息……', ms: 'Taip mesej...' })}
            />
            <button onClick={sendMessage} className="bg-[#C5A572] text-[#0A1628] px-4 rounded-r-lg font-semibold text-sm">
              {t({ en: 'Send', zh: '发送', ms: 'Hantar' })}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
