import { useState } from 'react'
import { PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline'

const topics = [
  { id: 'general', label: 'General Inquiry', message: 'Hi Aurelion, I would like to know more about your home healthcare services.' },
  { id: 'pricing', label: 'Pricing & Packages', message: 'Hi Aurelion, I am interested in your care packages and pricing. Can you share the details?' },
  { id: 'vip', label: 'VIP Concierge', message: 'Hi Aurelion, I want to learn more about the VIP Concierge Care plan (RM800-1500/month).' },
  { id: 'ai', label: 'AI Care Recommendation', message: 'Hi Aurelion, I used the AI Care Advisor and would like to discuss the recommendation.' },
  { id: 'urgent', label: 'Urgent Care Needed', message: 'Hi Aurelion, I need urgent home care assistance. Please contact me as soon as possible.' },
]

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [selectedTopic, setSelectedTopic] = useState(null)

  const phoneNumber = '60185959688'

  const handleSend = () => {
    let message = selectedTopic?.message || 'Hi Aurelion, I need home healthcare assistance.'
    if (name.trim()) {
      message = `Hi Aurelion, my name is ${name.trim()}. ${message}`
    }
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    setOpen(false)
    setName('')
    setSelectedTopic(null)
  }

  return (
    <>
      {/* 主按钮 */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 bg-green-500 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl z-40 hover:scale-110 transition-transform hover:bg-green-400"
        style={{ boxShadow: '0 4px 20px rgba(34, 197, 94, 0.4)' }}
      >
        <PhoneIcon className="w-6 h-6" />
      </button>

      {/* 弹出窗口 */}
      {open && (
        <div className="fixed bottom-36 right-6 w-80 bg-[#0F1D32] border border-green-500/20 rounded-2xl shadow-2xl z-40 overflow-hidden">
          {/* 头部 */}
          <div className="bg-green-500 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-white" />
              <span className="text-white font-semibold text-sm">WhatsApp Us</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* 内容 */}
          <div className="p-4 space-y-4">
            <p className="text-gray-300 text-xs">We typically reply within 5 minutes.</p>

            {/* 姓名 */}
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Your Name (optional)</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0A1628] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-green-500 transition"
              />
            </div>

            {/* 主题选择 */}
            <div>
              <label className="text-gray-400 text-xs mb-1 block">What would you like to discuss?</label>
              <div className="space-y-1 max-h-40 overflow-y-auto">
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
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 发送按钮 */}
            <button
              onClick={handleSend}
              className="w-full bg-green-500 text-white py-3 rounded-full font-semibold text-sm hover:bg-green-400 transition"
            >
              Start WhatsApp Chat
            </button>
          </div>
        </div>
      )}
    </>
  )
}
