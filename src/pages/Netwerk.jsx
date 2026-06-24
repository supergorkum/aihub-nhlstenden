import GradientHeader from '../components/GradientHeader'
import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { initiatieven, sporen } from '../data'

const NODE_LINKS = {
  hub:  { intern: true,  to: '/' },
  s1:   { intern: true,  to: '/themas?spoor=1' },
  s2:   { intern: true,  to: '/themas?spoor=2' },
  s3:   { intern: true,  to: '/themas?spoor=3' },
  s4:   { intern: true,  to: '/themas?spoor=4' },
  s5:   { intern: true,  to: '/themas?spoor=5' },
  s6:   { intern: true,  to: '/themas?spoor=6' },
  i1:   { intern: true,  to: '/initiatieven' },
  i2:   { intern: true,  to: '/initiatieven' },
  i3:   { intern: true,  to: '/initiatieven' },
  i4:   { intern: true,  to: '/initiatieven' },
  i5:   { intern: true,  to: '/geletterdheid' },
  i10:  { intern: true,  to: '/initiatieven' },
  i11:  { intern: true,  to: '/initiatieven' },
  i12:  { intern: true,  to: '/initiatieven' },
  i14:  { intern: true,  to: '/initiatieven' },
  e6:   { intern: false, url: 'https://www.surf.nl/en/themes/artificial-intelligence/projects-and-collaborations/ai-hub' },
  e7:   { intern: false, url: 'https://npuls.nl' },
  e8:   { intern: false, url: 'https://gptnl.nl' },
  e9:   { intern: false, url: 'https://www.nijbegun.nl/projecten/ai-fabriek/' },
}

// Zes sporen rondom de kern, evenwichtig verdeeld (60° tussenruimte)
const NODES = [
  { id: 'hub', lines: ['AI-','Netwerk'],         x: 50, y: 50, r: 6,  kleur: '#1E3A8A', type: 'kern' },
  // Zes sporen
  { id: 's1',  lines: ['AI &','Leren'],          x: 50, y: 18, r: 5,  kleur: '#1E3A8A', type: 'spoor', spoorId: 1 },
  { id: 's2',  lines: ['AI &','Werken'],         x: 77, y: 30, r: 5,  kleur: '#0F766E', type: 'spoor', spoorId: 2 },
  { id: 's3',  lines: ['AI &','Verantw.'],       x: 77, y: 70, r: 5,  kleur: '#E91E8C', type: 'spoor', spoorId: 3 },
  { id: 's4',  lines: ['AI &','Geletterd.'],     x: 50, y: 83, r: 5,  kleur: '#7C3AED', type: 'spoor', spoorId: 4 },
  { id: 's5',  lines: ['AI &','Werkveld'],       x: 23, y: 70, r: 5,  kleur: '#B45309', type: 'spoor', spoorId: 5 },
  { id: 's6',  lines: ['AI &','Onderzoek'],      x: 23, y: 30, r: 5,  kleur: '#0E7490', type: 'spoor', spoorId: 6 },
  // Initiatieven
  { id: 'i1',  lines: ['AI','Compliance'],  x: 92, y: 50, r: 2.8, kleur: '#FCE7F3', tekstKleur: '#E91E8C', type: 'init', initId: 1 },
  { id: 'i2',  lines: ['AI','Coalitie'],    x: 62, y: 5,  r: 2.8, kleur: '#DBEAFE', tekstKleur: '#1E3A8A', type: 'init', initId: 2 },
  { id: 'i3',  lines: ['Academie','Edu.'],  x: 82, y: 10, r: 2.8, kleur: '#DBEAFE', tekstKleur: '#1E3A8A', type: 'init', initId: 3 },
  { id: 'i4',  lines: ['FCP','Data&AI'],    x: 96, y: 28, r: 2.8, kleur: '#CCFBF1', tekstKleur: '#0F766E', type: 'init', initId: 4 },
  { id: 'i5',  lines: ['BDB','AI-cursus'],  x: 62, y: 96, r: 2.8, kleur: '#EDE9FE', tekstKleur: '#7C3AED', type: 'init', initId: 5 },
  { id: 'i10', lines: ['Sandbox'],          x: 38, y: 96, r: 2.8, kleur: '#FCE7F3', tekstKleur: '#E91E8C', type: 'init', initId: 10 },
  { id: 'i11', lines: ['AI-Desk'],          x: 96, y: 72, r: 2.8, kleur: '#FCE7F3', tekstKleur: '#E91E8C', type: 'init', initId: 11 },
  { id: 'i12', lines: ['Computer','Vision'],x: 7,  y: 55, r: 2.8, kleur: '#FEF3C7', tekstKleur: '#B45309', type: 'init', initId: 12 },
  { id: 'i14', lines: ['Applied','Res.AI'], x: 7,  y: 20, r: 2.8, kleur: '#ECFEFF', tekstKleur: '#0E7490', type: 'init', initId: 14 },
  // Externe partners
  { id: 'e6',  lines: ['SURF','AI-Hub'],    x: 38, y: 4,  r: 2.5, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 6 },
  { id: 'e8',  lines: ['GPT-NL'],           x: 18, y: 4,  r: 2.5, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 8 },
  { id: 'e9',  lines: ['AI-Fabriek'],       x: 4,  y: 38, r: 2.5, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 9 },
  { id: 'e7',  lines: ['NPULS'],            x: 38, y: 97, r: 2.5, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 7 },
]

