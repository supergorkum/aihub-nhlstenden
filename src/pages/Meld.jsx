import { useState } from 'react'
import { Link } from 'react-router-dom'
import { vraagCategorieen, rolOpties, sporen } from '../data'
import PageHeader from '../components/PageHeader'

const STAPPEN = ['Wie ben je?', 'Wat wil je delen?', 'Jouw bijdrage', 'Klaar!']
const TOEGESTANE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg']
const TOEGESTANE_EXT = '.pdf, .doc, .docx, .png, .jpg, .jpeg'

export default function Meld({ onNieuwBericht }) {
  const [stap, setStap] = useState(0)
  const [form, setForm] = useState({ rol: '', naam: '', categorie: '', spoor: '', titel: '', tekst: '', url: '' })
  const [bestand, setBestand] = useState(null)
  const [bestandFout, setBestandFout] = useState('')
  const [verstuurd, setVerstuurd] = useState(false)

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const kanVolgende = () => {
    if (stap === 0) return form.rol !== ''
    if (stap === 1) return form.categorie !== ''
    if (stap === 2) return form.tekst.length > 10
    return true
  }

  const handleBestand = (file) => {
    if (!file) return
    if (!TOEGESTANE_TYPES.includes(file.type)) {
      setBestandFout('Alleen PDF, Word, PNG of JPEG bestanden zijn toegestaan.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setBestandFout('Bestand mag maximaal 10 MB zijn.')
      return
    }
    setBestandFout('')
    setBestand(file)
  }

  const verstuur = () => {
    const nieuw = {
      id: Date.now(),
      ...form,
      bestandNaam: bestand?.name || null,
      datum: new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }),
      categorieDef: vraagCategorieen.find(c => c.id === form.categorie),
      sporeDef: sporen.find(s => s.id === parseInt(form.spoor)),
    }
    onNieuwBericht(nieuw)
    setVerstuurd(true)
  }

  if (verstuurd) {
    return (
      <div className="min-h-screen pt-16 bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 animate-slide-up">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Bedankt voor je bijdrage!</h2>
          <p className="text-gray-600 mb-8">Je bijdrage is ontvangen en verschijnt binnenkort in het inspiratieoverzicht.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setVerstuurd(false); setStap(0); setForm({ rol:'',naam:'',categorie:'',spoor:'',titel:'',tekst:'',url:'' }); setBestand(null) }}
              className="btn-primary">Nog een bijdrage</button>
            <Link to="/inspiratie" className="btn-ghost border border-gray-200">Bekijk inspiratie →</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <PageHeader label="Doe mee" title="Meld je vraag of inspiratie" subtitle="Heb je een vraag, idee, zorg of interessante ontwikkeling? Deel het hier." />

        {/* Stappen */}
        <div className="flex items-center gap-2 mb-10">
          {STAPPEN.slice(0, 3).map((s, i) => (
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
                  placeholder="Bijv. Jan de Vries" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
              </div>
            </div>
          )}

          {stap === 1 && (
            <div className="animate-fade-in">
              <h3 className="font-bold text-nhl-blauw text-xl mb-6">Wat wil je delen?</h3>
              <div className="space-y-2 mb-6">
                {vraagCategorieen.map(cat => (
                  <button key={cat.id} onClick={() => upd('categorie', cat.id)}
                    className={`w-full px-5 py-4 rounded-xl text-left flex items-center gap-4 border-2 transition-colors ${form.categorie === cat.id ? 'border-nhl-blauw bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="font-medium text-gray-800">{cat.label}</span>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gerelateerd spoor (optioneel)</label>
                <select value={form.spoor} onChange={e => upd('spoor', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw">
                  <option value="">Kies een spoor...</option>
                  {sporen.map(s => <option key={s.id} value={s.id}>{s.icon} {s.titel}</option>)}
                </select>
              </div>
            </div>
          )}

          {stap === 2 && (
            <div className="animate-fade-in">
              <h3 className="font-bold text-nhl-blauw text-xl mb-6">Jouw bijdrage</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Korte titel <span className="text-red-400">*</span></label>
                  <input type="text" value={form.titel} onChange={e => upd('titel', e.target.value)}
                    placeholder="Bijv. Vraag over AI bij toetsing PABO"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Toelichting <span className="text-red-400">*</span></label>
                  <textarea value={form.tekst} onChange={e => upd('tekst', e.target.value)} rows={5}
                    placeholder="Omschrijf je vraag, idee of bijdrage..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw resize-none" />
                  <div className="text-xs text-gray-400 mt-1">{form.tekst.length} tekens</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link of URL (optioneel)</label>
                  <input type="url" value={form.url} onChange={e => upd('url', e.target.value)}
                    placeholder="https://..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bestand uploaden (optioneel)</label>
                  <div
                    onClick={() => document.getElementById('bestand-upload').click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); handleBestand(e.dataTransfer.files[0]) }}
                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-nhl-blauw hover:bg-blue-50 transition-colors"
                  >
                    {bestand ? (
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">{bestand.type.includes('pdf') ? '📄' : bestand.type.includes('image') ? '🖼️' : '📝'}</span>
                        <div className="text-left">
                          <div className="font-medium text-nhl-blauw text-sm">{bestand.name}</div>
                          <div className="text-xs text-gray-400">{(bestand.size / 1024).toFixed(0)} KB</div>
                        </div>
                        <button onClick={e => { e.stopPropagation(); setBestand(null) }} className="ml-2 text-gray-400 hover:text-red-500 text-lg">✕</button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-3xl mb-2">📎</div>
                        <div className="text-sm text-gray-600 font-medium">Klik of sleep een bestand hierheen</div>
                        <div className="text-xs text-gray-400 mt-1">PDF, Word, PNG of JPEG · max 10 MB</div>
                      </div>
                    )}
                  </div>
                  <input id="bestand-upload" type="file" accept={TOEGESTANE_EXT} className="hidden" onChange={e => handleBestand(e.target.files[0])} />
                  {bestandFout && <div className="text-red-500 text-xs mt-2">{bestandFout}</div>}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {stap > 0
              ? <button onClick={() => setStap(s => s - 1)} className="btn-ghost">← Terug</button>
              : <div />
            }
            {stap < 2
              ? <button onClick={() => setStap(s => s + 1)} disabled={!kanVolgende()}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${kanVolgende() ? 'bg-nhl-blauw text-white hover:bg-nhl-blauw-dark' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>
                  Volgende →
                </button>
              : <button onClick={verstuur} disabled={!kanVolgende()}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${kanVolgende() ? 'bg-nhl-roze text-white hover:bg-nhl-roze-dark' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>
                  Verstuur bijdrage 🚀
                </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
