import GradientHeader from '../components/GradientHeader'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { initiatieven, sporen } from '../data'

const statusConfig = {
  actief:            { label: 'Actief',          kleur: 'bg-green-100 text-green-700' },
  groeiend:          { label: 'Groeiend',        kleur: 'bg-blue-100 text-nhl-blauw' },
  'in-ontwikkeling': { label: 'In ontwikkeling', kleur: 'bg-orange-100 text-orange-700' },
}

const AI_ACT_ITEMS = [
  { id: 'aa1', artikel: 'Art. 4', titel: 'AI-geletterdheid voor medewerkers', omschrijving: 'Aanbieders en gebruikers van AI-systemen moeten redelijke maatregelen nemen om te zorgen voor voldoende AI-kennis bij medewerkers die met AI werken.', prioriteit: 'hoog', deadline: 'Augustus 2025 (van kracht)', link: 'https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX%3A32024R1689', status: 'lopend', gekoppeldAan: [5, 2] },
  { id: 'aa2', artikel: 'Art. 9 & 10', titel: 'Risicobeheer hoog-risico AI-systemen', omschrijving: 'Voor hoog-risico AI-systemen (bijv. toetsbewaking, selectiesystemen) gelden verplichtingen rond risicoanalyse, datakwaliteit en menselijk toezicht.', prioriteit: 'hoog', deadline: 'Augustus 2026', link: 'https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX%3A32024R1689', status: 'te-starten', gekoppeldAan: [1] },
  { id: 'aa3', artikel: 'Art. 13 & 14', titel: 'Transparantie en menselijk toezicht', omschrijving: 'Gebruikers van AI-systemen moeten begrijpen hoe het systeem werkt en er moet altijd een mens zijn die kan ingrijpen.', prioriteit: 'hoog', deadline: 'Augustus 2026', link: 'https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX%3A32024R1689', status: 'te-starten', gekoppeldAan: [1, 11] },
  { id: 'aa4', artikel: 'Art. 50', titel: 'Transparantie bij AI-gegenereerde content', omschrijving: 'AI-systemen die tekst, beeld of audio genereren moeten dit duidelijk aangeven.', prioriteit: 'midden', deadline: 'Augustus 2026', link: 'https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX%3A32024R1689', status: 'te-starten', gekoppeldAan: [] },
  { id: 'aa5', artikel: 'Art. 26', titel: 'Verplichtingen voor gebruikers van hoog-risico AI', omschrijving: 'NHL Stenden als gebruiker van hoog-risico AI heeft eigen verplichtingen: instructies opvolgen, gebruik monitoren, medewerkers trainen.', prioriteit: 'hoog', deadline: 'Augustus 2026', link: 'https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX%3A32024R1689', status: 'te-starten', gekoppeldAan: [1] },
  { id: 'aa6', artikel: 'Art. 70', titel: 'Registratie hoog-risico AI-systemen', omschrijving: 'Hoog-risico AI-systemen die door NHL Stenden worden ingezet moeten worden geregistreerd in de EU-database.', prioriteit: 'midden', deadline: 'Augustus 2026', link: 'https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX%3A32024R1689', status: 'te-starten', gekoppeldAan: [1] },
  { id: 'aa7', titel: 'Verbod op onacceptabele AI-toepassingen', artikel: 'Art. 5', omschrijving: 'Bepaalde AI-toepassingen zijn verboden: sociale scoring, realtime biometrische surveillance, manipulatie van mensen.', prioriteit: 'hoog', deadline: 'Februari 2025 (van kracht)', link: 'https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX%3A32024R1689', status: 'te-controleren', gekoppeldAan: [1] },
]

const PRIORITEIT_KLEUR = {
  hoog:   'bg-red-50 text-red-700 border-red-200',
  midden: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  laag:   'bg-green-50 text-green-700 border-green-200',
}

