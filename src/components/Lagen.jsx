import { useState } from 'react'
import { lagen } from '../data'

export default function Lagen() {
  const [actief, setActief] = useState(null)

  return (
    <section id="wat" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Links: uitleg */}
          <div>
            <span className="text-nhl-oranje font-semibold text-sm uppercase tracking-wider">Het fundament</span>
            <h2 className="text-3xl font-bold text-nhl-blauw mt-2 mb-6">
              AI is een gelaagd systeem
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Wat we zien als een simpele chatbot is het topje van de ijsberg. 
              Achter elke AI-toepassing gaat een gelaagd systeem schuil — 
              van energievoorziening tot eindgebruiker.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              De AI-HUB gebruikt dit vijflagenmodel om overzicht te brengen: 
              elke laag heeft een <strong>eigen eigenaar</strong> en eigen vraagstukken. 
              Zo weet iedereen wie waarvoor verantwoordelijk is.
            </p>
            <div className="bg-blue-50 border border-nhl-blauw/20 rounded-xl p-4">
              <p className="text-nhl-blauw text-sm font-medium">
                💡 Lagen 1 t/m 4 vormen het fundament (dienstverlening). 
                Laag 5 is het speelveld voor onderwijs en innovatie.
              </p>
            </div>
          </div>

          {/* Rechts: interactieve lagen */}
          <div>
            <div className="space-y-2">
              {lagen.map((laag) => (
                <button
                  key={laag.nr}
                  onClick={() => setActief(actief === laag.nr ? null : laag.nr)}
                  className={`w-full text-left rounded-xl p-4 transition-all duration-200 border-2 ${
                    actief === laag.nr
                      ? 'border-transparent text-white shadow-lg scale-[1.02]'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                  style={actief === laag.nr ? { backgroundColor: laag.kleur } : {}}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                      style={{ backgroundColor: laag.kleur }}
                    >
                      {laag.nr}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold flex items-center gap-2 ${actief === laag.nr ? 'text-white' : 'text-nhl-blauw'}`}>
                        {laag.naam}
                        {laag.urgent && (
                          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-medium">
                            Urgent
                          </span>
                        )}
                      </div>
                      <div className={`text-sm mt-0.5 ${actief === laag.nr ? 'text-white/80' : 'text-gray-500'}`}>
                        {laag.omschrijving}
                      </div>
                    </div>
                    <div className={`text-sm font-medium flex-shrink-0 ${actief === laag.nr ? 'text-white/70' : 'text-gray-400'}`}>
                      {actief === laag.nr ? '▲' : '▼'}
                    </div>
                  </div>

                  {actief === laag.nr && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="text-xs text-white/70 uppercase tracking-wider mb-1">Primaire eigenaar</div>
                      <div className="text-white font-semibold">{laag.eigenaar}</div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
