import { Link } from 'react-router-dom'
import { useState } from 'react'
import { sporen } from '../data'

// ── Kernambities per thema ──────────────────────────────────────────────────
const KERNAMBITIES = {
  1: 'De inzet van AI moet leiden tot meer studiesucces, minder uitval en minder voortijdig vertrek.',
  2: 'NHL Stenden zet AI in om de efficiency van werkprocessen te verhogen, zodat medewerkers hun expertise voluit kunnen richten op onderwijs, begeleiding en samenwerking.',
  3: 'NHL Stenden gebruikt AI alleen op een manier die transparant, controleerbaar en eerlijk is, en die past binnen de waarden van de instelling en de eisen van wet en samenleving.',
  4: 'NHL Stenden zorgt ervoor dat AI-geletterdheid een basisvaardigheid is voor alle studenten en medewerkers, zodat niemand afhankelijk is van AI zonder het te begrijpen.',
}

// ── Impact punten voor AI & Leren ──────────────────────────────────────────
export const AMBITIES = [
  { id: 'studiesucces', label: 'Meer studiesucces',       icon: '🎓', bg: 'bg-blue-900/40',  border: 'border-blue-400/30'  },
  { id: 'uitval',       label: 'Minder uitval',            icon: '📉', bg: 'bg-teal-900/40',  border: 'border-teal-400/30'  },
  { id: 'vertrek',      label: 'Minder voortijdig vertrek',icon: '🔄', bg: 'bg-pink-900/40',  border: 'border-pink-400/30'  },
]

export const IMPACT_PUNTEN = { laag: 1, gemiddeld: 2, hoog: 3 }

export function berekenImpact(items, ambitieId) {
  const relevant = items.filter(i => (i.ambities || []).includes(ambitieId))
  const aantal = relevant.length
  if (!aantal) return { aantal: 0, score: 0, max: 0, items: [] }
  const score = relevant.reduce((s, i) => s + (IMPACT_PUNTEN[i.impactInschatting] || 1), 0)
  return { aantal, score, max: aantal * 3, items: relevant }
}

const IMPACT_DOT = { laag: 'bg-yellow-300', gemiddeld: 'bg-blue-300', hoog: 'bg-green-400' }

// ── Thema configuratie ──────────────────────────────────────────────────────
const THEMA_CONFIG = [
  {
    id: 1, spoorId: 1, kleur: '#1E3A8A', licht: '#EFF6FF',
    bg: 'from-blue-900 to-blue-800',
    sectieLabel: 'AI & Leren',
    impactDimensies: ['studiesucces', 'uitval', 'vertrek'],
    impactLabels: { studiesucces: 'Meer studiesucces', uitval: 'Minder uitval', vertrek: 'Minder voortijdig vertrek' },
    impactIcons:  { studiesucces: '🎓', uitval: '📉', vertrek: '🔄' },
    impactBg:     { studiesucces: 'bg-blue-900/40 border-blue-400/30', uitval: 'bg-teal-900/40 border-teal-400/30', vertrek: 'bg-pink-900/40 border-pink-400/30' },
    toonPilots: true, toonEvenementen: true, toonGeletterdheid: false,
    initiatiefFilter: (i) => i.spoor === 1 || (i.ambities && (i.ambities.includes('studiesucces') || i.ambities.includes('uitval') || i.ambities.includes('vertrek'))),
  },
  {
    id: 2, spoorId: 2, kleur: '#0F766E', licht: '#F0FDFA',
    bg: 'from-teal-900 to-teal-800',
    sectieLabel: 'AI & Werken',
    impactDimensies: ['efficiency', 'automatisering', 'samenwerking'],
    impactLabels: { efficiency: 'Hogere efficiency', automatisering: 'Procesautomatisering', samenwerking: 'Betere samenwerking' },
    impactIcons:  { efficiency: '⚡', automatisering: '🤖', samenwerking: '🤝' },
    impactBg:     { efficiency: 'bg-teal-900/40 border-teal-400/30', automatisering: 'bg-emerald-900/40 border-emerald-400/30', samenwerking: 'bg-cyan-900/40 border-cyan-400/30' },
    toonPilots: true, toonEvenementen: true, toonGeletterdheid: false,
    initiatiefFilter: (i) => i.spoor === 2,
  },
  {
    id: 3, spoorId: 3, kleur: '#E91E8C', licht: '#FDF2F8',
    bg: 'from-pink-900 to-rose-900',
    sectieLabel: 'AI & Verantwoordelijkheid',
    impactDimensies: ['transparantie', 'compliance', 'governance'],
    impactLabels: { transparantie: 'Transparantie', compliance: 'AI Act compliance', governance: 'Governance & eigenaarschap' },
    impactIcons:  { transparantie: '🔍', compliance: '⚖️', governance: '🏛️' },
    impactBg:     { transparantie: 'bg-rose-900/40 border-rose-400/30', compliance: 'bg-pink-900/40 border-pink-400/30', governance: 'bg-fuchsia-900/40 border-fuchsia-400/30' },
    toonPilots: false, toonEvenementen: true, toonGeletterdheid: false,
    initiatiefFilter: (i) => i.spoor === 3,
  },
  {
    id: 4, spoorId: 4, kleur: '#7C3AED', licht: '#F5F3FF',
    bg: 'from-violet-900 to-purple-900',
    sectieLabel: 'AI & Geletterdheid',
    impactDimensies: ['begrip', 'vaardigheid', 'eigenaarschap'],
    impactLabels: { begrip: 'Begrip & bewustwording', vaardigheid: 'Praktische vaardigheid', eigenaarschap: 'Eigenaarschap & regie' },
    impactIcons:  { begrip: '🧠', vaardigheid: '🛠️', eigenaarschap: '💬' },
    impactBg:     { begrip: 'bg-violet-900/40 border-violet-400/30', vaardigheid: 'bg-purple-900/40 border-purple-400/30', eigenaarschap: 'bg-indigo-900/40 border-indigo-400/30' },
    toonPilots: true, toonEvenementen: true, toonGeletterdheid: true,
    initiatiefFilter: (i) => i.spoor === 4,
  },
]

