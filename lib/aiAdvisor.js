/**
 * AI Care Advisor - 前端分析引擎（三语）
 *
 * 所有显示给客户的文字都是 { en, zh, ms } 对象，由页面根据当前语言选择。
 * 发给团队的 WhatsApp 消息统一用英文。
 */

export const careDatabase = {
  conditions: {
    stroke: {
      name: { en: 'Stroke Recovery', zh: '中风康复', ms: 'Pemulihan Strok' },
      keywords: ['stroke', '中风', '脑中风', 'strok', 'angin ahmar', 'lumpuh', 'paralysis'],
      recommended: ['stroke-care', 'mobility-rehab', 'medication'],
    },
    dementia: {
      name: { en: 'Dementia Care', zh: '失智症护理', ms: 'Penjagaan Demensia' },
      keywords: ['dementia', 'alzheimer', 'alzheimers', 'nyanyuk', 'demensia', 'memory loss', 'confused', 'forgetful', '失智', '痴呆', '老人痴呆', '记忆', '健忘'],
      recommended: ['dementia-care', '24-hour', 'night-care'],
    },
    bedridden: {
      name: { en: 'Bedridden Care', zh: '卧床护理', ms: 'Penjagaan Pesakit Terlantar' },
      keywords: ['bedridden', 'bed bound', 'bedbound', 'cannot move', 'cannot walk', 'terlantar', '卧床', '瘫痪', '不能走', 'paralyzed'],
      recommended: ['bedridden-care', '24-hour', 'nursing'],
    },
    postHospital: {
      name: { en: 'Post-Hospital Recovery', zh: '出院后康复', ms: 'Pemulihan Selepas Hospital' },
      keywords: ['after hospital', 'discharge', 'discharged', 'surgery', 'operation', 'pembedahan', 'keluar hospital', '出院', '手术', '开刀', '住院'],
      recommended: ['post-hospital', 'nursing', 'physiotherapy'],
    },
    night: {
      name: { en: 'Night Care', zh: '夜间护理', ms: 'Penjagaan Malam' },
      keywords: ['night', 'overnight', 'sleep', 'malam', '晚上', '夜间', '半夜'],
      recommended: ['night-care', '24-hour'],
    },
    elderly: {
      name: { en: 'Elderly Companion Care', zh: '长者陪伴护理', ms: 'Penjagaan Teman Warga Emas' },
      keywords: ['elderly', 'old', 'aging', 'senior', 'tua', 'warga emas', '老人', '长者', '年长'],
      recommended: ['12-hour', 'hourly', 'companionship'],
    },
  },

  services: {
    '24-hour': {
      name: { en: '24-Hour Stay-In Care', zh: '24小时住家看护', ms: 'Penjagaan Tinggal Bersama 24 Jam' },
      priceRange: { en: 'RM250 – 400/day', zh: 'RM250 – 400/天', ms: 'RM250 – 400/hari' },
      why: {
        en: 'Continuous round-the-clock care ensures your loved one is never alone.',
        zh: '全天候不间断照护，亲人身边时刻有人。',
        ms: 'Penjagaan berterusan sepanjang masa memastikan insan tersayang tidak pernah bersendirian.',
      },
    },
    '12-hour': {
      name: { en: '12-Hour Care', zh: '12小时护理', ms: 'Penjagaan 12 Jam' },
      priceRange: { en: 'RM180 – 280/day', zh: 'RM180 – 280/天', ms: 'RM180 – 280/hari' },
      why: {
        en: 'Focused daytime or nighttime assistance when full 24-hour care is not needed.',
        zh: '不需要 24 小时照护时，在白天或夜间提供专注协助。',
        ms: 'Bantuan khusus pada waktu siang atau malam apabila penjagaan 24 jam penuh tidak diperlukan.',
      },
    },
    'hourly': {
      name: { en: 'Hourly Care', zh: '按小时护理', ms: 'Penjagaan Mengikut Jam' },
      priceRange: { en: 'RM35 – 50/hour', zh: 'RM35 – 50/小时', ms: 'RM35 – 50/jam' },
      why: {
        en: 'Maximum flexibility for occasional support needs.',
        zh: '偶尔需要帮忙时，最有弹性。',
        ms: 'Fleksibiliti maksimum untuk keperluan sokongan sekali-sekala.',
      },
    },
    'stroke-care': {
      name: { en: 'Stroke Care (Specialized)', zh: '中风专科护理', ms: 'Penjagaan Strok (Khusus)' },
      priceRange: { en: 'RM280 – 400/day', zh: 'RM280 – 400/天', ms: 'RM280 – 400/hari' },
      why: {
        en: 'Specialized caregivers trained in post-stroke rehabilitation techniques.',
        zh: '护理员受过中风后康复技巧的专门训练。',
        ms: 'Penjaga khusus yang terlatih dalam teknik pemulihan selepas strok.',
      },
    },
    'dementia-care': {
      name: { en: 'Dementia Care (Specialized)', zh: '失智症专科护理', ms: 'Penjagaan Demensia (Khusus)' },
      priceRange: { en: 'RM280 – 400/day', zh: 'RM280 – 400/天', ms: 'RM280 – 400/hari' },
      why: {
        en: 'Caregivers with dementia-specific training for safety and engagement.',
        zh: '护理员受过失智症专门训练，注重安全与互动。',
        ms: 'Penjaga dengan latihan khusus demensia untuk keselamatan dan interaksi.',
      },
    },
    'bedridden-care': {
      name: { en: 'Bedridden Care (Specialized)', zh: '卧床专科护理', ms: 'Penjagaan Terlantar (Khusus)' },
      priceRange: { en: 'RM280 – 400/day', zh: 'RM280 – 400/天', ms: 'RM280 – 400/hari' },
      why: {
        en: 'Full assistance with positioning, feeding, hygiene, and pressure sore prevention.',
        zh: '全面协助翻身、喂食、清洁及预防褥疮。',
        ms: 'Bantuan penuh dengan kedudukan badan, pemberian makan, kebersihan dan pencegahan kudis tekanan.',
      },
    },
    'post-hospital': {
      name: { en: 'Post-Hospital Recovery', zh: '出院后康复', ms: 'Pemulihan Selepas Hospital' },
      priceRange: { en: 'RM250 – 400/day', zh: 'RM250 – 400/天', ms: 'RM250 – 400/hari' },
      why: {
        en: 'Medication management, wound care, and rehabilitation support.',
        zh: '用药管理、伤口护理及康复支援。',
        ms: 'Pengurusan ubat, rawatan luka dan sokongan pemulihan.',
      },
    },
    'night-care': {
      name: { en: 'Night Care', zh: '夜间护理', ms: 'Penjagaan Malam' },
      priceRange: { en: 'RM200 – 300/night', zh: 'RM200 – 300/晚', ms: 'RM200 – 300/malam' },
      why: {
        en: 'Overnight supervision for safety, toileting assistance, and peace of mind.',
        zh: '夜间看护，确保安全、协助如厕，让您安心。',
        ms: 'Pengawasan sepanjang malam untuk keselamatan, bantuan ke tandas dan ketenangan fikiran.',
      },
    },
    'mobility-rehab': {
      name: { en: 'Mobility & Rehabilitation Support', zh: '行动与康复协助', ms: 'Sokongan Pergerakan & Pemulihan' },
      priceRange: { en: 'RM35 – 50/hour', zh: 'RM35 – 50/小时', ms: 'RM35 – 50/jam' },
      why: {
        en: 'Movement assistance and recovery exercises to regain independence.',
        zh: '协助活动及康复运动，帮助重拾独立生活。',
        ms: 'Bantuan pergerakan dan senaman pemulihan untuk kembali berdikari.',
      },
    },
    'medication': {
      name: { en: 'Medication Assistance', zh: '协助用药', ms: 'Bantuan Ubat' },
      priceRange: { en: 'Included in care packages', zh: '已包含在护理配套内', ms: 'Termasuk dalam pakej penjagaan' },
      why: {
        en: 'Timely medication reminders and administration support.',
        zh: '按时提醒服药并协助用药。',
        ms: 'Peringatan ubat tepat pada masanya dan sokongan pemberian ubat.',
      },
    },
    'nursing': {
      name: { en: 'Nursing Procedures', zh: '护理程序', ms: 'Prosedur Kejururawatan' },
      priceRange: { en: 'By arrangement', zh: '另行安排', ms: 'Mengikut susunan' },
      why: {
        en: 'Professional nursing care including wound dressing, injections, and monitoring.',
        zh: '专业护理，包括伤口包扎、打针及监测。',
        ms: 'Penjagaan kejururawatan profesional termasuk pembalutan luka, suntikan dan pemantauan.',
      },
    },
    'physiotherapy': {
      name: { en: 'Physiotherapy', zh: '物理治疗', ms: 'Fisioterapi' },
      priceRange: { en: 'Separate specialist service', zh: '另设专科服务', ms: 'Perkhidmatan pakar berasingan' },
      why: {
        en: 'Certified physiotherapists for recovery and mobility improvement.',
        zh: '合格物理治疗师，帮助康复和改善活动能力。',
        ms: 'Ahli fisioterapi bertauliah untuk pemulihan dan meningkatkan pergerakan.',
      },
    },
    'companionship': {
      name: { en: 'Companionship', zh: '陪伴服务', ms: 'Teman' },
      priceRange: { en: 'RM35 – 50/hour', zh: 'RM35 – 50/小时', ms: 'RM35 – 50/jam' },
      why: {
        en: 'Social engagement, conversation, and emotional support.',
        zh: '社交互动、聊天陪伴及情绪支持。',
        ms: 'Interaksi sosial, perbualan dan sokongan emosi.',
      },
    },
  },
}

