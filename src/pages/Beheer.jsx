import { useState } from 'react'
import { initiatieven as initData, sporen, BEHEER_CODE } from '../data'
import CloudStatus from '../components/CloudStatus'
import { exportJSON, importJSON } from '../storage'
import PageHeader from '../components/PageHeader'

export default function Beheer({ berichten, setBerichten, extraInitiatieven, setExtraInitiatieven }) {
  const [code, setCode] = useState('')
  const [toegang, setToegang] = useState(false)
  const [fout, setFout] = useState('')
  const [cloudStatus, setCloudStatus] = useState('idle')
  const [actieveTab, setActieveTab] = useState('berichten')

  const login = () => {
    if (code === BEHEER_CODE) { setToegang(true); setFout('') }
    else setFout('Onjuiste code. Probeer opnieuw.')
  }

  const verwijderBericht = (id) => setBerichten(prev => prev.filter(b => b.id !== id))
  const verwijderInitiatief = (id) => setExtraInitiatieven(prev => prev.filter(i => i.id !== id))

  const handleExport = () => {
    setCloudStatus('saving')
    exportJSON({ berichten, extraInitiatieven, exportDatum: new Date().toISOString() }, `aihub-export-${Date.now()}.json`)
    setTimeout(() => setCloudStatus('saved'), 800)
  }

  const handleImport = async (file) => {
    try {
      const data = await importJSON(file)
      if (data.berichten) setBerichten(data.berichten)
      if (data.extraInitiatieven) setExtraInitiatieven(data.extraInitiatieven)
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
            <p className="text-gray-500 text-sm mt-1">Voer de beheercode in om verder te gaan.</p>
          </div>
          <input
            type="password"
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            placeholder="Beheercode..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-nhl-blauw"
          />
          {fout && <div className="text-red-500 text-xs mb-3">{fout}</div>}
          <button onClick={login} className="btn-primary w-full">Inloggen →</button>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'berichten', label: `Ingezonden (${berichten.length})` },
    { id: 'initiatieven', label: `Initiatieven (${extraInitiatieven.length})` },
    { id: 'data', label: 'Data beheer' },
  ]

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-start justify-between mb-8">
          <PageHeader label="Beheeromgeving" title="AI-HUB Beheer" subtitle="Beheer ingezonden bijdragen, initiatieven en data." />
          <div className="flex items-center gap-3">
            <CloudStatus status={cloudStatus} />
            <button onClick={() => setToegang(false)} className="btn-ghost text-xs">Uitloggen</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActieveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${actieveTab === tab.id ? 'border-nhl-blauw text-nhl-blauw' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Ingezonden berichten */}
        {actieveTab === 'berichten' && (
          <div>
            {berichten.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">📭</div>
                <div>Nog geen ingezonden bijdragen.</div>
              </div>
            ) : (
              <div className="space-y-3">
                {berichten.map(b => (
                  <div key={b.id} className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-semibold text-nhl-blauw text-sm">{b.titel || 'Zonder titel'}</span>
                          <span className="text-xs text-gray-400">·</span>
                          <span className="text-xs text-gray-400">{b.rol} · {b.datum}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{b.tekst}</p>
                        {b.url && <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-nhl-roze text-xs underline mt-1 block">🔗 {b.url}</a>}
                        {b.bestandNaam && <div className="text-nhl-blauw text-xs mt-1">📎 {b.bestandNaam}</div>}
                      </div>
                      <button onClick={() => verwijderBericht(b.id)} className="text-red-400 hover:text-red-600 text-sm flex-shrink-0">Verwijder</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Extra initiatieven */}
        {actieveTab === 'initiatieven' && (
          <div>
            {extraInitiatieven.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">📋</div>
                <div>Nog geen extra initiatieven aangemeld.</div>
              </div>
            ) : (
              <div className="space-y-3">
                {extraInitiatieven.map(i => (
                  <div key={i.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold text-nhl-blauw text-sm">{i.naam}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{i.omschrijving}</div>
                    </div>
                    <button onClick={() => verwijderInitiatief(i.id)} className="text-red-400 hover:text-red-600 text-sm flex-shrink-0">Verwijder</button>
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
              <p className="text-gray-500 text-sm mb-4">Download alle data als JSON bestand voor backup of overdracht.</p>
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
                  <div className="font-semibold text-amber-800 mb-1">Lokale opslag</div>
                  <p className="text-amber-700 text-sm">Data wordt nu lokaal in de browsersessie bewaard. Koppeling met Netlify Blobs voor permanente cloudopslag wordt in de volgende versie geactiveerd.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
