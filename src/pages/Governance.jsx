import GradientHeader from '../components/GradientHeader'
import { useState } from 'react'

const THEMAS = [
  { nr: '01', naam: 'AI & Leren', kleur: '#1E3A8A', afdeling: 'OO&I', deelnemers: 'Docenten, studenten, toetscommissies, EduGenAI-gebruikers', indicator: '100% domeinen met AI-positie in OER' },
  { nr: '02', naam: 'AI & Werken', kleur: '#0F766E', afdeling: 'DLWO', deelnemers: 'IV-organisatie, P&O, diensten, DLWO', indicator: '5+ processen verbeterd en gedocumenteerd' },
  { nr: '03', naam: 'AI & Verantwoordelijkheid', kleur: '#E91E8C', afdeling: 'Concernstaf', deelnemers: 'AI officer, data manager, informatiemanager', indicator: 'Jaarrapportage CvB en HMR' },
  { nr: '04', naam: 'AI & Geletterdheid', kleur: '#7C3AED', afdeling: 'OO&I, HRM & DLWO', deelnemers: 'ARDA-ambassadeurs, MyAcademy, bibliotheek, studenten', indicator: '80% medewerkers basisniveau bereikt' },
  { nr: '05', naam: 'AI & Werkveld', kleur: '#B45309', afdeling: 'Academie', deelnemers: 'Werkveldcommissies, regionale partners, Frisius MC', indicator: 'Elk domein: AI in kernonderdeel curriculum' },
  { nr: '06', naam: 'AI & Onderzoek', kleur: '#0E7490', afdeling: 'OO&I & Lectoraat', deelnemers: 'Lectoraten, data manager, bibliotheek, kennisinstellingen', indicator: '2+ lectoraten actief in AI-Netwerk' },
]

const STAPPEN = [
  { nr: 1, icon: '💡', titel: 'Initiatief of idee', tekst: 'Een medewerker, team of academie wil een AI-toepassing verkennen of inzetten. Het idee wordt aangemeld via het AI-Netwerk of de relevante spreektafel.' },
  { nr: 2, icon: '📋', titel: 'Intake en doeldefinitie', tekst: 'De spreektafel beoordeelt het initiatief: wat is het doel, welke data is betrokken, past het bij de koers? Een korte use case beschrijving maakt de toepassing concreet.' },
  { nr: 3, icon: '🔍', titel: 'Risicoanalyse en classificatie', tekst: 'De toepassing wordt geclassificeerd conform de EU AI Act (minimaal, beperkt, hoog of onaanvaardbaar risico). Bij hoog-risico volgt een DPIA-toets voor ingebruikname.' },
  { nr: 4, icon: '🧪', titel: 'Pilot via de sandbox', tekst: 'Goedgekeurde toepassingen worden eerst als pilot uitgevoerd in de technische sandbox, op geanonimiseerde of gesimuleerde data. Resultaten worden gedocumenteerd.' },
  { nr: 5, icon: '📊', titel: 'Evaluatie en besluit', tekst: 'De pilot wordt geëvalueerd op effectiviteit, ethiek en impact. Het AI-Netwerk deelt de uitkomst. Bij positieve evaluatie besluit de eigenaar (directeur) over bredere uitrol.' },
  { nr: 6, icon: '🚀', titel: 'Uitrol en kennisdeling', tekst: 'Succesvolle toepassingen worden breder ingezet en gedeeld via het AI-Netwerk zodat andere teams kunnen leren. De toepassing wordt opgenomen in het algoritmeregister.' },
]

