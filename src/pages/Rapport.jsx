import { useEffect } from 'react'
import { INIT_PILOTS as initData } from '../initialData'

const DATUM = () => new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })

const THEMAS = [
  { titel: 'AI & Leren', icon: '🎓', kleur: '#1E3A8A', omschrijving: 'Hoe AI het leerproces van studenten verrijkt en ondersteunt.' },
  { titel: 'AI & Werken', icon: '⚙️', kleur: '#0F766E', omschrijving: 'AI als hulpmiddel voor medewerkers in hun dagelijkse werk.' },
  { titel: 'AI & Verantwoordelijkheid', icon: '⚖️', kleur: '#7C3AED', omschrijving: 'Ethiek, governance en de EU AI Act als kader voor verantwoord gebruik.' },
  { titel: 'AI & Geletterdheid', icon: '📖', kleur: '#B45309', omschrijving: 'Vaardigheden en kennis voor studenten en medewerkers om AI te begrijpen.' },
  { titel: 'AI & Werkveld', icon: '🏢', kleur: '#0E7490', omschrijving: 'Samenwerking met het werkveld en regionale AI-initiatieven.' },
  { titel: 'AI & Onderzoek', icon: '🔬', kleur: '#BE185D', omschrijving: 'Praktijkgericht onderzoek naar AI-toepassingen in onderwijs en zorg.' },
]

const NVAO_STANDAARDEN = [
  { nr: 1, titel: 'Beoogde leerresultaten', nhl: 'AI-geletterdheid in leerdoelen via minors en curricula (Minor AI in Practice, Minor Decision Making & Generative AI).' },
  { nr: 2, titel: 'Onderwijsleeromgeving', nhl: 'CTL-richtlijnen voor docenten, ARDA AI-modules, I\'M A.I. initiatief, Npuls webinars.' },
  { nr: 3, titel: 'Toetsing en examinering', nhl: 'CTL toetsbeleid GenAI, bewuste keuze tegen AI-detector, DBE-aanpak met authentieke beroepsprestaties.' },
  { nr: 4, titel: 'Gerealiseerde leerresultaten', nhl: 'FrisiusLab samenwerkingen, portfolio-beoordelingen, praktijkgericht onderzoek.' },
]

function statusKleur(s) {
  const map = { actief: '#0F766E', 'in-ontwikkeling': '#B45309', gepland: '#1E3A8A', afgerond: '#374151', Lopend: '#0F766E', Verkenning: '#B45309' }
  return map[s] || '#374151'
}