/**
 * 判断文本是否包含某个关键词
 * 英文/马来文按整词匹配（避免 'old' 误中 "hold"）；中文直接包含匹配。
 */
function matchesKeyword(text, keyword) {
  if (/[^\x00-\x7F]/.test(keyword)) return text.includes(keyword)
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`\\b${escaped}\\b`, 'i').test(text)
}

const ESTIMATES = {
  high: {
    en: 'RM7,000 – 9,500/month (recommended: 24-hour specialized care)',
    zh: 'RM7,000 – 9,500/月（建议：24小时专科护理）',
    ms: 'RM7,000 – 9,500/bulan (disyorkan: penjagaan khusus 24 jam)',
  },
  medium: {
    en: 'RM6,500 – 9,000/month (recommended: managed care package)',
    zh: 'RM6,500 – 9,000/月（建议：管理式护理配套）',
    ms: 'RM6,500 – 9,000/bulan (disyorkan: pakej penjagaan terurus)',
  },
  standard: {
    en: 'RM3,500 – 6,500/month (recommended: flexible care package)',
    zh: 'RM3,500 – 6,500/月（建议：弹性护理配套）',
    ms: 'RM3,500 – 6,500/bulan (disyorkan: pakej penjagaan fleksibel)',
  },
}

export const SEVERITY_LABEL = {
  high: { en: 'HIGH CARE NEED', zh: '高度护理需要', ms: 'KEPERLUAN PENJAGAAN TINGGI' },
  medium: { en: 'MEDIUM CARE NEED', zh: '中度护理需要', ms: 'KEPERLUAN PENJAGAAN SEDERHANA' },
  standard: { en: 'STANDARD CARE NEED', zh: '一般护理需要', ms: 'KEPERLUAN PENJAGAAN STANDARD' },
}

