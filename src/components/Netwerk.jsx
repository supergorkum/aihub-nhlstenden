import { useState } from 'react'
import { initiatieven, sporen } from '../data'

const NODES = [
  // Kern
  { id: 'hub', label: 'AI-HUB', x: 50, y: 50, r: 52, kleur: '#003366', tekstKleur: 'white', type: 'kern' },
  // Sporen
  { id: 'spoor1', label: 'AI &\nOnderwijs', x: 20, y: 20, r: 36, kleur: '#1A5276', tekstKleur: 'white', type: 'spoor', spoorId: 1 },
  { id: 'spoor2', label: 'AI &\nOrganisatie', x: 80, y: 20, r: 36, kleur: '#00838F', tekstKleur: 'white', type: 'spoor', spoorId: 2 },
  { id: 'spoor3', label: 'AI &\nVerantw.', x: 80, y: 80, r: 36, kleur: '#E8721C', tekstKleur: 'white', type: 'spoor', spoorId: 3 },
  { id: 'spoor4', label: 'AI-\nGeletterdh.', x: 20, y: 80, r: 36, kleur: '#2874A6', tekstKleur: 'white', type: 'spoor', spoorId: 4 },
  // Initiatieven intern
  { id: 'init1', label: 'AI\nCompliance', x: 8, y: 45, r: 24, kleur: '#E8F4FD', tekstKleur: '#003366', type: 'init', initId: 1 },
  { id: 'init2', label: 'AI\nCoalitie', x: 35, y: 5, r: 24, kleur: '#E8F4FD', tekstKleur: '#003366', type: 'init', initId: 2 },
  { id: 'init3', label: 'Academie\nEducatie', x: 65, y: 5, r: 24, kleur: '#E8F4FD', tekstKleur: '#003366', type: 'init', initId: 3 },
  { id: 'init4', label: 'FCP\nData & AI', x: 93, y: 45, r: 24, kleur: '#E8F4FD', tekstKleur: '#003366', type: 'init', initId: 4 },
  { id: 'init5', label: 'BDB\nAI-cursus', x: 65, y: 95, r: 24, kleur: '#E8F4FD', tekstKleur: '#003366', type: 'init', initId: 5 },
  { id: 'init10', label: 'Sandbox\n(in ontwikk.)', x: 35, y: 95, r: 24, kleur: '#FEF9F0', tekstKleur: '#E8721C', type: 'init', initId: 10 },
  // Extern
  { id: 'ext6', label: 'SURF\nDenktank', x: 8, y: 15, r: 20, kleur: '#F0FFF4', tekstKleur: '#1A6B3C', type: 'extern', initId: 6 },
  { id: 'ext8', label: 'GPT-NL\nSURF', x: 92, y: 15, r: 20, kleur: '#F0FFF4', tekstKleur: '#1A6B3C', type: 'extern', initId: 8 },
  { id: 'ext9', label: 'AI-Fabriek\nGrng.', x: 92, y: 85, r: 20, kleur: '#F0FFF4', tekstKleur: '#1A6B3C', type: 'extern', initId: 9 },
  { id: 'ext7', label: 'NPULS', x: 8, y: 85, r: 20, kleur: '#F0FFF4', tekstKleur: '#1A6B3C', type: 'extern', initId: 7 },
]

const LINKS = [
  { van: 'hub', naar: 'spoor1' }, { van: 'hub', naar: 'spoor2' },
  { van: 'hub', naar: 'spoor3' }, { van: 'hub', naar: 'spoor4' },
  { van: 'spoor1', naar: 'init2' }, { van: 'spoor1', naar: 'init3' },
  { van: 'spoor2', naar: 'init4' }, { van: 'spoor3', naar: 'init1' },
  { van: 'spoor3', naar: 'init10' }, { van: 'spoor4', naar: 'init5' },
  { van: 'spoor1', naar: 'ext6' }, { van: 'spoor2', naar: 'ext8' },
  { van: 'spoor3', naar: 'ext9' }, { van: 'spoor4', naar: 'ext7' },
]

function getNode(id) { return NODES.find(n => n.id === id) }

