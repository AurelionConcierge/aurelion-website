import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Head from 'next/head'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Aurelion Concierge Care</title>
        <meta name="description" content="Aurelion Concierge Care privacy policy. How we collect, use, and protect your personal and medical data in compliance with Malaysia's PDPA." />
        <link rel="canonical" href="https://aurelionconcierge.com/privacy" />
      </Head>
      <Navbar />
      <main className="pt-24 pb-24 px-6 bg-glow min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-semibold text-[#C5A572] mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none text-gray-300 space-y-4 text-sm leading-relaxed">
            <p><strong>Last Updated:</strong> 12 May 2026</p>
            <p>Aurelion Concierge Care ("we," "our," "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
            <h3 className="text-white text-lg mt-6">1. Information We Collect</h3>
            <p>We may collect personal information including your name, email address, phone number, and medical condition details when you fill out forms, register for membership, or communicate with us.</p>
            <h3 className="text-white text-lg mt-6">2. How We Use Your Information</h3>
            <p>We use your information to provide and improve our home healthcare services, process bookings, communicate with you, and send relevant updates about your care.</p>
            <h3 className="text-white text-lg mt-6">3. Data Protection</h3>
            <p>We implement appropriate security measures to protect your personal data. Your medical information is treated with the highest confidentiality and only shared with caregivers directly involved in your care.</p>
            <h3 className="text-white text-lg mt-6">4. Third-Party Services</h3>
            <p>We use Supabase for data storage and authentication. Your data is stored securely and we do not sell your information to third parties.</p>
            <h3 className="text-white text-lg mt-6">5. Your Rights</h3>
            <p>Under Malaysia's Personal Data Protection Act (PDPA) 2010, you have the right to access, correct, or request deletion of your personal data. Contact us at care@aurelionconcierge.com.</p>
            <h3 className="text-white text-lg mt-6">6. Contact Us</h3>
            <p>For any privacy-related questions, email care@aurelionconcierge.com or WhatsApp +60 18 595 9688.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
