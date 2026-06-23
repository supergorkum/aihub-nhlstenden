import { useState, useMemo } from 'react'

// Bereken positie op een cirkel
function polToCart(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

const DOELGROEPEN = [
  { id: 'studenten',   label: 'Studenten',             icon: '🎓', kleur: '#1E3A8A' },
  { id: 'docenten',    label: 'Docenten',              icon: '📚', kleur: '#0F766E' },
  { id: 'medewerkers', label: 'Medewerkers',           icon: '💼', kleur: '#7C3AED' },
  { id: 'management',  label: 'Management',            icon: '🧭', kleur: '#BE185D' },
  { id: 'onderwijs',   label: 'Onderwijs & Curriculum',icon: '🏫', kleur: '#D97706' },
  { id: 'diensten',    label: 'Diensten',              icon: '⚙️', kleur: '#374151' },
]

export default function GeletterdheidsNetwerk({ bronnen, actieveDoelgroep, onDoelgroepKlik }) {
  const [hover, setHover] = useState(null) // { type: 'doelgroep'|'bron', id }

  const W = 700
  const H = 480
  const CX = W / 2
  const CY = H / 2 - 10
  const R_MIDDEN = 72   // centrale knoop
  const R_DG = 44       // doelgroep-knopen
  const R_BRON_BASE = 14 // bron-bolletjes basisgrootte
  const RING_DG = 155   // afstand centrum → doelgroep
  const RING_BRON = 255 // afstand centrum → bron

  // Positie doelgroepen gelijkmatig verdeeld
  const dgPosities = useMemo(() => {
    return DOELGROEPEN.map((d, i) => ({
      ...d,
      ...polToCart(CX, CY, RING_DG, (360 / DOELGROEPEN.length) * i),
    }))
  }, [])

  // Positie bronnen: gegroepeerd rondom hun doelgroep
  const bronPosities = useMemo(() => {
    return bronnen.map((b, idx) => {
      const dg = dgPosities.find(d => d.id === b.doelgroep)
      if (!dg) return null

      // Bronnen per doelgroep tellen voor spreiding
      const siblings = bronnen.filter(x => x.doelgroep === b.doelgroep)
      const sibIdx = siblings.findIndex(x => x.id === b.id)
      const n = siblings.length

      // Hoek van de doelgroep t.o.v. centrum
      const dgAngle = Math.atan2(dg.y - CY, dg.x - CX) * (180 / Math.PI)

      // Spread de bronnen in een boog rondom de doelgroep
      const spread = Math.min(40, 80 / Math.max(n, 1))
      const bOffset = n === 1 ? 0 : -spread * (n - 1) / 2 + sibIdx * spread

      const bronAngle = dgAngle + bOffset
      const rad = (bronAngle) * (Math.PI / 180)

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

  const actieveDg = actieveDoelgroep
    ? dgPosities.find(d => d.id === actieveDoelgroep)
    : null

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-xs font-semibold text-nhl-roze uppercase tracking-widest mb-1">Netwerk</div>
          <h3 className="font-bold text-nhl-blauw text-lg">AI-Geletterdheid in verbinding</h3>
          <p className="text-gray-500 text-xs mt-1">
            Klik op een doelgroep of bron om te filteren. Grotere bollen = meer gewaardeerd.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <svg width="16" height="16"><circle cx="8" cy="8" r="6" fill="#1E3A8A" /></svg>
            Intern
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="16"><circle cx="8" cy="8" r="6" fill="white" stroke="#1E3A8A" strokeWidth="2" strokeDasharray="3 2"/></svg>
            Extern
          </div>
        </div>
      </div>

      {/* SVG diagram */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ minWidth: 340, maxHeight: 480 }}
          className="select-none"
        >
          {/* Achtergrond-ringen (decoratief) */}
          <circle cx={CX} cy={CY} r={RING_DG} fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx={CX} cy={CY} r={RING_BRON} fill="none" stroke="#F3F4F6" strokeWidth="1" />

          {/* Lijnen: centrum → doelgroep */}
          {dgPosities.map(dg => {
            const actief = actieveDoelgroep === dg.id
            const vervaagd = actieveDoelgroep && !actief
            return (
              <line key={`l-dg-${dg.id}`}
                x1={CX} y1={CY} x2={dg.x} y2={dg.y}
                stroke={actief ? dg.kleur : '#D1D5DB'}
                strokeWidth={actief ? 2 : 1}
                opacity={vervaagd ? 0.2 : 0.6}
              />
            )
          })}

          {/* Lijnen: doelgroep → bronnen */}
          {bronPosities.map(b => {
            const dg = dgPosities.find(d => d.id === b.doelgroep)
            if (!dg) return null
            const actief = actieveDoelgroep === b.doelgroep
            const vervaagd = actieveDoelgroep && !actief
            return (
              <line key={`l-b-${b.id}`}
                x1={dg.x} y1={dg.y} x2={b.x} y2={b.y}
                stroke={dg.kleur}
                strokeWidth={actief ? 1.5 : 1}
                opacity={vervaagd ? 0.1 : 0.35}
                strokeDasharray={b.isIntern ? 'none' : '4 3'}
              />
            )
          })}

          {/* Bron-bolletjes */}
          {bronPosities.map(b => {
            const actief = actieveDoelgroep === b.doelgroep
            const vervaagd = actieveDoelgroep && !actief
            const isHover = hover?.id === b.id
            return (
              <g key={`b-${b.id}`}
                style={{ cursor: 'pointer' }}
                opacity={vervaagd ? 0.2 : 1}
                onClick={() => onDoelgroepKlik(b.doelgroep === actieveDoelgroep ? null : b.doelgroep)}
                onMouseEnter={() => setHover({ type: 'bron', id: b.id, data: b })}
                onMouseLeave={() => setHover(null)}
              >
                {b.isIntern ? (
                  <circle cx={b.x} cy={b.y} r={isHover ? b.r + 3 : b.r}
                    fill={b.dgKleur}
                    opacity={actief || !actieveDoelgroep ? 0.85 : 0.5}
                    style={{ transition: 'r 0.15s' }}
                  />
                ) : (
                  <>
                    <circle cx={b.x} cy={b.y} r={isHover ? b.r + 3 : b.r}
                      fill="white"
                      stroke={b.dgKleur}
                      strokeWidth="2"
                      strokeDasharray="4 2"
                      style={{ transition: 'r 0.15s' }}
                    />
                  </>
                )}
                {/* Type-icoon in kleine bollen */}
                {b.r >= 16 && (
                  <text x={b.x} y={b.y + 1} textAnchor="middle" dominantBaseline="middle"
                    fontSize="9" fill={b.isIntern ? 'white' : b.dgKleur} fontWeight="600">
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
            const isHover = hover?.type === 'doelgroep' && hover.id === dg.id
            const aantalBronnen = bronnen.filter(b => b.doelgroep === dg.id).length
            return (
              <g key={`dg-${dg.id}`}
                style={{ cursor: 'pointer' }}
                opacity={vervaagd ? 0.25 : 1}
                onClick={() => onDoelgroepKlik(dg.id === actieveDoelgroep ? null : dg.id)}
                onMouseEnter={() => setHover({ type: 'doelgroep', id: dg.id })}
                onMouseLeave={() => setHover(null)}
              >
                <circle cx={dg.x} cy={dg.y}
                  r={actief || isHover ? R_DG + 4 : R_DG}
                  fill={actief ? dg.kleur : 'white'}
                  stroke={dg.kleur}
                  strokeWidth={actief ? 0 : 2.5}
                  style={{ transition: 'r 0.15s, fill 0.15s' }}
                />
                <text x={dg.x} y={dg.y - 10} textAnchor="middle" dominantBaseline="middle"
                  fontSize="18">{dg.icon}</text>
                <text x={dg.x} y={dg.y + 8} textAnchor="middle" dominantBaseline="middle"
                  fontSize="7.5" fontWeight="700"
                  fill={actief ? 'white' : dg.kleur}>
                  {dg.label.length > 12 ? dg.label.slice(0, 11) + '…' : dg.label}
                </text>
                <text x={dg.x} y={dg.y + 18} textAnchor="middle" dominantBaseline="middle"
                  fontSize="7" fill={actief ? 'rgba(255,255,255,0.75)' : '#9CA3AF'}>
                  {aantalBronnen} bron{aantalBronnen !== 1 ? 'nen' : ''}
                </text>
              </g>
            )
          })}

          {/* Centrale knoop */}
          <circle cx={CX} cy={CY} r={R_MIDDEN} fill="#1E3A8A" />
          <circle cx={CX} cy={CY} r={R_MIDDEN} fill="url(#centerGrad)" />
          <defs>
            <radialGradient id="centerGrad" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#3B5FC0" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </radialGradient>
          </defs>
          <text x={CX} y={CY - 14} textAnchor="middle" fontSize="22">🧠</text>
          <text x={CX} y={CY + 6} textAnchor="middle" fontSize="9" fontWeight="700" fill="white">AI-Geletterdheid</text>
          <text x={CX} y={CY + 18} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.65)">NHL Stenden</text>

          {/* Tooltip bij hover op bron */}
          {hover?.type === 'bron' && (() => {
            const b = hover.data
            if (!b) return null
            // Positie tooltip: zorg dat hij binnen het diagram blijft
            const tx = b.x > W / 2 ? b.x - 160 : b.x + 20
            const ty = Math.max(10, Math.min(b.y - 40, H - 80))
            return (
              <g pointerEvents="none">
                <rect x={tx} y={ty} width="155" height="68" rx="8"
                  fill="white" stroke="#E5E7EB" strokeWidth="1"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))' }} />
                <text x={tx + 10} y={ty + 16} fontSize="9" fontWeight="700" fill="#1E3A8A">
                  {b.titel.length > 24 ? b.titel.slice(0, 23) + '…' : b.titel}
                </text>
                <text x={tx + 10} y={ty + 30} fontSize="8" fill="#6B7280">
                  {b.type} · {b.isIntern ? 'intern' : 'extern'}
                </text>
                <text x={tx + 10} y={ty + 44} fontSize="8" fill="#6B7280">
                  👍 {b.stemmen} · {b.toegevoegdDoor}
                </text>
                <text x={tx + 10} y={ty + 58} fontSize="8" fill={b.dgKleur} fontWeight="600">
                  Klik om te filteren op doelgroep
                </text>
              </g>
            )
          })()}
        </svg>
      </div>

      {/* Legenda onderaan */}
      <div className="px-6 pb-5">
        <div className="flex flex-wrap gap-2">
          {DOELGROEPEN.map(dg => {
            const n = bronnen.filter(b => b.doelgroep === dg.id).length
            const actief = actieveDoelgroep === dg.id
            return (
              <button key={dg.id}
                onClick={() => onDoelgroepKlik(dg.id === actieveDoelgroep ? null : dg.id)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors"
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
