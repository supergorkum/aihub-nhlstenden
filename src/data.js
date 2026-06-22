export const sporen = [
  {
    id: 1,
    titel: 'AI & Leren',
    bolLabel: 'AI &\nLeren',
    icon: '🎓',
    kleur: '#1E3A8A',
    kort: 'Onderwijs, didactiek, studiesucces en voorbereiding op de arbeidsmarkt.',
    waarom: 'AI verandert hoe studenten leren en hoe docenten lesgeven. Van toetsing en integriteit tot curriculumontwikkeling en studiesucces — dit thema raakt de kern van wat NHL Stenden doet. Hier is de urgentie het meest voelbaar in de dagelijkse praktijk.',
    uitleg: 'Onder dit thema vallen alle vraagstukken rond AI in het onderwijs én in de begeleiding van studenten. Hoe gebruik je AI integer in opdrachten en toetsen? Hoe integreer je AI-vaardigheden in het curriculum? Hoe helpt AI om studenten beter te begeleiden en uitval te verminderen? AI is hier zowel onderwerp van onderwijs als middel om het onderwijs te verbeteren.',
    themas: ['Toetsing & integriteit', 'Didactische inbedding', 'Curriculumontwikkeling', 'Studiesucces & uitval', 'Arbeidsmarktvoorbereiding', 'Studentbegeleiding met AI'],
  },
  {
    id: 2,
    titel: 'AI & Werken',
    bolLabel: 'AI &\nWerken',
    icon: '⚙️',
    kleur: '#0F766E',
    kort: 'Procesverbetering, bedrijfsvoering en nieuwe werkwijzen bij diensten.',
    waarom: 'AI raakt niet alleen het onderwijs maar ook hoe NHL Stenden als organisatie functioneert. Diensten werken slimmer, processen worden geautomatiseerd en nieuwe tools maken werk efficiënter. Maar zonder richting leidt dat tot losse initiatieven zonder samenhang.',
    uitleg: 'Onder dit thema vallen AI-toepassingen in de bedrijfsvoering van NHL Stenden: van FCP en HRM tot facilitaire diensten. Hoe zetten we AI in om processen te verbeteren? Hoe bouwen medewerkers zelf tools voor hun vakgebied? En hoe zorgen we dat nieuwe AI-mogelijkheden aansluiten op onze kernmissie?',
    themas: ['Procesverbetering bij diensten', 'Datagedreven werken', 'Eigen toolontwikkeling', 'Automatisering & efficiëntie', 'AI in HR en planning', 'Nieuwe werkwijzen'],
  },
  {
    id: 3,
    titel: 'AI & Verantwoordelijkheid',
    bolLabel: 'AI &\nVerantw.',
    icon: '⚖️',
    kleur: '#E91E8C',
    kort: 'Governance, AI Act, soevereiniteit en eigenaarschap.',
    waarom: 'AI zonder governance leidt tot risico\'s die de instelling niet kan dragen. Verantwoord werken is geen rem op innovatie maar de voorwaarde ervoor. Wie beslist wat, op basis waarvan, en hoe wordt dat verantwoord?',
    uitleg: 'Onder dit thema vallen alle vraagstukken rond verantwoord AI-gebruik: compliance met de AI Act, keuzes over digitale soevereiniteit, privacy en datagebruik, en eigenaarschap van AI-instrumenten. De AI-desk is het loket waar initiatieven worden getoetst voordat ze breed worden ingezet.',
    themas: ['AI Act-compliance', 'Digitale soevereiniteit', 'Privacy & data', 'AI-desk & eigenaarschap', 'Ethiek & transparantie', 'Toezicht & verantwoording'],
  },
  {
    id: 4,
    titel: 'AI-Geletterdheid',
    bolLabel: 'AI-\nGeletterd.',
    icon: '📖',
    kleur: '#7C3AED',
    kort: 'De doorlopende basis voor iedereen in de organisatie.',
    waarom: 'Geen enkel ander thema werkt zonder mensen die begrijpen wat AI is en wat het van hen vraagt. Geletterdheid is geen eenmalige training maar een doorlopend fundament — de sleutel tot eigenaarschap en duurzame verandering.',
    uitleg: 'Onder dit thema vallen alle activiteiten gericht op het begrijpen en verantwoord kunnen inzetten van AI. Voor bestuurders betekent dat strategisch inzicht. Voor docenten praktische vaardigheden. Voor studenten een competentie die hen voorbereidt op de arbeidsmarkt. En voor medewerkers de zelfredzaamheid om AI in hun eigen werk te gebruiken.',
    themas: ['Bestuur & strategisch inzicht', 'Docenten & AI in de les', 'Studenten & AI-competenties', 'Medewerkers & zelfredzaamheid', 'Organisatiebrede leertrajecten', 'Aansluiting NPULS & nationaal beleid'],
  },
]

