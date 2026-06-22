import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-nhl-blauw text-white" style={{ background: 'linear-gradient(180deg, #0F1E52 0%, #162D6E 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">

          {/* Branding */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <img src="/logo-AIHUB.png" alt="AI-HUB" className="h-10 w-10 bg-white rounded-xl p-1 object-contain shadow" />
              <div className="h-10 w-px bg-white/20" />
              <img src="/nhl-logo.png" alt="NHL Stenden" className="h-9 object-contain" />
            </div>
            <div className="text-white font-bold text-base mb-1">AI-HUB NHL Stenden</div>
            <div className="text-blue-300 text-xs mb-4">Samen slimmer & verantwoord</div>
            <p className="text-blue-200 text-sm leading-relaxed">
              De centrale plek waar NHL Stenden alles rond AI samenbrengt: wat we doen, wie we zijn en hoe we het verantwoord aanpakken.
            </p>
          </div>

          {/* Navigatie — alfabetisch */}
          <div>
            <div className="font-semibold mb-4 text-xs uppercase tracking-wider text-blue-300">Navigatie</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {[
                ['/', 'Start'],
                ['/bronnen', 'Bronnen'],
                ['/documentatie', 'Documentatie'],
                ['/evenementen', 'Evenementen'],
                ['/fundament', 'Fundament'],
                ['/initiatieven', 'Initiatieven'],
                ['/inspiratie', 'Inspiratie'],
                ['/meld', 'Vraag of idee'],
                ['/netwerk', 'Netwerk'],
                ['/over', 'Over de HUB'],
                ['/pilots', 'Pilots'],
                ['/themas', "Thema's"],
                ['/video', "Video's"],
              ].map(([to, label]) => (
                <Link key={to} to={to} className="text-blue-200 hover:text-white transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          {/* Externe partners */}
          <div>
            <div className="font-semibold mb-4 text-xs uppercase tracking-wider text-blue-300">Externe partners</div>
            <div className="space-y-3 text-sm">
              {[
                ['https://www.surf.nl', 'SURF', 'Samenwerkingsorganisatie ICT in het onderwijs'],
                ['https://gptnl.nl', 'GPT-NL', 'Soeverein Nederlands taalmodel'],
                ['https://npuls.nl', 'NPULS', 'Nationaal programma digitale geletterdheid'],
                ['https://www.vereniginghogescholen.nl', 'Vereniging Hogescholen', 'Koepelorganisatie hogescholen'],
              ].map(([href, label, sub]) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="block group">
                  <div className="text-blue-100 group-hover:text-white transition-colors font-medium">{label} ↗</div>
                  <div className="text-blue-400 text-xs">{sub}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-blue-300">
          <div className="flex items-center gap-4">
            <span>© 2026 NHL Stenden Hogeschool</span>
            <span className="text-blue-500">·</span>
            <span>Transitieprogramma Digitalisering</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-nhl-roze rounded-full pulse-soft" />
              <span>Versie 1.0 — In ontwikkeling</span>
            </div>
            <Link to="/beheer" className="text-blue-400 hover:text-blue-200 transition-colors">Beheer ↗</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
