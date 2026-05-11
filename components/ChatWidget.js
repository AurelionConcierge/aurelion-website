import { useState } from 'react'

// 本地知识库回答
function getLocalResponse(message) {
  const msg = message.toLowerCase()
  
  if (msg.includes('price') || msg.includes('pricing') || msg.includes('cost') || msg.includes('rm') || msg.includes('harga')) {
    return "Our pricing:\n\n• 24-Hour Stay-In Care: RM250-400/day\n• Monthly Package: RM6,500-9,000/month\n• Hourly Care: RM35-50/hour\n\nWould you like a personalized recommendation? Try our AI Care Advisor on the homepage!"
  }
  if (msg.includes('service') || msg.includes('perkhidmatan')) {
    return "We offer: 24-Hour Care, 12-Hour Care, Hourly Care, Stroke Care, Dementia Care, Bedridden Care, Post-Hospital Recovery, Night Care, Mobility Rehab, and Medication Assistance. Which one are you interested in?"
  }
  if (msg.includes('vip') || msg.includes('premium') || msg.includes('concierge')) {
    return "Our VIP Concierge (RM800-1,500/month) includes: Fixed Caregiver Priority, Dedicated Care Manager, Priority Scheduling, Backup Replacement System, Personalized Care Plan, and Hospital Coordination Priority. Would you like to learn more?"
  }
  if (msg.includes('location') || msg.includes('area') || msg.includes('where') || msg.includes('mana')) {
    return "We serve Penang, Kuala Lumpur, Melaka, and Johor Bahru. Our caregivers can be deployed to your home within 24-48 hours."
  }
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hai') || msg.includes('help')) {
    return "Hello! I'm Aurelion's virtual concierge. I can help you with:\n\n• Our services and pricing\n• VIP membership details\n• Service locations\n• How to get started\n\nWhat would you like to know?"
  }
  if (msg.includes('book') || msg.includes('appointment') || msg.includes('consult')) {
    return "Great! You can book a free consultation by:\n\n• WhatsApp: +60 18 595 9688\n• Email: care@aurelionconcierge.com\n• Or click 'Book Consultation' on our homepage\n\nWould you like me to help with anything else?"
  }
  
  return "Thank you for your question. For a detailed consultation, please:\n\n• WhatsApp us: +60 18 595 9688\n• Email: care@aurelionconcierge.com\n\nOr try our AI Care Advisor on the homepage for an instant care recommendation!"
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [chat, setChat] = useState([{ role: 'assistant', content: 'Hello! I\'m Aurelion\'s virtual concierge. How can I help you today? You can ask me about our services, pricing, VIP plans, or locations.' }])

  const sendMessage = () => {
    if (!msg.trim()) return
    const userMsg = { role: 'user', content: msg }
    setChat([...chat, userMsg])
    
    const reply = getLocalResponse(msg)
    
    setTimeout(() => {
      setChat(prev => [...prev, { role: 'assistant', content: reply }])
    }, 500)
    
    setMsg('')
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-[#C5A572] text-[#0A1628] w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl z-50 hover:scale-110 transition-transform"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-[#0F1D32] border border-[#C5A572]/20 rounded-2xl shadow-2xl flex flex-col z-50">
          <div className="p-4 border-b border-[#C5A572]/10 flex justify-between items-center">
            <span className="text-[#C5A572] font-semibold text-sm">Aurelion Concierge</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">✕</button>
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
          </div>
          <div className="p-3 border-t border-[#C5A572]/10 flex">
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
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
