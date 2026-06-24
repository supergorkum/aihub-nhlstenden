import { Link } from 'react-router-dom'
import { useState } from 'react'
import { sporen } from '../data'

const KERNAMBITIES = {
  1: 'De inzet van AI moet leiden tot meer studiesucces, minder uitval en minder voortijdig vertrek.',
  2: 'NHL Stenden zet AI in om de efficiency van werkprocessen te verhogen, zodat medewerkers hun expertise voluit kunnen richten op onderwijs, begeleiding en samenwerking.',
  3: 'NHL Stenden gebruikt AI alleen op een manier die transparant, controleerbaar en eerlijk is, en die past binnen de waarden van de instelling en de eisen van wet en samenleving.',
  4: 'NHL Stenden zorgt ervoor dat AI-geletterdheid een basisvaardigheid is voor alle studenten en medewerkers, zodat niemand afhankelijk is van AI zonder het te begrijpen.',
  5: 'NHL Stenden verbindt de kennis en toepassingen van AI met het werkveld, zodat studenten en professionals samen leren en bijdragen aan innovatie in de regio.',
  6: 'NHL Stenden bouwt aan een sterke onderzoekscultuur rondom AI, waarbij lectoraten, docenten en studenten samen bijdragen aan kennis die praktisch toepasbaar is en maatschappelijk relevant.',
}

export const IMPACT_PUNTEN = { laag: 1, gemiddeld: 2, hoog: 3 }
const IMPACT_DOT = { laag: 'bg-yellow-300', gemiddeld: 'bg-blue-300', hoog: 'bg-green-400' }

const THEMA_CONFIG = [
  {
    id: 1, spoorId: 1, kleur: '#1E3A8A', sectieLabel: 'AI & Leren',
    impactDimensies: ['studiesucces', 'uitval', 'vertrek'],
    impactLabels: { studiesucces: 'Meer studiesucces', uitval: 'Minder uitval', vertrek: 'Minder voortijdig vertrek' },
    impactIcons:  { studiesucces: '🎓', uitval: '📉', vertrek: '🔄' },
    impactBg:     { studiesucces: 'bg-blue-900/40 border-blue-400/30', uitval: 'bg-teal-900/40 border-teal-400/30', vertrek: 'bg-pink-900/40 border-pink-400/30' },
    toonPilots: true, toonEvenementen: true, toonGeletterdheid: false, toonWerkveld: false, toonOnderzoek: false,
    initiatiefFilter: (i) => i.spoor === 1 || (i.ambities && (i.ambities.includes('studiesucces') || i.ambities.includes('uitval') || i.ambities.includes('vertrek'))),
  },
  {
    id: 2, spoorId: 2, kleur: '#0F766E', sectieLabel: 'AI & Werken',
    impactDimensies: ['efficiency', 'automatisering', 'samenwerking'],
    impactLabels: { efficiency: 'Hogere efficiency', automatisering: 'Procesautomatisering', samenwerking: 'Betere samenwerking' },
    impactIcons:  { efficiency: '⚡', automatisering: '🤖', samenwerking: '🤝' },
    impactBg:     { efficiency: 'bg-teal-900/40 border-teal-400/30', automatisering: 'bg-emerald-900/40 border-emerald-400/30', samenwerking: 'bg-cyan-900/40 border-cyan-400/30' },
    toonPilots: true, toonEvenementen: true, toonGeletterdheid: false, toonWerkveld: false, toonOnderzoek: false,
    initiatiefFilter: (i) => i.spoor === 2,
  },
  {
    id: 3, spoorId: 3, kleur: '#E91E8C', sectieLabel: 'AI & Verantwoordelijkheid',
    impactDimensies: ['transparantie', 'compliance', 'governance'],
    impactLabels: { transparantie: 'Transparantie', compliance: 'AI Act compliance', governance: 'Governance & eigenaarschap' },
    impactIcons:  { transparantie: '🔍', compliance: '⚖️', governance: '🏛️' },
    impactBg:     { transparantie: 'bg-rose-900/40 border-rose-400/30', compliance: 'bg-pink-900/40 border-pink-400/30', governance: 'bg-fuchsia-900/40 border-fuchsia-400/30' },
    toonPilots: false, toonEvenementen: true, toonGeletterdheid: false, toonWerkveld: false, toonOnderzoek: false,
    initiatiefFilter: (i) => i.spoor === 3,
  },
  {
    id: 4, spoorId: 4, kleur: '#7C3AED', sectieLabel: 'AI & Geletterdheid',
    impactDimensies: ['begrip', 'vaardigheid', 'eigenaarschap'],
    impactLabels: { begrip: 'Begrip & bewustwording', vaardigheid: 'Praktische vaardigheid', eigenaarschap: 'Eigenaarschap & regie' },
    impactIcons:  { begrip: '🧠', vaardigheid: '🛠️', eigenaarschap: '💬' },
    impactBg:     { begrip: 'bg-violet-900/40 border-violet-400/30', vaardigheid: 'bg-purple-900/40 border-purple-400/30', eigenaarschap: 'bg-indigo-900/40 border-indigo-400/30' },
    toonPilots: true, toonEvenementen: true, toonGeletterdheid: true, toonWerkveld: false, toonOnderzoek: false,
    initiatiefFilter: (i) => i.spoor === 4,
  },
  {
    id: 5, spoorId: 5, kleur: '#B45309', sectieLabel: 'AI & Werkveld',
    impactDimensies: ['innovatie', 'valorisatie', 'samenwerking'],
    impactLabels: { innovatie: 'Regionale innovatie', valorisatie: 'Valorisatie & overdracht', samenwerking: 'Werkveldverbinding' },
    impactIcons:  { innovatie: '🏭', valorisatie: '🔬', samenwerking: '🤝' },
    impactBg:     { innovatie: 'bg-amber-900/40 border-amber-400/30', valorisatie: 'bg-orange-900/40 border-orange-400/30', samenwerking: 'bg-yellow-900/40 border-yellow-400/30' },
    toonPilots: true, toonEvenementen: true, toonGeletterdheid: false, toonWerkveld: true, toonOnderzoek: false,
    initiatiefFilter: (i) => i.spoor === 5,
  },
  {
    id: 6, spoorId: 6, kleur: '#0E7490', sectieLabel: 'AI & Onderzoek',
    impactDimensies: ['kennisbasis', 'publicaties', 'toepassing'],
    impactLabels: { kennisbasis: 'Kennisbasis AI', publicaties: 'Publicaties & disseminatie', toepassing: 'Praktijktoepassing' },
    impactIcons:  { kennisbasis: '📚', publicaties: '📄', toepassing: '🔭' },
    impactBg:     { kennisbasis: 'bg-cyan-900/40 border-cyan-400/30', publicaties: 'bg-sky-900/40 border-sky-400/30', toepassing: 'bg-teal-900/40 border-teal-400/30' },
    toonPilots: false, toonEvenementen: true, toonGeletterdheid: false, toonWerkveld: false, toonOnderzoek: true,
    initiatiefFilter: (i) => i.spoor === 6,
  },
]

