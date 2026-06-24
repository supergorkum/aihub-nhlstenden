import { NavLink } from 'react-router-dom'
import { useState, useRef } from 'react'

const navGroepen = [
  {
    label: 'Verkennen',
    items: [
      { label: 'Fundament', to: '/fundament', icon: '🏛️' },
      { label: 'Netwerk', to: '/netwerk', icon: '🕸️' },
      { label: "Thema's", to: '/themas', icon: '🎯' },
    ]
  },
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
      { label: 'AI & Geletterdheid', to: '/geletterdheid', icon: '📖' },
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
      { label: 'Beleid & Kaders', to: '/beleid', icon: '📋' },
      { label: 'Roadmap', to: '/initiatieven?tab=roadmap', icon: '🗺️' },
    ]
  },
]

function DropdownGroep({ groep }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)
  const handleMouseEnter = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true) }
  const handleMouseLeave = () => { closeTimer.current = setTimeout(() => setOpen(false), 150) }

  return (
    <div className="relative h-16 flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${open ? 'bg-white/20 text-white' : 'text-blue-100 hover:text-white hover:bg-white/10'}`}>
        {groep.label}
        <svg className={`w-3 h-3 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 min-w-52 z-50"
          style={{ marginTop: '-1px' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {groep.items.map(item => (
            <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${isActive ? 'text-nhl-blauw font-semibold bg-blue-50' : 'text-gray-700 hover:bg-gray-50 hover:text-nhl-blauw'}`}>
              <span className="w-5 text-center">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileGroep, setMobileGroep] = useState(null)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-nhl-blauw shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Links: logo + naam + Start aansluitend */}
          <div className="flex items-center flex-shrink-0">
            <NavLink to="/" className="flex items-center gap-2.5">
              {/* NHL Stenden logo als scherpe SVG — wit kader + witte tekst */}
              <svg viewBox="0 0 44 44" className="h-9 w-9 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Wit kader */}
                <rect x="3" y="3" width="28" height="38" rx="1.5" stroke="white" strokeWidth="2.2" fill="none"/>
                {/* NHL — dikgedrukt */}
                <text x="6" y="20" fontSize="10.5" fontWeight="900" fill="white" fontFamily="Arial Black, Arial, sans-serif" letterSpacing="-0.3">NHL</text>
                {/* Horizontale streep tussen NHL en STENDEN */}
                <line x1="6" y1="23.5" x2="28" y2="23.5" stroke="white" strokeWidth="1.2" opacity="0.6"/>
                {/* STENDEN — iets kleiner */}
                <text x="6" y="35" fontSize="7.5" fontWeight="700" fill="white" fontFamily="Arial, sans-serif" letterSpacing="0.2">STENDEN</text>
              </svg>
              <div className="border-l border-white/25 pl-2.5">
                <div className="text-white font-bold text-sm leading-tight">AI-Netwerk</div>
                <div className="text-blue-200 text-xs leading-tight">NHL Stenden</div>
              </div>
            </NavLink>

            {/* Start direct aansluitend */}
            <NavLink to="/"
              className={({ isActive }) =>
                `flex items-center gap-1.5 ml-3 pl-3 border-l border-white/20 py-2 text-xs font-semibold transition-colors ${isActive ? 'text-white' : 'text-blue-200 hover:text-white'}`
              }>
              🏠 Start
            </NavLink>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center h-16 gap-0.5">
            {navGroepen.map(groep => <DropdownGroep key={groep.label} groep={groep} />)}
            <NavLink to="/over"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${isActive ? 'bg-white/20 text-white' : 'text-blue-100 hover:text-white hover:bg-white/10'}`
              }>
              Over
            </NavLink>
            <div className="w-px h-5 bg-white/20 mx-2" />
            <NavLink to="/meld"
              className="flex items-center gap-1.5 bg-nhl-roze hover:bg-nhl-roze-dark text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap">
              + Vraag of idee
            </NavLink>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10" aria-label="Menu">
            <div className={`w-5 h-0.5 bg-white mb-1.5 transition-all origin-center ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-white mb-1.5 transition-all ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-white transition-all origin-center ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-white/20 py-4">
            <NavLink to="/" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-blue-100 hover:text-white mb-1">🏠 Start</NavLink>
            {navGroepen.map(groep => (
              <div key={groep.label} className="mb-1">
                <button onClick={() => setMobileGroep(mobileGroep === groep.label ? null : groep.label)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold text-blue-300 uppercase tracking-widest hover:text-white transition-colors">
                  {groep.label}
                  <svg className={`w-3.5 h-3.5 transition-transform ${mobileGroep === groep.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileGroep === groep.label && (
                  <div className="ml-3 mb-2 space-y-0.5">
                    {groep.items.map(item => (
                      <NavLink key={item.to} to={item.to} onClick={() => { setMobileOpen(false); setMobileGroep(null) }}
                        className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-white/20 text-white font-medium' : 'text-blue-100 hover:text-white hover:bg-white/10'}`}>
                        <span>{item.icon}</span><span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <NavLink to="/over" onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `block px-3 py-2.5 text-sm transition-colors ${isActive ? 'text-white font-medium' : 'text-blue-100 hover:text-white'}`}>
              Over het Netwerk
            </NavLink>
            <NavLink to="/meld" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 mx-3 mt-3 px-4 py-2.5 rounded-xl text-sm bg-nhl-roze text-white font-bold">
              + Vraag of idee
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}
