import GradientHeader from '../components/GradientHeader'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const kernteam = [
  {
    rol: 'Kwartiermaker Digitale Samenhang',
    subtitel: 'Spil & Strategie',
    omschrijving: 'De Kwartiermaker is de initiator, strateeg en bestuurlijk aanspreekpunt van de AI-HUB. Vanuit de rol binnen het Transitieprogramma Digitalisering wordt de AI-HUB verbonden aan de bredere digitaliseringsstrategie van NHL Stenden.',
    taken: [
      'Bewaakt de koers en de samenhang van de AI-HUB als geheel',
      'Bestuurlijk aanspreekpunt richting Stuurgroep Transitieprogramma en directie',
      'Verbindt de AI-HUB met het externe netwerk: SURF, NPULS, Vereniging Hogescholen',
      'Bewaakt de vier sporen en zorgt voor aansluiting op de organisatiepraktijk',
      'Initieert de ontwikkeling van het digitale AI-HUB instrument',
    ],
    kleur: '#1E3A8A',
    icon: '🧭',
  },
  {
    rol: 'Informatiemanager',
    subtitel: 'Inhoud & Netwerk',
    omschrijving: 'De Informatiemanager is verantwoordelijk voor de inhoudelijke kwaliteit en actualiteit van de AI-HUB. Deze rol vormt de brug tussen de informatiearchitectuur van de instelling en de praktijk van AI-gebruik.',
    taken: [
      'Beheert en actualiseert de inhoud: initiatieven, mensen, kaders en open vraagstukken',
      'Verbindt initiatieven aan het juiste laag en spoor',
      'Ondersteunt de inrichting van het informatiemodel achter het digitale instrument',
      'Bewaakt de aansluiting op bestaande informatiestromen en governance-processen',
      'Ondersteunt de AI-desk bij het beoordelen van nieuwe AI-initiatieven',
    ],
    kleur: '#0F766E',
    icon: '🗂️',
  },
  {
    rol: 'ICT Analist',
    subtitel: 'Techniek & Instrument',
    omschrijving: 'De ICT Analist is verantwoordelijk voor de technische realisatie en het beheer van het digitale AI-HUB instrument. Deze rol verbindt de inhoudelijke ambitie aan de technische mogelijkheden van de organisatie.',
    taken: [
      'Ontwikkelt en beheert het digitale AI-HUB instrument',
      'Analyseert technische vraagstukken: platforms, API-koppelingen, datastromen',
      'Ondersteunt de inrichting van sandbox-omgevingen vanuit technisch perspectief',
      'Bewaakt de aansluiting op de bestaande IT-architectuur van NHL Stenden',
      'Volgt technische ontwikkelingen bij SURF, AI-Fabriek en GPT-NL',
    ],
    kleur: '#7C3AED',
    icon: '⚙️',
  },
]

const waarden = [
  { icon: '🤝', titel: 'Verbinding', tekst: 'De AI-HUB verbindt mensen, initiatieven en kennis. Niet door te controleren, maar door zichtbaar te maken.' },
  { icon: '🔍', titel: 'Transparantie', tekst: 'We maken zichtbaar wat loopt, wat ontbreekt en waar risico\'s zitten. Ook als iets nog niet af is.' },
  { icon: '🎯', titel: 'Eigenaarschap', tekst: 'Duurzame verandering ontstaat bij mensen die begrijpen wat ze doen en waarom. Eigenaarschap is de sleutel.' },
  { icon: '⚖️', titel: 'Verantwoord', tekst: 'Publieke waarden staan centraal. AI inzetten op een manier die past bij wie we zijn als instelling.' },
]

const fasering = [
  { fase: 'Fundament', periode: '2026 Q3', focus: 'Kernteam operationeel. Lagenmodel en sporen intern bekend. Eerste inventarisatie van initiatieven en mensen.', resultaat: 'Gedeelde taal aanwezig. Eigenaarschap per laag belegd.' },
  { fase: 'Infrastructuur', periode: '2026 Q4', focus: 'Sandbox ingericht. AI-desk operationeel. Digitaal instrument in ontwikkeling. Geletterdheidstrajecten gestart.', resultaat: 'Experimenteren kan veilig beginnen.' },
  { fase: 'Netwerk', periode: '2027 Q1-Q2', focus: 'Spoor-trekkers actief. Ambassadeurs per Academie en Dienst aangesteld. Extern netwerk structureel verbonden.', resultaat: 'Het netwerk loopt grotendeels op eigen kracht.' },
  { fase: 'Verankering', periode: '2027 Q3+', focus: 'AI-HUB is onderdeel van de reguliere bestuurs- en beleidsritmen. Programmatische sturing neemt af.', resultaat: 'Netwerkorganisatie op kruissnelheid. AI-HUB leeft.' },
]

