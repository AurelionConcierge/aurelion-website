export default function SectionHeader({ subtitle, title, description, light = false }) {
  return (
    <div className="text-center mb-16">
      <span className="text-[#C5A572] text-sm uppercase tracking-[0.2em] font-medium">{subtitle}</span>
      <div className="decorative-line mx-auto"></div>
      <h2 className={`text-3xl md:text-4xl font-display font-semibold mt-4 mb-6 ${light ? 'text-[#0A1628]' : 'text-white'}`}>
        {title}
      </h2>
      {description && (
        <p className={`max-w-2xl mx-auto text-lg leading-relaxed ${light ? 'text-gray-600' : 'text-gray-400'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
