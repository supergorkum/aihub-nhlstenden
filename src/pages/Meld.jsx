import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import GradientHeader from '../components/GradientHeader'
import { sporen } from '../data'

const vraagCategorieen = [
  { id: 'vraag',         label: 'Een vraag stellen',        icon: '💬', uitleg: 'Je hebt een concrete vraag over AI bij NHL Stenden en wil een antwoord of richting.' },
  { id: 'idee',          label: 'Een idee delen',            icon: '💡', uitleg: 'Je hebt een idee over hoe AI ingezet kan worden en wil dat kenbaar maken.' },
  { id: 'initiatief',    label: 'Een initiatief aanmelden',  icon: '🚀', uitleg: 'Je bent al bezig met iets en wil dat zichtbaar maken in het AI-Netwerk.' },
  { id: 'ondersteuning', label: 'Samenwerking zoeken',       icon: '🤝', uitleg: "Je zoekt collega's, expertise of partners voor een AI-project of vraagstuk." },
  { id: 'zorg',          label: 'Een zorg of signaal',       icon: '⚠️', uitleg: 'Je hebt een zorg of signaal over AI-gebruik dat aandacht verdient.' },
]

const rolOpties = [
  'Docent', 'Onderzoeker / Lectormedewerker', 'Student', 'Medewerker dienst',
  'Management / Leidinggevende', 'Bestuurder', 'Externe partner', 'Anders',
]

const BUBBELS_STATISCH = [
  { tekst: 'Ik zou graag weten welke AI-tools goedgekeurd zijn voor gebruik.', antwoord: 'Het AI-Netwerk team heeft een overzicht van goedgekeurde tools klaar. Stuur een bericht voor de actuele lijst.' },
  { tekst: 'We zijn bezig met een pilot voor AI-feedback op studentwerk. Kan ik dit aanmelden?', antwoord: 'Ja, meld je pilot aan via het formulier hieronder. We voegen het toe aan het netwerkoverzicht.' },
  { tekst: 'Hoe zit het met de AVG bij het gebruik van ChatGPT voor werktaken?', antwoord: 'Gebruik ChatGPT niet voor persoonsgegevens van studenten of medewerkers. Gebruik bij voorkeur SURF-aangeboden alternatieven.' },
  { tekst: 'Ik heb een idee voor een AI-toepassing in ons curriculum.', antwoord: 'Geweldig! Deel je idee via het formulier. We koppelen je aan de juiste thematrekker.' },
  { tekst: "Zijn er collega's die ook bezig zijn met AI in toetsing?", antwoord: 'Ja, er lopen meerdere initiatieven rondom AI en toetsing. Neem contact op zodat we je kunnen verbinden.' },
  { tekst: 'Wat doet NHL Stenden met de AI Act? Waar kan ik dat volgen?', antwoord: 'Bekijk de AI Act en Compliance tab bij Initiatieven voor de actuele status per toepassing.' },
  { tekst: 'Ik wil graag meedoen aan het AI-Netwerk. Hoe doe ik dat?', antwoord: 'Stuur een bericht via dit formulier of spreek de Kwartiermaker aan. Iedereen is welkom.' },
  { tekst: 'Wij werken samen met een regionaal bedrijf aan een Computer Vision project.', antwoord: 'Prachtig initiatief. Meld het aan als initiatief zodat het zichtbaar wordt voor anderen in het netwerk.' },
]

