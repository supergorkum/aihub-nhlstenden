export default function CloudStatus({ status }) {
  const config = {
    saving: { kleur: 'text-yellow-600 bg-yellow-50 border-yellow-200', dot: 'bg-yellow-400 pulse-soft', label: 'Opslaan...' },
    saved:  { kleur: 'text-green-700 bg-green-50 border-green-200',  dot: 'bg-green-500', label: 'Opgeslagen in cloud' },
    local:  { kleur: 'text-gray-500 bg-gray-50 border-gray-200',    dot: 'bg-gray-400', label: 'Lokaal opgeslagen' },
    error:  { kleur: 'text-red-600 bg-red-50 border-red-200',       dot: 'bg-red-500', label: 'Fout bij opslaan' },
    idle:   { kleur: 'text-gray-400 bg-gray-50 border-gray-100',    dot: 'bg-gray-300', label: 'Geen wijzigingen' },
  }
  const c = config[status] || config.idle
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${c.kleur}`}>
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
      {c.label}
    </div>
  )
}
