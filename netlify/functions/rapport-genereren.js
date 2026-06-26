// Geen externe dependencies nodig

const DATUM = () => new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })

const THEMAS = [
  { titel: 'AI & Leren', icon: '🎓', kleur: '#1E3A8A', omschrijving: 'Hoe AI het leerproces van studenten verrijkt en ondersteunt.' },
  { titel: 'AI & Werken', icon: '⚙️', kleur: '#0F766E', omschrijving: 'AI als hulpmiddel voor medewerkers in hun dagelijkse werk.' },
  { titel: 'AI & Verantwoordelijkheid', icon: '⚖️', kleur: '#7C3AED', omschrijving: 'Ethiek, governance en de EU AI Act als kader voor verantwoord gebruik.' },
  { titel: 'AI & Geletterdheid', icon: '📖', kleur: '#B45309', omschrijving: 'Vaardigheden en kennis voor studenten en medewerkers om AI te begrijpen.' },
  { titel: 'AI & Werkveld', icon: '🏢', kleur: '#0E7490', omschrijving: 'Samenwerking met het werkveld en regionale AI-initiatieven.' },
  { titel: 'AI & Onderzoek', icon: '🔬', kleur: '#BE185D', omschrijving: 'Praktijkgericht onderzoek naar AI-toepassingen in onderwijs en zorg.' },
]

const KERNTEAM = [
  { rol: 'Kwartiermaker Digitale Samenhang', taken: 'Strategie, bestuurlijke verbinding, externe netwerken' },
  { rol: 'Informatiemanager', taken: 'Inhoud, actualiteit, verbinding met informatiestromen' },
  { rol: 'ICT Analist', taken: 'Technische realisatie, AI-infrastructuur, solution partnership' },
]

const NVAO_STANDAARDEN = [
  { nr: 1, titel: 'Beoogde leerresultaten', nhl: 'AI-geletterdheid in leerdoelen via minors en curricula' },
  { nr: 2, titel: 'Onderwijsleeromgeving', nhl: 'CTL-richtlijnen, ARDA-modules, I\'M A.I. initiatief' },
  { nr: 3, titel: 'Toetsing en examinering', nhl: 'CTL toetsbeleid GenAI, geen AI-detector, DBE-aanpak' },
  { nr: 4, titel: 'Gerealiseerde leerresultaten', nhl: 'FrisiusLab, authentieke beroepsprestaties, portfolio' },
]

function statusBadge(s) {
  const map = { 'actief': '#0F766E', 'in-ontwikkeling': '#B45309', 'gepland': '#1E3A8A', 'afgerond': '#374151' }
  return map[s] || '#374151'
}