const ROADMAP_STATUS = {
  lopend:            { label: 'Lopend',           kleur: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  'in-ontwikkeling': { label: 'In voorbereiding', kleur: 'bg-blue-100 text-nhl-blauw',  dot: 'bg-blue-500' },
  'te-starten':      { label: 'Nog te starten',   kleur: 'bg-orange-100 text-orange-700', dot: 'bg-orange-400' },
  'te-controleren':  { label: 'Te controleren',   kleur: 'bg-red-100 text-red-700',    dot: 'bg-red-500' },
  afgerond:          { label: 'Afgerond ✓',       kleur: 'bg-gray-100 text-gray-500',  dot: 'bg-gray-400' },
}

// Cyclus stopt bij lopend — afgerond gaat via beheerder
const STATUS_CYCLUS = ['te-starten', 'in-ontwikkeling', 'lopend']

export default function Initiatieven({ roadmap, setRoadmap }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [actieveTab, setActieveTab] = useState(() => {
    const urlTab = new URLSearchParams(location.search).get('tab')
    return urlTab || 'initiatieven'
  })

  useEffect(() => {
    const urlTab = new URLSearchParams(location.search).get('tab')
    if (urlTab) setActieveTab(urlTab)
  }, [location.search])

  const [filterSpoor, setFilterSpoor] = useState(null)
  const [filterType, setFilterType] = useState(null)
  const [zoek, setZoek] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [toegevoegd, setToegevoegd] = useState(false)
  const [form, setForm] = useState({ titel: '', omschrijving: '', prioriteit: 'hoog', verantwoordelijke: '', datum: '', naam: '' })
  const [actieveAiAct, setActieveAiAct] = useState(null)
  const [initAddOpen, setInitAddOpen] = useState(false)
  const [initToegevoegd, setInitToegevoegd] = useState(false)
  const [extraInitiatieven, setExtraInitiatieven] = useState([])
  const [initForm, setInitForm] = useState({ naam: '', omschrijving: '', type: 'intern', spoor: '', status: 'in-ontwikkeling', contactNaam: '' })
  const [afgerondIngeklapt, setAfgerondIngeklapt] = useState(false)

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const alleInitiatieven = [...extraInitiatieven, ...initiatieven]
  const gefilterd = alleInitiatieven.filter(i => {
    if (filterSpoor && i.spoor !== filterSpoor) return false
    if (filterType && i.type !== filterType) return false
    if (zoek && !i.naam.toLowerCase().includes(zoek.toLowerCase()) && !i.omschrijving.toLowerCase().includes(zoek.toLowerCase())) return false
    return true
  })

  const voegToe = () => {
    if (!form.titel) return
    setRoadmap(prev => [{
      id: Date.now(),
      ...form,
      status: 'te-starten',
      aiActKoppeling: null,
      toegevoegdDoor: form.naam || 'Anoniem',
      pendingAfgerond: false,
      pendingReopen: false,
    }, ...prev])
    setToegevoegd(true)
  }

  // Klik statusknop: cyclus of aanvraag afgerond
  const wisselStatus = (id) => {
    setRoadmap(prev => prev.map(item => {
      if (item.id !== id) return item
      if (item.pendingAfgerond || item.pendingReopen) return item // geblokkeerd
      if (item.status === 'afgerond') return item // al definitief afgerond

      const huidig = STATUS_CYCLUS.indexOf(item.status)

      // Lopend is de laatste stap → volgende klik = afgerond aanvragen
      if (item.status === 'lopend') {
        return { ...item, pendingAfgerond: true, pendingDatum: new Date().toISOString() }
      }
      // Normale doorstap in cyclus
      return { ...item, status: STATUS_CYCLUS[huidig + 1] }
    }))
  }

  // Re-open knop: verzoek indienen bij beheerder
  const vraagReopen = (id) => {
    setRoadmap(prev => prev.map(item =>
      item.id === id
        ? { ...item, pendingReopen: true, pendingReopenDatum: new Date().toISOString() }
        : item
    ))
  }

  const switchTab = (tabId) => {
    setActieveTab(tabId)
    navigate(`/initiatieven?tab=${tabId}`, { replace: true })
  }

  const afgerondItems = (roadmap || []).filter(r => r.status === 'afgerond' && !r.pendingReopen)
  const actieveItems = (roadmap || []).filter(r => r.status !== 'afgerond' || r.pendingReopen)
  const aantalPendingAfgerond = (roadmap || []).filter(r => r.pendingAfgerond && r.status !== 'afgerond').length
  const aantalPendingReopen = (roadmap || []).filter(r => r.pendingReopen).length
  const aantalTeStarten = (roadmap || []).filter(r => r.status === 'te-starten' || r.status === 'te-controleren').length
  const aantalLopend = (roadmap || []).filter(r => r.status === 'lopend' || r.status === 'in-ontwikkeling').length

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <GradientHeader
        label="Wat loopt er"
        title="Initiatieven & Roadmap"
        subtitle="Overzicht van alle AI-initiatieven bij NHL Stenden — wat loopt er, wat moet er nog starten, en hoe verhouden we ons tot de AI Act."
      />

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'initiatieven', label: '🚀 Initiatieven', n: alleInitiatieven.length },
              { id: 'roadmap', label: '🗺️ Roadmap', n: (roadmap || []).length },
              { id: 'aiact', label: '⚖️ AI Act compliance', n: AI_ACT_ITEMS.filter(a => a.status === 'te-starten').length + ' open' },
            ].map(tab => (
              <button key={tab.id} onClick={() => switchTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap -mb-px ${
                  actieveTab === tab.id ? 'border-nhl-blauw text-nhl-blauw' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}>
                {tab.label}
                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">{tab.n}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* TAB: INITIATIEVEN */}
        {actieveTab === 'initiatieven' && (
          <div>
            {/* Toevoegen knop */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                Ken jij een AI-initiatief dat hier nog niet tussen staat? Voeg het toe en maak het zichtbaar.
              </p>
              <button
                onClick={() => { setInitAddOpen(true); setInitToegevoegd(false); setInitForm({ naam: '', omschrijving: '', type: 'intern', spoor: '', status: 'in-ontwikkeling', contactNaam: '' }) }}
                className="btn-roze text-sm flex-shrink-0 ml-4">
                + Initiatief aanmelden
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
              <input type="text" value={zoek} onChange={e => setZoek(e.target.value)}
                placeholder="Zoek op naam of omschrijving..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
              <div className="flex flex-wrap gap-2 mb-3">
                <button onClick={() => setFilterSpoor(null)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!filterSpoor ? 'bg-nhl-blauw text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}>Alle thema's</button>
                {sporen.map(s => (
                  <button key={s.id} onClick={() => setFilterSpoor(filterSpoor === s.id ? null : s.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filterSpoor === s.id ? 'text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
                    style={filterSpoor === s.id ? { backgroundColor: s.kleur } : {}}>
                    {s.icon} {s.titel}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {[{ id: null, label: 'Alle types' }, { id: 'intern', label: '🏫 Intern' }, { id: 'extern', label: '🤝 Extern' }, { id: 'surf', label: '🌐 SURF/Nationaal' }].map(t => (
                  <button key={t.id} onClick={() => setFilterType(t.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filterType === t.id ? 'bg-nhl-blauw text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-400 mb-4">{gefilterd.length} initiatief{gefilterd.length !== 1 ? 'en' : ''} gevonden</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gefilterd.map(init => {
                const spoor = sporen.find(s => s.id === init.spoor)
                const sc = statusConfig[init.status]
                return (
                  <div key={init.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col card-hover">
                    <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
                      <div className="flex gap-1.5 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sc?.kleur}`}>{sc?.label}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${init.type === 'surf' ? 'bg-purple-100 text-purple-700' : init.type === 'extern' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-nhl-blauw'}`}>
                          {init.type === 'surf' ? '🌐 SURF' : init.type === 'extern' ? '🤝 Extern' : '🏫 Intern'}
                        </span>
                        {init.nieuw && <span className="text-xs bg-nhl-roze/10 text-nhl-roze px-2 py-0.5 rounded-full font-medium">Nieuw</span>}
                      </div>
                    </div>
                    <div className="font-bold text-nhl-blauw mb-2 leading-snug">{init.naam}</div>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-3">{init.omschrijving}</p>
                    {(init.ambities || []).length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {init.ambities.map(a => (
                          <span key={a} className="text-xs bg-nhl-blauw/10 text-nhl-blauw px-2 py-0.5 rounded-full">
                            {a === 'studiesucces' ? '🎓' : a === 'uitval' ? '📉' : '🔄'} {a}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-gray-100">
                      {spoor && <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ backgroundColor: spoor.kleur }}>{spoor.icon} {spoor.titel}</span>}
                      {init.tags?.map(t => <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB: ROADMAP */}
        {actieveTab === 'roadmap' && (
          <div>
            {/* Tellers */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Lopend of in voorbereiding', n: aantalLopend, kleur: 'text-green-600', bg: 'bg-green-50 border-green-200' },
                { label: 'Nog te starten', n: aantalTeStarten, kleur: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' },
                { label: 'Afgerond', n: afgerondItems.length, kleur: 'text-gray-500', bg: 'bg-gray-50 border-gray-200' },
              ].map(s => (
                <div key={s.label} className={`rounded-2xl border p-5 ${s.bg}`}>
                  <div className={`text-3xl font-extrabold ${s.kleur}`}>{s.n}</div>
                  <div className="text-sm text-gray-600 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Uitleg */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🗺️</div>
                <div>
                  <h3 className="font-bold text-nhl-blauw mb-1">Wat is deze roadmap?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Deze roadmap toont wat NHL Stenden moet organiseren op het gebied van AI-compliance en -beleid.
                    Klik op de statusknop om voortgang bij te werken. Afgeronde items verschijnen bovenaan als apart overzicht.
                    Een beheerder bevestigt afgerond of re-open verzoeken definitief.
                  </p>
                </div>
              </div>
            </div>

            {/* ── AFGEROND BLOK BOVENAAN ── */}
            {afgerondItems.length > 0 && (
              <div className="mb-8">
                <button
                  onClick={() => setAfgerondIngeklapt(!afgerondIngeklapt)}
                  className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition-colors rounded-2xl px-5 py-4 mb-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">✅</span>
                    <div className="text-left">
                      <div className="font-bold text-gray-700">Afgerond ({afgerondItems.length})</div>
                      <div className="text-xs text-gray-500">Definitief bevestigd door beheerder</div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">{afgerondIngeklapt ? '▼ Toon' : '▲ Verberg'}</span>
                </button>

                {!afgerondIngeklapt && (
                  <div className="space-y-3">
                    {afgerondItems.map(item => {
                      const aiAct = AI_ACT_ITEMS.find(a => a.id === item.aiActKoppeling)
                      const isPendingReopen = item.pendingReopen
                      return (
                        <div key={item.id} className={`rounded-2xl border p-5 ${isPendingReopen ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                          <div className="flex items-start gap-4 flex-wrap">
                            {/* Grijs vinkje — niet klikbaar */}
                            <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-gray-400 border-gray-400 flex items-center justify-center">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                {isPendingReopen ? (
                                  <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    Re-open aangevraagd — wacht op beheerder
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 text-gray-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                    Afgerond ✓
                                  </div>
                                )}
                                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${PRIORITEIT_KLEUR[item.prioriteit]}`}>
                                  {item.prioriteit === 'hoog' ? '🔴' : item.prioriteit === 'midden' ? '🟡' : '🟢'} {item.prioriteit}
                                </span>
                                {item.datum && <span className="text-xs text-gray-400">📅 {item.datum}</span>}
                              </div>
                              <div className="font-bold text-gray-500 line-through mb-1">{item.titel}</div>
                              <p className="text-gray-400 text-sm leading-relaxed">{item.omschrijving}</p>
                              {item.verantwoordelijke && (
                                <div className="text-xs text-gray-400 mt-1">Verantwoordelijk: {item.verantwoordelijke}</div>
                              )}

                              {/* Re-open knop — alleen als niet al pending */}
                              {!isPendingReopen && (
                                <button
                                  onClick={() => vraagReopen(item.id)}
                                  className="mt-3 inline-flex items-center gap-1.5 text-xs bg-white border border-gray-300 text-gray-600 hover:border-nhl-blauw hover:text-nhl-blauw px-3 py-1.5 rounded-lg font-medium transition-colors"
                                >
                                  ↩ Re-open aanvragen
                                </button>
                              )}
                              {isPendingReopen && (
                                <p className="text-xs text-blue-600 italic mt-2">
                                  Re-open aangevraagd op {new Date(item.pendingReopenDatum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })} — een beheerder beoordeelt dit.
                                </p>
                              )}
                            </div>
                            {aiAct && (
                              <div className="flex-shrink-0 bg-gray-100 border border-gray-200 rounded-xl p-3 max-w-48">
                                <div className="text-xs font-bold text-gray-400 mb-1">⚖️ AI Act</div>
                                <div className="text-xs font-semibold text-gray-500">{aiAct.artikel}</div>
                                <div className="text-xs text-gray-400 leading-snug mt-0.5">{aiAct.titel}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Wachtrij meldingen */}
            {(aantalPendingAfgerond > 0 || aantalPendingReopen > 0) && (
              <div className="space-y-2 mb-6">
                {aantalPendingAfgerond > 0 && (
                  <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-center gap-3">
                    <span className="text-lg">⏳</span>
                    <div className="text-sm">
                      <span className="font-semibold text-amber-800">{aantalPendingAfgerond} item{aantalPendingAfgerond !== 1 ? 's' : ''} wacht{aantalPendingAfgerond === 1 ? '' : 'en'} op bevestiging afgerond door een beheerder.</span>
                    </div>
                  </div>
                )}
                {aantalPendingReopen > 0 && (
                  <div className="bg-blue-50 border border-blue-300 rounded-2xl p-4 flex items-center gap-3">
                    <span className="text-lg">↩</span>
                    <div className="text-sm">
                      <span className="font-semibold text-blue-800">{aantalPendingReopen} item{aantalPendingReopen !== 1 ? 's' : ''} wacht{aantalPendingReopen === 1 ? '' : 'en'} op goedkeuring re-open door een beheerder.</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Header actieve items */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-nhl-blauw text-lg">Actieve items</h2>
              <button onClick={() => { setAddOpen(true); setToegevoegd(false); setForm({ titel:'', omschrijving:'', prioriteit:'hoog', verantwoordelijke:'', datum:'', naam:'' }) }}
                className="btn-roze text-sm">+ Item toevoegen</button>
            </div>

            {/* Actieve roadmap items */}
            <div className="space-y-3">
              {actieveItems.map(item => {
                const s = ROADMAP_STATUS[item.status] || ROADMAP_STATUS['te-starten']
                const aiAct = AI_ACT_ITEMS.find(a => a.id === item.aiActKoppeling)
                const isPendingAfgerond = item.pendingAfgerond && item.status !== 'afgerond'
                const isPendingReopen = item.pendingReopen

                return (
                  <div key={item.id} className={`rounded-2xl border p-5 transition-all ${
                    isPendingAfgerond ? 'bg-amber-50 border-amber-300' :
                    isPendingReopen ? 'bg-blue-50 border-blue-200' :
                    'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-start gap-4 flex-wrap">

                      {/* Statusknop */}
                      <button
                        onClick={() => wisselStatus(item.id)}
                        title={
                          isPendingAfgerond ? 'Wacht op bevestiging beheerder' :
                          isPendingReopen ? 'Re-open in behandeling' :
                          item.status === 'lopend' ? 'Klik om afgerond aan te vragen' :
                          'Klik om status door te zetten'
                        }
                        disabled={isPendingAfgerond || isPendingReopen}
                        className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isPendingAfgerond ? 'bg-amber-400 border-amber-400 cursor-not-allowed' :
                          isPendingReopen ? 'bg-blue-400 border-blue-400 cursor-not-allowed' :
                          item.status === 'lopend' ? 'border-green-500 bg-green-50 hover:bg-green-100 cursor-pointer' :
                          item.status === 'in-ontwikkeling' ? 'border-blue-500 bg-blue-50 hover:bg-blue-100 cursor-pointer' :
                          'border-gray-300 bg-white hover:border-orange-400 hover:bg-orange-50 cursor-pointer'
                        }`}
                      >
                        {isPendingAfgerond && <span className="text-white text-xs">⏳</span>}
                        {isPendingReopen && <span className="text-white text-xs">↩</span>}
                        {!isPendingAfgerond && !isPendingReopen && item.status === 'lopend' && <span className="text-green-600 text-xs">▶</span>}
                        {!isPendingAfgerond && !isPendingReopen && item.status === 'in-ontwikkeling' && <span className="text-blue-500 text-xs">…</span>}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {isPendingAfgerond ? (
                            <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium bg-amber-100 text-amber-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              Wacht op bevestiging afgerond
                            </div>
                          ) : isPendingReopen ? (
                            <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              Re-open in behandeling
                            </div>
                          ) : (
                            <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${s.kleur}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                              {s.label}
                            </div>
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${PRIORITEIT_KLEUR[item.prioriteit]}`}>
                            {item.prioriteit === 'hoog' ? '🔴' : item.prioriteit === 'midden' ? '🟡' : '🟢'} {item.prioriteit}
                          </span>
                          {item.datum && <span className="text-xs text-gray-400">📅 {item.datum}</span>}
                        </div>
                        <div className="font-bold text-nhl-blauw mb-1">{item.titel}</div>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.omschrijving}</p>
                        {item.verantwoordelijke && (
                          <div className="text-xs text-gray-400 mt-2">Verantwoordelijk: {item.verantwoordelijke}</div>
                        )}
                        {isPendingAfgerond && (
                          <p className="text-xs text-amber-600 mt-2 italic">
                            Aangevraagd op {new Date(item.pendingDatum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })} — een beheerder bevestigt of zet dit terug.
                          </p>
                        )}
                      </div>

                      {aiAct && !isPendingAfgerond && !isPendingReopen && (
                        <div className="flex-shrink-0 bg-blue-50 border border-blue-200 rounded-xl p-3 max-w-48">
                          <div className="text-xs font-bold text-nhl-blauw mb-1">⚖️ AI Act</div>
                          <div className="text-xs font-semibold text-gray-700">{aiAct.artikel}</div>
                          <div className="text-xs text-gray-500 leading-snug mt-0.5">{aiAct.titel}</div>
                          <a href={aiAct.link} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-nhl-roze hover:underline mt-1 block">Lees artikel →</a>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB: AI ACT */}
        {actieveTab === 'aiact' && (
          <div>
            <div className="nhl-gradient-deep rounded-2xl p-8 mb-8 text-white">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">Europese regelgeving</div>
                  <h2 className="text-2xl font-extrabold mb-4">De AI Act — wat betekent het voor NHL Stenden?</h2>
                  <p className="text-blue-100 leading-relaxed mb-4">De EU AI Act (Verordening 2024/1689) is de eerste uitgebreide wet ter wereld die AI-systemen reguleert. Ze is in augustus 2024 in werking getreden en wordt gefaseerd van kracht.</p>
                  <p className="text-blue-100 leading-relaxed mb-6">Als hogeschool is NHL Stenden zowel <strong className="text-white">gebruiker</strong> van AI-systemen als <strong className="text-white">ontwikkelaar</strong> van pilots en tools. Beide rollen brengen verplichtingen met zich mee.</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX%3A32024R1689" target="_blank" rel="noopener noreferrer" className="bg-white text-nhl-blauw hover:bg-blue-50 px-4 py-2 rounded-xl text-sm font-bold transition-colors">📄 Lees de AI Act →</a>
                    <a href="https://www.rijksoverheid.nl/onderwerpen/kunstmatige-intelligentie-ai/ai-act" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors">🇳🇱 Rijksoverheid</a>
                    <a href="https://www.surf.nl/ai-act" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors">🌐 SURF</a>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { fase: 'Feb 2025', wat: 'Verbod op onacceptabele AI (art. 5)', kleur: 'bg-red-500' },
                    { fase: 'Aug 2025', wat: 'AI-geletterdheid verplicht (art. 4)', kleur: 'bg-orange-400' },
                    { fase: 'Aug 2026', wat: 'Verplichtingen hoog-risico AI (art. 9–26)', kleur: 'bg-yellow-400' },
                    { fase: 'Aug 2027', wat: 'Alle overige bepalingen volledig van kracht', kleur: 'bg-green-400' },
                  ].map(f => (
                    <div key={f.fase} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${f.kleur}`} />
                      <span className="text-xs font-bold text-blue-200 flex-shrink-0 w-20">{f.fase}</span>
                      <span className="text-sm text-white">{f.wat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
              <h3 className="font-bold text-nhl-blauw text-lg mb-4">Risicoclassificatie: vier niveaus</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { level: 'Onaanvaardbaar', kleur: '#DC2626', bg: '#FEF2F2', voorbeeld: 'Sociale scoring, biometrische surveillance', actie: 'Verboden. Niet inzetten.' },
                  { level: 'Hoog risico', kleur: '#D97706', bg: '#FFFBEB', voorbeeld: 'ProctorExam, selectiesystemen, studentvolging', actie: 'Strikte verplichtingen: risicobeheer, toezicht, registratie.' },
                  { level: 'Beperkt risico', kleur: '#0F766E', bg: '#F0FDFA', voorbeeld: 'Chatbots, AI-gegenereerde content', actie: 'Transparantieplicht: duidelijk aangeven dat het AI is.' },
                  { level: 'Minimaal risico', kleur: '#374151', bg: '#F9FAFB', voorbeeld: 'Spelfilters, aanbevelingssystemen', actie: 'Vrijwillige gedragscodes, geen verplichtingen.' },
                ].map(r => (
                  <div key={r.level} className="rounded-xl p-4 border" style={{ backgroundColor: r.bg, borderColor: r.kleur + '40' }}>
                    <div className="font-bold text-sm mb-2" style={{ color: r.kleur }}>{r.level}</div>
                    <div className="text-xs text-gray-500 mb-2"><strong>Voorbeeld:</strong> {r.voorbeeld}</div>
                    <div className="text-xs font-medium" style={{ color: r.kleur }}>{r.actie}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6 flex gap-4">
              <div className="text-2xl flex-shrink-0">💡</div>
              <div className="text-sm text-gray-700 space-y-1.5">
                <div className="font-semibold text-nhl-blauw mb-2">Hoe gebruik je deze lijst?</div>
                <p>Klik op een verplichting om de toelichting en het AI Act artikel te lezen. Staat er al een roadmap-item voor? Dan zie je dat als koppeling onderaan. Is dat niet zo? Gebruik de oranje knop om direct een actie aan te maken in de Roadmap tab.</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-nhl-blauw text-lg">Verplichtingen voor NHL Stenden</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> {AI_ACT_ITEMS.filter(a => a.status === 'te-starten').length} nog te organiseren
              </div>
            </div>
            <div className="space-y-3">
              {AI_ACT_ITEMS.map(item => {
                const gekoppeldeRoadmap = (roadmap || []).filter(r => r.aiActKoppeling === item.id)
                const isOpen = actieveAiAct === item.id
                return (
                  <div key={item.id} className={`bg-white rounded-2xl border-2 overflow-hidden transition-all ${item.status === 'lopend' ? 'border-green-200' : item.status === 'te-controleren' ? 'border-red-200' : 'border-gray-200'}`}>
                    <button onClick={() => setActieveAiAct(isOpen ? null : item.id)} className="w-full flex items-start justify-between gap-4 p-5 text-left">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.status === 'lopend' ? 'bg-green-500 border-green-500' : item.status === 'te-controleren' ? 'bg-red-500 border-red-500' : 'border-gray-300'}`}>
                          {item.status === 'lopend' && <span className="text-white text-xs">✓</span>}
                          {item.status === 'te-controleren' && <span className="text-white text-xs">!</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-xs font-bold text-gray-400">{item.artikel}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${PRIORITEIT_KLEUR[item.prioriteit]}`}>{item.prioriteit}</span>
                            <span className="text-xs text-gray-400">📅 {item.deadline}</span>
                          </div>
                          <div className="font-bold text-nhl-blauw">{item.titel}</div>
                        </div>
                      </div>
                      <span className="text-gray-400 flex-shrink-0 mt-1">{isOpen ? '▲' : '▼'}</span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.omschrijving}</p>
                        <div className="flex flex-wrap gap-3 items-center">
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-nhl-roze hover:underline font-semibold">📄 Lees {item.artikel} in de AI Act →</a>
                          {gekoppeldeRoadmap.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                              <span className="text-xs text-gray-400">Gekoppeld aan roadmap:</span>
                              {gekoppeldeRoadmap.map(r => (
                                <button key={r.id} onClick={() => switchTab('roadmap')} className="text-xs bg-nhl-blauw/10 text-nhl-blauw px-2 py-0.5 rounded-full hover:bg-nhl-blauw/20 transition-colors">{r.titel}</button>
                              ))}
                            </div>
                          )}
                          {gekoppeldeRoadmap.length === 0 && (
                            <button onClick={() => { switchTab('roadmap'); setAddOpen(true) }} className="text-xs bg-orange-50 border border-orange-200 text-orange-600 px-3 py-1 rounded-full hover:bg-orange-100 transition-colors">+ Voeg roadmap-item toe voor dit artikel</button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Toevoegen modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="font-bold text-nhl-blauw text-lg">Roadmap-item toevoegen</h2>
              <button onClick={() => setAddOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
            </div>
            {toegevoegd ? (
              <div className="p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-bold text-nhl-blauw text-xl mb-2">Toegevoegd!</h3>
                <p className="text-gray-500 text-sm mb-6">Het item staat nu op de roadmap.</p>
                <button onClick={() => setAddOpen(false)} className="btn-primary">Sluiten</button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Wat moet er georganiseerd worden? <span className="text-red-400">*</span></label>
                  <input type="text" value={form.titel} onChange={e => upd('titel', e.target.value)} placeholder="Bijv. Beleidskader generatieve AI voor studenten" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Toelichting</label>
                  <textarea value={form.omschrijving} onChange={e => upd('omschrijving', e.target.value)} rows={3} placeholder="Wat houdt dit in en waarom is het nodig?" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Prioriteit</label>
                    <select value={form.prioriteit} onChange={e => upd('prioriteit', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw">
                      <option value="hoog">🔴 Hoog</option>
                      <option value="midden">🟡 Midden</option>
                      <option value="laag">🟢 Laag</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Wanneer</label>
                    <input type="text" value={form.datum} onChange={e => upd('datum', e.target.value)} placeholder="Bijv. Q3 2026" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Wie is verantwoordelijk?</label>
                  <input type="text" value={form.verantwoordelijke} onChange={e => upd('verantwoordelijke', e.target.value)} placeholder="Bijv. OO&I, AI Compliance Groep" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Jouw naam (optioneel)</label>
                  <input type="text" value={form.naam} onChange={e => upd('naam', e.target.value)} placeholder="Bijv. Jan de Vries" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                </div>
                <button onClick={voegToe} disabled={!form.titel} className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${form.titel ? 'bg-nhl-roze text-white hover:bg-nhl-roze-dark' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>Toevoegen aan roadmap ✓</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
