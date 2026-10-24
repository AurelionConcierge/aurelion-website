import { useState } from 'react'
import { SparklesIcon, ArrowRightIcon, UserIcon, BeakerIcon, QuestionMarkCircleIcon, PhoneIcon, HeartIcon } from '@heroicons/react/24/outline'
import { analyzeCareNeeds, generateWhatsAppMessage, SEVERITY_LABEL } from '../lib/aiAdvisor'
import { useLang, LANGS } from '../lib/i18n'
import { WHATSAPP_NUMBER } from '../lib/content'

export default function AICareAdvisor() {
  const { t, lang } = useLang()
  const [step, setStep] = useState(1)
  const [age, setAge] = useState('')
  const [condition, setCondition] = useState('')
  const [bedridden, setBedridden] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const ageNum = parseInt(age, 10)
  const ageValid = Number.isInteger(ageNum) && ageNum >= 1 && ageNum <= 120

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      try {
        const data = analyzeCareNeeds({ age: ageNum, condition, bedridden: bedridden || 'no' })
        setResults(data)
        setStep(3)
      } catch (err) {
        console.error('AI Advisor error:', err)
      }
      setLoading(false)
    }, 800)
  }

  const langName = LANGS.find(l => l.code === lang)?.name || 'English'
  const whatsappLink = results
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${generateWhatsAppMessage(results, { age, condition, bedridden }, langName)}`
    : '#'

  const reset = () => {
    setStep(1)
    setAge('')
    setCondition('')
    setBedridden('')
    setResults(null)
  }

  return (
    <section className="py-24 px-6 relative overflow-hidden" id="ai-advisor">
      <div className="absolute inset-0 bg-gradient-to-b from-[#C5A572]/5 via-transparent to-transparent"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#C5A572]/10 border border-[#C5A572]/20 rounded-full px-5 py-2 text-sm text-[#C5A572] mb-6">
            <SparklesIcon className="w-5 h-5" />
            <span className="uppercase tracking-wider font-medium">{t({ en: 'AI-Powered', zh: '智能推荐', ms: 'Dikuasakan AI' })}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            <span className="text-gradient">{t({ en: 'AI Care Advisor', zh: 'AI 护理顾问', ms: 'Penasihat Penjagaan AI' })}</span>
          </h2>
          <p className="text-gray-400 text-lg">
            {t({
              en: 'Answer 3 simple questions. Get an instant, personalized care recommendation.',
              zh: '回答 3 个简单问题，立即获得个人化的护理建议。',
              ms: 'Jawab 3 soalan mudah. Dapatkan cadangan penjagaan peribadi dengan serta-merta.',
            })}
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-10 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#C5A572] w-12' : 'bg-gray-700'}`}></div>
          ))}
        </div>

        <div className="glass-card p-8 md:p-12 border-[#C5A572]/20">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 shrink-0 bg-[#C5A572]/10 rounded-full flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-[#C5A572]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{t({ en: "What is the patient's age?", zh: '病人几岁？', ms: 'Berapakah umur pesakit?' })}</h3>
                  <p className="text-gray-500 text-sm">{t({ en: 'This helps us determine the appropriate care level.', zh: '这能帮助我们判断合适的护理等级。', ms: 'Ini membantu kami menentukan tahap penjagaan yang sesuai.' })}</p>
                </div>
              </div>
              <input
                type="number"
                inputMode="numeric"
                placeholder={t({ en: 'Enter age (e.g., 75)', zh: '输入年龄（例如 75）', ms: 'Masukkan umur (cth., 75)' })}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-[#0A1628] border border-gray-700 focus:border-[#C5A572] rounded-xl p-4 text-white text-lg outline-none transition"
                min="1"
                max="120"
              />
              {age && !ageValid && (
                <p className="text-red-400 text-sm -mt-4">{t({ en: 'Please enter an age between 1 and 120.', zh: '请输入 1 至 120 之间的年龄。', ms: 'Sila masukkan umur antara 1 hingga 120.' })}</p>
              )}
              <button
                onClick={() => ageValid && setStep(2)}
                disabled={!ageValid}
                className="btn-gold w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {t({ en: 'Next', zh: '下一步', ms: 'Seterusnya' })} <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 shrink-0 bg-[#C5A572]/10 rounded-full flex items-center justify-center">
                    <BeakerIcon className="w-6 h-6 text-[#C5A572]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{t({ en: 'Describe the medical condition', zh: '描述病情', ms: 'Terangkan keadaan perubatan' })}</h3>
                    <p className="text-gray-500 text-sm">{t({ en: 'For example: stroke, dementia, bedridden, after surgery...', zh: '例如：中风、失智、卧床、手术后……', ms: 'Contoh: strok, demensia, terlantar, selepas pembedahan...' })}</p>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder={t({ en: 'e.g., had a stroke, needs dementia care, bedridden after surgery...', zh: '例如：中风后行动不便、需要失智症护理……', ms: 'cth., kena strok, perlukan penjagaan demensia...' })}
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-[#0A1628] border border-gray-700 focus:border-[#C5A572] rounded-xl p-4 text-white text-lg outline-none transition"
                />
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 shrink-0 bg-[#C5A572]/10 rounded-full flex items-center justify-center">
                    <QuestionMarkCircleIcon className="w-6 h-6 text-[#C5A572]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{t({ en: 'Is the patient bedridden?', zh: '病人是否卧床？', ms: 'Adakah pesakit terlantar?' })}</h3>
                    <p className="text-gray-500 text-sm">{t({ en: 'Cannot get out of bed without assistance.', zh: '没有人协助就无法下床。', ms: 'Tidak boleh bangun dari katil tanpa bantuan.' })}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { v: 'yes', label: { en: 'Yes', zh: '是', ms: 'Ya' } },
                    { v: 'no', label: { en: 'No', zh: '否', ms: 'Tidak' } },
                  ].map(opt => (
                    <button
                      key={opt.v}
                      onClick={() => setBedridden(opt.v)}
                      className={`p-4 rounded-xl border-2 transition text-lg font-medium ${
                        bedridden === opt.v
                          ? 'border-[#C5A572] bg-[#C5A572]/10 text-[#C5A572]'
                          : 'border-gray-700 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      {t(opt.label)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="btn-outline-gold flex-1 py-4">
                  {t({ en: 'Back', zh: '返回', ms: 'Kembali' })}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!condition.trim() || !bedridden || loading}
                  className="btn-gold flex-1 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {t({ en: 'Analyzing...', zh: '分析中……', ms: 'Menganalisis...' })}
                    </span>
                  ) : (
                    <>
                      {t({ en: 'Get Recommendation', zh: '获取建议', ms: 'Dapatkan Cadangan' })} <SparklesIcon className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Results */}
          {step === 3 && results && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-white mb-2">{t({ en: 'Your Care Recommendation', zh: '您的护理建议', ms: 'Cadangan Penjagaan Anda' })}</h3>
                <p className="text-gray-400">{t({ en: "Based on our analysis, here's the optimal plan.", zh: '根据我们的分析，这是最合适的方案。', ms: 'Berdasarkan analisis kami, inilah pelan yang terbaik.' })}</p>
              </div>

              <div className="text-center">
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider ${
                  results.severity === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  results.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                  'bg-green-500/10 text-green-400 border border-green-500/20'
                }`}>
                  {t(SEVERITY_LABEL[results.severity])}
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium">{t({ en: 'Top Recommendations', zh: '推荐服务', ms: 'Cadangan Utama' })}</h4>
                {results.recommendedServices.map((service, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#0A1628]/80 rounded-xl p-4 border border-gray-800">
                    <div>
                      <p className="text-white font-medium">{t(service.name)}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{t(service.why)}</p>
                    </div>
                    <span className="text-[#C5A572] font-semibold text-sm whitespace-nowrap sm:ml-4">{t(service.priceRange)}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#C5A572]/5 border border-[#C5A572]/20 rounded-xl p-6 text-center">
                <p className="text-gray-400 text-sm mb-1">{t({ en: 'Estimated Monthly Investment', zh: '每月预估费用', ms: 'Anggaran Kos Bulanan' })}</p>
                <p className="text-2xl font-display font-bold text-[#C5A572]">{t(results.estimatedPrice)}</p>
              </div>

              <div className="bg-[#0A1628]/80 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-2 mb-3">
                  <SparklesIcon className="w-5 h-5 text-[#C5A572]" />
                  <span className="text-sm text-[#C5A572] font-medium">{t({ en: 'AI Summary', zh: 'AI 摘要', ms: 'Ringkasan AI' })}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{t(results.summary)}</p>
              </div>

              <div className="space-y-3">
                <a href={whatsappLink} target="_blank" className="btn-gold w-full py-4 text-lg flex items-center justify-center gap-2" rel="noreferrer">
                  <PhoneIcon className="w-5 h-5" />
                  {t({ en: 'Send to WhatsApp & Get Consultation', zh: '发送到 WhatsApp 并获取咨询', ms: 'Hantar ke WhatsApp & Dapatkan Konsultasi' })}
                </a>
                <button onClick={reset} className="btn-outline-gold w-full py-4">
                  {t({ en: 'Start Over', zh: '重新开始', ms: 'Mula Semula' })}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          {t({
            en: 'Powered by Aurelion AI. This is a recommendation tool, not medical advice. Always consult a healthcare professional.',
            zh: '由 Aurelion AI 提供。此工具仅供参考，并非医疗建议，请务必咨询医疗专业人员。',
            ms: 'Dikuasakan oleh Aurelion AI. Ini adalah alat cadangan, bukan nasihat perubatan. Sentiasa rujuk profesional kesihatan.',
          })}
        </p>
      </div>
    </section>
  )
}
