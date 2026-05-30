/**
 * Aurelion Referral Rewards Engine
 * 定义所有返佣规则，所有页面统一调用
 */

// 奖励规则表
const REWARD_RULES = {
  // 下级购买 Premium Family
  'premium_family': {
    basic: { amount: 20, type: 'voucher', delay: 0 },
    premium: { amount: 50, type: 'cash', delay: 0 },
    vip: { amount: 50, type: 'cash', delay: 0 },
  },
  // 下级购买 VIP Concierge
  'vip_concierge': {
    basic: { amount: 30, type: 'voucher', delay: 0 },
    premium: { amount: 88, type: 'cash', delay: 0 },
    vip: { amount: 88, type: 'cash', delay: 0 },
  },
  // 下级购买 Monthly Care Plan
  'monthly_care_plan': {
    basic: { amount: 100, type: 'voucher', delay: 30 },
    premium: { amount: 300, type: 'cash', delay: 30 },
    vip: { amount: 300, type: 'cash', delay: 30 },
  },
}

/**
 * 根据推荐人等级和下级购买的服务，返回奖励信息
 * @param {string} referrerLevel - 推荐人等级: 'basic', 'premium', 'vip'
 * @param {string} serviceType - 下级购买的服务: 'premium_family', 'vip_concierge', 'monthly_care_plan'
 * @returns {object} { amount, type, delay }
 */
export function getReward(referrerLevel, serviceType) {
  const rule = REWARD_RULES[serviceType]
  if (!rule) return { amount: 0, type: 'voucher', delay: 0 }
  
  const level = referrerLevel || 'basic'
  return rule[level] || { amount: 0, type: 'voucher', delay: 0 }
}

/**
 * 判断奖励是现金还是抵用券
 */
export function isCashReward(referrerLevel, serviceType) {
  const reward = getReward(referrerLevel, serviceType)
  return reward.type === 'cash'
}

/**
 * 计算奖励的"可提现日期"
 * @param {number} delayDays - 延迟天数
 * @param {string} createdAt - 创建时间 ISO 字符串
 */
export function getEligibleDate(delayDays, createdAt) {
  if (delayDays === 0) return null // 立即可提
  const date = new Date(createdAt)
  date.setDate(date.getDate() + delayDays)
  return date.toISOString()
}

/**
 * 获取会员等级的首次服务折扣
 */
export function getFirstServiceDiscount(membershipLevel) {
  if (membershipLevel === 'premium' || membershipLevel === 'vip') {
    return 5 // 5% 折扣
  }
  return 0
}

/**
 * 服务类型映射（用于显示）
 */
export const SERVICE_LABELS = {
  'premium_family': 'Premium Family (RM199/mo)',
  'vip_concierge': 'VIP Concierge (RM800-1500/mo)',
  'monthly_care_plan': 'Monthly Care Plan (RM6,500-9,000/mo)',
}
