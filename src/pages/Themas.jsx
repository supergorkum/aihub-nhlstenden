import GradientHeader from '../components/GradientHeader'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { sporen } from '../data'
import PageHeader from '../components/PageHeader'

export default function Themas() {
  const location = useLocation()
  const [actief, setActief] = useState(() => {
    const spoor = new URLSearchParams(location.search).get('spoor')
    return spoor ? parseInt(spoor) : 1
  })

  useEffect(() => {
    const spoor = new URLSearchParams(location.search).get('spoor')
    if (spoor) setActief(parseInt(spoor))
  }, [location.search])
  const thema = sporen.find(s => s.id === actief)

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <GradientHeader label="Vier thema's" title="AI Thema's" subtitle="De vier sporen waarlangs NHL Stenden AI aanpakt." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
<div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Thema kiezer */}
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
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{s.icon}</span>
                  <span className={`font-bold text-base ${actief === s.id ? 'text-white' : 'text-nhl-blauw'}`}>{s.titel}</span>
                </div>
                <p className={`text-sm leading-relaxed ${actief === s.id ? 'text-white/80' : 'text-gray-500'}`}>{s.kort}</p>
                <div className={`mt-3 text-xs font-medium ${actief === s.id ? 'text-white/60' : 'text-nhl-roze'}`}>
                  {actief === s.id ? 'Geselecteerd ✓' : 'Bekijk thema →'}
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          {thema && (
            <div className="lg:col-span-2 animate-slide-up">
              <div className="card p-8 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-5">
                  <div className="text-4xl">{thema.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-nhl-blauw mb-1">{thema.titel}</h2>
                    <div className="w-14 h-1.5 rounded-full" style={{ backgroundColor: thema.kleur }} />
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4 text-base">{thema.waarom}</p>
                {thema.uitleg && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Wat valt hieronder?</div>
                    <p className="text-gray-600 text-sm leading-relaxed">{thema.uitleg}</p>
                  </div>
                )}

                <div className="mb-6">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Vraagstukken binnen dit thema</div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {thema.themas.map(t => (
                      <div key={t} className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-700 border border-gray-100">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: thema.kleur }} />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-3">
                    <Link to="/initiatieven" className="btn-primary text-sm">
                      Initiatieven in dit thema →
                    </Link>
                    <Link to="/meld" className="btn-ghost text-sm border border-gray-200">
                      Bijdrage melden
                    </Link>
                    <Link to="/netwerk" className="btn-ghost text-sm border border-gray-200">
                      Bekijk in netwerk
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Geletterdheid basis */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 mb-10">
          <div className="flex gap-4 items-start">
            <span className="text-3xl">📖</span>
            <div>
              <div className="font-bold text-purple-900 mb-2 text-lg">AI-Geletterdheid: de basis onder alles</div>
              <p className="text-purple-700 text-sm leading-relaxed mb-3">
                Geen enkel ander thema werkt zonder mensen die begrijpen wat AI is en wat het van hen vraagt. 
                Geletterdheid is geen eenmalige training maar een doorlopend fundament — voor bestuurders, 
                docenten, studenten en medewerkers. Het is de sleutel tot eigenaarschap, en eigenaarschap 
                is de sleutel tot duurzame verandering.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://npuls.nl/onderwerpen/digitale-geletterdheid" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-purple-700 text-sm font-medium hover:text-purple-900 underline">
                  NPULS Digitale Geletterdheid ↗
                </a>
                <Link to="/meld" className="inline-flex items-center gap-1.5 text-purple-700 text-sm font-medium hover:text-purple-900 underline">
                  Meld een geletterdheidsactiviteit →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Verbinding met fundament */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="text-2xl">🏗️</div>
            <div className="flex-1">
              <div className="font-bold text-nhl-blauw mb-1">De thema's bouwen op het fundament</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Elk thema staat niet op zichzelf. Achter de thema's ligt het vijflagenmodel als technisch 
                en organisatorisch fundament. Van energie en infrastructuur tot de toepassingen die 
                iedereen dagelijks ziet. Elke laag heeft een eigen eigenaar en verantwoordelijkheid.
              </p>
              <Link to="/fundament" className="inline-flex items-center gap-1.5 text-nhl-blauw text-sm font-semibold hover:underline">
                Bekijk het fundament →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
