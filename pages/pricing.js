export default function Pricing() {
  return (
    <div className="min-h-screen bg-dark py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-light mb-4 text-gold">Transparent Care Packages</h1>
        <p className="text-gray-400 mb-12">Flexible pricing designed to meet your specific needs</p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-gray-800 p-8 rounded-2xl text-center">
            <h2 className="text-2xl mb-4">24-Hour Stay-In</h2>
            <p className="text-4xl font-bold text-gold mb-6">RM250-400<span className="text-sm text-gray-400">/day</span></p>
            <ul className="text-gray-400 space-y-2 mb-8">
              <li>Continuous care</li>
              <li>Long-term stability</li>
            </ul>
            <a href="/contact" className="block bg-gold text-dark py-3 rounded-full font-semibold">Enquire Now</a>
          </div>
          <div className="border border-gold p-8 rounded-2xl text-center relative">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-dark px-4 py-1 rounded-full text-xs font-bold">POPULAR</span>
            <h2 className="text-2xl mb-4">Monthly Package</h2>
            <p className="text-4xl font-bold text-gold mb-6">RM6,500-9,000<span className="text-sm text-gray-400">/mo</span></p>
            <ul className="text-gray-400 space-y-2 mb-8">
              <li>Best for long-term</li>
              <li>Managed care</li>
            </ul>
            <a href="/contact" className="block bg-gold text-dark py-3 rounded-full font-semibold">Enquire Now</a>
          </div>
          <div className="border border-gray-800 p-8 rounded-2xl text-center">
            <h2 className="text-2xl mb-4">Hourly Care</h2>
            <p className="text-4xl font-bold text-gold mb-6">RM35-50<span className="text-sm text-gray-400">/hr</span></p>
            <ul className="text-gray-400 space-y-2 mb-8">
              <li>As needed</li>
              <li>Flexible support</li>
            </ul>
            <a href="/contact" className="block bg-gold text-dark py-3 rounded-full font-semibold">Enquire Now</a>
          </div>
        </div>
      </div>
    </div>
  )
}
