import { useState, useCallback } from 'react'
import { initiatieven, sporen } from '../data'
import PageHeader from '../components/PageHeader'

const NODES = [
  { id: 'hub',    label: 'AI-HUB', sub: 'NHL Stenden', x: 50, y: 50, r: 6,   kleur: '#1E3A8A', type: 'kern' },
  { id: 's1',     label: 'AI & Onderwijs',           x: 25, y: 20, r: 4.5, kleur: '#1E3A8A', type: 'spoor', spoorId: 1 },
  { id: 's2',     label: 'AI & Organisatie',         x: 75, y: 20, r: 4.5, kleur: '#0F766E', type: 'spoor', spoorId: 2 },
  { id: 's3',     label: 'AI & Verantw.',            x: 75, y: 80, r: 4.5, kleur: '#E91E8C', type: 'spoor', spoorId: 3 },
  { id: 's4',     label: 'AI-Geletterdheid',         x: 25, y: 80, r: 4.5, kleur: '#7C3AED', type: 'spoor', spoorId: 4 },
  { id: 'i1',     label: 'AI Compliance',            x: 10, y: 50, r: 3,   kleur: '#DBEAFE', tekstKleur: '#1E3A8A', type: 'init', initId: 1 },
  { id: 'i2',     label: 'AI Coalitie',              x: 38, y: 5,  r: 3,   kleur: '#DBEAFE', tekstKleur: '#1E3A8A', type: 'init', initId: 2 },
  { id: 'i3',     label: 'Academie Educatie',        x: 62, y: 5,  r: 3,   kleur: '#DBEAFE', tekstKleur: '#1E3A8A', type: 'init', initId: 3 },
  { id: 'i4',     label: 'FCP Data & AI',            x: 92, y: 45, r: 3,   kleur: '#CCFBF1', tekstKleur: '#0F766E', type: 'init', initId: 4 },
  { id: 'i5',     label: 'BDB AI-cursus',            x: 62, y: 95, r: 3,   kleur: '#EDE9FE', tekstKleur: '#7C3AED', type: 'init', initId: 5 },
  { id: 'i10',    label: 'Sandbox',                  x: 38, y: 95, r: 3,   kleur: '#FCE7F3', tekstKleur: '#E91E8C', type: 'init', initId: 10 },
  { id: 'i11',    label: 'AI-Desk',                  x: 88, y: 68, r: 3,   kleur: '#FCE7F3', tekstKleur: '#E91E8C', type: 'init', initId: 11 },
  { id: 'e6',     label: 'SURF Denktank',            x: 8,  y: 18, r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 6 },
  { id: 'e8',     label: 'GPT-NL / SURF',           x: 92, y: 18, r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 8 },
  { id: 'e9',     label: 'AI-Fabriek Grng.',         x: 92, y: 82, r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 9 },
  { id: 'e7',     label: 'NPULS',                    x: 8,  y: 82, r: 2.8, kleur: '#D1FAE5', tekstKleur: '#065F46', type: 'extern', initId: 7 },
]

const LINKS = [
  ['hub','s1'],['hub','s2'],['hub','s3'],['hub','s4'],
  ['s1','i1'],['s1','i2'],['s1','i3'],['s2','i4'],
  ['s3','i1'],['s3','i10'],['s3','i11'],['s4','i5'],
  ['s1','e6'],['s2','e8'],['s3','e9'],['s4','e7'],
]

function getNode(id) { return NODES.find(n => n.id === id) }

