export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { message } = req.body
  
  try {
    // 使用Netlify AI Gateway (或OpenAI直连)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful concierge for Aurelion home healthcare. Answer questions about services, pricing, and care options politely.' },
          { role: 'user', content: message }
        ]
      })
    })

    const data = await response.json()
    res.status(200).json({ reply: data.choices[0].message.content })
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' })
  }
}
