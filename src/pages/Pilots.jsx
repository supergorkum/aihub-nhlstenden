import GradientHeader from '../components/GradientHeader'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NHL_DIENSTEN, NHL_ACADEMIES, NHL_EXTERN } from '../initialData'
import { sporen, lagen } from '../data'

const PLATFORMS = ['ChatGPT / OpenAI', 'GPT-NL (SURF)', 'Microsoft Copilot', 'Google Gemini', 'Claude (Anthropic)', 'Mistral', 'LLaMA (Meta)', 'Eigen ontwikkeling', 'SURF AI-HUB', 'Anders']
const ACADEMIES = [...NHL_ACADEMIES, ...NHL_DIENSTEN, 'Anders']
const SURF_ONDERDELEN = ['Nee / niet van toepassing', 'SURF AI-HUB', 'GPT-NL', 'AI-Fabriek Groningen', 'SURF Denktank', 'NPULS', 'Anders SURF-onderdeel']
const PILOT_STAPPEN = ['Basis info', 'Platform & scope', 'Doelen & samenhang', 'Contact & start']

const STATUS_KLEUREN = {
  'In voorbereiding': 'bg-yellow-100 text-yellow-700',
  'Lopend': 'bg-green-100 text-green-700',
  'Afgerond': 'bg-blue-100 text-blue-700',
  'Gestopt': 'bg-red-100 text-red-600',
}

const INIT_PILOTS = [
  {
    id: 1,
    naam: 'AI-Feedback in Schrijfonderwijs',
    academie: 'Academie Educatie',
    platform: 'ChatGPT / OpenAI',
    status: 'Lopend',
    doel: 'Studenten krijgen automatische feedback op hun schrijfopdrachten met behulp van AI, waardoor de docent meer tijd heeft voor persoonlijke begeleiding.',
    bereiken: 'Betere schrijfvaardigheden studenten, hogere tevredenheid over feedback, tijdbesparing voor docenten.',
    spoor: 1, laag: 5,
    surf: 'Nee / niet van toepassing',
    trefwoorden: ['Feedback', 'Schrijven', 'Didactiek', 'Studenten'],
    contactNaam: 'Projectteam Academie Educatie',
    contactEmail: '',
    startDatum: '2026-09',
    updates: [
      { datum: '15 juni 2026', tekst: 'Eerste tests met drie docenten afgerond. Studenten reageren positief op de snelheid van feedback. Aandachtspunt: de feedback is soms te generiek.', auteur: 'Projectteam' },
    ],
  },
]

