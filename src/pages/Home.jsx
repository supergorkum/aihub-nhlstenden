import { useNavigate } from 'react-router-dom';
import { THEMAS, SITE_SUBTITEL } from '../data/themas';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#1E3A8A] via-[#1a3580] to-[#0f2060] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-24">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/30">
            <span>🏠</span>
            <span>NHL Stenden AI-Netwerk</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight leading-tight max-w-3xl">
            AI bij NHL Stenden
          </h1>
          <p className="text-xl text-white/85 max-w-2xl mb-10 leading-relaxed">
            {SITE_SUBTITEL}
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => navigate('/themas')}
              className="bg-white text-[#1E3A8A] font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
            >
              Verken de thema's
            </button>
            <button
              onClick={() => navigate('/netwerk')}
              className="border border-white/50 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Bekijk het netwerk
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80 C360 20 1080 20 1440 80 L1440 80 L0 80Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Zes thema's */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-[#1E3A8A] uppercase tracking-wider mb-2">Thema's</p>
            <h2 className="text-3xl font-bold text-gray-900">Zes thema's, één koers</h2>
            <p className="text-gray-500 mt-2 max-w-xl">
              NHL Stenden organiseert AI-beleid en AI-praktijk langs zes thema's. Geen programmalijnen, maar thematafels waar we samen bouwen aan verantwoorde AI-inzet.
            </p>
          </div>
          <button
            onClick={() => navigate('/themas')}
            className="hidden md:block text-[#1E3A8A] font-medium hover:underline text-sm whitespace-nowrap"
          >
            Alle thema's →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {THEMAS.map((t) => (
            <button
              key={t.id}
              onClick={() => navigate('/themas')}
              className="text-left p-5 rounded-xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 group bg-white"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ backgroundColor: t.kleur + '18' }}
              >
                {t.emoji}
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:underline" style={{ color: t.kleur }}>
                {t.label}
              </h3>
              <p className="text-gray-500 text-xs leading-snug mb-3">{t.subtitel}</p>
              <p className="text-xs italic text-gray-400">"{t.kernambitie}"</p>
            </button>
          ))}
        </div>

        <div className="mt-4 text-center md:hidden">
          <button
            onClick={() => navigate('/themas')}
            className="text-[#1E3A8A] font-medium hover:underline text-sm"
          >
            Alle thema's bekijken →
          </button>
        </div>
      </div>

      {/* Netwerk CTA */}
      <div className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Doe mee aan het netwerk</h2>
            <p className="text-gray-600 leading-relaxed">
              Het AI-Netwerk verbindt docenten, onderzoekers, medewerkers, studenten en externe partners.
              Heb je een initiatief of een vraag? Je bent van harte welkom.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/initiatieven?modal=aanmelden')}
              className="bg-[#1E3A8A] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#1a3580] transition-colors text-center"
            >
              Initiatief aanmelden
            </button>
            <button
              onClick={() => navigate('/meld', { state: { resetKey: Date.now() } })}
              className="border-2 border-[#1E3A8A] text-[#1E3A8A] font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors text-center"
            >
              Vraag of idee stellen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
