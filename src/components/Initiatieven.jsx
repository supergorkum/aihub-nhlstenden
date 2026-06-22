import { useState } from 'react'
import { initiatieven, sporen, lagen, sporenKleuren } from '../data'

const statusLabel = {
  'actief': { label: 'Actief', kleur: 'bg-green-100 text-green-700' },
  'groeiend': { label: 'Groeiend', kleur: 'bg-blue-100 text-nhl-blauw' },
  'in-ontwikkeling': { label: 'In ontwikkeling', kleur: 'bg-orange-100 text-orange-700' },
}

export default function Initiatieven() {
  const [filterSpoor, setFilterSpoor] = useState(null)
  const [filterType, setFilterType] = useState(null)

  const gefilterd = initiatieven.filter(i => {
    if (filterSpoor && i.spoor !== filterSpoor) return false
    if (filterType && i.type !== filterType) return false
    return true
  })

  return (
    <section id="initiatieven" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-nhl-oranje font-semibold text-sm uppercase tracking-wider">Wat loopt er al</span>
          <h2 className="text-3xl font-bold text-nhl-blauw mt-2 mb-4">Initiatieven & projecten</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Een eerste overzicht van wat er binnen en buiten NHL Stenden al loopt op het gebied van AI. 
            Dit overzicht groeit mee met de organisatie.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={() => setFilterSpoor(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !filterSpoor ? 'bg-nhl-blauw text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Alle sporen
          </button>
          {sporen.map(s => (
            <button
              key={s.id}
              onClick={() => setFilterSpoor(filterSpoor === s.id ? null : s.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterSpoor === s.id
                  ? `${s.kleur} ${s.tekstKleur}`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s.icon} {s.titel}
            </button>
          ))}
          <div className="w-px bg-gray-200 mx-1" />
          <button
            onClick={() => setFilterType(filterType === 'intern' ? null : 'intern')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filterType === 'intern' ? 'bg-nhl-blauw text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Intern
          </button>
          <button
            onClick={() => setFilterType(filterType === 'extern' ? null : 'extern')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filterType === 'extern' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Extern
          </button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gefilterd.map(init => {
            const kleur = sporenKleuren[init.spoor]
            const status = statusLabel[init.status]
            return (
              <div
                key={init.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 card-hover flex flex-col"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.kleur}`}>
                    {status.label}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded font-medium ${
                    init.type === 'extern' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-nhl-blauw'
                  }`}>
                    {init.type === 'extern' ? 'Extern' : 'Intern'}
                  </div>
                </div>

                {/* Naam */}
                <div className="font-bold text-nhl-blauw text-base mb-2 leading-tight">{init.naam}</div>

                {/* Omschrijving */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{init.omschrijving}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {init.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer: laag + spoor */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  {init.laag && (
                    <span className="text-xs text-gray-400">
                      Laag {init.laag}
                    </span>
                  )}
                  {init.laag && init.spoor && <span className="text-gray-200">·</span>}
                  {init.spoor && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${kleur.bg} ${kleur.text}`}>
                      {sporen.find(s => s.id === init.spoor)?.icon} Spoor {init.spoor}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA eigen initiatief */}
        <div className="mt-12 text-center">
          <div className="bg-nhl-grijs-licht rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-3xl mb-3">🚀</div>
            <div className="font-bold text-nhl-blauw text-xl mb-2">Werk jij ook aan iets?</div>
            <p className="text-gray-600 mb-5">
              Heb je een initiatief dat hier thuishoort maar nog niet vermeld staat? 
              Meld het aan en maak het zichtbaar voor de rest van de organisatie.
            </p>
            <a
              href="#meld"
              className="inline-block bg-nhl-oranje hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Initiatief aanmelden →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
