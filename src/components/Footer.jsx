export default function Footer() {
  return (
    <footer className="bg-nhl-blauw-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-nhl-blauw font-black text-sm">AI</span>
              </div>
              <div>
                <div className="font-bold text-sm">AI-HUB NHL Stenden</div>
                <div className="text-blue-300 text-xs">Samen slimmer & verantwoord</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              De centrale plek waar NHL Stenden alles rond AI samenbrengt: 
              wat we doen, wie we zijn en hoe we het verantwoord aanpakken.
            </p>
          </div>

          <div>
            <div className="font-semibold mb-4 text-sm uppercase tracking-wider text-blue-300">Navigatie</div>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Wat is de AI-HUB', href: '#wat' },
                { label: 'De vier sporen', href: '#sporen' },
                { label: 'Het netwerk', href: '#netwerk' },
                { label: 'Initiatieven', href: '#initiatieven' },
                { label: 'Meld je vraag', href: '#meld' },
                { label: 'Inspiratie', href: '#inspiratie' },
              ].map(item => (
                <a key={item.href} href={item.href} className="block text-blue-200 hover:text-white transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold mb-4 text-sm uppercase tracking-wider text-blue-300">Externe partners</div>
            <div className="space-y-2 text-sm">
              {[
                { label: 'SURF', href: 'https://www.surf.nl' },
                { label: 'GPT-NL', href: 'https://gptnl.nl' },
                { label: 'NPULS Geletterdheid', href: 'https://npuls.nl/onderwerpen/digitale-geletterdheid' },
                { label: 'Vereniging Hogescholen', href: 'https://www.vereniginghogescholen.nl' },
              ].map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  {item.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-blue-300">
          <div>
            © 2026 NHL Stenden Hogeschool · Transitieprogramma Digitalisering
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-nhl-oranje rounded-full pulse-soft" />
            <span>AI-HUB versie 1.0 — In ontwikkeling</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
