// Centrale begindata voor de hele applicatie
// State wordt beheerd in App.jsx zodat navigatie geen data verliest

export const INIT_VIDEOS = [
  {
    id: 1, status: 'goedgekeurd',
    titel: 'AI in het Hoger Onderwijs — Kansen en Uitdagingen',
    videoId: 'hJP5GqnTrNo',
    omschrijving: 'Een verkenning van hoe AI het hoger onderwijs transformeert en welke keuzes instellingen nu moeten maken.',
    trefwoorden: ['AI', 'Hoger Onderwijs', 'Didactiek'],
    spoor: 1, ingediendDoor: 'Kernteam AI-HUB', datum: '18 juni 2026',
    omhoog: 12, omlaag: 2,
  },
  {
    id: 2, status: 'goedgekeurd',
    titel: 'SURF: De toekomst van AI in Onderwijs',
    videoId: 'aircAruvnKk',
    omschrijving: 'SURF presenteert de visie op AI in het Nederlandse hoger onderwijs en wat dit betekent voor studenten en medewerkers.',
    trefwoorden: ['SURF', 'Strategie', 'Hoger Onderwijs'],
    spoor: 3, ingediendDoor: 'Kernteam AI-HUB', datum: '10 juni 2026',
    omhoog: 8, omlaag: 1,
  },
  {
    id: 3, status: 'goedgekeurd',
    titel: 'AI-Geletterdheid in de klas',
    videoId: 'ad79nYk2keg',
    omschrijving: 'Praktische aanpak voor docenten om AI-geletterdheid te integreren in het onderwijs.',
    trefwoorden: ['Geletterdheid', 'Docenten', 'Didactiek'],
    spoor: 4, ingediendDoor: 'OO&I', datum: '5 juni 2026',
    omhoog: 6, omlaag: 0,
  },
]

export const INIT_PILOTS = [
  {
    id: 1,
    naam: 'AI-Feedback in Schrijfonderwijs',
    academie: 'Academie Educatie',
    onderdeel: 'intern',
    platform: 'ChatGPT / OpenAI',
    status: 'Lopend',
    doel: 'Studenten krijgen automatische feedback op hun schrijfopdrachten met behulp van AI, waardoor de docent meer tijd heeft voor persoonlijke begeleiding.',
    bereiken: 'Betere schrijfvaardigheden studenten, hogere tevredenheid over feedback, tijdbesparing voor docenten.',
    spoor: 1, laag: 5,
    surf: 'Nee / niet van toepassing',
    trefwoorden: ['Feedback', 'Schrijven', 'Didactiek', 'Studenten'],
    ambities: ['studiesucces', 'uitval'],
    impactInschatting: 'gemiddeld',
    contactNaam: 'Projectteam Academie Educatie',
    contactEmail: '',
    startDatum: '2026-09',
    updates: [
      { id: 1, datum: '15 juni 2026', tekst: 'Eerste tests met drie docenten afgerond. Studenten reageren positief op de snelheid van feedback. Aandachtspunt: de feedback is soms te generiek.', auteur: 'Projectteam' },
    ],
  },
  {
    id: 2,
    naam: 'AI-Feedback ChatGPT op scripties',
    academie: 'Meerdere academies',
    onderdeel: 'intern',
    platform: 'ChatGPT (zakelijke versie)',
    status: 'Verkenning',
    doel: 'Docenten experimenteren met ChatGPT om studenten sneller feedback te geven op scripties. Geen sandboxaanvraag nodig: NHL Stenden is gebruiker, niet aanbieder. Wel verplicht: verwerkersovereenkomst en DPIA.',
    bereiken: 'Snellere feedback, tijdbesparing docenten, bewustwording over verantwoord AI-gebruik bij toetsing.',
    spoor: 1, laag: 5,
    surf: 'Nee / niet van toepassing',
    trefwoorden: ['Feedback', 'Scripties', 'Toetsing', 'ChatGPT'],
    ambities: ['studiesucces'],
    impactInschatting: 'gemiddeld',
    contactNaam: 'AI Compliance Team',
    contactEmail: '',
    startDatum: '2026-09',
    updates: [],
  },
  {
    id: 3,
    naam: 'Frisius MC AI-workshops',
    academie: 'Academie Verpleegkunde en Gezondheid',
    onderdeel: 'extern',
    platform: 'Diverse',
    status: 'In ontwikkeling',
    doel: 'Gezamenlijke AI-workshops tussen Frisius MC en NHL Stenden als onderdeel van de Friese AI-propositie. Focus op AI in de zorg: ambient listening, virtual nursing en ketenoverstijgende datakoppeling.',
    bereiken: 'Versterking samenwerking zorg en onderwijs, praktijkgericht AI-onderwijs in de zorgsector.',
    spoor: 5, laag: 5,
    surf: 'Nee / niet van toepassing',
    trefwoorden: ['Zorg', 'Frisius', 'Samenwerking', 'Workshop'],
    ambities: [],
    impactInschatting: 'hoog',
    contactNaam: 'Frisius MC en NHL Stenden Werkveld',
    contactEmail: '',
    startDatum: '2026-10',
    updates: [],
  }
]

