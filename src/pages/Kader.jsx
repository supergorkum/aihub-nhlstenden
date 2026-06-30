import { Link } from 'react-router-dom'
import GradientHeader from '../components/GradientHeader'

const KADER_ONDERDELEN = [
  {
    icon: '🏛️',
    titel: 'AI-Governance',
    tekst: 'Het sturingsmodel: hoe initiatieven van idee tot uitrol worden begeleid, wie waarover beslist en hoe risico\'s worden geclassificeerd.',
    to: '/governance',
    kleur: '#1E3A8A',
  },
  {
    icon: '📋',
    titel: 'Beleid & Kaders',
    tekst: 'De vastgestelde en in ontwikkeling zijnde beleidskaders rond AI bij NHL Stenden.',
    to: '/beleid',
    kleur: '#0F766E',
  },
  {
    icon: '⚖️',
    titel: 'AI Act & Compliance',
    tekst: 'Risicoclassificatie van AI-toepassingen conform de EU AI Act, en wat dat betekent voor lopende en nieuwe initiatieven.',
    to: '/initiatieven?tab=aiact',
    kleur: '#7C3AED',
  },
  {
    icon: '🗺️',
    titel: 'Roadmap',
    tekst: 'De geplande en lopende speerpunten op het gebied van governance en compliance, met status en verantwoordelijke.',
    to: '/initiatieven?tab=roadmap',
    kleur: '#B45309',
  },
]

export default function Kader() {
  return (
    <div className="min-h-screen pt-16 bg-white">
      <GradientHeader
        label="Het speelveld"
        title="Kader"
        subtitle="Governance, beleid, AI Act en roadmap bij elkaar: de spelregels voor verantwoord AI-gebruik bij NHL Stenden."
      />

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="rounded-xl p-4 flex items-start gap-3 mb-12" style={{ background: '#EFF6FF', border: '1px solid #DBEAFE' }}>
          <span className="text-xl flex-shrink-0">🔗</span>
          <p className="text-sm text-gray-600 leading-relaxed">
            Deze pagina is een verbindend overzicht. Voor de volledige, actuele uitwerking per onderwerp ga je naar de bronpagina via de kaarten hieronder.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {KADER_ONDERDELEN.map(o => (
            <Link key={o.titel} to={o.to} className="card card-hover p-6 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: o.kleur + '15' }}>
                  {o.icon}
                </div>
                <div className="font-bold text-nhl-blauw group-hover:text-nhl-roze transition-colors">{o.titel}</div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">{o.tekst}</p>
              <span className="text-sm font-medium" style={{ color: o.kleur }}>Bekijken →</span>
            </Link>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-white">🧪</div>
            <div className="font-bold text-nhl-blauw">Sandbox: technisch en regulatoir</div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Nieuwe AI-toepassingen worden eerst getest in een afgeschermde technische sandbox of, bij hoog risico, begeleid via de regulatory sandbox met juridische toetsing aan de AI Act en AVG. De volledige werkwijze en voorwaarden staan beschreven bij AI-Governance.
          </p>
          <Link to="/governance" className="text-sm font-medium text-nhl-blauw hover:text-nhl-roze transition-colors">Lees over de sandbox-werkwijze →</Link>
        </div>
      </div>
    </div>
  )
}
