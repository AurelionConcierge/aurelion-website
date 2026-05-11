import { useState } from 'react'
import { SparklesIcon, ArrowRightIcon, UserIcon, BeakerIcon, QuestionMarkCircleIcon, PhoneIcon, HeartIcon } from '@heroicons/react/24/outline'
import { analyzeCareNeeds, generateWhatsAppMessage } from '../lib/aiAdvisor'

export default function AICareAdvisor() {
  const [step, setStep] = useState(1)
  const [age, setAge] = useState('')
  const [condition, setCondition] = useState('')
  const [bedridden, setBedridden] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const handleSubmit = () => {
    setLoading(true)
    
    // 纯前端计算，不需要后端 API
    setTimeout(() => {
      try {
        const data = analyzeCareNeeds({
          age: parseInt(age),
          condition,
          bedridden: bedridden || 'no',
        })
        setResults(data)
        setStep(3)
      } catch (err) {
        console.error('AI Advisor error:', err)
      }
      setLoading(false)
    }, 800) // 模拟分析延迟，让用户感觉AI在思考
  }

  const whatsappLink = results
    ? `https://wa.me/60185959688?text=${generateWhatsAppMessage(results, { age, condition, bedridden })}`
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
            <span className="uppercase tracking-wider font-medium">AI-Powered</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            <span className="text-gradient">AI Care Advisor</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Answer 3 simple questions. Get an instant, personalized care recommendation.
          </p>
        </div>

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
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#C5A572]/10 rounded-full flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-[#C5A572]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">What is the patient's age?</h3>
                  <p className="text-gray-500 text-sm">This helps us determine the appropriate care level.</p>
                </div>
              </div>
              <input
                type="number"
                placeholder="Enter age (e.g., 75)"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-[#0A1628] border border-gray-700 focus:border-[#C5A572] rounded-xl p-4 text-white text-lg outline-none transition"
                min="1"
                max="120"
              />
              <button
                onClick={() => age && setStep(2)}
                disabled={!age}
                className="btn-gold w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Next <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#C5A572]/10 rounded-full flex items-center justify-center">
                    <BeakerIcon className="w-6 h-6 text-[#C5A572]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Describe the medical condition</h3>
                    <p className="text-gray-500 text-sm">For example: stroke, dementia, bedridden, after surgery...</p>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="e.g., had a stroke, needs dementia care, bedridden after surgery..."
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-[#0A1628] border border-gray-700 focus:border-[#C5A572] rounded-xl p-4 text-white text-lg outline-none transition"
                />
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#C5A572]/10 rounded-full flex items-center justify-center">
                    <QuestionMarkCircleIcon className="w-6 h-6 text-[#C5A572]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Is the patient bedridden?</h3>
                    <p className="text-gray-500 text-sm">Cannot get out of bed without assistance.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setBedridden('yes')}
                    className={`p-4 rounded-xl border-2 transition text-lg font-medium ${
                      bedridden === 'yes'
                        ? 'border-[#C5A572] bg-[#C5A572]/10 text-[#C5A572]'
                        : 'border-gray-700 text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setBedridden('no')}
                    className={`p-4 rounded-xl border-2 transition text-lg font-medium ${
                      bedridden === 'no'
                        ? 'border-[#C5A572] bg-[#C5A572]/10 text-[#C5A572]'
                        : 'border-gray-700 text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="btn-outline-gold flex-1 py-4">
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!condition || !bedridden || loading}
                  className="btn-gold flex-1 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    <>
                      Get Recommendation <SparklesIcon className="w-5 h-5" />
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
                <h3 className="text-2xl font-display font-semibold text-white mb-2">Your Care Recommendation</h3>
                <p className="text-gray-400">Based on our analysis, here's the optimal plan.</p>
              </div>

              <div className="text-center">
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider ${
                  results.severity === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  results.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                  'bg-green-500/10 text-green-400 border border-green-500/20'
                }`}>
                  {results.severity.toUpperCase()} CARE NEED
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium">Top Recommendations</h4>
                {results.recommendedServices.map((service, i) => (
                  <div key={i} className="flex items-center justify-between bg-[#0A1628]/80 rounded-xl p-4 border border-gray-800">
                    <div>
                      <p className="text-white font-medium">{service.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{service.why}</p>
                    </div>
                    <span className="text-[#C5A572] font-semibold text-sm whitespace-nowrap ml-4">{service.priceRange}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#C5A572]/5 border border-[#C5A572]/20 rounded-xl p-6 text-center">
                <p className="text-gray-400 text-sm mb-1">Estimated Monthly Investment</p>
                <p className="text-2xl font-display font-bold text-[#C5A572]">{results.estimatedPrice}</p>
              </div>

              <div className="bg-[#0A1628]/80 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-2 mb-3">
                  <SparklesIcon className="w-5 h-5 text-[#C5A572]" />
                  <span className="text-sm text-[#C5A572] font-medium">AI Summary</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{results.summary}</p>
              </div>

              <div className="space-y-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  className="btn-gold w-full py-4 text-lg flex items-center justify-center gap-2"
                  rel="noreferrer"
                >
                  <PhoneIcon className="w-5 h-5" />
                  Send to WhatsApp & Get Consultation
                </a>
                <button onClick={reset} className="btn-outline-gold w-full py-4">
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Powered by Aurelion AI. This is a recommendation tool, not medical advice. Always consult a healthcare professional.
        </p>
      </div>
    </section>
  )
}
