import { useState } from 'react'
import { initiatieven as initData, sporen, lagen, BEHEER_CODE } from '../data'
import CloudStatus from '../components/CloudStatus'
import { exportJSON, importJSON } from '../storage'
import PageHeader from '../components/PageHeader'

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

export default function Beheer({ berichten, setBerichten, videos, setVideos, pilots, setPilots, docs, setDocs, inspiraties, setInspiraties }) {
  const [code, setCode] = useState('')
  const [toegang, setToegang] = useState(false)
  const [fout, setFout] = useState('')
  const [cloudStatus, setCloudStatus] = useState('idle')
  const [actieveTab, setActieveTab] = useState('initiatieven')
  const [alleInitiatieven, setAlleInitiatieven] = useState(initData)

  const login = () => {
    if (code === BEHEER_CODE) { setToegang(true); setFout('') }
    else setFout('Onjuiste code.')
  }

  const slaInitiatiefOp = (gewijzigd) => {
    setAlleInitiatieven(prev => prev.map(i => i.id === gewijzigd.id ? gewijzigd : i))
    setCloudStatus('saved'); setTimeout(() => setCloudStatus('idle'), 2000)
  }

  const handleExport = () => {
    setCloudStatus('saving')
    exportJSON({ alleInitiatieven, berichten, videos, pilots, docs, exportDatum: new Date().toISOString() }, `aihub-export-${Date.now()}.json`)
    setTimeout(() => setCloudStatus('saved'), 800)
  }

  const handleImport = async (file) => {
    try {
      const data = await importJSON(file)
      if (data.alleInitiatieven) setAlleInitiatieven(data.alleInitiatieven)
      if (data.berichten) setBerichten(data.berichten)
      if (data.videos) setVideos(data.videos)
      if (data.pilots) setPilots(data.pilots)
      if (data.docs) setDocs(data.docs)
      setCloudStatus('saved')
    } catch { setCloudStatus('error') }
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
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <PageHeader label="Beheer" title="AI-HUB Beheer" subtitle="Beheer alle content van de AI-HUB." />
          <div className="flex items-center gap-3">
            <CloudStatus status={cloudStatus} />
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
                        <button onClick={() => setVideos(prev => prev.map(x => x.id === v.id ? { ...x, status: 'goedgekeurd' } : x))}
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
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="text-2xl mb-3">📤</div>
              <h3 className="font-bold text-nhl-blauw mb-2">Exporteren</h3>
              <p className="text-gray-500 text-sm mb-4">Download alle data als JSON bestand.</p>
              <button onClick={handleExport} className="btn-primary w-full">Exporteer als JSON</button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="text-2xl mb-3">📥</div>
              <h3 className="font-bold text-nhl-blauw mb-2">Importeren</h3>
              <p className="text-gray-500 text-sm mb-4">Laad een eerder geëxporteerd JSON bestand in.</p>
              <label className="btn-primary w-full text-center cursor-pointer block">
                Selecteer JSON bestand
                <input type="file" accept=".json" className="hidden" onChange={e => handleImport(e.target.files[0])} />
              </label>
            </div>
            <div className="sm:col-span-2 bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <div className="font-semibold text-amber-800 mb-1">Sessie-opslag actief</div>
                  <p className="text-amber-700 text-sm">Data wordt bewaard zolang de browsertab open is. Gebruik export voor permanente opslag.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
