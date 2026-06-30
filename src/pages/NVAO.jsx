import { Link } from 'react-router-dom'
import GradientHeader from '../components/GradientHeader'

const STANDAARDEN = [
  {
    nr: 1,
    titel: 'Beoogde leerresultaten',
    icon: '🎯',
    kleur: '#1E3A8A',
    nvao: 'De NVAO constateert dat generatieve AI nauwelijks terugkomt bij standaard 1. Opleidingen passen hun leerdoelen en beroepsprofielen nog niet expliciet aan op de komst van GenAI, terwijl panels adviseren dit structureel te monitoren en door te vertalen.',
    nhlstenden: 'NHL Stenden werkt actief aan de integratie van AI-geletterdheid in leerdoelen. Via de minor AI in Practice en de minor Decision Making & Generative AI worden studenten opgeleid om AI kritisch te beoordelen en verantwoord in te zetten in hun toekomstige beroep. De NBA handreiking AI-geletterdheid en het AI-GO! raamwerk van Npuls vormen de inhoudelijke basis voor curriculumherziening.',
    acties: [
      { tekst: 'Minor AI in Practice: studenten onderzoeken AI in de beroepspraktijk', link: 'https://www.nhlstenden.com/en/minors/ai-in-practice', extern: true },
      { tekst: 'Minor Decision Making & Generative AI: ethiek, besluitvorming en AI', link: 'https://www.nhlstenden.com/en/minors/decision-making-and-generative-ai', extern: true },
      { tekst: 'AI-GO! Raamwerk voor AI-geletterdheid in het onderwijs (Npuls)', link: 'https://npuls.nl/kennisbank/ai-go-een-raamwerk-voor-ai-geletterdheid-in-het-onderwijs', extern: true },
      { tekst: 'Thema AI & Leren: overzicht leeractiviteiten NHL Stenden', link: '/themas', extern: false },
    ]
  },
  {
    nr: 2,
    titel: 'Onderwijsleeromgeving',
    icon: '🏫',
    kleur: '#065F46',
    nvao: 'De NVAO ziet dat opleidingen beleid ontwikkelen maar dit nog onvoldoende vertalen naar de praktijk. AI-geletterdheid van docenten, integratie in het curriculum en heldere communicatie naar studenten blijven aandachtspunten. Panels waarderen AI hubs en Teaching & Learning Centers die het voortouw nemen.',
    nhlstenden: 'NHL Stenden heeft een actieve infrastructuur voor AI in de leeromgeving. Het CTL (Centre for Teaching and Learning) biedt docenten ondersteuning via richtlijnen, webinars en materialen. Het I\'M A.I. initiatief brengt studenten, docenten en bedrijven samen rondom AI-toepassingen. Medewerkers en studenten worden ondersteund via ARDA AI-modules en LibGuides. NHL Stenden publiceert actief over GenAI en onderwijs via het intranet.',
    acties: [
      { tekst: 'CTL: AI & Toetsing, richtlijnen en beoordelen (intranet)', link: 'https://newuniversity.sharepoint.com/sites/center-for-teaching-and-learning/SitePages/AI---toetsing,-richtlijnen-en-beoordeling.aspx', extern: true },
      { tekst: 'CTL: AI-webinars van Npuls voor docenten', link: 'https://newuniversity.sharepoint.com/sites/center-for-teaching-and-learning/SitePages/AI-webinars-van-Npuls.aspx', extern: true },
      { tekst: 'I\'M A.I.: AI-initiatief NHL Stenden voor onderwijs en onderzoek', link: 'https://www.nhlstenden.com/onderzoek/lectoraten/computer-vision-data-science/IMAI', extern: true },
      { tekst: 'SURF Communities: Lesmaterialen AI-geletterdheid', link: 'https://communities.surf.nl/ai-in-education/artikel/lesmaterialen-over-ai-geletterdheid', extern: true },
      { tekst: 'AI & Geletterdheid: overzicht NBA programma', link: '/geletterdheid', extern: false },
    ]
  },
  {
    nr: 3,
    titel: 'Toetsing en examinering',
    icon: '📝',
    kleur: '#7C3AED',
    nvao: 'Toetsing krijgt de meeste aandacht in NVAO-rapporten: 72% van de beoordelingen benoemt GenAI bij standaard 3. Opleidingen richten zich op fraude, fraudedetectie en alternatieve toetsvormen. De NVAO roept op tot een meer integraal beleid dat verder gaat dan "policing" en constructive alignment centraal stelt.',
    nhlstenden: 'NHL Stenden heeft een expliciet en gedocumenteerd toetsbeleid voor GenAI. Het CTL heeft richtlijnen ontwikkeld voor examinatoren en examencommissies, inclusief een stappenplan bij vermoedens van fraude. NHL Stenden kiest bewust voor géén AI-detector omdat betrouwbaarheid onvoldoende is aangetoond. In plaats daarvan wordt ingezet op sterk toetsontwerp, monidings, mening en heldere toetsinstructies. Via de NHL Stenden visie op DBE (Design Based Education) worden studenten beoordeeld op proces en prestatie, wat inherent robuuster is voor GenAI-risico\'s.',
    acties: [
      { tekst: 'CTL: NHL Stenden AI & Toetsing richtlijnen en beoordelen', link: 'https://newuniversity.sharepoint.com/sites/center-for-teaching-and-learning/SitePages/AI---toetsing,-richtlijnen-en-beoordeling.aspx', extern: true },
      { tekst: 'Npuls: Visie op toetsing en examinering in het tijdperk van AI', link: 'https://npuls.nl/kennisbank/visie-op-toetsing-examinering-en-ai-handreikingen', extern: true },
      { tekst: 'NVAO Startverkenning GenAI: thematische analyse kwaliteitszorg', link: 'https://www.nvao.net', extern: true },
      { tekst: 'AI Act & Compliance: NHL Stenden governance overzicht', link: '/initiatieven?tab=aiact', extern: false },
      { tekst: 'Pilots: AI-feedback op schrijfopdrachten en scripties', link: '/pilots', extern: false },
    ]
  },
  {
    nr: 4,
    titel: 'Gerealiseerde leerresultaten',
    icon: '🎓',
    kleur: '#B45309',
    nvao: 'De NVAO constateert dat standaard 4 vrijwel niet aan bod komt in relatie tot GenAI. Er is nauwelijks aandacht voor de invloed van GenAI op eindwerken en de beoordeling ervan. Panels besteden hier expliciet geen aandacht aan, terwijl juist hier risico\'s schuilen die moeilijk zichtbaar zijn.',
    nhlstenden: 'NHL Stenden werkt via Design Based Education aan leerresultaten die zichtbaar worden in authentieke beroepsprestaties. Door projectmatig werken, criteriumgerichte interviews en portfolio-beoordelingen wordt het gerealiseerde leerresultaat beoordeeld op een manier die GenAI-risico\'s verkleint. Het FrisiusLab maakt concrete leerresultaten in de zorg meetbaar. De NVAO Startverkenning vormt mede de basis voor de doorontwikkeling van ons evaluatiebeleid.',
    acties: [
      { tekst: 'NHL Stenden FrisiusLab: samenwerking zorg, onderwijs en onderzoek', link: 'https://www.nhlstenden.com/nieuws-en-artikelen/met-het-frisiuslab-zetten-nhl-stenden-en-frisius-mc-vol-in-op-innovatie', extern: true },
      { tekst: 'AI Fryslân Event 2026: regionale samenwerking en leerresultaten', link: 'https://www.nhlstenden.com/evenementen/ai-fryslan-event-2026', extern: true },
      { tekst: 'Initiatieven: overzicht lopende NHL Stenden AI-activiteiten', link: '/initiatieven', extern: false },
      { tekst: 'Pilots: meetbare pilots met leerresultaten', link: '/pilots', extern: false },
    ]
  },
]

