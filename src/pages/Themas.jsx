import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { THEMAS, SITE_SUBTITEL } from '../data/themas';

export default function Themas() {
  const [actief, setActief] = useState(0);
  const navigate = useNavigate();
  const thema = THEMAS[actief];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#1E3A8A] via-[#1a3580] to-[#0f2060] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)',
            }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-20">
          <div className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/30">
            Zes thema's
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">AI Thema's</h1>
          <p className="text-xl text-white/80 max-w-2xl">{SITE_SUBTITEL}</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80 C360 20 1080 20 1440 80 L1440 80 L0 80Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Twee kolommen */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Linkerkolom: themalijst */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {THEMAS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActief(i)}
                className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  actief === i
                    ? 'border-transparent text-white shadow-lg scale-[1.01]'
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                }`}
                style={actief === i ? { backgroundColor: t.kleur } : {}}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xl">{t.emoji}</span>
                  <span className={`font-semibold text-sm ${actief === i ? 'text-white' : 'text-gray-900'}`}>
                    {t.label}
                  </span>
                </div>
                <p className={`text-xs leading-snug ml-8 ${actief === i ? 'text-white/80' : 'text-gray-500'}`}>
                  {t.subtitel}
                </p>
                {actief === i ? (
                  <p className="text-xs ml-8 mt-2 text-white/70 font-medium">Geselecteerd ✓</p>
                ) : (
                  <button
                    onClick={(e) => { e.stopPropagation(); setActief(i); }}
                    className="text-xs ml-8 mt-2 font-medium hover:underline"
                    style={{ color: t.kleur }}
                  >
                    Bekijk thema →
                  </button>
                )}
              </button>
            ))}
          </div>

          {/* Rechterkolom: detailpanel */}
          <div className="lg:col-span-3">
            <div className="sticky top-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm"
                  style={{ backgroundColor: thema.kleur + '20' }}
                >
                  {thema.emoji}
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: thema.kleur }}>
                    {thema.label}
                  </h2>
                  <div className="h-0.5 w-12 rounded-full mt-1" style={{ backgroundColor: thema.kleur }} />
                </div>
              </div>

              {/* Kernambitie */}
              <div className="bg-gray-50 border-l-4 rounded-r-xl p-4 mb-5" style={{ borderColor: thema.kleur }}>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Kernambitie</p>
                <p className="text-gray-700 italic text-sm leading-relaxed">"{thema.kernambitie}"</p>
              </div>

              {/* Toelichting */}
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">{thema.toelichting}</p>

              {/* Wat valt hieronder */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Wat valt hieronder?</p>
                <p className="text-gray-600 text-sm leading-relaxed">{thema.watValtHieronder}</p>
              </div>

              {/* Bronnen: het AI-Netwerk verbindt en geeft overzicht, het neemt nooit
                  de inhoudelijke rol over van de vakeigenaar. Daarom alleen een korte
                  doorverwijzing naar de originele bron, geen samenvatting. */}
              {thema.bronnen?.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                  <p className="text-xs font-bold text-nhl-blauw uppercase tracking-widest mb-2">Bron bij dit thema</p>
                  <p className="text-xs text-gray-500 mb-3">Het AI-Netwerk verbindt en geeft overzicht. Voor de volledige, actuele richtlijnen ga je naar de bron.</p>
                  <div className="space-y-1.5">
                    {thema.bronnen.map(b => (
                      <a key={b.url} href={b.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-medium text-nhl-blauw hover:text-nhl-roze transition-colors">
                        🔗 {b.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Acties */}
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/initiatieven?spoor=' + thema.spoorId)}
                  className="flex-1 py-2.5 px-4 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: thema.kleur }}
                >
                  Bekijk initiatieven →
                </button>
                <button
                  onClick={() => navigate('/meld', { state: { resetKey: Date.now(), thema: thema.id } })}
                  className="flex-1 py-2.5 px-4 rounded-lg border-2 text-sm font-medium transition-colors hover:bg-gray-50"
                  style={{ borderColor: thema.kleur, color: thema.kleur }}
                >
                  Vraag of idee indienen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
