import GradientHeader from '../components/GradientHeader'
import { Link } from 'react-router-dom'

const SECTIES = [
  {
    id: 'doelstellingen',
    titel: '🎯 Doelstellingen gebruik AI',
    items: [
      'Verkennen en toepassen van AI om de leerervaring van studenten te verrijken en de effectiviteit van het onderwijs te vergroten, met inachtneming van ethische en wettelijke kaders.',
      'Integreren van AI-vaardigheden en -kennis in de curricula van onze opleidingen, met als doel studenten voor te bereiden op een beroepspraktijk waarin AI een belangrijke rol speelt.',
      'Het inzetten van AI om docent-onderzoekers te ondersteunen bij het ontwikkelen van innovatieve onderwijsconcepten en het uitvoeren van praktijkgericht onderzoek.',
      'Werken aan een efficiëntere bedrijfsvoering: AI kan worden toegepast om administraties, inschrijvingen, roosters en evaluaties te automatiseren.',
      'Het gebruiken van AI om data-analyse te verbeteren en beter geïnformeerde beslissingen te nemen op basis van data-inzichten.',
      'Het aanbieden van trainingen en workshops voor docenten, medewerkers en studenten om hun AI-vaardigheden te verbeteren.',
    ]
  },
  {
    id: 'kaders',
    titel: '⚖️ Algemene kaders voor verantwoorde inzet',
    items: [
      'Wet- en regelgeving: AI-toepassingen voldoen aan de AVG en de Europese AI-wetgeving (AI Act).',
      'Risicogestuurde aanpak: aanschaf of gebruik wordt altijd vooraf gevalideerd via een interne AI en privacy scan.',
      'Proportionele inzet: de impact van AI is in verhouding met de beoogde NHL Stenden doelen.',
      'Transparantie: AI-toepassingen worden bijgehouden in een centraal algoritmeregister.',
      'Menselijk toezicht: er is altijd passend menselijk toezicht voor alle AI-systemen.',
      'Transparantie van AI-systemen: werking moet traceerbaar zijn, met documentatie van trainingsgegevens en beslissingen.',
      'Impact op betrokkenen: AI-systemen moeten oneerlijke vooroordelen vermijden en zorgen voor gelijke behandeling.',
      'Onderwijs: we hanteren de NVAO en BKO standaarden.',
      'Verantwoording: het moet duidelijk zijn wie verantwoordelijk is voor de werking van AI-systemen.',
      'AI-geletterdheid: we zorgen ervoor dat medewerkers voldoende kennis hebben van en het werken met AI.',
      'Experimenteren en innovatie: we bieden experimenteerruimte, altijd binnen de grenzen van wet- en regelgeving.',
    ]
  },
]

const RISICO_NIVEAUS = [
  { level: 'Onaanvaardbaar risico', kleur: '#DC2626', bg: '#FEF2F2', omschrijving: 'Systemen die fundamentele rechten bedreigen, zoals social scoring of manipulatieve systemen. Verboden binnen NHL Stenden.' },
  { level: 'Hoog risico', kleur: '#D97706', bg: '#FFFBEB', omschrijving: 'Systemen met significante impact op onderwijs, beoordeling of privacygevoelige processen (bijv. beoordelingssystemen). Alleen onder strenge voorwaarden.' },
  { level: 'Beperkt risico', kleur: '#0F766E', bg: '#F0FDFA', omschrijving: 'Systemen met transparantieverplichtingen, zoals chatbots. Vereisen een kennisgeving dat het om AI gaat.' },
  { level: 'Minimaal risico', kleur: '#374151', bg: '#F9FAFB', omschrijving: 'Overige AI-systemen zoals spamfilters. Reguliere zorgvuldigheid volstaat.' },
]

