import GradientHeader from '../components/GradientHeader'
import { useState, useCallback } from 'react'
import { initiatieven, sporen } from '../data'
import PageHeader from '../components/PageHeader'

const NODES = [
  { id: 'hub',  lines: ['AI-', 'Netwerk'],             x: 50, y: 50, r: 6.5, kleur: '#1E3A8A', type: 'kern' },
  { id: 's1',   lines: ['AI &', 'Leren'],              x: 25, y: 20, r: 5.5, kleur: '#1E3A8A', type: 'spoor', spoorId: 1 },
  { id: 's2',   lines: ['AI &', 'Werken'],             x: 75, y: 20, r: 5.5, kleur: '#0F766E', type: 'spoor', spoorId: 2 },
  { id: 's3',   lines: ['AI &', 'Verantw.'],           x: 75, y: 80, r: 5.5, kleur: '#E91E8C', type: 'spoor', spoorId: 3 },
  { id: 's4',   lines: ['AI &', 'Geletterd.'],         x: 25, y: 80, r: 5.5, kleur: '#7C3AED', type: 'spoor', spoorId: 4 },
  { id: 'i1',   lines: ['AI','Compliance'],  x: 10, y: 50, r: 3,   kleur: '#DBEAFE', tekstKleur: '#1E3A8A', type: 'init', initId: 1 },
  { id: 'i2',   lines: ['AI','Coalitie'],    x: 38, y: 5,  r: 3,   kleur: '#DBEAFE', tekstKleur: '#1E3A8A', type: 'init', initId: 2 },
  { id: 'i3',   lines: ['Academie','Edu.'],  x: 62, y: 5,  r: 3,   kleur: '#DBEAFE', tekstKleur: '#1E3A8A', type: 'init', initId: 3 },
  { id: 'i4',   lines: ['FCP','Data & AI'], x: 92, y: 45, r: 3,   kleur: '#CCFBF1', tekstKleur: '#0F766E', type: 'init', initId: 4 },
  { id: 'i5',   lines: ['BDB','AI-cursus'],  x: 62, y: 95, r: 3,   kleur: '#EDE9FE', tekstKleur: '#7C3AED', type: 'init', initId: 5 },
  { id: 'i10',  lines: ['Sandbox'],          x: 38, y: 95, r: 3,   kleur: '#FCE7F3', tekstKleur: '#E91E8C', type: 'init', initId: 10 },
  { id: 'i11',  lines: ['AI-Desk'],          x: 88, y: 68, r: 3,   kleur: '#FCE7F3', tekstKleur: '#E91E8C', type: 'init', initId: 11 },
  { id: 'e6',   lines: ['SURF','Denktank'],  x: 8,  y: 18, r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 6 },
  { id: 'e8',   lines: ['GPT-NL'],           x: 92, y: 18, r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 8 },
  { id: 'e9',   lines: ['AI-Fabriek'],       x: 92, y: 82, r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 9 },
  { id: 'e7',   lines: ['NPULS'],            x: 8,  y: 82, r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 7 },
]

const LINKS = [
  ['hub','s1'],['hub','s2'],['hub','s3'],['hub','s4'],
  ['s1','i1'],['s1','i2'],['s1','i3'],['s2','i4'],
  ['s3','i1'],['s3','i10'],['s3','i11'],['s4','i5'],
  ['s1','e6'],['s2','e8'],['s3','e9'],['s4','e7'],
]

function getNode(id) { return NODES.find(n => n.id === id) }

