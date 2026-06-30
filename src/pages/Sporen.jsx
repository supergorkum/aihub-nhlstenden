import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sporen, lagen } from '../data'
import PageHeader from '../components/PageHeader'

export default function Sporen() {
  const [actief, setActief] = useState(1)

  const spoor = sporen.find(s => s.id === actief)

  return (
    <div className="min-h-screen pt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <PageHeader
          label="Vier ingangen"
          title="De vier sporen"
          subtitle="Iedereen heeft een eigen ingang tot de AI-HUB. Kies het spoor dat het beste bij jouw vraagstuk past: of verken ze allemaal. Ze zijn met elkaar verweven."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Spoor kiezer */}
          <div className="space-y-3">
            {sporen.map(s => (
              <button
                key={s.id}
                onClick={() => setActief(s.id)}
                className={`w-full text-left rounded-2xl p-5 border-2 transition-all duration-200 ${
                  actief === s.id
                    ? 'border-transparent text-white shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
                style={actief === s.id ? { backgroundColor: s.kleur } : {}}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <span className={`font-bold ${actief === s.id ? 'text-white' : 'text-nhl-blauw'}`}>{s.titel}</span>
                </div>
                <p className={`text-sm mt-2 leading-relaxed ${actief === s.id ? 'text-white/80' : 'text-gray-500'}`}>{s.kort}</p>
              </button>
            ))}
          </div>

          {/* Detail */}
          {spoor && (
            <div className="lg:col-span-2 animate-slide-up">
              <div className="card p-8 h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-4xl">{spoor.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-nhl-blauw mb-1">{spoor.titel}</h2>
                    <div className="w-12 h-1 rounded-full" style={{ backgroundColor: spoor.kleur }} />
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 text-base">{spoor.waarom}</p>
                <div className="mb-8">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Thema's in dit spoor</div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {spoor.themas.map(t => (
                      <div key={t} className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-700">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: spoor.kleur }} />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link to="/initiatieven" className="btn-primary">
                    Initiatieven in dit spoor →
                  </Link>
                  <Link to="/meld" className="btn-ghost">
                    Bijdrage melden
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Geletterdheid basis */}
        <div className="mt-10 bg-purple-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex gap-4 items-start">
            <span className="text-2xl">📖</span>
            <div>
              <div className="font-bold text-purple-900 mb-1">AI-Geletterdheid is de basis onder alles</div>
              <p className="text-purple-700 text-sm leading-relaxed">
                Geen enkel spoor werkt zonder mensen die begrijpen wat AI is en wat het van hen vraagt. 
                Geletterdheid is geen eenmalige training maar een doorlopend fundament. Aansluiting bij{' '}
                <a href="https://npuls.nl/onderwerpen/digitale-geletterdheid" target="_blank" rel="noopener noreferrer" className="underline font-medium">NPULS Digitale Geletterdheid</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Vijf lagen uitleg */}
        <div className="mt-10">
          <div className="section-label mb-3">Het fundament</div>
          <h2 className="text-xl font-bold text-nhl-blauw mb-6">De vijf lagen achter de sporen</h2>
          <div className="space-y-2">
            {lagen.map(laag => (
              <div key={laag.nr} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: laag.kleur }}>
                  {laag.nr}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-nhl-blauw text-sm">{laag.naam}</span>
                    {laag.urgent && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">Urgent</span>}
                  </div>
                  <div className="text-gray-500 text-xs mt-0.5">{laag.omschrijving}</div>
                </div>
                <div className="text-xs text-gray-400 italic hidden sm:block">{laag.eigenaar}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
