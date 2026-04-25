import Link from 'next/link'

const services = [
  '24-Hour Stay-In Care',
  '12-Hour Care',
  'Hourly Care',
  'Stroke Care',
  'Dementia Care',
  'Bedridden Care',
  'Post-Hospital Recovery',
  'Night Care',
  'Mobility & Rehabilitation Support',
  'Medication Assistance'
]

export default function Services() {
  return (
    <div className="min-h-screen bg-dark py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light mb-4 text-gold">Our Services</h1>
        <p className="text-gray-400 mb-12">Comprehensive care solutions tailored to your needs</p>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div key={i} className="border border-gray-800 p-6 rounded-xl hover:border-gold transition">
              <h3 className="text-xl font-medium mb-2">{s}</h3>
              <p className="text-gray-500 text-sm">Professional, compassionate care</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/pricing" className="bg-gold text-dark px-8 py-4 rounded-full font-semibold">
            View Transparent Pricing
          </Link>
        </div>
      </div>
    </div>
  )
}
