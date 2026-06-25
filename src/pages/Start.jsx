import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { initiatieven, sporen } from '../data'
import ImpactDashboard from '../components/ImpactDashboard'
import NetwerkVisualisatie from '../components/NetwerkVisualisatie'

const actieven = initiatieven.filter(i => i.status === 'actief').slice(0, 4)

// Inline initiatieven aanmeld modal
function InitiatiefModal({ onClose, onVerstuurd }) {
  const [form, setForm] = useState({
    naam: '', omschrijving: '', type: 'intern', spoor: '',
    status: 'in-ontwikkeling', contactNaam: '', ambities: [], impactInschatting: ''
  })
  const [verstuurd, setVerstuurd] = useState(false)
  const [extraInitiatieven, setExtraInitiatieven] = useState([])

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const voegToe = () => {
    if (!form.naam || !form.omschrijving) return
    setVerstuurd(true)
    if (onVerstuurd) onVerstuurd(form)
  }

  if (verstuurd) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center animate-slide-up">
          <div className="text-5xl mb-4">🚀</div>
          <h3 className="font-bold text-nhl-blauw text-xl mb-2">Initiatief aangemeld!</h3>
          <p className="text-gray-500 text-sm mb-6">Je initiatief is zichtbaar in het overzicht bij Initiatieven.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/initiatieven" onClick={onClose} className="btn-primary">Bekijk alle initiatieven →</Link>
            <button onClick={onClose} className="btn-ghost border border-gray-200">Sluiten</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
          <h2 className="font-bold text-nhl-blauw text-lg">Initiatief aanmelden</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Naam van het initiatief <span className="text-red-400">*</span></label>
            <input type="text" value={form.naam} onChange={e => upd('naam', e.target.value)}
              placeholder="Bijv. AI-feedback in schrijfonderwijs PABO"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Omschrijving <span className="text-red-400">*</span></label>
            <textarea value={form.omschrijving} onChange={e => upd('omschrijving', e.target.value)} rows={3}
              placeholder="Wat houdt het initiatief in? Wat is het doel?"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
              <div className="space-y-1.5">
                {[{ id: 'intern', label: '🏫 Intern' }, { id: 'extern', label: '🤝 Extern' }, { id: 'surf', label: '🌐 SURF' }].map(t => (
                  <button key={t.id} onClick={() => upd('type', t.id)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border-2 text-left font-medium transition-colors ${form.type === t.id ? 'border-nhl-blauw bg-blue-50 text-nhl-blauw' : 'border-gray-200 text-gray-600'}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Thema</label>
              <select value={form.spoor} onChange={e => upd('spoor', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw">
                <option value="">Kies...</option>
                {sporen.map(s => <option key={s.id} value={s.id}>{s.icon} {s.titel}</option>)}
              </select>
            </div>
          </div>

          {/* Ambitiekoppeling */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="font-semibold text-nhl-blauw text-sm mb-2">Koppel aan een bestuurlijke ambitie</div>
            <div className="flex flex-wrap gap-2 mb-3">
              {[{ id: 'studiesucces', label: '🎓 Studiesucces' }, { id: 'uitval', label: '📉 Minder uitval' }, { id: 'vertrek', label: '🔄 Voortijdig vertrek' }].map(a => {
                const actief = (form.ambities || []).includes(a.id)
                return (
                  <button key={a.id} onClick={() => {
                    const huidig = form.ambities || []
                    upd('ambities', actief ? huidig.filter(x => x !== a.id) : [...huidig, a.id])
                  }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-colors ${actief ? 'border-nhl-blauw bg-nhl-blauw text-white' : 'border-gray-200 text-gray-600'}`}>
                    {a.label}
                  </button>
                )
              })}
            </div>
            {(form.ambities || []).length > 0 && (
              <div className="flex gap-2">
                {['laag', 'gemiddeld', 'hoog'].map(n => (
                  <button key={n} onClick={() => upd('impactInschatting', n)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border-2 capitalize transition-colors ${form.impactInschatting === n ? 'border-nhl-roze bg-nhl-roze text-white' : 'border-gray-200 text-gray-600'}`}>
                    {n}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contactnaam (optioneel)</label>
            <input type="text" value={form.contactNaam} onChange={e => upd('contactNaam', e.target.value)}
              placeholder="Bijv. Jan de Vries of Projectteam"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
          </div>

          <button onClick={voegToe} disabled={!form.naam || !form.omschrijving}
            className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${form.naam && form.omschrijving ? 'bg-nhl-roze text-white hover:bg-nhl-roze-dark' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>
            Initiatief aanmelden →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Start({ videos = [], pilots = [], evenementen = [] }) {
  const alleInitiatieven = initiatieven
  const [initiatiefModalOpen, setInitiatiefModalOpen] = useState(false)
  const [netwerkFullscreen, setNetwerkFullscreen] = useState(false)

  const functies = [
    {
      icon: '👁️',
      titel: 'Zichtbaarheid',
      tekst: 'Wat is er al? Wie doet wat? Het AI-Netwerk maakt het AI-landschap van NHL Stenden inzichtelijk voor iedereen.',
      to: '/initiatieven',
      onClick: null,
    },
    {
      icon: '🔗',
      titel: 'Verbinding',
      tekst: 'Een levend netwerk van mensen, teams en initiatieven — binnen en buiten de instelling.',
      to: null,
      onClick: () => setNetwerkFullscreen(true),
    },
    {
      icon: '🧭',
      titel: 'Richting',
      tekst: 'Het AI Kompas als gedeeld kompas voor verantwoord AI-gebruik, gebaseerd op onze eigen waarden.',
      to: '/over',
      onClick: null,
    },
  ]

  return (
    <div className="min-h-screen pt-16">

      {/* Initiatieven modal */}
      {initiatiefModalOpen && (
        <InitiatiefModal
          onClose={() => setInitiatiefModalOpen(false)}
          onVerstuurd={() => {}}
        />
      )}

      {/* Netwerk fullscreen overlay */}
      {netwerkFullscreen && (
        <div className="fixed inset-0 z-50 bg-nhl-blauw flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
            <div>
              <div className="text-white font-bold text-lg">Het AI-Netwerk van NHL Stenden</div>
              <div className="text-blue-200 text-xs">Hover over een knoop om te verkennen · Klik om naar binnen te navigeren</div>
            </div>
            <button onClick={() => setNetwerkFullscreen(false)}
              className="text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl px-4 py-2 text-sm font-medium transition-colors">
              ✕ Sluiten
            </button>
          </div>
          <div className="flex-1 overflow-hidden p-4">
            <NetwerkVisualisatie fullscreen />
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="nhl-gradient-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-80 h-80 border border-white rounded-full" />
          <div className="absolute top-20 right-20 w-52 h-52 border border-white rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-96 h-96 border border-white rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-blue-100 text-xs px-3 py-1.5 rounded-full mb-6 border border-white/20">
                <span className="w-2 h-2 bg-nhl-roze rounded-full pulse-soft" />
                In ontwikkeling — versie 1.7 · Juni 2026
              </div>
              <div className="flex items-center gap-4 mb-4">
                <img src="/nhl-logo-transparent.png" alt="NHL Stenden" className="h-16 w-16 object-contain" />
                <div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">AI-Netwerk</h1>
                  <div className="text-nhl-roze-light font-semibold text-lg">NHL Stenden</div>
                </div>
              </div>
              <p className="text-blue-100 text-lg leading-relaxed mb-4 max-w-lg">
                De plek waar NHL Stenden alles rond AI samenbrengt: wat we doen, wie we zijn en hoe we het <strong className="text-white">verantwoord aanpakken</strong>.
              </p>
              <p className="text-blue-200 mb-8 max-w-lg">
                Of je nu docent, student, medewerker of bestuurder bent — hier vind je overzicht, verbinding en richting.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/themas" className="bg-white text-nhl-blauw hover:bg-blue-50 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                  Ontdek de thema's
                </Link>
                <Link to="/netwerk" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                  Bekijk het netwerk
                </Link>
                {/* Meld initiatief opent nu de modal */}
                <button
                  onClick={() => setInitiatiefModalOpen(true)}
                  className="bg-nhl-roze hover:bg-nhl-roze-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                  + Meld initiatief
                </button>
              </div>
            </div>
            <div className="grid gap-3">
              {functies.map(f => {
                const inner = (
                  <>
                    <div className="text-2xl flex-shrink-0">{f.icon}</div>
                    <div className="flex-1">
                      <div className="text-white font-bold mb-1 flex items-center justify-between">
                        {f.titel}
                        <span className="text-white/40 group-hover:text-white/80 transition-colors text-sm">
                          {f.onClick ? '⊕' : '→'}
                        </span>
                      </div>
                      <div className="text-blue-100 text-sm leading-relaxed">{f.tekst}</div>
                    </div>
                  </>
                )
                if (f.onClick) {
                  return (
                    <button key={f.titel} onClick={f.onClick}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 flex gap-4 hover:bg-white/20 hover:border-white/40 transition-all group text-left w-full">
                      {inner}
                    </button>
                  )
                }
                return (
                  <Link key={f.titel} to={f.to}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 flex gap-4 hover:bg-white/20 hover:border-white/40 transition-all group">
                    {inner}
                  </Link>
                )
              })}
              <div className="bg-nhl-roze/20 border border-nhl-roze/40 rounded-xl p-3 mt-1">
                <p className="text-white text-sm italic text-center">"AI bij NHL Stenden: slimmer leren, sterker werken en verantwoord innoveren."</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 72" fill="none" preserveAspectRatio="none" className="w-full block">
            <path d="M0 72L1440 72L1440 28C1320 60 1200 8 1080 20C960 32 840 64 720 52C600 40 480 4 360 16C240 28 120 60 0 40L0 72Z" fill="white"/>
            <path d="M0 72L1440 72L1440 40C1320 68 1200 20 1080 36C960 52 840 72 720 64C600 56 480 20 360 32C240 44 120 68 0 52L0 72Z" fill="white" fillOpacity="0.5"/>
          </svg>
        </div>
      </section>

      {/* Eerstvolgende evenement */}
      {(() => {
        const nu = new Date()
        const ev = evenementen.filter(e => new Date(`${e.datum}T${e.startTijd || '00:00'}`) >= nu).sort((a, b) => new Date(a.datum) - new Date(b.datum))[0]
        if (!ev) return null
        const d = new Date(ev.datum)
        const MAANDEN = ['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec']
        return (
          <Link to="/evenementen" className="block bg-nhl-blauw/5 hover:bg-nhl-blauw/10 border-b border-nhl-blauw/10 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
              <span className="text-sm">📅</span>
              <span className="text-xs text-nhl-blauw font-semibold uppercase tracking-wide flex-shrink-0">Volgend evenement</span>
              <span className="text-gray-300">·</span>
              <span className="text-sm font-medium text-nhl-blauw">{d.getDate()} {MAANDEN[d.getMonth()]} — {ev.naam}</span>
              {ev.startTijd && <span className="text-xs text-gray-500 hidden sm:inline">🕐 {ev.startTijd}</span>}
              {ev.locatie && <span className="text-xs text-gray-500 hidden md:inline">📍 {ev.locatie.split(',')[0]}</span>}
              <span className="ml-auto text-xs text-nhl-roze font-medium flex-shrink-0">Bekijken →</span>
            </div>
          </Link>
        )
      })()}

      {/* Snelle navigatie */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mb-2">Jouw ingang</div>
            <h2 className="text-2xl font-bold text-nhl-blauw">Waar wil je beginnen?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sporen.map(s => (
              <Link key={s.id} to={`/themas?spoor=${s.id}`} className="card card-hover p-5 group">
                <div className="text-2xl mb-3">{s.icon}</div>
                <div className="font-bold text-nhl-blauw mb-1 group-hover:text-nhl-roze transition-colors">{s.titel}</div>
                <div className="text-gray-500 text-sm leading-relaxed">{s.kort}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Actueel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="section-label mb-1">Wat loopt er</div>
              <h2 className="text-2xl font-bold text-nhl-blauw">Actuele initiatieven</h2>
            </div>
            <Link to="/initiatieven" className="btn-ghost text-nhl-blauw font-medium">Alle initiatieven →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {actieven.map(init => (
              <div key={init.id} className="card card-hover p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${init.type === 'extern' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-nhl-blauw'}`}>
                    {init.type === 'extern' ? 'Extern' : 'Intern'}
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Actief</span>
                </div>
                <div className="font-semibold text-nhl-blauw text-sm mb-2 leading-snug">{init.naam}</div>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{init.omschrijving}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact dashboard */}
      <ImpactDashboard pilots={pilots} initiatieven={alleInitiatieven} evenementen={evenementen} />

      {/* CTA strip */}
      <section className="py-12 nhl-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: '🚀', titel: 'Initiatief aanmelden', tekst: 'Werk jij aan iets rond AI?', label: 'Aanmelden', onClick: () => setInitiatiefModalOpen(true), to: null },
              { icon: '📁', titel: 'Documentatie', tekst: 'Presentaties, rapporten en materiaal.', label: 'Bekijken', to: '/documentatie', onClick: null },
              { icon: '💡', titel: 'Inspiratie', tekst: 'Vragen en ideeën van collega\'s.', label: 'Ontdekken', to: '/inspiratie', onClick: null },
            ].map(item => (
              <div key={item.titel} className="bg-white/10 border border-white/20 rounded-2xl p-6">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-white font-bold mb-1">{item.titel}</div>
                <div className="text-blue-200 text-sm mb-4">{item.tekst}</div>
                {item.onClick ? (
                  <button onClick={item.onClick} className="inline-block bg-white text-nhl-blauw hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    {item.label} →
                  </button>
                ) : (
                  <Link to={item.to} className="inline-block bg-white text-nhl-blauw hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    {item.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laatste nieuws */}
      {(videos.some(v => v.status === 'goedgekeurd') || pilots.length > 0 || evenementen.length > 0) && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="section-label mb-2">Vers van de pers</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-8">Het laatste uit het AI-Netwerk</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {(() => {
                const v = [...videos.filter(x => x.status === 'goedgekeurd')].sort((a, b) => b.id - a.id)[0]
                if (!v) return null
                return (
                  <Link to="/video" className="card card-hover overflow-hidden group">
                    <div className="relative">
                      <img src={`https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`} alt={v.titel} className="w-full aspect-video object-cover" onError={e => { e.target.style.background='#e5e7eb' }} />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center"><span className="text-nhl-blauw ml-0.5">▶</span></div>
                      </div>
                      <div className="absolute top-2 left-2 bg-nhl-roze text-white text-xs px-2 py-0.5 rounded-full font-medium">🎬 Laatste video</div>
                    </div>
                    <div className="p-4">
                      <div className="font-semibold text-nhl-blauw text-sm leading-snug mb-1">{v.titel}</div>
                      <div className="text-xs text-gray-400">{v.datum} · 👍 {v.omhoog}</div>
                    </div>
                  </Link>
                )
              })()}
              {(() => {
                const p = [...pilots].reverse()[0]
                if (!p) return null
                return (
                  <Link to="/pilots" className="card card-hover p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs bg-nhl-roze/10 text-nhl-roze px-2 py-0.5 rounded-full font-medium">🧪 {p.updates?.length > 0 ? 'Pilot update' : 'Nieuwe pilot'}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'Lopend' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
                    </div>
                    <div className="font-bold text-nhl-blauw mb-2 leading-snug">{p.naam}</div>
                    <div className="text-xs text-gray-500 mb-2">{p.academie} · {p.platform}</div>
                  </Link>
                )
              })()}
              {(() => {
                const ev = evenementen.filter(e => new Date(`${e.datum}T${e.startTijd}`) >= new Date()).sort((a, b) => new Date(a.datum) - new Date(b.datum))[0]
                if (!ev) return null
                const d = new Date(ev.datum)
                const MAANDEN = ['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec']
                return (
                  <Link to="/evenementen" className="card card-hover overflow-hidden flex flex-col">
                    <div className="flex items-stretch">
                      <div className="w-16 flex flex-col items-center justify-center py-4 text-white flex-shrink-0" style={{ backgroundColor: ev.kleur || '#1E3A8A' }}>
                        <div className="text-2xl font-extrabold leading-none">{d.getDate()}</div>
                        <div className="text-xs font-medium mt-0.5">{MAANDEN[d.getMonth()]}</div>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="text-xs text-nhl-roze font-medium mb-1">📅 Volgend evenement</div>
                        <div className="font-bold text-nhl-blauw text-sm leading-snug mb-1">{ev.naam}</div>
                        <div className="text-xs text-gray-500">🕐 {ev.startTijd} · 📍 {ev.locatie?.split(',')[0]}</div>
                      </div>
                    </div>
                  </Link>
                )
              })()}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