function generateHTML(data) {
  const pilots = data.pilots || []
  const initiatieven = data.alleInitiatieven || []
  const inspiraties = data.inspiraties || []
  const docs = data.docs || []

  const intern = initiatieven.filter(i => i.type === 'intern' || !i.type)
  const extern = initiatieven.filter(i => i.type === 'extern')
  const actievePilots = pilots.filter(p => p.status === 'actief' || p.status === 'In uitvoering')

  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI-Netwerk NHL Stenden — Voortgangsrapport ${DATUM()}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #1a1a2e;
    background: white;
    font-size: 10pt;
    line-height: 1.6;
  }

  .page { max-width: 210mm; margin: 0 auto; background: white; }

  /* Cover */
  .cover {
    background: linear-gradient(135deg, #0F1E52 0%, #1E3A8A 60%, #162D6E 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px;
    color: white;
    page-break-after: always;
    position: relative;
    overflow: hidden;
  }
  .cover::before {
    content: '';
    position: absolute;
    top: -100px; right: -100px;
    width: 500px; height: 500px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 50%;
  }
  .cover::after {
    content: '';
    position: absolute;
    bottom: -150px; left: -150px;
    width: 600px; height: 600px;
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 50%;
  }
  .cover-label {
    font-size: 9pt;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 8px;
  }
  .cover-title {
    font-size: 42pt;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }
  .cover-sub {
    font-size: 14pt;
    color: rgba(255,255,255,0.75);
    font-weight: 400;
    max-width: 500px;
    line-height: 1.5;
  }
  .cover-meta {
    display: flex;
    gap: 40px;
    padding-top: 40px;
    border-top: 1px solid rgba(255,255,255,0.15);
  }
  .cover-meta-item label { font-size: 7pt; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); display: block; margin-bottom: 4px; }
  .cover-meta-item span { font-size: 10pt; font-weight: 600; color: white; }
  .cover-accent { width: 60px; height: 4px; background: #4DAAFF; border-radius: 2px; margin: 24px 0; }

  /* Inhoudspaginas */
  .section {
    padding: 50px 60px;
    page-break-inside: avoid;
  }
  .section-break { page-break-before: always; }

  .chapter-label {
    font-size: 8pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #4DAAFF;
    margin-bottom: 8px;
  }
  .chapter-title {
    font-size: 22pt;
    font-weight: 800;
    color: #0F1E52;
    line-height: 1.2;
    margin-bottom: 6px;
    letter-spacing: -0.01em;
  }
  .chapter-line {
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #1E3A8A, #4DAAFF);
    border-radius: 2px;
    margin: 16px 0 24px;
  }

  .lead {
    font-size: 12pt;
    color: #374151;
    line-height: 1.7;
    margin-bottom: 24px;
    font-weight: 400;
  }
  p { color: #4B5563; line-height: 1.7; margin-bottom: 12px; }

  /* Cards */
  .card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0; }
  .card-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin: 24px 0; }
  .card {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 20px;
  }
  .card-accent { border-left: 3px solid #1E3A8A; }
  .card-title { font-size: 10pt; font-weight: 700; color: #0F1E52; margin-bottom: 6px; }
  .card-body { font-size: 9pt; color: #6B7280; line-height: 1.6; }
  .card-icon { font-size: 20pt; margin-bottom: 10px; }

  /* Thema kaarten */
  .thema-card {
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 12px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }
  .thema-icon { font-size: 18pt; flex-shrink: 0; margin-top: 2px; }
  .thema-titel { font-size: 10pt; font-weight: 700; margin-bottom: 4px; }
  .thema-body { font-size: 9pt; line-height: 1.5; }

  /* Statistieken */
  .stat-row { display: flex; gap: 16px; margin: 24px 0; }
  .stat-box {
    flex: 1;
    background: linear-gradient(135deg, #0F1E52, #1E3A8A);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    color: white;
  }
  .stat-number { font-size: 28pt; font-weight: 900; line-height: 1; margin-bottom: 6px; color: #4DAAFF; }
  .stat-label { font-size: 8pt; font-weight: 500; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.08em; }

  /* Tabel */
  table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 9pt; }
  th { background: #0F1E52; color: white; padding: 10px 14px; text-align: left; font-weight: 600; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.05em; }
  th:first-child { border-radius: 8px 0 0 0; }
  th:last-child { border-radius: 0 8px 0 0; }
  td { padding: 10px 14px; border-bottom: 1px solid #F1F5F9; color: #374151; vertical-align: top; }
  tr:nth-child(even) td { background: #F8FAFC; }

  /* Badge */
  .badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 7.5pt;
    font-weight: 600;
    white-space: nowrap;
  }

  /* NVAO tabel */
  .nvao-row { display: flex; gap: 0; margin-bottom: 10px; border-radius: 10px; overflow: hidden; border: 1px solid #E2E8F0; }
  .nvao-nr { background: #0F1E52; color: white; width: 40px; display: flex; align-items: center; justify-content: center; font-size: 14pt; font-weight: 900; flex-shrink: 0; }
  .nvao-content { padding: 14px 16px; }
  .nvao-titel { font-size: 10pt; font-weight: 700; color: #0F1E52; margin-bottom: 4px; }
  .nvao-body { font-size: 9pt; color: #6B7280; }

  /* Netwerk visualisatie */
  .netwerk-visual {
    background: linear-gradient(135deg, #0F1E52 0%, #1a2f6b 100%);
    border-radius: 16px;
    padding: 40px;
    margin: 24px 0;
    text-align: center;
    color: white;
    position: relative;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .netwerk-center {
    width: 80px; height: 80px;
    background: white;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 28pt;
    margin-bottom: 16px;
    box-shadow: 0 0 0 12px rgba(255,255,255,0.1), 0 0 0 24px rgba(255,255,255,0.05);
  }
  .netwerk-ring {
    display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 24px;
  }
  .netwerk-node {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 8pt;
    font-weight: 600;
  }

  /* Governance */
  .gov-row { display: flex; gap: 12px; margin-bottom: 10px; }
  .gov-thema {
    flex: 0 0 160px;
    background: #0F1E52;
    border-radius: 8px;
    padding: 12px;
    color: white;
    font-size: 9pt;
    font-weight: 600;
  }
  .gov-body {
    flex: 1;
    background: #F8FAFC;
    border-radius: 8px;
    padding: 12px;
    font-size: 9pt;
    color: #374151;
    border-left: 3px solid #4DAAFF;
  }

  /* Footer */
  .report-footer {
    background: #0F1E52;
    color: white;
    padding: 30px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 8pt;
    margin-top: 40px;
  }
  .report-footer-logo { font-weight: 800; font-size: 11pt; }
  .report-footer-sub { color: rgba(255,255,255,0.5); margin-top: 2px; }

  /* Print */
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .cover { min-height: 297mm; }
    .no-break { page-break-inside: avoid; }
    .section-break { page-break-before: always; }
  }
  @page { margin: 0; }
</style>
</head>
<body>
<div class="page">

<!-- COVER -->
<div class="cover">
  <div>
    <div class="cover-label">NHL Stenden Hogeschool · Transitieprogramma Digitalisering</div>
    <div style="margin: 32px 0 20px;">
      <div style="font-size: 48pt; margin-bottom: 8px;">🤖</div>
    </div>
    <div class="cover-title">AI-Netwerk<br>NHL Stenden</div>
    <div class="cover-accent"></div>
    <div class="cover-sub">Een levend overzicht van de AI-strategie, initiatieven en governance van NHL Stenden Hogeschool</div>
  </div>
  <div class="cover-meta">
    <div class="cover-meta-item">
      <label>Rapportdatum</label>
      <span>${DATUM()}</span>
    </div>
    <div class="cover-meta-item">
      <label>Versie</label>
      <span>Live rapport</span>
    </div>
    <div class="cover-meta-item">
      <label>Opgesteld door</label>
      <span>Kwartiermaker Digitale Samenhang</span>
    </div>
    <div class="cover-meta-item">
      <label>Status</label>
      <span>Actief programma</span>
    </div>
  </div>
</div>

<!-- INLEIDING -->
<div class="section">
  <div class="chapter-label">Hoofdstuk 1</div>
  <div class="chapter-title">Wat is het AI-Netwerk?</div>
  <div class="chapter-line"></div>
  <div class="lead">
    Het AI-Netwerk is de centrale plek waar NHL Stenden alles rondom kunstmatige intelligentie samenvoegt:
    wat we doen, wie we zijn, en hoe we AI verantwoord inzetten.
  </div>
  <p>
    NHL Stenden Hogeschool bevindt zich midden in een periode van ingrijpende digitalisering.
    Kunstmatige intelligentie is daarin niet slechts een technische ontwikkeling, maar een
    fundamentele verandering in hoe we leren, werken, toetsen en samenwerken.
    Het AI-Netwerk is opgericht om die verandering te begeleiden: met overzicht, richting en menselijke maat.
  </p>
  <p>
    Dit rapport geeft een actueel beeld van de stand van zaken. Het is bedoeld voor iedereen die
    betrokken is bij of geïnteresseerd is in de AI-aanpak van NHL Stenden — van bestuurders en
    docenten tot studenten en externe partners.
  </p>

  <div class="stat-row">
    <div class="stat-box">
      <div class="stat-number">${pilots.length}</div>
      <div class="stat-label">Actieve pilots</div>
    </div>
    <div class="stat-box">
      <div class="stat-number">${initiatieven.length}</div>
      <div class="stat-label">Initiatieven</div>
    </div>
    <div class="stat-box">
      <div class="stat-number">${inspiraties.length}</div>
      <div class="stat-label">Inspiratie-items</div>
    </div>
    <div class="stat-box">
      <div class="stat-number">6</div>
      <div class="stat-label">Thema's</div>
    </div>
  </div>

  <div class="card-grid">
    <div class="card card-accent">
      <div class="card-title">🎯 Doel</div>
      <div class="card-body">Alle AI-initiatieven, kennis, pilots en mensen bij NHL Stenden samenbrengen op één plek, toegankelijk voor iedereen.</div>
    </div>
    <div class="card card-accent">
      <div class="card-title">🔗 Verbinding</div>
      <div class="card-body">Silos doorbreken door initiatieven van verschillende academies, diensten en externe partners aan elkaar te verbinden.</div>
    </div>
    <div class="card card-accent">
      <div class="card-title">⚖️ Verantwoord</div>
      <div class="card-body">AI wordt ingezet met aandacht voor ethiek, privacy, de EU AI Act en de menselijke maat. Niet alles kan, niet alles moet.</div>
    </div>
    <div class="card card-accent">
      <div class="card-title">📈 Bewijs</div>
      <div class="card-body">Het platform dient als levende bewijslast voor accreditatie, bestuurlijke verantwoording en externe communicatie.</div>
    </div>
  </div>
</div>

<!-- FUNDAMENT -->
<div class="section section-break">
  <div class="chapter-label">Hoofdstuk 2</div>
  <div class="chapter-title">Het Fundament</div>
  <div class="chapter-line"></div>
  <div class="lead">
    Het AI-Netwerk staat op een solide fundament van strategie, beleid en externe verbindingen.
  </div>
  <p>
    NHL Stenden werkt aan AI vanuit een heldere bestuurlijke opdracht. Het Transitieprogramma
    Digitalisering vormt het kader waarbinnen de AI-netwerkorganisatie functioneert. De Kwartiermaker
    Digitale Samenhang is aangesteld om samenhang te brengen in de vele digitale vraagstukken
    die de instelling raken.
  </p>
  <p>
    Op nationaal niveau is NHL Stenden actief betrokken bij SURF, NPULS en de Vereniging Hogescholen.
    Regionaal werkt de hogeschool samen met partners als Frisius MC, Firda en de AI Fryslân-coalitie.
  </p>

  <div class="card-grid">
    <div class="card">
      <div class="card-icon">🏛️</div>
      <div class="card-title">Bestuurlijk kader</div>
      <div class="card-body">Transitieprogramma Digitalisering onder regie van de Stuurgroep Digitalisering. CvB-besluit januari 2026 als startpunt voor de nieuwe fase.</div>
    </div>
    <div class="card">
      <div class="card-icon">⚖️</div>
      <div class="card-title">Wettelijk kader</div>
      <div class="card-body">AVG, EU AI Act en de BKO-standaarden zijn leidend. Risicogestuurde aanpak via AI-risicoscan voor alle nieuwe toepassingen.</div>
    </div>
    <div class="card">
      <div class="card-icon">🤝</div>
      <div class="card-title">Nationaal netwerk</div>
      <div class="card-body">SURF AI-Hub, NPULS-programma, Vereniging Hogescholen. NHL Stenden levert actief input aan nationale richtlijnen.</div>
    </div>
    <div class="card">
      <div class="card-icon">🌍</div>
      <div class="card-title">Regionaal netwerk</div>
      <div class="card-body">AI Fryslân-coalitie, FrisiusLab, Frisius MC, Firda. Regionale samenwerking als vliegwiel voor innovatie in het noorden.</div>
    </div>
  </div>
</div>

<!-- THEMAS -->
<div class="section section-break">
  <div class="chapter-label">Hoofdstuk 3</div>
  <div class="chapter-title">De zes thema's</div>
  <div class="chapter-line"></div>
  <div class="lead">
    Het AI-Netwerk is georganiseerd rondom zes thema's die samen het volledige spectrum van AI bij NHL Stenden omvatten.
  </div>
  <p>
    Elk thema heeft een eigen trekker, eigen initiatieven en een eigen plek binnen de netwerkorganisatie.
    De thema's zijn niet los van elkaar: zij raken elkaar voortdurend en versterken elkaar.
  </p>

  ${THEMAS.map(t => `
  <div class="thema-card no-break" style="background: ${t.kleur}12; border-left: 3px solid ${t.kleur}; margin-bottom: 10px;">
    <div class="thema-icon">${t.icon}</div>
    <div>
      <div class="thema-titel" style="color: ${t.kleur};">${t.titel}</div>
      <div class="thema-body">${t.omschrijving}</div>
    </div>
  </div>`).join('')}
</div>

<!-- INITIATIEVEN -->
<div class="section section-break">
  <div class="chapter-label">Hoofdstuk 4</div>
  <div class="chapter-title">Initiatieven</div>
  <div class="chapter-line"></div>
  <div class="lead">
    NHL Stenden heeft een rijk palet aan AI-initiatieven, zowel intern als in samenwerking met externe partners.
  </div>

  <div class="stat-row" style="margin-bottom: 24px;">
    <div class="stat-box">
      <div class="stat-number">${intern.length}</div>
      <div class="stat-label">Intern</div>
    </div>
    <div class="stat-box">
      <div class="stat-number">${extern.length}</div>
      <div class="stat-label">Extern / Samenwerking</div>
    </div>
    <div class="stat-box">
      <div class="stat-number">${initiatieven.filter(i => i.status === 'actief').length}</div>
      <div class="stat-label">Actief</div>
    </div>
  </div>

  ${initiatieven.slice(0, 12).length > 0 ? `
  <table>
    <thead>
      <tr>
        <th>Initiatief</th>
        <th>Type</th>
        <th>Status</th>
        <th>Impact</th>
      </tr>
    </thead>
    <tbody>
      ${initiatieven.slice(0, 12).map(i => `
      <tr>
        <td><strong>${i.naam || '—'}</strong><br><span style="color:#9CA3AF;font-size:8pt;">${(i.omschrijving || '').slice(0, 80)}${i.omschrijving && i.omschrijving.length > 80 ? '...' : ''}</span></td>
        <td><span class="badge" style="background:${i.type === 'intern' ? '#EFF6FF' : '#F0FDF4'};color:${i.type === 'intern' ? '#1E3A8A' : '#065F46'}">${i.type || 'intern'}</span></td>
        <td><span class="badge" style="background:${statusBadge(i.status)}22;color:${statusBadge(i.status)}">${i.status || '—'}</span></td>
        <td><span style="color:#6B7280">${i.impactInschatting || '—'}</span></td>
      </tr>`).join('')}
    </tbody>
  </table>
  ${initiatieven.length > 12 ? `<p style="color:#9CA3AF;font-size:8pt;font-style:italic;">En nog ${initiatieven.length - 12} initiatieven — zie de volledige bijlage op het AI-Netwerk platform.</p>` : ''}
  ` : '<div class="card"><div class="card-body">Er zijn nog geen initiatieven geregistreerd in het systeem.</div></div>'}
</div>

<!-- PILOTS -->
<div class="section section-break">
  <div class="chapter-label">Hoofdstuk 5</div>
  <div class="chapter-title">Pilots</div>
  <div class="chapter-line"></div>
  <div class="lead">
    Pilots zijn concrete experimenten waarbij AI wordt ingezet in een afgebakende context.
    Ze leveren directe leerervaring op en vormen de basis voor bredere implementatie.
  </div>

  ${pilots.length > 0 ? pilots.map(p => `
  <div class="card no-break" style="margin-bottom: 14px; border-left: 3px solid ${statusBadge(p.status)};">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
      <div class="card-title" style="font-size:11pt;">${p.naam || 'Naamloos'}</div>
      <span class="badge" style="background:${statusBadge(p.status)}22;color:${statusBadge(p.status)};flex-shrink:0;margin-left:12px;">${p.status || '—'}</span>
    </div>
    ${p.academie ? `<div style="font-size:8pt;color:#9CA3AF;margin-bottom:8px;">📍 ${p.academie} · ${p.platform || ''}</div>` : ''}
    <div class="card-body">${p.doel || ''}</div>
    ${p.bereiken ? `<div style="margin-top:8px;padding-top:8px;border-top:1px solid #F1F5F9;font-size:8.5pt;color:#6B7280;"><strong>Beoogd resultaat:</strong> ${p.bereiken}</div>` : ''}
    ${p.bronLabel && p.bronUrl ? `<div style="margin-top:8px;font-size:8pt;"><a href="${p.bronUrl}" style="color:#1E3A8A;">🔗 ${p.bronLabel}</a></div>` : ''}
  </div>`).join('') : '<div class="card"><div class="card-body">Er zijn nog geen pilots geregistreerd.</div></div>'}
</div>

<!-- NVAO -->
<div class="section section-break">
  <div class="chapter-label">Hoofdstuk 6</div>
  <div class="chapter-title">NHL Stenden & NVAO</div>
  <div class="chapter-line"></div>
  <div class="lead">
    De NVAO vraagt van instellingen een integrale, aantoonbare aanpak van generatieve AI langs alle vier accreditatiestandaarden.
    NHL Stenden geeft hier als volgt invulling aan.
  </div>
  <p>
    De NVAO publiceerde in januari 2026 de Startverkenning Generatieve AI, waarbij uit analyse van 509
    opleidingsbeoordelingen blijkt dat de meeste instellingen zich nog te sterk richten op toetsing en
    fraudepreventie. De NVAO roept op tot een bredere, meer integrale benadering.
    NHL Stenden loopt hierin voorop.
  </p>

  ${NVAO_STANDAARDEN.map(s => `
  <div class="nvao-row no-break">
    <div class="nvao-nr">${s.nr}</div>
    <div class="nvao-content">
      <div class="nvao-titel">${s.titel}</div>
      <div class="nvao-body">${s.nhl}</div>
    </div>
  </div>`).join('')}

  <div class="card" style="margin-top:20px;background:#EFF6FF;border-color:#BFDBFE;">
    <div class="card-title" style="color:#1E3A8A;">📄 Meer informatie</div>
    <div class="card-body">De volledige NVAO-pagina met bronverwijzingen is beschikbaar op het AI-Netwerk platform: <strong>ai-netwerk-nhlstenden.netlify.app/nvao</strong></div>
  </div>
</div>

<!-- NETWERK VISUALISATIE -->
<div class="section section-break">
  <div class="chapter-label">Hoofdstuk 7</div>
  <div class="chapter-title">Het Netwerk in beeld</div>
  <div class="chapter-line"></div>
  <div class="lead">
    Het AI-Netwerk is geen hiërarchie maar een levend ecosysteem van mensen, initiatieven en kennis.
  </div>

  <div class="netwerk-visual">
    <div style="font-size:11pt;font-weight:700;color:rgba(255,255,255,0.6);margin-bottom:20px;text-transform:uppercase;letter-spacing:0.1em;">Extern</div>
    <div class="netwerk-ring" style="margin-bottom:24px;">
      <div class="netwerk-node">🤝 SURF</div>
      <div class="netwerk-node">📚 NPULS</div>
      <div class="netwerk-node">🌍 AI Fryslân</div>
      <div class="netwerk-node">🏥 Frisius MC</div>
      <div class="netwerk-node">🎓 Firda</div>
    </div>
    <div style="width:1px;height:24px;background:rgba(255,255,255,0.2);margin:0 auto;"></div>
    <div class="netwerk-center">🤖</div>
    <div style="font-size:13pt;font-weight:800;margin-bottom:4px;">AI-Netwerk<br>NHL Stenden</div>
    <div style="font-size:9pt;color:rgba(255,255,255,0.6);margin-bottom:24px;">Kwartiermaker Digitale Samenhang</div>
    <div style="width:1px;height:24px;background:rgba(255,255,255,0.2);margin:0 auto;"></div>
    <div class="netwerk-ring" style="margin-top:24px;">
      <div class="netwerk-node">🎓 AI & Leren</div>
      <div class="netwerk-node">⚙️ AI & Werken</div>
      <div class="netwerk-node">⚖️ AI & Verantwoordelijkheid</div>
      <div class="netwerk-node">📖 AI & Geletterdheid</div>
      <div class="netwerk-node">🏢 AI & Werkveld</div>
      <div class="netwerk-node">🔬 AI & Onderzoek</div>
    </div>
    <div style="font-size:11pt;font-weight:700;color:rgba(255,255,255,0.6);margin-top:20px;text-transform:uppercase;letter-spacing:0.1em;">Intern</div>
  </div>
</div>

<!-- GOVERNANCE -->
<div class="section section-break">
  <div class="chapter-label">Hoofdstuk 8</div>
  <div class="chapter-title">Governance & Organisatie</div>
  <div class="chapter-line"></div>
  <div class="lead">
    Het AI-Netwerk is geen project met een einddatum maar een continue organisatievorm die groeit met de instelling mee.
  </div>

  <div class="card-grid" style="margin-bottom:24px;">
    <div class="card" style="background:#0F1E52;color:white;border:none;">
      <div class="card-title" style="color:white;font-size:11pt;">Stuurgroep Digitalisering</div>
      <div class="card-body" style="color:rgba(255,255,255,0.7);">Bestuurlijke opdrachtgever. Stelt kaders, bewaakt voortgang, neemt besluiten over richting en middelen.</div>
    </div>
    <div class="card card-accent">
      <div class="card-title">Kwartiermaker Digitale Samenhang</div>
      <div class="card-body">Dagelijkse aansturing van het AI-Netwerk. Verbindt strategie en uitvoering, rapporteert aan de stuurgroep.</div>
    </div>
    <div class="card card-accent">
      <div class="card-title">Kernteam AI-Netwerk</div>
      <div class="card-body">Kwartiermaker, Informatiemanager en ICT Analist. Operationele verantwoordelijkheid voor het platform en de netwerkorganisatie.</div>
    </div>
    <div class="card card-accent">
      <div class="card-title">Techniek & Infrastructuur</div>
      <div class="card-body">Solution partners voor veilige AI-integratie. Expertise op AVG, API-koppelingen en het AI-applicatielandschap.</div>
    </div>
  </div>

  <div style="margin-bottom:20px;">
    <div style="font-size:10pt;font-weight:700;color:#0F1E52;margin-bottom:14px;">Thema-verantwoordelijkheden</div>
    ${THEMAS.map(t => `
    <div class="gov-row no-break">
      <div class="gov-thema" style="background:${t.kleur};">${t.icon} ${t.titel}</div>
      <div class="gov-body">
        <strong>Trekker:</strong> Wordt ingevuld · <strong>Agenda:</strong> Maandelijks AI-Netwerk overleg · <strong>Verantwoording:</strong> Stuurgroep Digitalisering
      </div>
    </div>`).join('')}
  </div>

  <div class="card" style="background:#F0FDF4;border-color:#BBF7D0;">
    <div class="card-title" style="color:#065F46;">🔄 Overlegstructuur</div>
    <div class="card-body">
      <strong>Maandelijks:</strong> AI-Netwerk kernteam overleg — voortgang, nieuwe initiatieven, knelpunten<br>
      <strong>Kwartaal:</strong> Update stuurgroep — rapportage, besluiten, bijsturing<br>
      <strong>Jaarlijks:</strong> Evaluatie en herijking — doelstellingen, thema's, governance<br>
      <strong>Continu:</strong> Platform-updates — het AI-Netwerk is altijd actueel
    </div>
  </div>
</div>

<!-- AFSLUITING -->
<div class="section section-break">
  <div class="chapter-label">Afsluiting</div>
  <div class="chapter-title">Vooruitkijken</div>
  <div class="chapter-line"></div>
  <div class="lead">
    Het AI-Netwerk is geen eindpunt maar een vertrekpunt. De echte waarde ontstaat wanneer mensen ermee werken, er op voortbouwen en er eigenaarschap bij ervaren.
  </div>
  <p>
    NHL Stenden staat voor de opgave om AI betekenisvol te integreren in het onderwijs, het onderzoek en de organisatie.
    Dat vraagt om meer dan technologie: het vraagt om cultuur, vaardigheden, governance en vertrouwen.
    Het AI-Netwerk is het instrument om die opgave te ondersteunen.
  </p>
  <p>
    De komende periode richt zich op het verder uitbouwen van de zes thema's, het versterken van de
    trekkers per thema, het ontsluiten van meer initiatieven en het verdiepen van de verbinding met
    accreditatie en bestuurlijke verantwoording.
  </p>
  <div class="card" style="background:linear-gradient(135deg,#0F1E52,#1E3A8A);color:white;border:none;text-align:center;padding:32px;">
    <div style="font-size:24pt;margin-bottom:12px;">🤖</div>
    <div style="font-size:14pt;font-weight:800;margin-bottom:8px;">AI-Netwerk NHL Stenden</div>
    <div style="color:rgba(255,255,255,0.7);font-size:9pt;margin-bottom:16px;">ai-netwerk-nhlstenden.netlify.app</div>
    <div style="color:rgba(255,255,255,0.6);font-size:8.5pt;">Dit rapport is automatisch gegenereerd op ${DATUM()} vanuit de live data van het AI-Netwerk platform.</div>
  </div>
</div>

<!-- BIJLAGE -->
<div class="section section-break">
  <div class="chapter-label">Bijlage</div>
  <div class="chapter-title">Volledig overzicht</div>
  <div class="chapter-line"></div>

  <div style="font-size:11pt;font-weight:700;color:#0F1E52;margin-bottom:12px;margin-top:8px;">Pilots (${pilots.length})</div>
  ${pilots.length > 0 ? `<table>
    <thead><tr><th>Naam</th><th>Academie</th><th>Platform</th><th>Status</th></tr></thead>
    <tbody>
      ${pilots.map(p => `<tr>
        <td><strong>${p.naam || '—'}</strong></td>
        <td>${p.academie || '—'}</td>
        <td>${p.platform || '—'}</td>
        <td><span class="badge" style="background:${statusBadge(p.status)}22;color:${statusBadge(p.status)}">${p.status || '—'}</span></td>
      </tr>`).join('')}
    </tbody>
  </table>` : '<p style="color:#9CA3AF;">Geen pilots geregistreerd.</p>'}

  <div style="font-size:11pt;font-weight:700;color:#0F1E52;margin-bottom:12px;margin-top:24px;">Initiatieven (${initiatieven.length})</div>
  ${initiatieven.length > 0 ? `<table>
    <thead><tr><th>Naam</th><th>Type</th><th>Status</th><th>Impact</th></tr></thead>
    <tbody>
      ${initiatieven.map(i => `<tr>
        <td><strong>${i.naam || '—'}</strong><br><span style="font-size:8pt;color:#9CA3AF">${(i.omschrijving || '').slice(0, 60)}${i.omschrijving && i.omschrijving.length > 60 ? '...' : ''}</span></td>
        <td><span class="badge" style="background:${i.type === 'intern' ? '#EFF6FF' : '#F0FDF4'};color:${i.type === 'intern' ? '#1E3A8A' : '#065F46'}">${i.type || 'intern'}</span></td>
        <td><span class="badge" style="background:${statusBadge(i.status)}22;color:${statusBadge(i.status)}">${i.status || '—'}</span></td>
        <td>${i.impactInschatting || '—'}</td>
      </tr>`).join('')}
    </tbody>
  </table>` : '<p style="color:#9CA3AF;">Geen initiatieven geregistreerd.</p>'}

  <div style="font-size:11pt;font-weight:700;color:#0F1E52;margin-bottom:12px;margin-top:24px;">Inspiratie (${inspiraties.length})</div>
  ${inspiraties.length > 0 ? `<table>
    <thead><tr><th>Titel</th><th>Type</th><th>Datum</th></tr></thead>
    <tbody>
      ${inspiraties.map(b => `<tr>
        <td><strong>${b.titel || '—'}</strong><br><span style="font-size:8pt;color:#9CA3AF">${(b.tekst || '').slice(0, 80)}${b.tekst && b.tekst.length > 80 ? '...' : ''}</span></td>
        <td>${b.typelabel || b.type || '—'}</td>
        <td>${b.datum || '—'}</td>
      </tr>`).join('')}
    </tbody>
  </table>` : '<p style="color:#9CA3AF;">Geen inspiratie-items geregistreerd.</p>'}
</div>

<!-- FOOTER -->
<div class="report-footer">
  <div>
    <div class="report-footer-logo">AI-Netwerk NHL Stenden</div>
    <div class="report-footer-sub">Transitieprogramma Digitalisering · ${DATUM()}</div>
  </div>
  <div style="text-align:right;color:rgba(255,255,255,0.4);font-size:7.5pt;">
    Automatisch gegenereerd vanuit live platform data<br>
    ai-netwerk-nhlstenden.netlify.app
  </div>
</div>

</div>

<script>
  window.onload = function() {
    document.title = 'AI-Netwerk NHL Stenden Rapport ${DATUM()}';
    setTimeout(function() { window.print(); }, 500);
  }
</script>
</body>
</html>`
}

export default async (req, context) => {
  const headers = {
    'Content-Type': 'text/html; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
  }

  if (req.method === 'OPTIONS') {
    return new Response('', { status: 200, headers })
  }

  // Data ophalen uit URL parameters of lege fallback
  let data = { pilots: [], alleInitiatieven: [], inspiraties: [], docs: [] }
  try {
    const url = new URL(req.url)
    const dataParam = url.searchParams.get('data')
    if (dataParam) {
      const parsed = JSON.parse(decodeURIComponent(dataParam))
      data = { ...data, ...parsed }
    }
  } catch (e) { /* fallback */ }

  const html = generateHTML(data)
  return new Response(html, { status: 200, headers })
}