export default function Netwerk() {
  const [hover, setHover] = useState(null)
  const [geselecteerd, setGeselecteerd] = useState(null)

  const actief = geselecteerd || hover
  const actiefNode = actief ? NODES.find(n => n.id === actief) : null
  const actiefInitiatief = actiefNode?.initId ? initiatieven.find(i => i.id === actiefNode.initId) : null
  const actiefSpoor = actiefNode?.spoorId ? sporen.find(s => s.id === actiefNode.spoorId) : null

  return (
    <section id="netwerk" className="py-20 bg-nhl-grijs-licht">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-nhl-oranje font-semibold text-sm uppercase tracking-wider">Netwerkorganisatie</span>
          <h2 className="text-3xl font-bold text-nhl-blauw mt-2 mb-4">Het AI-netwerk van NHL Stenden</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            De AI-HUB verbindt mensen en initiatieven over de hele organisatie. 
            Klik op een knoop in het netwerk om meer te ontdekken.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* SVG netwerk */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 aspect-square max-w-xl mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Links */}
                {LINKS.map((link, i) => {
                  const van = getNode(link.van)
                  const naar = getNode(link.naar)
                  const isActief = actief && (link.van === actief || link.naar === actief)
                  return (
                    <line
                      key={i}
                      x1={van.x} y1={van.y} x2={naar.x} y2={naar.y}
                      stroke={isActief ? '#003366' : '#D0D5DD'}
                      strokeWidth={isActief ? 0.8 : 0.4}
                      strokeDasharray={isActief ? 'none' : '2,1'}
                      className="transition-all duration-200"
                    />
                  )
                })}

                {/* Nodes */}
                {NODES.map(node => {
                  const isActief = actief === node.id
                  const isVerbonden = actief && LINKS.some(l =>
                    (l.van === actief && l.naar === node.id) ||
                    (l.naar === actief && l.van === node.id)
                  )
                  const opacity = actief && !isActief && !isVerbonden ? 0.3 : 1

                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer network-node"
                      style={{ opacity }}
                      onMouseEnter={() => setHover(node.id)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => setGeselecteerd(geselecteerd === node.id ? null : node.id)}
                    >
                      <circle
                        cx={node.x} cy={node.y} r={node.r / 10}
                        fill={node.kleur}
                        stroke={isActief ? '#E8721C' : 'transparent'}
                        strokeWidth="0.8"
                      />
                      {node.label.split('\n').map((line, i, arr) => (
                        <text
                          key={i}
                          x={node.x} y={node.y + (i - (arr.length - 1) / 2) * (node.r / 28)}
                          textAnchor="middle" dominantBaseline="middle"
                          fill={node.tekstKleur}
                          fontSize={node.r / 32}
                          fontWeight={node.type === 'kern' || node.type === 'spoor' ? 'bold' : 'normal'}
                          fontFamily="Arial, sans-serif"
                          style={{ pointerEvents: 'none' }}
                        >
                          {line}
                        </text>
                      ))}
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Legenda */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-nhl-blauw" />
                <span>Kern / Sporen</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-100 border border-nhl-blauw" />
                <span>Interne initiatieven</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-green-50 border border-green-600" />
                <span>Externe partners</span>
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-1">
            {actiefNode ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                {actiefNode.type === 'kern' && (
                  <div>
                    <div className="text-nhl-blauw font-bold text-xl mb-3">AI-HUB NHL Stenden</div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      De centrale verbindingsplek voor alles rond AI binnen NHL Stenden. 
                      Vier sporen, vijf lagen, één kompas.
                    </p>
                    <a href="#wat" className="text-nhl-teal text-sm underline">Meer over de AI-HUB →</a>
                  </div>
                )}
                {actiefSpoor && (
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Spoor</div>
                    <div className="font-bold text-nhl-blauw text-lg mb-3">{actiefSpoor.titel}</div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{actiefSpoor.waarom}</p>
                    <div className="space-y-1.5">
                      {actiefSpoor.themas.map(t => (
                        <div key={t} className="text-xs bg-nhl-grijs-licht rounded px-2 py-1 text-gray-700">{t}</div>
                      ))}
                    </div>
                  </div>
                )}
                {actiefInitiatief && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        actiefInitiatief.type === 'extern'
                          ? 'bg-green-100 text-green-700'
                          : actiefInitiatief.status === 'in-ontwikkeling'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-blue-100 text-nhl-blauw'
                      }`}>
                        {actiefInitiatief.type === 'extern' ? 'Externe partner' : actiefInitiatief.status === 'in-ontwikkeling' ? 'In ontwikkeling' : 'Actief'}
                      </div>
                    </div>
                    <div className="font-bold text-nhl-blauw text-lg mb-3">{actiefInitiatief.naam}</div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{actiefInitiatief.omschrijving}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {actiefInitiatief.tags.map(tag => (
                        <span key={tag} className="text-xs bg-nhl-grijs-licht text-gray-600 px-2 py-0.5 rounded">{tag}</span>
                      ))}
                    </div>
                    {actiefInitiatief.laag && (
                      <div className="text-xs text-gray-500">
                        Laag {actiefInitiatief.laag} · Spoor {actiefInitiatief.spoor}
                      </div>
                    )}
                  </div>
                )}
                <button
                  onClick={() => setGeselecteerd(null)}
                  className="mt-4 text-xs text-gray-400 hover:text-gray-600"
                >
                  ✕ Sluiten
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-4xl mb-3">👆</div>
                <div className="font-medium text-nhl-blauw mb-2">Klik op een knoop</div>
                <p className="text-gray-500 text-sm">
                  Klik op een initiatief, spoor of externe partner in het netwerk om meer te lezen.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100 text-left">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Snel navigeren</div>
                  <div className="space-y-2">
                    <a href="#initiatieven" className="block text-sm text-nhl-teal hover:underline">→ Alle initiatieven bekijken</a>
                    <a href="#meld" className="block text-sm text-nhl-teal hover:underline">→ Initiatief aanmelden</a>
                    <a href="#inspiratie" className="block text-sm text-nhl-teal hover:underline">→ Inzichten & vragen</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
