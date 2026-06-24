import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { initiatieven, sporen } from '../data'

const NODE_LINKS = {
  hub:  { intern: true, to: '/' },
  s1:   { intern: true, to: '/themas?spoor=1' },
  s2:   { intern: true, to: '/themas?spoor=2' },
  s3:   { intern: true, to: '/themas?spoor=3' },
  s4:   { intern: true, to: '/themas?spoor=4' },
  i1:   { intern: true, to: '/initiatieven' },
  i2:   { intern: true, to: '/initiatieven' },
  i3:   { intern: true, to: '/initiatieven' },
  i4:   { intern: true, to: '/initiatieven' },
  i5:   { intern: true, to: '/geletterdheid' },
  i10:  { intern: true, to: '/initiatieven' },
  i11:  { intern: true, to: '/initiatieven' },
  e6:   { intern: false, url: 'https://www.surf.nl/en/themes/artificial-intelligence/projects-and-collaborations/ai-hub' },
  e8:   { intern: false, url: 'https://gptnl.nl' },
  e9:   { intern: false, url: 'https://www.nijbegun.nl/projecten/ai-fabriek/' },
  e7:   { intern: false, url: 'https://npuls.nl' },
}

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
  { id: 'e6',   lines: ['SURF','AI-Hub'],    x: 8,  y: 18, r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 6 },
  { id: 'e8',   lines: ['GPT-NL'],           x: 92, y: 18, r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 8 },
  { id: 'e9',   lines: ['AI-Fabriek','Gron.'], x: 92, y: 82, r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 9 },
  { id: 'e7',   lines: ['NPULS'],            x: 8,  y: 82, r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 7 },
]

const LINKS = [
  ['hub','s1'],['hub','s2'],['hub','s3'],['hub','s4'],
  ['s1','i1'],['s1','i2'],['s1','i3'],['s2','i4'],
  ['s3','i1'],['s3','i10'],['s3','i11'],['s4','i5'],
  ['s1','e6'],['s2','e8'],['s3','e9'],['s4','e7'],
]

function getNode(id) { return NODES.find(n => n.id === id) }

