import { useState } from 'react'
import { vraagCategorieen, rolOpties, sporen } from '../data'

const STAPPEN = ['Wie ben je?', 'Wat wil je delen?', 'Jouw bijdrage', 'Klaar!']

export default function MeldJeIn({ onNieuwBericht }) {
  const [stap, setStap] = useState(0)
  const [form, setForm] = useState({
    rol: '',
    categorie: '',
    spoor: '',
    titel: '',
    tekst: '',
    url: '',
    naam: '',
  })
  const [verstuurd, setVerstuurd] = useState(false)

  const update = (veld, waarde) => setForm(f => ({ ...f, [veld]: waarde }))

  const kanVolgende = () => {
    if (stap === 0) return form.rol !== ''
    if (stap === 1) return form.categorie !== ''
    if (stap === 2) return form.tekst.length > 10
    return true
  }

  const verstuur = () => {
    const nieuw = {
      id: Date.now(),
      ...form,
      datum: new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }),
      categorieDef: vraagCategorieen.find(c => c.id === form.categorie),
      sporeDef: sporen.find(s => s.id === parseInt(form.spoor)),
    }
    onNieuwBericht(nieuw)
    setVerstuurd(true)
    setStap(3)
  }

  if (verstuurd && stap === 3) {
    return (
      <section id="meld" className="py-20 bg-nhl-blauw">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-4">Bedankt voor je bijdrage!</h2>
          <p className="text-blue-200 text-lg mb-8">
            Je bijdrage is ontvangen en verschijnt binnenkort in het inspiratieoverzicht. 
            Samen bouwen we de AI-HUB.
          </p>
          <button
            onClick={() => { setVerstuurd(false); setStap(0); setForm({ rol: '', categorie: '', spoor: '', titel: '', tekst: '', url: '', naam: '' }) }}
            className="bg-white text-nhl-blauw hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Nog een bijdrage doen
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="meld" className="py-20 bg-nhl-blauw">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-nhl-oranje font-semibold text-sm uppercase tracking-wider">Doe mee</span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-4">Meld je vraag of inspiratie</h2>
          <p className="text-blue-200">
            Heb je een vraag, een idee, een zorg of een interessante ontwikkeling? 
            Deel het hier. Jouw input maakt de AI-HUB rijker.
          </p>
        </div>

        {/* Stappen indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STAPPEN.slice(0, 3).map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i < stap ? 'bg-nhl-oranje text-white' :
                i === stap ? 'bg-white text-nhl-blauw' :
                'bg-white/20 text-white/50'
              }`}>
                {i < stap ? '✓' : i + 1}
              </div>
              <span className={`text-sm hidden sm:block ${i === stap ? 'text-white font-medium' : 'text-white/50'}`}>
                {s}
              </span>
              {i < 2 && <div className={`w-8 h-0.5 ${i < stap ? 'bg-nhl-oranje' : 'bg-white/20'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {/* Stap 0: Wie ben je */}
          {stap === 0 && (
            <div>
              <h3 className="text-xl font-bold text-nhl-blauw mb-6">Wie ben je?</h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {rolOpties.map(rol => (
                  <button
                    key={rol}
                    onClick={() => update('rol', rol)}
                    className={`px-4 py-3 rounded-xl text-left text-sm font-medium border-2 transition-colors ${
                      form.rol === rol
                        ? 'border-nhl-blauw bg-nhl-blauw text-white'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {rol}
                  </button>
                ))}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jouw naam (optioneel)
                </label>
                <input
                  type="text"
                  value={form.naam}
                  onChange={e => update('naam', e.target.value)}
                  placeholder="Bijv. Jan de Vries"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw"
                />
              </div>
            </div>
          )}

          {/* Stap 1: Categorie */}
          {stap === 1 && (
            <div>
              <h3 className="text-xl font-bold text-nhl-blauw mb-6">Wat wil je delen?</h3>
              <div className="space-y-3 mb-6">
                {vraagCategorieen.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => update('categorie', cat.id)}
                    className={`w-full px-5 py-4 rounded-xl text-left flex items-center gap-4 border-2 transition-colors ${
                      form.categorie === cat.id
                        ? 'border-nhl-blauw bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="font-medium text-gray-800">{cat.label}</span>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gerelateerd spoor (optioneel)
                </label>
                <select
                  value={form.spoor}
                  onChange={e => update('spoor', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw"
                >
                  <option value="">Kies een spoor...</option>
                  {sporen.map(s => (
                    <option key={s.id} value={s.id}>{s.icon} {s.titel}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Stap 2: Inhoud */}
          {stap === 2 && (
            <div>
              <h3 className="text-xl font-bold text-nhl-blauw mb-6">Jouw bijdrage</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Korte titel <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.titel}
                  onChange={e => update('titel', e.target.value)}
                  placeholder="Bijv. Vraag over AI in toetsing PABO"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Toelichting <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.tekst}
                  onChange={e => update('tekst', e.target.value)}
                  rows={5}
                  placeholder="Omschrijf je vraag, idee of bijdrage. Hoe meer context, hoe beter we je kunnen helpen of jouw input kunnen plaatsen."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw resize-none"
                />
                <div className="text-xs text-gray-400 mt-1">{form.tekst.length} tekens</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link of URL (optioneel)
                </label>
                <input
                  type="url"
                  value={form.url}
                  onChange={e => update('url', e.target.value)}
                  placeholder="https://..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw"
                />
                <p className="text-xs text-gray-400 mt-1">Bijv. een artikel, tool, project of ander relevant document.</p>
              </div>
            </div>
          )}

          {/* Knoppen */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {stap > 0 ? (
              <button
                onClick={() => setStap(s => s - 1)}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                ← Terug
              </button>
            ) : <div />}

            {stap < 2 ? (
              <button
                onClick={() => setStap(s => s + 1)}
                disabled={!kanVolgende()}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  kanVolgende()
                    ? 'bg-nhl-blauw text-white hover:bg-nhl-blauw-dark'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Volgende →
              </button>
            ) : (
              <button
                onClick={verstuur}
                disabled={!kanVolgende()}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  kanVolgende()
                    ? 'bg-nhl-oranje text-white hover:bg-orange-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Verstuur bijdrage 🚀
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
