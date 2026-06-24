import { Link } from 'react-router-dom'

const kernteam = [
  {
    rol: 'Kwartiermaker Digitale Samenhang',
    subtitel: 'Spil & Strategie',
    omschrijving: 'De Kwartiermaker is de initiator, strateeg en bestuurlijk aanspreekpunt van het AI-Netwerk. Verbindt het AI-Netwerk aan de bredere digitaliseringsstrategie van NHL Stenden.',
    taken: [
      'Bewaakt de koers en samenhang van het AI-Netwerk als geheel',
      'Bestuurlijk aanspreekpunt richting Stuurgroep Transitieprogramma en directie',
      'Verbindt het AI-Netwerk met SURF, NPULS en Vereniging Hogescholen',
      'Bewaakt de vier thema\'s en zorgt voor aansluiting op de organisatiepraktijk',
    ],
    kleur: '#1E3A8A', icon: '🧭', contact: null,
  },
  {
    rol: 'Informatiemanager',
    subtitel: 'Inhoud & Netwerk',
    omschrijving: 'De Informatiemanager is verantwoordelijk voor de inhoudelijke kwaliteit en actualiteit van het AI-Netwerk. Brug tussen de informatiearchitectuur en de praktijk van AI-gebruik.',
    taken: [
      'Beheert en actualiseert de inhoud: initiatieven, mensen en kaders',
      'Verbindt initiatieven aan het juiste thema en laag',
      'Bewaakt de aansluiting op bestaande informatiestromen',
      'Ondersteunt de AI-desk bij het beoordelen van nieuwe initiatieven',
    ],
    kleur: '#0F766E', icon: '🗂️', contact: null,
  },
  {
    rol: 'ICT Analist',
    subtitel: 'Techniek & Instrument',
    omschrijving: 'De ICT Analist is verantwoordelijk voor de technische realisatie van het digitale AI-Netwerk instrument. Verbindt de inhoudelijke ambitie aan de technische mogelijkheden.',
    taken: [
      'Ontwikkelt en beheert het digitale AI-Netwerk instrument',
      'Analyseert technische vraagstukken: platforms, API-koppelingen, datastromen',
      'Bewaakt de aansluiting op de IT-architectuur van NHL Stenden',
      'Volgt ontwikkelingen bij SURF, AI-Fabriek en GPT-NL',
    ],
    kleur: '#7C3AED', icon: '⚙️', contact: null,
  },
]

const THEMACOLLEGA = [
  { thema: 'AI & Leren', icon: '🎓', kleur: '#1E3A8A', contact: null, omschrijving: 'Trekker voor alles rondom AI in onderwijs, didactiek en studiesucces.' },
  { thema: 'AI & Werken', icon: '⚙️', kleur: '#0F766E', contact: null, omschrijving: 'Trekker voor AI in werkprocessen, efficiency en nieuwe werkwijzen.' },
  { thema: 'AI & Verantwoordelijkheid', icon: '⚖️', kleur: '#E91E8C', contact: null, omschrijving: 'Trekker voor governance, AI Act compliance en digitale soevereiniteit.' },
  { thema: 'AI & Geletterdheid', icon: '📖', kleur: '#7C3AED', contact: null, omschrijving: 'Trekker voor AI-geletterdheid bij alle doelgroepen in de instelling.' },
]

// Waarden met eigen kleuraccent
const waarden = [
  { icon: '🤝', titel: 'Verbinding', tekst: 'Het AI-Netwerk verbindt mensen, initiatieven en kennis. Niet door te controleren, maar door zichtbaar te maken.', kleur: '#1E3A8A', licht: '#EFF6FF' },
  { icon: '🔍', titel: 'Transparantie', tekst: 'We maken zichtbaar wat loopt, wat ontbreekt en waar risico\'s zitten. Ook als iets nog niet af is.', kleur: '#0F766E', licht: '#F0FDFA' },
  { icon: '🎯', titel: 'Eigenaarschap', tekst: 'Duurzame verandering ontstaat bij mensen die begrijpen wat ze doen en waarom. Eigenaarschap is de sleutel.', kleur: '#7C3AED', licht: '#F5F3FF' },
  { icon: '⚖️', titel: 'Verantwoord', tekst: 'Publieke waarden staan centraal. AI inzetten op een manier die past bij wie we zijn als instelling.', kleur: '#E91E8C', licht: '#FDF2F8' },
]

