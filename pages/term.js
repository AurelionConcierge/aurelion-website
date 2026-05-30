import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Head from 'next/head'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service | Aurelion Concierge Care</title>
        <meta name="description" content="Terms and conditions for using Aurelion Concierge Care's home healthcare services in Malaysia." />
        <link rel="canonical" href="https://aurelionconcierge.com/terms" />
      </Head>
      <Navbar />
      <main className="pt-24 pb-24 px-6 bg-glow min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-semibold text-[#C5A572] mb-8">Terms of Service</h1>
          <div className="prose prose-invert max-w-none text-gray-300 space-y-4 text-sm leading-relaxed">
            <p><strong>Last Updated:</strong> 12 May 2026</p>
            <p>By accessing and using Aurelion Concierge Care's website and services, you agree to be bound by these Terms of Service.</p>
            <h3 className="text-white text-lg mt-6">1. Services</h3>
            <p>We provide private home healthcare services including but not limited to nursing care, elderly companionship, post-hospital recovery, and specialized care. All services are subject to availability and caregiver matching.</p>
            <h3 className="text-white text-lg mt-6">2. Booking & Payment</h3>
            <p>Service bookings can be made via our website, WhatsApp, or phone. Payment terms vary by service package. For recurring services, payment is due in advance.</p>
            <h3 className="text-white text-lg mt-6">3. Cancellation Policy</h3>
            <p>We require 24 hours notice for cancellation of scheduled care sessions. Late cancellations may incur a fee.</p>
            <h3 className="text-white text-lg mt-6">4. Limitation of Liability</h3>
            <p>While we take every precaution to ensure quality care, Aurelion Concierge Care shall not be liable for any unforeseen medical events. We strongly recommend maintaining appropriate medical insurance.</p>
            <h3 className="text-white text-lg mt-6">5. Referral Program</h3>
            <p>Our referral program rewards members with RM200 per successful referral. Rewards are paid after the referred client completes their first month of service.</p>
            <h3 className="text-white text-lg mt-6">6. Contact</h3>
            <p>Questions about these terms? Reach us at care@aurelionconcierge.com or WhatsApp +60 18 595 9688.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
