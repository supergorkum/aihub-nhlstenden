import GradientHeader from '../components/GradientHeader'
import { useState } from 'react'
import { Link } from 'react-router-dom'
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

function DetailPanelInhoud({ nodeId }) {
  const node = NODES.find(n => n.id === nodeId)
  if (!node) return null

  const init = node.initId ? initiatieven.find(i => i.id === node.initId) : null
  const spoor = node.spoorId ? sporen.find(s => s.id === node.spoorId) : null
  const link = NODE_LINKS[nodeId]

  // Kern
  if (node.type === 'kern') {
    return (
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-nhl-blauw flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AI</div>
          <div className="font-bold text-nhl-blauw text-base leading-snug">AI-Netwerk NHL Stenden</div>
        </div>
        <p className="text-gray-500 text-xs leading-relaxed mb-5">
          De centrale verbindingsplek voor alles rond AI bij NHL Stenden. Zes thema's, vijf lagen, één kompas.
        </p>
        <Link to="/" className="block w-full text-center bg-nhl-blauw hover:bg-blue-900 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors">
          Naar de startpagina →
        </Link>
      </div>
    )
  }

  // Spoor
  if (spoor) {
    return (
      <div>
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Thema</div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: spoor.kleur + '20' }}>
            {spoor.icon}
          </div>
          <div className="font-bold text-nhl-blauw text-base leading-snug">{spoor.titel}</div>
        </div>
        {spoor.waarom && <p className="text-gray-600 text-xs leading-relaxed mb-3">{spoor.waarom}</p>}
        <div className="rounded-xl p-3 mb-4 border-l-2" style={{ borderColor: spoor.kleur, backgroundColor: spoor.kleur + '10' }}>
          <div className="text-xs font-semibold text-gray-400 mb-1">Kernambitie</div>
          <p className="text-xs text-gray-600 italic leading-relaxed">{KERNAMBITIES_KORT[spoor.id]}</p>
        </div>
        <Link
          to={link?.to || '/themas'}
          className="block w-full text-center text-white text-xs font-semibold py-2.5 rounded-xl transition-colors hover:opacity-90"
          style={{ backgroundColor: spoor.kleur }}
        >
          Naar {spoor.titel} →
        </Link>
      </div>
    )
  }

  // Initiatief of externe partner
  if (init) {
    const isExtern = node.type === 'extern'
    const externeUrl = link?.intern === false ? link.url : null

    return (
      <div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium mb-3 inline-block ${
          isExtern
            ? 'bg-green-100 text-green-700'
            : init.type === 'surf'
            ? 'bg-purple-100 text-purple-700'
            : 'bg-blue-100 text-nhl-blauw'
        }`}>
          {isExtern ? '🤝 Externe partner' : init.type === 'surf' ? '🌐 SURF' : '🏫 Intern initiatief'}
        </span>
        <div className="font-bold text-nhl-blauw mb-2 text-sm leading-snug">{init.naam}</div>
        <p className="text-gray-500 text-xs leading-relaxed mb-3">{init.omschrijving}</p>
        {init.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {init.tags.map(t => (
              <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
            ))}
          </div>
        )}
        <div className="space-y-2">
          {/* Externe bollen krijgen altijd de groene knop */}
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
          {/* Interne bollen krijgen de blauwe knop */}
          {!externeUrl && link?.intern && (
            <Link
              to={link.to}
              className="flex items-center justify-center gap-2 w-full bg-nhl-blauw hover:bg-blue-900 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
            >
              Bekijk in het AI-Netwerk →
            </Link>
          )}
        </div>
      </div>
    )
  }

  return null
}

export default function Netwerk() {
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)

  const panelNode = selected ?? hovered
  const activeForLinks = selected ?? hovered

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
    setHovered(nodeId)
  }

  const handleHoverUit = () => {
    setHovered(null)
  }

  const handlePanelMouseEnter = () => {
    if (hovered && !selected) {
      setSelected(hovered)
      setHovered(null)
    }
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="nhl-gradient-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-80 h-80 border border-white rounded-full"/>
          <div className="absolute -bottom-10 left-10 w-60 h-60 border border-white rounded-full"/>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 relative">
          <div className="section-label text-blue-300 mb-3">Netwerkorganisatie</div>
          <h1 className="text-4xl font-extrabold text-white mb-4">Het AI-Netwerk van NHL Stenden</h1>
          <p className="text-blue-100 text-lg leading-relaxed max-w-2xl mb-5">
            Zes thema's, vijf lagen, één centrum. Hover voor een preview, klik om vast te zetten en gebruik de knoppen om te navigeren.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Thema's", kleur: '#1E3A8A' },
              { label: 'Initiatieven', kleur: '#DBEAFE' },
              { label: 'Externe partners', kleur: '#D1FAE5' },
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

          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <svg viewBox="-14 -14 138 138" className="w-full" style={{ aspectRatio: '1/1' }}>
                <defs>
                  <radialGradient id="netCenterGrad" cx="40%" cy="35%">
                    <stop offset="0%" stopColor="#3B5FC0"/>
                    <stop offset="100%" stopColor="#1E3A8A"/>
                  </radialGradient>
                </defs>
                <circle cx="55" cy="55" r="24" fill="none" stroke="#E5E7EB" strokeWidth="0.4" strokeDasharray="3 3"/>
                <circle cx="55" cy="55" r="42" fill="none" stroke="#F3F4F6" strokeWidth="0.4"/>

                {LINKS.map(([vanId, naarId], i) => {
                  const van = getNode(vanId); const naar = getNode(naarId)
                  if (!van || !naar) return null
                  const isActief = activeForLinks && (vanId === activeForLinks || naarId === activeForLinks)
                  return (
                    <line key={i} x1={van.x} y1={van.y} x2={naar.x} y2={naar.y}
                      stroke={isActief ? '#E91E8C' : '#CBD5E1'}
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
                  const scale = isHov && !isSelected ? 1.2 : isSelected ? 1.1 : 1

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
                        style={{ transition: 'r 0.15s, fill 0.15s' }}/>
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
                            style={{ pointerEvents: 'none', userSelect: 'none' }}>
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
                        fill="url(#netCenterGrad)"
                        stroke={isSelected ? '#E91E8C' : 'none'}
                        strokeWidth={isSelected ? 0.8 : 0}
                        style={{ transition: 'r 0.15s' }}/>
                      <text x={node.x} y={node.y - 2} textAnchor="middle" fontSize="3.2" fontWeight="800"
                        fill="white" fontFamily="Inter, Arial, sans-serif" style={{ pointerEvents: 'none' }}>AI-</text>
                      <text x={node.x} y={node.y + 2.2} textAnchor="middle" fontSize="3.2" fontWeight="800"
                        fill="white" fontFamily="Inter, Arial, sans-serif" style={{ pointerEvents: 'none' }}>Netwerk</text>
                    </g>
                  )
                })}
              </svg>

              <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-400">
                  {selected
                    ? '📌 Vastgezet — klik de knop in het paneel om te navigeren'
                    : 'Hover voor preview. Klik om vast te zetten. Navigeer via de knoppen in het paneel.'
                  }
                </div>
                {selected && (
                  <button onClick={() => setSelected(null)} className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                    ✕ Sluiten
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div>
            <div
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24"
              onMouseEnter={handlePanelMouseEnter}
            >
              {!panelNode ? (
                <div className="text-center py-4">
                  <div className="text-3xl mb-3">🕸️</div>
                  <div className="font-semibold text-nhl-blauw mb-2 text-sm">Hover of klik op een knoop</div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">
                    Hover voor een snelle preview. Klik om vast te zetten. Gebruik daarna de knoppen in dit paneel om te navigeren.
                  </p>
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
              ) : (
                <div>
                  <div className="flex items-center gap-1.5 mb-3 text-xs font-medium">
                    {selected
                      ? <span className="text-nhl-roze">📌 Vastgezet</span>
                      : <span className="text-gray-400">👁 Preview — klik de bol om vast te zetten</span>
                    }
                  </div>
                  <DetailPanelInhoud nodeId={panelNode} />
                  <button
                    onClick={() => { setSelected(null); setHovered(null) }}
                    className="mt-4 text-xs text-gray-400 hover:text-gray-700 transition-colors block"
                  >
                    ✕ Sluiten
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="section-label mb-2">Externe partners</div>
          <h2 className="text-2xl font-bold text-nhl-blauw mb-6">NHL Stenden in het nationale AI-netwerk</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { naam: 'SURF AI-Hub', icon: '🤝', kleur: '#065F46', licht: '#D1FAE5', omschrijving: 'Samenwerkingsplatform voor AI in het Nederlandse hoger onderwijs. Veilige toegang tot modellen, kennisdeling en gezamenlijke pilots.', url: 'https://www.surf.nl/en/themes/artificial-intelligence/projects-and-collaborations/ai-hub', tags: ['Samenwerking', 'Modellen', 'Veiligheid'] },
              { naam: 'AI-Fabriek Groningen', icon: '🏭', kleur: '#7C3AED', licht: '#EDE9FE', omschrijving: 'Regionale soevereine rekenkracht. 200 miljoen euro nationaal groeifonds 2025. Strategisch alternatief voor Big Tech cloud.', url: 'https://www.nijbegun.nl/projecten/ai-fabriek/', url2: 'https://www.rijksoverheid.nl/actueel/nieuws/2025/06/27/nederland-zet-in-op-200-miljoen-euro-voor-aifabriek-in-groningen', tags: ['Infrastructuur', 'Soevereiniteit', 'Noord'] },
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