const fasering = [
  { fase: 'Fundament', periode: '2026 Q3', kleur: '#1E3A8A', focus: 'Kernteam operationeel. Lagenmodel en thema\'s intern bekend. Eerste inventarisatie van initiatieven en mensen.', resultaat: 'Gedeelde taal aanwezig. Eigenaarschap per thema belegd.' },
  { fase: 'Infrastructuur', periode: '2026 Q4', kleur: '#0F766E', focus: 'Sandbox ingericht. AI-desk operationeel. Digitaal instrument in ontwikkeling. Geletterdheidstrajecten gestart.', resultaat: 'Experimenteren kan veilig beginnen.' },
  { fase: 'Netwerk', periode: '2027 Q1-Q2', kleur: '#7C3AED', focus: 'Thema-trekkers actief. Ambassadeurs per Academie en Dienst aangesteld. Extern netwerk structureel verbonden.', resultaat: 'Het netwerk loopt grotendeels op eigen kracht.' },
  { fase: 'Verankering', periode: '2027 Q3+', kleur: '#E91E8C', focus: 'Het AI-Netwerk is onderdeel van de reguliere bestuurs- en beleidsritmen. Programmatische sturing neemt af.', resultaat: 'Netwerkorganisatie op kruissnelheid. Het AI-Netwerk leeft.' },
]

const KERNAMBITIES = [
  { icon: '🎓', kleur: '#1E3A8A', licht: '#EFF6FF', thema: 'AI & Leren', ambitie: 'De inzet van AI moet leiden tot meer studiesucces, minder uitval en minder voortijdig vertrek.' },
  { icon: '⚙️', kleur: '#0F766E', licht: '#F0FDFA', thema: 'AI & Werken', ambitie: 'NHL Stenden zet AI in om de efficiency van werkprocessen te verhogen, zodat medewerkers hun expertise voluit kunnen richten op onderwijs, begeleiding en samenwerking.' },
  { icon: '⚖️', kleur: '#E91E8C', licht: '#FDF2F8', thema: 'AI & Verantwoordelijkheid', ambitie: 'NHL Stenden gebruikt AI alleen op een manier die transparant, controleerbaar en eerlijk is, en die past binnen de waarden van de instelling en de eisen van wet en samenleving.' },
  { icon: '📖', kleur: '#7C3AED', licht: '#F5F3FF', thema: 'AI & Geletterdheid', ambitie: 'NHL Stenden zorgt ervoor dat AI-geletterdheid een basisvaardigheid is voor alle studenten en medewerkers, zodat niemand afhankelijk is van AI zonder het te begrijpen.' },
]

