export default function PageHeader({ label, title, subtitle, accentKleur = 'text-nhl-roze' }) {
  return (
    <div className="mb-10">
      {label && <div className={`section-label mb-2 ${accentKleur}`}>{label}</div>}
      <h1 className="page-title mb-3">{title}</h1>
      {subtitle && <p className="text-gray-500 max-w-2xl leading-relaxed">{subtitle}</p>}
    </div>
  )
}