export default function Netwerk() {
  const [selected, setSelected] = useState(null)

  const handleClick = useCallback((id) => {
    setSelected(prev => prev === id ? null : id)
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

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <PageHeader
          label="Netwerkorganisatie"
          title="Het AI-netwerk van NHL Stenden"
          subtitle="Klik op een knoop om meer te lezen over een initiatief, spoor of externe partner."
        />

        <div className="grid xl:grid-cols-4 gap-6">
          {/* SVG — paginabreed op xl */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <svg
                viewBox="0 0 100 100"
                className="w-full"
                style={{ aspectRatio: '4/3' }}
              >
                {/* Links */}
                {LINKS.map(([vanId, naarId], i) => {
                  const van = getNode(vanId)
                  const naar = getNode(naarId)
                  const isActief = selected && (vanId === selected || naarId === selected)
                  return (
                    <line
                      key={i}
                      x1={van.x} y1={van.y} x2={naar.x} y2={naar.y}
                      stroke={isActief ? '#E91E8C' : '#CBD5E1'}
                      strokeWidth={isActief ? 0.5 : 0.25}
                      strokeDasharray={isActief ? '' : '1.5,1'}
                    />
                  )
                })}

                {/* Nodes */}
                {NODES.map(node => {
                  const isSelected = selected === node.id
                  const isDimmed = selected && !isSelected && !verbonden.has(node.id)
                  const displayR = node.r

                  return (
                    <g
                      key={node.id}
                      onClick={() => handleClick(node.id)}
                      style={{
                        cursor: 'pointer',
                        opacity: isDimmed ? 0.25 : 1,
                        transition: 'opacity 0.2s ease',
                      }}
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={displayR}
                        fill={isSelected ? (node.kleur === '#DBEAFE' || node.kleur === '#D1FAE5' || node.kleur === '#EDE9FE' || node.kleur === '#CCFBF1' || node.kleur === '#FCE7F3' ? '#E91E8C' : node.kleur) : node.kleur}
                        stroke={isSelected ? '#E91E8C' : 'rgba(0,0,0,0.08)'}
                        strokeWidth={isSelected ? 0.6 : 0.2}
                      />
                      {/* Ring bij selected */}
                      {isSelected && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={displayR + 1}
                          fill="none"
                          stroke="#E91E8C"
                          strokeWidth="0.4"
                          strokeDasharray="1,0.5"
                          opacity="0.6"
                        />
                      )}
                      {node.label.split(' ').slice(0, 2).map((word, wi, arr) => (
                        <text
                          key={wi}
                          x={node.x}
                          y={node.y + (wi - (arr.length - 1) / 2) * (node.r * 0.55)}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill={isSelected ? 'white' : (node.tekstKleur || (node.type === 'kern' || node.type === 'spoor' ? 'white' : node.tekstKleur || '#1E3A8A'))}
                          fontSize={node.r * 0.38}
                          fontWeight={node.type === 'kern' || node.type === 'spoor' ? '700' : '500'}
                          fontFamily="Inter, Arial, sans-serif"
                          style={{ pointerEvents: 'none', userSelect: 'none' }}
                        >
                          {word}
                        </text>
                      ))}
                    </g>
                  )
                })}
              </svg>

              {/* Legenda */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-nhl-blauw" /><span>Kern & Sporen</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-100 border border-nhl-blauw" /><span>Interne initiatieven</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-100 border border-green-600" /><span>Externe partners</span></div>
                <div className="ml-auto text-gray-400">Klik op een knoop voor details</div>
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              {!sel ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">👆</div>
                  <div className="font-semibold text-nhl-blauw mb-2">Klik op een knoop</div>
                  <p className="text-gray-400 text-sm">Selecteer een initiatief, spoor of partner voor meer informatie.</p>
                </div>
              ) : sel.type === 'kern' ? (
                <div className="animate-fade-in">
                  <div className="font-bold text-nhl-blauw text-lg mb-3">AI-HUB NHL Stenden</div>
                  <p className="text-gray-600 text-sm leading-relaxed">De centrale verbindingsplek voor alles rond AI. Vier sporen, vijf lagen, één kompas.</p>
                </div>
              ) : selSpoor ? (
                <div className="animate-fade-in">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Spoor</div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{selSpoor.icon}</span>
                    <span className="font-bold text-nhl-blauw text-lg">{selSpoor.titel}</span>
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
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selInit.type === 'extern' ? 'bg-green-100 text-green-700' : selInit.status === 'in-ontwikkeling' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-nhl-blauw'}`}>
                      {selInit.type === 'extern' ? 'Externe partner' : selInit.status === 'in-ontwikkeling' ? 'In ontwikkeling' : 'Actief'}
                    </span>
                  </div>
                  <div className="font-bold text-nhl-blauw mb-2 leading-tight">{selInit.naam}</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{selInit.omschrijving}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {selInit.tags.map(t => (
                      <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                  {selInit.laag && <div className="text-xs text-gray-400">Laag {selInit.laag} · Spoor {selInit.spoor}</div>}
                </div>
              ) : null}

              {sel && (
                <button
                  onClick={() => setSelected(null)}
                  className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
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