export default function NetwerkVisualisatie({ fullscreen = false }) {
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const navigate = useNavigate()

  const sel = selected ? NODES.find(n => n.id === selected) : null
  const hovNode = hovered ? NODES.find(n => n.id === hovered) : null
  const selInit = sel?.initId ? initiatieven.find(i => i.id === sel.initId) : null
  const selSpoor = sel?.spoorId ? sporen.find(s => s.id === sel.spoorId) : null
  const hovInit = hovNode?.initId ? initiatieven.find(i => i.id === hovNode.initId) : null
  const hovSpoor = hovNode?.spoorId ? sporen.find(s => s.id === hovNode.spoorId) : null
  const selLink = selected ? NODE_LINKS[selected] : null
  const hovLink = hovered ? NODE_LINKS[hovered] : null

  const verbonden = new Set()
  if (selected) LINKS.forEach(([a, b]) => { if (a === selected) verbonden.add(b); if (b === selected) verbonden.add(a) })
  const hovVerbonden = new Set()
  if (hovered && !selected) LINKS.forEach(([a, b]) => { if (a === hovered) hovVerbonden.add(b); if (b === hovered) hovVerbonden.add(a) })

  const navigeerNaar = (id) => {
    const link = NODE_LINKS[id]
    if (!link) return
    if (link.intern) navigate(link.to)
    else window.open(link.url, '_blank', 'noopener noreferrer')
  }

  const activeNode = selected || hovered
  const activeInit = selInit || hovInit
  const activeSpoor = selSpoor || hovSpoor
  const activeLink = selLink || hovLink
  const activeNodeObj = sel || hovNode

  return (
    <div className={`flex gap-4 h-full ${fullscreen ? 'flex-row' : 'flex-col lg:flex-row'}`}>
      {/* SVG */}
      <div className={`${fullscreen ? 'flex-1' : 'lg:flex-1'} bg-white/5 rounded-2xl overflow-hidden`}
        style={fullscreen ? { background: 'rgba(255,255,255,0.05)' } : {}}>
        <svg viewBox="-5 -5 110 110" className="w-full h-full" style={{ aspectRatio: fullscreen ? undefined : '1/1' }}>
          <defs>
            <filter id="nvGlow">
              <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Ringen */}
          <circle cx="50" cy="50" r="18" fill="none" stroke={fullscreen ? 'rgba(255,255,255,0.08)' : '#E5E7EB'} strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="35" fill="none" stroke={fullscreen ? 'rgba(255,255,255,0.05)' : '#F3F4F6'} strokeWidth="0.5" />

          {/* Links */}
          {LINKS.map(([vanId, naarId], i) => {
            const van = getNode(vanId); const naar = getNode(naarId)
            const isActief = activeNode ? (vanId === activeNode || naarId === activeNode) : false
            return (
              <line key={i} x1={van.x} y1={van.y} x2={naar.x} y2={naar.y}
                stroke={isActief ? '#E91E8C' : fullscreen ? 'rgba(255,255,255,0.2)' : '#CBD5E1'}
                strokeWidth={isActief ? 0.7 : 0.3}
                strokeDasharray={isActief ? '' : '1.5,1'}
                style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }} />
            )
          })}

          {/* Nodes */}
          {NODES.filter(n => n.type !== 'kern').map(node => {
            const isSelected = selected === node.id
            const isHov = hovered === node.id
            const isDimmed = activeNode && !isSelected && !isHov
              ? !verbonden.has(node.id) && !hovVerbonden.has(node.id) && node.id !== activeNode
              : false
            const isLight = ['#DBEAFE','#D1FAE5','#EDE9FE','#CCFBF1','#FCE7F3'].includes(node.kleur)
            const fillKleur = isSelected ? (isLight ? '#E91E8C' : node.kleur) : node.kleur
            const tekstKleur = isSelected ? 'white' : (node.tekstKleur || 'white')
            const scale = isHov && !isSelected ? 1.2 : isSelected ? 1.1 : 1

            return (
              <g key={node.id}
                style={{ cursor: 'pointer', opacity: isDimmed ? 0.15 : 1, transition: 'opacity 0.2s' }}
                onClick={() => { setSelected(prev => prev === node.id ? null : node.id); setHovered(null) }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}>
                {(isHov || isSelected) && (
                  <circle cx={node.x} cy={node.y} r={node.r * scale + 1.5}
                    fill="none" stroke={isSelected ? '#E91E8C' : node.kleur}
                    strokeWidth="0.5" opacity="0.5" strokeDasharray={isSelected ? '' : '1.5,0.5'} />
                )}
                <circle cx={node.x} cy={node.y} r={node.r * scale} fill={fillKleur}
                  stroke={isSelected ? '#E91E8C' : isHov ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.06)'}
                  strokeWidth={isSelected ? 0.7 : isHov ? 0.5 : 0.2}
                  style={{ transition: 'r 0.15s, fill 0.15s' }} />
                {node.lines.map((line, i) => {
                  const n = node.lines.length
                  const lh = node.type === 'spoor' ? node.r * scale * 0.42 : node.r * scale * 0.52
                  const oy = (i - (n - 1) / 2) * lh
                  const fs = node.type === 'spoor' ? node.r * scale * 0.25 : node.r * scale * 0.28
                  return (
                    <text key={i} x={node.x} y={node.y + oy} textAnchor="middle" dominantBaseline="middle"
                      fill={tekstKleur} fontSize={fs} fontWeight="600"
                      fontFamily="Inter, Arial, sans-serif" style={{ pointerEvents: 'none', userSelect: 'none' }}>
                      {line}
                    </text>
                  )
                })}
              </g>
            )
          })}

          {/* Kern */}
          {NODES.filter(n => n.type === 'kern').map(node => {
            const isHov = hovered === node.id
            const isSelected = selected === node.id
            const scale = isHov || isSelected ? 1.08 : 1
            return (
              <g key={node.id} style={{ cursor: 'pointer' }}
                onClick={() => { setSelected(prev => prev === node.id ? null : node.id); setHovered(null) }}
                onMouseEnter={() => setHovered(node.id)} onMouseLeave={() => setHovered(null)}>
                <defs>
                  <radialGradient id="nvCenterGrad" cx="40%" cy="35%">
                    <stop offset="0%" stopColor="#3B5FC0"/>
                    <stop offset="100%" stopColor="#1E3A8A"/>
                  </radialGradient>
                </defs>
                <circle cx={node.x} cy={node.y} r={node.r * scale} fill="url(#nvCenterGrad)"
                  filter="url(#nvGlow)" style={{ transition: 'r 0.15s' }} />
                <text x={node.x} y={node.y - 2.5} textAnchor="middle" fontSize="4.5" fontWeight="800"
                  fill="white" fontFamily="Inter, Arial, sans-serif" style={{ pointerEvents: 'none' }}>AI-</text>
                <text x={node.x} y={node.y + 3} textAnchor="middle" fontSize="4.5" fontWeight="800"
                  fill="white" fontFamily="Inter, Arial, sans-serif" style={{ pointerEvents: 'none' }}>Netwerk</text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Detail panel */}
      {(activeNode && activeNodeObj) && (
        <div className={`${fullscreen ? 'w-72 flex-shrink-0' : 'lg:w-72'} ${fullscreen ? 'bg-white/10 border-white/20' : 'bg-white border-gray-100'} rounded-2xl border p-5 flex flex-col`}>
          {activeNodeObj.type === 'kern' ? (
            <>
              <div className={`font-bold text-lg mb-2 ${fullscreen ? 'text-white' : 'text-nhl-blauw'}`}>AI-Netwerk NHL Stenden</div>
              <p className={`text-sm leading-relaxed mb-4 ${fullscreen ? 'text-white/70' : 'text-gray-600'}`}>De centrale verbindingsplek voor alles rond AI bij NHL Stenden.</p>
              <button onClick={() => navigeerNaar(activeNode)} className="mt-auto w-full bg-nhl-blauw hover:bg-nhl-blauw-dark text-white text-xs font-semibold py-2.5 rounded-xl transition-colors">Naar de startpagina →</button>
            </>
          ) : activeSpoor ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{activeSpoor.icon}</span>
                <span className={`font-bold ${fullscreen ? 'text-white' : 'text-nhl-blauw'}`}>{activeSpoor.titel}</span>
              </div>
              <p className={`text-xs leading-relaxed mb-3 ${fullscreen ? 'text-white/70' : 'text-gray-600'}`}>{activeSpoor.waarom}</p>
              <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${fullscreen ? 'text-white/50' : 'text-gray-400'}`}>Kernambitie</div>
              <p className={`text-xs italic leading-relaxed mb-4 ${fullscreen ? 'text-white/60' : 'text-gray-500'}`}>
                {activeSpoor.id === 1 ? '"De inzet van AI moet leiden tot meer studiesucces, minder uitval en minder voortijdig vertrek."'
                : activeSpoor.id === 2 ? '"NHL Stenden zet AI in om de efficiency van werkprocessen te verhogen."'
                : activeSpoor.id === 3 ? '"NHL Stenden gebruikt AI alleen op een manier die transparant en eerlijk is."'
                : '"NHL Stenden zorgt ervoor dat AI-geletterdheid een basisvaardigheid is voor iedereen."'}
              </p>
              <button onClick={() => navigeerNaar(activeNode)}
                className="mt-auto w-full text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
                style={{ backgroundColor: activeSpoor.kleur }}>
                Naar {activeSpoor.titel} →
              </button>
            </>
          ) : activeInit ? (
            <>
              <div className={`flex gap-2 mb-2 flex-wrap`}>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${activeInit.type === 'surf' ? 'bg-purple-100 text-purple-700' : activeInit.type === 'extern' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-nhl-blauw'}`}>
                  {activeInit.type === 'surf' ? '🌐 SURF' : activeInit.type === 'extern' ? '🤝 Extern' : '🏫 Intern'}
                </span>
              </div>
              <div className={`font-bold mb-2 leading-snug text-sm ${fullscreen ? 'text-white' : 'text-nhl-blauw'}`}>{activeInit.naam}</div>
              <p className={`text-xs leading-relaxed mb-3 ${fullscreen ? 'text-white/70' : 'text-gray-600'}`}>{activeInit.omschrijving}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {activeInit.tags?.map(t => (
                  <span key={t} className={`text-xs px-2 py-0.5 rounded ${fullscreen ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-500'}`}>{t}</span>
                ))}
              </div>
              {activeInit.laag && <div className={`text-xs mb-4 ${fullscreen ? 'text-white/50' : 'text-gray-400'}`}>Laag {activeInit.laag}</div>}
              <div className="space-y-2 mt-auto">
                <button onClick={() => navigeerNaar(activeNode)}
                  className="w-full bg-nhl-blauw hover:bg-nhl-blauw-dark text-white text-xs font-semibold py-2.5 rounded-xl transition-colors">
                  {activeLink?.intern ? 'Bekijk in het AI-Netwerk →' : 'Bezoek externe website ↗'}
                </button>
              </div>
            </>
          ) : null}

          <button onClick={() => { setSelected(null); setHovered(null) }}
            className={`mt-3 text-xs transition-colors block text-center ${fullscreen ? 'text-white/40 hover:text-white/70' : 'text-gray-400 hover:text-gray-600'}`}>
            ✕ Sluiten
          </button>
        </div>
      )}

      {/* Lege state fullscreen */}
      {!activeNode && fullscreen && (
        <div className="w-64 flex-shrink-0 flex flex-col justify-center items-center text-center">
          <div className="text-4xl mb-3 opacity-40">👆</div>
          <div className="text-white/60 text-sm">Hover of klik op een knoop</div>
          <div className="text-white/30 text-xs mt-2">Intern: navigeert binnen het AI-Netwerk</div>
          <div className="text-white/30 text-xs mt-1">Extern ↗: opent in nieuw tabblad</div>
        </div>
      )}
    </div>
  )
}
