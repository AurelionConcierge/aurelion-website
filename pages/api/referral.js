import { supabase } from '../../lib/supabase'

/**
 * 生成唯一推荐码
 */
function generateReferralCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = 'AUR'
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export default async function handler(req, res) {
  // 获取用户信息
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // GET - 获取推荐信息
  if (req.method === 'GET') {
    try {
      // 获取用户资料
      let { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      // 如果没有资料，创建一个
      if (!profile) {
        const referralCode = generateReferralCode()
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            referral_code: referralCode,
            membership_level: 'basic',
          })
          .select()
          .single()
        profile = newProfile
      }

      // 如果资料存在但没有推荐码，生成一个
      if (!profile.referral_code) {
        const referralCode = generateReferralCode()
        await supabase
          .from('profiles')
          .update({ referral_code: referralCode })
          .eq('id', user.id)
        profile.referral_code = referralCode
      }

      // 获取推荐记录
      const { data: referrals } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false })

      // 计算返佣总额
      const totalEarned = referrals
        ?.filter(r => r.status === 'paid')
        ?.reduce((sum, r) => sum + (r.reward_amount || 0), 0) || 0

      const pendingAmount = referrals
        ?.filter(r => r.status === 'pending')
        ?.reduce((sum, r) => sum + (r.reward_amount || 0), 0) || 0

      return res.status(200).json({
        profile,
        referrals: referrals || [],
        totalEarned,
        pendingAmount,
        referralLink: `https://aurelionconcierge.com/signup?ref=${profile.referral_code}`,
      })
    } catch (error) {
      console.error('Referral API error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
