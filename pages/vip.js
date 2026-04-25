export default function VIP() {
  return (
    <div className="min-h-screen bg-dark py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-light mb-4 text-gold">VIP Concierge Care</h1>
        <p className="text-gray-400 mb-12">Unmatched consistency, familiarity, and peace of mind.</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-gray-800 p-8 rounded-2xl">
            <h3 className="text-2xl mb-6">Key Features</h3>
            <ul className="space-y-4 text-gray-300">
              <li>✓ Fixed Caregiver Priority</li>
              <li>✓ Dedicated Care Manager</li>
              <li>✓ Priority Scheduling</li>
              <li>✓ Backup Replacement System</li>
              <li>✓ Personalized Care Plan</li>
            </ul>
          </div>
          <div className="border border-gold p-8 rounded-2xl flex flex-col justify-center text-center">
            <p className="text-gray-400">Monthly VIP Upgrade Fee</p>
            <p className="text-5xl font-bold text-gold my-4">RM800-1500</p>
            <a href="/contact" className="mt-6 bg-gold text-dark py-3 px-6 rounded-full font-semibold">Upgrade Now</a>
          </div>
        </div>
      </div>
    </div>
  )
}
