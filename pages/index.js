import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Aurelion Concierge Care | Premium Home Healthcare</title>
        <meta name="description" content="Luxury private home healthcare in Malaysia" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-dark to-gray-900">
        {/* 导航栏 */}
        <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gold">AURELION</h1>
          <div className="space-x-6 text-sm uppercase tracking-wider">
            <Link href="/services" className="hover:text-gold transition">Services</Link>
            <Link href="/pricing" className="hover:text-gold transition">Pricing</Link>
            <Link href="/vip" className="hover:text-gold transition">VIP</Link>
            <Link href="/contact" className="hover:text-gold transition">Contact</Link>
            <Link href="/login" className="bg-gold text-dark px-4 py-2 rounded-full text-xs font-bold">Member Login</Link>
          </div>
        </nav>

        {/* 英雄区域 */}
        <section className="max-w-4xl mx-auto text-center pt-32 pb-24 px-4">
          <h2 className="text-5xl md:text-7xl font-light leading-tight mb-8">
            Because Your Loved Ones<br/>Deserve <span className="text-gold">Exceptional Care</span>
          </h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
            Private Care. Elevated to a Concierge Experience.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact" className="bg-gold text-dark px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition">
              Book Consultation
            </Link>
            <Link href="/services" className="border border-gold text-gold px-8 py-4 rounded-full font-semibold hover:bg-gold hover:text-dark transition">
              Explore Services
            </Link>
          </div>
        </section>

        {/* 信任指标 */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-32">
          {[
            { title: '24-Hour Managed Care', desc: 'Concierge-level care system' },
            { title: 'VIP Caregiver Priority', desc: 'Consistency and familiarity guaranteed' },
            { title: 'Immediate Deployment', desc: 'Within 24-48 hours' },
          ].map((item, i) => (
            <div key={i} className="border border-gray-800 rounded-2xl p-8 hover:border-gold transition">
              <h3 className="text-xl font-semibold mb-3 text-gold">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}