export default function Over() {
  return (
    <div className="min-h-screen pt-16 bg-gray-50">

      {/* Hero */}
      <div className="nhl-gradient-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-10 -right-10 w-96 h-96 border border-white rounded-full" />
          <div className="absolute bottom-0 left-20 w-64 h-64 border border-white rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative">
          <div className="max-w-3xl">
            <div className="section-label text-blue-300 mb-3">Wie zijn wij</div>
            <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
              Over de AI-HUB
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-6">
              De AI-HUB is geen afdeling en geen project. Het is een <strong className="text-white">voertuig</strong> — een levende, 
              digitale en organisatorische structuur die mensen, initiatieven en kennis met elkaar verbindt.
            </p>
            <p className="text-blue-200 leading-relaxed">
              Ontstaan vanuit de overtuiging dat echte digitale verandering begint bij mensen: bij hoe zij werken, 
              leren en samenwerken, en bij de mate waarin zij zich digitaal zeker en vaardig voelen.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 72" fill="none" preserveAspectRatio="none" className="w-full block"><path d="M0 72L1440 72L1440 28C1320 60 1200 8 1080 20C960 32 840 64 720 52C600 40 480 4 360 16C240 28 120 60 0 40L0 72Z" fill="white"/><path d="M0 72L1440 72L1440 40C1320 68 1200 20 1080 36C960 52 840 72 720 64C600 56 480 20 360 32C240 44 120 68 0 52L0 72Z" fill="white" fillOpacity="0.5"/></svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

        {/* De kerngedachte */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="section-label mb-3">De kerngedachte</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-5">Waarom de AI-HUB bestaat</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                AI overkomt NHL Stenden van alle kanten tegelijk. Studenten gebruiken het voor opdrachten. 
                Docenten worstelen met vragen over integriteit. Diensten automatiseren processen. 
                En externe regelgeving zoals de AI Act verplicht ons tot actie.
              </p>
              <p>
                Dit alles gebeurt gefragmenteerd. Iedereen handelt vanuit goede bedoelingen, maar zonder 
                gedeeld overzicht, gedeelde taal of gedeeld kompas. De AI-HUB brengt dat samen.
              </p>
              <p>
                Niet door beleid op te leggen. Maar door <strong className="text-nhl-blauw">zichtbaar te maken</strong> wat er is, 
                <strong className="text-nhl-blauw"> te verbinden</strong> wie er bezig zijn, en <strong className="text-nhl-blauw">richting te geven</strong> vanuit 
                gedeelde waarden.
              </p>
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

        {/* Kernuitspraak */}
        <div className="bg-nhl-blauw rounded-2xl p-8 mb-20 text-center">
          <div className="text-4xl mb-4">🎯</div>
          <blockquote className="text-white text-xl font-medium italic leading-relaxed max-w-3xl mx-auto mb-3">
            "De inzet van AI moet leiden tot meer studiesucces, minder uitval en minder voortijdig vertrek."
          </blockquote>
          <div className="text-blue-200 text-sm">De kernambitie van de AI-HUB — AI als middel, niet als doel</div>
        </div>

        {/* Het kernteam */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="section-label mb-2">Het team</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Het kernteam</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Het kernteam bestaat in de opstartfase uit drie rollen die elkaar complementeren. 
              Samen dekken zij de breedte van de AI-HUB: van strategie tot inhoud en techniek.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {kernteam.map(lid => (
              <div key={lid.rol} className="card overflow-hidden">
                <div className="h-2 w-full" style={{ backgroundColor: lid.kleur }} />
                <div className="p-6">
                  <div className="text-3xl mb-3">{lid.icon}</div>
                  <div className="font-bold text-nhl-blauw text-lg mb-1 leading-snug">{lid.rol}</div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: lid.kleur }}>{lid.subtitel}</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{lid.omschrijving}</p>
                  <div className="space-y-1.5">
                    {lid.taken.map((taak, i) => (
                      <div key={i} className="flex gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: lid.kleur }} />
                        {taak}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-gray-50 rounded-2xl p-5 border border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              <strong className="text-nhl-blauw">Het kernteam groeit mee.</strong> Per spoor komen trekkers, per Academie en Dienst komen ambassadeurs. 
              Het netwerk bouwt zich op vanuit vertrouwen, eigenaarschap en gedeelde ambitie.
            </p>
          </div>
        </div>

        {/* Netwerkorganisatie uitleg */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="section-label mb-2">Hoe we werken</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Een netwerkorganisatie</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              De AI-HUB is geen hiërarchie en geen projectstructuur. Het is een levend systeem van 
              relaties, kennis en initiatief — verbonden op basis van gedeelde ambitie.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {[
              { icon: '🧠', titel: 'Collectieve intelligentie', tekst: 'Kennis is verspreid over het netwerk en wordt actief gedeeld. De AI-HUB maakt die kennis vindbaar voor iedereen.' },
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
          <div className="bg-nhl-roze/5 border border-nhl-roze/20 rounded-2xl p-6">
            <div className="flex gap-4">
              <div className="text-2xl flex-shrink-0">⚠️</div>
              <div>
                <div className="font-bold text-nhl-blauw mb-2">Van organisch naar programmatisch: de opstartfase</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Een netwerkorganisatie is het eindbeeld. Maar de weg ernaartoe vraagt in de opstartfase om meer sturing. 
                  Infrastructuur ontbreekt nog, eigenaarschap is nog niet belegd, geletterdheid is ongelijk verdeeld. 
                  Daarom wordt de AI-HUB in de opstartfase <strong>aangestuurd als een programma</strong> — met heldere 
                  fasering, expliciete mijlpalen en actieve bewaking van de samenhang.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fasering */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="section-label mb-2">De weg vooruit</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Fasering 2026–2027</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden sm:block" />
            <div className="space-y-6">
              {fasering.map((f, i) => (
                <div key={f.fase} className="relative sm:pl-16">
                  <div className="absolute left-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm hidden sm:flex" style={{ backgroundColor: ['#1E3A8A','#0F766E','#7C3AED','#E91E8C'][i] }}>
                    {i + 1}
                  </div>
                  <div className="card p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="font-bold text-nhl-blauw text-lg">{f.fase}</div>
                      <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full flex-shrink-0">{f.periode}</div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{f.focus}</p>
                    <div className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-500 italic">
                      Resultaat: {f.resultaat}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gray-50 rounded-2xl p-10 mb-12">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Doe mee aan de AI-HUB</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            De AI-HUB groeit vanuit de organisatie zelf. Jouw kennis, initiatief of vraag maakt het netwerk rijker.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/meld" className="btn-roze">+ Meld een initiatief</Link>
            <Link to="/netwerk" className="btn-primary">Bekijk het netwerk</Link>
          </div>
        </div>

        {/* Handleiding: Slim nieuws ophalen */}
        <div className="mb-12">
          <div className="section-label mb-2">Hoe werkt het</div>
          <h2 className="text-2xl font-bold text-nhl-blauw mb-8">Functies uitgelegd</h2>

          {/* Nieuws refresh */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
            <div className="nhl-gradient-deep px-6 py-5 flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <div className="text-white font-bold">Slim nieuws ophalen</div>
                <div className="text-blue-200 text-xs">AI-aangedreven nieuws voor NHL Stenden</div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                De AI-HUB kan automatisch relevante AI-nieuws ophalen en samenvatten. Een beheerder klikt op
                de knop "🔄 Nieuws ophalen" in de Beheeromgeving (Data tab). De AI analyseert dan artikelen
                van internationale bronnen zoals de Europese Commissie, OECD AI en educatieve media.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                {[
                  { stap: '1', tekst: 'Beheerder klikt op "🔄 Nieuws ophalen" in Beheer → Data' },
                  { stap: '2', tekst: 'Claude AI leest RSS feeds en beoordeelt elk artikel op relevantie voor NHL Stenden' },
                  { stap: '3', tekst: 'Relevante items verschijnen met 🤖 badge in de Inspiratie sectie' },
                ].map(s => (
                  <div key={s.stap} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                    <div className="w-7 h-7 rounded-full bg-nhl-blauw text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{s.stap}</div>
                    <p className="text-sm text-gray-600">{s.tekst}</p>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                <span className="text-xl flex-shrink-0">💡</span>
                <p className="text-sm text-blue-700">
                  Je ziet in de navigatiebalk wanneer de laatste refresh was: <strong>🤖 Nieuws · [datum]</strong>.
                  In de Beheeromgeving staat de exacte datum en tijd.
                </p>
              </div>
            </div>
          </div>

          {/* Roadmap handleiding */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
            <div className="nhl-gradient-deep px-6 py-5 flex items-center gap-3">
              <span className="text-2xl">🗺️</span>
              <div>
                <div className="text-white font-bold">Roadmap — handleiding</div>
                <div className="text-blue-200 text-xs">Hoe lees en gebruik je de roadmap?</div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                De roadmap (via <strong>Beleid → Roadmap</strong>) toont wat NHL Stenden moet organiseren op het
                gebied van AI-compliance en -beleid. Items zijn gekoppeld aan concrete AI Act artikelen.
              </p>

              <div className="space-y-4 mb-6">
                <h3 className="font-bold text-nhl-blauw">Hoe lees je een roadmap-item?</h3>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full border-2 border-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-nhl-blauw text-sm">Voorbeeld: AI-geletterdheid basistraining</div>
                      <div className="text-xs text-gray-400">🔴 Hoog · 📅 Q3 2026 · Verantwoordelijk: HR & OO&I</div>
                    </div>
                  </div>
                  <div className="ml-9 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-400 flex-shrink-0" /><span><strong>Rondje links</strong> — de huidige status. Klik erop om de status te wisselen.</span></div>
                    <div className="flex items-center gap-2"><span className="text-red-600 font-bold">🔴</span><span><strong>Prioriteit</strong> — hoog (rood), midden (geel) of laag (groen).</span></div>
                    <div className="flex items-center gap-2"><span>⚖️</span><span><strong>AI Act koppeling</strong> — het wetsartikel dat dit item vereist, met directe link.</span></div>
                  </div>
                </div>

                <h3 className="font-bold text-nhl-blauw">Statussen en wat ze betekenen</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { kleur: 'bg-orange-400', label: 'Nog te starten', uitleg: 'Er is nog niets mee gedaan. Moet worden opgepakt.' },
                    { kleur: 'bg-blue-500', label: 'In voorbereiding', uitleg: 'Er wordt aan gewerkt maar het is nog niet actief.' },
                    { kleur: 'bg-green-500', label: 'Lopend', uitleg: 'Actief in uitvoering.' },
                    { kleur: 'bg-gray-400', label: 'Afgerond ✓', uitleg: 'Klaar. Item staat doorgestreept.' },
                  ].map(s => (
                    <div key={s.label} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${s.kleur}`} />
                      <div>
                        <div className="font-semibold text-sm text-nhl-blauw">{s.label}</div>
                        <div className="text-xs text-gray-500">{s.uitleg}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="font-bold text-nhl-blauw">Taak aanmaken en afronden</h3>
                <div className="space-y-3">
                  {[
                    { n: '1', tekst: 'Klik op "+ Item toevoegen" in de Roadmap tab om een nieuwe taak toe te voegen.' },
                    { n: '2', tekst: 'Geef de taak een titel, omschrijving, prioriteit, planning en verantwoordelijke.' },
                    { n: '3', tekst: 'Klik op het rondje links van een item om de status te wisselen (te starten → in voorbereiding → lopend → afgerond).' },
                    { n: '4', tekst: 'Upload bewijslast via Documentatie. Koppel het document aan het juiste thema zodat het traceerbaar is.' },
                  ].map(s => (
                    <div key={s.n} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-nhl-blauw text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{s.n}</div>
                      <p className="text-sm text-gray-600 pt-1">{s.tekst}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <Link to="/initiatieven?tab=roadmap" className="btn-primary text-sm">Naar de Roadmap →</Link>
                <Link to="/initiatieven?tab=aiact" className="btn-ghost border border-gray-200 text-sm">Naar AI Act compliance →</Link>
              </div>
            </div>
          </div>

          {/* AI Act handleiding */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="nhl-gradient-deep px-6 py-5 flex items-center gap-3">
              <span className="text-2xl">⚖️</span>
              <div>
                <div className="text-white font-bold">AI Act compliance — handleiding</div>
                <div className="text-blue-200 text-xs">Wat moet NHL Stenden doen en wanneer?</div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                De AI Act compliance pagina (via <strong>Beleid → AI Act & Compliance</strong>) toont alle
                wettelijke verplichtingen die op NHL Stenden van toepassing zijn. Per artikel zie je wat er
                vereist is, wanneer het van kracht wordt, en of er al een roadmap-item voor is aangemaakt.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { vraag: 'Hoe weet ik wat ik moet doen?', antwoord: 'Klik op een artikel om het uit te klappen. Je ziet dan de volledige verplichting, de deadline, en een link naar de officiële wettekst.' },
                  { vraag: 'Er is nog geen roadmap-item — wat nu?', antwoord: 'Klik op "+ Voeg roadmap-item toe voor dit artikel". Dan ga je direct naar het formulier met de AI Act koppeling al ingevuld.' },
                  { vraag: 'Hoe weet ik of we compliant zijn?', antwoord: 'Als alle hoog-prioriteit items "Lopend" of "Afgerond" zijn, en je de bewijslast hebt geüpload bij Documentatie, ben je goed op weg.' },
                  { vraag: 'Waar upload ik bewijslast?', antwoord: 'Ga naar Documentatie en kies als categorie "Governance & Compliance". Geef het document een duidelijke naam inclusief het AI Act artikel, bijv. "Bewijs Art. 4 AI-geletterdheid training Q3 2026".' },
                ].map(q => (
                  <div key={q.vraag} className="bg-gray-50 rounded-xl p-4">
                    <div className="font-semibold text-nhl-blauw text-sm mb-1">→ {q.vraag}</div>
                    <p className="text-gray-600 text-sm">{q.antwoord}</p>
                  </div>
                ))}
              </div>
              <Link to="/initiatieven?tab=aiact" className="btn-primary text-sm">Naar AI Act compliance →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