export const INIT_DOCS = [
  { id: 1, titel: 'AI Kompas NHL Stenden', categorie: 'strategie', spoor: null, type: 'pdf', datum: 'Juni 2026', omschrijving: 'Strategisch overzicht van de AI-architectuur en het vijflagenmodel.', icon: '📄' },
  { id: 2, titel: 'AI-HUB Fundament v1.2', categorie: 'strategie', spoor: null, type: 'pdf', datum: 'Juni 2026', omschrijving: 'Fundament document met opzet, sporen en netwerkorganisatie.', icon: '📄' },
  { id: 3, titel: 'Blueprint AI-HUB presentatie', categorie: 'strategie', spoor: null, type: 'pptx', datum: 'Juni 2026', omschrijving: 'Visuele presentatie van de architectuur en werking van de AI-HUB.', icon: '📊' },
]

export const INIT_EVENEMENTEN = [
  {
    id: 1,
    naam: 'AI-HUB Kick-off Bijeenkomst',
    locatie: 'NHL Stenden Leeuwarden, Rengerslaan 8',
    datum: '2026-09-10',
    startTijd: '13:00',
    eindTijd: '16:00',
    omschrijving: 'Officiële lancering van de AI-HUB. Kennismaking met het kernteam en netwerken.',
    organisator: 'Kernteam AI-HUB',
    sporen: [1, 2, 3, 4],
    kleur: '#1E3A8A',
  },
  {
    id: 2,
    naam: 'SURF Denktank — AI in Onderwijs',
    locatie: 'SURF Utrecht',
    datum: '2026-09-24',
    startTijd: '10:00',
    eindTijd: '15:00',
    omschrijving: 'Strategische sessie over AI in het Nederlandse hoger onderwijs.',
    organisator: 'SURF',
    sporen: [1, 3],
    kleur: '#065F46',
  },
]

]

]

  { id: 10, titel: 'NVAO Startverkenning Generatieve AI', categorie: 'onderzoek', spoor: 6, type: 'pdf', datum: 'Januari 2026', omschrijving: 'Thematische analyse van generatieve AI in visitatierapporten. Conclusie: focus op toetsing, integrale aanpak ontbreekt. Aanbeveling: instellingsbrede richtlijnen en expliciete aandacht in kwaliteitszorg.', icon: '📊' },
  { id: 11, titel: 'AI Compliance Voortgangsrapportage', categorie: 'governance', spoor: 3, type: 'pdf', datum: 'Februari 2026', omschrijving: 'Rapportage AI Compliance Team aan CvB. Kernboodschap: AI leeft sterk maar centrale regie ontbreekt. Zeven aanbevelingen waaronder AI-visie, programmatische aanpak en formalisering van het AI-team.', icon: '📋' },
  { id: 12, titel: 'Programmavoorstel Bach - Digitale Autonomie', categorie: 'strategie', spoor: 6, type: 'pdf', datum: 'Januari 2026', omschrijving: 'Nationaal onderwijsversterkingsprogramma voor digitale soevereiniteit. Vier programmalijnen, investering 94 miljoen euro, geinitieerd vanuit de Universiteit van het Noorden.', icon: '🏛️' },
  { id: 13, titel: 'AI Regulatory Sandbox Praktijkgids', categorie: 'governance', spoor: 3, type: 'pdf', datum: '2026', omschrijving: 'Praktijkgids voor NHL Stenden: wanneer wel en niet een regulatory sandbox aanvragen. Inclusief beslisboom en stappenplan. Sandbox operationeel augustus 2026 via RDI.', icon: '⚖️' },
  { id: 14, titel: 'Friese AI-behoeften werksessie', categorie: 'samenwerking', spoor: 5, type: 'pdf', datum: 'Januari 2026', omschrijving: 'Uitwerking werksessie Friese AI-propositie met Frisius MC, NHL Stenden en Firda. Acht propositierichtingen voor zorg, onderwijs en maakindustrie.', icon: '🤝' }
]

