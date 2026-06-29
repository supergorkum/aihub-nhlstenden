import { useState } from 'react'
import { Link } from 'react-router-dom'
import GradientHeader from '../components/GradientHeader'
import { sporen } from '../data'
import GeletterdheidsNetwerk from './GeletterdheidsNetwerk'

const DOELGROEPEN = [
  {
    id: 'studenten',
    label: 'Studenten',
    icon: '🎓',
    kleur: '#1E3A8A',
    licht: '#EFF6FF',
    omschrijving: 'Studenten leren AI kritisch inzetten voor hun studie, onderzoek en toekomstige beroepspraktijk.',
    vragen: ['Wat is AI en hoe werkt het?', 'Hoe gebruik ik AI verantwoord in mijn scriptie?', 'Wat betekent AI voor mijn beroep straks?'],
  },
  {
    id: 'docenten',
    label: 'Docenten',
    icon: '📚',
    kleur: '#0F766E',
    licht: '#F0FDFA',
    omschrijving: 'Docenten ontdekken hoe AI hun onderwijs kan versterken en wat de didactische en ethische vraagstukken zijn.',
    vragen: ['Hoe integreer ik AI in mijn lessen?', 'Hoe ga ik om met AI bij toetsing?', 'Welke tools zijn goedgekeurd?'],
  },
  {
    id: 'medewerkers',
    label: 'Medewerkers',
    icon: '💼',
    kleur: '#7C3AED',
    licht: '#F5F3FF',
    omschrijving: 'Medewerkers begrijpen hoe AI hun werk verandert en hoe zij er eigenaarschap bij kunnen ervaren.',
    vragen: ['Welke AI-tools mag ik gebruiken?', 'Hoe zit het met privacy en AVG?', 'Hoe word ik AI-vaardig in mijn functie?'],
  },
  {
    id: 'management',
    label: 'Management',
    icon: '🧭',
    kleur: '#BE185D',
    licht: '#FDF2F8',
    omschrijving: 'Managers begrijpen de strategische impact van AI en kunnen bewuste keuzes maken over inzet en governance.',
    vragen: ['Wat zijn de risico\'s van AI in mijn team?', 'Hoe stuur ik op verantwoord AI-gebruik?', 'Wat vraagt de AI Act van ons?'],
  },
  {
    id: 'onderwijs',
    label: 'Onderwijs & Curriculum',
    icon: '🏫',
    kleur: '#D97706',
    licht: '#FFFBEB',
    omschrijving: 'Hoe verankeren we AI-geletterdheid structureel in curricula en opleidingsdoelen?',
    vragen: ['Welke AI-competenties verwachten we van onze afgestudeerden?', 'Hoe integreer ik AI in het curriculum?', 'Welke kaders zijn er?'],
  },
  {
    id: 'diensten',
    label: 'Diensten & Ondersteuning',
    icon: '⚙️',
    kleur: '#374151',
    licht: '#F9FAFB',
    omschrijving: 'Ondersteunende diensten ontdekken hoe AI processen verbetert en wat dat vraagt van medewerkers.',
    vragen: ['Hoe automatiseer ik processen met AI?', 'Welke tools passen bij onze dienst?', 'Hoe vergroten we digitale weerbaarheid?'],
  },
]