/**
 * 本地匹配引擎
 */
export function analyzeCareNeeds({ age, condition, bedridden }) {
  const results = {
    conditionKey: null,
    condition: null,
    recommendedServices: [],
    estimatedPrice: null,
    summary: null,
    severity: 'standard',
  }

  // 1. 匹配病情（顺序：中风 → 失智 → 卧床 → 出院 → 夜间 → 一般长者）
  const lowerCondition = (condition || '').toLowerCase()
  let matchedKey = 'elderly'
  for (const [key, data] of Object.entries(careDatabase.conditions)) {
    if (data.keywords.some(kw => matchesKeyword(lowerCondition, kw))) {
      matchedKey = key
      break
    }
  }
  const matched = careDatabase.conditions[matchedKey]
  results.conditionKey = matchedKey
  results.condition = matched

  // 2. 判断严重程度
  if (bedridden === 'yes' || age >= 80) {
    results.severity = 'high'
  } else if (age >= 70 || matchedKey === 'stroke' || matchedKey === 'dementia') {
    results.severity = 'medium'
  }

  // 3. 推荐服务
  results.recommendedServices = matched.recommended.map(key => careDatabase.services[key]).filter(Boolean)

  // 4. 价格估算
  results.estimatedPrice = ESTIMATES[results.severity]

  // 5. 生成摘要
  results.summary = generateSummary(results, age)

  return results
}