const RICHTLIJNEN = [
  { nr: 1, titel: 'Wees zorgvuldig met je gegevensinvoer', tekst: 'Voer geen persoonsgegevens (namen, adressen) of vertrouwelijke informatie in bij niet-goedgekeurde AI-tools. Dit geldt ook voor gegevens van studenten, onderzoekspartners of opdrachtgevers.' },
  { nr: 2, titel: 'Wees zorgvuldig met je account', tekst: 'Gebruik je NHL Stenden e-mailadres niet om een account aan te maken bij externe AI-tools. Houd er rekening mee dat ingevoerde data eigendom wordt van het bedrijf.' },
  { nr: 3, titel: 'Doorloop de AI-risicoscan', tekst: 'Het aanschaffen of gebruiken van AI-toepassingen wordt altijd vooraf gevalideerd. Neem contact op met het AI compliance team via aicompliance@nhlstenden.com.' },
  { nr: 4, titel: 'Doorloop de privacy QuickScan', tekst: 'Bij gebruik van AI voor diagnostische doeleinden, studentenbeoordelingen of bijzondere persoonsgegevens is voorafgaande validatie vereist. Contact: Team Privacy & Security.' },
  { nr: 5, titel: 'Let op ethisch en verantwoord gebruik', tekst: 'Stel jezelf de vraag of het gebruik een negatief effect op iemand kan hebben. AI-toepassingen kunnen vooringenomenheid bevatten als gevolg van de gebruikte trainingsdata.' },
  { nr: 6, titel: 'Houd je aan de Acceptable Use Policy', tekst: 'In de AUP staan de meest recente regels ten aanzien van het gebruik van ICT-systemen. Gebruik altijd een sterk wachtwoord.' },
  { nr: 7, titel: 'Bedenk dat AI veel energie verbruikt', tekst: 'Het energieverbruik van AI-servers is hoog. Gebruik ze alleen wanneer ze meerwaarde bieden en deel output met collega\'s zodat de AI niet opnieuw bevraagd hoeft te worden.' },
  { nr: 8, titel: 'Overweeg lokale AI en open source', tekst: 'Lokale AI-systemen (edge AI) minimaliseren datadeling, versterken digitale soevereiniteit en bieden onafhankelijkheid van derde partijen. Zeer geschikt waar privacy voorop staat.' },
]

const GOVERNANCE_ROLLEN = [
  { rol: 'College van Bestuur', taken: ['Stelt het beleid, de maatregelen en procedures vast.', 'Besluit over aanschaf van hoog-risico AI op basis van advies AI-compliance team.'] },
  { rol: 'AI-compliance team', taken: ['Multidisciplinair adviesteam. Beoordeelt risico\'s van AI-systemen.', 'Geeft advies aan bestuur en directeur over hoog-risico AI.', 'Geeft advies aan eigenaar (directeur) over laag-risico AI.'] },
  { rol: 'Privacy & security team', taken: ['Privacy Officer geeft advies en ondersteuning bij het reduceren van privacyrisico\'s.'] },
  { rol: 'Directeur', taken: ['Verantwoordelijk voor uitvoering van dit beleid binnen eigen academie of dienst.', 'Zorgdragen voor voldoende AI-kennis bij gebruik van AI-systemen.', 'Verantwoordelijk voor uitvoeren van een AI-risicoscan.'] },
  { rol: 'Leidinggevende', taken: ['Zorgen dat medewerkers op de hoogte zijn van het beleid.', 'Toezien op naleving van het beleid.', 'Periodiek AI als onderwerp agenderen in werkoverleggen.'] },
  { rol: 'Gebruikers', taken: ['Naleving richtlijnen.'] },
]