export default function Rapport({ pilots = [], inspiraties = [] }) {
  const alleInitiatieven = []

  useEffect(() => {
    document.title = 'AI-Netwerk NHL Stenden Rapport ' + DATUM()
  }, [])

  const intern = alleInitiatieven.filter(i => i.type === 'intern' || !i.type)
  const extern = alleInitiatieven.filter(i => i.type === 'extern' || i.type === 'surf')

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: white; }
        .rapport { max-width: 210mm; margin: 0 auto; background: white; }
        .no-print { position: fixed; top: 20px; right: 20px; z-index: 999; display: flex; gap: 8px; }
        @media print {
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        .cover {
          background: linear-gradient(135deg, #0F1E52 0%, #1E3A8A 60%, #162D6E 100%);
          min-height: 100vh; display: flex; flex-direction: column;
          justify-content: space-between; padding: 60px; color: white;
          position: relative; overflow: hidden;
        }
        .cover::before { content: ''; position: absolute; top: -100px; right: -100px; width: 500px; height: 500px; border: 1px solid rgba(255,255,255,0.08); border-radius: 50%; }
        .section { padding: 50px 60px; }
        .chapter-label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #4DAAFF; margin-bottom: 8px; }
        .chapter-title { font-size: 22pt; font-weight: 800; color: #0F1E52; line-height: 1.2; margin-bottom: 6px; }
        .chapter-line { width: 40px; height: 3px; background: linear-gradient(90deg, #1E3A8A, #4DAAFF); border-radius: 2px; margin: 16px 0 24px; }
        .lead { font-size: 12pt; color: #374151; line-height: 1.7; margin-bottom: 20px; }
        p { color: #4B5563; line-height: 1.7; margin-bottom: 12px; font-size: 10pt; }
        .stat-row { display: flex; gap: 16px; margin: 24px 0; }
        .stat-box { flex: 1; background: linear-gradient(135deg, #0F1E52, #1E3A8A); border-radius: 12px; padding: 20px; text-align: center; color: white; }
        .stat-num { font-size: 28pt; font-weight: 900; color: #4DAAFF; }
        .stat-lbl { font-size: 8pt; font-weight: 500; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; }
        .card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 20px 0; }
        .card { background: #F8FAFC; border: 1px solid #E2E8F0; border-left: 3px solid #1E3A8A; border-radius: 12px; padding: 18px; }
        .card-title { font-size: 10pt; font-weight: 700; color: #0F1E52; margin-bottom: 6px; }
        .card-body { font-size: 9pt; color: #6B7280; line-height: 1.6; }
        table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 9pt; }
        th { background: #0F1E52; color: white; padding: 10px 14px; text-align: left; font-weight: 600; font-size: 8pt; text-transform: uppercase; }
        td { padding: 10px 14px; border-bottom: 1px solid #F1F5F9; color: #374151; vertical-align: top; }
        tr:nth-child(even) td { background: #F8FAFC; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 7.5pt; font-weight: 600; }
        .cover-meta { display: flex; gap: 40px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.15); }
        .cover-meta label { font-size: 7pt; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); display: block; margin-bottom: 4px; }
        .cover-meta span { font-size: 10pt; font-weight: 600; color: white; }
        .thema-row { display: flex; align-items: flex-start; gap: 14px; padding: 14px; border-radius: 10px; margin-bottom: 10px; }
        .nvao-row { display: flex; gap: 0; margin-bottom: 10px; border-radius: 10px; overflow: hidden; border: 1px solid #E2E8F0; }
        .nvao-nr { background: #0F1E52; color: white; width: 40px; display: flex; align-items: center; justify-content: center; font-size: 14pt; font-weight: 900; flex-shrink: 0; }
        .nvao-content { padding: 14px 16px; }
        .netwerk-box { background: linear-gradient(135deg, #0F1E52 0%, #1a2f6b 100%); border-radius: 16px; padding: 40px; margin: 24px 0; text-align: center; color: white; }
        .netwerk-nodes { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin: 16px 0; }
        .netwerk-node { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 6px 12px; font-size: 8pt; font-weight: 600; }
        .gov-row { display: flex; gap: 12px; margin-bottom: 10px; }
        .gov-thema { flex: 0 0 160px; border-radius: 8px; padding: 12px; color: white; font-size: 9pt; font-weight: 600; }
        .gov-body { flex: 1; background: #F8FAFC; border-radius: 8px; padding: 12px; font-size: 9pt; color: #374151; border-left: 3px solid #4DAAFF; }
        .report-footer { background: #0F1E52; color: white; padding: 30px 60px; display: flex; justify-content: space-between; align-items: center; font-size: 8pt; margin-top: 40px; }
      `}</style>

      <div className="no-print">
        <button onClick={() => window.print()}
          style={{background:'#1E3A8A',color:'white',border:'none',padding:'10px 20px',borderRadius:'8px',cursor:'pointer',fontWeight:600,fontSize:'14px'}}>
          🖨️ Afdrukken / Opslaan als PDF
        </button>
        <button onClick={() => window.history.back()}
          style={{background:'#F1F5F9',color:'#374151',border:'none',padding:'10px 20px',borderRadius:'8px',cursor:'pointer',fontWeight:600,fontSize:'14px'}}>
          ← Terug
        </button>
      </div>

      <div className="rapport">

        {/* COVER */}
        <div className="cover">
          <div>
            <div style={{fontSize:'8pt',fontWeight:600,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)',marginBottom:'8px'}}>
              NHL Stenden Hogeschool · Transitieprogramma Digitalisering
            </div>
            <div style={{fontSize:'32pt',margin:'32px 0 20px'}}>🤖</div>
            <div style={{fontSize:'42pt',fontWeight:900,lineHeight:1.1,marginBottom:'16px',letterSpacing:'-0.02em'}}>
              AI-Netwerk<br/>NHL Stenden
            </div>
            <div style={{width:'60px',height:'4px',background:'#4DAAFF',borderRadius:'2px',margin:'24px 0'}}></div>
            <div style={{fontSize:'14pt',color:'rgba(255,255,255,0.75)',maxWidth:'500px',lineHeight:1.5}}>
              Een levend overzicht van de AI-strategie, initiatieven en governance van NHL Stenden Hogeschool
            </div>
          </div>
          <div className="cover-meta">
            <div><label>Rapportdatum</label><span>{DATUM()}</span></div>
            <div><label>Versie</label><span>Live rapport</span></div>
            <div><label>Opgesteld door</label><span>Kwartiermaker Digitale Samenhang</span></div>
            <div><label>Status</label><span>Actief programma</span></div>
          </div>
        </div>

        {/* H1: Wat is het AI-Netwerk */}
        <div className="section page-break">
          <div className="chapter-label">Hoofdstuk 1</div>
          <div className="chapter-title">Wat is het AI-Netwerk?</div>
          <div className="chapter-line"></div>
          <div className="lead">Het AI-Netwerk is de centrale plek waar NHL Stenden alles rondom kunstmatige intelligentie samenvoegt: wat we doen, wie we zijn, en hoe we AI verantwoord inzetten.</div>
          <p>NHL Stenden Hogeschool bevindt zich midden in een periode van ingrijpende digitalisering. Kunstmatige intelligentie is daarin niet slechts een technische ontwikkeling, maar een fundamentele verandering in hoe we leren, werken, toetsen en samenwerken. Het AI-Netwerk is opgericht om die verandering te begeleiden: met overzicht, richting en menselijke maat.</p>
          <p>Dit rapport geeft een actueel beeld van de stand van zaken. Het is bedoeld voor iedereen die betrokken is bij of geïnteresseerd is in de AI-aanpak van NHL Stenden.</p>
          <div className="stat-row">
            <div className="stat-box"><div className="stat-num">{pilots.length}</div><div className="stat-lbl">Pilots</div></div>
            <div className="stat-box"><div className="stat-num">{alleInitiatieven.length}</div><div className="stat-lbl">Initiatieven</div></div>
            <div className="stat-box"><div className="stat-num">{inspiraties.length}</div><div className="stat-lbl">Inspiratie</div></div>
            <div className="stat-box"><div className="stat-num">6</div><div className="stat-lbl">Themas</div></div>
          </div>
          <div className="card-grid">
            <div className="card"><div className="card-title">🎯 Doel</div><div className="card-body">Alle AI-initiatieven, kennis, pilots en mensen bij NHL Stenden samenbrengen op een plek, toegankelijk voor iedereen.</div></div>
            <div className="card"><div className="card-title">🔗 Verbinding</div><div className="card-body">Silos doorbreken door initiatieven van verschillende academies, diensten en externe partners aan elkaar te verbinden.</div></div>
            <div className="card"><div className="card-title">⚖️ Verantwoord</div><div className="card-body">AI wordt ingezet met aandacht voor ethiek, privacy, de EU AI Act en de menselijke maat. Niet alles kan, niet alles moet.</div></div>
            <div className="card"><div className="card-title">📈 Bewijs</div><div className="card-body">Het platform dient als levende bewijslast voor accreditatie, bestuurlijke verantwoording en externe communicatie.</div></div>
          </div>
        </div>

        {/* H2: Fundament */}
        <div className="section page-break">
          <div className="chapter-label">Hoofdstuk 2</div>
          <div className="chapter-title">Het Fundament</div>
          <div className="chapter-line"></div>
          <div className="lead">Het AI-Netwerk staat op een solide fundament van strategie, beleid en externe verbindingen.</div>
          <p>NHL Stenden werkt aan AI vanuit een heldere bestuurlijke opdracht. Het Transitieprogramma Digitalisering vormt het kader waarbinnen de AI-netwerkorganisatie functioneert. De Kwartiermaker Digitale Samenhang is aangesteld om samenhang te brengen in de vele digitale vraagstukken die de instelling raken.</p>
          <div className="card-grid">
            <div className="card"><div className="card-title">🏛️ Bestuurlijk kader</div><div className="card-body">Transitieprogramma Digitalisering onder regie van de Stuurgroep Digitalisering. CvB-besluit als startpunt voor de nieuwe fase.</div></div>
            <div className="card"><div className="card-title">⚖️ Wettelijk kader</div><div className="card-body">AVG, EU AI Act en de BKO-standaarden zijn leidend. Risicogestuurde aanpak via AI-risicoscan voor alle nieuwe toepassingen.</div></div>
            <div className="card"><div className="card-title">🤝 Nationaal netwerk</div><div className="card-body">SURF AI-Hub, NPULS-programma, Vereniging Hogescholen. NHL Stenden levert actief input aan nationale richtlijnen.</div></div>
            <div className="card"><div className="card-title">🌍 Regionaal netwerk</div><div className="card-body">AI Fryslân-coalitie, FrisiusLab, Frisius MC, Firda. Regionale samenwerking als vliegwiel voor innovatie in het noorden.</div></div>
          </div>
        </div>

        {/* H3: Themas */}
        <div className="section page-break">
          <div className="chapter-label">Hoofdstuk 3</div>
          <div className="chapter-title">De zes themas</div>
          <div className="chapter-line"></div>
          <div className="lead">Het AI-Netwerk is georganiseerd rondom zes themas die samen het volledige spectrum van AI bij NHL Stenden omvatten.</div>
          {THEMAS.map(t => (
            <div key={t.titel} className="thema-row" style={{background: t.kleur + '12', borderLeft: '3px solid ' + t.kleur}}>
              <div style={{fontSize:'18pt',flexShrink:0}}>{t.icon}</div>
              <div>
                <div style={{fontSize:'10pt',fontWeight:700,color:t.kleur,marginBottom:'4px'}}>{t.titel}</div>
                <div style={{fontSize:'9pt',color:'#6B7280'}}>{t.omschrijving}</div>
              </div>
            </div>
          ))}
        </div>

        {/* H4: Initiatieven */}
        <div className="section page-break">
          <div className="chapter-label">Hoofdstuk 4</div>
          <div className="chapter-title">Initiatieven</div>
          <div className="chapter-line"></div>
          <div className="lead">NHL Stenden heeft een rijk palet aan AI-initiatieven, zowel intern als in samenwerking met externe partners.</div>
          <div className="stat-row">
            <div className="stat-box"><div className="stat-num">{intern.length}</div><div className="stat-lbl">Intern</div></div>
            <div className="stat-box"><div className="stat-num">{extern.length}</div><div className="stat-lbl">Extern / Samenwerking</div></div>
            <div className="stat-box"><div className="stat-num">{alleInitiatieven.filter(i => i.status === 'actief').length}</div><div className="stat-lbl">Actief</div></div>
          </div>
          {alleInitiatieven.length > 0 ? (
            <table>
              <thead><tr><th>Initiatief</th><th>Type</th><th>Status</th><th>Impact</th></tr></thead>
              <tbody>
                {alleInitiatieven.map(i => (
                  <tr key={i.id}>
                    <td><strong>{i.naam}</strong><br/><span style={{color:'#9CA3AF',fontSize:'8pt'}}>{(i.omschrijving||'').slice(0,70)}{i.omschrijving && i.omschrijving.length > 70 ? '...' : ''}</span></td>
                    <td><span className="badge" style={{background: i.type==='intern' ? '#EFF6FF' : '#F0FDF4', color: i.type==='intern' ? '#1E3A8A' : '#065F46'}}>{i.type||'intern'}</span></td>
                    <td><span className="badge" style={{background: statusKleur(i.status)+'22', color: statusKleur(i.status)}}>{i.status||''}</span></td>
                    <td style={{color:'#6B7280'}}>{i.impactInschatting||'—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p style={{color:'#9CA3AF'}}>Nog geen initiatieven geregistreerd.</p>}
        </div>

        {/* H5: Pilots */}
        <div className="section page-break">
          <div className="chapter-label">Hoofdstuk 5</div>
          <div className="chapter-title">Pilots</div>
          <div className="chapter-line"></div>
          <div className="lead">Pilots zijn concrete experimenten waarbij AI wordt ingezet in een afgebakende context. Ze leveren directe leerervaring op en vormen de basis voor bredere implementatie.</div>
          {pilots.length > 0 ? pilots.map(p => (
            <div key={p.id} className="card" style={{marginBottom:'14px', borderLeftColor: statusKleur(p.status)}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'8px'}}>
                <div className="card-title" style={{fontSize:'11pt'}}>{p.naam}</div>
                <span className="badge" style={{background: statusKleur(p.status)+'22', color: statusKleur(p.status), flexShrink:0, marginLeft:'12px'}}>{p.status}</span>
              </div>
              {p.academie && <div style={{fontSize:'8pt',color:'#9CA3AF',marginBottom:'8px'}}>📍 {p.academie} · {p.platform}</div>}
              <div className="card-body">{p.doel}</div>
              {p.bereiken && <div style={{marginTop:'8px',paddingTop:'8px',borderTop:'1px solid #F1F5F9',fontSize:'8.5pt',color:'#6B7280'}}><strong>Beoogd resultaat:</strong> {p.bereiken}</div>}
              {p.bronLabel && p.bronUrl && <div style={{marginTop:'8px',fontSize:'8pt',color:'#1E3A8A'}}>🔗 {p.bronLabel}</div>}
            </div>
          )) : <p style={{color:'#9CA3AF'}}>Nog geen pilots geregistreerd.</p>}
        </div>

        {/* H6: NVAO */}
        <div className="section page-break">
          <div className="chapter-label">Hoofdstuk 6</div>
          <div className="chapter-title">NHL Stenden & NVAO</div>
          <div className="chapter-line"></div>
          <div className="lead">De NVAO vraagt van instellingen een integrale, aantoonbare aanpak van generatieve AI langs alle vier accreditatiestandaarden. NHL Stenden geeft hier als volgt invulling aan.</div>
          <p>De NVAO publiceerde in januari 2026 de Startverkenning Generatieve AI, waarbij uit analyse van 509 opleidingsbeoordelingen blijkt dat de meeste instellingen zich nog te sterk richten op toetsing en fraudepreventie. De NVAO roept op tot een bredere, meer integrale benadering. NHL Stenden loopt hierin voorop.</p>
          {NVAO_STANDAARDEN.map(s => (
            <div key={s.nr} className="nvao-row">
              <div className="nvao-nr">{s.nr}</div>
              <div className="nvao-content">
                <div style={{fontSize:'10pt',fontWeight:700,color:'#0F1E52',marginBottom:'4px'}}>{s.titel}</div>
                <div style={{fontSize:'9pt',color:'#6B7280'}}>{s.nhl}</div>
              </div>
            </div>
          ))}
          <div className="card" style={{marginTop:'20px',background:'#EFF6FF',borderColor:'#BFDBFE'}}>
            <div className="card-title" style={{color:'#1E3A8A'}}>📄 Meer informatie</div>
            <div className="card-body">De volledige NVAO-pagina met bronverwijzingen is beschikbaar op het AI-Netwerk platform: ai-netwerk-nhlstenden.netlify.app/nvao</div>
          </div>
        </div>

        {/* H7: Netwerk */}
        <div className="section page-break">
          <div className="chapter-label">Hoofdstuk 7</div>
          <div className="chapter-title">Het Netwerk in beeld</div>
          <div className="chapter-line"></div>
          <div className="lead">Het AI-Netwerk is geen hierarchie maar een levend ecosysteem van mensen, initiatieven en kennis.</div>
          <div className="netwerk-box">
            <div style={{fontSize:'10pt',fontWeight:700,color:'rgba(255,255,255,0.5)',marginBottom:'16px',textTransform:'uppercase',letterSpacing:'0.1em'}}>Extern</div>
            <div className="netwerk-nodes">
              {['🤝 SURF','📚 NPULS','🌍 AI Fryslân','🏥 Frisius MC','🎓 Firda'].map(n => <div key={n} className="netwerk-node">{n}</div>)}
            </div>
            <div style={{width:'1px',height:'20px',background:'rgba(255,255,255,0.2)',margin:'0 auto'}}></div>
            <div style={{width:'70px',height:'70px',background:'white',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24pt',margin:'16px auto',boxShadow:'0 0 0 10px rgba(255,255,255,0.1)'}}>🤖</div>
            <div style={{fontSize:'13pt',fontWeight:800,marginBottom:'4px'}}>AI-Netwerk NHL Stenden</div>
            <div style={{fontSize:'9pt',color:'rgba(255,255,255,0.6)',marginBottom:'20px'}}>Kwartiermaker Digitale Samenhang</div>
            <div style={{width:'1px',height:'20px',background:'rgba(255,255,255,0.2)',margin:'0 auto'}}></div>
            <div className="netwerk-nodes" style={{marginTop:'16px'}}>
              {THEMAS.map(t => <div key={t.titel} className="netwerk-node">{t.icon} {t.titel}</div>)}
            </div>
            <div style={{fontSize:'10pt',fontWeight:700,color:'rgba(255,255,255,0.5)',marginTop:'16px',textTransform:'uppercase',letterSpacing:'0.1em'}}>Intern</div>
          </div>
        </div>

        {/* H8: Governance */}
        <div className="section page-break">
          <div className="chapter-label">Hoofdstuk 8</div>
          <div className="chapter-title">Governance & Organisatie</div>
          <div className="chapter-line"></div>
          <div className="lead">Het AI-Netwerk is geen project met een einddatum maar een continue organisatievorm die groeit met de instelling mee.</div>
          <div className="card-grid" style={{marginBottom:'24px'}}>
            <div className="card" style={{background:'#0F1E52',color:'white',border:'none'}}><div className="card-title" style={{color:'white'}}>Stuurgroep Digitalisering</div><div className="card-body" style={{color:'rgba(255,255,255,0.7)'}}>Bestuurlijke opdrachtgever. Stelt kaders, bewaakt voortgang, neemt besluiten over richting en middelen.</div></div>
            <div className="card"><div className="card-title">Kwartiermaker Digitale Samenhang</div><div className="card-body">Dagelijkse aansturing van het AI-Netwerk. Verbindt strategie en uitvoering, rapporteert aan de stuurgroep.</div></div>
            <div className="card"><div className="card-title">Kernteam AI-Netwerk</div><div className="card-body">Kwartiermaker, Informatiemanager en ICT Analist. Operationele verantwoordelijkheid voor het platform en de netwerkorganisatie.</div></div>
            <div className="card"><div className="card-title">Techniek & Infrastructuur</div><div className="card-body">Solution partners voor veilige AI-integratie. Expertise op AVG, API-koppelingen en het AI-applicatielandschap.</div></div>
          </div>
          <div style={{marginBottom:'16px',fontWeight:700,color:'#0F1E52',fontSize:'10pt'}}>Thema-verantwoordelijkheden</div>
          {THEMAS.map(t => (
            <div key={t.titel} className="gov-row">
              <div className="gov-thema" style={{background: t.kleur}}>{t.icon} {t.titel}</div>
              <div className="gov-body">Trekker: Wordt ingevuld · Overleg: Maandelijks AI-Netwerk overleg · Verantwoording: Stuurgroep Digitalisering</div>
            </div>
          ))}
          <div className="card" style={{marginTop:'16px',background:'#F0FDF4',borderColor:'#BBF7D0',borderLeft:'3px solid #0F766E'}}>
            <div className="card-title" style={{color:'#065F46'}}>🔄 Overlegstructuur</div>
            <div className="card-body">
              <strong>Maandelijks:</strong> AI-Netwerk kernteam overleg — voortgang, nieuwe initiatieven, knelpunten<br/>
              <strong>Kwartaal:</strong> Update stuurgroep — rapportage, besluiten, bijsturing<br/>
              <strong>Jaarlijks:</strong> Evaluatie en herijking — doelstellingen, themas, governance<br/>
              <strong>Continu:</strong> Platform-updates — het AI-Netwerk is altijd actueel
            </div>
          </div>
        </div>

        {/* Afsluiting */}
        <div className="section page-break">
          <div className="chapter-label">Afsluiting</div>
          <div className="chapter-title">Vooruitkijken</div>
          <div className="chapter-line"></div>
          <div className="lead">Het AI-Netwerk is geen eindpunt maar een vertrekpunt. De echte waarde ontstaat wanneer mensen ermee werken, er op voortbouwen en er eigenaarschap bij ervaren.</div>
          <p>NHL Stenden staat voor de opgave om AI betekenisvol te integreren in het onderwijs, het onderzoek en de organisatie. Dat vraagt om meer dan technologie: het vraagt om cultuur, vaardigheden, governance en vertrouwen. Het AI-Netwerk is het instrument om die opgave te ondersteunen.</p>
          <div className="card" style={{background:'linear-gradient(135deg,#0F1E52,#1E3A8A)',color:'white',border:'none',textAlign:'center',padding:'32px',marginTop:'24px'}}>
            <div style={{fontSize:'24pt',marginBottom:'12px'}}>🤖</div>
            <div style={{fontSize:'14pt',fontWeight:800,marginBottom:'8px'}}>AI-Netwerk NHL Stenden</div>
            <div style={{color:'rgba(255,255,255,0.7)',fontSize:'9pt',marginBottom:'12px'}}>ai-netwerk-nhlstenden.netlify.app</div>
            <div style={{color:'rgba(255,255,255,0.5)',fontSize:'8.5pt'}}>Dit rapport is automatisch gegenereerd op {DATUM()} vanuit de live data van het AI-Netwerk platform.</div>
          </div>
        </div>

        {/* Bijlage */}
        <div className="section page-break">
          <div className="chapter-label">Bijlage</div>
          <div className="chapter-title">Volledig overzicht</div>
          <div className="chapter-line"></div>

          <div style={{fontSize:'11pt',fontWeight:700,color:'#0F1E52',margin:'16px 0 10px'}}>Pilots ({pilots.length})</div>
          {pilots.length > 0 ? (
            <table>
              <thead><tr><th>Naam</th><th>Academie</th><th>Platform</th><th>Status</th></tr></thead>
              <tbody>{pilots.map(p => <tr key={p.id}><td><strong>{p.naam}</strong></td><td>{p.academie||'—'}</td><td>{p.platform||'—'}</td><td><span className="badge" style={{background: statusKleur(p.status)+'22',color: statusKleur(p.status)}}>{p.status}</span></td></tr>)}</tbody>
            </table>
          ) : <p style={{color:'#9CA3AF'}}>Geen pilots geregistreerd.</p>}

          <div style={{fontSize:'11pt',fontWeight:700,color:'#0F1E52',margin:'24px 0 10px'}}>Initiatieven ({alleInitiatieven.length})</div>
          {alleInitiatieven.length > 0 ? (
            <table>
              <thead><tr><th>Naam</th><th>Type</th><th>Status</th><th>Impact</th></tr></thead>
              <tbody>{alleInitiatieven.map(i => <tr key={i.id}><td><strong>{i.naam}</strong><br/><span style={{fontSize:'8pt',color:'#9CA3AF'}}>{(i.omschrijving||'').slice(0,60)}{i.omschrijving && i.omschrijving.length > 60 ? '...' : ''}</span></td><td><span className="badge" style={{background: i.type==='intern'?'#EFF6FF':'#F0FDF4',color: i.type==='intern'?'#1E3A8A':'#065F46'}}>{i.type||'intern'}</span></td><td><span className="badge" style={{background: statusKleur(i.status)+'22',color: statusKleur(i.status)}}>{i.status}</span></td><td>{i.impactInschatting||'—'}</td></tr>)}</tbody>
            </table>
          ) : <p style={{color:'#9CA3AF'}}>Geen initiatieven geregistreerd.</p>}

          <div style={{fontSize:'11pt',fontWeight:700,color:'#0F1E52',margin:'24px 0 10px'}}>Inspiratie ({inspiraties.length})</div>
          {inspiraties.length > 0 ? (
            <table>
              <thead><tr><th>Titel</th><th>Type</th><th>Datum</th></tr></thead>
              <tbody>{inspiraties.map(b => <tr key={b.id}><td><strong>{b.titel}</strong><br/><span style={{fontSize:'8pt',color:'#9CA3AF'}}>{(b.tekst||'').slice(0,80)}{b.tekst && b.tekst.length > 80 ? '...' : ''}</span></td><td>{b.typelabel||b.type||'—'}</td><td>{b.datum||'—'}</td></tr>)}</tbody>
            </table>
          ) : <p style={{color:'#9CA3AF'}}>Geen inspiratie-items geregistreerd.</p>}
        </div>

        {/* Footer */}
        <div className="report-footer">
          <div>
            <div style={{fontWeight:800,fontSize:'11pt'}}>AI-Netwerk NHL Stenden</div>
            <div style={{color:'rgba(255,255,255,0.5)',marginTop:'2px'}}>Transitieprogramma Digitalisering · {DATUM()}</div>
          </div>
          <div style={{textAlign:'right',color:'rgba(255,255,255,0.4)',fontSize:'7.5pt'}}>
            Automatisch gegenereerd vanuit live platform data<br/>
            ai-netwerk-nhlstenden.netlify.app
          </div>
        </div>
      </div>
    </>
  )
}
