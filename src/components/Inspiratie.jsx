import { useState } from 'react'
import { vraagCategorieen, sporen } from '../data'

const VOORBEELDEN = [
  {
    id: 1,
    rol: 'Docent',
    naam: 'Anoniem',
    categorie: 'vraag',
    categorieDef: { label: 'Vraag', icon: '❓' },
    spoor: 1,
    sporeDef: { titel: 'AI & Onderwijs', icon: '🎓' },
    titel: 'Hoe ga ik om met AI-gebruik bij scripties?',
    tekst: 'Studenten gebruiken ChatGPT voor hun scriptie. Ik weet niet wat ik wel en niet mag toestaan. Zijn er al richtlijnen vanuit de examencommissie?',
    url: '',
    datum: '18 juni 2026',
  },
  {
    id: 2,
    rol: 'Medewerker dienst',
    naam: 'Anoniem',
    categorie: 'inspiratie',
    categorieDef: { label: 'Interessante ontwikkeling', icon: '💡' },
    spoor: 2,
    sporeDef: { titel: 'AI & Organisatie', icon: '⚙️' },
    titel: 'Artikel: AI in studentbegeleiding',
    tekst: 'Interessant artikel over hoe andere hogescholen AI inzetten voor vroeg-signalering van studenten met uitvalrisico. Lijkt relevant voor onze aanpak.',
    url: 'https://example.com',
    datum: '15 juni 2026',
  },
  {
    id: 3,
    rol: 'Student',
    naam: 'Anoniem',
    categorie: 'ondersteuning',
    categorieDef: { label: 'Zoekt samenwerking', icon: '🤝' },
    spoor: 4,
    sporeDef: { titel: 'AI-Geletterdheid', icon: '📖' },
    titel: 'Wil leren hoe ik AI verantwoord gebruik in mijn studie',
    tekst: 'Ik gebruik AI al veel maar weet niet altijd of ik het goed doe. Is er een cursus of workshop waar ik meer over kan leren?',
    url: '',
    datum: '12 juni 2026',
  },
]

export default function Inspiratie({ berichten }) {
  const [filterCat, setFilterCat] = useState(null)

  const alle = [...VOORBEELDEN, ...berichten]
  const gefilterd = filterCat ? alle.filter(b => b.categorie === filterCat) : alle

  const catTelling = (id) => alle.filter(b => b.categorie === id).length

  return (
    <section id="inspiratie" className="py-20 bg-nhl-grijs-licht">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-nhl-oranje font-semibold text-sm uppercase tracking-wider">Van de organisatie</span>
          <h2 className="text-3xl font-bold text-nhl-blauw mt-2 mb-4">Vragen & inzichten</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Wat leeft er in de organisatie? Hier zie je vragen, ideeën en signalen van collega's 
            en studenten. Herken je iets? Voeg jouw eigen bijdrage toe.
          </p>
        </div>

        {/* Filter op categorie */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setFilterCat(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !filterCat ? 'bg-nhl-blauw text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Alles ({alle.length})
          </button>
          {vraagCategorieen.map(cat => {
            const n = catTelling(cat.id)
            if (n === 0) return null
            return (
              <button
                key={cat.id}
                onClick={() => setFilterCat(filterCat === cat.id ? null : cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterCat === cat.id
                    ? 'bg-nhl-blauw text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.icon} {cat.label} ({n})
              </button>
            )
          })}
        </div>

        {/* Masonry-achtige grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {gefilterd.map((bericht) => (
            <div
              key={bericht.id}
              className="break-inside-avoid bg-white rounded-2xl p-5 border border-gray-200 card-hover"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{bericht.categorieDef?.icon || '💬'}</span>
                  <span className="text-xs text-gray-500 font-medium">
                    {bericht.categorieDef?.label || bericht.categorie}
                  </span>
                </div>
                {bericht.sporeDef && (
                  <span className="text-xs bg-nhl-grijs-licht text-gray-600 px-2 py-0.5 rounded-full">
                    {bericht.sporeDef.icon} {bericht.sporeDef.titel}
                  </span>
                )}
              </div>

              {/* Titel */}
              <div className="font-semibold text-nhl-blauw mb-2 leading-snug">{bericht.titel}</div>

              {/* Tekst */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{bericht.tekst}</p>

              {/* URL */}
              {bericht.url && (
                <a
                  href={bericht.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-nhl-teal text-xs underline mb-3"
                >
                  🔗 Bekijk link
                </a>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-400">
                  {bericht.naam && bericht.naam !== 'Anoniem' ? bericht.naam : bericht.rol || 'Onbekend'} · {bericht.datum}
                </div>
                {bericht.id > 1000 && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    Nieuw
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {gefilterd.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <div>Nog geen bijdragen in deze categorie.</div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#meld"
            className="inline-block bg-nhl-blauw hover:bg-nhl-blauw-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            + Voeg jouw bijdrage toe
          </a>
        </div>
      </div>
    </section>
  )
}
