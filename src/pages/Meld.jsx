import GradientHeader from '../components/GradientHeader'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { vraagCategorieen, rolOpties, sporen } from '../data'
import PageHeader from '../components/PageHeader'

const TOEGESTANE_TYPES = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/png','image/jpeg']

const TREFWOORD_SUGGESTIES = {
  vraag: ['Toetsing','Integriteit','Privacy','Beleid','Didactiek','Studenten','Docenten','Tools','Wetgeving','AVG'],
  idee: ['Innovatie','Pilot','Tool','Onderwijs','Begeleiding','Automatisering','Data','Geletterdheid','Curriculum'],
  initiatief: ['Project','Samenwerking','Research','Experiment','Implementatie','Netwerk'],
  ondersteuning: ['Samenwerking','Kennis','Expertise','Workshop','Begeleiding','Co-creatie'],
  zorg: ['Risico','Privacy','Integriteit','Veiligheid','Afhankelijkheid','Ethiek','Toezicht'],
}

const INIT_TREFWOORDEN = [
  { woord: 'Toetsing', n: 8 }, { woord: 'Privacy', n: 6 }, { woord: 'Didactiek', n: 5 },
  { woord: 'Geletterdheid', n: 7 }, { woord: 'Studentsucces', n: 4 }, { woord: 'Tools', n: 9 },
  { woord: 'Beleid', n: 3 }, { woord: 'Ethiek', n: 5 }, { woord: 'SURF', n: 4 },
  { woord: 'Innovatie', n: 6 }, { woord: 'AVG', n: 3 }, { woord: 'Curriculum', n: 4 },
]

function WordCloud({ trefwoorden }) {
  const max = Math.max(...trefwoorden.map(t => t.n))
  const kleuren = ['#1E3A8A','#0F766E','#E91E8C','#7C3AED','#D97706','#059669']
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center p-4">
      {trefwoorden
        .sort((a, b) => b.n - a.n)
        .map((t, i) => {
          const grootte = 12 + Math.round((t.n / max) * 16)
          const kleur = kleuren[i % kleuren.length]
          return (
            <span key={t.woord}
              className="cursor-default transition-transform hover:scale-110"
              style={{ fontSize: `${grootte}px`, color: kleur, fontWeight: t.n > max * 0.6 ? '700' : '500', lineHeight: 1.4 }}
              title={`${t.woord}: ${t.n}x`}
            >
              {t.woord}
            </span>
          )
        })}
    </div>
  )
}

