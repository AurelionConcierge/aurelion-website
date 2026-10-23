import { useState, useEffect, useRef } from 'react'

// 本地知识库回答
// 用正则按“整个单词”匹配，避免 'hi' 误中 "which"、'rm' 误中 "form" 这类问题。
// 中文关键词没有单词边界，单独写在 | 后面直接匹配。
// 顺序有意义：越具体的意图放越前面。
const RULES = [
  {
    test: /\b(price|prices|pricing|cost|costs|fee|fees|rate|rates|charge|charges|harga|caj|rm\s?\d*)\b|价格|价钱|费用|收费|多少钱/i,
    reply: "Our pricing:\n\n• 24-Hour Stay-In Care: RM250-400/day\n• Monthly Package: RM6,500-9,000/month\n• Hourly Care: RM35-50/hour\n\nWould you like a personalized recommendation? Try our AI Care Advisor on the homepage!",
  },
  {
    test: /\b(book|booking|appointment|consult|consultation|schedule|tempah|temujanji)\b|预约|预订|咨询/i,
    reply: "Great! You can book a free consultation by:\n\n• WhatsApp: +60 18 595 9688\n• Email: care@aurelionconcierge.com\n• Or click 'Book Free Consultation' on our homepage\n\nWould you like me to help with anything else?",
  },
  {
    test: /\b(vip|premium|concierge|membership|member)\b|会员/i,
    reply: "Our VIP Concierge (RM800-1,500/month) includes: Fixed Caregiver Priority, Dedicated Care Manager, Priority Scheduling, Backup Replacement System, Personalized Care Plan, and Hospital Coordination Priority. Would you like to learn more?",
  },
  {
    test: /\b(services?|perkhidmatan|stroke|dementia|bedridden|nurse|nursing|caregiver)\b|服务|护理|看护/i,
    reply: "We offer: 24-Hour Care, 12-Hour Care, Hourly Care, Stroke Care, Dementia Care, Bedridden Care, Post-Hospital Recovery, Night Care, Mobility Rehab, and Medication Assistance. Which one are you interested in?",
  },
  {
    test: /\b(location|locations|area|areas|where|mana|penang|kl|kuala lumpur|selangor|melaka|malacca|johor|jb)\b|地区|哪里|槟城|吉隆坡|马六甲|新山/i,
    reply: "We serve Penang, Kuala Lumpur, Melaka, and Johor Bahru. Our caregivers can be deployed to your home within 24-48 hours.",
  },
  {
    test: /\b(hello|hi|hey|hai|halo|help|tolong)\b|你好|您好/i,
    reply: "Hello! I'm Aurelion's virtual concierge. I can help you with:\n\n• Our services and pricing\n• VIP membership details\n• Service locations\n• How to get started\n\nWhat would you like to know?",
  },
]

const FALLBACK = "Thank you for your question. For a detailed consultation, please:\n\n• WhatsApp us: +60 18 595 9688\n• Email: care@aurelionconcierge.com\n\nOr try our AI Care Advisor on the homepage for an instant care recommendation!"

function getLocalResponse(message) {
  const rule = RULES.find(r => r.test.test(message))
  return rule ? rule.reply : FALLBACK
}

// 聊天窗和 WhatsApp 弹窗共用这个事件，保证同一时间只开一个
export const POPUP_EVENT = 'aurelion:popup-open'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [chat, setChat] = useState([{ role: 'assistant', content: 'Hello! I\'m Aurelion\'s virtual concierge. How can I help you today? You can ask me about our services, pricing, VIP plans, or locations.' }])
  const bottomRef = useRef(null)

  // 别的弹窗打开时，自动关闭聊天窗
  useEffect(() => {
    const onOtherOpen = (e) => { if (e.detail !== 'chat') setOpen(false) }
    window.addEventListener(POPUP_EVENT, onOtherOpen)
    return () => window.removeEventListener(POPUP_EVENT, onOtherOpen)
  }, [])

  // 有新消息时滚动到底部
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
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-6 bg-[#C5A572] text-[#0A1628] w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl z-50 hover:scale-110 transition-transform"
      >
        💬
      </button>

      {/* 放在 WhatsApp 按钮上方（bottom-40），不再盖住它 */}
      {open && (
        <div className="fixed bottom-40 right-6 w-80 max-w-[calc(100vw-3rem)] h-96 max-h-[calc(100vh-12rem)] bg-[#0F1D32] border border-[#C5A572]/20 rounded-2xl shadow-2xl flex flex-col z-50">
          <div className="p-4 border-b border-[#C5A572]/10 flex justify-between items-center">
            <span className="text-[#C5A572] font-semibold text-sm">Aurelion Concierge</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-gray-400 hover:text-white">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
            {chat.map((c, i) => (
              <div key={i} className={`${c.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block px-3 py-2 rounded-lg whitespace-pre-line ${
                  c.role === 'user' ? 'bg-[#C5A572] text-[#0A1628]' : 'bg-gray-800 text-gray-200'
                }`}>
                  {c.content}
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
                // isComposing：中文输入法选字时按 Enter 不应发送
                if (e.key === 'Enter' && !e.nativeEvent.isComposing) sendMessage()
              }}
              className="flex-1 bg-gray-800 text-white rounded-l-lg p-2 text-sm outline-none"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="bg-[#C5A572] text-[#0A1628] px-4 rounded-r-lg font-semibold text-sm">Send</button>
          </div>
        </div>
      )}
    </>
  )
}
