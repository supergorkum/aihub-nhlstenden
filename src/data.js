export const sporen = [
  { id: 1, titel: 'AI & Onderwijs', icon: '🎓', kleur: '#1E3A8A', kort: 'Toetsing, didactiek en voorbereiding op de arbeidsmarkt.', waarom: 'AI beinvloedt het onderwijs al diepgaand. Docenten en studenten zoeken houvast bij toetsing, integriteit en didactische inbedding.', themas: ['Toetsing & integriteit', 'Didactische inbedding', 'Curriculumontwikkeling', 'Arbeidsmarktvoorbereiding'] },
  { id: 2, titel: 'AI & Organisatie', icon: '⚙️', kleur: '#0F766E', kort: 'AI inzetten voor meer studiesucces en minder uitval.', waarom: 'De kernambitie is helder: AI moet leiden tot meer studiesucces, minder uitval en slimmere processen bij diensten.', themas: ['Studiesucces & uitval', 'Procesverbetering diensten', 'Datagedreven werken', 'Nieuwe toolontwikkeling'] },
  { id: 3, titel: 'AI & Verantwoordelijkheid', icon: '⚖️', kleur: '#E91E8C', kort: 'Governance, AI Act, soevereiniteit en eigenaarschap.', waarom: 'AI zonder governance leidt tot risicos die de instelling niet kan dragen. Verantwoord werken is de voorwaarde voor innovatie, niet de rem.', themas: ['AI Act-compliance', 'Digitale soevereiniteit', 'Privacy & data', 'AI-desk & eigenaarschap'] },
  { id: 4, titel: 'AI-Geletterdheid', icon: '📖', kleur: '#7C3AED', kort: 'De doorlopende basis voor iedereen in de organisatie.', waarom: 'Geen enkel ander spoor werkt zonder mensen die begrijpen wat AI is en wat het van hen vraagt. Geletterdheid is de sleutel tot eigenaarschap.', themas: ['Bestuur & management', 'Docenten & begeleiding', 'Studenten & competenties', 'Medewerkers & zelfredzaamheid'] },
]

export const lagen = [
  { nr: 5, naam: 'Gebruik & Toepassingen', omschrijving: 'Wat studenten en medewerkers dagelijks zien en gebruiken.', eigenaar: 'Alle Academies & Diensten', kleur: '#1E3A8A' },
  { nr: 4, naam: 'Platforms & Applicaties', omschrijving: 'Welke tools worden goedgekeurd? Wie beslist over aanschaf?', eigenaar: 'Prog. Digitale Transitie', kleur: '#2563EB', urgent: true },
  { nr: 3, naam: 'Data & AI-Modellen', omschrijving: 'Welke modellen vertrouwen we? Hoe gaan we om met onze data?', eigenaar: 'OO&I', kleur: '#0F766E' },
  { nr: 2, naam: 'Chips & Hardware', omschrijving: 'Rekenkracht en servers. Cloud versus on-premise.', eigenaar: 'DLWO', kleur: '#7C3AED' },
  { nr: 1, naam: 'Energie & Infrastructuur', omschrijving: 'De fysieke basis. AI verbruikt enorme hoeveelheden stroom.', eigenaar: 'Facility Management', kleur: '#374151' },
]