const LINKS = [
  ['hub','s1'],['hub','s2'],['hub','s3'],['hub','s4'],['hub','s5'],['hub','s6'],
  ['s1','i2'],['s1','i3'],['s1','e6'],
  ['s2','i4'],
  ['s3','i1'],['s3','i10'],['s3','i11'],
  ['s4','i5'],['s4','e7'],
  ['s5','i12'],
  ['s6','i14'],['s6','e8'],['s6','e9'],
]

function getNode(id) { return NODES.find(n => n.id === id) }

export default function Netwerk() {
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const navigate = useNavigate()

  const navigeerNaar = (id) => {
    const link = NODE_LINKS[id]
    if (!link) return
    if (link.intern) navigate(link.to)
    else window.open(link.url, '_blank', 'noopener noreferrer')
  }

  const sel = selected ? NODES.find(n => n.id === selected) : null
  const hovNode = hovered ? NODES.find(n => n.id === hovered) : null
  const selInit = sel?.initId ? initiatieven.find(i => i.id === sel.initId) : null
  const selSpoor = sel?.spoorId ? sporen.find(s => s.id === sel.spoorId) : null
  const hovInit = hovNode?.initId ? initiatieven.find(i => i.id === hovNode.initId) : null
  const hovSpoor = hovNode?.spoorId ? sporen.find(s => s.id === hovNode.spoorId) : null
  const selLink = selected ? NODE_LINKS[selected] : null

  const verbonden = new Set()
  if (selected) LINKS.forEach(([a, b]) => { if (a === selected) verbonden.add(b); if (b === selected) verbonden.add(a) })
  const hovVerbonden = new Set()
  if (hovered && !selected) LINKS.forEach(([a, b]) => { if (a === hovered) hovVerbonden.add(b); if (b === hovered) hovVerbonden.add(a) })

  const activeNode = selected || hovered
  const activeInit = selInit || hovInit
  const activeSpoor = selSpoor || hovSpoor
  const activeNodeObj = sel || hovNode

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero */}
      <div className="nhl-gradient-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-80 h-80 border border-white rounded-full"/>
          <div className="absolute -bottom-10 left-10 w-60 h-60 border border-white rounded-full"/>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 relative">
          <div className="section-label text-blue-300 mb-3">Netwerkorganisatie</div>
          <h1 className="text-4xl font-extrabold text-white mb-4">Het AI-Netwerk van NHL Stenden</h1>
          <p className="text-blue-100 text-lg leading-relaxed max-w-2xl mb-5">
            Zes thema's, vijf lagen, één centrum. Klik op een knoop om details te zien en direct te navigeren.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Thema's", kleur: '#1E3A8A', bg: 'bg-blue-900/30' },
              { label: 'Initiatieven', kleur: '#DBEAFE', bg: 'bg-blue-100/20', tekst: '#1E3A8A' },
              { label: 'Externe partners', kleur: '#D1FAE5', bg: 'bg-green-100/20', tekst: '#065F46' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-blue-100">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.kleur }}/>
                {l.label}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 72" fill="none" preserveAspectRatio="none" className="w-full block">
            <path d="M0 72L1440 72L1440 28C1320 60 1200 8 1080 20C960 32 840 64 720 52C600 40 480 4 360 16C240 28 120 60 0 40L0 72Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid xl:grid-cols-4 gap-6">
          {/* SVG — ruimer viewBox zodat bollen niet buiten het frame vallen */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <svg viewBox="-8 -8 116 116" className="w-full" style={{ aspectRatio: '1/1' }}>
                <defs>
                  <radialGradient id="netCenterGrad" cx="40%" cy="35%">
                    <stop offset="0%" stopColor="#3B5FC0"/>
                    <stop offset="100%" stopColor="#1E3A8A"/>
                  </radialGradient>
                </defs>
                {/* Decoratieve ringen */}
                <circle cx="50" cy="50" r="22" fill="none" stroke="#E5E7EB" strokeWidth="0.4" strokeDasharray="3 3"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="0.4"/>

                {/* Links */}
                {LINKS.map(([vanId, naarId], i) => {
                  const van = getNode(vanId); const naar = getNode(naarId)
                  if (!van || !naar) return null
                  const isActief = activeNode ? (vanId === activeNode || naarId === activeNode) : false
                  return (
                    <line key={i} x1={van.x} y1={van.y} x2={naar.x} y2={naar.y}
                      stroke={isActief ? '#E91E8C' : '#CBD5E1'}
                      strokeWidth={isActief ? 0.7 : 0.3}
                      strokeDasharray={isActief ? '' : '2,1.5'}
                      style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}/>
                  )
                })}

                {/* Niet-kern nodes */}
                {NODES.filter(n => n.type !== 'kern').map(node => {
                  const isSelected = selected === node.id
                  const isHov = hovered === node.id
                  const isDimmed = activeNode && !isSelected && !isHov
                    ? !verbonden.has(node.id) && !hovVerbonden.has(node.id) && node.id !== activeNode
                    : false
                  const isLight = ['#DBEAFE','#D1FAE5','#EDE9FE','#CCFBF1','#FCE7F3','#FEF3C7','#ECFEFF'].includes(node.kleur)
                  const fillKleur = isSelected ? (isLight ? '#E91E8C' : node.kleur) : node.kleur
                  const tekstKleur = isSelected ? 'white' : (node.tekstKleur || 'white')
                  const scale = isHov && !isSelected ? 1.2 : isSelected ? 1.1 : 1

                  return (
                    <g key={node.id} style={{ cursor: 'pointer', opacity: isDimmed ? 0.15 : 1, transition: 'opacity 0.2s' }}
                      onClick={() => { setSelected(prev => prev === node.id ? null : node.id); setHovered(null) }}
                      onMouseEnter={() => setHovered(node.id)} onMouseLeave={() => setHovered(null)}>
                      {(isHov || isSelected) && (
                        <circle cx={node.x} cy={node.y} r={node.r * scale + 1.5}
                          fill="none" stroke={isSelected ? '#E91E8C' : node.kleur} strokeWidth="0.5" opacity="0.4"/>
                      )}
                      <circle cx={node.x} cy={node.y} r={node.r * scale} fill={fillKleur}
                        stroke={isSelected ? '#E91E8C' : isHov ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.06)'}
                        strokeWidth={isSelected ? 0.7 : isHov ? 0.5 : 0.2}
                        style={{ transition: 'r 0.15s, fill 0.15s' }}/>
                      {node.lines.map((line, i) => {
                        const n = node.lines.length
                        const lh = node.type === 'spoor' ? node.r * scale * 0.42 : node.r * scale * 0.5
                        const oy = (i - (n - 1) / 2) * lh
                        const fs = node.type === 'spoor' ? node.r * scale * 0.24 : node.r * scale * 0.27
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
                  const scale = isHov ? 1.08 : 1
                  return (
                    <g key={node.id} style={{ cursor: 'pointer' }}
                      onClick={() => { setSelected(prev => prev === node.id ? null : node.id); setHovered(null) }}
                      onMouseEnter={() => setHovered(node.id)} onMouseLeave={() => setHovered(null)}>
                      <circle cx={node.x} cy={node.y} r={node.r * scale} fill="url(#netCenterGrad)"
                        style={{ transition: 'r 0.15s' }}/>
                      <text x={node.x} y={node.y - 2.5} textAnchor="middle" fontSize="4" fontWeight="800"
                        fill="white" fontFamily="Inter, Arial, sans-serif" style={{ pointerEvents: 'none' }}>AI-</text>
                      <text x={node.x} y={node.y + 2.5} textAnchor="middle" fontSize="4" fontWeight="800"
                        fill="white" fontFamily="Inter, Arial, sans-serif" style={{ pointerEvents: 'none' }}>Netwerk</text>
                    </g>
                  )
                })}
              </svg>
              <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-400">Klik voor details · Hover om verbindingen te zien</div>
                {selected && <button onClick={() => setSelected(null)} className="text-xs text-gray-400 hover:text-gray-600">✕ Deselecteer</button>}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
              {!activeNodeObj ? (
                <div className="text-center py-4">
                  <div className="text-3xl mb-3">🕸️</div>
                  <div className="font-semibold text-nhl-blauw mb-2 text-sm">Klik op een knoop</div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">Selecteer een thema, initiatief of partner voor details en een directe link.</p>
                  <div className="space-y-2 pt-4 border-t border-gray-100 text-left">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Externe partners</div>
                    {[
                      { label: 'SURF AI-Hub', url: 'https://www.surf.nl/en/themes/artificial-intelligence/projects-and-collaborations/ai-hub' },
                      { label: 'AI-Fabriek Groningen', url: 'https://www.nijbegun.nl/projecten/ai-fabriek/' },
                      { label: 'GPT-NL', url: 'https://gptnl.nl' },
                      { label: 'NPULS', url: 'https://npuls.nl' },
                    ].map(p => (
                      <a key={p.label} href={p.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-nhl-blauw hover:text-nhl-roze transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"/>
                        {p.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              ) : activeNodeObj.type === 'kern' ? (
                <div>
                  <div className="font-bold text-nhl-blauw text-base mb-2">AI-Netwerk NHL Stenden</div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">De centrale verbindingsplek voor alles rond AI bij NHL Stenden. Zes thema's, vijf lagen, één kompas.</p>
                  <button onClick={() => navigeerNaar(activeNodeObj.id)} className="w-full bg-nhl-blauw text-white text-xs font-semibold py-2.5 rounded-xl">Naar de startpagina →</button>
                </div>
              ) : activeSpoor ? (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{activeSpoor.icon}</span>
                    <div>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Thema</div>
                      <div className="font-bold text-nhl-blauw">{activeSpoor.titel}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed mb-3">{activeSpoor.waarom}</p>
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-400 mb-1">Kernambitie</div>
                    <p className="text-xs text-gray-600 italic">{KERNAMBITIES_KORT[activeSpoor.id]}</p>
                  </div>
                  <button onClick={() => navigeerNaar(activeNodeObj.id)}
                    className="w-full text-white text-xs font-semibold py-2.5 rounded-xl"
                    style={{ backgroundColor: activeSpoor.kleur }}>
                    Naar {activeSpoor.titel} →
                  </button>
                </div>
              ) : activeInit ? (
                <div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium mb-2 inline-block ${activeInit.type === 'surf' ? 'bg-purple-100 text-purple-700' : activeInit.type === 'extern' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-nhl-blauw'}`}>
                    {activeInit.type === 'surf' ? '🌐 SURF' : activeInit.type === 'extern' ? '🤝 Extern' : '🏫 Intern'}
                  </span>
                  <div className="font-bold text-nhl-blauw mb-2 text-sm leading-snug">{activeInit.naam}</div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{activeInit.omschrijving}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {activeInit.tags?.map(t => <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>)}
                  </div>
                  <button onClick={() => navigeerNaar(activeNodeObj.id)}
                    className={`w-full text-white text-xs font-semibold py-2.5 rounded-xl ${selLink?.intern ? 'bg-nhl-blauw hover:bg-nhl-blauw-dark' : 'bg-green-700 hover:bg-green-800'}`}>
                    {selLink?.intern ? 'Bekijk in het AI-Netwerk →' : 'Bezoek externe website ↗'}
                  </button>
                </div>
              ) : null}
              {activeNodeObj && (
                <button onClick={() => { setSelected(null); setHovered(null) }} className="mt-3 text-xs text-gray-400 hover:text-gray-600 block">✕ Sluiten</button>
              )}
            </div>
          </div>
        </div>

        {/* Externe partners */}
        <div className="mt-10">
          <div className="section-label mb-2">Externe partners</div>
          <h2 className="text-2xl font-bold text-nhl-blauw mb-6">NHL Stenden in het nationale AI-netwerk</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { naam: 'SURF AI-Hub', icon: '🤝', kleur: '#065F46', licht: '#D1FAE5', omschrijving: 'Samenwerkingsplatform voor AI in het Nederlandse hoger onderwijs. Veilige toegang tot modellen, kennisdeling en gezamenlijke pilots.', url: 'https://www.surf.nl/en/themes/artificial-intelligence/projects-and-collaborations/ai-hub', tags: ['Samenwerking', 'Modellen', 'Veiligheid'] },
              { naam: 'AI-Fabriek Groningen', icon: '🏭', kleur: '#7C3AED', licht: '#EDE9FE', omschrijving: 'Regionale soevereine rekenkracht. €200M nationaal groeifonds 2025. Strategisch alternatief voor Big Tech cloud.', url: 'https://www.nijbegun.nl/projecten/ai-fabriek/', url2: 'https://www.rijksoverheid.nl/actueel/nieuws/2025/06/27/nederland-zet-in-op-200-miljoen-euro-voor-aifabriek-in-groningen', tags: ['Infrastructuur', 'Soevereiniteit', 'Noord'] },
              { naam: 'GPT-NL', icon: '🇳🇱', kleur: '#1E3A8A', licht: '#DBEAFE', omschrijving: 'Soeverein Nederlands taalmodel. AVG-compliant, transparant, in samenwerking met SURF en kennisinstellingen.', url: 'https://gptnl.nl', tags: ['Taalmodel', 'Soevereiniteit', 'AVG'] },
              { naam: 'NPULS', icon: '📚', kleur: '#D97706', licht: '#FFFBEB', omschrijving: 'Nationaal programma digitale geletterdheid. Kaders en materialen direct bruikbaar voor alle doelgroepen.', url: 'https://npuls.nl', tags: ['Geletterdheid', 'Nationaal', 'Materialen'] },
            ].map(p => (
              <div key={p.naam} className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col card-hover">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: p.licht }}>{p.icon}</div>
                  <div className="font-bold text-nhl-blauw text-sm">{p.naam}</div>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-1">{p.omschrijving}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: p.licht, color: p.kleur }}>{t}</span>)}
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold hover:underline" style={{ color: p.kleur }}>🔗 Bezoek website ↗</a>
                {p.url2 && <a href={p.url2} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold hover:underline mt-1" style={{ color: p.kleur }}>📄 Rijksoverheid nieuws ↗</a>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Korte versie kernambities voor het detail panel
const KERNAMBITIES_KORT = {
  1: 'Meer studiesucces, minder uitval en minder voortijdig vertrek door AI.',
  2: 'Hogere efficiency in werkprocessen zodat medewerkers zich richten op hun expertise.',
  3: 'AI alleen inzetten op een manier die transparant, controleerbaar en eerlijk is.',
  4: 'AI-geletterdheid als basisvaardigheid voor alle studenten en medewerkers.',
  5: 'AI verbindt NHL Stenden met het werkveld voor regionale innovatie.',
  6: 'Sterke onderzoekscultuur rond AI via lectoraten, docenten en studenten.',
}
