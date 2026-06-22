import { useState } from 'react'
import { Link } from 'react-router-dom'
import { vraagCategorieen, sporen } from '../data'
import PageHeader from '../components/PageHeader'

const VOORBEELDEN = [
  { id: 1, rol: 'Docent', naam: 'Anoniem', categorie: 'vraag', categorieDef: { label: 'Vraag', icon: '❓' }, spoor: 1, sporeDef: { titel: 'AI & Onderwijs', icon: '🎓' }, titel: 'Hoe ga ik om met AI-gebruik bij scripties?', tekst: 'Studenten gebruiken ChatGPT voor hun scriptie. Ik weet niet wat ik wel en niet mag toestaan. Zijn er al richtlijnen vanuit de examencommissie?', url: '', datum: '18 juni 2026', bestandNaam: null },
  { id: 2, rol: 'Medewerker dienst', naam: 'Anoniem', categorie: 'inspiratie', categorieDef: { label: 'Interessante ontwikkeling', icon: '💡' }, spoor: 2, sporeDef: { titel: 'AI & Organisatie', icon: '⚙️' }, titel: 'AI in studentbegeleiding — interessant artikel', tekst: 'Hoe andere hogescholen AI inzetten voor vroeg-signalering van studenten met uitvalrisico. Lijkt relevant voor onze aanpak.', url: 'https://surf.nl', datum: '15 juni 2026', bestandNaam: null },
  { id: 3, rol: 'Student', naam: 'Anoniem', categorie: 'ondersteuning', categorieDef: { label: 'Zoekt samenwerking', icon: '🤝' }, spoor: 4, sporeDef: { titel: 'AI-Geletterdheid', icon: '📖' }, titel: 'Wil leren hoe ik AI verantwoord gebruik in mijn studie', tekst: 'Ik gebruik AI al veel maar weet niet altijd of ik het goed doe. Is er een cursus of workshop?', url: '', datum: '12 juni 2026', bestandNaam: null },
]

const catKleur = {
  vraag: 'bg-blue-50 text-blue-700 border-blue-200',
  initiatief: 'bg-green-50 text-green-700 border-green-200',
  inspiratie: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  ondersteuning: 'bg-purple-50 text-purple-700 border-purple-200',
  zorg: 'bg-red-50 text-red-700 border-red-200',
}

export default function Inspiratie({ berichten }) {
  const [filterCat, setFilterCat] = useState(null)
  const alle = [...VOORBEELDEN, ...berichten]
  const gefilterd = filterCat ? alle.filter(b => b.categorie === filterCat) : alle

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
          <PageHeader label="Van de organisatie" title="Vragen & inspiratie" subtitle="Wat leeft er in de organisatie? Hier zie je vragen, ideeën en signalen van collega's en studenten." />
          <Link to="/meld" className="btn-roze flex-shrink-0 self-start">+ Voeg toe</Link>
        </div>

        {/* Categorie filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setFilterCat(null)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${!filterCat ? 'bg-nhl-blauw text-white border-nhl-blauw' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
            Alles ({alle.length})
          </button>
          {vraagCategorieen.map(cat => {
            const n = alle.filter(b => b.categorie === cat.id).length
            if (!n) return null
            return (
              <button key={cat.id} onClick={() => setFilterCat(filterCat === cat.id ? null : cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${filterCat === cat.id ? 'bg-nhl-blauw text-white border-nhl-blauw' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                {cat.icon} {cat.label} ({n})
              </button>
            )
          })}
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {gefilterd.map(b => (
            <div key={b.id} className="break-inside-avoid bg-white rounded-2xl p-5 border border-gray-200 card-hover">
              <div className="flex items-start justify-between mb-3 gap-2">
                <div className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium ${catKleur[b.categorie] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                  <span>{b.categorieDef?.icon}</span>
                  <span>{b.categorieDef?.label}</span>
                </div>
                {b.sporeDef && (
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex-shrink-0">
                    {b.sporeDef.icon} {b.sporeDef.titel}
                  </span>
                )}
              </div>
              <div className="font-semibold text-nhl-blauw mb-2 leading-snug text-sm">{b.titel}</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{b.tekst}</p>
              {b.url && (
                <a href={b.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-nhl-roze text-xs font-medium hover:underline mb-3">
                  🔗 Bekijk link
                </a>
              )}
              {b.bestandNaam && (
                <div className="inline-flex items-center gap-1 text-nhl-blauw text-xs font-medium mb-3">
                  📎 {b.bestandNaam}
                </div>
              )}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-400">{b.naam && b.naam !== 'Anoniem' ? b.naam : b.rol} · {b.datum}</div>
                {b.id > 1000 && <span className="text-xs bg-nhl-roze/10 text-nhl-roze px-2 py-0.5 rounded-full font-medium">Nieuw</span>}
              </div>
            </div>
          ))}
        </div>

        {gefilterd.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <div className="font-medium">Nog geen bijdragen in deze categorie.</div>
          </div>
        )}
      </div>
    </div>
  )
}
