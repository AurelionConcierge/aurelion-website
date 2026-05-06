/**
 * AI Care Advisor - 前端分析引擎
 * 
 * 这个文件定义了护理推荐规则。
 * 当用户提交表单后，先用这个本地引擎生成推荐结果。
 * 未来可以扩展调用后端 AI 做更智能的匹配。
 */

export const careDatabase = {
  conditions: {
    stroke: {
      name: 'Stroke Recovery',
      keywords: ['stroke', '中风', 'angin ahmar', 'lumpuh'],
      recommended: ['stroke-care', 'mobility-rehab', 'medication'],
      description: 'Post-stroke recovery requires specialized care for mobility, speech, and daily activities.',
    },
    dementia: {
      name: 'Dementia Care',
      keywords: ['dementia', 'alzheimer', 'nyanyuk', 'memory loss', 'confused', '失智'],
      recommended: ['dementia-care', '24-hour', 'night-care'],
      description: 'Dementia patients need compassionate, consistent support with safety monitoring.',
    },
    bedridden: {
      name: 'Bedridden Care',
      keywords: ['bedridden', 'bed bound', 'cannot move', 'terlantar', '卧床', 'paralyzed'],
      recommended: ['bedridden-care', '24-hour', 'nursing'],
      description: 'Comprehensive care for individuals with limited mobility, including pressure sore prevention.',
    },
    postHospital: {
      name: 'Post-Hospital Recovery',
      keywords: ['after hospital', 'discharge', 'surgery', 'operation', '出院', '手术后'],
      recommended: ['post-hospital', 'nursing', 'physiotherapy'],
      description: 'Smooth transition from hospital to home with professional recovery support.',
    },
    elderly: {
      name: 'Elderly Companion Care',
      keywords: ['elderly', 'old', 'aging', 'senior', '老人', 'tua', 'warga emas'],
      recommended: ['12-hour', 'hourly', 'companionship'],
      description: 'General assistance and companionship for seniors who need help with daily activities.',
    },
    night: {
      name: 'Night Care',
      keywords: ['night', 'overnight', 'sleep', 'malam', '晚上'],
      recommended: ['night-care', '24-hour'],
      description: 'Overnight support for safety, toileting, and peace of mind.',
    },
  },

  services: {
    '24-hour': {
      name: '24-Hour Stay-In Care',
      priceRange: 'RM250 – 400/day',
      monthlyRange: 'RM6,500 – 9,000/month',
      why: 'Continuous round-the-clock care ensures your loved one is never alone.',
    },
    '12-hour': {
      name: '12-Hour Care',
      priceRange: 'RM180 – 280/day',
      monthlyRange: 'RM4,500 – 6,500/month',
      why: 'Focused daytime or nighttime assistance when full 24-hour care is not needed.',
    },
    'hourly': {
      name: 'Hourly Care',
      priceRange: 'RM35 – 50/hour',
      monthlyRange: 'As needed',
      why: 'Maximum flexibility for occasional support needs.',
    },
    'stroke-care': {
      name: 'Stroke Care (Specialized)',
      priceRange: 'RM280 – 400/day',
      monthlyRange: 'RM7,000 – 9,500/month',
      why: 'Specialized caregivers trained in post-stroke rehabilitation techniques.',
    },
    'dementia-care': {
      name: 'Dementia Care (Specialized)',
      priceRange: 'RM280 – 400/day',
      monthlyRange: 'RM7,000 – 9,500/month',
      why: 'Caregivers with dementia-specific training for safety and engagement.',
    },
    'bedridden-care': {
      name: 'Bedridden Care (Specialized)',
      priceRange: 'RM280 – 400/day',
      monthlyRange: 'RM7,000 – 9,500/month',
      why: 'Full assistance with positioning, feeding, hygiene, and pressure sore prevention.',
    },
    'post-hospital': {
      name: 'Post-Hospital Recovery',
      priceRange: 'RM250 – 400/day',
      monthlyRange: 'RM6,500 – 9,000/month',
      why: 'Medication management, wound care, and rehabilitation support.',
    },
    'night-care': {
      name: 'Night Care',
      priceRange: 'RM200 – 300/night',
      monthlyRange: 'RM4,000 – 6,000/month',
      why: 'Overnight supervision for safety, toileting assistance, and peace of mind.',
    },
    'mobility-rehab': {
      name: 'Mobility & Rehabilitation Support',
      priceRange: 'RM35 – 50/hour',
      monthlyRange: 'As needed (add-on)',
      why: 'Movement assistance and recovery exercises to regain independence.',
    },
    'medication': {
      name: 'Medication Assistance',
      priceRange: 'Included in care packages',
      monthlyRange: 'Included',
      why: 'Timely medication reminders and administration support.',
    },
    'nursing': {
      name: 'Nursing Procedures',
      priceRange: 'By arrangement',
      monthlyRange: 'By arrangement',
      why: 'Professional nursing care including wound dressing, injections, and monitoring.',
    },
    'physiotherapy': {
      name: 'Physiotherapy',
      priceRange: 'Separate specialist service',
      monthlyRange: 'By arrangement',
      why: 'Certified physiotherapists for recovery and mobility improvement.',
    },
    'companionship': {
      name: 'Companionship',
      priceRange: 'RM35 – 50/hour',
      monthlyRange: 'RM3,500 – 5,000/month',
      why: 'Social engagement, conversation, and emotional support.',
    },
  }
}