function ContactKnop({ contact, label = 'Neem contact op' }) {
  if (contact) {
    return (
      <a href={`mailto:${contact}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-nhl-roze hover:bg-nhl-roze-dark px-3 py-1.5 rounded-lg transition-colors">
        ✉️ {label}
      </a>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg">
      ✉️ Contact volgt
    </span>
  )
}

export default function Over() {
  return (
    <div className="min-h-screen pt-16 bg-gray-50">

      {/* Hero — pb-32 zodat golf de tekst niet afdekt */}
      <div className="nhl-gradient-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-10 -right-10 w-96 h-96 border border-white rounded-full"/>
          <div className="absolute bottom-0 left-20 w-64 h-64 border border-white rounded-full"/>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-32 relative">
          <div className="max-w-3xl">
            <div className="section-label text-blue-300 mb-3">Wie zijn wij</div>
            <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">Over het AI-Netwerk</h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-4">
              Het AI-Netwerk is geen afdeling en geen project. Het is een <strong className="text-white">wegwijzer</strong> — een levende,
              digitale en organisatorische structuur die mensen, initiatieven en kennis met elkaar verbindt.
            </p>
            <p className="text-blue-200 leading-relaxed">
              Ontstaan vanuit de overtuiging dat echte digitale verandering begint bij mensen: bij hoe zij werken,
              leren en samenwerken, en bij de mate waarin zij zich digitaal zeker en vaardig voelen.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 72" fill="none" preserveAspectRatio="none" className="w-full block">
            <path d="M0 72L1440 72L1440 28C1320 60 1200 8 1080 20C960 32 840 64 720 52C600 40 480 4 360 16C240 28 120 60 0 40L0 72Z" fill="white"/>
            <path d="M0 72L1440 72L1440 40C1320 68 1200 20 1080 36C960 52 840 72 720 64C600 56 480 20 360 32C240 44 120 68 0 52L0 72Z" fill="white" fillOpacity="0.5"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

        {/* Kerngedachte + waarden MET kleuraccenten */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <div className="section-label mb-3">De kerngedachte</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-5">Waarom het AI-Netwerk bestaat</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>AI is overal tegelijk aanwezig bij NHL Stenden. Studenten verkennen mogelijkheden voor hun leerproces. Docenten zoeken houvast bij vragen over integriteit en didactiek. Diensten ontdekken wat procesondersteuning kan betekenen.</p>
              <p>Al die bewegingen zijn waardevol. Maar ze hebben een gemeenschappelijk vertrekpunt nodig: gedeeld overzicht, een gedeelde taal en een gedeeld kompas. Dáár is het AI-Netwerk voor.</p>
              <p>Het AI-Netwerk legt niets op. Maar wijst de weg — door <strong className="text-nhl-blauw">zichtbaar te maken</strong> wat er al is, door <strong className="text-nhl-blauw">te verbinden</strong> wie er mee bezig zijn, en door <strong className="text-nhl-blauw">richting te geven</strong> vanuit gedeelde waarden.</p>
            </div>
          </div>
          {/* Waarden met kleuraccenten — zelfde stijl als thema's */}
          <div className="space-y-3">
            {waarden.map(w => (
              <div key={w.titel} className="flex gap-4 rounded-2xl p-5 border-l-4"
                style={{ borderColor: w.kleur, backgroundColor: w.licht }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: w.kleur + '20' }}>
                  {w.icon}
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ color: w.kleur }}>{w.titel}</div>
                  <div className="text-gray-600 text-sm leading-relaxed">{w.tekst}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overkoepelende kernambitie */}
        <div className="bg-nhl-blauw rounded-2xl p-8 mb-10 text-center">
          <div className="text-4xl mb-4">🎯</div>
          <blockquote className="text-white text-xl font-medium italic leading-relaxed max-w-3xl mx-auto mb-3">
            "NHL Stenden benut AI om studiesucces te vergroten, werkprocessen te versterken en een verantwoorde digitale cultuur te bouwen, gedragen door iedereen die hier werkt en leert."
          </blockquote>
          <div className="text-blue-200 text-sm">De overkoepelende kernambitie van het AI-Netwerk</div>
        </div>

        {/* Kernambities per thema — met kleurkop zoals bij thema's */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <div className="section-label mb-2">Per thema</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Kernambities per thema</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">Elke ambitie is concreet en meetbaar. Samen vormen ze de bestuurlijke grondslag voor de inzet van AI.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {KERNAMBITIES.map(k => (
              <div key={k.thema} className="rounded-2xl border overflow-hidden shadow-sm"
                style={{ borderColor: k.kleur + '30' }}>
                {/* Kleurkop */}
                <div className="px-5 py-4 flex items-center gap-3" style={{ backgroundColor: k.kleur }}>
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-xl">{k.icon}</div>
                  <div className="font-bold text-white text-base">{k.thema}</div>
                </div>
                {/* Inhoud */}
                <div className="px-5 py-4" style={{ backgroundColor: k.licht }}>
                  <p className="text-gray-700 text-sm leading-relaxed italic">"{k.ambitie}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Het kernteam — kleurkop per rol */}
        <div className="mb-6">
          <div className="text-center mb-10">
            <div className="section-label mb-2">Het team</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Het kernteam</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Drie rollen die elkaar complementeren — van strategie tot inhoud en techniek.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {kernteam.map(lid => (
              <div key={lid.rol} className="rounded-2xl border overflow-hidden shadow-sm" style={{ borderColor: lid.kleur + '30' }}>
                {/* Kleurkop */}
                <div className="px-5 py-4 flex items-center gap-3" style={{ backgroundColor: lid.kleur }}>
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-2xl">{lid.icon}</div>
                  <div>
                    <div className="text-white font-bold text-sm leading-snug">{lid.rol}</div>
                    <div className="text-white/70 text-xs">{lid.subtitel}</div>
                  </div>
                </div>
                {/* Inhoud */}
                <div className="p-5 bg-white">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{lid.omschrijving}</p>
                  <div className="space-y-1.5 mb-4">
                    {lid.taken.map((taak, i) => (
                      <div key={i} className="flex gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: lid.kleur }}/>
                        {taak}
                      </div>
                    ))}
                  </div>
                  <ContactKnop contact={lid.contact} />
                </div>
              </div>
            ))}
          </div>

          {/* Techniek & Infrastructuur — fundament laag */}
          <div className="rounded-2xl border overflow-hidden shadow-sm" style={{ borderColor: '#7C3AED30' }}>
            <div className="px-6 py-5 flex items-center gap-4" style={{ background: 'linear-gradient(135deg, #7C3AED, #4F46E5)' }}>
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl flex-shrink-0">🏗️</div>
              <div>
                <div className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-0.5">Fundament laag — breed over het kernteam</div>
                <div className="text-white font-bold text-lg">Techniek & Infrastructuur</div>
              </div>
            </div>
            <div className="p-6 bg-white">
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Geen aparte rol, maar een gedeelde verantwoordelijkheidslaag onder het kernteam. Mensen met technische en functionele expertise die de AI-infrastructuur van NHL Stenden bouwen, bewaken en versterken — en als solution partner met collega's meedenken over veilige AI-integratie.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                {[
                  { icon: '🔐', kleur: '#7C3AED', licht: '#F5F3FF', titel: 'Veilige AI-integratie', tekst: 'Expertise in veilige implementatie van AI-tools in de NHL Stenden IT-infrastructuur, inclusief AVG en informatiebeveiliging.' },
                  { icon: '🤝', kleur: '#1E3A8A', licht: '#EFF6FF', titel: 'Solution Partner', tekst: 'Meedenken hoe AI concreet geïntegreerd kan worden in werkprocessen en toepassingen van collega\'s.' },
                  { icon: '🔭', kleur: '#0F766E', licht: '#F0FDFA', titel: 'Technisch landschap', tekst: 'Voortdurend volgen van nieuwe AI-applicaties, platforms en infrastructuurontwikkelingen.' },
                  { icon: '⚙️', kleur: '#E91E8C', licht: '#FDF2F8', titel: 'Alternatieve oplossingen', tekst: 'Soevereine en open-source AI-oplossingen identificeren als alternatief voor commerciële aanbieders.' },
                ].map(item => (
                  <div key={item.titel} className="rounded-xl p-4 border-l-4" style={{ borderColor: item.kleur, backgroundColor: item.licht }}>
                    <div className="text-xl mb-2">{item.icon}</div>
                    <div className="font-semibold text-sm mb-1" style={{ color: item.kleur }}>{item.titel}</div>
                    <p className="text-gray-600 text-xs leading-relaxed">{item.tekst}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <ContactKnop contact={null} label="Technisch vraagstuk?" />
                <Link to="/fundament" className="text-xs font-semibold text-nhl-blauw hover:text-nhl-roze transition-colors">
                  Naar het vijflagenmodel →
                </Link>
                <a href="https://www.surf.nl/en/themes/artificial-intelligence/projects-and-collaborations/ai-hub" target="_blank" rel="noopener noreferrer"
                  className="text-xs font-semibold text-nhl-blauw hover:text-nhl-roze transition-colors">
                  SURF AI-Hub ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Kernteam groeit — thema trekkers met kleuraccenten */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-2xl flex-shrink-0">🌱</div>
              <div>
                <h3 className="font-bold text-nhl-blauw text-lg mb-1">Het kernteam groeit mee</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Per thema komen vaste trekkers. Per Academie en Dienst komen ambassadeurs.
                  Het netwerk bouwt zich op vanuit vertrouwen, eigenaarschap en gedeelde ambitie.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {THEMACOLLEGA.map(t => (
                <div key={t.thema} className="rounded-xl border overflow-hidden" style={{ borderColor: t.kleur + '40' }}>
                  <div className="px-4 py-3 flex items-center gap-2" style={{ backgroundColor: t.kleur }}>
                    <span className="text-xl">{t.icon}</span>
                    <div className="font-bold text-white text-xs leading-snug">{t.thema}</div>
                  </div>
                  <div className="p-4 bg-white">
                    <p className="text-gray-500 text-xs leading-relaxed mb-3">{t.omschrijving}</p>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Thema-trekker</div>
                    <ContactKnop contact={t.contact} label="Contact trekker" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Netwerkorganisatie — met kleuraccenten */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="section-label mb-2">Hoe we werken</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Een netwerkorganisatie</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {[
              { icon: '🧠', kleur: '#1E3A8A', licht: '#EFF6FF', titel: 'Collectieve intelligentie', tekst: 'Kennis is verspreid over het netwerk en wordt actief gedeeld. Het AI-Netwerk maakt die kennis vindbaar voor iedereen.' },
              { icon: '⚡', kleur: '#0F766E', licht: '#F0FDFA', titel: 'Snelle verspreiding', tekst: 'Een goed initiatief verspreidt zich snel, zonder dat er een formeel besluit voor nodig is. Zichtbaarheid is de motor.' },
              { icon: '🛡️', kleur: '#7C3AED', licht: '#F5F3FF', titel: 'Veerkracht', tekst: 'Als een onderdeel vertraagt, blijft het netwerk als geheel functioneren. Er is geen enkel faalpoint.' },
            ].map(item => (
              <div key={item.titel} className="rounded-2xl p-6 border-l-4" style={{ borderColor: item.kleur, backgroundColor: item.licht }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: item.kleur + '20' }}>{item.icon}</div>
                <div className="font-bold mb-2" style={{ color: item.kleur }}>{item.titel}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.tekst}</p>
              </div>
            ))}
          </div>
          <div className="bg-nhl-roze/5 border border-nhl-roze/20 rounded-2xl p-6">
            <div className="flex gap-4">
              <div className="text-2xl flex-shrink-0">⚠️</div>
              <div>
                <div className="font-bold text-nhl-blauw mb-2">Van organisch naar programmatisch: de opstartfase</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Een netwerkorganisatie is het eindbeeld. Maar de weg ernaartoe vraagt in de opstartfase om meer sturing.
                  Infrastructuur ontbreekt nog, eigenaarschap is nog niet belegd, geletterdheid is ongelijk verdeeld.
                  Daarom wordt het AI-Netwerk in de opstartfase <strong>aangestuurd als een programma</strong> — met heldere
                  fasering, expliciete mijlpalen en actieve bewaking van de samenhang.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fasering — met kleuraccenten per fase */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="section-label mb-2">De weg vooruit</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Fasering 2026–2027</h2>
          </div>
          <div className="space-y-4">
            {fasering.map((f, i) => (
              <div key={f.fase} className="rounded-2xl border overflow-hidden shadow-sm" style={{ borderColor: f.kleur + '30' }}>
                <div className="flex items-center gap-4 px-5 py-4" style={{ backgroundColor: f.kleur }}>
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-bold text-base">{f.fase}</div>
                  </div>
                  <div className="text-white/70 text-xs bg-white/15 px-3 py-1 rounded-full">{f.periode}</div>
                </div>
                <div className="px-5 py-4 bg-white">
                  <p className="text-gray-600 text-sm leading-relaxed mb-2">{f.focus}</p>
                  <div className="text-xs italic px-3 py-2 rounded-lg" style={{ backgroundColor: f.kleur + '10', color: f.kleur }}>
                    Resultaat: {f.resultaat}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-nhl-blauw rounded-2xl p-10 mb-8">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold text-white mb-3">Doe mee aan het AI-Netwerk</h2>
          <p className="text-blue-200 mb-6 max-w-md mx-auto">Het AI-Netwerk groeit vanuit de organisatie zelf. Jouw kennis, initiatief of vraag maakt het netwerk rijker.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/meld" className="bg-nhl-roze hover:bg-nhl-roze-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">+ Meld een initiatief</Link>
            <Link to="/netwerk" className="bg-white text-nhl-blauw hover:bg-blue-50 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">Bekijk het netwerk</Link>
            <Link to="/themas" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">Ontdek de thema's</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