const VOORBEELDEN = [
  {
    titel: 'Vroegsignalering uitval',
    thema: 'AI & Leren',
    kleur: '#1E3A8A',
    situatie: 'Een opleiding wil een AI-model inzetten dat studenten met verhoogd uitvalrisico vroegtijdig signaleert op basis van studiegedrag.',
    aanpak: 'Aanmelding via spreektafel AI & Leren. Classificatie: hoog-risico (beslissingen raken studenten). DPIA-toets verplicht. Pilot op geanonimiseerde historische data in de technische sandbox. Menselijk toezicht door studieloopbaanbegeleider verplicht: AI geeft signaal, begeleider neemt contact op.',
    resultaat: 'Na positieve evaluatie breed uitgerold. Gedocumenteerd in kennisbank. Begeleiders getraind in verantwoord gebruik van het systeem.',
    waarborg: 'Geen geautomatiseerde besluitvorming. Student wordt altijd benaderd door een mens.',
  },
  {
    titel: 'AI-assistent voor administratieve afhandeling',
    thema: 'AI & Werken',
    kleur: '#0F766E',
    situatie: 'Een dienst wil een AI-chatbot inzetten voor het beantwoorden van veelgestelde vragen over roosters, inschrijvingen en faciliteiten.',
    aanpak: 'Aanmelding via spreektafel AI & Werken. Classificatie: beperkt risico (transparantieverplichting: gebruiker moet weten dat het om AI gaat). Pilot in sandbox met testgebruikers. Acceptable AI Use Policy is leidend voor wat de bot wel en niet mag zeggen.',
    resultaat: 'Minder administratieve last bij de balie. Medewerkers houden meer tijd over voor complexe vragen. Periodieke meting van kwaliteit en klanttevredenheid.',
    waarborg: 'Bot geeft altijd aan dat het een AI-assistent betreft. Doorschakeling naar mens altijd mogelijk.',
  },
  {
    titel: 'AI-ondersteunde feedback op schrijfopdrachten',
    thema: 'AI & Leren',
    kleur: '#1E3A8A',
    situatie: 'Een docent wil AI gebruiken om studenten sneller en consistenter feedback te geven op tussentijdse schrijfopdrachten.',
    aanpak: 'Aanmelding via spreektafel AI & Leren. Classificatie: hoog-risico (raakt beoordeling). Pilot binnen de regulatory sandbox met juridische begeleiding. Docent stelt de eindnorm en verifieert alle AI-gegenereerde feedback. Geen persoonsgegevens in de externe AI-tool: alleen geanonimiseerde tekst.',
    resultaat: 'Studenten ontvangen sneller en uitgebreider formatieve feedback. Docent houdt regie over eindoordeel. Bevindingen gedeeld via AI-Netwerk.',
    waarborg: 'Docent is altijd eindverantwoordelijk voor feedback en beoordeling. AI ondersteunt, beslist niet.',
  },
]

const SANDBOXES = [
  {
    icon: '🧪',
    titel: 'Technische sandbox',
    kleur: '#1E3A8A',
    bg: '#EFF6FF',
    border: '#DBEAFE',
    punten: [
      'Afgeschermde omgeving voor veilig testen van AI-toepassingen',
      'Alleen geanonimiseerde of gesimuleerde data',
      'Toegankelijk voor alle spreektafels van het AI-Netwerk',
      'Pilots die de sandbox doorlopen krijgen een kwaliteitslabel',
      'Inrichting via DLWO in samenwerking met SURF',
    ],
  },
  {
    icon: '⚖️',
    titel: 'Regulatory sandbox',
    kleur: '#7C3AED',
    bg: '#FAF5FF',
    border: '#E9D5FF',
    punten: [
      'Juridisch begeleidingstraject voor complexe of hoog-risico toepassingen',
      'Toetsing aan EU AI Act, AVG en ethisch waardenkompas',
      'Begeleiding bij toepassingen die raken aan beslissingen over studenten',
      'Betrokkenheid van compliance, privacy en security expertise',
      'Verplicht bij AI-ondersteunde studieloopbaanbegeleiding of toetsing',
    ],
  },
]

const WAARBORGEN = [
  { icon: '🔒', titel: 'Privacy by design', tekst: 'Geen echte studentdata in pilots tenzij via vastgesteld DPIA-proces. Anonimisering en pseudonimisering als standaard.' },
  { icon: '👁️', titel: 'Menselijk toezicht', tekst: 'AI neemt geen autonome besluiten over studenten zonder menselijke verificatie. Elke output heeft een menselijk vangnet.' },
  { icon: '📢', titel: 'Transparantie', tekst: 'Studenten en medewerkers worden geïnformeerd wanneer AI een rol speelt in processen die hen raken. Geen verborgen algoritmen.' },
  { icon: '📂', titel: 'Documentatie', tekst: 'Elke pilot wordt gedocumenteerd: doel, dataset, uitkomst, geleerde lessen. Het AI-Netwerk beheert een centrale kennisbank.' },
  { icon: '🛑', titel: 'Stoprecht', tekst: 'Elke pilot heeft een exitcriterium. Als ongewenste effecten optreden wordt de pilot direct gestaakt en geëvalueerd.' },
  { icon: '🌍', titel: 'Digitale autonomie', tekst: 'Data blijft bij voorkeur onder Europese jurisdictie. Cloudkeuzes worden getoetst op afhankelijkheidsrisico\'s.' },
]