// ── Subcomponent: één thema dashboard ──────────────────────────────────────
function ThemaDashboard({ config, alleItems, pilots, evenementen, spoor }) {
  const themaInitiatieven = alleItems.filter(config.initiatiefFilter)
  const themaPilots = pilots.filter(p =>
    p.spoor === config.spoorId || (p.themas && p.themas.includes(config.spoorId))
  )
  const themaEvenementen = evenementen.filter(e =>
    e.spoor === config.spoorId || (e.themas && e.themas.includes(config.spoorId))
  ).slice(0, 2)

  const totaalGekoppeld = themaInitiatieven.length

  return (
    <div className="w-full">
      {/* Header met kernambitie */}
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
            style={{ borderColor: config.kleur }}>
            "{KERNAMBITIES[config.id]}"
          </blockquote>
        </div>
        <div className="flex-shrink-0 text-center bg-white/10 rounded-2xl px-6 py-4 border border-white/20 min-w-32">
          <div className="text-3xl font-extrabold text-white">{totaalGekoppeld}</div>
          <div className="text-blue-200 text-xs mt-0.5">initiatief{totaalGekoppeld !== 1 ? 'en' : ''}</div>
          <div className="text-blue-300 text-xs">in dit thema</div>
        </div>
      </div>

      {/* Impact dimensies */}
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {config.impactDimensies.map(dim => {
          const relevantItems = themaInitiatieven.filter(i =>
            (i.ambities || []).includes(dim) || (i.tags || []).some(t => t.toLowerCase().includes(dim.toLowerCase()))
          )
          const hoog = relevantItems.filter(i => i.impactInschatting === 'hoog').length
          const gem = relevantItems.filter(i => i.impactInschatting === 'gemiddeld').length
          const laag = relevantItems.filter(i => i.impactInschatting === 'laag' || !i.impactInschatting).length

          return (
            <div key={dim} className={`backdrop-blur-sm border rounded-2xl p-4 ${config.impactBg[dim]}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{config.impactIcons[dim]}</span>
                <span className="font-bold text-white text-xs leading-snug">{config.impactLabels[dim]}</span>
              </div>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-3xl font-extrabold text-white">{relevantItems.length || themaInitiatieven.length > 0 ? Math.max(0, relevantItems.length) : 0}</span>
                <span className="text-blue-200 text-xs">gekoppeld</span>
              </div>
              {relevantItems.length > 0 && (
                <div className="flex gap-1.5 flex-wrap mb-2">
                  {hoog > 0 && <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-0.5 text-xs text-green-200"><span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />{hoog}× hoog</div>}
                  {gem > 0 && <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-0.5 text-xs text-blue-200"><span className="w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0" />{gem}× gem.</div>}
                </div>
              )}
              {relevantItems.length === 0 && (
                <div className="text-xs text-blue-300 italic">Nog geen items gekoppeld.</div>
              )}
            </div>
          )
        })}
      </div>

      {/* Initiatieven + Pilots + Evenementen */}
      <div className={`grid gap-4 ${config.toonPilots && themaPilots.length > 0 ? 'sm:grid-cols-2' : ''} ${config.toonEvenementen && themaEvenementen.length > 0 ? 'lg:grid-cols-3' : ''}`}>

        {/* Initiatieven */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-300 mb-3">🚀 Initiatieven</div>
          {themaInitiatieven.length > 0 ? (
            <div className="space-y-1.5">
              {themaInitiatieven.slice(0, 5).map(i => (
                <div key={i.id} className="flex items-start gap-2 text-xs text-blue-100 leading-snug">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1 ${IMPACT_DOT[i.impactInschatting] || 'bg-gray-400'}`} />
                  <span>{i.naam}</span>
                  {i._type === 'pilot' && <span className="ml-auto flex-shrink-0 text-blue-300">pilot</span>}
                </div>
              ))}
              {themaInitiatieven.length > 5 && (
                <div className="text-xs text-blue-300 mt-1">+{themaInitiatieven.length - 5} meer</div>
              )}
            </div>
          ) : (
            <div className="text-xs text-blue-300 italic">Nog geen initiatieven in dit thema.</div>
          )}
          <Link to={`/initiatieven`} className="mt-3 text-xs text-blue-300 hover:text-white transition-colors block">
            Alle initiatieven →
          </Link>
        </div>

        {/* Pilots (alleen voor thema's 1, 2, 4) */}
        {config.toonPilots && (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-300 mb-3">🧪 Pilots</div>
            {themaPilots.length > 0 ? (
              <div className="space-y-2">
                {themaPilots.slice(0, 3).map(p => (
                  <div key={p.id} className="text-xs text-blue-100">
                    <div className="font-medium leading-snug">{p.naam}</div>
                    <div className="text-blue-300">{p.academie} · {p.status}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-blue-300 italic">Nog geen pilots in dit thema.</div>
            )}
            <Link to="/pilots" className="mt-3 text-xs text-blue-300 hover:text-white transition-colors block">
              Alle pilots →
            </Link>
          </div>
        )}

        {/* Evenementen */}
        {config.toonEvenementen && (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-300 mb-3">📅 Evenementen</div>
            {themaEvenementen.length > 0 ? (
              <div className="space-y-2">
                {themaEvenementen.map(e => (
                  <div key={e.id} className="text-xs text-blue-100">
                    <div className="font-medium leading-snug">{e.naam}</div>
                    <div className="text-blue-300">{e.datum} · {e.locatie?.split(',')[0]}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-blue-300 italic">Nog geen evenementen gepland.</div>
            )}
            <Link to="/evenementen" className="mt-3 text-xs text-blue-300 hover:text-white transition-colors block">
              Alle evenementen →
            </Link>
          </div>
        )}

        {/* Geletterdheid context (alleen thema 4) */}
        {config.toonGeletterdheid && (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-4 sm:col-span-2 lg:col-span-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-300 mb-3">📖 Doelgroepen</div>
            <div className="grid grid-cols-2 gap-1.5">
              {['Studenten','Docenten','Medewerkers','Management','Onderwijs & Curriculum','Diensten'].map(d => (
                <div key={d} className="text-xs text-blue-100 bg-white/10 rounded-lg px-2 py-1 text-center leading-snug">{d}</div>
              ))}
            </div>
            <Link to="/geletterdheid" className="mt-3 text-xs text-blue-300 hover:text-white transition-colors block">
              Naar AI & Geletterdheid →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Hoofd component ─────────────────────────────────────────────────────────
export default function ImpactDashboard({ pilots = [], initiatieven = [], evenementen = [] }) {
  const [actiefThema, setActiefThema] = useState(0) // index in THEMA_CONFIG

  // Evenementen uit props komen niet binnen — we gebruiken lege array als fallback
  // Start.jsx geeft pilots en initiatieven mee; evenementen geven we door via prop
  const alleItems = [
    ...pilots.map(p => ({ ...p, _type: 'pilot' })),
    ...initiatieven.map(i => ({ ...i, _type: 'initiatief' })),
  ]

  const config = THEMA_CONFIG[actiefThema]
  const spoor = sporen.find(s => s.id === config.spoorId)

  const gaLinks = () => setActiefThema(prev => (prev - 1 + THEMA_CONFIG.length) % THEMA_CONFIG.length)
  const gaRechts = () => setActiefThema(prev => (prev + 1) % THEMA_CONFIG.length)

  return (
    <section className="py-0">
      <div className="text-white" style={{ background: `linear-gradient(135deg, ${config.kleur}DD 0%, ${config.kleur}99 100%)`, transition: 'background 0.4s ease' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

          {/* Overkoepelende ambitie balk + thema-navigatie */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-white font-semibold text-xs uppercase tracking-widest mb-1 opacity-70">
                NHL Stenden · Kernambitie
              </div>
              <p className="text-white/80 text-sm max-w-xl leading-relaxed italic">
                "NHL Stenden benut AI om studiesucces te vergroten, werkprocessen te versterken en een verantwoorde digitale cultuur te bouwen, gedragen door iedereen die hier werkt en leert."
              </p>
            </div>
          </div>

          {/* Thema tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {THEMA_CONFIG.map((t, i) => {
              const s = sporen.find(sp => sp.id === t.spoorId)
              return (
                <button key={t.id} onClick={() => setActiefThema(i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    i === actiefThema
                      ? 'bg-white text-nhl-blauw shadow-lg scale-105'
                      : 'bg-white/15 text-white hover:bg-white/25'
                  }`}>
                  <span>{s?.icon}</span>
                  <span className="hidden sm:inline">{t.sectieLabel}</span>
                </button>
              )
            })}
          </div>

          {/* Dashboard inhoud */}
          <div className="relative">
            <ThemaDashboard
              key={config.id}
              config={config}
              alleItems={alleItems}
              pilots={pilots}
              evenementen={evenementen}
              spoor={spoor}
            />
          </div>

          {/* Navigatiepijlen + teller */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20">
            <button onClick={gaLinks}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/25 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
              ← {sporen.find(s => s.id === THEMA_CONFIG[(actiefThema - 1 + THEMA_CONFIG.length) % THEMA_CONFIG.length].spoorId)?.icon}{' '}
              <span className="hidden sm:inline">{THEMA_CONFIG[(actiefThema - 1 + THEMA_CONFIG.length) % THEMA_CONFIG.length].sectieLabel}</span>
            </button>

            <div className="flex items-center gap-2">
              {THEMA_CONFIG.map((_, i) => (
                <button key={i} onClick={() => setActiefThema(i)}
                  className={`rounded-full transition-all ${i === actiefThema ? 'w-6 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'}`} />
              ))}
            </div>

            <button onClick={gaRechts}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/25 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
              <span className="hidden sm:inline">{THEMA_CONFIG[(actiefThema + 1) % THEMA_CONFIG.length].sectieLabel}</span>{' '}
              {sporen.find(s => s.id === THEMA_CONFIG[(actiefThema + 1) % THEMA_CONFIG.length].spoorId)?.icon} →
            </button>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <p className="text-blue-200 text-sm flex-1">
              Draagt jouw initiatief bij aan {config.sectieLabel}? Meld het en koppel het aan het juiste thema.
            </p>
            <Link to="/meld"
              className="bg-white text-nhl-blauw hover:bg-blue-50 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex-shrink-0">
              + Meld initiatief
            </Link>
            <Link to={`/themas?spoor=${config.spoorId}`}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex-shrink-0">
              Verdiep in thema →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