// Speelse tekstbubbels — toont berichten van bezoekers + reacties van het team
function BubbelTijdlijn({ berichten }) {
  const zichtbaar = berichten.filter(b => b.titel || b.tekst).slice(0, 8)
  if (zichtbaar.length === 0) return null

  const catKleur = {
    vraag: { bg: 'bg-blue-50', border: 'border-blue-200', icon: '💬', label: 'Vraag' },
    idee: { bg: 'bg-purple-50', border: 'border-purple-200', icon: '💡', label: 'Idee' },
    initiatief: { bg: 'bg-green-50', border: 'border-green-200', icon: '🚀', label: 'Initiatief' },
    ondersteuning: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: '🤝', label: 'Samenwerking' },
    zorg: { bg: 'bg-red-50', border: 'border-red-200', icon: '⚠️', label: 'Signaal' },
  }

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-bold text-nhl-blauw text-lg">Wat leeft er bij collega's?</h3>
      </div>
      <p className="text-gray-500 text-sm mb-6">
        Vragen en ideeën die anderen al deelden. Jouw bijdrage komt er ook bij — anoniem, tenzij je je naam hebt ingevuld.
      </p>
      <div className="space-y-4">
        {zichtbaar.map((b, i) => {
          const stijl = catKleur[b.categorie] || catKleur.vraag
          const isLinks = i % 2 === 0
          return (
            <div key={b.id} className={`flex flex-col gap-2 ${isLinks ? 'items-start' : 'items-end'}`}>
              {/* Vraag / idee bubbel */}
              <div className={`max-w-sm ${isLinks ? 'ml-0 mr-auto' : 'ml-auto mr-0'}`}>
                <div className={`rounded-2xl border px-4 py-3 ${stijl.bg} ${stijl.border} ${isLinks ? 'rounded-tl-sm' : 'rounded-tr-sm'}`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs">{stijl.icon}</span>
                    <span className="text-xs font-semibold text-gray-500">{b.categorieDef?.label || stijl.label}</span>
                    {b.naam && <span className="text-xs text-gray-400">· {b.naam}</span>}
                  </div>
                  {b.titel && <div className="font-semibold text-gray-800 text-sm leading-snug mb-1">{b.titel}</div>}
                  {b.tekst && <p className="text-gray-600 text-xs leading-relaxed">{b.tekst.slice(0, 160)}{b.tekst.length > 160 ? '...' : ''}</p>}
                </div>
                {/* Staartje */}
                <div className={`w-3 h-2 ${isLinks ? 'ml-4' : 'ml-auto mr-4'}`}
                  style={{
                    background: 'transparent',
                    borderLeft: isLinks ? '6px solid transparent' : 'none',
                    borderRight: isLinks ? 'none' : '6px solid transparent',
                    borderTop: `8px solid ${stijl.bg.includes('blue') ? '#EFF6FF' : stijl.bg.includes('purple') ? '#FAF5FF' : stijl.bg.includes('green') ? '#F0FDF4' : stijl.bg.includes('yellow') ? '#FEFCE8' : '#FEF2F2'}`,
                  }}
                />
              </div>

              {/* Reactie van het team — alleen als er een antwoord is */}
              {b.antwoord && (
                <div className={`max-w-sm ${isLinks ? 'ml-8 mr-auto' : 'ml-auto mr-8'}`}>
                  <div className={`rounded-2xl border px-4 py-3 bg-nhl-blauw/5 border-nhl-blauw/20 ${isLinks ? 'rounded-tl-sm' : 'rounded-tr-sm'}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs">🧭</span>
                      <span className="text-xs font-semibold text-nhl-blauw">AI-HUB team</span>
                    </div>
                    <p className="text-nhl-blauw text-xs leading-relaxed">{b.antwoord}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Meld({ onNieuwBericht, berichten = [] }) {
  const [stap, setStap] = useState(0)
  const [form, setForm] = useState({ rol: '', naam: '', categorie: '', spoor: '', titel: '', tekst: '', url: '', trefwoorden: [] })
  const [trefwoordInput, setTrefwoordInput] = useState('')
  const [bestand, setBestand] = useState(null)
  const [bestandFout, setBestandFout] = useState('')
  const [verstuurd, setVerstuurd] = useState(false)
  const [wordcloudData, setWordcloudData] = useState(INIT_TREFWOORDEN)

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const kanVolgende = () => {
    if (stap === 0) return form.rol !== ''
    if (stap === 1) return form.categorie !== ''
    if (stap === 2) return form.tekst.trim().length >= 5
    return true
  }

  const voegTrefwoordToe = (woord) => {
    const w = woord.trim()
    if (!w || form.trefwoorden.includes(w)) return
    upd('trefwoorden', [...form.trefwoorden, w])
    setTrefwoordInput('')
  }

  const verwijderTrefwoord = (w) => upd('trefwoorden', form.trefwoorden.filter(t => t !== w))

  const handleBestand = (file) => {
    if (!file) return
    if (!TOEGESTANE_TYPES.includes(file.type)) { setBestandFout('Alleen PDF, Word, PNG of JPEG toegestaan.'); return }
    if (file.size > 10 * 1024 * 1024) { setBestandFout('Bestand mag maximaal 10 MB zijn.'); return }
    setBestandFout('')
    setBestand(file)
  }

  const verstuur = () => {
    setWordcloudData(prev => {
      const updated = [...prev]
      form.trefwoorden.forEach(w => {
        const idx = updated.findIndex(t => t.woord.toLowerCase() === w.toLowerCase())
        if (idx >= 0) updated[idx] = { ...updated[idx], n: updated[idx].n + 1 }
        else updated.push({ woord: w, n: 1 })
      })
      return updated
    })
    const nieuw = {
      id: Date.now(), ...form,
      bestandNaam: bestand?.name || null,
      datum: new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }),
      categorieDef: vraagCategorieen.find(c => c.id === form.categorie),
      sporeDef: sporen.find(s => s.id === parseInt(form.spoor)),
      antwoord: null,
    }
    onNieuwBericht(nieuw)
    setVerstuurd(true)
  }

  const suggesties = TREFWOORD_SUGGESTIES[form.categorie] || []
  const beschikbareSuggesties = suggesties.filter(s => !form.trefwoorden.includes(s))

  if (verstuurd) {
    return (
      <div className="min-h-screen pt-16 bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 animate-slide-up">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Bedankt!</h2>
          <p className="text-gray-600 mb-3">Je bericht is ontvangen. Het AI-HUB team neemt het mee in het werk.</p>
          <p className="text-gray-500 text-sm mb-8">
            Wil je iets inspirerends delen of een initiatief aanmelden?{' '}
            <Link to="/inspiratie" className="text-nhl-roze hover:underline">Ga naar Inspiratie</Link>.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setVerstuurd(false); setStap(0); setForm({ rol:'',naam:'',categorie:'',spoor:'',titel:'',tekst:'',url:'',trefwoorden:[] }); setBestand(null) }}
              className="btn-primary">Nog een vraag stellen</button>
            <Link to="/" className="btn-ghost border border-gray-200">Naar start</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 bg-white">
      <GradientHeader
        label="Vragen & ideeën"
        title="Heb je een vraag of idee?"
        subtitle="De AI-HUB zijn we samen. Stel je vraag, deel een idee, zoek samenwerking of geef een signaal — en help zo de wegwijzer scherper te maken."
      />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-8 flex gap-3">
          <span className="text-lg flex-shrink-0">💡</span>
          <p className="text-sm text-purple-700">
            Wil je een inspirerende ontwikkeling, artikel of initiatief delen?
            Dat doe je via <Link to="/inspiratie" className="underline font-medium">Inspiratie</Link> in het menu.
            Deze pagina is voor vragen, ideeën en zorgen.
          </p>
        </div>

        {/* Stappen */}
        <div className="flex items-center gap-2 mb-10">
          {['Wie ben je?','Wat wil je?','Jouw bericht'].map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${i < stap ? 'bg-nhl-roze text-white' : i === stap ? 'bg-nhl-blauw text-white' : 'bg-gray-100 text-gray-400'}`}>
                {i < stap ? '✓' : i + 1}
              </div>
              <div className={`text-xs hidden sm:block ${i === stap ? 'text-nhl-blauw font-medium' : 'text-gray-400'}`}>{s}</div>
              {i < 2 && <div className={`flex-1 h-0.5 rounded ${i < stap ? 'bg-nhl-roze' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="card p-8 shadow-sm">

          {stap === 0 && (
            <div className="animate-fade-in">
              <h3 className="font-bold text-nhl-blauw text-xl mb-6">Wie ben je?</h3>
              <div className="grid sm:grid-cols-2 gap-2 mb-6">
                {rolOpties.map(rol => (
                  <button key={rol} onClick={() => upd('rol', rol)}
                    className={`px-4 py-3 rounded-xl text-left text-sm font-medium border-2 transition-colors ${form.rol === rol ? 'border-nhl-blauw bg-nhl-blauw text-white' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}>
                    {rol}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jouw naam (optioneel)</label>
                <input type="text" value={form.naam} onChange={e => upd('naam', e.target.value)}
                  placeholder="Bijv. Jan de Vries"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
              </div>
            </div>
          )}

          {stap === 1 && (
            <div className="animate-fade-in">
              <h3 className="font-bold text-nhl-blauw text-xl mb-6">Wat wil je delen?</h3>
              <div className="space-y-2 mb-6">
                {vraagCategorieen.map(cat => (
                  <button key={cat.id} onClick={() => upd('categorie', cat.id)}
                    className={`w-full px-5 py-4 rounded-xl text-left border-2 transition-colors ${form.categorie === cat.id ? 'border-nhl-blauw bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="font-semibold text-gray-800">{cat.label}</span>
                    </div>
                    <p className="text-xs text-gray-500 ml-9 leading-relaxed">{cat.uitleg}</p>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gerelateerd thema (optioneel)</label>
                <select value={form.spoor} onChange={e => upd('spoor', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw">
                  <option value="">Kies een thema...</option>
                  {sporen.map(s => <option key={s.id} value={s.id}>{s.icon} {s.titel}</option>)}
                </select>
              </div>
            </div>
          )}

          {stap === 2 && (
            <div className="animate-fade-in">
              <h3 className="font-bold text-nhl-blauw text-xl mb-2">Jouw bericht</h3>
              <p className="text-gray-400 text-sm mb-6">
                {vraagCategorieen.find(c => c.id === form.categorie)?.icon}{' '}
                {vraagCategorieen.find(c => c.id === form.categorie)?.label}
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Korte omschrijving <span className="text-red-400">*</span></label>
                  <input type="text" value={form.titel} onChange={e => upd('titel', e.target.value)}
                    placeholder={
                      form.categorie === 'vraag' ? 'Bijv. Hoe ga ik om met AI in mijn toetsing?' :
                      form.categorie === 'idee' ? 'Bijv. Idee: AI-assistent voor studieloopbaanbegeleiding' :
                      form.categorie === 'initiatief' ? 'Bijv. Project AI in curriculum Academie Educatie' :
                      form.categorie === 'ondersteuning' ? 'Bijv. Zoek samenwerking voor AI-pilot' :
                      'Bijv. Zorg over gebruik AI bij tentamens'
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Toelichting <span className="text-red-400">*</span></label>
                  <textarea value={form.tekst} onChange={e => upd('tekst', e.target.value)} rows={5}
                    placeholder="Geef zo veel context als je wilt. Hoe meer we weten, hoe beter we je kunnen helpen."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw resize-none" />
                  <div className={`text-xs mt-1 ${form.tekst.trim().length < 5 ? 'text-red-400' : 'text-gray-400'}`}>
                    {form.tekst.length} tekens{form.tekst.trim().length < 5 ? ' — minimaal 5 tekens' : ''}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trefwoorden</label>
                  <div className="flex gap-2 mb-2">
                    <input type="text" value={trefwoordInput} onChange={e => setTrefwoordInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); voegTrefwoordToe(trefwoordInput) } }}
                      placeholder="Typ een trefwoord en druk Enter..."
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                    <button onClick={() => voegTrefwoordToe(trefwoordInput)}
                      className="px-4 py-2 bg-nhl-blauw text-white rounded-xl text-sm font-medium hover:bg-nhl-blauw-dark transition-colors">+</button>
                  </div>
                  {beschikbareSuggesties.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {beschikbareSuggesties.slice(0, 8).map(s => (
                        <button key={s} onClick={() => voegTrefwoordToe(s)}
                          className="px-2.5 py-1 rounded-full text-xs border border-gray-200 text-gray-500 hover:border-nhl-blauw hover:text-nhl-blauw transition-colors bg-gray-50">
                          + {s}
                        </button>
                      ))}
                    </div>
                  )}
                  {form.trefwoorden.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {form.trefwoorden.map(w => (
                        <span key={w} className="inline-flex items-center gap-1 bg-nhl-blauw text-white px-2.5 py-1 rounded-full text-xs font-medium">
                          {w}
                          <button onClick={() => verwijderTrefwoord(w)} className="ml-0.5 hover:text-red-200 transition-colors">✕</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link of URL (optioneel)</label>
                  <input type="url" value={form.url} onChange={e => upd('url', e.target.value)}
                    placeholder="https://..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bijlage (optioneel)</label>
                  <div onClick={() => document.getElementById('meld-upload').click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); handleBestand(e.dataTransfer.files[0]) }}
                    className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-nhl-blauw hover:bg-blue-50 transition-colors">
                    {bestand ? (
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">{bestand.type.includes('pdf') ? '📄' : bestand.type.includes('image') ? '🖼️' : '📝'}</span>
                        <div className="text-left">
                          <div className="font-medium text-nhl-blauw text-sm">{bestand.name}</div>
                          <div className="text-xs text-gray-400">{(bestand.size / 1024).toFixed(0)} KB</div>
                        </div>
                        <button onClick={e => { e.stopPropagation(); setBestand(null) }} className="ml-2 text-gray-400 hover:text-red-500">✕</button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-2xl mb-1">📎</div>
                        <div className="text-sm text-gray-600 font-medium">Klik of sleep een bestand</div>
                        <div className="text-xs text-gray-400 mt-1">PDF, Word, PNG of JPEG · max 10 MB</div>
                      </div>
                    )}
                  </div>
                  <input id="meld-upload" type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" className="hidden" onChange={e => handleBestand(e.target.files[0])} />
                  {bestandFout && <div className="text-red-500 text-xs mt-2">{bestandFout}</div>}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {stap > 0 ? <button onClick={() => setStap(s => s - 1)} className="btn-ghost">← Terug</button> : <div />}
            {stap < 2 ? (
              <button onClick={() => setStap(s => s + 1)} disabled={!kanVolgende()}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${kanVolgende() ? 'bg-nhl-blauw text-white hover:bg-nhl-blauw-dark' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>
                Volgende →
              </button>
            ) : (
              <button onClick={verstuur} disabled={!kanVolgende()}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${kanVolgende() ? 'bg-nhl-roze text-white hover:bg-nhl-roze-dark' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>
                Verstuur bericht →
              </button>
            )}
          </div>
        </div>

        {/* Bubbel tijdlijn */}
        <BubbelTijdlijn berichten={berichten} />

        {/* Wordcloud */}
        <div className="mt-10 card p-6">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-nhl-blauw">Wat speelt er?</h3>
            <span className="text-xs text-gray-400">— trefwoorden uit ingezonden berichten</span>
          </div>
          <p className="text-gray-500 text-xs mb-5">Hoe groter het woord, hoe vaker het voorkomt in vragen en ideeën binnen NHL Stenden.</p>
          <WordCloud trefwoorden={wordcloudData} />
        </div>
      </div>
    </div>
  )
}