function BubbelTijdlijn({ berichten }) {
  const weergave = [...BUBBELS_STATISCH, ...berichten.slice(0, 4)]
  return (
    <div className="mb-10">
      <div className="section-label mb-3">Wat speelt er</div>
      <p className="text-gray-500 text-sm mb-5">Vragen en opmerkingen die leven bij NHL Stenden, met een eerste reactie van het AI-Netwerk team.</p>
      <div className="space-y-4">
        {weergave.map((b, i) => (
          <div key={i} className={`flex flex-col gap-2 ${i % 2 === 0 ? 'items-start' : 'items-end'}`}>
            <div className={`max-w-[80%] ${i % 2 === 0 ? '' : 'text-right'}`}>
              <div className={`inline-block px-4 py-3 rounded-2xl text-sm leading-snug shadow-sm ${
                i % 2 === 0
                  ? 'bg-white border border-gray-200 text-gray-700 rounded-tl-sm'
                  : 'bg-nhl-blauw/10 border border-nhl-blauw/20 text-nhl-blauw rounded-tr-sm'
              }`}>
                "{b.tekst || b.vraag || b.categorieLabel}"
              </div>
            </div>
            {b.antwoord && (
              <div className={`max-w-[75%] ml-6 ${i % 2 === 0 ? '' : 'mr-6 ml-0'}`}>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-nhl-roze flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                  <div className="bg-pink-50 border border-pink-100 text-gray-600 text-xs px-3 py-2 rounded-xl rounded-tl-sm leading-relaxed">
                    <span className="font-semibold text-nhl-roze text-xs block mb-0.5">AI-Netwerk team</span>
                    {b.antwoord}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function leegForm() {
  return { naam: '', rol: '', thema: '', vraag: '', email: '' }
}

export default function Meld({ onNieuwBericht, berichten = [] }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [stap, setStap] = useState('categorie')
  const [categorie, setCategorie] = useState(null)
  const [form, setForm] = useState(leegForm())
  const [ingediend, setIngediend] = useState(false)

  // Pre-select categorie via URL parameter (?categorie=initiatief)
  useEffect(() => {
    const catParam = searchParams.get('categorie')
    if (catParam) {
      const gevonden = vraagCategorieen.find(c => c.id === catParam)
      if (gevonden) {
        setCategorie(gevonden)
        setStap('form')
      }
    }
  }, [])

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  // Reset volledig terug naar categoriescherm, ook URL parameter weghalen
  const resetNaarCategorie = () => {
    setStap('categorie')
    setCategorie(null)
    setForm(leegForm())
    setSearchParams({})
  }

  const verstuur = () => {
    if (!form.vraag || !categorie) return
    const bericht = {
      id: Date.now(),
      categorie: categorie.id,
      categorieLabel: categorie.label,
      categorieIcon: categorie.icon,
      ...form,
      themaLabel: sporen.find(s => s.id === parseInt(form.thema))?.titel || null,
      datum: new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'nieuw',
    }
    if (onNieuwBericht) onNieuwBericht(bericht)
    setIngediend(true)
  }

  if (ingediend) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md text-center">
          <div className="text-6xl mb-5">🎉</div>
          <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Ontvangen!</h2>
          <p className="text-gray-600 mb-2">
            Je {categorie.label.toLowerCase()} is doorgestuurd naar het kernteam van het AI-Netwerk.
          </p>
          <p className="text-gray-500 text-sm mb-8">We reageren zo spoedig mogelijk, meestal binnen een paar werkdagen.</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setIngediend(false); resetNaarCategorie() }}
              className="btn-primary"
            >
              Nog een bericht sturen
            </button>
            <Link to="/" className="btn-ghost text-center">Terug naar het AI-Netwerk</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <GradientHeader
        label="Vraag of idee"
        title="Neem contact op"
        subtitle="Het AI-Netwerk is van iedereen bij NHL Stenden. Deel je vraag, idee of initiatief en het kernteam neemt contact op."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        <div className="card overflow-hidden">
          {/* Stap 1: Categorie */}
          {stap === 'categorie' && (
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-nhl-blauw mb-2">Waar gaat het over?</h2>
                <p className="text-gray-500 text-sm">Kies het type bericht zodat het kernteam je goed kan helpen.</p>
              </div>
              <div className="space-y-3">
                {vraagCategorieen.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setCategorie(cat); setStap('form') }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-nhl-blauw hover:bg-blue-50 transition-all group text-left"
                  >
                    <span className="text-3xl">{cat.icon}</span>
                    <div>
                      <div className="font-semibold text-nhl-blauw group-hover:text-nhl-roze transition-colors">{cat.label}</div>
                      <div className="text-gray-500 text-sm">{cat.uitleg}</div>
                    </div>
                    <div className="ml-auto text-gray-300 group-hover:text-nhl-blauw transition-colors">→</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stap 2: Formulier */}
          {stap === 'form' && categorie && (
            <div>
              <div className="flex items-center gap-3 p-6 border-b border-gray-100 bg-gray-50">
                <span className="text-2xl">{categorie.icon}</span>
                <div>
                  <div className="font-bold text-nhl-blauw">{categorie.label}</div>
                  <div className="text-gray-500 text-xs">{categorie.uitleg}</div>
                </div>
                <button
                  onClick={resetNaarCategorie}
                  className="ml-auto text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
                >
                  ← Wijzig keuze
                </button>
              </div>
              <div className="p-8 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {categorie.id === 'initiatief' ? 'Naam van het initiatief' : 'Jouw vraag of bericht'}{' '}
                    <span className="text-red-400">*</span>
                  </label>
                  {categorie.id === 'initiatief' ? (
                    <input
                      type="text"
                      value={form.vraag}
                      onChange={e => upd('vraag', e.target.value)}
                      placeholder="Bijv. AI-feedback tool voor schrijfonderwijs PABO"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw"
                    />
                  ) : (
                    <textarea
                      value={form.vraag}
                      onChange={e => upd('vraag', e.target.value)}
                      placeholder={
                        categorie.id === 'vraag' ? 'Stel je vraag hier...'
                        : categorie.id === 'zorg' ? 'Beschrijf je zorg of signaal...'
                        : 'Beschrijf je idee of verzoek...'
                      }
                      rows={4}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw resize-none"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Gerelateerd thema <span className="text-gray-400 font-normal">(optioneel)</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {sporen.map(s => (
                      <button
                        key={s.id}
                        onClick={() => upd('thema', form.thema === String(s.id) ? '' : String(s.id))}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs border-2 transition-all ${
                          form.thema === String(s.id)
                            ? 'border-transparent text-white font-semibold'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                        style={form.thema === String(s.id) ? { backgroundColor: s.kleur } : {}}
                      >
                        <span>{s.icon}</span>
                        <span className="leading-snug">{s.titel}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Jouw naam <span className="text-gray-400 font-normal">(optioneel)</span>
                    </label>
                    <input
                      type="text"
                      value={form.naam}
                      onChange={e => upd('naam', e.target.value)}
                      placeholder="Bijv. Jan de Vries"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      E-mail <span className="text-gray-400 font-normal">(optioneel)</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => upd('email', e.target.value)}
                      placeholder="naam@nhlstenden.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Jouw rol <span className="text-gray-400 font-normal">(optioneel)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {rolOpties.map(rol => (
                      <button
                        key={rol}
                        onClick={() => upd('rol', form.rol === rol ? '' : rol)}
                        className={`px-3 py-1.5 rounded-full text-xs border-2 font-medium transition-colors ${
                          form.rol === rol
                            ? 'border-nhl-blauw bg-nhl-blauw text-white'
                            : 'border-gray-200 text-gray-600 hover:border-nhl-blauw'
                        }`}
                      >
                        {rol}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center gap-4">
                  <button
                    onClick={verstuur}
                    disabled={!form.vraag}
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
                      form.vraag
                        ? 'bg-nhl-roze hover:bg-nhl-roze-dark text-white'
                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {categorie.label} versturen →
                  </button>
                  <p className="text-xs text-gray-400 flex-1">
                    Je bericht gaat direct naar het kernteam van het AI-Netwerk NHL Stenden.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call-to-action: initiatief aanmelden */}
        {stap === 'categorie' && (
          <div className="mt-8 bg-gradient-to-r from-nhl-blauw to-blue-700 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="text-4xl flex-shrink-0">🚀</div>
            <div className="flex-1 text-center sm:text-left">
              <div className="font-bold text-white text-base mb-1">Al bezig met een AI-initiatief?</div>
              <p className="text-blue-200 text-sm">
                Meld je initiatief aan en maak het zichtbaar in het AI-Netwerk van NHL Stenden. Zo verbind je je met collega's en vergroot je het bereik.
              </p>
            </div>
            <button
              onClick={() => { setCategorie(vraagCategorieen.find(c => c.id === 'initiatief')); setStap('form') }}
              className="flex-shrink-0 bg-white text-nhl-blauw font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap"
            >
              Initiatief aanmelden →
            </button>
          </div>
        )}

        {/* BubbelTijdlijn */}
        <div className="mt-10">
          <BubbelTijdlijn berichten={berichten} />
        </div>
      </div>
    </div>
  )
}
