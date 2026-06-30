// Centrale thema-data voor het AI-Netwerk NHL Stenden
// Gebruik dit bestand als enige bron voor thema-informatie in de hele site
//
// Het veld 'bronnen' is bedoeld voor expliciete doorverwijzing naar de
// vakeigenaar van een onderwerp (bijv. CTL voor toetsing, OO&I voor
// curriculum). Het AI-Netwerk vat dit soort content nooit zelf samen of
// herschrijft het niet: alleen een korte link naar de originele bron.

export const THEMAS = [
  {
    id: 'leren',
    spoorId: 1,
    label: 'AI & Leren',
    emoji: '🎓',
    kleur: '#1E3A8A',
    kernambitie: 'AI versterkt leren: meer succes, minder uitval.',
    subtitel: 'Onderwijs, didactiek, studiesucces en voorbereiding op de arbeidsmarkt.',
    toelichting:
      'AI verandert hoe studenten leren en hoe docenten begeleiden. Van adaptieve feedback tot vroegtijdig signaleren van uitval: dit thema gaat over AI als versterker van het onderwijs, niet als vervanging van de docent. NHL Stenden wil dat AI bijdraagt aan studiesucces voor elke student, ongeacht achtergrond of leerstijl. De richtlijnen voor AI bij toetsing en examinering liggen bij het Centre for Teaching and Learning (CTL) en de examencommissies.',
    watValtHieronder:
      'Didactische vernieuwing, curriculumontwikkeling, studieloopbaanbegeleiding, en de inzet van AI om uitval vroegtijdig te signaleren en te voorkomen. Voor richtlijnen rond AI bij toetsing en beoordeling: zie CTL.',
    bronnen: [
      { label: 'CTL: AI & Toetsing, richtlijnen en beoordelen', url: 'https://newuniversity.sharepoint.com/sites/center-for-teaching-and-learning/SitePages/AI---toetsing,-richtlijnen-en-beoordeling.aspx' },
      { label: 'CTL: AI in het onderwijs', url: 'https://newuniversity.sharepoint.com/sites/center-for-teaching-and-learning/SitePages/AI.aspx' },
      { label: 'CTL: AI in je studie', url: 'https://newuniversity.sharepoint.com/sites/center-for-teaching-and-learning/SitePages/AI-in-je-studie.aspx' },
    ],
    slug: 'leren',
  },
  {
    id: 'werken',
    spoorId: 2,
    label: 'AI & Werken',
    emoji: '⚙️',
    kleur: '#0F766E',
    kernambitie: 'AI neemt werk uit handen, zodat mensen het verschil maken.',
    subtitel: 'Procesverbetering, bedrijfsvoering en nieuwe werkwijzen bij diensten.',
    toelichting:
      'Administratieve lasten, repetitieve taken, complexe planningsvraagstukken: AI kan hier werk overnemen zodat medewerkers zich richten op wat echt telt. Dit thema gaat over slimmere werkprocessen, betere dienstverlening en een organisatie die wendbaarder wordt zonder de menselijke maat te verliezen.',
    watValtHieronder:
      'Procesautomatisering, AI-ondersteuning bij bedrijfsvoering, nieuwe werkwijzen bij diensten, HR-toepassingen en operationele efficiëntie.',
    bronnen: [],
    slug: 'werken',
  },
  {
    id: 'verantwoordelijkheid',
    spoorId: 3,
    label: 'AI & Verantwoordelijkheid',
    emoji: '⚖️',
    kleur: '#E91E8C',
    kernambitie: 'AI met transparantie, controle en vertrouwen.',
    subtitel: 'Governance, AI Act, soevereiniteit en eigenaarschap.',
    toelichting:
      'AI inzetten zonder grip op wat het doet, is geen optie. Dit thema gaat over governance, ethiek en naleving van de EU AI Act. Wanneer NHL Stenden zelf AI-systemen ontwikkelt die besluiten ondersteunen over studenten, gelden zware verplichtingen rond transparantie, menselijk toezicht en documentatie. De AI Regulatory Sandbox biedt daarvoor een juridisch begeleidingstraject. Maar ook bij het gebruik van bestaande tools zoals Microsoft Copilot of ChatGPT gelden altijd verplichtingen: een verwerkersovereenkomst, een privacytoets en transparantie naar studenten en medewerkers. Vertrouwen vraagt om actieve keuzes, elke dag opnieuw.',
    watValtHieronder:
      'AI-governance en beleid, EU AI Act compliance en risicoklassificatie, ethisch waardenkompas, digitale soevereiniteit, privacytoetsen en verwerkersovereenkomsten, en de AI Regulatory Sandbox voor hoog-risico toepassingen.',
    bronnen: [
      { label: 'CTL: AI in het onderwijs (verantwoord gebruik, medewerkers)', url: 'https://newuniversity.sharepoint.com/sites/center-for-teaching-and-learning/SitePages/AI.aspx' },
      { label: 'CTL: AI in je studie (verantwoord gebruik, studenten)', url: 'https://newuniversity.sharepoint.com/sites/center-for-teaching-and-learning/SitePages/AI-in-je-studie.aspx' },
    ],
    slug: 'verantwoordelijkheid',
  },
  {
    id: 'geletterdheid',
    spoorId: 4,
    label: 'AI & Geletterdheid',
    emoji: '📖',
    kleur: '#7C3AED',
    kernambitie: 'Iedereen AI-vaardig, niemand afhankelijk.',
    subtitel: 'Digitale vaardigheden, bewustwording en kritisch denkvermogen.',
    toelichting:
      'AI-geletterdheid is geen luxe maar een basisvaardigheid. Dit thema gaat over het vermogen van studenten en medewerkers om AI te begrijpen, te beoordelen en bewust in te zetten. NHL Stenden wil dat iedereen mee kan doen in een wereld waarin AI gewoon is geworden, op een manier die past bij hun rol. Dat vraagt ook om aandacht voor kritisch denken en digitale weerbaarheid, zodat AI-vaardigheid nooit omslaat in blinde afhankelijkheid.',
    watValtHieronder:
      'Digitale geletterdheid in het curriculum, professionalisering van medewerkers via onder andere ARDA en het CTL, bewustwording over AI-risico\'s, mediawijsheid en kritisch denkvermogen rond algoritmische systemen.',
    bronnen: [
      { label: 'CTL: AI in het onderwijs (professionalisering)', url: 'https://newuniversity.sharepoint.com/sites/center-for-teaching-and-learning/SitePages/AI.aspx' },
      { label: 'CTL: docentontwikkeling en MyAcademy', url: 'https://newuniversity.sharepoint.com/sites/center-for-teaching-and-learning' },
    ],
    slug: 'geletterdheid',
  },
  {
    id: 'werkveld',
    spoorId: 5,
    label: 'AI & Werkveld',
    emoji: '🏭',
    kleur: '#B45309',
    kernambitie: 'Samen met het werkveld versnellen we innovatie.',
    subtitel: 'Regionale samenwerking, co-creatie en kennisoverdracht.',
    toelichting:
      'NHL Stenden staat midden in de regio en het werkveld. Dit thema gaat over samenwerking met bedrijven, zorginstellingen en publieke organisaties die AI willen toepassen maar daarvoor ondersteuning zoeken. Studenten en docenten dragen bij aan echte vraagstukken uit de Friese en Noord-Nederlandse praktijk, zoals de inzet van AI in de zorg, de maakindustrie en het MKB. Het werkveld profiteert van actuele kennis en talent; de opleiding profiteert van praktijkverdieping.',
    watValtHieronder:
      'Praktijkgericht onderwijs met AI, samenwerking met regionale partners zoals Frisius MC en het Innovatie Cluster Drachten, living labs en co-creatie, stages en afstudeeropdrachten rond AI-vraagstukken, en kennisoverdracht naar het MKB.',
    bronnen: [],
    slug: 'werkveld',
  },
  {
    id: 'onderzoek',
    spoorId: 6,
    label: 'AI & Onderzoek',
    emoji: '🔬',
    kleur: '#0E7490',
    kernambitie: 'AI-onderzoek met impact: praktisch, relevant en toekomstgericht.',
    subtitel: 'Lectoraten, onderzoeksintegriteit en digitale soevereiniteit in onderzoek.',
    toelichting:
      'AI biedt onderzoekers ongekende mogelijkheden: sneller analyseren, slimmer verbanden leggen en onderzoek opschalen. Maar AI stelt onderzoek bij NHL Stenden ook voor nieuwe vragen. Hoe borgen we onderzoeksintegriteit als AI data analyseert of tekst genereert? Hoe gaan we om met kennisveiligheid en digitale soevereiniteit in een wereld waar onderzoeksdata steeds vaker op buitenlandse cloudinfrastructuur staat? Programma Bach, het nationale onderwijsversterkingsprogramma voor digitale autonomie en soevereiniteit, maakt duidelijk dat de transitie naar soevereine infrastructuur ook het onderzoeksdomein raakt. Dit thema gaat over beide kanten: AI als instrument dat onderzoek versterkt én als uitdaging die vraagt om nieuwe normen, kaders en onderzoeksethiek.',
    watValtHieronder:
      'Lectoratenonderzoek met en naar AI-toepassingen, praktijkgericht promotieonderzoek, onderzoeksintegriteit in het tijdperk van generatieve AI, kennisveiligheid en soevereiniteit rond onderzoeksdata, aansluiting bij Programma Bach en Npuls, valorisatie van onderzoeksresultaten naar onderwijs en werkveld, en de ontwikkeling van normen voor verantwoord AI-gebruik in onderzoek.',
    bronnen: [
      { label: 'CTL: AI in het onderwijs (onderzoek lectoraat Computer Vision & Data Science)', url: 'https://newuniversity.sharepoint.com/sites/center-for-teaching-and-learning/SitePages/AI.aspx' },
      { label: 'Center for Teaching and Learning (CTL)', url: 'https://newuniversity.sharepoint.com/sites/center-for-teaching-and-learning' },
    ],
    slug: 'onderzoek',
  },
];

export const SITE_SUBTITEL = 'AI bij NHL Stenden: slimmer leren, sterker werken en verantwoord innoveren.';
