import { useState } from 'react'
import { CalendarDaysIcon, ClockIcon, UserIcon, PhoneIcon, EnvelopeIcon, PencilSquareIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'
import { supabase } from '../lib/supabase'
import { useLang, LANGS } from '../lib/i18n'
import { WHATSAPP_NUMBER } from '../lib/content'

// en 存入数据库、发给团队；其他语言只用于显示
const services = [
  { en: '24-Hour Stay-In Care', zh: '24小时住家看护', ms: 'Penjagaan Tinggal Bersama 24 Jam' },
  { en: '12-Hour Care', zh: '12小时护理', ms: 'Penjagaan 12 Jam' },
  { en: 'Hourly Care', zh: '按小时护理', ms: 'Penjagaan Mengikut Jam' },
  { en: 'Stroke Care', zh: '中风护理', ms: 'Penjagaan Strok' },
  { en: 'Dementia Care', zh: '失智症护理', ms: 'Penjagaan Demensia' },
  { en: 'Bedridden Care', zh: '卧床护理', ms: 'Penjagaan Pesakit Terlantar' },
  { en: 'Post-Hospital Recovery', zh: '出院后康复', ms: 'Pemulihan Selepas Hospital' },
  { en: 'Night Care', zh: '夜间护理', ms: 'Penjagaan Malam' },
  { en: 'Mobility & Rehabilitation Support', zh: '行动与康复协助', ms: 'Sokongan Pergerakan & Pemulihan' },
  { en: 'Medication Assistance', zh: '协助用药', ms: 'Bantuan Ubat' },
]

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
]

