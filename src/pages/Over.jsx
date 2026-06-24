import { Link } from 'react-router-dom'
import { useState } from 'react'

const kernteam = [
  {
    rol: 'Kwartiermaker Digitale Samenhang',
    subtitel: 'Spil & Strategie',
    omschrijving: 'De Kwartiermaker is de initiator, strateeg en bestuurlijk aanspreekpunt van het AI-Netwerk. Verbindt het AI-Netwerk aan de bredere digitaliseringsstrategie van NHL Stenden.',
    taken: [
      'Bewaakt de koers en samenhang van het AI-Netwerk als geheel',
      'Bestuurlijk aanspreekpunt richting Stuurgroep Transitieprogramma en directie',
      'Verbindt het AI-Netwerk met het externe netwerk: SURF, NPULS, Vereniging Hogescholen',
      'Bewaakt de vier thema\'s en zorgt voor aansluiting op de organisatiepraktijk',
    ],
    kleur: '#1E3A8A',
    icon: '🧭',
    contact: null,
  },
  {
    rol: 'Informatiemanager',
    subtitel: 'Inhoud & Netwerk',
    omschrijving: 'De Informatiemanager is verantwoordelijk voor de inhoudelijke kwaliteit en actualiteit van het AI-Netwerk. Brug tussen de informatiearchitectuur en de praktijk van AI-gebruik.',
    taken: [
      'Beheert en actualiseert de inhoud: initiatieven, mensen, kaders en vraagstukken',
      'Verbindt initiatieven aan het juiste thema en laag',
      'Bewaakt de aansluiting op bestaande informatiestromen en governance-processen',
      'Ondersteunt de AI-desk bij het beoordelen van nieuwe AI-initiatieven',
    ],
    kleur: '#0F766E',
    icon: '🗂️',
    contact: null,
  },
  {
    rol: 'ICT Analist',
    subtitel: 'Techniek & Instrument',
    omschrijving: 'De ICT Analist is verantwoordelijk voor de technische realisatie en het beheer van het digitale AI-Netwerk instrument. Verbindt de inhoudelijke ambitie aan de technische mogelijkheden.',
    taken: [
      'Ontwikkelt en beheert het digitale AI-Netwerk instrument',
      'Analyseert technische vraagstukken: platforms, API-koppelingen, datastromen',
      'Bewaakt de aansluiting op de bestaande IT-architectuur van NHL Stenden',
      'Volgt technische ontwikkelingen bij SURF, AI-Fabriek en GPT-NL',
    ],
    kleur: '#7C3AED',
    icon: '⚙️',
    contact: null,
  },
]

const THEMACOLLEGA = [
  { thema: 'AI & Leren', icon: '🎓', kleur: '#1E3A8A', contact: null, omschrijving: 'Trekker voor alles rondom AI in onderwijs, didactiek en studiesucces.' },
  { thema: 'AI & Werken', icon: '⚙️', kleur: '#0F766E', contact: null, omschrijving: 'Trekker voor AI in werkprocessen, efficiency en nieuwe werkwijzen bij diensten.' },
  { thema: 'AI & Verantwoordelijkheid', icon: '⚖️', kleur: '#E91E8C', contact: null, omschrijving: 'Trekker voor governance, AI Act compliance en digitale soevereiniteit.' },
  { thema: 'AI & Geletterdheid', icon: '📖', kleur: '#7C3AED', contact: null, omschrijving: 'Trekker voor AI-geletterdheid bij alle doelgroepen in de instelling.' },
]

const waarden = [
  { icon: '🤝', titel: 'Verbinding', tekst: 'Het AI-Netwerk verbindt mensen, initiatieven en kennis. Niet door te controleren, maar door zichtbaar te maken.' },
  { icon: '🔍', titel: 'Transparantie', tekst: 'We maken zichtbaar wat loopt, wat ontbreekt en waar risico\'s zitten. Ook als iets nog niet af is.' },
  { icon: '🎯', titel: 'Eigenaarschap', tekst: 'Duurzame verandering ontstaat bij mensen die begrijpen wat ze doen en waarom. Eigenaarschap is de sleutel.' },
  { icon: '⚖️', titel: 'Verantwoord', tekst: 'Publieke waarden staan centraal. AI inzetten op een manier die past bij wie we zijn als instelling.' },
]

const fasering = [
  { fase: 'Fundament', periode: '2026 Q3', focus: 'Kernteam operationeel. Lagenmodel en thema\'s intern bekend. Eerste inventarisatie van initiatieven en mensen.', resultaat: 'Gedeelde taal aanwezig. Eigenaarschap per thema belegd.' },
  { fase: 'Infrastructuur', periode: '2026 Q4', focus: 'Sandbox ingericht. AI-desk operationeel. Digitaal instrument in ontwikkeling. Geletterdheidstrajecten gestart.', resultaat: 'Experimenteren kan veilig beginnen.' },
  { fase: 'Netwerk', periode: '2027 Q1-Q2', focus: 'Thema-trekkers actief. Ambassadeurs per Academie en Dienst aangesteld. Extern netwerk structureel verbonden.', resultaat: 'Het netwerk loopt grotendeels op eigen kracht.' },
  { fase: 'Verankering', periode: '2027 Q3+', focus: 'Het AI-Netwerk is onderdeel van de reguliere bestuurs- en beleidsritmen. Programmatische sturing neemt af.', resultaat: 'Netwerkorganisatie op kruissnelheid. Het AI-Netwerk leeft.' },
]

