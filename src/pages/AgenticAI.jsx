import { useState } from 'react'
import GradientHeader from '../components/GradientHeader'

const LAGEN = [
  {
    nr: 1,
    naam: 'AI & Machine Learning',
    sleutelwoord: 'Voorspellen',
    kleur: '#1E3A8A',
    licht: '#EFF6FF',
    samenvatting: 'Leert patronen herkennen uit grote hoeveelheden voorbeelddata.',
    uitleg:
      'Dit is het fundament van alle AI. Een computersysteem wordt niet geprogrammeerd met vaste regels, maar leert door voorbeelden te analyseren. Net zoals een kind leert dat een hond een hond is door er honderden te zien, leert dit systeem patronen te herkennen door grote hoeveelheden data te verwerken.',
    technieken: [
      { naam: 'Supervised Learning', uitleg: 'Leert van voorbeelden mét het juiste antwoord erbij, totdat het zelf goede voorspellingen kan doen.' },
      { naam: 'Unsupervised Learning', uitleg: 'Ontdekt zelf structuren en groepen in data, zonder vooraf gegeven antwoorden.' },
      { naam: 'Reinforcement Learning', uitleg: 'Leert door te handelen en feedback te krijgen: een beloning bij succes, een correctie bij falen.' },
    ],
    voorbeeld: {
      titel: 'Studieloopbaanbegeleiding in het onderwijs',
      tekst: 'Een hogeschool analyseert studiegedrag van duizenden studenten uit eerdere jaren: aanwezigheid, cijfers, gebruik van de digitale leeromgeving. Het systeem leert welke patronen samenhangen met voortijdige uitval. Zodra een huidige student een vergelijkbaar patroon vertoont, krijgt de studieloopbaanbegeleider een signaal, zodat er vroeg kan worden ingegrepen.',
    },
  },
  {
    nr: 2,
    naam: 'Deep Learning',
    sleutelwoord: 'Begrijpen',
    kleur: '#0F766E',
    licht: '#F0FDFA',
    samenvatting: 'Gebruikt gelaagde neurale netwerken om complexere patronen te herkennen, zoals beeld, spraak en taal.',
    uitleg:
      'Deep Learning is een geavanceerde vorm van Machine Learning die werkt met kunstmatige neurale netwerken, losjes geïnspireerd op de werking van menselijke hersenen. Hoe meer lagen het netwerk heeft, hoe complexere patronen het kan herkennen. Dit is de technologie achter gezichtsherkenning, realtime vertaling en het herkennen van afwijkingen op medische scans.',
    technieken: [
      { naam: 'CNNs (beeld)', uitleg: 'Gespecialiseerd in het verwerken van beelden: van lijnen en kleuren naar vormen en objecten.' },
      { naam: 'LSTMs (tekst & spraak)', uitleg: 'Ontworpen voor data met een tijdsdimensie, zoals tekst en spraak. Onthoudt wat eerder gezegd werd.' },
      { naam: 'Large Language Models', uitleg: 'De motor achter moderne chatbots, getraind op miljarden teksten. GPT-4 en Claude zijn voorbeelden.' },
    ],
    voorbeeld: {
      titel: 'Automatisch vertalen van collegemateriaal',
      tekst: 'Een hogeschool met internationale studenten gebruikt een vertaalsysteem om studiehandleidingen automatisch te vertalen naar het Engels. Het systeem begrijpt niet alleen losse woorden, maar ook de context van zinnen, waardoor de vertaling vloeiend en inhoudelijk correct is. Docenten controleren de uitvoer.',
    },
  },
  {
    nr: 3,
    naam: 'Generatieve AI',
    sleutelwoord: 'Creëren',
    kleur: '#7C3AED',
    licht: '#F5F3FF',
    samenvatting: 'Produceert zelf nieuwe inhoud, zoals tekst, beeld of code, op basis van een vraag of instructie.',
    uitleg:
      'Hier produceert AI voor het eerst zelf nieuwe inhoud: teksten, afbeeldingen, muziek, video of programmeercode. Generatieve AI werkt door te voorspellen wat, gegeven een vraag of instructie, de meest logische en passende voortzetting is. ChatGPT, Midjourney en GitHub Copilot zijn bekende voorbeelden.',
    technieken: [
      { naam: 'Prompt Engineering', uitleg: 'De kunst van het formuleren van een goede opdracht aan AI: met context, een duidelijk doel en de gewenste vorm.' },
      { naam: 'RAG', uitleg: 'De AI zoekt eerst relevante informatie op in een kennisbank voordat het antwoordt, voor actuele en specifieke kennis.' },
      { naam: 'Hallucination Mitigation', uitleg: 'Technieken die het risico beperken dat AI dingen verzint die plausibel klinken maar onjuist zijn.' },
    ],
    voorbeeld: {
      titel: 'Gepersonaliseerd oefenmateriaal genereren',
      tekst: 'Een docent beschrijft het leerdoel van de week en het niveau van de groep. De AI genereert daarop twintig oefenvragen, drie casussen en een verkorte samenvatting. De docent past twee vragen aan en publiceert het materiaal. Wat vroeger een halve dag kostte, duurt nu een uur.',
    },
  },
  {
    nr: 4,
    naam: 'AI Agents & Agentic AI',
    sleutelwoord: 'Automatiseren',
    kleur: '#E91E8C',
    licht: '#FDF2F8',
    samenvatting: 'Handelt zelfstandig: plant taken, voert ze uit en stuurt zo nodig complete processen aan.',
    uitleg:
      'De meest ingrijpende stap. Een AI Agent wacht niet op een vraag, maar streeft zelfstandig een doel na: het plant taken, voert stappen uit, evalueert het resultaat en past zijn aanpak aan. Bij Agentic AI werken meerdere gespecialiseerde agents samen als een team, elk met een eigen rol, om complete processen te automatiseren.',
    technieken: [
      { naam: 'Goal Decomposition', uitleg: 'Een groot doel wordt automatisch opgesplitst in kleinere deeltaken, met een eigen volgorde en prioritering.' },
      { naam: 'Human-in-the-Loop', uitleg: 'Een bewuste keuze om bij cruciale beslismomenten een mens in te schakelen, essentieel bij hoog risico.' },
      { naam: 'Multi-agent Collaboration', uitleg: 'Meerdere agents werken samen: de één verzamelt informatie, de ander analyseert, een derde rapporteert.' },
    ],
    voorbeeld: {
      titel: 'Geautomatiseerde aanmelding en intake',
      tekst: 'Een aankomende student meldt zich aan via de website. Een AI Agent controleert de documenten, stuurt een bevestigingsmail, plant een intakegesprek in en bereidt een dossier voor. Pas bij uitzonderingen, zoals onvolledige documentatie, schakelt de agent een medewerker in.',
    },
  },
]