export default function BookingForm() {
  const { t, lang } = useLang()
  const [step, setStep] = useState(1)
  const [service, setService] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [waUrl, setWaUrl] = useState('')
  const [savedToDb, setSavedToDb] = useState(true)

  // 简单校验马来西亚/国际电话：去掉空格、横线、+ 后应为 9–15 位数字
  const phoneDigits = phone.replace(/[\s\-+()]/g, '')
  const phoneValid = /^\d{9,15}$/.test(phoneDigits)

  const handleSubmit = async () => {
    if (loading || !service || !name.trim() || !phoneValid) return
    setLoading(true)

    const langName = LANGS.find(l => l.code === lang)?.name || 'English'

    // 发给团队的 WhatsApp 消息保持英文，并注明客户使用的语言
    const message = encodeURIComponent(
      `🌟 *New Booking Request*\n\n` +
      `📋 *Service:* ${service.en}\n` +
      `📅 *Date:* ${date}\n` +
      `⏰ *Time:* ${time}\n\n` +
      `👤 *Name:* ${name.trim()}\n` +
      `📞 *Phone:* ${phone.trim()}\n` +
      (email.trim() ? `📧 *Email:* ${email.trim()}\n` : '') +
      (notes.trim() ? `📝 *Notes:* ${notes.trim()}\n` : '') +
      `🗣 *Language:* ${langName}\n`
    )
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    setWaUrl(url)

    // 必须在用户点击的同一时刻打开窗口，
    // 等 await 之后再 window.open 会被手机浏览器（尤其 iOS Safari）拦截。
    const waWindow = window.open('', '_blank')

    let saved = false
    try {
      const { error: bookingError } = await supabase.from('bookings').insert({
        service: service.en,
        date,
        time,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || null,
        notes: notes.trim() || null,
      })
      if (bookingError) throw bookingError
      saved = true
    } catch (err) {
      console.error('Booking save error:', err)
    }
    setSavedToDb(saved)

    if (waWindow && !waWindow.closed) {
      waWindow.opener = null
      waWindow.location.href = url
    } else {
      window.location.href = url
    }

    setSubmitted(true)
    setLoading(false)
  }

  const reset = () => {
    setStep(1)
    setService(null)
    setDate('')
    setTime('')
    setName('')
    setPhone('')
    setEmail('')
    setNotes('')
    setSubmitted(false)
    setWaUrl('')
    setSavedToDb(true)
  }

  // 用本地时区生成 YYYY-MM-DD（toISOString 是 UTC，马来西亚早上 8 点前会算错一天）
  const toLocalDateString = (d) => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = toLocalDateString(tomorrow)

  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  const maxDateStr = toLocalDateString(maxDate)

  const L = {
    back: { en: 'Back', zh: '返回', ms: 'Kembali' },
    next: { en: 'Next', zh: '下一步', ms: 'Seterusnya' },
  }

  return (
    <section className="py-24 px-6 relative overflow-hidden" id="booking">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060F1E]/50 via-transparent to-[#060F1E]/50"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#C5A572]/10 border border-[#C5A572]/20 rounded-full px-5 py-2 text-sm text-[#C5A572] mb-6">
            <CalendarDaysIcon className="w-5 h-5" />
            <span className="uppercase tracking-wider font-medium">{t({ en: 'Online Booking', zh: '网上预约', ms: 'Tempahan Dalam Talian' })}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            {t({ en: 'Book a', zh: '预约', ms: 'Tempah' })}{t({ en: ' ', zh: '', ms: ' ' })}
            <span className="text-gradient">{t({ en: 'Consultation', zh: '免费咨询', ms: 'Konsultasi' })}</span>
          </h2>
          <p className="text-gray-400 text-lg">
            {t({
              en: "Schedule a free consultation. We'll confirm within 2 hours.",
              zh: '预约免费咨询，我们会在 2 小时内确认。',
              ms: 'Jadualkan konsultasi percuma. Kami akan mengesahkan dalam masa 2 jam.',
            })}
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-10 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#C5A572] w-12' : 'bg-gray-700'}`}></div>
          ))}
        </div>

        <div className="glass-card p-8 md:p-12 border-[#C5A572]/20">
          {submitted && (
            <div className="text-center space-y-6 animate-fade-in-up">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <CheckBadgeIcon className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-white">{t({ en: 'Almost Done!', zh: '快完成了！', ms: 'Hampir Siap!' })}</h3>
              <p className="text-gray-400">
                {savedToDb
                  ? t({
                      en: 'We have received your request. Please tap Send in WhatsApp so our team can confirm within 2 hours.',
                      zh: '我们已收到您的预约。请在 WhatsApp 里按「发送」，我们的团队会在 2 小时内确认。',
                      ms: 'Kami telah menerima permintaan anda. Sila tekan Hantar di WhatsApp supaya pasukan kami boleh mengesahkan dalam masa 2 jam.',
                    })
                  : t({
                      en: 'Please tap Send in WhatsApp to complete your booking. Our team will confirm within 2 hours.',
                      zh: '请在 WhatsApp 里按「发送」完成预约，我们的团队会在 2 小时内确认。',
                      ms: 'Sila tekan Hantar di WhatsApp untuk melengkapkan tempahan. Pasukan kami akan mengesahkan dalam masa 2 jam.',
                    })}
              </p>
              {waUrl && (
                <a href={waUrl} target="_blank" rel="noreferrer" className="btn-gold px-8 py-3 inline-flex items-center gap-2">
                  <PhoneIcon className="w-5 h-5" />
                  {t({ en: "WhatsApp didn't open? Tap here", zh: 'WhatsApp 没打开？点这里', ms: 'WhatsApp tidak dibuka? Tekan di sini' })}
                </a>
              )}
              <div>
                <button onClick={reset} className="btn-outline-gold px-8 py-3">
                  {t({ en: 'Book Another', zh: '再预约一次', ms: 'Tempah Lagi' })}
                </button>
              </div>
            </div>
          )}

          {!submitted && (
            <>
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h3 className="text-xl font-semibold text-white mb-4">{t({ en: 'Select Service', zh: '选择服务', ms: 'Pilih Perkhidmatan' })}</h3>
                  <div className="grid gap-3 max-h-64 overflow-y-auto">
                    {services.map((s) => (
                      <button
                        key={s.en}
                        onClick={() => { setService(s); setStep(2) }}
                        className={`text-left px-4 py-3 rounded-xl border transition ${
                          service?.en === s.en
                            ? 'border-[#C5A572] bg-[#C5A572]/10 text-[#C5A572]'
                            : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                        }`}
                      >
                        {t(s)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-8 animate-fade-in-up">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <CalendarDaysIcon className="w-6 h-6 text-[#C5A572]" />
                      <h3 className="text-xl font-semibold text-white">{t({ en: 'Select Date', zh: '选择日期', ms: 'Pilih Tarikh' })}</h3>
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
                        <h3 className="text-xl font-semibold text-white">{t({ en: 'Select Time', zh: '选择时间', ms: 'Pilih Masa' })}</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((ts) => (
                          <button
                            key={ts}
                            onClick={() => setTime(ts)}
                            className={`py-2.5 rounded-lg text-sm border transition ${
                              time === ts
                                ? 'border-[#C5A572] bg-[#C5A572]/10 text-[#C5A572]'
                                : 'border-gray-700 text-gray-400 hover:border-gray-500'
                            }`}
                          >
                            {ts}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="btn-outline-gold flex-1 py-4">{t(L.back)}</button>
                    <button
                      onClick={() => date && time && setStep(3)}
                      disabled={!date || !time}
                      className="btn-gold flex-1 py-4 disabled:opacity-50"
                    >
                      {t(L.next)}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h3 className="text-xl font-semibold text-white mb-4">{t({ en: 'Your Details', zh: '您的资料', ms: 'Butiran Anda' })}</h3>

                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">{t({ en: 'Full Name *', zh: '姓名 *', ms: 'Nama Penuh *' })}</label>
                    <div className="flex items-center gap-2 bg-[#0A1628] border border-gray-700 focus-within:border-[#C5A572] rounded-xl px-4 transition">
                      <UserIcon className="w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        placeholder={t({ en: 'Your full name', zh: '您的姓名', ms: 'Nama penuh anda' })}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 bg-transparent py-3 text-white outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">{t({ en: 'Phone Number *', zh: '电话号码 *', ms: 'Nombor Telefon *' })}</label>
                    <div className="flex items-center gap-2 bg-[#0A1628] border border-gray-700 focus-within:border-[#C5A572] rounded-xl px-4 transition">
                      <PhoneIcon className="w-5 h-5 text-gray-500" />
                      <input
                        type="tel"
                        placeholder={t({ en: 'e.g., 0123456789', zh: '例如：0123456789', ms: 'cth., 0123456789' })}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 bg-transparent py-3 text-white outline-none"
                        required
                      />
                    </div>
                    {phone && !phoneValid && (
                      <p className="text-red-400 text-xs mt-1">
                        {t({
                          en: 'Please enter a valid phone number (e.g. 012-345 6789).',
                          zh: '请输入有效的电话号码（例如 012-345 6789）。',
                          ms: 'Sila masukkan nombor telefon yang sah (cth. 012-345 6789).',
                        })}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">{t({ en: 'Email (optional)', zh: '电邮（选填）', ms: 'E-mel (pilihan)' })}</label>
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
                    <label className="text-gray-400 text-sm mb-1 block">{t({ en: 'Notes (optional)', zh: '备注（选填）', ms: 'Catatan (pilihan)' })}</label>
                    <div className="flex items-start gap-2 bg-[#0A1628] border border-gray-700 focus-within:border-[#C5A572] rounded-xl px-4 transition">
                      <PencilSquareIcon className="w-5 h-5 text-gray-500 mt-3" />
                      <textarea
                        placeholder={t({ en: 'Any special requirements or details...', zh: '任何特别要求或详情……', ms: 'Sebarang keperluan atau butiran khas...' })}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="flex-1 bg-transparent py-3 text-white outline-none resize-none"
                      />
                    </div>
                  </div>

                  <div className="bg-[#0A1628]/80 rounded-xl p-4 border border-gray-800">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">{t({ en: 'Booking Summary', zh: '预约摘要', ms: 'Ringkasan Tempahan' })}</p>
                    <p className="text-white text-sm"><span className="text-gray-500">{t({ en: 'Service:', zh: '服务：', ms: 'Perkhidmatan:' })}</span> {service && t(service)}</p>
                    <p className="text-white text-sm"><span className="text-gray-500">{t({ en: 'Date:', zh: '日期：', ms: 'Tarikh:' })}</span> {date}</p>
                    <p className="text-white text-sm"><span className="text-gray-500">{t({ en: 'Time:', zh: '时间：', ms: 'Masa:' })}</span> {time}</p>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="btn-outline-gold flex-1 py-4">{t(L.back)}</button>
                    <button
                      onClick={handleSubmit}
                      disabled={!name.trim() || !phoneValid || loading}
                      className="btn-gold flex-1 py-4 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading
                        ? t({ en: 'Submitting...', zh: '提交中……', ms: 'Menghantar...' })
                        : t({ en: 'Confirm Booking', zh: '确认预约', ms: 'Sahkan Tempahan' })}
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
