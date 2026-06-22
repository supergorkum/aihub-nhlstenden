import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
  { label: 'Start', to: '/' },
  { label: "Thema's", to: '/themas' },
  { label: 'Fundament', to: '/fundament' },
  { label: 'Netwerk', to: '/netwerk' },
  { label: 'Initiatieven', to: '/initiatieven' },
  { label: 'Pilots', to: '/pilots' },
  { label: 'Documentatie', to: '/documentatie' },
  { label: "Video's", to: '/video' },
  { label: 'Evenementen', to: '/evenementen' },
  { label: 'Bronnen', to: '/linkjes' },
  { label: 'Inspiratie', to: '/inspiratie' },
  { label: 'Over de HUB', to: '/over' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-nhl-blauw shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-3 flex-shrink-0">
            <img src="/logo-AIHUB.png" alt="AI-HUB" className="h-9 w-9 object-contain bg-white rounded-lg p-0.5" />
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm leading-tight">AI-HUB</div>
              <div className="text-blue-200 text-xs leading-tight">NHL Stenden</div>
            </div>
          </NavLink>
          <div className="hidden lg:flex items-center gap-0.5 overflow-x-auto">
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}
                className={({ isActive }) => `px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${isActive ? 'bg-white/20 text-white' : 'text-blue-100 hover:text-white hover:bg-white/10'}`}>
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/meld" className="ml-2 bg-nhl-roze hover:bg-nhl-roze-dark text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap flex-shrink-0">
              + Vraag of idee
            </NavLink>
          </div>
          <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10">
            <div className={`w-5 h-0.5 bg-white mb-1.5 transition-all origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-white mb-1.5 transition-all ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-white transition-all origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-white/20 py-3 space-y-1 animate-fade-in">
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setOpen(false)}
                className={({ isActive }) => `block px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-white/20 text-white font-medium' : 'text-blue-100 hover:text-white hover:bg-white/10'}`}>
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/meld" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-sm bg-nhl-roze text-white font-semibold mt-2">
              + Vraag of idee
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}
