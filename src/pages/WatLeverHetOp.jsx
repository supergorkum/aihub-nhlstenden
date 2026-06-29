import GradientHeader from '../components/GradientHeader'

const DOELGROEPEN = [
  { icon: '🎓', titel: 'Als student merk je', kleur: '#1E3A8A', bg: '#EFF6FF', border: '#DBEAFE',
    punten: ['Je opleiding heeft een helder standpunt over AI: wanneer het mag, wanneer niet, en hoe je het goed gebruikt.','Niet elk platform op eigen houtje, maar een bewuste keuze die bij jouw vakgebied past.','AI helpt je leren, niet denken voor je. Kritisch denken en samenwerken blijven leidend.','Je wordt actief geïnformeerd over AI-geletterdheid als beroepscompetentie.','Je weet wanneer AI een rol speelt in processen die jou raken. Geen verborgen algoritmen.'] },
  { icon: '💻', titel: 'Als medewerker merk je', kleur: '#0F766E', bg: '#F0FDFA', border: '#99F6E4',
    punten: ['Herhaalbare taken worden lichter, zodat je meer tijd overhoudt voor wat je vak onderscheidend maakt.','Niet zonder jou, maar met jou als regisseur van AI in je werk.','Je hebt toegang tot gerichte ondersteuning en peer learning via het AI-Netwerk.','Er is een duidelijk kader: je weet wat je wel en niet mag doen met AI.','AI-geletterdheid is verankerd in onboarding en professionalisering.'] },
  { icon: '🌐', titel: 'Als regio merk je', kleur: '#B45309', bg: '#FFFBEB', border: '#FDE68A',
    punten: ['NHL Stenden levert studenten af die begrijpen wanneer en waarom je AI inzet.','Professionals die bijdragen aan verantwoorde innovatie in de Friese praktijk.','Stages en afstudeeropdrachten die aansluiten bij echte beroepsvraagstukken.','NHL Stenden als zichtbare kennispartner voor AI-vraagstukken in Noord-Nederland.','Samenwerking met Frisius MC, Innovatie Cluster Drachten en het MKB.'] },
]

const KOERSLIJNEN = [
  { nr: '01', naam: 'AI & Leren', kleur: '#1E3A8A', ambitie: 'AI versterkt leren: meer succes, minder uitval.', effect: 'Elke student profiteert van AI als ondersteuning bij het leerproces, ongeacht achtergrond of leerstijl.' },
  { nr: '02', naam: 'AI & Werken', kleur: '#0F766E', ambitie: 'AI neemt werk uit handen, zodat mensen het verschil maken.', effect: 'Medewerkers richten zich op wat echt telt. Minder administratie, meer menselijk contact en vakinhoud.' },
  { nr: '03', naam: 'AI & Verantwoordelijkheid', kleur: '#E91E8C', ambitie: 'AI met transparantie, controle en vertrouwen.', effect: 'Studenten, medewerkers en partners vertrouwen erop dat AI bij NHL Stenden verantwoord wordt ingezet.' },
  { nr: '04', naam: 'AI & Geletterdheid', kleur: '#7C3AED', ambitie: 'Iedereen AI-vaardig, niemand afhankelijk.', effect: 'Studenten en medewerkers begrijpen, beoordelen en zetten AI bewust in. Zonder blinde afhankelijkheid.' },
  { nr: '05', naam: 'AI & Werkveld', kleur: '#B45309', ambitie: 'Samen met het werkveld versnellen we innovatie.', effect: 'Studenten werken aan echte AI-vraagstukken. Het werkveld profiteert van actuele kennis en talent.' },
  { nr: '06', naam: 'AI & Onderzoek', kleur: '#0E7490', ambitie: 'AI-onderzoek met impact: praktisch, relevant en toekomstgericht.', effect: 'Inzichten stromen via het AI-Netwerk terug naar onderwijs en beleid. Onderzoek versterkt de koers.' },
]

export default function WatLeverHetOp() {
  return (
    <div className="min-h-screen pt-16 bg-white">
      <GradientHeader label="AI bij NHL Stenden" title="Wat levert het op?"
        subtitle="De AI-Koers is een uitgesproken richting: een keuze over wie we zijn, waar we heen willen, en hoe we dat samen realiseren." />
      <div className="max-w-5xl mx-auto px-4 mt-10">
        <div className="rounded-2xl p-8 text-white text-center mb-12" style={{ background: 'linear-gradient(135deg, #162D6E 0%, #1E3A8A 60%, #2563EB 100%)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#bfdbfe' }}>Onze belofte aan studenten, medewerkers en de regio</p>
          <h2 className="text-2xl font-extrabold leading-tight mb-4">"AI bij NHL Stenden: slimmer leren, sterker werken en verantwoord innoveren."</h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-sm leading-relaxed">NHL Stenden omarmt AI niet als doel op zich, maar als middel om mensen verder te helpen. Die belofte realiseren we niet vanachter een beleidsdocument, maar in de dagelijkse praktijk van onderwijs, onderzoek en samenwerking.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {DOELGROEPEN.map(d => (
            <div key={d.titel} className="rounded-2xl overflow-hidden border shadow-sm" style={{ borderColor: d.border }}>
              <div className="px-6 py-5" style={{ background: d.bg }}>
                <div className="flex items-center gap-3"><span className="text-3xl">{d.icon}</span><h3 className="font-bold text-base" style={{ color: d.kleur }}>{d.titel}</h3></div>
              </div>
              <div className="px-6 py-5 bg-white">
                <ul className="space-y-3">
                  {d.punten.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: d.kleur }} />{p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-14">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ background: '#EFF6FF', color: '#1E3A8A' }}>Zes koerslijnen</span>
            <h2 className="text-2xl font-bold" style={{ color: '#162D6E' }}>Wat elke koerslijn concreet oplevert</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {KOERSLIJNEN.map(k => (
              <div key={k.nr} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm flex">
                <div className="w-2 flex-shrink-0" style={{ background: k.kleur }} />
                <div className="p-5 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-black" style={{ color: k.kleur }}>{k.nr}</span>
                    <span className="font-bold text-sm" style={{ color: k.kleur }}>{k.naam}</span>
                  </div>
                  <p className="text-xs font-semibold italic mb-2" style={{ color: '#374151' }}>"{k.ambitie}"</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{k.effect}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-8 mb-12 text-center" style={{ background: '#F8F9FB', border: '1px solid #E2E8F0' }}>
          <span className="text-3xl mb-4 block">🎯</span>
          <h3 className="font-bold text-lg mb-3" style={{ color: '#162D6E' }}>De maatstaf</h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">De zes koerslijnen vertalen zich uiteindelijk naar wat een student elke dag merkt. Dat is de maatstaf. Niet het aantal beleidsnotities, maar de vraag: heeft AI bijgedragen aan betere studieresultaten, effectiever werk en een sterkere regio?</p>
          <div className="mt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[{ getal: '80%', label: 'medewerkers AI-vaardig in 2030' },{ getal: '6', label: 'koerslijnen, één richting' },{ getal: '2030', label: 'einddoel voor alle indicatoren' }].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold" style={{ color: '#1E3A8A' }}>{s.getal}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