const INIT_BRONNEN = [
  { id: 1, doelgroep: 'studenten', type: 'artikel', titel: 'AI verantwoord gebruiken als student', url: 'https://surf.nl', omschrijving: 'Praktische gids van SURF voor studenten die AI willen inzetten in hun studie.', stemmen: 3, toegevoegdDoor: 'Kernteam AI-Netwerk', datum: '10 juni 2026' },
  { id: 2, doelgroep: 'docenten', type: 'video', titel: 'AI in de klas: didactische kansen', url: 'https://surf.nl', omschrijving: 'Webinar over hoe docenten AI kunnen integreren in hun lessen zonder de leerdoelen te ondermijnen.', stemmen: 4, toegevoegdDoor: 'OO&I', datum: '8 juni 2026' },
  { id: 3, doelgroep: 'management', type: 'rapport', titel: 'AI Act voor onderwijsinstellingen', url: 'https://rathenau.nl', omschrijving: 'Rapport van het Rathenau Instituut over de implicaties van de AI Act voor het hoger onderwijs.', stemmen: 2, toegevoegdDoor: 'Kernteam AI-Netwerk', datum: '5 juni 2026' },
  { id: 4, doelgroep: 'medewerkers', type: 'cursus', titel: 'AI-basistraining voor medewerkers', url: '#', omschrijving: 'Interne introductiecursus AI voor alle NHL Stenden medewerkers. Wat is AI, hoe werkt het en hoe gebruik je het veilig?', stemmen: 1, toegevoegdDoor: 'HR & OO&I', datum: '1 juni 2026' },
  { id: 5, doelgroep: 'onderwijs', type: 'kader', titel: 'NHL Stenden AI-competentieframework', url: '#', omschrijving: 'Overzicht van de AI-competenties die we verwachten van onze studenten bij afstuderen, per opleidingsniveau.', stemmen: 2, toegevoegdDoor: 'OO&I', datum: '15 mei 2026' },
]

const TYPE_KLEUR = {
  artikel: 'bg-blue-50 text-blue-700',
  video: 'bg-red-50 text-red-700',
  rapport: 'bg-yellow-50 text-yellow-700',
  cursus: 'bg-green-50 text-green-700',
  kader: 'bg-purple-50 text-purple-700',
  initiatief: 'bg-pink-50 text-pink-700',
  overig: 'bg-gray-50 text-gray-600',
}

const TYPE_ICON = { artikel: '📄', video: '🎬', rapport: '📊', cursus: '🎓', kader: '📋', initiatief: '🚀', overig: '🔗' }

