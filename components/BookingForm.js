import { useState } from 'react'
import { CalendarDaysIcon, ClockIcon, UserIcon, PhoneIcon, EnvelopeIcon, PencilSquareIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'
import { supabase } from '../lib/supabase'

const services = [
  '24-Hour Stay-In Care',
  '12-Hour Care',
  'Hourly Care',
  'Stroke Care',
  'Dementia Care',
  'Bedridden Care',
  'Post-Hospital Recovery',
  'Night Care',
  'Mobility & Rehabilitation Support',
  'Medication Assistance',
]

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
]

export default function BookingForm() {
  const [step, setStep] = useState(1)
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    
    // 存入 Supabase
    try {
      await supabase.from('bookings').insert({
        service,
        date,
        time,
        name,
        phone,
        email,
        notes,
      })
    } catch (err) {
      console.error('Booking save error:', err)
    }

    // 生成 WhatsApp 消息
    const message = encodeURIComponent(
      `🌟 *New Booking Request*\n\n` +
      `📋 *Service:* ${service}\n` +
      `📅 *Date:* ${date}\n` +
      `⏰ *Time:* ${time}\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📧 *Email:* ${email}\n` +
      (notes ? `📝 *Notes:* ${notes}\n` : '')
    )

    setSubmitted(true)
    setLoading(false)

    // 打开 WhatsApp
    window.open(`https://wa.me/60185959688?text=${message}`, '_blank')
  }

  const reset = () => {
    setStep(1)
    setService('')
    setDate('')
    setTime('')
    setName('')
    setPhone('')
    setEmail('')
    setNotes('')
    setSubmitted(false)
  }

  // 获取明天的日期作为最小日期
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  // 最大日期（3个月后）
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  const maxDateStr = maxDate.toISOString().split('T')[0]

  return (
    <section className="py-24 px-6 relative overflow-hidden" id="booking">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060F1E]/50 via-transparent to-[#060F1E]/50"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* 标题 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#C5A572]/10 border border-[#C5A572]/20 rounded-full px-5 py-2 text-sm text-[#C5A572] mb-6">
            <CalendarDaysIcon className="w-5 h-5" />
            <span className="uppercase tracking-wider font-medium">Online Booking</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Book a <span className="text-gradient">Consultation</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Schedule a free consultation. We'll confirm within 2 hours.
          </p>
        </div>

        {/* 步骤指示器 */}
        <div className="flex justify-center gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-10 h-1.5 rounded-full transition-all duration-500 ${
                step >= s ? 'bg-[#C5A572] w-12' : 'bg-gray-700'
              }`}
            ></div>
          ))}
        </div>

        <div className="glass-card p-8 md:p-12 border-[#C5A572]/20">
          {/* 提交成功 */}
          {submitted && (
            <div className="text-center space-y-6 animate-fade-in-up">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <CheckBadgeIcon className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-white">Booking Submitted!</h3>
              <p className="text-gray-400">
                We've received your request and sent it to WhatsApp. Our team will confirm within 2 hours.
              </p>
              <button onClick={reset} className="btn-gold px-8 py-3">
                Book Another
              </button>
            </div>
          )}

          {!submitted && (
            <>
              {/* STEP 1: 选择服务 */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h3 className="text-xl font-semibold text-white mb-4">Select Service</h3>
                  <div className="grid gap-3 max-h-64 overflow-y-auto">
                    {services.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setService(s); setStep(2) }}
                        className={`text-left px-4 py-3 rounded-xl border transition ${
                          service === s
                            ? 'border-[#C5A572] bg-[#C5A572]/10 text-[#C5A572]'
                            : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: 日期和时间 */}
              {step === 2 && (
                <div className="space-y-8 animate-fade-in-up">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <CalendarDaysIcon className="w-6 h-6 text-[#C5A572]" />
                      <h3 className="text-xl font-semibold text-white">Select Date</h3>
                    </div>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={minDate}
                      max={maxDateStr}
                      className="w-full bg-[#0A1628] border border-gray-700 focus:border-[#C5A572] rounded-xl p-4 text-white outline-none transition"
                    />
                  </div>

                  {date && (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <ClockIcon className="w-6 h-6 text-[#C5A572]" />
                        <h3 className="text-xl font-semibold text-white">Select Time</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((t) => (
                          <button
                            key={t}
                            onClick={() => setTime(t)}
                            className={`py-2.5 rounded-lg text-sm border transition ${
                              time === t
                                ? 'border-[#C5A572] bg-[#C5A572]/10 text-[#C5A572]'
                                : 'border-gray-700 text-gray-400 hover:border-gray-500'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="btn-outline-gold flex-1 py-4">Back</button>
                    <button
                      onClick={() => date && time && setStep(3)}
                      disabled={!date || !time}
                      className="btn-gold flex-1 py-4 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: 联系信息 */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h3 className="text-xl font-semibold text-white mb-4">Your Details</h3>

                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Full Name *</label>
                    <div className="flex items-center gap-2 bg-[#0A1628] border border-gray-700 focus-within:border-[#C5A572] rounded-xl px-4 transition">
                      <UserIcon className="w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 bg-transparent py-3 text-white outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Phone Number *</label>
                    <div className="flex items-center gap-2 bg-[#0A1628] border border-gray-700 focus-within:border-[#C5A572] rounded-xl px-4 transition">
                      <PhoneIcon className="w-5 h-5 text-gray-500" />
                      <input
                        type="tel"
                        placeholder="e.g., 0123456789"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 bg-transparent py-3 text-white outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Email (optional)</label>
                    <div className="flex items-center gap-2 bg-[#0A1628] border border-gray-700 focus-within:border-[#C5A572] rounded-xl px-4 transition">
                      <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-transparent py-3 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Notes (optional)</label>
                    <div className="flex items-start gap-2 bg-[#0A1628] border border-gray-700 focus-within:border-[#C5A572] rounded-xl px-4 transition">
                      <PencilSquareIcon className="w-5 h-5 text-gray-500 mt-3" />
                      <textarea
                        placeholder="Any special requirements or details..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="flex-1 bg-transparent py-3 text-white outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* 预约摘要 */}
                  <div className="bg-[#0A1628]/80 rounded-xl p-4 border border-gray-800">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Booking Summary</p>
                    <p className="text-white text-sm"><span className="text-gray-500">Service:</span> {service}</p>
                    <p className="text-white text-sm"><span className="text-gray-500">Date:</span> {date}</p>
                    <p className="text-white text-sm"><span className="text-gray-500">Time:</span> {time}</p>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="btn-outline-gold flex-1 py-4">Back</button>
                    <button
                      onClick={handleSubmit}
                      disabled={!name || !phone || loading}
                      className="btn-gold flex-1 py-4 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? 'Submitting...' : 'Confirm Booking'}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
