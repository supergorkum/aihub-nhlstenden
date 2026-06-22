import { Link } from 'react-router-dom'
import { initiatieven, sporen } from '../data'

const functies = [
  { icon: '👁️', titel: 'Zichtbaarheid', tekst: 'Wat is er al? Wie doet wat? De AI-HUB maakt het AI-landschap van NHL Stenden inzichtelijk voor iedereen.', to: '/initiatieven' },
  { icon: '🔗', titel: 'Verbinding', tekst: 'Een levend netwerk van mensen, teams en initiatieven — binnen en buiten de instelling.', to: '/netwerk' },
  { icon: '🧭', titel: 'Richting', tekst: 'Het AI Kompas als gedeeld kompas voor verantwoord AI-gebruik, gebaseerd op onze eigen waarden.', to: '/over' },
]

const actieven = initiatieven.filter(i => i.status === 'actief').slice(0, 4)

export default function Start() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="nhl-gradient relative overflow-hidden">
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
                In ontwikkeling — versie 1.0 · Juni 2026
              </div>
              <div className="flex items-center gap-4 mb-4">
                <img src="/logo-AIHUB.png" alt="AI-HUB" className="h-14 w-14 bg-white rounded-xl p-1 shadow-lg" />
                <div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">AI-HUB</h1>
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
                <Link to="/sporen" className="bg-white text-nhl-blauw hover:bg-blue-50 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                  Ontdek de sporen
                </Link>
                <Link to="/netwerk" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                  Bekijk het netwerk
                </Link>
                <Link to="/meld" className="bg-nhl-roze hover:bg-nhl-roze-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                  + Meld initiatief
                </Link>
              </div>
            </div>
            <div className="grid gap-3">
              {functies.map(f => (
                <Link key={f.titel} to={f.to} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 flex gap-4 hover:bg-white/20 hover:border-white/40 transition-all group">
                  <div className="text-2xl flex-shrink-0">{f.icon}</div>
                  <div className="flex-1">
                    <div className="text-white font-bold mb-1 flex items-center justify-between">
                      {f.titel}
                      <span className="text-white/40 group-hover:text-white/80 transition-colors text-sm">→</span>
                    </div>
                    <div className="text-blue-100 text-sm leading-relaxed">{f.tekst}</div>
                  </div>
                </Link>
              ))}
              <div className="bg-nhl-roze/20 border border-nhl-roze/40 rounded-xl p-3 mt-1">
                <p className="text-white text-sm italic text-center">"Bewust kiezen voor onze digitale toekomst. Wie nu niet kiest, wordt gekozen."</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none"><path d="M0 48L1440 48L1440 16C1200 48 960 0 720 16C480 32 240 0 0 16L0 48Z" fill="white"/></svg>
        </div>
      </section>

      {/* Snelle navigatie */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mb-2">Jouw ingang</div>
            <h2 className="text-2xl font-bold text-nhl-blauw">Waar wil je beginnen?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sporen.map(s => (
              <Link
                key={s.id}
                to="/sporen"
                className="card card-hover p-5 group"
              >
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
            <Link to="/initiatieven" className="btn-ghost text-nhl-blauw font-medium">
              Alle initiatieven →
            </Link>
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

      {/* CTA strip */}
      <section className="py-12 nhl-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: '🚀', titel: 'Initiatief aanmelden', tekst: 'Werk jij aan iets rond AI?', to: '/meld', label: 'Aanmelden' },
              { icon: '📁', titel: 'Documentatie', tekst: 'Presentaties, rapporten en materiaal.', to: '/documentatie', label: 'Bekijken' },
              { icon: '💡', titel: 'Inspiratie', tekst: 'Vragen en ideeën van collega\'s.', to: '/inspiratie', label: 'Ontdekken' },
            ].map(item => (
              <div key={item.titel} className="bg-white/10 border border-white/20 rounded-2xl p-6">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-white font-bold mb-1">{item.titel}</div>
                <div className="text-blue-200 text-sm mb-4">{item.tekst}</div>
                <Link to={item.to} className="inline-block bg-white text-nhl-blauw hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  {item.label} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