const VERVOLGSTAPPEN = [
  {
    nr: 1,
    tekst: 'Concrete instellingsbrede richtlijnen voor het gebruik van AI in onderwijs en toetsing',
    nhl: 'Beleid & Kaders pagina bevat de NHL Stenden richtlijnen. CTL beheert de intranetpagina met operationeel toetsbeleid.',
    link: '/beleid',
    extern: false,
  },
  {
    nr: 2,
    tekst: 'Expliciete en integrale benadering waarbij GenAI wordt bezien langs alle vier standaarden',
    nhl: 'Deze pagina brengt de vier NVAO-standaarden in samenhang. Het AI-Netwerk platform integreert beleid, leren, toetsing en leerresultaten.',
    link: '/themas',
    extern: false,
  },
  {
    nr: 3,
    tekst: 'GenAI expliciet onderdeel van kwaliteitszorgprocedures',
    nhl: 'NHL Stenden volgt de NVAO startverkenning en integreert GenAI in de interne kwaliteitscyclus. Pilots worden gedocumenteerd met voortgangsupdates.',
    link: '/pilots',
    extern: false,
  },
]

export default function NVAO() {
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <GradientHeader
        label="Kwaliteitszorg & Accreditatie"
        title="NVAO & Generatieve AI"
        subtitle="Hoe NHL Stenden invulling geeft aan de NVAO-kaders voor generatieve AI in het onderwijs."
      >
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="https://www.nvao.net" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors border border-white/30">
            📄 NVAO Startverkenning GenAI →
          </a>
          <Link to="/beleid"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors border border-white/20">
            📋 NHL Stenden AI-beleid
          </Link>
        </div>
      </GradientHeader>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Intro */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🏛️</div>
            <div>
              <h2 className="font-bold text-nhl-blauw text-lg mb-2">Wat vraagt de NVAO?</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                In januari 2026 publiceerde de NVAO de Startverkenning Generatieve Artificiële Intelligentie. Uit analyse van 509 opleidingsbeoordelingen blijkt dat de aandacht voor GenAI sterk toeneemt, maar nog sterk gericht is op toetsing en fraudepreventie. De NVAO roept instellingen op tot een bredere, integrale aanpak langs alle vier accreditatiestandaarden.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                De NVAO formuleert drie concrete vervolgstappen voor instellingen: ontwikkel instellingsbrede richtlijnen, hanteer een integrale benadering over alle standaarden, en maak GenAI expliciet onderdeel van kwaliteitszorgprocedures.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Deze pagina laat zien hoe NHL Stenden op elk van deze punten actie onderneemt. De inhoud wordt automatisch actueel gehouden via het AI-Netwerk platform.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-nhl-blauw/10 text-nhl-blauw px-3 py-1 rounded-full font-medium">Januari 2026</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">509 opleidingsbeoordelingen geanalyseerd</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">72% aandacht voor GenAI bij toetsing</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">Periodiek herhaald onderzoek</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vier standaarden */}
        <h2 className="font-bold text-nhl-blauw text-xl mb-5">Vier standaarden: NHL Stenden in beeld</h2>
        <div className="space-y-6 mb-12">
          {STANDAARDEN.map(s => (
            <div key={s.nr} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100" style={{ borderLeftColor: s.kleur, borderLeftWidth: 4 }}>
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Standaard {s.nr}</div>
                  <div className="font-bold text-nhl-blauw text-base">{s.titel}</div>
                </div>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Wat zegt de NVAO?</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.nvao}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Hoe pakt NHL Stenden dit op?</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.nhlstenden}</p>
                  <div className="space-y-2">
                    {s.acties.map((a, i) => (
                      a.extern ? (
                        <a key={i} href={a.link} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-nhl-roze text-xs font-medium hover:underline">
                          🔗 {a.tekst}
                        </a>
                      ) : (
                        <Link key={i} to={a.link}
                          className="flex items-center gap-2 text-nhl-blauw text-xs font-medium hover:underline">
                          → {a.tekst}
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Drie vervolgstappen NVAO */}
        <h2 className="font-bold text-nhl-blauw text-xl mb-5">De drie vervolgstappen van de NVAO</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {VERVOLGSTAPPEN.map(v => (
            <div key={v.nr} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-nhl-blauw text-white text-sm font-bold flex items-center justify-center mb-3">{v.nr}</div>
              <p className="text-gray-700 text-sm font-semibold leading-snug mb-3">{v.tekst}</p>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">{v.nhl}</p>
              {v.extern ? (
                <a href={v.link} target="_blank" rel="noopener noreferrer" className="text-nhl-roze text-xs font-medium hover:underline">🔗 Bekijk →</a>
              ) : (
                <Link to={v.link} className="text-nhl-blauw text-xs font-medium hover:underline">→ Bekijk in het AI-Netwerk</Link>
              )}
            </div>
          ))}
        </div>

        {/* Live overzicht */}
        <div className="bg-nhl-blauw/5 border border-nhl-blauw/20 rounded-2xl p-6 mb-8">
          <div className="font-bold text-nhl-blauw mb-2 flex items-center gap-2">
            <span>🔄</span> Deze pagina is altijd actueel
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            De bronnen en activiteiten op deze pagina zijn direct verbonden aan het AI-Netwerk platform. Zodra nieuwe pilots, initiatieven, documenten of evenementen worden toegevoegd, wordt de context voor accreditatie automatisch rijker. Zo is dit platform tegelijk een werkomgeving en een levend bewijs van onze AI-aanpak.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/pilots" className="inline-flex items-center gap-1.5 bg-white border border-nhl-blauw/20 text-nhl-blauw text-xs font-semibold px-3 py-2 rounded-xl hover:bg-nhl-blauw/5 transition-colors">🧪 Pilots</Link>
            <Link to="/initiatieven" className="inline-flex items-center gap-1.5 bg-white border border-nhl-blauw/20 text-nhl-blauw text-xs font-semibold px-3 py-2 rounded-xl hover:bg-nhl-blauw/5 transition-colors">🚀 Initiatieven</Link>
            <Link to="/documentatie" className="inline-flex items-center gap-1.5 bg-white border border-nhl-blauw/20 text-nhl-blauw text-xs font-semibold px-3 py-2 rounded-xl hover:bg-nhl-blauw/5 transition-colors">📁 Documenten</Link>
            <Link to="/inspiratie" className="inline-flex items-center gap-1.5 bg-white border border-nhl-blauw/20 text-nhl-blauw text-xs font-semibold px-3 py-2 rounded-xl hover:bg-nhl-blauw/5 transition-colors">💡 Inzichten</Link>
            <Link to="/geletterdheid" className="inline-flex items-center gap-1.5 bg-white border border-nhl-blauw/20 text-nhl-blauw text-xs font-semibold px-3 py-2 rounded-xl hover:bg-nhl-blauw/5 transition-colors">📖 Geletterdheid</Link>
          </div>
        </div>

        {/* Naslag document */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📄</div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Naslag</div>
              <div className="font-bold text-nhl-blauw text-base mb-1">NVAO Startverkenning Generatieve Artificiële Intelligentie</div>
              <div className="text-gray-500 text-sm mb-3">Thematische analyse kwaliteitszorg: januari 2026. Analyse van 509 opleidingsbeoordelingen op de aanwezigheid van GenAI in visitatierapporten, uitgesplitst naar de vier NVAO-standaarden.</div>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.nvao.net/files/attachments/.14069/Initial_Exploration_of_Generative_Artificial_Intelligence.pdf"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-nhl-roze text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-nhl-roze/90 transition-colors">
                  ⬇️ Download rapport (PDF)
                </a>
                <a href="https://www.nvao.net/files/attachments/.14069/Initial_Exploration_of_Generative_Artificial_Intelligence.pdf"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                  ⬇️ Download PDF (EN)
                </a>
                <a href="https://www.nvao.net/en/news/2026/2/nvao-netherlands-publishes-initial-exploration-of-generative-ai"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                  🌐 NVAO nieuwsbericht
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Naslag document */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📄</div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Naslag</div>
              <div className="font-bold text-nhl-blauw text-base mb-1">NVAO Startverkenning Generatieve Artificiële Intelligentie</div>
              <div className="text-gray-500 text-sm mb-3">Thematische analyse kwaliteitszorg: januari 2026. Analyse van 509 opleidingsbeoordelingen op de aanwezigheid van GenAI in visitatierapporten, uitgesplitst naar de vier NVAO-standaarden.</div>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.nvao.net/files/attachments/.14069/Initial_Exploration_of_Generative_Artificial_Intelligence.pdf"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-nhl-roze text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-nhl-roze/90 transition-colors">
                  ⬇️ Download rapport (PDF)
                </a>
                <a href="https://www.nvao.net/files/attachments/.14069/Initial_Exploration_of_Generative_Artificial_Intelligence.pdf"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                  ⬇️ Download PDF (EN)
                </a>
                <a href="https://www.nvao.net/en/news/2026/2/nvao-netherlands-publishes-initial-exploration-of-generative-ai"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                  🌐 NVAO nieuwsbericht
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bron */}
        <div className="text-center text-xs text-gray-400">
          Gebaseerd op: NVAO Nederland: Startverkenning Generatieve Artificiële Intelligentie, Thematische analyse kwaliteitszorg, januari 2026. &nbsp;
          <a href="https://www.nvao.net" target="_blank" rel="noopener noreferrer" className="text-nhl-roze hover:underline">www.nvao.net</a>
        </div>
      </div>
    </div>
  )
}