export const initiatieven = [
  { id: 1, naam: 'AI Compliance Groep', omschrijving: 'Rapporteert regelmatig over AI-risicos en signaleert waar actie nodig is, in lijn met de AI Act.', laag: 4, spoor: 3, status: 'actief', type: 'intern', tags: ['Governance', 'AI Act', 'Compliance'] },
  { id: 2, naam: 'AI Coalitie NHL Stenden', omschrijving: 'Brede coalitie van medewerkers en docenten die actief met AI bezig zijn. In opbouw.', laag: 5, spoor: 1, status: 'groeiend', type: 'intern', tags: ['Netwerk', 'Onderwijs', 'Organisatie'] },
  { id: 3, naam: 'Academie Educatie: Digitalisering & Mediawijsheid', omschrijving: 'Integratie van AI in de praktijk van digitalisering en mediawijsheid binnen de lerarenopleiding.', laag: 5, spoor: 1, status: 'actief', type: 'intern', tags: ['Onderwijs', 'Geletterdheid', 'PABO'] },
  { id: 4, naam: 'FCP: Data & AI', omschrijving: 'Financien, Control & Planning omarmt AI in datagedreven werken en bedrijfsvoeringsprocessen.', laag: 3, spoor: 2, status: 'actief', type: 'intern', tags: ['Bedrijfsvoering', 'Data', 'Financien'] },
  { id: 5, naam: 'BDB Cursus AI-verrijking', omschrijving: 'De Basiskwalificatie Didactische Bekwaamheid wordt verrijkt met AI-componenten voor docenten.', laag: 5, spoor: 4, status: 'actief', type: 'intern', tags: ['Docenten', 'Geletterdheid', 'BDB'] },
  { id: 6, naam: 'SURF Denktank', omschrijving: 'Strategisch netwerk van hoger onderwijsinstellingen dat de koers voor AI mede bepaalt. NHL Stenden levert actief input.', laag: null, spoor: 3, status: 'actief', type: 'extern', tags: ['Strategie', 'SURF', 'Hoger Onderwijs'] },
  { id: 7, naam: 'NPULS Digitale Geletterdheid', omschrijving: 'Nationaal programma voor digitale geletterdheid. Kaders en materialen direct bruikbaar voor spoor 4.', laag: 5, spoor: 4, status: 'actief', type: 'extern', tags: ['Geletterdheid', 'Nationaal', 'NPULS'] },
  { id: 8, naam: 'SURF AI-HUB & GPT-NL', omschrijving: 'Soevereine infrastructuur en Nederlands eigen taalmodel als alternatief voor commerciele aanbieders.', laag: 3, spoor: 3, status: 'actief', type: 'extern', tags: ['Soevereiniteit', 'AVG', 'Taalmodel'] },
  { id: 9, naam: 'AI-Fabriek Groningen', omschrijving: 'Regionale soevereine rekenkracht en datafaciliteit. Strategisch relevant als noordelijke instelling.', laag: 2, spoor: 3, status: 'actief', type: 'extern', tags: ['Infrastructuur', 'Rekenkracht', 'Regio'] },
  { id: 10, naam: 'Regulatory Sandbox', omschrijving: 'Gecontroleerde experimenteeromgeving voor veilig experimenteren met AI. In voorbereiding.', laag: 4, spoor: 3, status: 'in-ontwikkeling', type: 'intern', tags: ['Sandbox', 'Innovatie', 'RDI'] },
  { id: 11, naam: 'AI-Desk', omschrijving: 'Verplicht loket voor medewerkers die een AI-tool willen bouwen of inzetten. In voorbereiding.', laag: 4, spoor: 3, status: 'in-ontwikkeling', type: 'intern', tags: ['Governance', 'Loket', 'Ondersteuning'] },
]

export const vraagCategorieen = [
  { id: 'vraag', label: 'Ik heb een vraag', icon: '❓' },
  { id: 'initiatief', label: 'Ik wil een initiatief aanmelden', icon: '🚀' },
  { id: 'inspiratie', label: 'Ik deel een interessante ontwikkeling', icon: '💡' },
  { id: 'ondersteuning', label: 'Ik zoek ondersteuning of samenwerking', icon: '🤝' },
  { id: 'zorg', label: 'Ik heb een zorg of signaal', icon: '⚠️' },
]

export const rolOpties = ['Docent', 'Onderzoeker', 'Student', 'Medewerker dienst', 'Leidinggevende / directeur', 'Bestuurder', 'Anders']

export const BEHEER_CODE = 'aihub2026'
