import { useNavigate } from 'react-router-dom';
import { THEMAS, SITE_SUBTITEL } from '../data/themas';

export default function Over() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#1E3A8A] via-[#1a3580] to-[#0f2060] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-20">
          <div className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/30">
            Over het AI-Netwerk
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Wat is het AI-Netwerk?</h1>
          <p className="text-xl text-white/80 max-w-2xl">{SITE_SUBTITEL}</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80 C360 20 1080 20 1440 80 L1440 80 L0 80Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Inhoud */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Wat is het */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Wat is het AI-Netwerk?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Het AI-Netwerk is de centrale plek waar NHL Stenden alles rond AI samenhangt: initiatieven, beleid, kennis en samenwerking.
            Het netwerk verbindt docenten, onderzoekers, medewerkers, studenten en externe partners die werken aan de verantwoorde
            inzet van AI binnen en rondom de hogeschool.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Het AI-Netwerk is geen losstaand innovatieproject, maar een organisatievraagstuk. Cultuur, vaardigheden, governance en
            technologie zijn met elkaar verbonden. Daarom organiseren we AI-beleid en AI-praktijk langs zes thema's: niet als
            programmalijnen die worden afgevinkt, maar als thematafels waarlangs NHL Stenden AI bespreekt, ontwikkelt en verantwoordt.
          </p>
        </section>

        {/* Zes thema's */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Zes thema's</h2>
          <p className="text-gray-500 mb-8">
            Elk thema heeft een eigen kernambitie en verbindt initiatieven, kennis en mensen die op dat terrein actief zijn.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {THEMAS.map((t) => (
              <button
                key={t.id}
                onClick={() => navigate('/themas')}
                className="text-left p-5 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                    style={{ backgroundColor: t.kleur + '18' }}
                  >
                    {t.emoji}
                  </div>
                  <span className="font-semibold text-gray-900 group-hover:underline">{t.label}</span>
                </div>
                <p className="text-xs text-gray-500 leading-snug ml-12 italic">"{t.kernambitie}"</p>
              </button>
            ))}
          </div>
        </section>

        {/* Aanpak */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Onze aanpak</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                titel: 'Mensen centraal',
                tekst: 'Digitale verandering begint bij mensen. Bij hoe zij werken, leren en samenwerken, en bij de mate waarin zij zich digitaal zeker en vaardig voelen.',
              },
              {
                titel: 'Verantwoord en bewust',
                tekst: 'NHL Stenden kiest bewust voor AI die uitlegbaar is, mensenrechten respecteert en voldoet aan de EU AI Act. Vertrouwen is geen vanzelfsprekendheid.',
              },
              {
                titel: 'Samen en regionaal',
                tekst: 'Als hogeschool in Noord-Nederland staan we midden in de regio. We verbinden onderwijs, onderzoek en werkveld om AI-innovatie samen te versnellen.',
              },
            ].map((item) => (
              <div key={item.titel} className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{item.titel}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.tekst}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1E3A8A] rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Doe mee</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Heb je een initiatief, een vraag of een idee rond AI bij NHL Stenden? Meld het via het netwerk en draag bij aan de gezamenlijke koers.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => navigate('/initiatieven?modal=aanmelden')}
              className="bg-white text-[#1E3A8A] font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Initiatief aanmelden
            </button>
            <button
              onClick={() => navigate('/meld', { state: { resetKey: Date.now() } })}
              className="border border-white/50 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Vraag of idee stellen
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
