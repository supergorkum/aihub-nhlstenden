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
  },
]

export const INIT_DOCS = [
  { id: 1, titel: 'AI Kompas NHL Stenden', categorie: 'strategie', spoor: null, type: 'pdf', datum: 'Juni 2026', omschrijving: 'Strategisch overzicht van de AI-architectuur en het vijflagenmodel.', icon: '📄', bestand: '/docs/NHL_Stenden_AI_Compass Definitief.pdf' },
  { id: 2, titel: 'AI Whitepaper NHL Stenden v9', categorie: 'strategie', spoor: null, type: 'pdf', datum: 'April 2026', omschrijving: 'Whitepaper over de strategische AI-koers van NHL Stenden. Uitgewerkte visie op verantwoorde AI-inzet.', icon: '📄', bestand: '/docs/whitepaper_AI_koers_NHL_Stenden_v09.pdf' },
  { id: 3, titel: 'Analyse AI-gebruik NHL Stenden', categorie: 'strategie', spoor: null, type: 'pdf', datum: 'April 2026', omschrijving: 'Analyse van huidig AI-gebruik binnen NHL Stenden. Inzicht in welke tools worden ingezet en door wie.', icon: '📊', bestand: '/docs/Analyse_AI_Gebruik_NHL_Stenden.pdf' },
  { id: 4, titel: 'AI en Werk', categorie: 'werken', spoor: 2, type: 'pdf', datum: 'April 2026', omschrijving: 'Document over de impact van AI op werk en werkprocessen binnen NHL Stenden.', icon: '⚙️', bestand: '/docs/ai-en-werk.pdf' },
  { id: 5, titel: 'WEF Future of Jobs Report 2025', categorie: 'werkveld', spoor: 5, type: 'pdf', datum: 'Maart 2026', omschrijving: 'World Economic Forum rapport over de toekomst van werk in het AI-tijdperk. Relevante context voor NHL Stenden als opleider.', icon: '🌍', bestand: '/docs/WEF_Future_of_Jobs_Report_2025.pdf' },
  { id: 6, titel: 'Kennisnet - Aan de slag met digitale geletterdheid', categorie: 'geletterdheid', spoor: 4, type: 'pdf', datum: 'Maart 2025', omschrijving: 'Praktische gids van Kennisnet voor het werken aan digitale geletterdheid in het onderwijs.', icon: '📖', bestand: '/docs/Kennisnet-ICILS-Aan-de-slag-met-digitale-geletterdheid.pdf' },
  { id: 7, titel: 'TRAI Document', categorie: 'governance', spoor: 3, type: 'pdf', datum: 'April 2026', omschrijving: 'Intern document over Transparantie, Risico, AI en Integriteit bij NHL Stenden.', icon: '⚖️', bestand: '/docs/TRAI-document.pdf' },
  { id: 8, titel: 'Digital Sovereignty Radar', categorie: 'governance', spoor: 3, type: 'pdf', datum: 'Maart 2026', omschrijving: 'Overzicht van digitale soevereiniteitsthemas en positionering van NHL Stenden daarin.', icon: '🎯', bestand: '/docs/Digital_Sovereignty_Radar.pdf' },
  { id: 9, titel: 'AI Regulatory Sandbox - Infoplaat', categorie: 'governance', spoor: 3, type: 'afbeelding', datum: 'Maart 2026', omschrijving: 'Visuele samenvatting van de AI Regulatory Sandbox: wat het is, wanneer relevant en de beslisboom.', icon: '🖼️', bestand: '/docs/InfoPlaat-sandbox.png' },
  { id: 10, titel: 'NVAO Startverkenning Generatieve AI', categorie: 'onderzoek', spoor: 6, type: 'pdf', datum: 'Januari 2026', omschrijving: 'Thematische analyse van generatieve AI in visitatierapporten. Conclusie: focus op toetsing, integrale aanpak ontbreekt.', icon: '📊', bestand: '/docs/Startverkenning_Generatieve_Artificiele_Intelligentie.pdf' },
  { id: 11, titel: 'AI Compliance Voortgangsrapportage', categorie: 'governance', spoor: 3, type: 'pdf', datum: 'Februari 2026', omschrijving: 'Rapportage AI Compliance Team aan CvB. Kernboodschap: AI leeft sterk maar centrale regie ontbreekt.', icon: '📋', bestand: '/docs/Voortgangsrapportage_AI_Compliance_v1.pdf' },
  { id: 12, titel: 'Programmavoorstel Bach - Digitale Autonomie', categorie: 'strategie', spoor: 6, type: 'pdf', datum: 'Januari 2026', omschrijving: 'Nationaal onderwijsversterkingsprogramma voor digitale soevereiniteit. Vier programmalijnen, investering 94 miljoen euro.', icon: '🏛️', bestand: '/docs/Programmavoorstel Bach - digitale autonomie en soevereiniteit.pdf' },
  { id: 13, titel: 'AI Regulatory Sandbox Praktijkgids', categorie: 'governance', spoor: 3, type: 'pdf', datum: '2026', omschrijving: 'Praktijkgids voor NHL Stenden: wanneer wel en niet een regulatory sandbox aanvragen. Inclusief beslisboom en stappenplan.', icon: '⚖️', bestand: '/docs/regulatory_sandbox_ai_NHL_Stenden.pdf' },
  { id: 14, titel: 'Friese AI-behoeften werksessie', categorie: 'samenwerking', spoor: 5, type: 'pdf', datum: 'Januari 2026', omschrijving: 'Uitwerking werksessie Friese AI-propositie met Frisius MC, NHL Stenden en Firda.', icon: '🤝', bestand: '/docs/Terugkoppeling werksessie 19 januari.pdf' },
  { id: 15, titel: 'Gartner Hype Cycle AI 2025', categorie: 'strategie', spoor: null, type: 'afbeelding', datum: 'Juni 2025', omschrijving: 'Gartner Hype Cycle voor AI 2025. Sovereign AI en AI Agents bovenaan de piek van verwachtingen.', icon: '📈', bestand: '/docs/Hype_Cycle_for_Artificial_Intelligence_2025.jpeg' },
]