const RANDVOORWAARDEN = [
  { naam: 'Agent Capabilities', uitleg: 'Wat een agent kan: zelfstandig verbeteren, samenwerken met andere agents, informatie onthouden, terugvallen op een vorige stabiele staat.' },
  { naam: 'Agent Management', uitleg: 'Hoe je agents beheert: taken inplannen, fouten ongedaan maken, leren van feedback, kosten en rekenkracht bewaken.' },
  { naam: 'Governance & Future', uitleg: 'De ethische en juridische kaders: wie is verantwoordelijk, hoe lang mag data bewaard worden, hoe blijft gedrag inzichtelijk.' },
  { naam: 'Outputs & Interfaces', uitleg: 'Hoe AI communiceert met de buitenwereld: tekst, gesproken woord, een dashboard, of een koppeling met andere software.' },
]

const VRAGEN = [
  {
    vraag: 'Op welke laag bevindt de AI zich die wij inzetten?',
    uitleg: 'Veel huidige AI-tools in het onderwijs zitten op laag twee of drie: ze herkennen patronen of genereren content. Volledig autonome agents (laag vier) zijn in opkomst maar nog beperkt ingezet. De risico\'s en randvoorwaarden verschillen per laag.',
    voorbeeld: 'Een AI-schrijfhulp (laag 3) stelt voor, maar de student beslist. Een AI-agent die zelfstandig roosterproblemen oplost (laag 4) handelt zonder directe menselijke sturing. Bij die laatste is governance essentieel.',
  },
  {
    vraag: 'Wie is verantwoordelijk als AI een beslissing neemt?',
    uitleg: 'Hoe groter de autonomie van het systeem, hoe zwaarder het vraagstuk van verantwoording weegt. De EU AI Act vereist bij hoog-risico AI, zoals systemen die meebeslissen over toelating of beoordeling, altijd menselijk toezicht. Dit heet human-in-the-loop.',
    voorbeeld: 'Een systeem dat automatisch een onvoldoende registreert op basis van een plagiaatsignaal, moet altijd een menselijke controleslag kennen voordat het definitief wordt. De AI signaleert, de docent besluit.',
  },
  {
    vraag: 'Wat moeten studenten en medewerkers begrijpen?',
    uitleg: 'AI-geletterdheid betekent niet dat iedereen AI moet kunnen programmeren. Wel dat je begrijpt wat een systeem doet, op welke data het is gebaseerd, wanneer de uitvoer betrouwbaar is en wanneer kritisch toezicht nodig is.',
    voorbeeld: 'Een student die AI gebruikt voor onderzoek moet weten dat het systeem kan hallucineren: feitelijk onjuiste informatie presenteren met grote stelligheid. Bronverificatie blijft altijd nodig.',
  },
  {
    vraag: 'Welke kansen liggen er voor onze instelling?',
    uitleg: 'AI biedt kansen voor werklastverlichting bij docenten, gepersonaliseerde leerroutes en efficiëntere processen. De uitdaging zit niet in de technologie zelf, maar in de inbedding ervan: mensen, processen, governance en cultuur.',
    voorbeeld: 'Roostering, studieloopbaanbegeleiding en feedbackverwerking zijn processen waar AI in laag drie of vier al bewezen waarde levert. De sleutel is stapsgewijze invoering met aandacht voor draagvlak.',
  },
]

