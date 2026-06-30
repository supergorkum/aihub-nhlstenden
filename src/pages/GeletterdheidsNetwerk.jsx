import { useState, useMemo, useRef } from 'react'

function polToCart(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

const DOELGROEPEN = [
  {
    id: 'studenten', label: 'Studenten', icon: '🎓', kleur: '#1E3A8A', licht: '#EFF6FF',
    kernvragen: ['Hoe gebruik ik AI verantwoord in mijn scriptie?', 'Wat betekent AI voor mijn beroep?', 'Wat is AI en hoe werkt het?'],
    tip: 'AI als studievaardigheid en beroepsvoorbereiding',
  },
  {
    id: 'docenten', label: 'Docenten', icon: '📚', kleur: '#0F766E', licht: '#F0FDFA',
    kernvragen: ['Hoe integreer ik AI in mijn lessen?', 'Hoe ga ik om met AI bij toetsing?', 'Welke tools zijn goedgekeurd?'],
    tip: 'Didactische integratie en toetsingsintegriteit',
  },
  {
    id: 'medewerkers', label: 'Medewerkers', icon: '💼', kleur: '#7C3AED', licht: '#F5F3FF',
    kernvragen: ['Welke AI-tools mag ik gebruiken?', 'Hoe zit het met privacy en AVG?', 'Hoe word ik AI-vaardig in mijn functie?'],
    tip: 'Zelfredzaamheid en digitale weerbaarheid',
  },
  {
    id: 'management', label: 'Management', icon: '🧭', kleur: '#BE185D', licht: '#FDF2F8',
    kernvragen: ['Wat zijn de risico\'s van AI in mijn team?', 'Hoe stuur ik op verantwoord AI-gebruik?', 'Wat vraagt de AI Act van ons?'],
    tip: 'Strategisch inzicht en governance',
  },
  {
    id: 'onderwijs', label: 'Onderwijs & Curriculum', icon: '🏫', kleur: '#D97706', licht: '#FFFBEB',
    kernvragen: ['Welke AI-competenties verwachten we van afgestudeerden?', 'Hoe integreer ik AI in het curriculum?', 'Welke kaders zijn er?'],
    tip: 'Curriculaire verankering van AI-geletterdheid',
  },
  {
    id: 'diensten', label: 'Diensten', icon: '⚙️', kleur: '#374151', licht: '#F9FAFB',
    kernvragen: ['Hoe automatiseer ik processen met AI?', 'Welke tools passen bij onze dienst?', 'Hoe vergroten we digitale weerbaarheid?'],
    tip: 'Procesverbetering en digitale ondersteuning',
  },
]

function clampTooltip(x, y, tw, th, W, H, pad = 12) {
  return {
    tx: Math.min(Math.max(x, pad), W - tw - pad),
    ty: Math.min(Math.max(y, pad), H - th - pad),
  }
}

export default function GeletterdheidsNetwerk({ bronnen, actieveDoelgroep, onDoelgroepKlik }) {
  const [hoverDg, setHoverDg] = useState(null)    // doelgroep id
  const [hoverBron, setHoverBron] = useState(null) // bron id + data
  const [tooltipVast, setTooltipVast] = useState(false) // tooltip vastgepind
  const hoverTimer = useRef(null)

  const W = 760; const H = 560
  const CX = W / 2; const CY = H / 2
  const R_MIDDEN = 68; const R_DG = 42; const R_BRON_BASE = 13
  const RING_DG = 150; const RING_BRON = 240

  const dgPosities = useMemo(() => DOELGROEPEN.map((d, i) => ({
    ...d, ...polToCart(CX, CY, RING_DG, (360 / DOELGROEPEN.length) * i),
  })), [])

  const bronPosities = useMemo(() => bronnen.map((b) => {
    const dg = dgPosities.find(d => d.id === b.doelgroep)
    if (!dg) return null
    const siblings = bronnen.filter(x => x.doelgroep === b.doelgroep)
    const sibIdx = siblings.findIndex(x => x.id === b.id)
    const n = siblings.length
    const dgAngle = Math.atan2(dg.y - CY, dg.x - CX) * (180 / Math.PI)
    const spread = Math.min(35, 70 / Math.max(n, 1))
    const bOffset = n === 1 ? 0 : -spread * (n - 1) / 2 + sibIdx * spread
    const rad = (dgAngle + bOffset) * (Math.PI / 180)
    return {
      ...b, x: CX + RING_BRON * Math.cos(rad), y: CY + RING_BRON * Math.sin(rad),
      dgKleur: dg.kleur, r: R_BRON_BASE + Math.min(b.stemmen * 2, 10),
      isIntern: !b.url || b.url === '#',
    }
  }).filter(Boolean), [bronnen, dgPosities])

  const dgData = hoverDg ? dgPosities.find(d => d.id === hoverDg) : null

  // Doelgroep hover met vertraging zodat je de tooltip in kunt bewegen
  const handleDgEnter = (id) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    setHoverDg(id)
    setHoverBron(null)
  }
  const handleDgLeave = () => {
    if (tooltipVast) return
    hoverTimer.current = setTimeout(() => setHoverDg(null), 300)
  }
  const handleTooltipEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
  }
  const handleTooltipLeave = () => {
    hoverTimer.current = setTimeout(() => { setHoverDg(null); setTooltipVast(false) }, 200)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-visible">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-xs font-semibold text-nhl-roze uppercase tracking-widest mb-1">Netwerk</div>
          <h3 className="font-bold text-nhl-blauw text-lg">AI-Geletterdheid in verbinding</h3>
          <p className="text-gray-500 text-xs mt-1">Hover over een doelgroep voor kernvragen · Klik om te filteren · Grotere bollen = meer gewaardeerd</p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14"><circle cx="7" cy="7" r="5.5" fill="#1E3A8A" /></svg>Intern
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14"><circle cx="7" cy="7" r="5.5" fill="white" stroke="#1E3A8A" strokeWidth="1.5" strokeDasharray="3 2"/></svg>Extern
          </div>
        </div>
      </div>

      {/* SVG + Tooltip wrapper: overflow visible zodat tooltip niet afsnijdt */}
      <div className="relative w-full">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet"
          className="select-none block" style={{ maxHeight: 520, overflow: 'visible' }}>
          <defs>
            <radialGradient id="ggCenterGrad" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#3B5FC0"/>
              <stop offset="100%" stopColor="#1E3A8A"/>
            </radialGradient>
            <filter id="ggShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.12"/>
            </filter>
          </defs>

          {/* Decoratieve ringen */}
          <circle cx={CX} cy={CY} r={RING_DG} fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="5 4"/>
          <circle cx={CX} cy={CY} r={RING_BRON} fill="none" stroke="#F3F4F6" strokeWidth="1"/>

          {/* Lijnen centrum → doelgroep */}
          {dgPosities.map(dg => {
            const actief = actieveDoelgroep === dg.id
            return (
              <line key={`l-dg-${dg.id}`} x1={CX} y1={CY} x2={dg.x} y2={dg.y}
                stroke={actief ? dg.kleur : '#D1D5DB'} strokeWidth={actief ? 2.5 : 1}
                opacity={actieveDoelgroep && !actief ? 0.15 : 0.55}/>
            )
          })}

          {/* Lijnen doelgroep → bronnen */}
          {bronPosities.map(b => {
            const dg = dgPosities.find(d => d.id === b.doelgroep)
            if (!dg) return null
            const actief = actieveDoelgroep === b.doelgroep
            return (
              <line key={`l-b-${b.id}`} x1={dg.x} y1={dg.y} x2={b.x} y2={b.y}
                stroke={dg.kleur} strokeWidth={actief ? 1.5 : 0.8}
                opacity={actieveDoelgroep && !actief ? 0.08 : 0.3}
                strokeDasharray={b.isIntern ? 'none' : '4 3'}/>
            )
          })}

          {/* Bron-bolletjes */}
          {bronPosities.map(b => {
            const actief = actieveDoelgroep === b.doelgroep
            const isHov = hoverBron === b.id
            return (
              <g key={`b-${b.id}`} style={{ cursor: 'pointer' }}
                opacity={actieveDoelgroep && !actief ? 0.15 : 1}
                onClick={() => onDoelgroepKlik(b.doelgroep === actieveDoelgroep ? null : b.doelgroep)}
                onMouseEnter={() => setHoverBron(b.id)}
                onMouseLeave={() => setHoverBron(null)}>
                {b.isIntern ? (
                  <circle cx={b.x} cy={b.y} r={isHov ? b.r + 3 : b.r} fill={b.dgKleur} opacity={0.85} style={{ transition: 'r 0.15s' }}/>
                ) : (
                  <circle cx={b.x} cy={b.y} r={isHov ? b.r + 3 : b.r} fill="white" stroke={b.dgKleur} strokeWidth="2" strokeDasharray="4 2" style={{ transition: 'r 0.15s' }}/>
                )}
                {b.r >= 15 && (
                  <text x={b.x} y={b.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="8"
                    fill={b.isIntern ? 'white' : b.dgKleur} fontWeight="600" style={{ pointerEvents: 'none' }}>
                    {b.type === 'video' ? '▶' : b.type === 'cursus' ? '🎓' : b.type === 'kader' ? '📋' : '●'}
                  </text>
                )}
              </g>
            )
          })}

          {/* Doelgroep-knopen */}
          {dgPosities.map(dg => {
            const actief = actieveDoelgroep === dg.id
            const isHov = hoverDg === dg.id
            const aantalBronnen = bronnen.filter(b => b.doelgroep === dg.id).length
            return (
              <g key={`dg-${dg.id}`} style={{ cursor: 'pointer' }}
                opacity={actieveDoelgroep && !actief ? 0.2 : 1}
                onClick={() => { onDoelgroepKlik(dg.id === actieveDoelgroep ? null : dg.id); setHoverDg(null) }}
                onMouseEnter={() => handleDgEnter(dg.id)}
                onMouseLeave={handleDgLeave}
                filter={isHov ? 'url(#ggShadow)' : ''}>
                <circle cx={dg.x} cy={dg.y} r={actief || isHov ? R_DG + 5 : R_DG}
                  fill={actief ? dg.kleur : 'white'} stroke={dg.kleur} strokeWidth={actief ? 0 : 2.5}
                  style={{ transition: 'r 0.15s, fill 0.2s' }}/>
                <text x={dg.x} y={dg.y - 11} textAnchor="middle" dominantBaseline="middle"
                  fontSize="17" style={{ pointerEvents: 'none' }}>{dg.icon}</text>
                <text x={dg.x} y={dg.y + 7} textAnchor="middle" dominantBaseline="middle"
                  fontSize="7" fontWeight="700" fill={actief ? 'white' : dg.kleur} style={{ pointerEvents: 'none' }}>
                  {dg.label.length > 10 ? dg.label.slice(0, 9) + '…' : dg.label}
                </text>
                <text x={dg.x} y={dg.y + 17} textAnchor="middle" dominantBaseline="middle"
                  fontSize="6.5" fill={actief ? 'rgba(255,255,255,0.75)' : '#9CA3AF'} style={{ pointerEvents: 'none' }}>
                  {aantalBronnen} bron{aantalBronnen !== 1 ? 'nen' : ''}
                </text>
              </g>
            )
          })}

          {/* Centrale knoop */}
          <circle cx={CX} cy={CY} r={R_MIDDEN} fill="url(#ggCenterGrad)" filter="url(#ggShadow)"/>
          <text x={CX} y={CY - 13} textAnchor="middle" fontSize="20" style={{ pointerEvents: 'none' }}>🧠</text>
          <text x={CX} y={CY + 6} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="white" style={{ pointerEvents: 'none' }}>AI-Geletterdheid</text>
          <text x={CX} y={CY + 18} textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.65)" style={{ pointerEvents: 'none' }}>NHL Stenden</text>
        </svg>

        {/* Tooltip als HTML div: beweegt over de SVG, blijft klikbaar */}
        {hoverDg && dgData && (() => {
          // Positie relatief aan de SVG container
          const pctX = dgData.x / W
          const pctY = dgData.y / H
          const isRechts = dgData.x > W / 2
          return (
            <div
              onMouseEnter={handleTooltipEnter}
              onMouseLeave={handleTooltipLeave}
              className="absolute z-20 bg-white rounded-2xl shadow-2xl border-2 overflow-hidden"
              style={{
                borderColor: dgData.kleur,
                width: 240,
                top: `calc(${pctY * 100}% - 80px)`,
                left: isRechts
                  ? `calc(${pctX * 100}% - 260px)`
                  : `calc(${pctX * 100}% + 20px)`,
                pointerEvents: 'auto',
              }}>
              {/* Kleurkop */}
              <div className="px-4 py-3 text-white font-bold text-sm" style={{ backgroundColor: dgData.kleur }}>
                {dgData.icon} {dgData.label}
              </div>
              <div className="px-4 py-3">
                <p className="text-gray-500 text-xs italic mb-3">{dgData.tip}</p>
                <div className="text-xs font-semibold mb-2" style={{ color: dgData.kleur }}>Kernvragen</div>
                <div className="space-y-1.5 mb-3">
                  {dgData.kernvragen.map((v, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                      <span style={{ color: dgData.kleur }} className="flex-shrink-0 mt-0.5">→</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { onDoelgroepKlik(dgData.id === actieveDoelgroep ? null : dgData.id); setHoverDg(null) }}
                  className="w-full py-1.5 rounded-lg text-xs font-semibold text-white transition-colors"
                  style={{ backgroundColor: dgData.kleur }}>
                  {actieveDoelgroep === dgData.id ? 'Wis filter' : 'Filter op deze doelgroep'}
                </button>
              </div>
            </div>
          )
        })()}
      </div>

      {/* Legenda */}
      <div className="px-6 pb-5 pt-1">
        <div className="flex flex-wrap gap-2">
          {DOELGROEPEN.map(dg => {
            const n = bronnen.filter(b => b.doelgroep === dg.id).length
            const actief = actieveDoelgroep === dg.id
            return (
              <button key={dg.id} onClick={() => onDoelgroepKlik(dg.id === actieveDoelgroep ? null : dg.id)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all hover:shadow-sm"
                style={actief ? { backgroundColor: dg.kleur, borderColor: dg.kleur, color: 'white' } : { backgroundColor: 'white', borderColor: '#E5E7EB', color: '#374151' }}>
                {dg.icon} {dg.label}
                <span className={`text-xs px-1 rounded-full ml-0.5 ${actief ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{n}</span>
              </button>
            )
          })}
          {actieveDoelgroep && (
            <button onClick={() => onDoelgroepKlik(null)} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors">
              ✕ Wis filter
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
