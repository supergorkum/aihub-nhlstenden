import { Link } from 'react-router-dom'

const AMBITIES = [
  {
    id: 'studiesucces',
    label: 'Meer studiesucces',
    icon: '🎓',
    kleur: '#1E3A8A',
    lichtKleur: '#EFF6FF',
    randKleur: '#93C5FD',
  },
  {
    id: 'uitval',
    label: 'Minder uitval',
    icon: '📉',
    kleur: '#0F766E',
    lichtKleur: '#F0FDFA',
    randKleur: '#5EEAD4',
  },
  {
    id: 'vertrek',
    label: 'Minder voortijdig vertrek',
    icon: '🔄',
    kleur: '#BE185D',
    lichtKleur: '#FDF2F8',
    randKleur: '#F9A8D4',
  },
]

const IMPACT_PUNTEN = { laag: 1, gemiddeld: 2, hoog: 3 }

export function berekenImpact(items, ambitieId) {
  const relevant = items.filter(i => (i.ambities || []).includes(ambitieId))
  const aantal = relevant.length
  if (!aantal) return { aantal: 0, score: 0, max: 0, items: [] }
  const score = relevant.reduce((s, i) => s + (IMPACT_PUNTEN[i.impactInschatting] || 1), 0)
  const max = aantal * 3
  return { aantal, score, max, items: relevant }
}

export default function ImpactDashboard({ pilots = [], initiatieven = [] }) {
  const alleItems = [
    ...pilots.map(p => ({ ...p, _type: 'pilot' })),
    ...initiatieven.map(i => ({ ...i, _type: 'initiatief' })),
  ]

  const totaalGekoppeld = alleItems.filter(i => (i.ambities || []).length > 0).length

  return (
    <section className="py-0">
      {/* Donkere band — volledig breed */}
      <div className="nhl-gradient-deep text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

          {/* Kop */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-10">
            <div className="flex-1">
              <div className="text-white font-semibold text-xs uppercase tracking-widest mb-3 opacity-70">
                De kernambitie van NHL Stenden
              </div>
              <blockquote className="text-xl sm:text-2xl font-bold text-white leading-snug border-l-4 border-nhl-roze pl-4">
                "De inzet van AI moet leiden tot meer studiesucces, minder uitval en minder voortijdig vertrek."
              </blockquote>
            </div>
            <div className="flex-shrink-0 text-center bg-white/10 rounded-2xl px-8 py-5 border border-white/20">
              <div className="text-4xl font-extrabold text-white">{totaalGekoppeld}</div>
              <div className="text-blue-200 text-sm">initiatieven & pilots</div>
              <div className="text-blue-300 text-xs">gekoppeld aan deze ambitie</div>
            </div>
          </div>

          {/* Drie meters */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {AMBITIES.map(ambitie => {
              const { aantal, score, max, items } = berekenImpact(alleItems, ambitie.id)
              const pct = max > 0 ? Math.round((score / max) * 100) : 0

              return (
                <div key={ambitie.id}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors">

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{ambitie.icon}</span>
                    <span className="font-bold text-white text-sm">{ambitie.label}</span>
                  </div>

                  {/* Voortgangsbalk */}
                  <div className="mb-4">
                    <div className="h-2.5 bg-white/20 rounded-full overflow-hidden mb-1.5">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.max(pct, aantal > 0 ? 8 : 0)}%`,
                          backgroundColor: ambitie.lichtKleur
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-blue-200">
                      <span>Verwachte impact</span>
                      <span className="font-bold text-white">{pct}%</span>
                    </div>
                  </div>

                  {/* Teller + namen */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-white">{aantal}</span>
                        <span className="text-blue-200 text-xs">
                          {aantal === 1 ? 'initiatief' : 'initiatieven'}
                        </span>
                      </div>
                    </div>
                    {items.length > 0 && (
                      <div className="text-right">
                        {items.slice(0, 2).map(i => (
                          <div key={i.id + (i._type||'')} className="text-xs text-blue-200 leading-relaxed">· {i.naam}</div>
                        ))}
                        {items.length > 2 && (
                          <div className="text-xs text-blue-300">+{items.length - 2} meer</div>
                        )}
                      </div>
                    )}
                  </div>

                  {aantal === 0 && (
                    <div className="text-xs text-blue-300 italic mt-1">Nog geen initiatieven gekoppeld.</div>
                  )}
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/20">
            <p className="text-blue-200 text-sm flex-1">
              Draagt jouw initiatief of pilot bij aan deze ambitie? Koppel het en maak het zichtbaar voor het bestuur.
            </p>
            <Link to="/pilots" className="bg-white text-nhl-blauw hover:bg-blue-50 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex-shrink-0">
              Bekijk pilots →
            </Link>
            <Link to="/meld" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex-shrink-0">
              Meld initiatief
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export { AMBITIES, IMPACT_PUNTEN }