/**
 * 本地匹配引擎
 * 分析用户输入，返回护理推荐
 */
export function analyzeCareNeeds({ age, condition, bedridden }) {
  const results = {
    condition: null,
    recommendedServices: [],
    estimatedPrice: null,
    summary: '',
    severity: 'standard',
  }

  // 1. 匹配病情
  let matchedCondition = null
  const lowerCondition = condition.toLowerCase()

  for (const [key, data] of Object.entries(careDatabase.conditions)) {
    const match = data.keywords.some(kw => lowerCondition.includes(kw))
    if (match) {
      matchedCondition = data
      break
    }
  }

  // 如果没有匹配到，使用 elderly 作为默认
  if (!matchedCondition) {
    matchedCondition = careDatabase.conditions.elderly
  }

  results.condition = matchedCondition

  // 2. 判断严重程度
  if (bedridden === 'yes' || age >= 80) {
    results.severity = 'high'
  } else if (age >= 70 || matchedCondition.name.includes('Stroke') || matchedCondition.name.includes('Dementia')) {
    results.severity = 'medium'
  }

  // 3. 推荐服务
  const serviceKeys = matchedCondition.recommended
  results.recommendedServices = serviceKeys.map(key => careDatabase.services[key]).filter(Boolean)

  // 4. 价格估算
  if (results.severity === 'high') {
    results.estimatedPrice = 'RM7,000 – 9,500/month (recommended: 24-hour specialized care)'
  } else if (results.severity === 'medium') {
    results.estimatedPrice = 'RM6,500 – 9,000/month (recommended: managed care package)'
  } else {
    results.estimatedPrice = 'RM3,500 – 6,500/month (recommended: flexible care package)'
  }

  // 5. 生成摘要
  results.summary = generateSummary(results, age)

  return results
}

function generateSummary(results, age) {
  const conditionName = results.condition.name
  if (results.severity === 'high') {
    return `Based on the condition (${conditionName}, age ${age}), we strongly recommend 24-hour specialized care with a dedicated caregiver. This ensures continuous monitoring, safety, and professional support. Our VIP Concierge package would provide the highest level of consistency and peace of mind.`
  } else if (results.severity === 'medium') {
    return `For ${conditionName} at age ${age}, a managed care package with specialized support is recommended. Our caregivers are trained to provide the right balance of medical assistance and companionship.`
  } else {
    return `Based on your needs (${conditionName}, age ${age}), a flexible care arrangement would work well. You can start with hourly or 12-hour care and adjust as needed.`
  }
}

/**
 * 生成 WhatsApp 消息文本
 */
export function generateWhatsAppMessage(results, userInput) {
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
    `   Estimated: ${results.estimatedPrice}`,
    ``,
    `📌 *Top Recommendations:*`,
    ...results.recommendedServices.map(s => `   ✅ ${s.name} (${s.priceRange})`),
    ``,
    `📝 *Summary:*`,
    `   ${results.summary}`,
    ``,
    `---`,
    `Sent via Aurelion AI Care Advisor`,
    `I would like to discuss this recommendation and get a personalized consultation.`,
  ]

  return encodeURIComponent(lines.join('\n'))
}