export const lagen = [
  {
    nr: 5,
    naam: 'Gebruik & Toepassingen',
    omschrijving: 'Wat studenten en medewerkers dagelijks zien en gebruiken. AI in onderwijs, curriculum, didactiek en werkprocessen.',
    uitleg: 'Dit is de laag die iedereen ziet en ervaart. Hier worden AI-toepassingen ingezet in het onderwijs, in begeleiding van studenten en in de dagelijkse werkprocessen van medewerkers. De kwaliteit van wat hier gebeurt is direct afhankelijk van de lagen eronder.',
    eigenaar: 'Alle Academies & Diensten',
    kleur: '#1E3A8A'
  },
  {
    nr: 4,
    naam: 'Platforms & Applicaties',
    omschrijving: 'Welke tools worden goedgekeurd? Wie beslist over aanschaf en afschaf? De laag met de meeste urgentie.',
    uitleg: 'Zonder regie op deze laag kiest iedereen zijn eigen tools: onveilig, duur en niet geïntegreerd. Centrale regie over welke platforms worden goedgekeurd, gecombineerd met decentrale vrijheid over de inzet ervan, is hier het leidende principe.',
    eigenaar: 'Prog. Digitale Transitie',
    kleur: '#2563EB',
    urgent: true
  },
  {
    nr: 3,
    naam: 'Onderwijs, Onderzoek & Data',
    omschrijving: 'De onderwijskundige beweging, kennisontwikkeling, data-architectuur en AI-modellen. Welke modellen vertrouwen we? Hoe gaan we om met onze eigen data?',
    uitleg: 'OO&I stuurt op de inhoudelijke en onderwijskundige kant van AI: hoe integreren we het in curriculum en didactiek, welke AI-modellen passen bij onze waarden, hoe borgen we kwaliteit en privacy in onze data-architectuur, en hoe ontwikkelen we de onderzoekslijn rond AI in het onderwijs? Dit is de laag waar techniek en onderwijs samenkomen.',
    eigenaar: 'OO&I',
    kleur: '#0F766E'
  },
  {
    nr: 2,
    naam: 'Chips & Hardware',
    omschrijving: 'Rekenkracht en servers. Hoeveel eigen rekenkracht willen we bezitten? Balans tussen cloud en on-premise.',
    uitleg: 'De strijd om rekenkracht is ook een geopolitieke strijd. Wie de chips controleert, controleert de toekomst van AI. NHL Stenden kiest voor een bewuste sourcingstrategie: balans tussen cloud en on-premise, in samenwerking met SURF en de AI-Fabriek Groningen.',
    eigenaar: 'DLWO',
    kleur: '#7C3AED'
  },
  {
    nr: 1,
    naam: 'Energie & Infrastructuur',
    omschrijving: 'De fysieke basis en stroom. AI verbruikt enorme hoeveelheden energie. Voldoen onze faciliteiten aan de groeiende vraag?',
    uitleg: 'Eén AI-vraag kost tot 100x meer energie dan een standaard zoekopdracht. De druk op energienetten en duurzaamheidsdoelstellingen neemt toe. Facility Management bewaakt of onze fysieke infrastructuur klaar is voor de exponentiële AI-groei, en onderzoekt off-campus oplossingen zoals de SURF AI-hub en AI-Fabriek Groningen.',
    eigenaar: 'Facility Management',
    kleur: '#374151'
  },
]