// Beleid PDF als base64 download helper
// We linken naar de Documentatie pagina voor de daadwerkelijke download
export default function Beleid({ docs }) {
  const beleidsDoc = docs?.find(d =>
    d.titel?.toLowerCase().includes('ai compliance') ||
    d.titel?.toLowerCase().includes('ai beleid') ||
    d.bestandNaam?.toLowerCase().includes('ai_beleid')
  )

  return (
    <div className="min-h-screen pt-16 bg-white">
      <GradientHeader
        label="Beleid & Governance"
        title="AI Compliance Beleid"
        subtitle="Governance, kaders en richtlijnen voor verantwoord gebruik van AI bij NHL Stenden — versie 2.0, vastgesteld door het College van Bestuur op 16 december 2025."
      >
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/documentatie"
            className="inline-flex items-center gap-2 bg-white text-nhl-blauw hover:bg-blue-50 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            ⬇ Download PDF (Documentatie)
          </Link>
          <a
            href="mailto:aicompliance@nhlstenden.com"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            ✉ Contact AI Compliance Team
          </a>
        </div>
      </GradientHeader>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* Metainfo */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Versie</div>
              <div className="font-bold text-nhl-blauw">2.0 — Definitief</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Vastgesteld</div>
              <div className="font-bold text-nhl-blauw">16 december 2025</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Door</div>
              <div className="font-bold text-nhl-blauw">College van Bestuur</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Auteurs</div>
              <div className="text-gray-700">E.T. Posthuma (CISO), A.F.B. Zijlstra (Informatiemanager), R. Reinders (beleidsadviseur)</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Contact</div>
              <div className="text-gray-700">
                <a href="mailto:aicompliance@nhlstenden.com" className="text-nhl-roze hover:underline">aicompliance@nhlstenden.com</a>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Herziening</div>
              <div className="text-gray-700">Meerdere malen per jaar</div>
            </div>
          </div>
        </div>

        {/* Inleiding */}
        <div>
          <h2 className="text-xl font-extrabold text-nhl-blauw mb-4">Inleiding</h2>
          <div className="prose prose-sm max-w-none text-gray-600 space-y-3 leading-relaxed">
            <p>Artificiële Intelligentie is bezig aan een snelle opmars in diverse sectoren, waaronder het hoger onderwijs. AI-toepassingen bieden ongekende mogelijkheden om de leerervaring van studenten te verrijken, onderzoek te versnellen en bedrijfsprocessen te optimaliseren. Tegelijkertijd roept de inzet van AI ook vragen op rond ethiek, privacy en digitale vaardigheden.</p>
            <p>Veel AI-toepassingen (niet open source) voldoen op dit moment niet aan de AVG-wetgeving. Vaak staan de servers buiten de EU en is het volstrekt onduidelijk wat er met het ingevoerde materiaal gebeurt. Als kennisinstelling ziet NHL Stenden het als haar verantwoordelijkheid om op een verantwoorde en doordachte manier met deze technologie om te gaan.</p>
            <p>Een visie op AI moet nog verder ontwikkeld en geïntegreerd worden in beleidsdocumenten op het gebied van onderwijs, onderzoek, HRM en informatiebeveiliging. Dit document is een startpunt voor een voortdurende dialoog over de rol van AI binnen onze hogeschool.</p>
          </div>
        </div>

        {/* Doelstellingen en kaders */}
        {SECTIES.map(sectie => (
          <div key={sectie.id}>
            <h2 className="text-xl font-extrabold text-nhl-blauw mb-4">{sectie.titel}</h2>
            <div className="space-y-2">
              {sectie.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-nhl-blauw text-white rounded-full text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Risicoclassificatie */}
        <div>
          <h2 className="text-xl font-extrabold text-nhl-blauw mb-2">Risicoclassificatie AI (AI Act)</h2>
          <p className="text-sm text-gray-500 mb-5">NHL Stenden hanteert een risicogestuurde aanpak conform de Europese AI Act. Systemen worden geclassificeerd op vier niveaus.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {RISICO_NIVEAUS.map(r => (
              <div key={r.level} className="rounded-xl p-5 border" style={{ backgroundColor: r.bg, borderColor: r.kleur + '40' }}>
                <div className="font-bold text-sm mb-2" style={{ color: r.kleur }}>{r.level}</div>
                <p className="text-xs text-gray-600 leading-relaxed">{r.omschrijving}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Governance tabel */}
        <div>
          <h2 className="text-xl font-extrabold text-nhl-blauw mb-4">🏛️ AI-Governance</h2>
          <div className="space-y-3">
            {GOVERNANCE_ROLLEN.map(r => (
              <div key={r.rol} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="font-bold text-nhl-blauw text-sm mb-2">{r.rol}</div>
                <ul className="space-y-1">
                  {r.taken.map((taak, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-nhl-roze mt-0.5 flex-shrink-0">›</span>
                      <span>{taak}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Richtlijnen gebruik */}
        <div>
          <h2 className="text-xl font-extrabold text-nhl-blauw mb-2">📋 Richtlijnen voor eigen gebruik</h2>
          <p className="text-sm text-gray-500 mb-5">Voor AI-tools die medewerkers en studenten op eigen initiatief gebruiken (zoals Google Gemini, Anthropic Claude of ChatGPT) gelden de volgende richtlijnen.</p>
          <div className="space-y-3">
            {RICHTLIJNEN.map(r => (
              <div key={r.nr} className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-nhl-blauw/10 text-nhl-blauw rounded-full font-bold text-sm flex items-center justify-center">{r.nr}</span>
                <div>
                  <div className="font-semibold text-gray-800 text-sm mb-1">{r.titel}</div>
                  <p className="text-sm text-gray-500 leading-relaxed">{r.tekst}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact + download */}
        <div className="nhl-gradient-deep rounded-2xl p-8 text-white">
          <h2 className="text-xl font-extrabold mb-3">📄 Document downloaden</h2>
          <p className="text-blue-100 text-sm mb-5">
            Het volledige AI Compliance Beleid NHL Stenden v2.0 is beschikbaar als PDF via de Documentatie-sectie van het AI-Netwerk.
            Het Engelstalige beleid (AI compliance policy v2.0) is ook beschikbaar.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/documentatie"
              className="inline-flex items-center gap-2 bg-white text-nhl-blauw hover:bg-blue-50 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors"
            >
              ⬇ Naar Documentatie (PDF download)
            </Link>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20 grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-blue-200 text-xs mb-1">Algemeen</div>
              <a href="mailto:cio-office@nhlstenden.com" className="text-white hover:text-blue-200">cio-office@nhlstenden.com</a>
            </div>
            <div>
              <div className="text-blue-200 text-xs mb-1">AI Risicoscan</div>
              <a href="mailto:aicompliance@nhlstenden.com" className="text-white hover:text-blue-200">aicompliance@nhlstenden.com</a>
            </div>
            <div>
              <div className="text-blue-200 text-xs mb-1">Privacy QuickScan</div>
              <span className="text-white">Privacy & Security Team</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
