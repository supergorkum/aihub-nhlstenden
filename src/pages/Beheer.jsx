import { useState, useEffect, useCallback } from 'react'
import { initiatieven as initData, sporen, lagen, BEHEER_CODE } from '../data'
import { exportJSON, importJSON } from '../storage'

const NIEUWS_URL = '/.netlify/functions/nieuws-ophalen'
const REFRESH_KEY = 'aihub-laatste-refresh'

function NieuwsOphalen({ onNieuwItems }) {
  const [status, setStatus] = useState('idle')
  const [resultaat, setResultaat] = useState(null)
  const [tijdstip, setTijdstip] = useState(() => localStorage.getItem(REFRESH_KEY))

  const haalOp = async () => {
    setStatus('bezig')
    setResultaat(null)
    try {
      const res = await fetch(NIEUWS_URL, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Fout bij ophalen')
      const ts = new Date().toISOString()
      setResultaat(data)
      setTijdstip(ts)
      localStorage.setItem(REFRESH_KEY, ts)
      if (data.items?.length > 0) onNieuwItems(data.items)
      setStatus('klaar')
    } catch (err) {
      setResultaat({ fout: err.message })
      setStatus('fout')
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="nhl-gradient-deep px-6 py-5 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
            status === 'bezig' ? 'bg-yellow-300 animate-pulse' :
            status === 'klaar' ? 'bg-green-400' :
            status === 'fout' ? 'bg-red-400' : 'bg-gray-400'
          }`} />
          <div>
            <div className="text-white font-bold text-sm">🤖 Slim nieuws ophalen</div>
            <div className="text-blue-200 text-xs">
              {tijdstip
                ? `Laatste refresh: ${new Date(tijdstip).toLocaleString('nl-NL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`
                : 'Nog niet uitgevoerd in deze sessie'}
            </div>
          </div>
        </div>
        <button
          onClick={haalOp}
          disabled={status === 'bezig'}
          className="flex items-center gap-2 bg-white text-nhl-blauw hover:bg-blue-50 px-4 py-2 rounded-xl text-sm font-bold transition-colors disabled:opacity-50 flex-shrink-0"
        >
          {status === 'bezig' ? (
            <><span className="animate-spin inline-block">⟳</span> Bezig met ophalen...</>
          ) : (
            <>🔄 Nieuws ophalen</>
          )}
        </button>
      </div>

      {/* Uitleg */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <p className="text-sm text-gray-600">
          Haalt nieuws op van <strong>SURF</strong>, <strong>Rathenau Instituut</strong>, <strong>Europese Commissie</strong> en <strong>Rijksoverheid</strong>.
          De Anthropic AI beoordeelt elk artikel op relevantie voor NHL Stenden en schrijft een Nederlandse samenvatting.
          Relevante items worden direct toegevoegd aan <strong>Inspiratie</strong>.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Vereist: <code className="bg-gray-100 px-1 rounded">ANTHROPIC_API_KEY</code> als Netlify environment variable.
        </p>
      </div>

      {/* Resultaat */}
      {resultaat && (
        <div className="px-6 py-4">
          {status === 'klaar' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                <span>✓</span>
                <span>{resultaat.aantalNieuw} nieuwe relevante items toegevoegd aan Inspiratie</span>
              </div>
              {resultaat.fouten?.length > 0 && (
                <div className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                  ⚠️ Niet alle feeds konden worden bereikt: {resultaat.fouten.join(' · ')}
                </div>
              )}
              {resultaat.aantalNieuw === 0 && (
                <p className="text-sm text-gray-500">Geen nieuwe relevante items gevonden — alles is al actueel of de feeds bevatten niets nieuws voor NHL Stenden.</p>
              )}
              {resultaat.items?.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                  <span>{item.icon}</span>
                  <div>
                    <div className="font-medium text-nhl-blauw">{item.titel}</div>
                    <div className="text-gray-400">{item.naam} · {item.doelgroep}</div>
                  </div>
                </div>
              ))}
              {resultaat.items?.length > 3 && (
                <div className="text-xs text-gray-400">+{resultaat.items.length - 3} meer toegevoegd</div>
              )}
            </div>
          )}
          {status === 'fout' && (
            <div className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
              <div className="font-semibold mb-1">❌ Ophalen mislukt</div>
              <div className="text-xs">{resultaat.fout}</div>
              {resultaat.fout?.includes('API key') && (
                <div className="text-xs mt-2 text-gray-600">
                  Ga naar Netlify → Site settings → Environment variables → voeg <code className="bg-white px-1 rounded border">ANTHROPIC_API_KEY</code> toe.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const statusOpties = ['actief', 'groeiend', 'in-ontwikkeling']
const typeOpties = [
  { id: 'intern', label: 'Intern' },
  { id: 'extern', label: 'Extern' },
  { id: 'surf', label: 'SURF / Nationaal' },
]

function InitiatiefRij({ init, onSave, onDelete }) {
  const [bewerk, setBewerk] = useState(false)
  const [form, setForm] = useState({ ...init })
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  if (!bewerk) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-semibold text-nhl-blauw text-sm">{init.naam}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${init.status === 'actief' ? 'bg-green-100 text-green-700' : init.status === 'groeiend' ? 'bg-blue-100 text-nhl-blauw' : 'bg-orange-100 text-orange-700'}`}>{init.status}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${init.type === 'surf' ? 'bg-purple-100 text-purple-700' : init.type === 'extern' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-nhl-blauw'}`}>{init.type === 'surf' ? 'SURF' : init.type === 'extern' ? 'Extern' : 'Intern'}</span>
              {init.laag && <span className="text-xs text-gray-400">Laag {init.laag}</span>}
            </div>
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{init.omschrijving}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={() => setBewerk(true)} className="text-nhl-blauw hover:underline text-xs font-medium">Bewerk</button>
            <button onClick={() => onDelete(init.id)} className="text-red-400 hover:text-red-600 text-xs font-medium">Verwijder</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 rounded-xl border-2 border-nhl-blauw p-4">
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Naam</label>
          <input value={form.naam} onChange={e => upd('naam', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw bg-white" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
          <select value={form.status} onChange={e => upd('status', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw bg-white">
            {statusOpties.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
          <select value={form.type} onChange={e => upd('type', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw bg-white">
            {typeOpties.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Thema</label>
          <select value={form.spoor} onChange={e => upd('spoor', parseInt(e.target.value))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw bg-white">
            {sporen.map(s => <option key={s.id} value={s.id}>{s.icon} {s.titel}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Laag</label>
          <select value={form.laag || ''} onChange={e => upd('laag', e.target.value ? parseInt(e.target.value) : null)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw bg-white">
            <option value="">Geen</option>
            {lagen.map(l => <option key={l.nr} value={l.nr}>Laag {l.nr}: {l.naam}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Tags</label>
          <input value={Array.isArray(form.tags) ? form.tags.join(', ') : ''} onChange={e => upd('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw bg-white" />
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-600 mb-1">Omschrijving</label>
        <textarea value={form.omschrijving} onChange={e => upd('omschrijving', e.target.value)} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw bg-white resize-none" />
      </div>
      <div className="flex gap-2">
        <button onClick={() => { onSave(form); setBewerk(false) }} className="btn-primary text-xs px-4 py-2">Opslaan ✓</button>
        <button onClick={() => { setForm({ ...init }); setBewerk(false) }} className="btn-ghost text-xs border border-gray-200">Annuleren</button>
      </div>
    </div>
  )
}

const STORAGE_URL = '/.netlify/functions/storage'
const BACKUP_KEY = 'aihub-backup'

async function slaOpInCloud(data) {
  const payload = { ...data, backupDatum: new Date().toISOString() }
  const res = await fetch(STORAGE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: BACKUP_KEY, value: JSON.stringify(payload) }),
  })
  if (!res.ok) throw new Error('Opslaan mislukt')
  return payload.backupDatum
}

async function laadUitCloud() {
  const res = await fetch(`${STORAGE_URL}?key=${BACKUP_KEY}`)
  if (!res.ok) throw new Error('Laden mislukt')
  const { value } = await res.json()
  return value ? JSON.parse(value) : null
}

export default function Beheer({ berichten, setBerichten, videos, setVideos, actiefVideoId, setActiefVideoId, pilots, setPilots, docs, setDocs, inspiraties, setInspiraties }) {
  const [code, setCode] = useState('')
  const [toegang, setToegang] = useState(false)
  const [fout, setFout] = useState('')
  const [cloudStatus, setCloudStatus] = useState('idle') // idle | saving | saved | error
  const [cloudTijdstempel, setCloudTijdstempel] = useState(null)
  const [autoBackupActief, setAutoBackupActief] = useState(false)
  const [changelogOpen, setChangelogOpen] = useState(false)
  const [actieveTab, setActieveTab] = useState('initiatieven')
  const [alleInitiatieven, setAlleInitiatieven] = useState(initData)

  // Auto-backup uitvoeren
  const voerBackupUit = useCallback(async (data) => {
    try {
      setCloudStatus('saving')
      const ts = await slaOpInCloud(data)
      setCloudTijdstempel(ts)
      setCloudStatus('saved')
      setTimeout(() => setCloudStatus('idle'), 3000)
    } catch {
      setCloudStatus('error')
      setTimeout(() => setCloudStatus('idle'), 5000)
    }
  }, [])

  // Auto-backup schema: elke 15 minuten als ingelogd
  useEffect(() => {
    if (!toegang || !autoBackupActief) return
    const interval = setInterval(() => {
      voerBackupUit({ alleInitiatieven, berichten, videos, pilots, docs, inspiraties })
    }, 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [toegang, autoBackupActief, alleInitiatieven, berichten, videos, pilots, docs, inspiraties, voerBackupUit])

  const login = () => {
    if (code === BEHEER_CODE) { setToegang(true); setFout('') }
    else setFout('Onjuiste code.')
  }

  const slaInitiatiefOp = (gewijzigd) => {
    setAlleInitiatieven(prev => prev.map(i => i.id === gewijzigd.id ? gewijzigd : i))
  }

  const handleExport = () => {
    exportJSON({ alleInitiatieven, berichten, videos, pilots, docs, exportDatum: new Date().toISOString() }, `aihub-export-${Date.now()}.json`)
  }

  const handleImport = async (file) => {
    try {
      const data = await importJSON(file)
      if (data.alleInitiatieven) setAlleInitiatieven(data.alleInitiatieven)
      if (data.berichten) setBerichten(data.berichten)
      if (data.videos) setVideos(data.videos)
      if (data.pilots) setPilots(data.pilots)
      if (data.docs) setDocs(data.docs)
    } catch { alert('Import mislukt — controleer het bestand.') }
  }

  if (!toegang) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🔐</div>
            <h2 className="text-xl font-bold text-nhl-blauw">Beheeromgeving</h2>
            <p className="text-gray-500 text-sm mt-1">Voer de beheercode in.</p>
          </div>
          <input type="password" value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()}
            placeholder="Beheercode..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
          {fout && <div className="text-red-500 text-xs mb-3">{fout}</div>}
          <button onClick={login} className="btn-primary w-full">Inloggen</button>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'initiatieven', label: 'Initiatieven', n: alleInitiatieven.length },
    { id: 'berichten', label: 'Vragen & ideeën', n: berichten.length },
    { id: 'inspiraties', label: 'Inspiratie', n: (inspiraties || []).length },
    { id: 'video', label: "Video's", n: (videos || []).filter(v => v.status === 'wachtrij').length > 0 ? `${(videos || []).filter(v => v.status === 'wachtrij').length} wachtrij` : (videos || []).length },
    { id: 'pilots', label: 'Pilots', n: (pilots || []).length },
    { id: 'docs', label: 'Documenten', n: (docs || []).length },
    { id: 'data', label: 'Data', n: null },
  ]

  return (
    <>
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="text-nhl-roze font-semibold text-xs uppercase tracking-widest mb-1">Beheer</div>
            <h1 className="text-2xl font-bold text-nhl-blauw">AI-HUB Beheer</h1>
          </div>
          <div className="flex items-center gap-3 flex-wrap">

            {/* Cloud status lampje */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                cloudStatus === 'saving' ? 'bg-yellow-400 animate-pulse' :
                cloudStatus === 'saved' ? 'bg-green-500' :
                cloudStatus === 'error' ? 'bg-red-500' :
                autoBackupActief ? 'bg-blue-400 pulse-soft' : 'bg-gray-300'
              }`} />
              <span className="text-gray-600">
                {cloudStatus === 'saving' ? 'Backup bezig...' :
                 cloudStatus === 'saved' ? 'Opgeslagen ✓' :
                 cloudStatus === 'error' ? 'Fout bij backup' :
                 cloudTijdstempel
                   ? `Backup ${new Date(cloudTijdstempel).toLocaleString('nl-NL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`
                   : 'Geen backup'}
              </span>
            </div>

            {/* Auto-backup toggle */}
            <button
              onClick={() => setAutoBackupActief(v => !v)}
              className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border font-medium transition-colors ${
                autoBackupActief
                  ? 'bg-green-50 border-green-300 text-green-700'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
              title="Automatische backup elke 15 minuten"
            >
              <span>{autoBackupActief ? '⏱️' : '⏱️'}</span>
              Auto-backup {autoBackupActief ? 'aan' : 'uit'}
            </button>

            <button
              onClick={() => setChangelogOpen(true)}
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border bg-white border-gray-200 text-gray-500 hover:border-nhl-blauw hover:text-nhl-blauw transition-colors font-medium"
            >
              📋 Changelog
            </button>

            <button onClick={() => setToegang(false)} className="btn-ghost text-xs border border-gray-200">Uitloggen</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-gray-200 overflow-x-auto pb-px">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActieveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px whitespace-nowrap flex items-center gap-1.5 ${actieveTab === tab.id ? 'border-nhl-blauw text-nhl-blauw' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab.label}
              {tab.n !== null && <span className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full text-xs">{tab.n}</span>}
            </button>
          ))}
        </div>

        {/* Initiatieven */}
        {actieveTab === 'initiatieven' && (
          <div>
            <p className="text-sm text-gray-500 mb-4">Bewerk of verwijder initiatieven. Wijzigingen zijn direct zichtbaar.</p>
            <div className="space-y-3">
              {alleInitiatieven.map(init => (
                <InitiatiefRij key={init.id} init={init}
                  onSave={slaInitiatiefOp}
                  onDelete={(id) => { if (window.confirm('Verwijderen?')) setAlleInitiatieven(prev => prev.filter(i => i.id !== id)) }} />
              ))}
            </div>
          </div>
        )}

        {/* Berichten */}
        {actieveTab === 'berichten' && (
          <div>
            {berichten.length === 0 ? (
              <div className="text-center py-12 text-gray-400"><div className="text-4xl mb-3">📭</div><div>Nog geen berichten.</div></div>
            ) : (
              <div className="space-y-3">
                {berichten.map(b => (
                  <div key={b.id} className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-semibold text-nhl-blauw text-sm">{b.titel || 'Zonder titel'}</span>
                          <span className="text-xs text-gray-400">· {b.rol} · {b.datum}</span>
                          {b.categorieDef && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{b.categorieDef.icon} {b.categorieDef.label}</span>}
                        </div>
                        <p className="text-gray-600 text-sm">{b.tekst}</p>
                        {b.trefwoorden?.length > 0 && <div className="flex flex-wrap gap-1 mt-2">{b.trefwoorden.map(t => <span key={t} className="text-xs bg-blue-50 text-nhl-blauw px-2 py-0.5 rounded">{t}</span>)}</div>}
                        {b.url && <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-nhl-roze text-xs underline mt-1 block">🔗 {b.url}</a>}
                      </div>
                      <button onClick={() => setBerichten(prev => prev.filter(x => x.id !== b.id))} className="text-red-400 hover:text-red-600 text-xs flex-shrink-0">Verwijder</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Inspiraties */}
        {actieveTab === 'inspiraties' && (
          <div>
            {(inspiraties || []).length === 0 ? (
              <div className="text-center py-12 text-gray-400"><div className="text-4xl mb-3">💡</div><div>Nog geen inspiraties.</div></div>
            ) : (
              <div className="space-y-3">
                {(inspiraties || []).map(b => (
                  <div key={b.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-base">{b.icon}</span>
                        <span className="font-semibold text-nhl-blauw text-sm">{b.titel}</span>
                        <span className="text-xs text-gray-400">· {b.datum}</span>
                      </div>
                      <p className="text-gray-500 text-xs line-clamp-2">{b.tekst}</p>
                    </div>
                    <button onClick={() => setInspiraties(prev => prev.filter(x => x.id !== b.id))} className="text-red-400 hover:text-red-600 text-xs flex-shrink-0">Verwijder</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Video beheer */}
        {actieveTab === 'video' && (
          <div>
            {(videos || []).filter(v => v.status === 'wachtrij').length > 0 && (
              <div className="mb-6">
                <div className="font-semibold text-nhl-blauw mb-3 flex items-center gap-2">
                  <span className="bg-nhl-roze text-white text-xs px-2 py-0.5 rounded-full">{videos.filter(v => v.status === 'wachtrij').length}</span>
                  Wacht op goedkeuring
                </div>
                <div className="space-y-3">
                  {videos.filter(v => v.status === 'wachtrij').map(v => (
                    <div key={v.id} className="border border-orange-200 bg-orange-50 rounded-xl p-4">
                      <div className="font-medium text-nhl-blauw text-sm mb-1">{v.titel}</div>
                      <p className="text-gray-500 text-xs mb-3">{v.omschrijving}</p>
                      <div className="flex gap-2">
                        <button onClick={() => { setVideos(prev => prev.map(x => x.id === v.id ? { ...x, status: 'goedgekeurd' } : x)); if (setActiefVideoId) setActiefVideoId(v.id) }}
                          className="flex-1 bg-green-600 text-white text-xs py-2 rounded-lg font-medium">✓ Goedkeuren</button>
                        <button onClick={() => setVideos(prev => prev.filter(x => x.id !== v.id))}
                          className="flex-1 bg-red-100 text-red-600 text-xs py-2 rounded-lg font-medium">✕ Afwijzen</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="font-semibold text-gray-500 text-sm mb-3">Goedgekeurd ({(videos || []).filter(v => v.status === 'goedgekeurd').length})</div>
            <div className="space-y-2">
              {(videos || []).filter(v => v.status === 'goedgekeurd').map(v => (
                <div key={v.id} className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-nhl-blauw truncate">{v.titel}</div>
                    <div className="text-xs text-gray-400">👍 {v.omhoog} · {v.datum}</div>
                  </div>
                  <button onClick={() => setVideos(prev => prev.filter(x => x.id !== v.id))} className="text-red-400 hover:text-red-600 text-xs">Verwijder</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pilots */}
        {actieveTab === 'pilots' && (
          <div>
            {(pilots || []).length === 0 ? (
              <div className="text-center py-12 text-gray-400"><div className="text-4xl mb-3">🧪</div><div>Nog geen pilots.</div></div>
            ) : (
              <div className="space-y-3">
                {(pilots || []).map(p => (
                  <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-nhl-blauw text-sm">{p.naam}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'Lopend' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
                      </div>
                      <div className="text-xs text-gray-400">{p.academie} · {p.platform} · {p.updates?.length || 0} updates</div>
                    </div>
                    <button onClick={() => { if (window.confirm('Verwijderen?')) setPilots(prev => prev.filter(x => x.id !== p.id)) }} className="text-red-400 hover:text-red-600 text-xs flex-shrink-0">Verwijder</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Documenten */}
        {actieveTab === 'docs' && (
          <div>
            {(docs || []).length === 0 ? (
              <div className="text-center py-12 text-gray-400"><div className="text-4xl mb-3">📁</div><div>Nog geen documenten.</div></div>
            ) : (
              <div className="space-y-2">
                {(docs || []).map(d => (
                  <div key={d.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
                    <span className="text-2xl">{d.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-nhl-blauw text-sm">{d.titel}</div>
                      <div className="text-xs text-gray-400">{d.type?.toUpperCase()} · {d.datum}</div>
                    </div>
                    <button onClick={() => { if (window.confirm('Verwijderen?')) setDocs(prev => prev.filter(x => x.id !== d.id)) }} className="text-red-400 hover:text-red-600 text-xs">Verwijder</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Data beheer */}
        {actieveTab === 'data' && (
          <div className="space-y-6">

            {/* Cloud backup blok — prominent bovenaan */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="nhl-gradient-deep px-6 py-5">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 shadow-sm ${
                      cloudStatus === 'saving' ? 'bg-yellow-300 animate-pulse' :
                      cloudStatus === 'saved' ? 'bg-green-400' :
                      cloudStatus === 'error' ? 'bg-red-400' :
                      autoBackupActief ? 'bg-blue-300 pulse-soft' : 'bg-gray-400'
                    }`} />
                    <div>
                      <div className="text-white font-bold text-sm">Cloud opslag</div>
                      <div className="text-blue-200 text-xs">
                        {cloudTijdstempel
                          ? `Laatste backup: ${new Date(cloudTijdstempel).toLocaleString('nl-NL', { weekday: 'short', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}`
                          : 'Nog geen backup gemaakt in deze sessie'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setAutoBackupActief(v => !v)}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                        autoBackupActief
                          ? 'bg-green-400/20 border border-green-400/40 text-green-200 hover:bg-green-400/30'
                          : 'bg-white/10 border border-white/20 text-blue-200 hover:bg-white/20'
                      }`}
                    >
                      ⏱️ Auto {autoBackupActief ? 'AAN · elke 15 min' : 'UIT'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                {/* Backup knop */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">☁️</span>
                    <h3 className="font-bold text-nhl-blauw">Nu opslaan</h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">Sla de huidige staat van alle data op in Netlify Blobs. Blijft beschikbaar na herstart.</p>
                  <button
                    onClick={() => voerBackupUit({ alleInitiatieven, berichten, videos, pilots, docs, inspiraties })}
                    disabled={cloudStatus === 'saving'}
                    className="btn-primary w-full disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {cloudStatus === 'saving' ? (
                      <><span className="animate-spin">⟳</span> Bezig...</>
                    ) : cloudStatus === 'saved' ? (
                      <>✓ Opgeslagen</>
                    ) : (
                      <>☁ Sla op in cloud</>
                    )}
                  </button>
                </div>

                {/* Restore knop */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🔄</span>
                    <h3 className="font-bold text-nhl-blauw">Herstel uit cloud</h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">Laad de laatste cloud backup terug. Overschrijft de huidige sessie-data volledig.</p>
                  <button
                    onClick={async () => {
                      if (!window.confirm('Huidige data wordt overschreven met de cloud backup. Doorgaan?')) return
                      setCloudStatus('saving')
                      try {
                        const data = await laadUitCloud()
                        if (!data) { alert('Geen cloud backup gevonden.'); setCloudStatus('idle'); return }
                        if (data.alleInitiatieven) setAlleInitiatieven(data.alleInitiatieven)
                        if (data.berichten) setBerichten(data.berichten)
                        if (data.videos) setVideos(data.videos)
                        if (data.pilots) setPilots(data.pilots)
                        if (data.docs) setDocs(data.docs)
                        if (data.inspiraties) setInspiraties(data.inspiraties)
                        if (data.backupDatum) setCloudTijdstempel(data.backupDatum)
                        setCloudStatus('saved')
                        setTimeout(() => setCloudStatus('idle'), 3000)
                      } catch { setCloudStatus('error'); setTimeout(() => setCloudStatus('idle'), 5000) }
                    }}
                    disabled={cloudStatus === 'saving'}
                    className="w-full py-2.5 rounded-xl font-semibold text-sm border-2 border-nhl-blauw text-nhl-blauw hover:bg-blue-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {cloudStatus === 'saving' ? <><span className="animate-spin">⟳</span> Laden...</> : <>🔄 Herstel backup</>}
                  </button>
                </div>
              </div>
            </div>

            {/* Nieuws ophalen met AI */}
            <NieuwsOphalen onNieuwItems={(items) => {
              setInspiraties(prev => {
                const nieuweIds = new Set(prev.map(i => i.titel))
                const gefilterd = items.filter(i => !nieuweIds.has(i.titel))
                return [...gefilterd, ...prev]
              })
            }} />

            {/* JSON export / import */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📤</span>
                  <h3 className="font-bold text-nhl-blauw">Exporteren</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4">Download alle data als JSON bestand voor lokale backup.</p>
                <button onClick={handleExport} className="btn-primary w-full">Exporteer als JSON</button>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📥</span>
                  <h3 className="font-bold text-nhl-blauw">Importeren</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4">Laad een eerder geëxporteerd JSON bestand in.</p>
                <label className="btn-primary w-full text-center cursor-pointer block">
                  Selecteer JSON bestand
                  <input type="file" accept=".json" className="hidden" onChange={e => handleImport(e.target.files[0])} />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Changelog modal */}
    {changelogOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
            <div>
              <h2 className="font-bold text-nhl-blauw text-lg">📋 Changelog</h2>
              <p className="text-xs text-gray-400 mt-0.5">Versiehistorie van de AI-HUB</p>
            </div>
            <button onClick={() => setChangelogOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
          </div>
          <div className="p-6 space-y-6">
            {[
              {
                versie: 'v1.2', datum: 'Juni 2026',
                label: 'Huidige versie', labelKleur: 'bg-green-100 text-green-700',
                items: [
                  'Impact dashboard op startpagina — drie meters voor studiesucces, uitval en voortijdig vertrek',
                  'Contact via AI-HUB knop op pilots — geen e-mailadressen in de app',
                  'Ambities koppelen bij aanmelden van een pilot of initiatief',
                  'NHL Stenden logo verwerkt in navigatiebalk en footer',
                  'Volledige gradient headers op alle pagina\'s',
                  'Dropdown navigatiemenu met vier groepen alfabetisch geordend',
                  'Cloud backup met auto-schema, lampje en tijdstempel in beheer',
                  'Changelog toegevoegd aan beheeromgeving',
                ],
              },
              {
                versie: 'v1.1', datum: 'Juni 2026', label: null,
                items: [
                  'Video pagina met YouTube-integratie, stemmen en beheer',
                  'Evenementenagenda met filtering op thema',
                  'Bronnen (linkjes) pagina',
                  'Pilots pagina met voortgang-updates',
                  'Inspiratie pagina met stemfunctie en masonry grid',
                  'Fundament pagina met vijflagenmodel',
                  'Over pagina',
                  'Bestandsupload in documentatie',
                  'Beheeromgeving met tabs voor alle content',
                ],
              },
              {
                versie: 'v1.0', datum: 'Mei 2026', label: null,
                items: [
                  'Eerste versie AI-HUB gelanceerd',
                  'Startpagina met hero, thema\'s en actuele initiatieven',
                  'Netwerk visualisatie — interactief knopendiagram',
                  'Thema\'s pagina — vier sporen',
                  'Initiatieven overzicht',
                  'Vragen & ideeën formulier',
                  'Documentatie pagina',
                  'Netlify deployment en GitHub koppeling',
                ],
              },
            ].map(v => (
              <div key={v.versie}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-bold text-nhl-blauw text-base">{v.versie}</span>
                  {v.label && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${v.labelKleur}`}>{v.label}</span>}
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400 flex-shrink-0">{v.datum}</span>
                </div>
                <ul className="space-y-1.5">
                  {v.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-nhl-roze mt-0.5 flex-shrink-0">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </>
  )
}