export const INIT_EVENEMENTEN = [
  {
    id: 1,
    naam: 'AI-Netwerk Kick-off Bijeenkomst',
    locatie: 'NHL Stenden Leeuwarden, Rengerslaan 8',
    datum: '2026-09-10',
    startTijd: '13:00',
    eindTijd: '16:00',
    omschrijving: 'Officiele lancering van het AI-Netwerk. Kennismaking met het kernteam en netwerken.',
    organisator: 'Kernteam AI-Netwerk',
    sporen: [1, 2, 3, 4],
    kleur: '#1E3A8A',
  },
  {
    id: 2,
    naam: 'SURF Denktank - AI in Onderwijs',
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

export const INIT_LINKJES = [
  { id: 1, titel: 'Intranet NHL Stenden', url: 'https://nhlstenden.sharepoint.com', omschrijving: 'Het centrale intranet voor medewerkers.', categorie: 'intranet', spoor: null, laag: null, trefwoorden: ['Intranet', 'Medewerkers'], toegevoegdDoor: 'Kernteam AI-HUB', datum: 'Juni 2026' },
  { id: 2, titel: 'SURF AI-HUB', url: 'https://www.surf.nl/nl/themas/artificial-intelligence', omschrijving: 'Veilige toegang tot AI-modellen voor het hoger onderwijs.', categorie: 'extern', spoor: 3, laag: 3, trefwoorden: ['SURF', 'AI', 'Soevereiniteit'], toegevoegdDoor: 'Kernteam AI-HUB', datum: 'Juni 2026' },
  { id: 3, titel: 'RDI - AI Regulatory Sandbox', url: 'https://www.rdi.nl', omschrijving: 'Rijksinspectie Digitale Infrastructuur. Beheerder van de Nederlandse AI Regulatory Sandbox, operationeel augustus 2026.', categorie: 'extern', spoor: 3, laag: 4, trefwoorden: ['AI Act', 'Compliance', 'Overheid'], toegevoegdDoor: 'Kernteam AI-Netwerk', datum: 'Juni 2026' },
  { id: 4, titel: 'Autoriteit Persoonsgegevens - AI', url: 'https://www.autoriteitpersoonsgegevens.nl', omschrijving: 'AP co-beheert de Nederlandse Regulatory Sandbox. Informatie over DPIA, AVG en AI-toepassingen met persoonsgegevens.', categorie: 'extern', spoor: 3, laag: 4, trefwoorden: ['Privacy', 'AVG', 'DPIA'], toegevoegdDoor: 'Kernteam AI-Netwerk', datum: 'Juni 2026' },
  { id: 5, titel: 'Npuls Expeditie AI', url: 'https://npuls.nl', omschrijving: 'Nationaal programma van mbo, hbo, wo en SURF voor AI in het onderwijs. Bundelt initiatieven rond AI in toetsing, curriculum en docentprofessionalisering.', categorie: 'extern', spoor: 1, laag: 5, trefwoorden: ['Nationaal', 'Onderwijs', 'Samenwerking'], toegevoegdDoor: 'Kernteam AI-Netwerk', datum: 'Juni 2026' },
  { id: 6, titel: 'Programma Bach - Universiteit van het Noorden', url: 'https://www.uvan.nl', omschrijving: 'Nationaal onderwijsversterkingsprogramma voor digitale autonomie en soevereiniteit. Geinitieerd vanuit Noord-Nederland, nationaal opschaalbaar.', categorie: 'extern', spoor: 6, laag: 3, trefwoorden: ['Soevereiniteit', 'Bach', 'Onderwijs'], toegevoegdDoor: 'Kernteam AI-Netwerk', datum: 'Juni 2026' },
]

export const INIT_INSPIRATIES = [
  { id: 1, type: 'ontwikkeling', icon: '🌐', typelabel: 'Interessante ontwikkeling', rol: 'Medewerker dienst', naam: 'Anoniem', spoor: 2, sporeDef: { titel: 'AI & Werken', icon: '⚙️' }, laag: null, titel: 'AI in studentbegeleiding — vroeg-signalering', tekst: 'Hoe andere hogescholen AI inzetten voor vroeg-signalering van studenten met uitvalrisico.', url: '', datum: '15 juni 2026', trefwoorden: ['Studiesucces', 'Begeleiding', 'Data'], stemmen: { omhoog: 5, omlaag: 0 } },
  { id: 2, type: 'initiatief', icon: '🚀', typelabel: 'Initiatief of project', rol: 'Docent', naam: 'Anoniem', spoor: 1, sporeDef: { titel: 'AI & Leren', icon: '🎓' }, laag: 5, titel: 'AI-integratie in de PABO-opleiding', tekst: 'Wij zijn bezig met het integreren van AI-geletterdheid in het curriculum van de PABO.', url: '', datum: '12 juni 2026', trefwoorden: ['PABO', 'Curriculum', 'Geletterdheid'], stemmen: { omhoog: 8, omlaag: 1 } },
  { id: 3, type: 'artikel', icon: '📰', typelabel: 'Artikel of publicatie', rol: 'Onderzoeker', naam: 'Anoniem', spoor: 3, sporeDef: { titel: 'AI & Verantwoordelijkheid', icon: '⚖️' }, laag: null, titel: 'Rapport: AI Act implementatie in het onderwijs', tekst: 'Het Rathenau Instituut publiceerde een rapport over de implicaties van de AI Act voor onderwijsinstellingen.', url: '', datum: '8 juni 2026', trefwoorden: ['AI Act', 'Governance', 'Compliance'], stemmen: { omhoog: 6, omlaag: 0 } },
]

// NHL Stenden organisatiestructuur (uit organogram)
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
