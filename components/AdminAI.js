import { useState } from 'react'
import {
  SparklesIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'

// 模拟护理员数据库（实际应该从 Supabase 读取）
const caregivers = [
  { id: 1, name: 'Siti Nurhaliza', languages: ['Malay', 'English'], specialties: ['elderly', 'dementia', 'bedridden'], experience: 8, rating: 4.9, available: true, location: 'Penang' },
  { id: 2, name: 'Tan Mei Ling', languages: ['Mandarin', 'Cantonese', 'English'], specialties: ['stroke', 'post-hospital', 'physiotherapy'], experience: 12, rating: 4.8, available: true, location: 'KL' },
  { id: 3, name: 'Rajesh Kumar', languages: ['Tamil', 'Malay', 'English'], specialties: ['bedridden', 'nursing', 'medication'], experience: 6, rating: 4.7, available: true, location: 'JB' },
  { id: 4, name: 'Aishah binti Rahman', languages: ['Malay', 'Arabic'], specialties: ['elderly', 'companionship', 'night-care'], experience: 5, rating: 4.9, available: false, location: 'Melaka' },
  { id: 5, name: 'Wong Chee Keong', languages: ['Mandarin', 'Hokkien', 'Malay'], specialties: ['stroke', 'dementia', 'mobility'], experience: 15, rating: 4.6, available: true, location: 'Penang' },
  { id: 6, name: 'Nurul Izzah', languages: ['Malay', 'English'], specialties: ['post-hospital', 'elderly', 'companionship'], experience: 3, rating: 4.8, available: true, location: 'KL' },
]

// 模拟客户列表（从 bookings 表获取）
const patients = [
  { id: 1, name: 'Mr. Lim', age: 78, condition: 'stroke', bedridden: 'no', location: 'Penang', language: 'Hokkien', risk: 'medium', bookedDate: '2026-05-15' },
  { id: 2, name: 'Puan Aminah', age: 85, condition: 'dementia', bedridden: 'yes', location: 'KL', language: 'Malay', risk: 'high', bookedDate: '2026-05-10' },
  { id: 3, name: 'Mr. Tan', age: 65, condition: 'post-hospital', bedridden: 'no', location: 'JB', language: 'Mandarin', risk: 'low', bookedDate: '2026-05-20' },
]

export default function AdminAI() {
  const [aiTab, setAiTab] = useState('matching')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [matchResult, setMatchResult] = useState(null)

  // 护理员匹配引擎
  const runMatching = (patient) => {
    // 根据病情匹配专长
    let scored = caregivers.map(cg => {
      let score = 0
      
      // 专长匹配 (+3 per match)
      cg.specialties.forEach(s => {
        if (patient.condition.includes(s) || s.includes(patient.condition)) score += 3
      })
      
      // 语言匹配 (+2 per match)
      if (cg.languages.some(l => patient.language.toLowerCase().includes(l.toLowerCase()) || l.toLowerCase().includes(patient.language.toLowerCase()))) {
        score += 2
      }
      
      // 位置匹配 (+2)
      if (cg.location === patient.location) score += 2
      
      // 经验加分 (+1 per 3 years, max 5)
      score += Math.min(Math.floor(cg.experience / 3), 5)
      
      // 评分加分 (+rating)
      score += cg.rating
      
      // 可用性 (+5 if available, -10 if not)
      if (cg.available) score += 5
      else score -= 10
      
      return { ...cg, score: Math.round(score * 10) / 10 }
    })
    
    // 排序
    scored.sort((a, b) => b.score - a.score)
    return scored.slice(0, 3)
  }

  const handleMatch = (patient) => {
    setSelectedPatient(patient)
    setMatchResult(runMatching(patient))
  }

  // 风险预警计算
  const getRiskLevel = (patient) => {
    if (patient.age >= 80 && patient.bedridden === 'yes') return { level: 'High', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' }
    if (patient.age >= 75 || patient.bedridden === 'yes') return { level: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' }
    return { level: 'Low', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' }
  }

  return (
    <div className="space-y-8">
      {/* AI 标签切换 */}
      <div className="flex gap-2 border-b border-gray-800 pb-4">
        {[
          { id: 'matching', label: 'Caregiver Matching', icon: SparklesIcon },
          { id: 'schedule', label: 'Schedule Overview', icon: CalendarDaysIcon },
          { id: 'risk', label: 'Risk Alerts', icon: ExclamationTriangleIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAiTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition ${
              aiTab === tab.id
                ? 'bg-[#C5A572] text-[#0A1628]'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===== 护理员匹配 ===== */}
      {aiTab === 'matching' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-[#C5A572]" />
            AI-Powered Caregiver Matching
          </h3>
          <p className="text-gray-400 text-sm">Select a patient to find the best-matched caregiver based on condition, language, location, and experience.</p>
          
          {/* 客户列表 */}
          <div className="grid md:grid-cols-3 gap-4">
            {patients.map(patient => {
              const risk = getRiskLevel(patient)
              return (
                <button
                  key={patient.id}
                  onClick={() => handleMatch(patient)}
                  className={`glass-card p-5 text-left transition ${
                    selectedPatient?.id === patient.id ? 'border-[#C5A572]/40' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-white font-medium">{patient.name}</p>
                      <p className="text-gray-500 text-xs">Age {patient.age} · {patient.condition}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${risk.bg} ${risk.color} ${risk.border} border`}>
                      {risk.level}
                    </span>
                  </div>
                  <div className="text-gray-500 text-xs space-y-1">
                    <p>📍 {patient.location}</p>
                    <p>🗣 {patient.language}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* 匹配结果 */}
          {matchResult && selectedPatient && (
            <div className="glass-card p-6 border-[#C5A572]/30">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-[#C5A572]" />
                Best Matches for {selectedPatient.name}
              </h4>
              <div className="space-y-3">
                {matchResult.map((cg, i) => (
                  <div key={i} className={`bg-[#0A1628]/80 rounded-xl p-4 border ${i === 0 ? 'border-[#C5A572]/40' : 'border-gray-800'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#C5A572]/10 rounded-full flex items-center justify-center">
                          <UserGroupIcon className="w-5 h-5 text-[#C5A572]" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{cg.name}</p>
                          <p className="text-gray-500 text-xs">⭐ {cg.rating} · {cg.experience} yrs exp</p>
                        </div>
                      </div>
                      <span className="text-[#C5A572] font-bold text-lg">{cg.score}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {cg.specialties.map((s, j) => (
                        <span key={j} className="px-2 py-1 bg-[#C5A572]/10 text-[#C5A572] rounded-full">{s}</span>
                      ))}
                      <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full">📍 {cg.location}</span>
                      <span className={`px-2 py-1 rounded-full ${cg.available ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {cg.available ? 'Available' : 'Busy'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== 排班概览 ===== */}
      {aiTab === 'schedule' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <CalendarDaysIcon className="w-6 h-6 text-[#C5A572]" />
            Schedule Overview
          </h3>
          <p className="text-gray-400 text-sm">Visual overview of caregiver workload and availability. Avoid over-booking.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 uppercase text-xs tracking-wider border-b border-gray-800">
                  <th className="pb-3 pr-4">Caregiver</th>
                  <th className="pb-3 pr-4">Location</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Workload</th>
                  <th className="pb-3">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {caregivers.map(cg => {
                  const workload = cg.experience > 10 ? 85 : cg.experience > 5 ? 50 : 30
                  const isOverworked = workload > 80
                  return (
                    <tr key={cg.id} className="border-b border-gray-800/50 text-gray-300">
                      <td className="py-3 pr-4">
                        <p className="text-white font-medium">{cg.name}</p>
                        <p className="text-gray-500 text-xs">{cg.languages.join(', ')}</p>
                      </td>
                      <td className="py-3 pr-4">{cg.location}</td>
                      <td className="py-3 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cg.available ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                          {cg.available ? 'Available' : 'Assigned'}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="w-24 bg-gray-800 rounded-full h-2">
                          <div className={`h-2 rounded-full ${isOverworked ? 'bg-red-500' : workload > 50 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${workload}%` }}></div>
                        </div>
                        <span className="text-xs text-gray-500">{workload}%</span>
                      </td>
                      <td className="py-3">
                        {isOverworked ? (
                          <span className="text-red-400 text-xs">⚠ Reduce load</span>
                        ) : cg.available ? (
                          <span className="text-green-400 text-xs">✅ Can assign</span>
                        ) : (
                          <span className="text-yellow-400 text-xs">🔄 Near capacity</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== 风险预警 ===== */}
      {aiTab === 'risk' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
            Risk Alert Dashboard
          </h3>
          <p className="text-gray-400 text-sm">Patients flagged for high attention based on age, condition severity, and bedridden status.</p>
          
          <div className="space-y-4">
            {patients.filter(p => getRiskLevel(p).level !== 'Low').map(patient => {
              const risk = getRiskLevel(patient)
              return (
                <div key={patient.id} className={`glass-card p-5 border-l-4 ${risk.level === 'High' ? 'border-l-red-500' : 'border-l-yellow-500'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${risk.bg} ${risk.color} border ${risk.border}`}>
                          {risk.level} Risk
                        </span>
                        <span className="text-white font-medium">{patient.name}</span>
                      </div>
                      <p className="text-gray-500 text-xs">Age {patient.age} · {patient.condition} · {patient.bedridden === 'yes' ? 'Bedridden' : 'Mobile'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs">Booked</p>
                      <p className="text-white text-sm">{patient.bookedDate}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    {patient.age >= 80 && <span className="text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded-full">High Age</span>}
                    {patient.bedridden === 'yes' && <span className="text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded-full">Bedridden</span>}
                    {patient.condition === 'dementia' && <span className="text-xs px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded-full">Dementia</span>}
                    <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">📍 {patient.location}</span>
                  </div>
                  {risk.level === 'High' && (
                    <p className="mt-3 text-red-400 text-xs flex items-center gap-1">
                      <ExclamationTriangleIcon className="w-4 h-4" />
                      Recommend 24-hour care + daily monitoring
                    </p>
                  )}
                </div>
              )
            })}
            
            {patients.filter(p => getRiskLevel(p).level === 'High').length === 0 && (
              <div className="text-center py-8">
                <ExclamationTriangleIcon className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500">No high-risk patients at this time</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
