import { useState, useEffect } from 'react'

const navItems = [
  { label: 'Wat is de AI-HUB', href: '#wat' },
  { label: 'Sporen', href: '#sporen' },
  { label: 'Netwerk', href: '#netwerk' },
  { label: 'Initiatieven', href: '#initiatieven' },
  { label: 'Meld je in', href: '#meld' },
  { label: 'Inspiratie', href: '#inspiratie' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-nhl-blauw shadow-lg' : 'bg-nhl-blauw/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-nhl-blauw font-black text-sm">AI</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">AI-HUB</div>
              <div className="text-blue-200 text-xs leading-tight">NHL Stenden</div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="text-blue-100 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded text-sm transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#meld"
              className="ml-3 bg-nhl-oranje hover:bg-orange-600 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
            >
              + Meld initiatief
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
          >
            <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-white/20 pt-2">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block text-blue-100 hover:text-white py-2 px-2 text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
