import { NavLink } from 'react-router-dom'
import { useState, useRef, useCallback, useEffect } from 'react'

const REFRESH_KEY = 'aihub-laatste-refresh'

const navGroepen = [
  {
    label: 'Aan de slag',
    items: [
      { label: 'Evenementen', to: '/evenementen', icon: '📅' },
      { label: 'Initiatieven', to: '/initiatieven', icon: '🚀' },
      { label: 'Pilots', to: '/pilots', icon: '🧪' },
    ]
  },
  {
    label: 'Kennis',
    items: [
      { label: 'AI-Geletterdheid', to: '/geletterdheid', icon: '🤝' },
      { label: 'Bronnen', to: '/linkjes', icon: '🔗' },
      { label: 'Documentatie', to: '/documentatie', icon: '📁' },
      { label: 'Inspiratie', to: '/inspiratie', icon: '💡' },
      { label: "Video's", to: '/video', icon: '🎬' },
    ]
  },
  {
    label: 'Beleid',
    items: [
      { label: 'AI Act & Compliance', to: '/initiatieven?tab=aiact', icon: '⚖️' },
      { label: 'Roadmap', to: '/initiatieven?tab=roadmap', icon: '🗺️' },
      { label: 'Fundament', to: '/fundament', icon: '🏛️' },
    ]
  },
  {
    label: 'Ontdekken',
    items: [
      { label: 'Netwerk', to: '/netwerk', icon: '🕸️' },
      { label: "Thema's", to: '/themas', icon: '🎯' },
    ]
  },
]

