import { useState } from 'react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [chat, setChat] = useState([{ role: 'assistant', content: 'Hello! How can I help you today?' }])

  const sendMessage = async () => {
    if (!msg.trim()) return
    const userMsg = { role: 'user', content: msg }
    setChat([...chat, userMsg])
    setMsg('')

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg })
    })
    const data = await res.json()
    setChat(prev => [...prev, { role: 'assistant', content: data.reply || 'Sorry, I cannot answer that.' }])
  }

  return (
    <>
      {/* 悬浮按钮 */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gold text-dark w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl z-50"
      >
        💬
      </button>

      {/* 聊天窗口 */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col z-50">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <span className="text-gold font-semibold">Aurelion Concierge</span>
            <button onClick={() => setOpen(false)} className="text-gray-400">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
            {chat.map((c, i) => (
              <div key={i} className={`${c.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block px-3 py-2 rounded-lg ${c.role === 'user' ? 'bg-gold text-dark' : 'bg-gray-800 text-gray-200'}`}>
                  {c.content}
                </span>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-700 flex">
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-gray-800 text-white rounded-l-lg p-2 text-sm"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="bg-gold text-dark px-4 rounded-r-lg">Send</button>
          </div>
        </div>
      )}
    </>
  )
}