export const INIT_LINKJES = [
  { id: 1, titel: 'Intranet NHL Stenden', url: 'https://nhlstenden.sharepoint.com', omschrijving: 'Het centrale intranet voor medewerkers.', categorie: 'intranet', spoor: null, laag: null, trefwoorden: ['Intranet', 'Medewerkers'], toegevoegdDoor: 'Kernteam AI-HUB', datum: 'Juni 2026' },
  { id: 2, titel: 'SURF AI-HUB', url: 'https://www.surf.nl/aihub', omschrijving: 'Veilige toegang tot AI-modellen voor het hoger onderwijs.', categorie: 'extern', spoor: 3, laag: 3, trefwoorden: ['SURF', 'AI', 'Soevereiniteit'], toegevoegdDoor: 'Kernteam AI-HUB', datum: 'Juni 2026' },
]

export const INIT_INSPIRATIES = [
  { id: 1, type: 'ontwikkeling', icon: '🌐', typelabel: 'Interessante ontwikkeling', rol: 'Medewerker dienst', naam: 'Anoniem', spoor: 2, sporeDef: { titel: 'AI & Werken', icon: '⚙️' }, laag: null, titel: 'AI in studentbegeleiding — vroeg-signalering', tekst: 'Hoe andere hogescholen AI inzetten voor vroeg-signalering van studenten met uitvalrisico.', url: 'https://surf.nl', datum: '15 juni 2026', trefwoorden: ['Studiesucces', 'Begeleiding', 'Data'], stemmen: { omhoog: 5, omlaag: 0 } },
  { id: 2, type: 'initiatief', icon: '🚀', typelabel: 'Initiatief of project', rol: 'Docent', naam: 'Anoniem', spoor: 1, sporeDef: { titel: 'AI & Leren', icon: '🎓' }, laag: 5, titel: 'AI-integratie in de PABO-opleiding', tekst: 'Wij zijn bezig met het integreren van AI-geletterdheid in het curriculum van de PABO.', url: '', datum: '12 juni 2026', trefwoorden: ['PABO', 'Curriculum', 'Geletterdheid'], stemmen: { omhoog: 8, omlaag: 1 } },
  { id: 3, type: 'artikel', icon: '📰', typelabel: 'Artikel of publicatie', rol: 'Onderzoeker', naam: 'Anoniem', spoor: 3, sporeDef: { titel: 'AI & Verantwoordelijkheid', icon: '⚖️' }, laag: null, titel: 'Rapport: AI Act implementatie in het onderwijs', tekst: 'Het Rathenau Instituut publiceerde een rapport over de implicaties van de AI Act voor onderwijsinstellingen.', url: 'https://rathenau.nl', datum: '8 juni 2026', trefwoorden: ['AI Act', 'Governance', 'Compliance'], stemmen: { omhoog: 6, omlaag: 0 } },
]

export const NHL_DIENSTEN = [
  'Onderwijs, Onderzoek & Internationalisering (OO&I)',
  'Onderwijslogistiek & Studentondersteuning',
  'Human Resource Management (HRM)',
  'Finance, Control & Procurement (FCP)',
  'Marketing & Communicatie',
  'Digitale Leer- en Werkomgeving (DLWO)',
  'Fysieke Leer- en Werkomgeving (FM)',
]

export const NHL_ACADEMIES = [
  'Academie Educatie',
  'Academie Tech & Design',
  'Academie Gezondheid & Welzijn',
  'Academie Leisure, Tourism & Hospitality',
  'Academie Media, Commercie & Ondernemerschap',
  'Academie Business & Leiderschap',
  'Thorbecke Academie',
]

export const NHL_EXTERN = [
  'SURF',
  'NPULS',
  'AI-Fabriek Groningen',
  'Vereniging Hogescholen',
  'RDI (AI-toezichthouder)',
  'GPT-NL',
  'Anders (vrij invullen)',
]
