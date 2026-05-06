import { analyzeCareNeeds } from '../../lib/aiAdvisor'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { age, condition, bedridden } = req.body

    if (!age || !condition) {
      return res.status(400).json({ error: 'Age and condition are required' })
    }

    const results = analyzeCareNeeds({
      age: parseInt(age),
      condition,
      bedridden: bedridden || 'no',
    })

    res.status(200).json(results)
  } catch (error) {
    console.error('AI Advisor error:', error)
    res.status(500).json({ error: 'Failed to analyze care needs' })
  }
}