function NetwerkNode({ node, isSelected, isDimmed, isHovered, onClick, onMouseEnter, onMouseLeave }) {
  const isLight = ['#DBEAFE','#D1FAE5','#EDE9FE','#CCFBF1','#FCE7F3'].includes(node.kleur)
  const fillKleur = isSelected ? (isLight ? '#E91E8C' : node.kleur) : node.kleur
  const tekstKleur = isSelected ? 'white' : (node.tekstKleur || 'white')
  const scale = isHovered && !isSelected ? 1.15 : isSelected ? 1.08 : 1
  const glowR = node.r * scale + 1.5

  return (
    <g onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer', opacity: isDimmed ? 0.2 : 1, transition: 'opacity 0.25s ease' }}>
      {(isHovered || isSelected) && (
        <circle cx={node.x} cy={node.y} r={glowR}
          fill="none" stroke={isSelected ? '#E91E8C' : node.kleur}
          strokeWidth="0.5" opacity="0.4" strokeDasharray={isSelected ? '' : '1.5,0.5'} />
      )}
      <circle cx={node.x} cy={node.y} r={node.r * scale} fill={fillKleur}
        stroke={isSelected ? '#E91E8C' : isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.06)'}
        strokeWidth={isSelected ? 0.7 : isHovered ? 0.5 : 0.2}
        style={{ transition: 'r 0.15s ease, fill 0.15s ease' }} />
      {node.lines.map((line, i) => {
        const n = node.lines.length
        const lineHeight = node.type === 'spoor' ? node.r * scale * 0.42 : node.r * scale * 0.52
        const offsetY = (i - (n - 1) / 2) * lineHeight
        const fs = node.type === 'kern' ? node.r * scale * 0.32
          : node.type === 'spoor' ? node.r * scale * 0.25
          : node.r * scale * 0.28
        return (
          <text key={i} x={node.x} y={node.y + offsetY}
            textAnchor="middle" dominantBaseline="middle"
            fill={tekstKleur} fontSize={fs}
            fontWeight={node.type === 'kern' || node.type === 'spoor' ? '700' : '500'}
            fontFamily="Inter, Arial, sans-serif"
            style={{ pointerEvents: 'none', userSelect: 'none' }}>
            {line}
          </text>
        )
      })}
      {isHovered && node.type !== 'kern' && node.type !== 'spoor' && (
        <text x={node.x} y={node.y - node.r * scale - 1.2}
          textAnchor="middle" fill="#1E3A8A" fontSize="1.8" fontWeight="600"
          fontFamily="Inter, Arial, sans-serif"
          style={{ pointerEvents: 'none', userSelect: 'none' }}>
          {node.lines.join(' ')}
        </text>
      )}
    </g>
  )
}