export default function Pilots({ pilots, setPilots }) {
  const navigate = useNavigate()
  const [addOpen, setAddOpen] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(null)
  const [detailOpen, setDetailOpen] = useState(null)
  const [stap, setStap] = useState(0)
  const [form, setForm] = useState({
    naam: '', academie: '', platform: '', status: 'In voorbereiding',
    doel: '', bereiken: '', aanpak: '', spoor: '', laag: '', surf: '',
    trefwoorden: [], contactNaam: '', contactEmail: '', startDatum: '', ambities: [], impactInschatting: null,
  })
  const [trefwoordInput, setTrefwoordInput] = useState('')
  const [updateTekst, setUpdateTekst] = useState('')
  const [updateAuteur, setUpdateAuteur] = useState('')
  const [updateBestand, setUpdateBestand] = useState(null)
  const [updateBestandData, setUpdateBestandData] = useState(null)
  const [fout, setFout] = useState('')
  const [toegevoegd, setToegevoegd] = useState(false)

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleUpdateBestand = (file) => {
    if (!file) return
    if (file.size > 20 * 1024 * 1024) { alert('Bestand mag maximaal 20 MB zijn.'); return }
    setUpdateBestand(file)
    const reader = new FileReader()
    reader.onload = (e) => setUpdateBestandData(e.target.result)
    reader.readAsDataURL(file)
  }

  const kanVolgende = () => {
    if (stap === 0) return form.naam && form.academie
    if (stap === 1) return form.platform
    if (stap === 2) return form.doel?.length > 20
    return true
  }

  const voegTrefwoordToe = (w) => {
    const woord = w.trim()
    if (!woord || form.trefwoorden.includes(woord)) return
    upd('trefwoorden', [...form.trefwoorden, woord])
    setTrefwoordInput('')
  }

  const verstuur = () => {
    const nieuw = {
      id: Date.now(), ...form,
      spoor: form.spoor ? parseInt(form.spoor) : null,
      laag: form.laag ? parseInt(form.laag) : null,
      updates: [],
      nieuw: true,
    }
    setPilots(prev => [nieuw, ...prev])
    setToegevoegd(true)
  }

  const voegUpdateToe = (pilotId) => {
    if (!updateTekst.trim()) return
    const update = {
      datum: new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }),
      tekst: updateTekst,
      auteur: updateAuteur || 'Anoniem',
      bestandNaam: updateBestand?.name || null,
      bestandData: updateBestandData || null,
    }
    setPilots(prev => prev.map(p => p.id === pilotId ? { ...p, updates: [...(p.updates || []), update] } : p))
    setUpdateTekst('')
    setUpdateAuteur('')
    setUpdateBestand(null)
    setUpdateBestandData(null)
    setUpdateOpen(null)
  }

  const spoorSuggesties = sporen.map(s => s.titel)

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <GradientHeader label="Praktijk & experiment" title="AI Pilots" subtitle="Overzicht van lopende en afgeronde AI-pilots binnen NHL Stenden." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Pilots grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {pilots.map(pilot => {
            const thema = sporen.find(s => s.id === pilot.spoor)
            const laag = lagen.find(l => l.nr === pilot.laag)
            return (
              <div key={pilot.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden card-hover flex flex-col">
                {/* Status balk */}
                <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_KLEUREN[pilot.status] || 'bg-gray-100 text-gray-600'}`}>
                    {pilot.status}
                  </span>
                  {pilot.nieuw && <span className="text-xs bg-nhl-roze/10 text-nhl-roze px-2 py-0.5 rounded-full font-medium">Nieuw</span>}
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-nhl-blauw text-base mb-1 leading-snug">{pilot.naam}</h3>
                  <div className="text-xs text-gray-500 mb-3">{pilot.academie} · {pilot.platform}</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{pilot.doel}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {thema && <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ backgroundColor: thema.kleur }}>{thema.icon} {thema.titel}</span>}
                    {laag && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Laag {laag.nr}</span>}
                    {(pilot.trefwoorden || []).slice(0, 2).map(t => <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>)}
                  </div>

                  {/* Ambitie badges */}
                  {(pilot.ambities || []).length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {(pilot.ambities || []).map(a => (
                        <span key={a} className="text-xs bg-nhl-blauw/10 text-nhl-blauw px-2 py-0.5 rounded-full font-medium">
                          {a === 'studiesucces' ? '🎓 Studiesucces' : a === 'uitval' ? '📉 Minder uitval' : '🔄 Voortijdig vertrek'}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Updates teller */}
                  {pilot.updates?.length > 0 && (
                    <div className="text-xs text-gray-400 mb-3">
                      {pilot.updates.length} update{pilot.updates.length !== 1 ? 's' : ''} · Laatste: {pilot.updates[pilot.updates.length - 1].datum}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button onClick={() => setDetailOpen(pilot.id)}
                      className="flex-1 text-xs border border-gray-200 text-nhl-blauw hover:bg-blue-50 py-2 rounded-xl font-medium transition-colors">
                      Meer info
                    </button>
                    <button onClick={() => { setUpdateOpen(pilot.id); setUpdateTekst(''); setUpdateAuteur('') }}
                      className="flex-1 text-xs bg-nhl-blauw text-white hover:bg-nhl-blauw-dark py-2 rounded-xl font-medium transition-colors">
                      + Update
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {pilots.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🧪</div>
            <div className="font-medium text-lg mb-2">Nog geen pilots aangemeld</div>
            <p className="text-sm mb-6">Doe jij een AI-pilot? Maak hem zichtbaar voor de organisatie.</p>
            <button onClick={() => setAddOpen(true)} className="btn-roze">+ Eerste pilot aanmelden</button>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {detailOpen && (() => {
        const pilot = pilots.find(p => p.id === detailOpen)
        if (!pilot) return null
        const thema = sporen.find(s => s.id === pilot.spoor)
        const laag = lagen.find(l => l.nr === pilot.laag)
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-hidden">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
              <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
                <div>
                  <h2 className="font-bold text-nhl-blauw text-xl">{pilot.naam}</h2>
                  <div className="text-sm text-gray-500 mt-0.5">{pilot.academie}</div>
                </div>
                <button onClick={() => setDetailOpen(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex flex-wrap gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_KLEUREN[pilot.status]}`}>{pilot.status}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{pilot.platform}</span>
                  {thema && <span className="text-xs px-2.5 py-1 rounded-full text-white font-medium" style={{ backgroundColor: thema.kleur }}>{thema.icon} {thema.titel}</span>}
                  {laag && <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">Laag {laag.nr}: {laag.naam}</span>}
                </div>

                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Doel van de pilot</div>
                  <p className="text-gray-700 text-sm leading-relaxed">{pilot.doel}</p>
                </div>
                {pilot.bereiken && (
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Wat willen we bereiken?</div>
                    <p className="text-gray-700 text-sm leading-relaxed">{pilot.bereiken}</p>
                  </div>
                )}
                {pilot.aanpak && (
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Aanpak</div>
                    <p className="text-gray-700 text-sm leading-relaxed">{pilot.aanpak}</p>
                  </div>
                )}
                {pilot.surf && pilot.surf !== 'Nee / niet van toepassing' && (
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
                    <div className="text-xs font-semibold text-purple-700 mb-1">🔗 SURF aansluiting</div>
                    <div className="text-sm text-purple-700">{pilot.surf}</div>
                  </div>
                )}
                {pilot.contactNaam && (
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Contact voor vragen</div>
                    <div className="text-sm text-gray-700 mb-3">{pilot.contactNaam}</div>
                    <button
                      onClick={() => navigate(`/meld?initiatief=${encodeURIComponent(pilot.naam)}`)}
                      className="inline-flex items-center gap-2 bg-nhl-blauw/5 hover:bg-nhl-blauw/10 border border-nhl-blauw/20 text-nhl-blauw text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                    >
                      ✉️ Neem contact op via de AI-HUB
                    </button>
                    <div className="text-xs text-gray-400 mt-1.5">De AI-HUB brengt je in contact met het team achter deze pilot.</div>
                  </div>
                )}
                {pilot.trefwoorden?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {pilot.trefwoorden.map(t => <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>)}
                  </div>
                )}

                {/* Updates */}
                {pilot.updates?.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Updates & voortgang</div>
                    <div className="space-y-3">
                      {[...pilot.updates].reverse().map((u, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-nhl-roze flex-shrink-0" />
                            <span className="text-xs font-medium text-gray-500">{u.datum} · {u.auteur}</span>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{u.tekst}</p>
                          {u.bestandData && (
                            <button
                              onClick={() => {
                                const a = document.createElement('a')
                                a.href = u.bestandData
                                a.download = u.bestandNaam || 'bijlage'
                                a.click()
                              }}
                              className="mt-2 inline-flex items-center gap-1.5 text-xs text-nhl-blauw hover:text-nhl-roze font-medium transition-colors"
                            >
                              📎 {u.bestandNaam} downloaden
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button onClick={() => { setDetailOpen(null); setUpdateOpen(pilot.id) }}
                  className="btn-roze w-full">+ Update toevoegen</button>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Update modal */}
      {updateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-nhl-blauw text-lg">Update toevoegen</h2>
              <button onClick={() => setUpdateOpen(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hoe verloopt de pilot? <span className="text-red-400">*</span></label>
                <textarea value={updateTekst} onChange={e => setUpdateTekst(e.target.value)} rows={4}
                  placeholder="Beschrijf de voortgang, resultaten, uitdagingen of inzichten..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bijlage <span className="text-gray-400 font-normal">(optioneel — bijv. rapport, meting, foto)</span></label>
                <div
                  onClick={() => document.getElementById('update-upload').click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); handleUpdateBestand(e.dataTransfer.files[0]) }}
                  className="border-2 border-dashed border-gray-100 rounded-xl p-4 text-center cursor-pointer hover:border-nhl-blauw hover:bg-blue-50 transition-colors"
                >
                  {updateBestand ? (
                    <div className="flex items-center gap-3 justify-center">
                      <span className="text-xl">{updateBestand.type.includes('pdf') ? '📄' : updateBestand.type.includes('image') ? '🖼️' : '📝'}</span>
                      <div className="text-left">
                        <div className="text-sm font-medium text-nhl-blauw">{updateBestand.name}</div>
                        <div className="text-xs text-gray-400">{(updateBestand.size / 1024).toFixed(0)} KB</div>
                      </div>
                      <button onClick={e => { e.stopPropagation(); setUpdateBestand(null); setUpdateBestandData(null) }}
                        className="text-gray-400 hover:text-red-500 ml-1">✕</button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400">
                      <span className="text-lg">📎</span> Klik of sleep bewijslast hierheen
                    </div>
                  )}
                </div>
                <input id="update-upload" type="file" className="hidden"
                  accept=".pdf,.doc,.docx,.pptx,.png,.jpg,.jpeg"
                  onChange={e => handleUpdateBestand(e.target.files[0])} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jouw naam (optioneel)</label>
                <input type="text" value={updateAuteur} onChange={e => setUpdateAuteur(e.target.value)}
                  placeholder="Bijv. Jan de Vries"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
              </div>
              <button onClick={() => voegUpdateToe(updateOpen)} disabled={!updateTekst.trim()}
                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${updateTekst.trim() ? 'bg-nhl-roze text-white hover:bg-nhl-roze-dark' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>
                Update plaatsen →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pilot aanmelden modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="font-bold text-nhl-blauw text-lg">Pilot aanmelden</h2>
              <button onClick={() => setAddOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
            </div>

            {toegevoegd ? (
              <div className="p-8 text-center">
                <div className="text-5xl mb-4">🧪</div>
                <h3 className="font-bold text-nhl-blauw text-xl mb-2">Pilot aangemeld!</h3>
                <p className="text-gray-600 text-sm mb-6">Je pilot is zichtbaar in het overzicht. Houd de voortgang bij via de update-functie.</p>
                <button onClick={() => setAddOpen(false)} className="btn-primary">Sluiten</button>
              </div>
            ) : (
              <div className="p-6">
                {/* Stappen */}
                <div className="flex items-center gap-1 mb-8 overflow-x-auto">
                  {PILOT_STAPPEN.map((s, i) => (
                    <div key={i} className="flex items-center gap-1 flex-shrink-0">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i < stap ? 'bg-nhl-roze text-white' : i === stap ? 'bg-nhl-blauw text-white' : 'bg-gray-100 text-gray-400'}`}>
                        {i < stap ? '✓' : i + 1}
                      </div>
                      <span className={`text-xs whitespace-nowrap ${i === stap ? 'text-nhl-blauw font-medium' : 'text-gray-400'}`}>{s}</span>
                      {i < PILOT_STAPPEN.length - 1 && <div className={`w-4 h-0.5 ${i < stap ? 'bg-nhl-roze' : 'bg-gray-200'}`} />}
                    </div>
                  ))}
                </div>

                {/* Stap 0: Basis info */}
                {stap === 0 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="font-bold text-nhl-blauw text-lg mb-4">Basisinformatie</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Naam van de pilot <span className="text-red-400">*</span></label>
                      <input type="text" value={form.naam} onChange={e => upd('naam', e.target.value)}
                        placeholder="Bijv. AI-feedback in schrijfonderwijs PABO"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Academie of Dienst <span className="text-red-400">*</span></label>
                      <select value={form.academie} onChange={e => upd('academie', e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw">
                        <option value="">Kies...</option>
                        {ACADEMIES.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.keys(STATUS_KLEUREN).map(s => (
                          <button key={s} onClick={() => upd('status', s)}
                            className={`px-3 py-2 rounded-xl text-xs border-2 font-medium transition-colors ${form.status === s ? 'border-nhl-blauw bg-blue-50 text-nhl-blauw' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Startdatum (bij benadering)</label>
                      <input type="month" value={form.startDatum} onChange={e => upd('startDatum', e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                    </div>
                  </div>
                )}

                {/* Stap 1: Platform & scope */}
                {stap === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="font-bold text-nhl-blauw text-lg mb-4">Platform & scope</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Welk AI-platform gebruik je? <span className="text-red-400">*</span></label>
                      <div className="grid grid-cols-2 gap-2">
                        {PLATFORMS.map(p => (
                          <button key={p} onClick={() => upd('platform', p)}
                            className={`px-3 py-2.5 rounded-xl text-xs border-2 text-left font-medium transition-colors ${form.platform === p ? 'border-nhl-blauw bg-blue-50 text-nhl-blauw' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Is de pilot aangesloten bij SURF?</label>
                      <select value={form.surf} onChange={e => upd('surf', e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw">
                        <option value="">Kies...</option>
                        {SURF_ONDERDELEN.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Gerelateerd thema</label>
                        <select value={form.spoor} onChange={e => upd('spoor', e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw">
                          <option value="">Kies...</option>
                          {sporen.map(s => <option key={s.id} value={s.id}>{s.icon} {s.titel}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Gerelateerde laag</label>
                        <select value={form.laag} onChange={e => upd('laag', e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw">
                          <option value="">Kies...</option>
                          {lagen.map(l => <option key={l.nr} value={l.nr}>Laag {l.nr}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stap 2: Doelen */}
                {stap === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="font-bold text-nhl-blauw text-lg mb-4">Doelen & aanpak</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Doel van de pilot <span className="text-red-400">*</span></label>
                      <textarea value={form.doel} onChange={e => upd('doel', e.target.value)} rows={4}
                        placeholder="Wat wil je uitproberen of onderzoeken met AI? Wees concreet."
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Wat wil je bereiken?</label>
                      <textarea value={form.bereiken} onChange={e => upd('bereiken', e.target.value)} rows={3}
                        placeholder="Welk resultaat of effect hoop je te zien? Bijv. hogere studentsatisfactie, tijdsbesparing, beter leerresultaat..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Aanpak (optioneel)</label>
                      <textarea value={form.aanpak} onChange={e => upd('aanpak', e.target.value)} rows={3}
                        placeholder="Hoe ga je de pilot uitvoeren? Aantal deelnemers, tijdsduur, meetmethode..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw resize-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Trefwoorden</label>
                      <div className="flex gap-2 mb-2">
                        <input type="text" value={trefwoordInput} onChange={e => setTrefwoordInput(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); voegTrefwoordToe(trefwoordInput) } }}
                          placeholder="Trefwoord + Enter"
                          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                        <button onClick={() => voegTrefwoordToe(trefwoordInput)} className="px-3 py-2 bg-nhl-blauw text-white rounded-lg text-xs">+</button>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {['AI', 'Onderwijs', 'Studenten', 'Feedback', 'Didactiek', 'Data', 'Innovatie', 'Toetsing'].filter(s => !form.trefwoorden.includes(s)).map(s => (
                          <button key={s} onClick={() => voegTrefwoordToe(s)}
                            className="px-2 py-0.5 text-xs border border-gray-200 text-gray-500 hover:border-nhl-blauw hover:text-nhl-blauw rounded-full bg-white transition-colors">
                            + {s}
                          </button>
                        ))}
                      </div>
                      {form.trefwoorden.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {form.trefwoorden.map(w => (
                            <span key={w} className="inline-flex items-center gap-1 bg-nhl-blauw text-white px-2 py-0.5 rounded-full text-xs">
                              {w} <button onClick={() => upd('trefwoorden', form.trefwoorden.filter(t => t !== w))} className="hover:text-red-200">✕</button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Stap 3: Contact & ambitie */}
                {stap === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="font-bold text-nhl-blauw text-lg mb-4">Contact & bestuurlijke ambitie</h3>

                    {/* Ambitie koppeling */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="font-semibold text-nhl-blauw text-sm mb-1">Koppel aan de bestuurlijke ambitie</div>
                      <p className="text-xs text-blue-700 mb-3">
                        Draagt jouw pilot bij aan studiesucces, minder uitval of minder voortijdig vertrek? Koppel dat hier zodat het zichtbaar wordt op het impact dashboard.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {[
                          { id: 'studiesucces', label: '🎓 Studiesucces' },
                          { id: 'uitval', label: '📉 Minder uitval' },
                          { id: 'vertrek', label: '🔄 Voortijdig vertrek' },
                        ].map(a => {
                          const actief = (form.ambities || []).includes(a.id)
                          return (
                            <button key={a.id} type="button"
                              onClick={() => {
                                const huidig = form.ambities || []
                                upd('ambities', actief ? huidig.filter(x => x !== a.id) : [...huidig, a.id])
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-colors ${actief ? 'border-nhl-blauw bg-nhl-blauw text-white' : 'border-gray-200 text-gray-600 hover:border-nhl-blauw'}`}>
                              {a.label}
                            </button>
                          )
                        })}
                      </div>
                      {(form.ambities || []).length > 0 && (
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1.5">Verwachte impact</label>
                          <div className="flex gap-2">
                            {['laag', 'gemiddeld', 'hoog'].map(niveau => (
                              <button key={niveau} type="button"
                                onClick={() => upd('impactInschatting', niveau)}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border-2 transition-colors capitalize ${form.impactInschatting === niveau ? 'border-nhl-roze bg-nhl-roze text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                                {niveau}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Jouw naam of teamaam</label>
                      <input type="text" value={form.contactNaam} onChange={e => upd('contactNaam', e.target.value)}
                        placeholder="Bijv. Jan de Vries of Projectteam Academie Educatie"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <p className="text-xs text-amber-700">
                        💡 Geen e-mailadres nodig. Geïnteresseerde collega's kunnen contact opnemen via de AI-HUB als tussenpersoon. Zo blijven persoonsgegevens buiten de app.
                      </p>
                    </div>

                    {/* Samenvatting */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Samenvatting pilot</div>
                      <div className="text-sm"><span className="font-medium text-gray-600">Naam:</span> <span className="text-gray-700">{form.naam}</span></div>
                      <div className="text-sm"><span className="font-medium text-gray-600">Academie:</span> <span className="text-gray-700">{form.academie}</span></div>
                      <div className="text-sm"><span className="font-medium text-gray-600">Platform:</span> <span className="text-gray-700">{form.platform}</span></div>
                      {form.spoor && <div className="text-sm"><span className="font-medium text-gray-600">Thema:</span> <span className="text-gray-700">{sporen.find(s => s.id === parseInt(form.spoor))?.titel}</span></div>}
                      {form.surf && form.surf !== 'Nee / niet van toepassing' && <div className="text-sm"><span className="font-medium text-gray-600">SURF:</span> <span className="text-gray-700">{form.surf}</span></div>}
                    </div>
                  </div>
                )}

                {fout && <div className="text-red-500 text-xs bg-red-50 p-3 rounded-lg mt-4">{fout}</div>}

                <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
                  {stap > 0 ? <button onClick={() => setStap(s => s - 1)} className="btn-ghost">← Terug</button> : <div />}
                  {stap < 3 ? (
                    <button onClick={() => setStap(s => s + 1)} disabled={!kanVolgende()}
                      className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${kanVolgende() ? 'bg-nhl-blauw text-white hover:bg-nhl-blauw-dark' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>
                      Volgende →
                    </button>
                  ) : (
                    <button onClick={verstuur} className="bg-nhl-roze text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-nhl-roze-dark transition-colors">
                      Pilot aanmelden →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