export default function Geletterdheid() {
  const [actieveDoelgroep, setActieveDoelgroep] = useState(null)
  const [bronnen, setBronnen] = useState(INIT_BRONNEN)
  const [eigenStemmen, setEigenStemmen] = useState({})
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState({ titel: '', doelgroep: '', type: 'artikel', url: '', omschrijving: '', naam: '' })
  const [toegevoegd, setToegevoegd] = useState(false)

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const stem = (id) => {
    const huidig = eigenStemmen[id] || 0
    const nieuw = huidig >= 4 ? 0 : huidig + 1
    setEigenStemmen(prev => ({ ...prev, [id]: nieuw }))
    setBronnen(prev => prev.map(b => {
      if (b.id !== id) return b
      const delta = nieuw - huidig
      return { ...b, stemmen: Math.max(0, b.stemmen + delta) }
    }))
  }

  const voegToe = () => {
    if (!form.titel || !form.doelgroep) return
    setBronnen(prev => [{
      id: Date.now(),
      ...form,
      stemmen: 0,
      toegevoegdDoor: form.naam || 'Anoniem',
      datum: new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }),
    }, ...prev])
    setToegevoegd(true)
  }

  const gefilterd = actieveDoelgroep
    ? bronnen.filter(b => b.doelgroep === actieveDoelgroep)
    : bronnen

  const top5 = [...bronnen].sort((a, b) => b.stemmen - a.stemmen).slice(0, 5)

  const actieveGroep = DOELGROEPEN.find(d => d.id === actieveDoelgroep)

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <GradientHeader
        label="AI & Geletterdheid"
        title="Begrijpen, kunnen en durven"
        subtitle="AI-geletterdheid is het vermogen om AI te begrijpen, kritisch te beoordelen en er eigenaarschap bij te ervaren. Niet iedereen hoeft een developer te zijn — maar iedereen moet kunnen meepraten."
      >
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            onClick={() => { setAddOpen(true); setToegevoegd(false); setForm({ titel:'', doelgroep: actieveDoelgroep||'', type:'artikel', url:'', omschrijving:'', naam:'' }) }}
            className="inline-flex items-center gap-2 bg-nhl-roze hover:bg-nhl-roze-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            + Bron toevoegen
          </button>
        </div>
      </GradientHeader>

      {/* Kernambitie banner */}
      <div className="bg-purple-700 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="text-purple-200 text-xs font-semibold uppercase tracking-wider flex-shrink-0">Kernambitie</span>
          <span className="text-white/80 text-xs hidden sm:inline">·</span>
          <p className="text-purple-100 text-sm italic">
            "NHL Stenden zorgt ervoor dat AI-geletterdheid een basisvaardigheid is voor alle studenten en medewerkers, zodat niemand afhankelijk is van AI zonder het te begrijpen."
          </p>
        </div>
      </div>

      {/* Wat is AI-geletterdheid */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label mb-3">Waarom dit belangrijk is</div>
              <h2 className="text-2xl font-bold text-nhl-blauw mb-5">Meer dan een tool leren gebruiken</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                AI-geletterdheid gaat verder dan weten hoe ChatGPT werkt. Het gaat om begrijpen <em>wat</em> AI doet, <em>waarom</em> het bepaalde uitkomsten geeft, en <em>wanneer</em> je het wel of niet moet vertrouwen.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Voor NHL Stenden betekent dit: studenten die AI kritisch inzetten in hun studie en beroep, docenten die AI didactisch verantwoord integreren, en medewerkers die digitaal weerbaar en vaardig zijn.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: '🧠', titel: 'Begrijpen', tekst: 'Wat is AI? Hoe werkt het? Wat zijn de grenzen?' },
                  { icon: '🛠️', titel: 'Kunnen', tekst: 'AI verantwoord inzetten in studie en werk.' },
                  { icon: '💬', titel: 'Durven', tekst: 'Meepraten over AI en eigenaarschap ervaren.' },
                ].map(p => (
                  <div key={p.titel} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl mb-2">{p.icon}</div>
                    <div className="font-bold text-nhl-blauw text-sm mb-1">{p.titel}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{p.tekst}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full border-4 border-nhl-blauw/20 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border-4 border-nhl-blauw/40 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-nhl-blauw flex items-center justify-center shadow-lg">
                      <div className="text-center">
                        <div className="text-3xl mb-0.5">🤝</div>
                        <div className="text-white text-xs font-bold">AI + Mens</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">Samenleving & ethiek</div>
                <div className="absolute top-10 -right-8 text-xs text-gray-400 whitespace-nowrap">Instelling</div>
                <div className="absolute bottom-10 -left-6 text-xs text-gray-400 whitespace-nowrap">Individu</div>
                {[45, 135, 225, 315].map(deg => (
                  <div key={deg} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-px bg-nhl-blauw/10" style={{ transform: `rotate(${deg}deg)` }} />
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-gray-400 mt-6 max-w-48">AI-geletterdheid verbindt het individu, de instelling en de samenleving.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Doelgroepen */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="section-label mb-2">Voor wie</div>
            <h2 className="text-2xl font-bold text-nhl-blauw mb-2">AI-geletterdheid voor iedereen, anders voor ieder</h2>
            <p className="text-gray-500 text-sm">Klik op een doelgroep om gefilterde bronnen en kernvragen te zien.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {DOELGROEPEN.map(d => {
              const actief = actieveDoelgroep === d.id
              const aantalBronnen = bronnen.filter(b => b.doelgroep === d.id).length
              return (
                <button key={d.id}
                  onClick={() => setActieveDoelgroep(actief ? null : d.id)}
                  className="rounded-2xl p-4 text-center border-2 transition-all"
                  style={actief
                    ? { borderColor: d.kleur, backgroundColor: d.kleur, color: 'white' }
                    : { borderColor: '#E5E7EB', backgroundColor: 'white' }
                  }
                >
                  <div className="text-2xl mb-2">{d.icon}</div>
                  <div className="font-bold text-xs mb-1" style={actief ? { color: 'white' } : { color: d.kleur }}>{d.label}</div>
                  <div className="text-xs opacity-70">{aantalBronnen} bron{aantalBronnen !== 1 ? 'nen' : ''}</div>
                </button>
              )
            })}
          </div>

          {actieveGroep && (
            <div className="rounded-2xl p-6 border-2 mb-8 animate-fade-in"
              style={{ borderColor: actieveGroep.kleur, backgroundColor: actieveGroep.licht }}>
              <div className="flex items-start gap-4">
                <div className="text-3xl">{actieveGroep.icon}</div>
                <div className="flex-1">
                  <div className="font-bold text-lg mb-1" style={{ color: actieveGroep.kleur }}>{actieveGroep.label}</div>
                  <p className="text-gray-600 text-sm mb-3">{actieveGroep.omschrijving}</p>
                  <div className="font-semibold text-xs text-gray-500 uppercase tracking-wider mb-2">Kernvragen</div>
                  <div className="space-y-1">
                    {actieveGroep.vragen.map((v, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-xs mt-1" style={{ color: actieveGroep.kleur }}>→</span>
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-nhl-blauw">
              {actieveDoelgroep ? `Bronnen voor ${actieveGroep?.label}` : 'Alle bronnen'} ({gefilterd.length})
            </h3>
            <button onClick={() => { setAddOpen(true); setToegevoegd(false); setForm({ titel:'', doelgroep: actieveDoelgroep||'', type:'artikel', url:'', omschrijving:'', naam:'' }) }}
              className="btn-roze text-sm">+ Bron toevoegen</button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {gefilterd.map(b => {
              const doelgroep = DOELGROEPEN.find(d => d.id === b.doelgroep)
              const eigenStem = eigenStemmen[b.id] || 0
              return (
                <div key={b.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col card-hover">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex gap-2 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_KLEUR[b.type] || TYPE_KLEUR.overig}`}>
                        {TYPE_ICON[b.type]} {b.type}
                      </span>
                      {doelgroep && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                          style={{ backgroundColor: doelgroep.kleur }}>
                          {doelgroep.icon} {doelgroep.label}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="font-bold text-nhl-blauw mb-1 leading-snug text-sm">{b.titel}</div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-1">{b.omschrijving}</p>
                  {b.url && b.url !== '#' && (
                    <a href={b.url} target="_blank" rel="noopener noreferrer"
                      className="text-nhl-roze text-xs font-medium hover:underline mb-3 inline-flex items-center gap-1">
                      🔗 Bekijk bron
                    </a>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-400">{b.toegevoegdDoor} · {b.datum}</div>
                    <button onClick={() => stem(b.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${eigenStem > 0 ? 'bg-nhl-roze/10 text-nhl-roze' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                      title="Klik tot 4x om meer waardering te geven">
                      {'👍'.repeat(Math.max(1, eigenStem))} {b.stemmen}
                      {eigenStem > 0 && eigenStem < 4 && <span className="text-gray-400">+{eigenStem}</span>}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {gefilterd.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-3">📚</div>
              <div className="font-medium">Nog geen bronnen voor deze doelgroep.</div>
              <button onClick={() => setAddOpen(true)} className="btn-roze mt-4 text-sm">+ Als eerste toevoegen</button>
            </div>
          )}

          <div className="mt-8">
            <GeletterdheidsNetwerk
              bronnen={bronnen}
              actieveDoelgroep={actieveDoelgroep}
              onDoelgroepKlik={(id) => setActieveDoelgroep(id)}
            />
          </div>
        </div>
      </section>

      {/* Top 5 + gerelateerd */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="section-label mb-2">Meest gewaardeerd</div>
              <h2 className="text-xl font-bold text-nhl-blauw mb-5">Top 5 bronnen</h2>
              <div className="space-y-3">
                {top5.map((b, i) => {
                  const dg = DOELGROEPEN.find(d => d.id === b.doelgroep)
                  return (
                    <div key={b.id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${i === 0 ? 'bg-yellow-400' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-orange-400' : 'bg-gray-200 text-gray-600'}`}>
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-nhl-blauw text-sm leading-snug">{b.titel}</div>
                        <div className="text-xs text-gray-400">{dg?.icon} {dg?.label} · {TYPE_ICON[b.type]} {b.type}</div>
                      </div>
                      <div className="text-sm font-bold text-nhl-roze flex-shrink-0">👍 {b.stemmen}</div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <div className="section-label mb-2">Gerelateerd</div>
              <h2 className="text-xl font-bold text-nhl-blauw mb-5">Vind meer in het AI-Netwerk</h2>
              <div className="space-y-3">
                {[
                  { to: '/video', icon: '🎬', titel: "Video's over AI", tekst: 'Curated video\'s over AI in het onderwijs' },
                  { to: '/initiatieven', icon: '🚀', titel: 'Initiatieven', tekst: 'Wat loopt er al op het gebied van AI & Geletterdheid?' },
                  { to: '/pilots', icon: '🧪', titel: 'Pilots', tekst: 'AI & Geletterdheid in de praktijk testen' },
                  { to: '/inspiratie', icon: '💡', titel: 'Inzichten', tekst: 'Artikelen en ontwikkelingen uit het netwerk' },
                  { to: '/linkjes', icon: '🔗', titel: 'Bronnen', tekst: 'Externe links en referenties' },
                ].map(item => (
                  <Link key={item.to} to={item.to}
                    className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-nhl-blauw/20 rounded-xl p-3.5 transition-colors group">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-nhl-blauw text-sm group-hover:text-nhl-roze transition-colors">{item.titel}</div>
                      <div className="text-xs text-gray-400">{item.tekst}</div>
                    </div>
                    <span className="text-gray-300 group-hover:text-nhl-blauw transition-colors text-sm">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="font-bold text-nhl-blauw text-lg">Bron toevoegen</h2>
              <button onClick={() => setAddOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
            </div>
            {toegevoegd ? (
              <div className="p-8 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-bold text-nhl-blauw text-xl mb-2">Toegevoegd!</h3>
                <p className="text-gray-500 text-sm mb-6">Je bron verschijnt direct in het overzicht én in het netwerk.</p>
                <button onClick={() => setAddOpen(false)} className="btn-primary">Sluiten</button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Titel <span className="text-red-400">*</span></label>
                  <input type="text" value={form.titel} onChange={e => upd('titel', e.target.value)}
                    placeholder="Naam van de bron, cursus, video of initiatief"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Voor wie? <span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    {DOELGROEPEN.map(d => (
                      <button key={d.id} type="button"
                        onClick={() => upd('doelgroep', d.id)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border-2 transition-colors text-left"
                        style={form.doelgroep === d.id
                          ? { borderColor: d.kleur, backgroundColor: d.kleur, color: 'white' }
                          : { borderColor: '#E5E7EB', color: '#374151' }
                        }>
                        {d.icon} {d.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                  <select value={form.type} onChange={e => upd('type', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw">
                    {Object.keys(TYPE_KLEUR).map(t => <option key={t} value={t}>{TYPE_ICON[t]} {t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Omschrijving</label>
                  <textarea value={form.omschrijving} onChange={e => upd('omschrijving', e.target.value)} rows={3}
                    placeholder="Wat maakt deze bron waardevol?"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">URL (optioneel)</label>
                  <input type="url" value={form.url} onChange={e => upd('url', e.target.value)}
                    placeholder="https://... (extern) of leeg laten voor intern"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Jouw naam (optioneel)</label>
                  <input type="text" value={form.naam} onChange={e => upd('naam', e.target.value)}
                    placeholder="Bijv. Jan de Vries"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nhl-blauw" />
                </div>
                <button onClick={voegToe}
                  disabled={!form.titel || !form.doelgroep}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${form.titel && form.doelgroep ? 'bg-nhl-roze text-white hover:bg-nhl-roze-dark' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>
                  Bron toevoegen ✓
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