const KERNAMBITIES = [
  { icon: '🎓', kleur: '#1E3A8A', thema: 'AI & Leren', ambitie: 'De inzet van AI moet leiden tot meer studiesucces, minder uitval en minder voortijdig vertrek.' },
  { icon: '⚙️', kleur: '#0F766E', thema: 'AI & Werken', ambitie: 'NHL Stenden zet AI in om de efficiency van werkprocessen te verhogen, zodat medewerkers hun expertise voluit kunnen richten op onderwijs, begeleiding en samenwerking.' },
  { icon: '⚖️', kleur: '#E91E8C', thema: 'AI & Verantwoordelijkheid', ambitie: 'NHL Stenden gebruikt AI alleen op een manier die transparant, controleerbaar en eerlijk is, en die past binnen de waarden van de instelling en de eisen van wet en samenleving.' },
  { icon: '📖', kleur: '#7C3AED', thema: 'AI & Geletterdheid', ambitie: 'NHL Stenden zorgt ervoor dat AI-geletterdheid een basisvaardigheid is voor alle studenten en medewerkers, zodat niemand afhankelijk is van AI zonder het te begrijpen.' },
]

function ContactKnop({ contact, label = 'Neem contact op' }) {
  if (contact) {
    return (
      <a href={`mailto:${contact}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-nhl-roze hover:bg-nhl-roze-dark px-3 py-1.5 rounded-lg transition-colors">
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

      {/* Hero */}
      <div className="nhl-gradient-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-10 -right-10 w-96 h-96 border border-white rounded-full"/>
          <div className="absolute bottom-0 left-20 w-64 h-64 border border-white rounded-full"/>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative">
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

        {/* Kerngedachte + waarden */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="section-label mb-3">De kerngedachte</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-5">Waarom het AI-Netwerk bestaat</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>AI is overal tegelijk aanwezig bij NHL Stenden. Studenten verkennen mogelijkheden voor hun leerproces. Docenten zoeken houvast bij vragen over integriteit en didactiek. Diensten ontdekken wat procesondersteuning kan betekenen.</p>
              <p>Al die bewegingen zijn waardevol. Maar ze hebben een gemeenschappelijk vertrekpunt nodig: gedeeld overzicht, een gedeelde taal en een gedeeld kompas. Dáár is het AI-Netwerk voor.</p>
              <p>Het AI-Netwerk legt niets op. Maar wijst de weg — door <strong className="text-nhl-blauw">zichtbaar te maken</strong> wat er al is, door <strong className="text-nhl-blauw">te verbinden</strong> wie er mee bezig zijn, en door <strong className="text-nhl-blauw">richting te geven</strong> vanuit gedeelde waarden.</p>
            </div>
          </div>
          <div className="space-y-3">
            {waarden.map(w => (
              <div key={w.titel} className="flex gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="text-2xl flex-shrink-0">{w.icon}</div>
                <div>
                  <div className="font-bold text-nhl-blauw mb-1">{w.titel}</div>
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

        {/* Kernambities per thema */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <div className="section-label mb-2">Per thema</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Kernambities per thema</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {KERNAMBITIES.map(k => (
              <div key={k.thema} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: k.kleur + '15' }}>{k.icon}</div>
                  <div className="font-bold text-nhl-blauw">{k.thema}</div>
                </div>
                <div className="h-1 w-12 rounded-full mb-3" style={{ backgroundColor: k.kleur }}/>
                <p className="text-gray-600 text-sm leading-relaxed italic">"{k.ambitie}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Het kernteam — drie rollen */}
        <div className="mb-6">
          <div className="text-center mb-10">
            <div className="section-label mb-2">Het team</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Het kernteam</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Het kernteam bestaat in de opstartfase uit drie rollen die elkaar complementeren.
              Samen dekken zij de breedte van het AI-Netwerk: van strategie tot inhoud en techniek.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {kernteam.map(lid => (
              <div key={lid.rol} className="card overflow-hidden">
                <div className="h-2 w-full" style={{ backgroundColor: lid.kleur }}/>
                <div className="p-6">
                  <div className="text-3xl mb-3">{lid.icon}</div>
                  <div className="font-bold text-nhl-blauw text-lg mb-1 leading-snug">{lid.rol}</div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: lid.kleur }}>{lid.subtitel}</div>
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

          {/* Techniek & Infrastructuur — fundament laag breed onder de drie rollen */}
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 relative overflow-hidden">
            {/* Achtergrond decoratie */}
            <div className="absolute inset-0 opacity-3">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-violet-500" style={{ opacity: 0.04 }}/>
            </div>
            <div className="relative">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                  🏗️
                </div>
                <div>
                  <div className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-1">Fundament laag — breed over het kernteam</div>
                  <h3 className="text-xl font-bold text-nhl-blauw">Techniek & Infrastructuur</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Geen aparte rol, maar een gedeelde verantwoordelijkheidslaag onder het kernteam. Mensen met technische en functionele expertise die de AI-infrastructuur van NHL Stenden bouwen, bewaken en versterken.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                {[
                  { icon: '🔐', titel: 'Veilige AI-integratie', tekst: 'Expertise in veilige implementatie van AI-tools in de IT-infrastructuur van NHL Stenden, inclusief AVG en informatiebeveiliging.' },
                  { icon: '🤝', titel: 'Solution Partner', tekst: 'Mensen die met medewerkers meedenken hoe AI concreet geïntegreerd kan worden in hun werkprocessen en toepassingen.' },
                  { icon: '🔭', titel: 'Technisch landschap', tekst: 'Voortdurend volgen van nieuwe AI-applicaties, platforms en infrastructuurontwikkelingen zoals SURF, GPT-NL en AI-Fabriek Groningen.' },
                  { icon: '⚙️', titel: 'Alternatieve oplossingen', tekst: 'Kunnen alternatieve, soevereine en open-source AI-oplossingen identificeren en beoordelen als alternatief voor commerciële aanbieders.' },
                ].map(item => (
                  <div key={item.titel} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="font-semibold text-nhl-blauw text-sm mb-1">{item.titel}</div>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.tekst}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="text-sm text-gray-500">
                  <strong className="text-nhl-blauw">Laag verbonden aan:</strong> Lagen 2-4 van het vijflagenmodel · SURF AI-Hub · AI-Fabriek Groningen · GPT-NL
                </div>
                <div className="flex gap-3">
                  <ContactKnop contact={null} label="Technisch vraagstuk?" />
                  <Link to="/fundament" className="inline-flex items-center gap-1.5 text-xs font-semibold text-nhl-blauw hover:text-nhl-roze transition-colors">
                    Naar het fundament →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kernteam groeit mee — thema trekkers */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-start gap-4 mb-5">
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
                <div key={t.thema} className="rounded-xl border-2 p-4 flex flex-col" style={{ borderColor: t.kleur + '40', backgroundColor: t.kleur + '08' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{t.icon}</span>
                    <div className="font-bold text-sm" style={{ color: t.kleur }}>{t.thema}</div>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-1">{t.omschrijving}</p>
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Thema-trekker</div>
                    <ContactKnop contact={t.contact} label="Contact trekker" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Netwerkorganisatie */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="section-label mb-2">Hoe we werken</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Een netwerkorganisatie</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {[
              { icon: '🧠', titel: 'Collectieve intelligentie', tekst: 'Kennis is verspreid over het netwerk en wordt actief gedeeld. Het AI-Netwerk maakt die kennis vindbaar voor iedereen.' },
              { icon: '⚡', titel: 'Snelle verspreiding', tekst: 'Een goed initiatief verspreidt zich snel, zonder dat er een formeel besluit voor nodig is. Zichtbaarheid is de motor.' },
              { icon: '🛡️', titel: 'Veerkracht', tekst: 'Als een onderdeel vertraagt, blijft het netwerk als geheel functioneren. Er is geen enkel faalpoint.' },
            ].map(item => (
              <div key={item.titel} className="text-center bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-bold text-nhl-blauw mb-2">{item.titel}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.tekst}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fasering */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="section-label mb-2">De weg vooruit</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Fasering 2026–2027</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden sm:block"/>
            <div className="space-y-6">
              {fasering.map((f, i) => (
                <div key={f.fase} className="relative sm:pl-16">
                  <div className="absolute left-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm hidden sm:flex"
                    style={{ backgroundColor: ['#1E3A8A','#0F766E','#7C3AED','#E91E8C'][i] }}>
                    {i + 1}
                  </div>
                  <div className="card p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="font-bold text-nhl-blauw text-lg">{f.fase}</div>
                      <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full flex-shrink-0">{f.periode}</div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{f.focus}</p>
                    <div className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-500 italic">Resultaat: {f.resultaat}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gray-50 rounded-2xl p-10 mb-8">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Doe mee aan het AI-Netwerk</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">Het AI-Netwerk groeit vanuit de organisatie zelf. Jouw kennis, initiatief of vraag maakt het netwerk rijker.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/meld" className="btn-roze">+ Meld een initiatief</Link>
            <Link to="/netwerk" className="btn-primary">Bekijk het netwerk</Link>
            <Link to="/themas" className="btn-ghost border border-gray-200">Ontdek de thema's</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