// Eigen visualisatie van het vierlagen-model, in de huisstijl van het AI-Netwerk.
// Dit is een eigen interpretatie, niet een kopie van de originele afbeelding.
function LagenDiagram({ actieveLaag, setActieveLaag }) {
  const radii = [150, 115, 78, 40]
  const center = 160
  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-sm mx-auto">
      {LAGEN.slice().reverse().map((laag, i) => {
        const r = radii[i]
        const isActief = actieveLaag === laag.nr
        return (
          <g key={laag.nr} onClick={() => setActieveLaag(laag.nr)} className="cursor-pointer">
            <circle
              cx={center} cy={center} r={r}
              fill={laag.licht}
              stroke={laag.kleur}
              strokeWidth={isActief ? 3 : 1.5}
              opacity={isActief ? 1 : 0.85}
            />
          </g>
        )
      })}
      {LAGEN.map((laag, i) => {
        const labelR = [40, 78, 115, 150][i] - 19
        return (
          <text
            key={laag.nr}
            x={center}
            y={center - labelR}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            fill={laag.kleur}
            onClick={() => setActieveLaag(laag.nr)}
            className="cursor-pointer select-none"
          >
            {laag.nr}
          </text>
        )
      })}
    </svg>
  )
}

export default function AgenticAI() {
  const [actieveLaag, setActieveLaag] = useState(1)
  const laag = LAGEN.find(l => l.nr === actieveLaag)

  return (
    <div className="min-h-screen pt-16 bg-white">
      <GradientHeader
        label="Kennis · Een toegankelijke uitleg"
        title="Agentic AI"
        subtitle="Van een systeem dat patronen herkent tot een systeem dat zelfstandig handelt. Een uitleg zonder technische voorkennis, in vier lagen."
      />

      <div className="max-w-4xl mx-auto px-4 mt-8">

        {/* Bronvermelding, vooraan en duidelijk */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-12 text-sm text-gray-600 leading-relaxed">
          <div className="font-semibold text-nhl-blauw mb-1.5">Over deze pagina</div>
          Het onderliggende vierlagen-model op deze pagina is gebaseerd op het <strong>Agentic AI Framework</strong> van{' '}
          <a href="https://www.linkedin.com/in/luisrodriguesengineer/" target="_blank" rel="noopener noreferrer" className="text-nhl-blauw font-medium hover:text-nhl-roze transition-colors">
            Luis Rodrigues
          </a>, een Portugese AI-specialist en educator die toegankelijke uitleg over AI deelt. Het idee en de structuur van het framework zijn van hem; de visualisatie hieronder is een eigen, in de huisstijl van het AI-Netwerk gemaakte interpretatie, en de toelichtingen, onderwijsvoorbeelden en bestuurlijke context zijn door het AI-Netwerk toegevoegd om het raamwerk betekenis te geven voor NHL Stenden.
        </div>

        {/* Intro */}
        <div className="mb-12">
          <p className="text-gray-600 leading-relaxed mb-4">
            AI is geen los ding, het is een opbouw van vier lagen die op elkaar voortbouwen, van eenvoudig tot geavanceerd. Elke laag kan iets meer dan de vorige. Je hebt geen technische achtergrond nodig om dit te volgen: lees rustig laag voor laag, of klik direct op de laag die je interesseert.
          </p>
        </div>

        {/* Visualisatie */}
        <div className="bg-gray-50 rounded-3xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <LagenDiagram actieveLaag={actieveLaag} setActieveLaag={setActieveLaag} />
            <div className="space-y-2">
              {LAGEN.map(l => (
                <button
                  key={l.nr}
                  onClick={() => setActieveLaag(l.nr)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-colors ${actieveLaag === l.nr ? 'bg-white' : 'border-transparent hover:bg-white/60'}`}
                  style={{ borderColor: actieveLaag === l.nr ? l.kleur : 'transparent' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: l.kleur }}>{l.nr}</span>
                    <span className="font-semibold text-sm" style={{ color: l.kleur }}>{l.naam}</span>
                  </div>
                  <div className="text-xs text-gray-400 ml-8">{l.sleutelwoord}</div>
                </button>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">Elke laag bouwt voort op de vorige: geen Generatieve AI zonder Machine Learning, geen AI Agents zonder Generatieve AI.</p>
        </div>

        {/* Detail van de actieve laag */}
        {laag && (
          <div className="mb-16 rounded-3xl p-8 border-2" style={{ backgroundColor: laag.licht, borderColor: laag.kleur + '30' }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold text-white flex-shrink-0" style={{ backgroundColor: laag.kleur }}>{laag.nr}</span>
              <div>
                <div className="text-xl font-extrabold" style={{ color: laag.kleur }}>{laag.naam}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{laag.sleutelwoord}</div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">{laag.uitleg}</p>

            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {laag.technieken.map(t => (
                <div key={t.naam} className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="font-semibold text-sm mb-1" style={{ color: laag.kleur }}>{t.naam}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{t.uitleg}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Voorbeeld uit het onderwijs</div>
              <div className="font-semibold text-nhl-blauw text-sm mb-1.5">{laag.voorbeeld.titel}</div>
              <p className="text-gray-600 text-sm leading-relaxed">{laag.voorbeeld.tekst}</p>
            </div>
          </div>
        )}

        {/* De rol van data */}
        <div className="mb-16">
          <div className="section-label mb-2">Onder de motorkap</div>
          <h2 className="text-2xl font-bold text-nhl-blauw mb-3">Generatieve AI is eenvoudig om te gebruiken, maar niet eenvoudig van aard</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Een vraag typen en meteen een antwoord krijgen, voelt simpel. Maar achter die ene prompt gaat een gelaagd systeem schuil, zoals dit framework laat zien: van patroonherkenning, via neurale netwerken, naar het genereren van nieuwe inhoud. Die schijnbare eenvoud aan de oppervlakte is precies waarom het risico op overschatting groot is, mensen zien het resultaat, niet de complexiteit eronder.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="card p-6">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-bold text-nhl-blauw mb-2">Waarom GenAI complexer is dan het voelt</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Een taalmodel genereert geen antwoord uit kennis zoals een mens dat heeft, maar voorspelt het meest waarschijnlijke vervolg op basis van patronen in trainingsdata. Het heeft geen besef van waarheid, alleen van waarschijnlijkheid. Dat verklaart waarom het zelfverzekerd onjuiste informatie kan presenteren (hallucineren), en waarom de kwaliteit van het antwoord sterk afhangt van hoe de vraag gesteld wordt en welke context wordt meegegeven.
              </p>
            </div>
            <div className="card p-6">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-bold text-nhl-blauw mb-2">Data is de bepalende factor voor de waarde</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                De waarde die een organisatie uit AI haalt, wordt minder bepaald door welk model je gebruikt, en meer door de kwaliteit, structuur en toegankelijkheid van de data die je eraan toevoegt. Een AI-assistent die jouw eigen, actuele en goed georganiseerde documenten kan raadplegen (zoals bij RAG, zie laag 3) levert relevante, betrouwbare antwoorden. Dezelfde assistent zonder die data, of met verouderde en versnipperde data, levert algemene en vaak minder bruikbare antwoorden.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-5">
            <div className="font-bold text-amber-800 mb-2">Wat dit betekent voor NHL Stenden</div>
            <p className="text-sm text-amber-900 leading-relaxed">
              Investeren in AI-tooling alleen is niet voldoende. De grootste winst zit in informatiehuishouding: data op orde, vindbaar, actueel en met duidelijk eigenaarschap. Dat is geen technisch detail, maar een randvoorwaarde voor de waarde die AI kan toevoegen, en raakt rechtstreeks aan de thema's AI & Verantwoordelijkheid en digitale soevereiniteit die elders op deze site worden toegelicht.
            </p>
          </div>
        </div>


        <div className="mb-16">
          <div className="section-label mb-2">Rondom de lagen</div>
          <h2 className="text-2xl font-bold text-nhl-blauw mb-3">De randvoorwaarden</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Naast de vier lagen beschrijft het framework ook de randvoorwaarden: wat kunnen agents, hoe worden ze beheerd, en hoe zorgen we voor verantwoord gebruik?
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {RANDVOORWAARDEN.map(r => (
              <div key={r.naam} className="card p-5">
                <div className="font-bold text-nhl-blauw text-sm mb-1.5">{r.naam}</div>
                <p className="text-gray-500 text-sm leading-relaxed">{r.uitleg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wat betekent dit voor het onderwijs */}
        <div className="mb-16">
          <div className="section-label mb-2">Vertaling naar NHL Stenden</div>
          <h2 className="text-2xl font-bold text-nhl-blauw mb-6">Wat betekent dit voor het onderwijs?</h2>
          <div className="space-y-4">
            {VRAGEN.map((v, i) => (
              <div key={i} className="card p-6">
                <div className="font-bold text-nhl-blauw mb-2">{v.vraag}</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{v.uitleg}</p>
                <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 leading-relaxed">
                  <span className="font-semibold text-gray-600">In de praktijk: </span>{v.voorbeeld}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overzichtstabel */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-nhl-blauw mb-4">De vier lagen op een rij</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-400">
                  <th className="px-4 py-3">Laag</th>
                  <th className="px-4 py-3">Naam</th>
                  <th className="px-4 py-3">Kern</th>
                  <th className="px-4 py-3">Sleutelwoord</th>
                </tr>
              </thead>
              <tbody>
                {LAGEN.map(l => (
                  <tr key={l.nr} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                      <span className="w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: l.kleur }}>{l.nr}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-nhl-blauw">{l.naam}</td>
                    <td className="px-4 py-3 text-gray-500">{l.samenvatting}</td>
                    <td className="px-4 py-3 font-medium" style={{ color: l.kleur }}>{l.sleutelwoord}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Slot */}
        <div className="bg-nhl-blauw rounded-3xl p-8 sm:p-10 text-white mb-16">
          <div className="text-2xl mb-3">💡</div>
          <p className="text-lg leading-relaxed mb-3">
            AI is geen doel op zichzelf. Het is een gereedschap dat pas waarde heeft wanneer het begrijpelijk is voor de mensen die ermee werken, ingebed is in heldere processen en omgeven door kaders van verantwoording en toezicht.
          </p>
          <p className="text-blue-100 leading-relaxed">
            Digitale geletterdheid betekent: begrijpen wat AI kan, wat het niet kan, en wanneer jij als mens de regie houdt. Dat is de kern van verantwoord digitaliseren.
          </p>
        </div>

        {/* Bron onderaan */}
        <div className="text-xs text-gray-400 text-center pb-16">
          Gebaseerd op het Agentic AI Framework van Luis Rodrigues, gedeeld voor educatieve doeleinden.
          Onderwijsvoorbeelden en bestuurlijke context toegevoegd door het AI-Netwerk NHL Stenden.
        </div>
      </div>
    </div>
  )
}
