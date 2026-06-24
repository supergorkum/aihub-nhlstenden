import { useState, useMemo } from 'react'

function polToCart(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

const DOELGROEPEN = [
  {
    id: 'studenten',
    label: 'Studenten',
    icon: '🎓',
    kleur: '#1E3A8A',
    kernvragen: ['Hoe gebruik ik AI verantwoord in mijn scriptie?', 'Wat betekent AI voor mijn beroep?', 'Wat is AI en hoe werkt het?'],
    tip: 'AI als studievaardigheid en beroepsvoorbereiding',
  },
  {
    id: 'docenten',
    label: 'Docenten',
    icon: '📚',
    kleur: '#0F766E',
    kernvragen: ['Hoe integreer ik AI in mijn lessen?', 'Hoe ga ik om met AI bij toetsing?', 'Welke tools zijn goedgekeurd?'],
    tip: 'Didactische integratie en toetsingsintegriteit',
  },
  {
    id: 'medewerkers',
    label: 'Medewerkers',
    icon: '💼',
    kleur: '#7C3AED',
    kernvragen: ['Welke AI-tools mag ik gebruiken?', 'Hoe zit het met privacy en AVG?', 'Hoe word ik AI-vaardig in mijn functie?'],
    tip: 'Zelfredzaamheid en digitale weerbaarheid',
  },
  {
    id: 'management',
    label: 'Management',
    icon: '🧭',
    kleur: '#BE185D',
    kernvragen: ['Wat zijn de risico\'s van AI in mijn team?', 'Hoe stuur ik op verantwoord AI-gebruik?', 'Wat vraagt de AI Act van ons?'],
    tip: 'Strategisch inzicht en governance',
  },
  {
    id: 'onderwijs',
    label: 'Onderwijs & Curriculum',
    icon: '🏫',
    kleur: '#D97706',
    kernvragen: ['Welke AI-competenties verwachten we van afgestudeerden?', 'Hoe integreer ik AI in het curriculum?', 'Welke kaders zijn er?'],
    tip: 'Curriculaire verankering van AI-geletterdheid',
  },
  {
    id: 'diensten',
    label: 'Diensten',
    icon: '⚙️',
    kleur: '#374151',
    kernvragen: ['Hoe automatiseer ik processen met AI?', 'Welke tools passen bij onze dienst?', 'Hoe vergroten we digitale weerbaarheid?'],
    tip: 'Procesverbetering en digitale ondersteuning',
  },
]

// Tooltip binnen viewBox houden
function clampTooltip(x, y, tw, th, W, H, pad = 12) {
  return {
    tx: Math.min(Math.max(x, pad), W - tw - pad),
    ty: Math.min(Math.max(y, pad), H - th - pad),
  }
}

export default function GeletterdheidsNetwerk({ bronnen, actieveDoelgroep, onDoelgroepKlik }) {
  const [hover, setHover] = useState(null)

  // Ruimere viewBox zodat alles past
  const W = 760
  const H = 560
  const CX = W / 2
  const CY = H / 2
  const R_MIDDEN = 68
  const R_DG = 42
  const R_BRON_BASE = 13
  const RING_DG = 150
  const RING_BRON = 240  // kleiner dan voorheen zodat het binnen de box past

  const dgPosities = useMemo(() => {
    return DOELGROEPEN.map((d, i) => ({
      ...d,
      ...polToCart(CX, CY, RING_DG, (360 / DOELGROEPEN.length) * i),
    }))
  }, [])

  const bronPosities = useMemo(() => {
    return bronnen.map((b) => {
      const dg = dgPosities.find(d => d.id === b.doelgroep)
      if (!dg) return null
      const siblings = bronnen.filter(x => x.doelgroep === b.doelgroep)
      const sibIdx = siblings.findIndex(x => x.id === b.id)
      const n = siblings.length
      const dgAngle = Math.atan2(dg.y - CY, dg.x - CX) * (180 / Math.PI)
      const spread = Math.min(35, 70 / Math.max(n, 1))
      const bOffset = n === 1 ? 0 : -spread * (n - 1) / 2 + sibIdx * spread
      const bronAngle = dgAngle + bOffset
      const rad = bronAngle * (Math.PI / 180)
      return {
        ...b,
        x: CX + RING_BRON * Math.cos(rad),
        y: CY + RING_BRON * Math.sin(rad),
        dgKleur: dg.kleur,
        r: R_BRON_BASE + Math.min(b.stemmen * 2, 10),
        isIntern: !b.url || b.url === '#',
      }
    }).filter(Boolean)
  }, [bronnen, dgPosities])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-xs font-semibold text-nhl-roze uppercase tracking-widest mb-1">Netwerk</div>
          <h3 className="font-bold text-nhl-blauw text-lg">AI-Geletterdheid in verbinding</h3>
          <p className="text-gray-500 text-xs mt-1">
            Klik op een doelgroep of bron om te filteren. Hover voor kernvragen. Grotere bollen = meer gewaardeerd.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14"><circle cx="7" cy="7" r="5.5" fill="#1E3A8A" /></svg>
            Intern
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14"><circle cx="7" cy="7" r="5.5" fill="white" stroke="#1E3A8A" strokeWidth="1.5" strokeDasharray="3 2"/></svg>
            Extern
          </div>
        </div>
      </div>

      {/* SVG — volledig responsive, alles binnen de viewBox */}
      <div className="w-full">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          className="select-none block"
          style={{ maxHeight: 520 }}
        >
          <defs>
            <radialGradient id="centerGrad" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#3B5FC0" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </radialGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.12" />
            </filter>
            <filter id="tooltipShadow" x="-5%" y="-5%" width="115%" height="120%">
              <feDropShadow dx="0" dy="3" stdDeviation="6" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Decoratieve ringen */}
          <circle cx={CX} cy={CY} r={RING_DG} fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="5 4" />
          <circle cx={CX} cy={CY} r={RING_BRON} fill="none" stroke="#F3F4F6" strokeWidth="1" />

          {/* Lijnen centrum → doelgroep */}
          {dgPosities.map(dg => {
            const actief = actieveDoelgroep === dg.id
            const vervaagd = actieveDoelgroep && !actief
            return (
              <line key={`l-dg-${dg.id}`}
                x1={CX} y1={CY} x2={dg.x} y2={dg.y}
                stroke={actief ? dg.kleur : '#D1D5DB'}
                strokeWidth={actief ? 2.5 : 1}
                opacity={vervaagd ? 0.15 : 0.55}
              />
            )
          })}

          {/* Lijnen doelgroep → bronnen */}
          {bronPosities.map(b => {
            const dg = dgPosities.find(d => d.id === b.doelgroep)
            if (!dg) return null
            const actief = actieveDoelgroep === b.doelgroep
            const vervaagd = actieveDoelgroep && !actief
            return (
              <line key={`l-b-${b.id}`}
                x1={dg.x} y1={dg.y} x2={b.x} y2={b.y}
                stroke={dg.kleur}
                strokeWidth={actief ? 1.5 : 0.8}
                opacity={vervaagd ? 0.08 : 0.3}
                strokeDasharray={b.isIntern ? 'none' : '4 3'}
              />
            )
          })}

          {/* Bron-bolletjes */}
          {bronPosities.map(b => {
            const actief = actieveDoelgroep === b.doelgroep
            const vervaagd = actieveDoelgroep && !actief
            const isHov = hover?.type === 'bron' && hover.id === b.id
            return (
              <g key={`b-${b.id}`}
                style={{ cursor: 'pointer' }}
                opacity={vervaagd ? 0.15 : 1}
                onClick={() => onDoelgroepKlik(b.doelgroep === actieveDoelgroep ? null : b.doelgroep)}
                onMouseEnter={() => setHover({ type: 'bron', id: b.id, data: b })}
                onMouseLeave={() => setHover(null)}
              >
                {b.isIntern ? (
                  <circle cx={b.x} cy={b.y} r={isHov ? b.r + 3 : b.r}
                    fill={b.dgKleur} opacity={0.85}
                    style={{ transition: 'r 0.15s' }} />
                ) : (
                  <circle cx={b.x} cy={b.y} r={isHov ? b.r + 3 : b.r}
                    fill="white" stroke={b.dgKleur} strokeWidth="2" strokeDasharray="4 2"
                    style={{ transition: 'r 0.15s' }} />
                )}
                {b.r >= 15 && (
                  <text x={b.x} y={b.y + 1} textAnchor="middle" dominantBaseline="middle"
                    fontSize="8" fill={b.isIntern ? 'white' : b.dgKleur} fontWeight="600"
                    style={{ pointerEvents: 'none' }}>
                    {b.type === 'video' ? '▶' : b.type === 'rapport' ? '📊' : b.type === 'cursus' ? '🎓' : b.type === 'kader' ? '📋' : '●'}
                  </text>
                )}
              </g>
            )
          })}

          {/* Doelgroep-knopen */}
          {dgPosities.map(dg => {
            const actief = actieveDoelgroep === dg.id
            const vervaagd = actieveDoelgroep && !actief
            const isHov = hover?.type === 'doelgroep' && hover.id === dg.id
            const aantalBronnen = bronnen.filter(b => b.doelgroep === dg.id).length
            return (
              <g key={`dg-${dg.id}`}
                style={{ cursor: 'pointer' }}
                opacity={vervaagd ? 0.2 : 1}
                onClick={() => onDoelgroepKlik(dg.id === actieveDoelgroep ? null : dg.id)}
                onMouseEnter={() => setHover({ type: 'doelgroep', id: dg.id, data: dg })}
                onMouseLeave={() => setHover(null)}
                filter={isHov ? 'url(#shadow)' : ''}
              >
                <circle cx={dg.x} cy={dg.y}
                  r={actief || isHov ? R_DG + 5 : R_DG}
                  fill={actief ? dg.kleur : 'white'}
                  stroke={dg.kleur}
                  strokeWidth={actief ? 0 : 2.5}
                  style={{ transition: 'r 0.15s, fill 0.2s' }}
                />
                <text x={dg.x} y={dg.y - 11} textAnchor="middle" dominantBaseline="middle"
                  fontSize="17" style={{ pointerEvents: 'none' }}>{dg.icon}</text>
                <text x={dg.x} y={dg.y + 7} textAnchor="middle" dominantBaseline="middle"
                  fontSize="7" fontWeight="700"
                  fill={actief ? 'white' : dg.kleur}
                  style={{ pointerEvents: 'none' }}>
                  {dg.label.length > 10 ? dg.label.slice(0, 9) + '…' : dg.label}
                </text>
                <text x={dg.x} y={dg.y + 17} textAnchor="middle" dominantBaseline="middle"
                  fontSize="6.5" fill={actief ? 'rgba(255,255,255,0.75)' : '#9CA3AF'}
                  style={{ pointerEvents: 'none' }}>
                  {aantalBronnen} bron{aantalBronnen !== 1 ? 'nen' : ''}
                </text>
              </g>
            )
          })}

          {/* Centrale knoop */}
          <circle cx={CX} cy={CY} r={R_MIDDEN} fill="url(#centerGrad)" filter="url(#shadow)" />
          <text x={CX} y={CY - 13} textAnchor="middle" fontSize="20" style={{ pointerEvents: 'none' }}>🧠</text>
          <text x={CX} y={CY + 6} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="white" style={{ pointerEvents: 'none' }}>AI-Geletterdheid</text>
          <text x={CX} y={CY + 18} textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.65)" style={{ pointerEvents: 'none' }}>NHL Stenden</text>

          {/* ── Tooltip doelgroep ── */}
          {hover?.type === 'doelgroep' && (() => {
            const dg = hover.data
            if (!dg) return null
            const TW = 210
            const TH = 110
            const rawTx = dg.x > CX ? dg.x - TW - 10 : dg.x + R_DG + 10
            const rawTy = dg.y - TH / 2
            const { tx, ty } = clampTooltip(rawTx, rawTy, TW, TH, W, H)
            return (
              <g pointerEvents="none" style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.14))' }}>
                {/* Achtergrond */}
                <rect x={tx} y={ty} width={TW} height={TH} rx="10"
                  fill="white" stroke={dg.kleur} strokeWidth="1.5" />
                {/* Kleurkop */}
                <rect x={tx} y={ty} width={TW} height="26" rx="10"
                  fill={dg.kleur} />
                <rect x={tx} y={ty + 16} width={TW} height="10"
                  fill={dg.kleur} />
                {/* Titel */}
                <text x={tx + 10} y={ty + 16} fontSize="9" fontWeight="700" fill="white">
                  {dg.icon} {dg.label}
                </text>
                {/* Tip */}
                <text x={tx + 10} y={ty + 37} fontSize="7.5" fill="#6B7280" fontStyle="italic">
                  {dg.tip}
                </text>
                {/* Kernvragen */}
                <text x={tx + 10} y={ty + 52} fontSize="7" fontWeight="600" fill={dg.kleur}>
                  Kernvragen:
                </text>
                {dg.kernvragen.slice(0, 3).map((v, i) => (
                  <text key={i} x={tx + 14} y={ty + 64 + i * 14} fontSize="7" fill="#374151">
                    → {v.length > 30 ? v.slice(0, 29) + '…' : v}
                  </text>
                ))}
              </g>
            )
          })()}

          {/* ── Tooltip bron ── */}
          {hover?.type === 'bron' && (() => {
            const b = hover.data
            if (!b) return null
            const TW = 170
            const TH = 72
            const rawTx = b.x > CX ? b.x - TW - 8 : b.x + b.r + 8
            const rawTy = b.y - TH / 2
            const { tx, ty } = clampTooltip(rawTx, rawTy, TW, TH, W, H)
            return (
              <g pointerEvents="none" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))' }}>
                <rect x={tx} y={ty} width={TW} height={TH} rx="8"
                  fill="white" stroke="#E5E7EB" strokeWidth="1" />
                <rect x={tx} y={ty} width={TW} height="22" rx="8" fill={b.dgKleur} />
                <rect x={tx} y={ty + 12} width={TW} height="10" fill={b.dgKleur} />
                <text x={tx + 9} y={ty + 15} fontSize="8" fontWeight="700" fill="white">
                  {b.titel.length > 22 ? b.titel.slice(0, 21) + '…' : b.titel}
                </text>
                <text x={tx + 9} y={ty + 32} fontSize="7.5" fill="#6B7280">
                  {b.type} · {b.isIntern ? 'intern' : 'extern'} · 👍 {b.stemmen}
                </text>
                <text x={tx + 9} y={ty + 45} fontSize="7.5" fill="#374151">
                  {b.toegevoegdDoor}
                </text>
                <text x={tx + 9} y={ty + 60} fontSize="7" fill={b.dgKleur} fontWeight="600">
                  Klik → filter op doelgroep
                </text>
              </g>
            )
          })()}
        </svg>
      </div>

      {/* Legenda onderaan */}
      <div className="px-6 pb-5 pt-1">
        <div className="flex flex-wrap gap-2">
          {DOELGROEPEN.map(dg => {
            const n = bronnen.filter(b => b.doelgroep === dg.id).length
            const actief = actieveDoelgroep === dg.id
            return (
              <button key={dg.id}
                onClick={() => onDoelgroepKlik(dg.id === actieveDoelgroep ? null : dg.id)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all hover:shadow-sm"
                style={actief
                  ? { backgroundColor: dg.kleur, borderColor: dg.kleur, color: 'white' }
                  : { backgroundColor: 'white', borderColor: '#E5E7EB', color: '#374151' }
                }>
                {dg.icon} {dg.label}
                <span className={`text-xs px-1 rounded-full ml-0.5 ${actief ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{n}</span>
              </button>
            )
          })}
          {actieveDoelgroep && (
            <button onClick={() => onDoelgroepKlik(null)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors">
              ✕ Wis filter
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
