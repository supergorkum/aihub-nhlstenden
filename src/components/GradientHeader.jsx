export default function GradientHeader({ label, title, subtitle, children }) {
  return (
    <div className="relative nhl-gradient-deep overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
      {/* Decoratieve cirkels */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 -right-16 w-96 h-96 border border-white/10 rounded-full" />
        <div className="absolute top-8 -right-4 w-56 h-56 border border-white/10 rounded-full" />
        <div className="absolute -bottom-10 -left-16 w-80 h-80 border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-white/5 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {label && (
          <div className="inline-flex items-center gap-2 bg-white/10 text-blue-100 text-xs px-3 py-1.5 rounded-full mb-5 border border-white/20">
            {label}
          </div>
        )}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">{title}</h1>
        {subtitle && <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl">{subtitle}</p>}
        {children}
      </div>

      {/* Golf-overgang: hoog en drievoudig voor zachte overgang */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '80px' }}>
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}>
          <path d="M0 80L1440 80L1440 20C1380 50 1300 5 1200 18C1100 32 1000 60 880 52C760 44 660 10 540 20C420 30 320 58 200 50C100 43 50 20 0 30L0 80Z" fill="white" fillOpacity="0.3"/>
          <path d="M0 80L1440 80L1440 32C1360 58 1260 12 1140 28C1020 44 900 68 780 60C660 52 540 16 420 28C300 40 180 64 60 52L0 44L0 80Z" fill="white" fillOpacity="0.6"/>
          <path d="M0 80L1440 80L1440 45C1350 70 1230 28 1100 42C970 56 860 78 740 68C620 58 500 30 380 42C260 54 140 76 0 60L0 80Z" fill="white"/>
        </svg>
      </div>
    </div>
  )
}