function ThemaDashboard({ config, alleItems, pilots, evenementen, spoor }) {
  const themaInitiatieven = alleItems.filter(config.initiatiefFilter)
  const themaPilots = pilots.filter(p => p.spoor === config.spoorId || (p.themas && p.themas.includes(config.spoorId)))
  const themaEvenementen = evenementen.filter(e => e.spoor === config.spoorId || (e.themas && e.themas.includes(config.spoorId))).slice(0, 2)

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{spoor?.icon}</span>
            <div>
              <div className="text-white font-semibold text-xs uppercase tracking-widest opacity-70">Kernambitie</div>
              <div className="text-white font-bold text-lg">{config.sectieLabel}</div>
            </div>
          </div>
          <blockquote className="text-base sm:text-lg font-medium text-white leading-snug border-l-4 pl-4 mb-3"
            style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
            "{KERNAMBITIES[config.id]}"
          </blockquote>
        </div>
        <div className="flex-shrink-0 text-center bg-white/10 rounded-2xl px-6 py-4 border border-white/20 min-w-32">
          <div className="text-3xl font-extrabold text-white">{themaInitiatieven.length}</div>
          <div className="text-white/70 text-xs mt-0.5">initiatief{themaInitiatieven.length !== 1 ? 'en' : ''}</div>
          <div className="text-white/50 text-xs">in dit thema</div>
        </div>
      </div>

      {/* Impactdimensies */}
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {config.impactDimensies.map(dim => {
          const rel = themaInitiatieven.filter(i =>
            (i.ambities || []).includes(dim) || (i.tags || []).some(t => t.toLowerCase().includes(dim.toLowerCase()))
          )
          const hoog = rel.filter(i => i.impactInschatting === 'hoog').length
          const gem  = rel.filter(i => i.impactInschatting === 'gemiddeld').length
          return (
            <div key={dim} className={`backdrop-blur-sm border rounded-2xl p-4 ${config.impactBg[dim]}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{config.impactIcons[dim]}</span>
                <span className="font-bold text-white text-xs leading-snug">{config.impactLabels[dim]}</span>
              </div>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-3xl font-extrabold text-white">{rel.length}</span>
                <span className="text-white/60 text-xs">gekoppeld</span>
              </div>
              {rel.length > 0 ? (
                <div className="flex gap-1.5 flex-wrap">
                  {hoog > 0 && <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-0.5 text-xs text-green-200"><span className="w-1.5 h-1.5 rounded-full bg-green-400" />{hoog}× hoog</div>}
                  {gem  > 0 && <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-0.5 text-xs text-blue-200"><span className="w-1.5 h-1.5 rounded-full bg-blue-300" />{gem}× gem.</div>}
                </div>
              ) : (
                <div className="text-xs text-white/40 italic">Nog geen items gekoppeld.</div>
              )}
            </div>
          )
        })}
      </div>

      {/* Initiatieven / Pilots / Evenementen */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">🚀 Initiatieven</div>
          {themaInitiatieven.length > 0 ? (
            <div className="space-y-1.5">
              {themaInitiatieven.slice(0, 5).map(i => (
                <div key={i.id} className="flex items-start gap-2 text-xs text-white/80 leading-snug">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1 ${IMPACT_DOT[i.impactInschatting] || 'bg-gray-400'}`} />
                  {i.naam}
                </div>
              ))}
              {themaInitiatieven.length > 5 && <div className="text-xs text-white/40 mt-1">+{themaInitiatieven.length - 5} meer</div>}
            </div>
          ) : (
            <div className="text-xs text-white/40 italic">Nog geen initiatieven.</div>
          )}
          <Link to="/initiatieven" className="mt-3 text-xs text-white/60 hover:text-white transition-colors block">Alle initiatieven →</Link>
        </div>

        {config.toonPilots && (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">🧪 Pilots</div>
            {themaPilots.length > 0 ? (
              <div className="space-y-2">
                {themaPilots.slice(0, 3).map(p => (
                  <div key={p.id} className="text-xs text-white/80">
                    <div className="font-medium leading-snug">{p.naam}</div>
                    <div className="text-white/50">{p.academie} · {p.status}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-white/40 italic">Nog geen pilots.</div>
            )}
            <Link to="/pilots" className="mt-3 text-xs text-white/60 hover:text-white transition-colors block">Alle pilots →</Link>
          </div>
        )}

        {config.toonEvenementen && (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">📅 Evenementen</div>
            {themaEvenementen.length > 0 ? (
              <div className="space-y-2">
                {themaEvenementen.map(e => (
                  <div key={e.id} className="text-xs text-white/80">
                    <div className="font-medium leading-snug">{e.naam}</div>
                    <div className="text-white/50">{e.datum} · {e.locatie?.split(',')[0]}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-white/40 italic">Nog geen evenementen.</div>
            )}
            <Link to="/evenementen" className="mt-3 text-xs text-white/60 hover:text-white transition-colors block">Alle evenementen →</Link>
          </div>
        )}

        {config.toonGeletterdheid && (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">📖 Doelgroepen</div>
            <div className="grid grid-cols-2 gap-1.5">
              {['Studenten','Docenten','Medewerkers','Management','Onderwijs & Curriculum','Diensten'].map(d => (
                <div key={d} className="text-xs text-white/80 bg-white/10 rounded-lg px-2 py-1 text-center leading-snug">{d}</div>
              ))}
            </div>
            <Link to="/geletterdheid" className="mt-3 text-xs text-white/60 hover:text-white transition-colors block">Naar AI & Geletterdheid →</Link>
          </div>
        )}

        {config.toonWerkveld && (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">🏭 Werkveldpartners</div>
            <div className="space-y-1.5">
              {['Lectoraat Computer Vision & AI','Regionale zorginstellingen','Techniek & industrie Noord','Student-bedrijf projecten'].map(p => (
                <div key={p} className="text-xs text-white/80 flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1" />
                  {p}
                </div>
              ))}
            </div>
            <Link to="/netwerk" className="mt-3 text-xs text-white/60 hover:text-white transition-colors block">Naar het netwerk →</Link>
          </div>
        )}

        {config.toonOnderzoek && (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">🔬 Lectoraten</div>
            <div className="space-y-1.5">
              {['Lectoraat Computer Vision & AI','Applied Research AI','AI-ethiek onderzoekslijn','Studentonderzoek & AI'].map(p => (
                <div key={p} className="text-xs text-white/80 flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-1" />
                  {p}
                </div>
              ))}
            </div>
            <Link to="/initiatieven" className="mt-3 text-xs text-white/60 hover:text-white transition-colors block">Alle initiatieven →</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ImpactDashboard({ pilots = [], initiatieven = [], evenementen = [] }) {
  const [actiefThema, setActiefThema] = useState(0)
  const alleItems = [
    ...pilots.map(p => ({ ...p, _type: 'pilot' })),
    ...initiatieven.map(i => ({ ...i, _type: 'initiatief' })),
  ]
  const config = THEMA_CONFIG[actiefThema]
  const spoor = sporen.find(s => s.id === config.spoorId)
  const gaLinks  = () => setActiefThema(prev => (prev - 1 + THEMA_CONFIG.length) % THEMA_CONFIG.length)
  const gaRechts = () => setActiefThema(prev => (prev + 1) % THEMA_CONFIG.length)

  return (
    <section className="py-0">
      <div className="text-white" style={{ background: `linear-gradient(135deg, ${config.kleur}EE 0%, ${config.kleur}AA 100%)`, transition: 'background 0.4s ease' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

          {/* Overkoepelende ambitie */}
          <div className="mb-8 pb-6 border-b border-white/20">
            <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">NHL Stenden · Overkoepelende kernambitie</div>
            <p className="text-white/80 text-sm max-w-2xl leading-relaxed italic">
              "NHL Stenden benut AI om studiesucces te vergroten, werkprocessen te versterken en een verantwoorde digitale cultuur te bouwen, gedragen door iedereen die hier werkt en leert."
            </p>
          </div>

          {/* Thema tabs — alle zes */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {THEMA_CONFIG.map((t, i) => {
              const s = sporen.find(sp => sp.id === t.spoorId)
              return (
                <button key={t.id} onClick={() => setActiefThema(i)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    i === actiefThema ? 'bg-white text-nhl-blauw shadow-lg scale-105' : 'bg-white/15 text-white hover:bg-white/25'
                  }`}>
                  <span>{s?.icon}</span>
                  <span className="hidden sm:inline">{t.sectieLabel}</span>
                </button>
              )
            })}
          </div>

          {/* Dashboard */}
          <ThemaDashboard key={config.id} config={config} alleItems={alleItems} pilots={pilots} evenementen={evenementen} spoor={spoor} />

          {/* Navigatie */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20">
            <button onClick={gaLinks} className="flex items-center gap-2 bg-white/10 hover:bg-white/25 border border-white/20 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all">
              ← {sporen.find(s => s.id === THEMA_CONFIG[(actiefThema - 1 + THEMA_CONFIG.length) % THEMA_CONFIG.length].spoorId)?.icon}{' '}
              <span className="hidden sm:inline">{THEMA_CONFIG[(actiefThema - 1 + THEMA_CONFIG.length) % THEMA_CONFIG.length].sectieLabel}</span>
            </button>
            <div className="flex items-center gap-2">
              {THEMA_CONFIG.map((_, i) => (
                <button key={i} onClick={() => setActiefThema(i)}
                  className={`rounded-full transition-all ${i === actiefThema ? 'w-6 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'}`} />
              ))}
            </div>
            <button onClick={gaRechts} className="flex items-center gap-2 bg-white/10 hover:bg-white/25 border border-white/20 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all">
              <span className="hidden sm:inline">{THEMA_CONFIG[(actiefThema + 1) % THEMA_CONFIG.length].sectieLabel}</span>{' '}
              {sporen.find(s => s.id === THEMA_CONFIG[(actiefThema + 1) % THEMA_CONFIG.length].spoorId)?.icon} →
            </button>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <p className="text-white/70 text-sm flex-1">Draagt jouw initiatief bij aan {config.sectieLabel}? Meld het en koppel het aan het juiste thema.</p>
            <Link to="/meld" className="bg-white text-nhl-blauw hover:bg-blue-50 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex-shrink-0">+ Meld initiatief</Link>
            <Link to={`/themas?spoor=${config.spoorId}`} className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex-shrink-0">Verdiep in thema →</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