// Globale actieve groep — zodat maar één dropdown tegelijk open is
// en de vorige meteen sluit zonder vertraging
function NavDropdowns() {
  const [actief, setActief] = useState(null)
  const sluitTimer = useRef(null)

  const openGroep = useCallback((label) => {
    if (sluitTimer.current) clearTimeout(sluitTimer.current)
    setActief(label)
  }, [])

  const sluitVertraagd = useCallback(() => {
    sluitTimer.current = setTimeout(() => setActief(null), 300)
  }, [])

  const annuleerSluiten = useCallback(() => {
    if (sluitTimer.current) clearTimeout(sluitTimer.current)
  }, [])

  return (
    <div className="flex items-stretch flex-1 justify-center">
      {navGroepen.map(groep => {
        const isOpen = actief === groep.label
        return (
          <div
            key={groep.label}
            className="relative flex items-center self-stretch"
            onMouseEnter={() => openGroep(groep.label)}
            onMouseLeave={sluitVertraagd}
          >
            <button
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isOpen
                  ? 'bg-white text-nhl-blauw shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
            >
              {groep.label}
              <svg
                className={`w-3 h-3 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <div
                className="absolute left-0 top-full bg-white rounded-xl shadow-2xl border border-gray-100 py-2 min-w-52 z-50"
                onMouseEnter={annuleerSluiten}
                onMouseLeave={sluitVertraagd}
              >
                {groep.items.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setActief(null)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 text-sm transition-colors relative ${
                        isActive
                          ? 'text-nhl-blauw font-semibold bg-blue-50 border-l-2 border-nhl-blauw'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-nhl-blauw border-l-2 border-transparent hover:border-nhl-blauw'
                      }`
                    }
                  >
                    <span className="w-5 text-center text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {/* Over — directe link */}
      <NavLink
        to="/over"
        className={({ isActive }) =>
          `flex items-center px-3 text-xs font-semibold transition-all ${
            isActive
              ? 'text-white bg-white/20 rounded-lg'
              : 'text-white/80 hover:text-white hover:bg-white/15 rounded-lg'
          }`
        }
      >
        Over
      </NavLink>
    </div>
  )
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileGroep, setMobileGroep] = useState(null)
  const [laatsteRefresh, setLaatsteRefresh] = useState(null)

  useEffect(() => {
    // Lees bij mount en luister naar storage events (ook vanuit Beheer)
    const lees = () => {
      const ts = localStorage.getItem(REFRESH_KEY)
      setLaatsteRefresh(ts)
    }
    lees()
    window.addEventListener('storage', lees)
    // Poll elke 30s voor updates binnen hetzelfde tabblad
    const interval = setInterval(lees, 30000)
    return () => { window.removeEventListener('storage', lees); clearInterval(interval) }
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-nhl-blauw shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-stretch justify-between" style={{ minHeight: '64px' }}>

          {/* Links: logo + tekst + streep + Start */}
          <div className="flex items-center gap-0 flex-shrink-0">

            {/* NHL Stenden logo — wit logo op blauwe achtergrond, geen blend tricks */}
            <NavLink to="/" className="flex items-center gap-2.5 mr-3 py-2 flex-shrink-0">
              <img
                src="/nhl-logo-wit.png"
                alt="NHL Stenden"
                className="h-9 w-auto flex-shrink-0"
              />
              <div className="text-white font-extrabold text-lg tracking-tight">AI-HUB</div>
            </NavLink>

            {/* Scheidingslijn */}
            <div className="w-px h-7 bg-white/30 mr-3 flex-shrink-0" />

            {/* Start knop */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-white text-nhl-blauw shadow-sm'
                    : 'text-white hover:bg-white/15'
                }`
              }
            >
              🏠 Start
            </NavLink>
          </div>

          {/* Midden: dropdowns — gedeelde state zodat overlap onmogelijk is */}
          <div className="hidden lg:flex items-stretch flex-1">
            <NavDropdowns />
          </div>

          {/* Rechts: refresh indicator + Vraag of idee */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">

            {/* Subtiele laatste refresh indicator */}
            {laatsteRefresh && (
              <div className="flex items-center gap-1.5 text-blue-200/80 hover:text-white transition-colors cursor-default"
                title={`Laatste AI-nieuwsrefresh: ${new Date(laatsteRefresh).toLocaleString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}`}>
                <span className="text-xs">🤖</span>
                <span className="text-xs">
                  Nieuws · {new Date(laatsteRefresh).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            )}
            <NavLink
              to="/meld"
              className="flex items-center gap-1.5 bg-nhl-roze hover:bg-nhl-roze-dark text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
            >
              + Vraag of idee
            </NavLink>
          </div>

          {/* Hamburger mobiel */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 self-center"
            aria-label="Menu"
          >
            <div className={`w-5 h-0.5 bg-white mb-1.5 transition-all origin-center ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-white mb-1.5 transition-all ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-white transition-all origin-center ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/20 py-3">
            <NavLink to="/" end onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold mb-2 transition-colors ${isActive ? 'bg-white/20 text-white' : 'text-white hover:bg-white/10'}`}>
              🏠 Start
            </NavLink>
            {navGroepen.map(groep => (
              <div key={groep.label} className="mb-1">
                <button
                  onClick={() => setMobileGroep(mobileGroep === groep.label ? null : groep.label)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-blue-200 uppercase tracking-widest hover:text-white transition-colors"
                >
                  {groep.label}
                  <svg className={`w-3 h-3 transition-transform ${mobileGroep === groep.label ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileGroep === groep.label && (
                  <div className="ml-3 mb-1 space-y-0.5">
                    {groep.items.map(item => (
                      <NavLink key={item.to} to={item.to}
                        onClick={() => { setMobileOpen(false); setMobileGroep(null) }}
                        className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-white/20 text-white font-medium' : 'text-blue-100 hover:text-white hover:bg-white/10'}`}>
                        <span>{item.icon}</span><span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <NavLink to="/over" onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `block px-3 py-2 text-sm transition-colors ${isActive ? 'text-white font-medium' : 'text-blue-100 hover:text-white'}`}>
              Over de HUB
            </NavLink>
            <NavLink to="/meld" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 mx-3 mt-3 px-4 py-2.5 rounded-xl text-sm bg-nhl-roze text-white font-bold">
              + Vraag of idee
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}
