import { useState } from 'react'
import { Link } from 'react-router-dom'
import { initiatieven, sporen } from '../data'
import PageHeader from '../components/PageHeader'

const statusConfig = {
  actief:          { label: 'Actief',          kleur: 'bg-green-100 text-green-700' },
  groeiend:        { label: 'Groeiend',        kleur: 'bg-blue-100 text-nhl-blauw' },
  'in-ontwikkeling': { label: 'In ontwikkeling', kleur: 'bg-orange-100 text-orange-700' },
}

export default function Initiatieven() {
  const [filterSpoor, setFilterSpoor] = useState(null)
  const [filterType, setFilterType] = useState(null)
  const [zoek, setZoek] = useState('')

  const gefilterd = initiatieven.filter(i => {
    if (filterSpoor && i.spoor !== filterSpoor) return false
    if (filterType && i.type !== filterType) return false
    if (zoek && !i.naam.toLowerCase().includes(zoek.toLowerCase()) && !i.omschrijving.toLowerCase().includes(zoek.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen pt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
          <PageHeader
            label="Wat loopt er al"
            title="Initiatieven & projecten"
            subtitle="Een eerste overzicht van wat er binnen en buiten NHL Stenden al loopt op het gebied van AI."
          />
          <Link to="/meld" className="btn-roze flex-shrink-0 self-start">
            + Initiatief aanmelden
          </Link>
        </div>

        {/* Zoek + filters */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-8 space-y-4">
          <input
            type="text"
            value={zoek}
            onChange={e => setZoek(e.target.value)}
            placeholder="Zoek op naam of omschrijving..."
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw bg-white"
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFilterSpoor(null)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!filterSpoor ? 'bg-nhl-blauw text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}>
              Alle sporen
            </button>
            {sporen.map(s => (
              <button key={s.id} onClick={() => setFilterSpoor(filterSpoor === s.id ? null : s.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filterSpoor === s.id ? 'text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
                style={filterSpoor === s.id ? { backgroundColor: s.kleur } : {}}>
                {s.icon} {s.titel}
              </button>
            ))}
            <div className="w-px bg-gray-200" />
            {['intern', 'extern'].map(t => (
              <button key={t} onClick={() => setFilterType(filterType === t ? null : t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${filterType === t ? 'bg-nhl-blauw text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Resultaten teller */}
        <div className="text-sm text-gray-400 mb-4">{gefilterd.length} initiatief{gefilterd.length !== 1 ? 'en' : ''} gevonden</div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gefilterd.map(init => {
            const s = statusConfig[init.status]
            const spoor = sporen.find(sp => sp.id === init.spoor)
            return (
              <div key={init.id} className="card card-hover p-5 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.kleur}`}>{s.label}</span>
                  <span className={`text-xs px-2 py-1 rounded-lg font-medium ${init.type === 'extern' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-nhl-blauw'}`}>
                    {init.type === 'extern' ? 'Extern' : 'Intern'}
                  </span>
                </div>
                <div className="font-bold text-nhl-blauw text-sm mb-2 leading-snug">{init.naam}</div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{init.omschrijving}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {init.tags.map(t => <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>)}
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  {init.laag && <span className="text-xs text-gray-400">Laag {init.laag}</span>}
                  {init.laag && spoor && <span className="text-gray-200">·</span>}
                  {spoor && (
                    <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ backgroundColor: spoor.kleur }}>
                      {spoor.icon} {spoor.titel}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {gefilterd.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <div className="font-medium">Geen initiatieven gevonden</div>
            <p className="text-sm mt-1">Pas de filters aan of meld een nieuw initiatief.</p>
          </div>
        )}

        <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
          <div className="text-3xl mb-3">🚀</div>
          <div className="font-bold text-nhl-blauw text-xl mb-2">Werk jij ook aan iets?</div>
          <p className="text-gray-600 mb-5 max-w-md mx-auto">Heb je een initiatief dat hier thuishoort maar nog niet vermeld staat? Meld het aan.</p>
          <Link to="/meld" className="btn-roze inline-block">Initiatief aanmelden →</Link>
        </div>
      </div>
    </div>
  )
}
