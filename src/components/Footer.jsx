import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-nhl-blauw-dark text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo-AIHUB.png" alt="AI-HUB" className="h-8 w-8 bg-white rounded-lg p-0.5 object-contain" />
              <div>
                <div className="font-bold text-sm">AI-HUB NHL Stenden</div>
                <div className="text-blue-300 text-xs">Samen slimmer & verantwoord</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">De centrale plek waar NHL Stenden alles rond AI samenbrengt.</p>
          </div>
          <div>
            <div className="font-semibold mb-4 text-xs uppercase tracking-wider text-blue-300">Navigatie</div>
            <div className="space-y-2 text-sm">
              {[['/', 'Start'],['/over','Over de HUB'],['/sporen','Sporen'],['/netwerk','Netwerk'],['/initiatieven','Initiatieven'],['/documentatie','Documentatie'],['/meld','Meld je in'],['/inspiratie','Inspiratie']].map(([to, label]) => (
                <Link key={to} to={to} className="block text-blue-200 hover:text-white transition-colors">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold mb-4 text-xs uppercase tracking-wider text-blue-300">Externe partners</div>
            <div className="space-y-2 text-sm">
              {[['https://www.surf.nl','SURF'],['https://gptnl.nl','GPT-NL'],['https://npuls.nl/onderwerpen/digitale-geletterdheid','NPULS'],['https://www.vereniginghogescholen.nl','Vereniging Hogescholen']].map(([href, label]) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="block text-blue-200 hover:text-white transition-colors">{label} ↗</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-blue-300">
          <div>© 2026 NHL Stenden Hogeschool · Transitieprogramma Digitalisering</div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-nhl-roze rounded-full pulse-soft" /><span>Versie 1.0 — In ontwikkeling</span></div>
            <Link to="/beheer" className="text-blue-400 hover:text-blue-200 transition-colors">Beheer</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
