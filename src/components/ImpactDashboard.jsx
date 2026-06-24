import { Link } from 'react-router-dom'

const AMBITIES = [
  {
    id: 'studiesucces',
    label: 'Meer studiesucces',
    icon: '🎓',
    kleur: '#1E3A8A',
    lichtKleur: '#93C5FD',
    bg: 'bg-blue-900/40',
    border: 'border-blue-400/30',
  },
  {
    id: 'uitval',
    label: 'Minder uitval',
    icon: '📉',
    kleur: '#0F766E',
    lichtKleur: '#5EEAD4',
    bg: 'bg-teal-900/40',
    border: 'border-teal-400/30',
  },
  {
    id: 'vertrek',
    label: 'Minder voortijdig vertrek',
    icon: '🔄',
    kleur: '#BE185D',
    lichtKleur: '#F9A8D4',
    bg: 'bg-pink-900/40',
    border: 'border-pink-400/30',
  },
]

const THEMA_AMBITIES = [
  {
    icon: '🎓',
    kleur: '#1E3A8A',
    thema: 'AI & Leren',
    ambitie: 'De inzet van AI moet leiden tot meer studiesucces, minder uitval en minder voortijdig vertrek.',
    to: '/themas?spoor=1',
  },
  {
    icon: '⚙️',
    kleur: '#0F766E',
    thema: 'AI & Werken',
    ambitie: 'NHL Stenden zet AI in om de efficiency van werkprocessen te verhogen, zodat medewerkers hun expertise voluit kunnen richten op onderwijs, begeleiding en samenwerking.',
    to: '/themas?spoor=2',
  },
  {
    icon: '⚖️',
    kleur: '#E91E8C',
    thema: 'AI & Verantwoordelijkheid',
    ambitie: 'NHL Stenden gebruikt AI alleen op een manier die transparant, controleerbaar en eerlijk is, en die past binnen de waarden van de instelling en de eisen van wet en samenleving.',
    to: '/themas?spoor=3',
  },
  {
    icon: '📖',
    kleur: '#7C3AED',
    thema: 'AI & Geletterdheid',
    ambitie: 'NHL Stenden zorgt ervoor dat AI-geletterdheid een basisvaardigheid is voor alle studenten en medewerkers, zodat niemand afhankelijk is van AI zonder het te begrijpen.',
    to: '/themas?spoor=4',
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

const IMPACT_DOT = {
  laag: 'bg-yellow-300',
  gemiddeld: 'bg-blue-300',
  hoog: 'bg-green-400',
  null: 'bg-gray-400',
}

export default function ImpactDashboard({ pilots = [], initiatieven = [] }) {
  const alleItems = [
    ...pilots.map(p => ({ ...p, _type: 'pilot' })),
    ...initiatieven.map(i => ({ ...i, _type: 'initiatief' })),
  ]

  const totaalGekoppeld = alleItems.filter(i => (i.ambities || []).length > 0).length
  const totaalItems = alleItems.length

  return (
    <section className="py-0">
      <div className="nhl-gradient-deep text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

          {/* Overkoepelende kernambitie */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-10">
            <div className="flex-1">
              <div className="text-white font-semibold text-xs uppercase tracking-widest mb-3 opacity-70">
                De kernambitie van NHL Stenden
              </div>
              <blockquote className="text-xl sm:text-2xl font-bold text-white leading-snug border-l-4 border-nhl-roze pl-4 mb-4">
                "NHL Stenden benut AI om studiesucces te vergroten, werkprocessen te versterken en een verantwoorde digitale cultuur te bouwen, gedragen door iedereen die hier werkt en leert."
              </blockquote>
              <p className="text-blue-200 text-sm leading-relaxed max-w-xl">
                Hieronder zie je hoeveel initiatieven en pilots expliciet aan de ambitie van AI & Leren zijn gekoppeld — en welke dat zijn.
                De verwachte impact per item is ingeschat door degene die het heeft aangemeld.
              </p>
            </div>
            <div className="flex-shrink-0 text-center bg-white/10 rounded-2xl px-8 py-5 border border-white/20">
              <div className="text-4xl font-extrabold text-white">{totaalGekoppeld}</div>
              <div className="text-blue-200 text-sm">van {totaalItems} initiatieven</div>
              <div className="text-blue-300 text-xs mt-0.5">gekoppeld aan de ambitie</div>
            </div>
          </div>

          {/* AI & Leren impact — drie kolommen */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {AMBITIES.map(ambitie => {
              const { aantal, items } = berekenImpact(alleItems, ambitie.id)
              const hoog = items.filter(i => i.impactInschatting === 'hoog').length
              const gemiddeld = items.filter(i => i.impactInschatting === 'gemiddeld').length
              const laag = items.filter(i => i.impactInschatting === 'laag' || !i.impactInschatting).length

              return (
                <div key={ambitie.id}
                  className={`${ambitie.bg} backdrop-blur-sm border ${ambitie.border} rounded-2xl p-5`}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{ambitie.icon}</span>
                    <span className="font-bold text-white text-sm leading-snug">{ambitie.label}</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-4xl font-extrabold text-white">{aantal}</span>
                    <span className="text-blue-200 text-xs">
                      {aantal === 1 ? 'initiatief' : 'initiatieven'}
                    </span>
                  </div>
                  {aantal > 0 && (
                    <div className="flex gap-2 mb-4">
                      {hoog > 0 && (
                        <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-0.5 text-xs text-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                          {hoog}× hoog
                        </div>
                      )}
                      {gemiddeld > 0 && (
                        <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-0.5 text-xs text-blue-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0" />
                          {gemiddeld}× gem.
                        </div>
                      )}
                      {laag > 0 && (
                        <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-0.5 text-xs text-yellow-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 flex-shrink-0" />
                          {laag}× laag
                        </div>
                      )}
                    </div>
                  )}
                  {items.length > 0 ? (
                    <div className="space-y-1.5">
                      {items.map(i => (
                        <div key={i.id + (i._type || '')}
                          className="flex items-start gap-2 text-xs text-blue-100 leading-snug">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1 ${IMPACT_DOT[i.impactInschatting] || IMPACT_DOT.null}`} />
                          <span>{i.naam}</span>
                          {i._type === 'pilot' && (
                            <span className="ml-auto flex-shrink-0 text-blue-300 text-xs">pilot</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-blue-300 italic">Nog geen initiatieven gekoppeld.</div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-10" />

          {/* Kernambities per thema */}
          <div className="mb-8">
            <div className="text-white font-semibold text-xs uppercase tracking-widest mb-5 opacity-70">
              Kernambities per thema
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {THEMA_AMBITIES.map(k => (
                <Link key={k.thema} to={k.to}
                  className="group bg-white/8 hover:bg-white/15 border border-white/15 rounded-2xl p-5 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                      style={{ backgroundColor: k.kleur + '40' }}>
                      {k.icon}
                    </div>
                    <div className="font-bold text-white text-sm group-hover:text-nhl-roze-light transition-colors">
                      {k.thema}
                    </div>
                    <span className="ml-auto text-white/30 group-hover:text-white/70 transition-colors text-xs">→</span>
                  </div>
                  <div className="h-0.5 w-8 rounded-full mb-3 transition-all group-hover:w-16" style={{ backgroundColor: k.kleur }} />
                  <p className="text-blue-200 text-xs leading-relaxed italic">"{k.ambitie}"</p>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/20">
            <p className="text-blue-200 text-sm flex-1">
              Draagt jouw initiatief of pilot bij aan deze ambities? Koppel het bij aanmelding.
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