export default function Netwerk() {
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)

  const handleClick = useCallback((id) => {
    setSelected(prev => {
      const nieuw = prev === id ? null : id
      if (nieuw) {
        setTimeout(() => {
          const el = document.getElementById('netwerk-detail')
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 50)
      }
      return nieuw
    })
  }, [])

  const sel = selected ? NODES.find(n => n.id === selected) : null
  const selInit = sel?.initId ? initiatieven.find(i => i.id === sel.initId) : null
  const selSpoor = sel?.spoorId ? sporen.find(s => s.id === sel.spoorId) : null

  const verbonden = new Set()
  if (selected) {
    LINKS.forEach(([a, b]) => {
      if (a === selected) verbonden.add(b)
      if (b === selected) verbonden.add(a)
    })
  }

  const hovVerbonden = new Set()
  if (hovered && !selected) {
    LINKS.forEach(([a, b]) => {
      if (a === hovered) hovVerbonden.add(b)
      if (b === hovered) hovVerbonden.add(a)
    })
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <GradientHeader label="Netwerkorganisatie" title="Het AI-Netwerk van NHL Stenden"
        subtitle="Klik op een knoop om details te zien. De verbindingen laten zien hoe initiatieven en thema's samenhangen." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-nhl-blauw flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-nhl-blauw text-sm mb-1">Kern & Thema's</div>
                <p className="text-gray-500 text-xs leading-relaxed">De grote bollen zijn het AI-Netwerk en de vier thema's. Ze vormen de kern waarop alles is aangesloten.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-100 border border-nhl-blauw flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-nhl-blauw text-sm mb-1">Interne initiatieven</div>
                <p className="text-gray-500 text-xs leading-relaxed">Lichtgekleurde bollen zijn NHL Stenden initiatieven, verbonden aan het thema waar ze bij passen.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-green-100 border border-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-nhl-blauw text-sm mb-1">Externe partners</div>
                <p className="text-gray-500 text-xs leading-relaxed">Groene bollen zijn externe partners zoals SURF en NPULS. NHL Stenden is hier actief medebouwer.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <svg viewBox="0 0 100 100" className="w-full" style={{ aspectRatio: '4/3' }}>
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
                    <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                {LINKS.map(([vanId, naarId], i) => {
                  const van = getNode(vanId)
                  const naar = getNode(naarId)
                  const isActief = selected
                    ? (vanId === selected || naarId === selected)
                    : hovered ? (vanId === hovered || naarId === hovered) : false
                  return (
                    <line key={i} x1={van.x} y1={van.y} x2={naar.x} y2={naar.y}
                      stroke={isActief ? '#E91E8C' : '#CBD5E1'}
                      strokeWidth={isActief ? 0.6 : 0.25}
                      strokeDasharray={isActief ? '' : '1.5,1'}
                      style={{ transition: 'stroke 0.2s ease, stroke-width 0.2s ease' }} />
                  )
                })}
                {NODES.filter(n => n.type !== 'kern').map(node => {
                  const isSelected = selected === node.id
                  const isHov = hovered === node.id
                  const isDimmed = selected
                    ? (!isSelected && !verbonden.has(node.id))
                    : hovered ? (!isHov && !hovVerbonden.has(node.id) && node.id !== 'hub') : false
                  return (
                    <NetwerkNode key={node.id} node={node} isSelected={isSelected}
                      isDimmed={isDimmed} isHovered={isHov}
                      onClick={() => handleClick(node.id)}
                      onMouseEnter={() => setHovered(node.id)}
                      onMouseLeave={() => setHovered(null)} />
                  )
                })}
                {NODES.filter(n => n.type === 'kern').map(node => (
                  <NetwerkNode key={node.id} node={node} isSelected={selected === node.id}
                    isDimmed={false} isHovered={hovered === node.id}
                    onClick={() => handleClick(node.id)}
                    onMouseEnter={() => setHovered(node.id)}
                    onMouseLeave={() => setHovered(null)} />
                ))}
              </svg>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-400">Klik voor details · Beweeg over een bol voor preview</div>
                {selected && (
                  <button onClick={() => setSelected(null)} className="text-xs text-gray-400 hover:text-gray-600">✕ Deselecteer</button>
                )}
              </div>
            </div>
          </div>

          <div id="netwerk-detail">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              {!sel ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-3">👆</div>
                  <div className="font-semibold text-nhl-blauw mb-2 text-sm">Klik op een knoop</div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6">Selecteer een initiatief, thema of partner voor meer informatie en verbindingen.</p>
                  <div className="pt-4 border-t border-gray-100 text-left space-y-2">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Snel navigeren</div>
                    {[
                      ['/initiatieven', '→ Alle initiatieven'],
                      ['/meld', '→ Initiatief aanmelden'],
                      ['/inspiratie', '→ Inspiratie & vragen'],
                    ].map(([to, label]) => (
                      <a key={to} href={to} className="block text-sm text-nhl-blauw hover:underline">{label}</a>
                    ))}
                  </div>
                </div>
              ) : sel.type === 'kern' ? (
                <div className="animate-fade-in">
                  <div className="font-bold text-nhl-blauw text-lg mb-3">AI-Netwerk NHL Stenden</div>
                  <p className="text-gray-600 text-sm leading-relaxed">De centrale verbindingsplek voor alles rond AI bij NHL Stenden. Vier thema's, vijf lagen, één kompas.</p>
                </div>
              ) : selSpoor ? (
                <div className="animate-fade-in">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Thema</div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{selSpoor.icon}</span>
                    <span className="font-bold text-nhl-blauw">{selSpoor.titel}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{selSpoor.waarom}</p>
                  <div className="space-y-1.5">
                    {selSpoor.themas.map(t => (
                      <div key={t} className="text-xs bg-gray-50 rounded-lg px-3 py-1.5 text-gray-600">{t}</div>
                    ))}
                  </div>
                </div>
              ) : selInit ? (
                <div className="animate-fade-in">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      selInit.type === 'surf' ? 'bg-purple-100 text-purple-700' :
                      selInit.type === 'extern' ? 'bg-green-100 text-green-700' :
                      selInit.status === 'in-ontwikkeling' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-nhl-blauw'
                    }`}>
                      {selInit.type === 'surf' ? 'SURF / Nationaal' : selInit.type === 'extern' ? 'Extern' : selInit.status === 'in-ontwikkeling' ? 'In ontwikkeling' : 'Actief'}
                    </span>
                  </div>
                  <div className="font-bold text-nhl-blauw mb-2 leading-snug">{selInit.naam}</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{selInit.omschrijving}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {selInit.tags?.map(t => (
                      <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                  {selInit.laag && <div className="text-xs text-gray-400">Laag {selInit.laag} · Thema {selInit.spoor}</div>}
                </div>
              ) : null}
              {sel && (
                <button onClick={() => setSelected(null)} className="mt-5 text-xs text-gray-400 hover:text-gray-600 transition-colors block">
                  ✕ Sluiten
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
