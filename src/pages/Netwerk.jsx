import { useNavigate } from 'react-router-dom';
import NetwerkVisualisatie, { NODE_LINKS } from '../components/NetwerkVisualisatie';
import { THEMAS } from '../data/themas';

export default function Netwerk() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#1E3A8A] via-[#1a3580] to-[#0f2060] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 70% 40%, rgba(255,255,255,0.3) 0%, transparent 50%)',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-16">
          <div className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/30">
            Het netwerk
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">AI-Netwerk NHL Stenden</h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Zes thema's verbinden initiatieven, kennis en mensen die werken aan verantwoorde AI-inzet binnen en rondom de hogeschool.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60 C360 10 1080 10 1440 60 L1440 60 L0 60Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Visualisatie */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-gray-50 rounded-2xl p-4 mb-8">
          <NetwerkVisualisatie hoogte={500} />
          <p className="text-center text-xs text-gray-400 mt-2">
            Klik op een thema-bol om naar de thema's te gaan. Groene bollen zijn interne pagina's, witte bollen zijn externe links.
          </p>
        </div>

        {/* Legende thema's */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Zes thema's</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {THEMAS.map((t) => (
            <button
              key={t.id}
              onClick={() => navigate('/themas')}
              className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all text-left group"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 mt-0.5"
                style={{ backgroundColor: t.kleur + '20' }}
              >
                {t.emoji}
              </div>
              <div>
                <p className="font-semibold text-sm group-hover:underline" style={{ color: t.kleur }}>{t.label}</p>
                <p className="text-xs text-gray-400 italic mt-0.5">"{t.kernambitie}"</p>
              </div>
            </button>
          ))}
        </div>

        {/* Interne vs externe links uitleg */}
        <div className="flex gap-6 items-center justify-center py-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1E3A8A]" />
            <span className="text-xs text-gray-500">Interne pagina's</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white border-2 border-[#0E7490]" />
            <span className="text-xs text-gray-500">Externe links</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-gray-300" />
            <span className="text-xs text-gray-500">Verbinding</span>
          </div>
        </div>
      </div>
    </div>
  );
}