export default function Governance() {
  const [actief, setActief] = useState(null)

  return (
    <div className="min-h-screen pt-16 bg-white">
      <GradientHeader
        label="AI-Governance — In ontwerp"
        title="Hoe we AI organiseren"
        subtitle="Het governance-ontwerp voor de AI-Koers van NHL Stenden. Dit model is in ontwikkeling en vormt de basis voor bestuurlijk gesprek en brede consultatie."
      />

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="rounded-xl p-4 flex items-start gap-3 mb-12" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
          <span className="text-xl flex-shrink-0">🚧</span>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#92400E' }}>In ontwerp — nog niet vastgesteld</p>
            <p className="text-sm" style={{ color: '#78350F' }}>Dit governance-model is een concept dat ter consultatie en bestuurlijke bespreking voorligt. De structuur, rollen en werkwijzen worden de komende periode verder uitgewerkt en vastgesteld door de Stuurgroep Transitieprogramma.</p>
          </div>
        </div>

        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ background: '#EFF6FF', color: '#1E3A8A' }}>Het sturingsmodel</span>
          <h2 className="text-2xl font-bold" style={{ color: '#162D6E' }}>AI-Netwerk als coördinerende kern</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-sm">Het hybride governance-model combineert centrale richting vanuit de Stuurgroep met decentraal eigenaarschap bij academies en diensten. Het AI-Netwerk verbindt de zes spreektafels en bewaakt de samenhang.</p>
        </div>

        <div className="relative mb-12">
          <div className="flex justify-center mb-6">
            <div className="rounded-2xl px-8 py-4 text-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, #162D6E 0%, #1E3A8A 60%, #2563EB 100%)', minWidth: 340 }}>
              <div className="text-xs font-normal opacity-75 mb-1">Bestuurlijk niveau</div>
              College van Bestuur &amp; Stuurgroep Transitieprogramma
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="flex flex-col items-center">
              <div style={{ width: 2, height: 32, background: '#DBEAFE' }} />
              <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid #DBEAFE' }} />
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <div className="rounded-2xl px-8 py-5 text-center border-2" style={{ background: '#EFF6FF', borderColor: '#1E3A8A', minWidth: 280 }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#E91E8C' }}>Coördinerende kern</div>
              <div className="font-extrabold text-lg" style={{ color: '#162D6E' }}>AI-Netwerk NHL Stenden</div>
              <div className="text-xs mt-1" style={{ color: '#64748b' }}>Kwartiermaker Digitale Samenhang</div>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="flex flex-col items-center">
              <div style={{ width: 2, height: 32, background: '#DBEAFE' }} />
              <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid #DBEAFE' }} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {THEMAS.map(t => (
              <button key={t.nr}
                onClick={() => setActief(actief === t.nr ? null : t.nr)}
                className="rounded-xl p-4 text-left transition-all hover:shadow-md"
                style={{ background: actief === t.nr ? t.kleur : '#fff', border: `2px solid ${t.kleur}`, color: actief === t.nr ? 'white' : t.kleur }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-black text-sm">{t.nr}</span>
                  <span className="font-bold text-sm">{t.naam}</span>
                </div>
                <div className="text-xs opacity-75">{t.afdeling}</div>
                {actief === t.nr && (
                  <div className="mt-3 pt-3 border-t border-white/30 text-xs space-y-1">
                    <div><span className="font-semibold">Deelnemers:</span> {t.deelnemers}</div>
                    <div><span className="font-semibold">Indicator 2030:</span> {t.indicator}</div>
                  </div>
                )}
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">Klik op een thema voor meer details</p>
        </div>

        <div className="rounded-xl p-4 mb-12 flex items-center gap-3" style={{ background: '#F8F9FB', border: '1px solid #E2E8F0' }}>
          <span className="text-xl">🏛️</span>
          <div>
            <p className="text-sm font-semibold text-gray-700">Medezeggenschapsorganen</p>
            <p className="text-xs text-gray-500">De HMR wordt betrokken bij vaststelling van de AI-Koers en bij jaarlijkse herijking. Significante beslissingen die raken aan arbeidsomstandigheden of onderwijs worden voorgelegd conform de reguliere medezeggenschapsprocedures.</p>
          </div>
        </div>

        <div className="mb-12">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ background: '#EFF6FF', color: '#1E3A8A' }}>Werkwijze</span>
            <h2 className="text-2xl font-bold" style={{ color: '#162D6E' }}>Van idee naar verantwoorde toepassing</h2>
            <p className="text-gray-500 mt-2 text-sm">Elk AI-initiatief doorloopt een gestructureerd proces met heldere stappen en verantwoordelijkheden.</p>
          </div>
          <div className="space-y-4">
            {STAPPEN.map((s) => (
              <div key={s.nr} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: '#1E3A8A' }}>
                  {s.nr}
                </div>
                <div className="flex-1 rounded-xl p-4" style={{ background: '#F8F9FB', border: '1px solid #E2E8F0' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span>{s.icon}</span>
                    <span className="font-semibold text-sm" style={{ color: '#162D6E' }}>{s.titel}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{s.tekst}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ background: '#EFF6FF', color: '#1E3A8A' }}>Praktijk</span>
            <h2 className="text-2xl font-bold" style={{ color: '#162D6E' }}>Drie voorbeelden van hoe het werkt</h2>
            <p className="text-gray-500 mt-2 text-sm">Concrete situaties die laten zien hoe het governance-proces in de praktijk verloopt.</p>
          </div>
          <div className="space-y-4">
            {VOORBEELDEN.map((v, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="px-6 py-4 text-white" style={{ background: v.kleur }}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.2)' }}>{v.thema}</span>
                    <h3 className="font-bold">{v.titel}</h3>
                  </div>
                </div>
                <div className="p-6 grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#9ca3af' }}>Situatie</p>
                    <p className="text-sm text-gray-600">{v.situatie}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#9ca3af' }}>Aanpak</p>
                    <p className="text-sm text-gray-600">{v.aanpak}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#9ca3af' }}>Resultaat & waarborg</p>
                    <p className="text-sm text-gray-600 mb-2">{v.resultaat}</p>
                    <div className="rounded-lg p-2 text-xs" style={{ background: '#FEF9C3', color: '#713F12' }}>
                      ⚠️ {v.waarborg}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ background: '#EFF6FF', color: '#1E3A8A' }}>Experimenteerruimte</span>
            <h2 className="text-2xl font-bold" style={{ color: '#162D6E' }}>Veilig, transparant en experimenteren onder toezicht</h2>
            <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">NHL Stenden wil AI niet alleen begrijpen maar ook bewust uitproberen. Daarvoor zijn twee georganiseerde experimenteerruimten beschikbaar.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {SANDBOXES.map(s => (
              <div key={s.titel} className="rounded-2xl p-6" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{s.icon}</span>
                  <h3 className="font-bold text-lg" style={{ color: s.kleur }}>{s.titel}</h3>
                </div>
                <ul className="space-y-2">
                  {s.punten.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-0.5 flex-shrink-0" style={{ color: s.kleur }}>·</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {WAARBORGEN.map(w => (
              <div key={w.titel} className="rounded-xl p-4" style={{ background: '#F8F9FB', border: '1px solid #E2E8F0' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{w.icon}</span>
                  <span className="font-semibold text-sm" style={{ color: '#162D6E' }}>{w.titel}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{w.tekst}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-8 mb-12 text-white" style={{ background: 'linear-gradient(135deg, #162D6E 0%, #1E3A8A 60%, #2563EB 100%)' }}>
          <h3 className="font-bold text-lg mb-4">Volgende stappen in de governance-ontwikkeling</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { periode: '2026 — Funderen', punten: ['Governancestructuur vaststellen', 'AI Act-classificatie alle toepassingen', 'Technische sandbox inrichten', 'Eerste compliance-capaciteit', 'Intake-procedure live'] },
              { periode: '2027-28 — Uitbouwen', punten: ['Regulatory sandbox operationeel', 'Compliance per toepassing actief', 'Eerste jaarrapportage CvB en HMR', 'Kennisbank pilotresultaten actief'] },
              { periode: '2029-30 — Verankeren', punten: ['Gevalideerd governance-framework', 'Jaarlijkse herijking AI-Koers', 'Algoritmeregister volledig', 'Regionale kennisrol zichtbaar'] },
            ].map(s => (
              <div key={s.periode}>
                <p className="font-bold text-sm mb-3" style={{ color: '#bfdbfe' }}>{s.periode}</p>
                <ul className="space-y-1.5">
                  {s.punten.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-blue-100">
                      <span className="mt-0.5 flex-shrink-0" style={{ color: '#E91E8C' }}>·</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