function generateSummary(results, age) {
  const n = results.condition.name
  if (results.severity === 'high') {
    return {
      en: `Based on the condition (${n.en}, age ${age}), we strongly recommend 24-hour specialized care with a dedicated caregiver. This ensures continuous monitoring, safety, and professional support. Our VIP Concierge package would provide the highest level of consistency and peace of mind.`,
      zh: `根据病情（${n.zh}，${age} 岁），我们强烈建议安排专属护理员提供 24 小时专科照护，确保持续监测、安全及专业支援。我们的 VIP 礼宾配套能提供最稳定、最安心的照护。`,
      ms: `Berdasarkan keadaan (${n.ms}, umur ${age}), kami amat mengesyorkan penjagaan khusus 24 jam dengan penjaga khusus. Ini memastikan pemantauan berterusan, keselamatan dan sokongan profesional. Pakej Concierge VIP kami memberikan tahap konsistensi dan ketenangan fikiran yang tertinggi.`,
    }
  } else if (results.severity === 'medium') {
    return {
      en: `For ${n.en} at age ${age}, a managed care package with specialized support is recommended. Our caregivers are trained to provide the right balance of medical assistance and companionship.`,
      zh: `对于 ${age} 岁的${n.zh}需要，建议选择附有专科支援的管理式护理配套。我们的护理员受过训练，能在医疗协助与陪伴之间取得平衡。`,
      ms: `Untuk ${n.ms} pada umur ${age}, pakej penjagaan terurus dengan sokongan khusus disyorkan. Penjaga kami terlatih untuk memberikan keseimbangan yang betul antara bantuan perubatan dan teman.`,
    }
  }
  return {
    en: `Based on your needs (${n.en}, age ${age}), a flexible care arrangement would work well. You can start with hourly or 12-hour care and adjust as needed.`,
    zh: `根据您的需要（${n.zh}，${age} 岁），弹性的护理安排会很合适。您可以先从按小时或 12 小时护理开始，再按需要调整。`,
    ms: `Berdasarkan keperluan anda (${n.ms}, umur ${age}), susunan penjagaan fleksibel adalah sesuai. Anda boleh bermula dengan penjagaan mengikut jam atau 12 jam dan menyesuaikannya mengikut keperluan.`,
  }
}

/**
 * 生成发给团队的 WhatsApp 消息（英文，注明客户语言）
 */
export function generateWhatsAppMessage(results, userInput, langName = 'English') {
  const lines = [
    `🌟 *Aurelion Concierge Care - AI Recommendation*`,
    ``,
    `📋 *Patient Profile:*`,
    `   Age: ${userInput.age}`,
    `   Condition: ${userInput.condition}`,
    `   Bedridden: ${userInput.bedridden === 'yes' ? 'Yes' : 'No'}`,
    ``,
    `💎 *Recommended Care Plan:*`,
    `   Level: ${results.severity.toUpperCase()} NEED`,
    `   Estimated: ${results.estimatedPrice.en}`,
    ``,
    `📌 *Top Recommendations:*`,
    ...results.recommendedServices.map(s => `   ✅ ${s.name.en} (${s.priceRange.en})`),
    ``,
    `📝 *Summary:*`,
    `   ${results.summary.en}`,
    ``,
    `🗣 *Language:* ${langName}`,
    `---`,
    `Sent via Aurelion AI Care Advisor`,
    `I would like to discuss this recommendation and get a personalized consultation.`,
  ]

  return encodeURIComponent(lines.join('\n'))
}
