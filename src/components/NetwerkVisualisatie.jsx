import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { initiatieven, sporen } from '../data'

// Zelfde NODE_LINKS, NODES en LINKS als pages/Netwerk.jsx
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
  i12:  { intern: false, url: 'https://www.nhlstenden.com/onderzoek/lectoraten/computer-vision-artificial-intelligence' },
  i14:  { intern: true,  to: '/initiatieven' },
  e6:   { intern: false, url: 'https://www.surf.nl/en/themes/artificial-intelligence/projects-and-collaborations/ai-hub' },
  e7:   { intern: false, url: 'https://npuls.nl' },
  e8:   { intern: false, url: 'https://gptnl.nl' },
  e9:   { intern: false, url: 'https://www.nijbegun.nl/projecten/ai-fabriek/' },
}

const NODES = [
  { id: 'hub', lines: ['AI-','Netwerk'],         x: 55, y: 55, r: 6.5, kleur: '#1E3A8A', type: 'kern' },
  { id: 's1',  lines: ['AI &','Leren'],          x: 55, y: 20, r: 5.5, kleur: '#1E3A8A', type: 'spoor', spoorId: 1 },
  { id: 's2',  lines: ['AI &','Werken'],         x: 85, y: 37, r: 5.5, kleur: '#0F766E', type: 'spoor', spoorId: 2 },
  { id: 's3',  lines: ['AI &','Verantw.'],       x: 85, y: 73, r: 5.5, kleur: '#E91E8C', type: 'spoor', spoorId: 3 },
  { id: 's4',  lines: ['AI &','Geletterd.'],     x: 55, y: 90, r: 5.5, kleur: '#7C3AED', type: 'spoor', spoorId: 4 },
  { id: 's5',  lines: ['AI &','Werkveld'],       x: 25, y: 73, r: 5.5, kleur: '#B45309', type: 'spoor', spoorId: 5 },
  { id: 's6',  lines: ['AI &','Onderzoek'],      x: 25, y: 37, r: 5.5, kleur: '#0E7490', type: 'spoor', spoorId: 6 },
  { id: 'i1',  lines: ['AI','Compliance'],  x: 103, y: 55, r: 3,   kleur: '#FCE7F3', tekstKleur: '#E91E8C', type: 'init', initId: 1 },
  { id: 'i2',  lines: ['AI','Coalitie'],    x: 68,  y: 6,  r: 3,   kleur: '#DBEAFE', tekstKleur: '#1E3A8A', type: 'init', initId: 2 },
  { id: 'i3',  lines: ['Academie','Edu.'],  x: 90,  y: 13, r: 3,   kleur: '#DBEAFE', tekstKleur: '#1E3A8A', type: 'init', initId: 3 },
  { id: 'i4',  lines: ['FCP','Data&AI'],    x: 103, y: 32, r: 3,   kleur: '#CCFBF1', tekstKleur: '#0F766E', type: 'init', initId: 4 },
  { id: 'i5',  lines: ['BDB','AI-cursus'],  x: 70,  y: 104,r: 3,   kleur: '#EDE9FE', tekstKleur: '#7C3AED', type: 'init', initId: 5 },
  { id: 'i10', lines: ['Sandbox'],          x: 45,  y: 104,r: 3,   kleur: '#FCE7F3', tekstKleur: '#E91E8C', type: 'init', initId: 10 },
  { id: 'i11', lines: ['AI-Desk'],          x: 103, y: 77, r: 3,   kleur: '#FCE7F3', tekstKleur: '#E91E8C', type: 'init', initId: 11 },
  { id: 'i12', lines: ['Computer','Vision'],x: 6,   y: 73, r: 3,   kleur: '#FEF3C7', tekstKleur: '#B45309', type: 'init', initId: 12 },
  { id: 'i14', lines: ['Applied','Res.AI'], x: 6,   y: 25, r: 3,   kleur: '#ECFEFF', tekstKleur: '#0E7490', type: 'init', initId: 14 },
  { id: 'e6',  lines: ['SURF','AI-Hub'],    x: 42,  y: 5,  r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 6 },
  { id: 'e8',  lines: ['GPT-NL'],           x: 20,  y: 7,  r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 8 },
  { id: 'e9',  lines: ['AI-Fabriek'],       x: 5,   y: 46, r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 9 },
  { id: 'e7',  lines: ['NPULS'],            x: 26,  y: 104,r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 7 },
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

const KERNAMBITIES_KORT = {
  1: 'Meer studiesucces, minder uitval en minder voortijdig vertrek door AI.',
  2: 'Hogere efficiency in werkprocessen zodat medewerkers zich richten op hun expertise.',
  3: 'AI alleen inzetten op een manier die transparant, controleerbaar en eerlijk is.',
  4: 'AI-geletterdheid als basisvaardigheid voor alle studenten en medewerkers.',
  5: 'AI verbindt NHL Stenden met het werkveld voor regionale innovatie.',
  6: 'Sterke onderzoekscultuur rond AI via lectoraten, docenten en studenten.',
}

function getNode(id) { return NODES.find(n => n.id === id) }

export default function NetwerkVisualisatie({ fullscreen = false }) {
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const hoverTimer = useRef(null)
  const navigate = useNavigate()

  const panelNode = selected ?? hovered
  const activeForLinks = selected ?? hovered
  const activeNodeObj = panelNode ? NODES.find(n => n.id === panelNode) : null

  const verbonden = new Set()
  if (activeForLinks) {
    LINKS.forEach(([a, b]) => {
      if (a === activeForLinks) verbonden.add(b)
      if (b === activeForLinks) verbonden.add(a)
    })
  }

  const handleKlik = (nodeId) => {
    setSelected(prev => prev === nodeId ? null : nodeId)
    setHovered(null)
  }

  const handleHoverIn = (nodeId) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    setHovered(nodeId)
  }
  const handleHoverUit = () => {
    hoverTimer.current = setTimeout(() => setHovered(null), 80)
  }

  const handlePanelMouseEnter = () => {
    // Vergrendel alleen als er iets gehoverd wordt én nog niets geselecteerd is
    if (hovered && !selected) {
      setSelected(hovered)
      setHovered(null)
    }
    // Als er al iets geselecteerd is: panel-mouseenter doet niets extra
  }

  // Rendert het detailpaneel: zelfde logica als pages/Netwerk.jsx
  function PanelInhoud({ nodeId }) {
    const node = NODES.find(n => n.id === nodeId)
    if (!node) return null

    const init = node.initId ? initiatieven.find(i => i.id === node.initId) : null
    const spoor = node.spoorId ? sporen.find(s => s.id === node.spoorId) : null
    const link = NODE_LINKS[nodeId]

    const tekstKleur = fullscreen ? 'text-white' : 'text-nhl-blauw'
    const subKleur = fullscreen ? 'text-white/70' : 'text-gray-600'
    const tagKleur = fullscreen ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-500'

    if (node.type === 'kern') {
      return (
        <div>
          <div className={`font-bold text-lg mb-2 ${tekstKleur}`}>AI-Netwerk NHL Stenden</div>
          <p className={`text-sm leading-relaxed mb-4 ${subKleur}`}>
            De centrale verbindingsplek voor alles rond AI bij NHL Stenden. Zes thema's, vijf lagen, één kompas.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-nhl-blauw hover:bg-blue-900 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
          >
            Naar de startpagina →
          </button>
        </div>
      )
    }

    if (spoor) {
      return (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{spoor.icon}</span>
            <span className={`font-bold ${tekstKleur}`}>{spoor.titel}</span>
          </div>
          <p className={`text-xs leading-relaxed mb-3 ${subKleur}`}>{spoor.waarom}</p>
          <div className="rounded-xl p-3 mb-4 border-l-2" style={{ borderColor: spoor.kleur, backgroundColor: spoor.kleur + '15' }}>
            <div className={`text-xs font-semibold mb-1 ${fullscreen ? 'text-white/50' : 'text-gray-400'}`}>Kernambitie</div>
            <p className={`text-xs italic leading-relaxed ${fullscreen ? 'text-white/60' : 'text-gray-500'}`}>{KERNAMBITIES_KORT[spoor.id]}</p>
          </div>
          <button
            onClick={() => navigate(link?.to || '/themas')}
            className="w-full text-white text-xs font-semibold py-2.5 rounded-xl transition-colors hover:opacity-90"
            style={{ backgroundColor: spoor.kleur }}
          >
            Naar {spoor.titel} →
          </button>
        </div>
      )
    }

    if (init) {
      const isExtern = node.type === 'extern'
      const externeUrl = link?.intern === false ? link.url : null

      return (
        <div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium mb-3 inline-block ${
            isExtern ? 'bg-green-100 text-green-700'
            : init.type === 'surf' ? 'bg-purple-100 text-purple-700'
            : 'bg-blue-100 text-nhl-blauw'
          }`}>
            {isExtern ? '🤝 Externe partner' : init.type === 'surf' ? '🌐 SURF' : '🏫 Intern initiatief'}
          </span>
          <div className={`font-bold mb-2 text-sm leading-snug ${tekstKleur}`}>{init.naam}</div>
          <p className={`text-xs leading-relaxed mb-3 ${subKleur}`}>{init.omschrijving}</p>
          {init.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {init.tags.map(t => (
                <span key={t} className={`text-xs px-2 py-0.5 rounded ${tagKleur}`}>{t}</span>
              ))}
            </div>
          )}
          {init.laag && (
            <div className={`text-xs mb-3 ${fullscreen ? 'text-white/50' : 'text-gray-400'}`}>Laag {init.laag}</div>
          )}
          <div className="space-y-2">
            {/* Extern: groene knop */}
            {externeUrl && (
              <a
                href={externeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-700 hover:bg-green-800 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
              >
                Bezoek externe website ↗
              </a>
            )}
            {/* Intern: blauwe knop */}
            {!externeUrl && link?.intern && (
              <button
                onClick={() => navigate(link.to)}
                className="flex items-center justify-center gap-2 w-full bg-nhl-blauw hover:bg-blue-900 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
              >
                Bekijk in het AI-Netwerk →
              </button>
            )}
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className={`flex gap-4 h-full ${fullscreen ? 'flex-row' : 'flex-col lg:flex-row'}`}>
      {/* SVG */}
      <div
        className={`${fullscreen ? 'flex-1 min-w-0 overflow-auto' : 'lg:flex-1'} rounded-2xl overflow-hidden`}
        style={{ background: fullscreen ? 'rgba(255,255,255,0.05)' : 'transparent' }}
      >
        <svg
          viewBox="-14 -14 138 138"
          className="w-full"
          style={{ aspectRatio: '1/1', maxHeight: fullscreen ? 'calc(100vh - 120px)' : undefined }}
        >
          <defs>
            <radialGradient id="nvCenterGrad" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#3B5FC0"/>
              <stop offset="100%" stopColor="#1E3A8A"/>
            </radialGradient>
          </defs>

          <circle cx="55" cy="55" r="24" fill="none"
            stroke={fullscreen ? 'rgba(255,255,255,0.08)' : '#E5E7EB'}
            strokeWidth="0.4" strokeDasharray="3 3"/>
          <circle cx="55" cy="55" r="42" fill="none"
            stroke={fullscreen ? 'rgba(255,255,255,0.05)' : '#F3F4F6'}
            strokeWidth="0.4"/>

          {LINKS.map(([vanId, naarId], i) => {
            const van = getNode(vanId); const naar = getNode(naarId)
            if (!van || !naar) return null
            const isActief = activeForLinks && (vanId === activeForLinks || naarId === activeForLinks)
            return (
              <line key={i} x1={van.x} y1={van.y} x2={naar.x} y2={naar.y}
                stroke={isActief ? '#E91E8C' : fullscreen ? 'rgba(255,255,255,0.2)' : '#CBD5E1'}
                strokeWidth={isActief ? 0.7 : 0.3}
                strokeDasharray={isActief ? '' : '2,1.5'}
                style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
              />
            )
          })}

          {NODES.filter(n => n.type !== 'kern').map(node => {
            const isSelected = selected === node.id
            const isHov = hovered === node.id
            const isActief = isSelected || isHov

            const isDimmed = activeForLinks
              ? !verbonden.has(node.id) && node.id !== activeForLinks
              : false

            const isLight = ['#DBEAFE','#D1FAE5','#EDE9FE','#CCFBF1','#FCE7F3','#FEF3C7','#ECFEFF'].includes(node.kleur)
            const fillKleur = isSelected ? (isLight ? '#E91E8C' : node.kleur) : node.kleur
            const tekstKleur = isSelected ? 'white' : (node.tekstKleur || 'white')
            // Externe bollen zijn klein (r=2.8): grotere hover-scale zodat ze leesbaar worden
            const baseScale = node.type === 'extern' ? 1.6 : 1.2
            const scale = isHov && !isSelected ? baseScale : isSelected ? (node.type === 'extern' ? 1.4 : 1.1) : 1

            return (
              <g key={node.id}
                style={{ cursor: 'pointer', opacity: isDimmed ? 0.15 : 1, transition: 'opacity 0.2s' }}
                onClick={() => handleKlik(node.id)}
                onMouseEnter={() => handleHoverIn(node.id)}
                onMouseLeave={handleHoverUit}
              >
                {isActief && (
                  <circle cx={node.x} cy={node.y} r={node.r * scale + 1.5}
                    fill="none" stroke={isSelected ? '#E91E8C' : node.kleur}
                    strokeWidth="0.5" opacity="0.4"/>
                )}
                <circle cx={node.x} cy={node.y} r={node.r * scale} fill={fillKleur}
                  stroke={isSelected ? '#E91E8C' : isHov ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.06)'}
                  strokeWidth={isSelected ? 0.7 : isHov ? 0.5 : 0.2}
                  style={{ transition: 'r 0.2s ease, fill 0.2s ease' }}/>
                {node.lines.map((line, li) => {
                  const n = node.lines.length
                  const lh = node.type === 'spoor' ? node.r * scale * 0.42 : node.r * scale * 0.5
                  const oy = (li - (n - 1) / 2) * lh
                  const fs = node.type === 'spoor' ? node.r * scale * 0.24 : node.r * scale * 0.27
                  return (
                    <text key={li} x={node.x} y={node.y + oy}
                      textAnchor="middle" dominantBaseline="middle"
                      fill={tekstKleur} fontSize={fs} fontWeight="600"
                      fontFamily="Inter, Arial, sans-serif"
                      style={{ pointerEvents: 'none', userSelect: 'none', transition: 'font-size 0.2s ease' }}>
                      {line}
                    </text>
                  )
                })}
              </g>
            )
          })}

          {NODES.filter(n => n.type === 'kern').map(node => {
            const isHov = hovered === node.id
            const isSelected = selected === node.id
            const scale = (isHov || isSelected) ? 1.08 : 1
            return (
              <g key={node.id} style={{ cursor: 'pointer' }}
                onClick={() => handleKlik(node.id)}
                onMouseEnter={() => handleHoverIn(node.id)}
                onMouseLeave={handleHoverUit}
              >
                <circle cx={node.x} cy={node.y} r={node.r * scale}
                  fill="url(#nvCenterGrad)"
                  stroke={isSelected ? '#E91E8C' : 'none'}
                  strokeWidth={isSelected ? 0.8 : 0}
                  style={{ transition: 'r 0.15s' }}/>
                <text x={node.x} y={node.y - 2} textAnchor="middle" fontSize="2.8" fontWeight="800"
                  fill="white" fontFamily="Inter, Arial, sans-serif" style={{ pointerEvents: 'none' }}>AI-</text>
                <text x={node.x} y={node.y + 2.2} textAnchor="middle" fontSize="2.8" fontWeight="800"
                  fill="white" fontFamily="Inter, Arial, sans-serif" style={{ pointerEvents: 'none' }}>Netwerk</text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Detail panel */}
      {(panelNode && activeNodeObj) ? (
        <div
          className={`${fullscreen ? 'w-72 flex-shrink-0' : 'lg:w-72'} rounded-2xl border p-5 flex flex-col ${
            fullscreen ? 'bg-white/10 border-white/20' : 'bg-white border-gray-100 shadow-sm'
          }`}
          onMouseEnter={handlePanelMouseEnter}
        >
          <div className="flex items-center gap-1.5 mb-3 text-xs font-medium">
            {selected
              ? <span className="text-nhl-roze">📌 Vastgezet</span>
              : <span className={fullscreen ? 'text-white/50' : 'text-gray-400'}>👁 Preview: klik de bol om vast te zetten</span>
            }
          </div>
          <PanelInhoud nodeId={panelNode} />
          <button
            onClick={() => { setSelected(null); setHovered(null) }}
            className={`mt-4 text-xs transition-colors block text-center ${
              fullscreen ? 'text-white/40 hover:text-white/70' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            ✕ Sluiten
          </button>
        </div>
      ) : fullscreen ? (
        <div className="w-64 flex-shrink-0 flex flex-col justify-center items-center text-center">
          <div className="text-4xl mb-3 opacity-40">👆</div>
          <div className="text-white/60 text-sm">Hover of klik op een knoop</div>
          <div className="text-white/30 text-xs mt-2">Intern: navigeert binnen het AI-Netwerk</div>
          <div className="text-white/30 text-xs mt-1">Extern ↗: opent in nieuw tabblad</div>
        </div>
      ) : null}
    </div>
  )
}