export const initiatieven = [
  { id: 1, naam: 'AI Compliance Groep', omschrijving: 'Rapporteert regelmatig over AI-risicos en signaleert waar actie nodig is, in lijn met de AI Act.', laag: 4, spoor: 3, status: 'actief', type: 'intern', tags: ['Governance', 'AI Act', 'Compliance'] },
  { id: 2, naam: 'AI Coalitie NHL Stenden', omschrijving: 'Brede coalitie van medewerkers en docenten die actief met AI bezig zijn. In opbouw.', laag: 5, spoor: 1, status: 'groeiend', type: 'intern', tags: ['Netwerk', 'Onderwijs', 'Organisatie'] },
  { id: 3, naam: 'Academie Educatie: Digitalisering & Mediawijsheid', omschrijving: 'Integratie van AI in de praktijk van digitalisering en mediawijsheid binnen de lerarenopleiding.', laag: 5, spoor: 1, status: 'actief', type: 'intern', tags: ['Onderwijs', 'Geletterdheid', 'PABO'] },
  { id: 4, naam: 'FCP: Data & AI', omschrijving: 'Financien, Control & Planning omarmt AI in datagedreven werken en bedrijfsvoeringsprocessen.', laag: 3, spoor: 2, status: 'actief', type: 'intern', tags: ['Bedrijfsvoering', 'Data', 'Financien'] },
  { id: 5, naam: 'BDB Cursus AI-verrijking', omschrijving: 'De Basiskwalificatie Didactische Bekwaamheid wordt verrijkt met AI-componenten voor docenten.', laag: 5, spoor: 4, status: 'actief', type: 'intern', tags: ['Docenten', 'Geletterdheid', 'BDB'] },
  { id: 6, naam: 'SURF Denktank', omschrijving: 'Strategisch netwerk van hoger onderwijsinstellingen dat de koers voor AI mede bepaalt. NHL Stenden levert actief input aan de koersbepaling.', laag: 4, spoor: 3, status: 'actief', type: 'surf', tags: ['Strategie', 'SURF', 'Hoger Onderwijs'] },
  { id: 7, naam: 'NPULS Digitale Geletterdheid', omschrijving: 'Nationaal programma voor digitale geletterdheid. Kaders en materialen direct bruikbaar voor het geletterdheidsthema.', laag: 5, spoor: 4, status: 'actief', type: 'extern', tags: ['Geletterdheid', 'Nationaal', 'NPULS'] },
  { id: 8, naam: 'SURF AI-HUB & GPT-NL', omschrijving: 'Soevereine infrastructuur en Nederlands eigen taalmodel als alternatief voor commerciele aanbieders. AVG-compliant en transparant.', laag: 3, spoor: 3, status: 'actief', type: 'surf', tags: ['Soevereiniteit', 'AVG', 'Taalmodel'] },
  { id: 9, naam: 'AI-Fabriek Groningen', omschrijving: 'Regionale soevereine rekenkracht en datafaciliteit. Strategisch relevant als noordelijke instelling en alternatief voor Big Tech rekenkracht.', laag: 2, spoor: 3, status: 'actief', type: 'surf', tags: ['Infrastructuur', 'Rekenkracht', 'Regio'] },
  { id: 10, naam: 'Regulatory Sandbox', omschrijving: 'Gecontroleerde experimenteeromgeving voor veilig experimenteren met AI. In voorbereiding.', laag: 4, spoor: 3, status: 'in-ontwikkeling', type: 'intern', tags: ['Sandbox', 'Innovatie', 'RDI'] },
  { id: 11, naam: 'AI-Desk', omschrijving: 'Verplicht loket voor medewerkers die een AI-tool willen bouwen of inzetten. In voorbereiding.', laag: 4, spoor: 3, status: 'in-ontwikkeling', type: 'intern', tags: ['Governance', 'Loket', 'Ondersteuning'] },
]

export const vraagCategorieen = [
  { id: 'vraag', label: 'Ik heb een vraag', icon: '❓', uitleg: 'Je hebt een concrete vraag over AI bij NHL Stenden en zoekt een antwoord of de juiste persoon.' },
  { id: 'idee', label: 'Ik heb een idee', icon: '💡', uitleg: 'Je hebt een idee voor een AI-toepassing, aanpak of verbetering en wilt dit delen.' },
  { id: 'initiatief', label: 'Ik wil een initiatief aanmelden', icon: '🚀', uitleg: 'Je bent al bezig met iets op het gebied van AI en wilt dit zichtbaar maken in de AI-HUB.' },
  { id: 'ondersteuning', label: 'Ik zoek ondersteuning of samenwerking', icon: '🤝', uitleg: 'Je wilt samenwerken met anderen of hebt hulp nodig bij een AI-vraagstuk.' },
  { id: 'zorg', label: 'Ik heb een zorg of signaal', icon: '⚠️', uitleg: 'Je hebt een zorg, risico of signaal dat aandacht verdient van het AI-HUB team.' },
]

export const rolOpties = ['Docent', 'Onderzoeker', 'Student', 'Medewerker dienst', 'Management', 'Anders']

export const initiatief_types = ['intern', 'extern', 'surf']

export const BEHEER_CODE = 'aihub2026'
