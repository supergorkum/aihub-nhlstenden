import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Thema-definities gesynchroniseerd met data/themas.js
// KRITIEKE REGEL: NODE_LINKS moet gesynchroniseerd blijven met Netwerk.jsx
const THEMA_NODES = [
  { id: 'leren',            label: 'AI & Leren',            emoji: '🎓', kleur: '#1E3A8A', kernambitie: 'AI versterkt leren: meer succes, minder uitval.' },
  { id: 'werken',           label: 'AI & Werken',           emoji: '⚙️', kleur: '#0F766E', kernambitie: 'AI neemt werk uit handen, zodat mensen het verschil maken.' },
  { id: 'verantwoordelijk', label: 'AI & Verantwoordelijkheid', emoji: '⚖️', kleur: '#E91E8C', kernambitie: 'AI met transparantie, controle en vertrouwen.' },
  { id: 'geletterdheid',    label: 'AI & Geletterdheid',    emoji: '📖', kleur: '#7C3AED', kernambitie: 'Iedereen AI-vaardig, niemand afhankelijk.' },
  { id: 'werkveld',         label: 'AI & Werkveld',         emoji: '🏭', kleur: '#B45309', kernambitie: 'Samen met het werkveld versnellen we innovatie.' },
  { id: 'onderzoek',        label: 'AI & Onderzoek',        emoji: '🔬', kleur: '#0E7490', kernambitie: 'AI-onderzoek met impact: praktisch, relevant en toekomstgericht.' },
];

// Externe en interne nodes rondom de thema's
// intern: true = interne pagina (to), intern: false = externe URL (url)
export const NODE_LINKS = [
  // AI & Leren
  { id: 'i1',  label: 'Toetsing & AI',         parent: 'leren',            intern: true,  to: '/initiatieven?thema=leren' },
  { id: 'i2',  label: 'Studiesucces',           parent: 'leren',            intern: true,  to: '/initiatieven?thema=leren' },
  { id: 'i3',  label: 'Npuls',                  parent: 'leren',            intern: false, url: 'https://www.npuls.nl' },
  // AI & Werken
  { id: 'i4',  label: 'Procesautomatisering',   parent: 'werken',           intern: true,  to: '/initiatieven?thema=werken' },
  { id: 'i5',  label: 'Copilot @ NHL',          parent: 'werken',           intern: true,  to: '/initiatieven?thema=werken' },
  // AI & Verantwoordelijkheid
  { id: 'i6',  label: 'AI-beleid',              parent: 'verantwoordelijk', intern: true,  to: '/beleid' },
  { id: 'i7',  label: 'EU AI Act',              parent: 'verantwoordelijk', intern: false, url: 'https://www.autoriteitpersoonsgegevens.nl/nl/onderwerpen/artificial-intelligence' },
  { id: 'i8',  label: 'DPIA & Privacy',         parent: 'verantwoordelijk', intern: true,  to: '/beleid' },
  // AI & Geletterdheid
  { id: 'i9',  label: 'ARDA modules',           parent: 'geletterdheid',    intern: true,  to: '/initiatieven?thema=geletterdheid' },
  { id: 'i10', label: 'CTL trainingen',         parent: 'geletterdheid',    intern: true,  to: '/initiatieven?thema=geletterdheid' },
  // AI & Werkveld
  { id: 'i11', label: 'Frisius MC',             parent: 'werkveld',         intern: false, url: 'https://www.frisiusmc.nl' },
  { id: 'i12', label: 'Computer Vision',        parent: 'werkveld',         intern: false, url: 'https://www.nhlstenden.com/onderzoek/lectoraten/computer-vision-artificial-intelligence' },
  // AI & Onderzoek
  { id: 'i13', label: 'Lectoraten AI',          parent: 'onderzoek',        intern: true,  to: '/initiatieven?thema=onderzoek' },
  { id: 'i14', label: 'Programma Bach',         parent: 'onderzoek',        intern: false, url: 'https://www.uvan.nl' },
];

export default function NetwerkVisualisatie({ hoogte = 520 }) {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const navigate = useNavigate();

  const cx = 400;
  const cy = hoogte / 2;
  const themaR = 70;
  const externR = 100;

  const themaPosities = THEMA_NODES.map((t, i) => {
    const hoek = (i / THEMA_NODES.length) * 2 * Math.PI - Math.PI / 2;
    return { ...t, x: cx + themaR * Math.cos(hoek) * 2.2, y: cy + themaR * Math.sin(hoek) * 1.6 };
  });

  function getExternPositie(node) {
    const parent = themaPosities.find((t) => t.id === node.parent);
    if (!parent) return { x: cx, y: cy };
    const dx = parent.x - cx;
    const dy = parent.y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const factor = (dist + externR) / dist;
    return { x: cx + dx * factor, y: cy + dy * factor };
  }

  function handleKlik(node) {
    if (node.intern === false && node.url) {
      window.open(node.url, '_blank', 'noopener');
    } else if (node.intern && node.to) {
      navigate(node.to);
    }
  }

  return (
    <div className="relative w-full" style={{ height: hoogte }}>
      <svg
        ref={svgRef}
        width="100%"
        height={hoogte}
        viewBox={`0 0 800 ${hoogte}`}
        className="overflow-visible"
      >
        {/* Verbindingslijnen extern naar thema */}
        {NODE_LINKS.map((node) => {
          const pos = getExternPositie(node);
          const parent = themaPosities.find((t) => t.id === node.parent);
          if (!parent) return null;
          return (
            <line
              key={node.id + '_lijn'}
              x1={parent.x} y1={parent.y}
              x2={pos.x} y2={pos.y}
              stroke="#e5e7eb"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Verbindingslijnen thema naar centrum */}
        {themaPosities.map((t) => (
          <line
            key={t.id + '_centraal'}
            x1={cx} y1={cy}
            x2={t.x} y2={t.y}
            stroke="#d1d5db"
            strokeWidth="2"
          />
        ))}

        {/* Externe/interne nodes */}
        {NODE_LINKS.map((node) => {
          const pos = getExternPositie(node);
          const parent = themaPosities.find((t) => t.id === node.parent);
          const kleur = parent ? parent.kleur : '#6b7280';
          return (
            <g
              key={node.id}
              style={{ cursor: 'pointer' }}
              onClick={() => handleKlik(node)}
              onMouseEnter={() => setTooltip({ x: pos.x, y: pos.y - 18, tekst: node.label, extern: !node.intern })}
              onMouseLeave={() => setTooltip(null)}
            >
              <circle
                cx={pos.x} cy={pos.y} r={node.intern ? 7 : 5}
                fill={node.intern ? kleur : 'white'}
                stroke={kleur}
                strokeWidth="2"
                style={{ transition: 'r 0.15s ease', transformOrigin: `${pos.x}px ${pos.y}px` }}
                className="hover:scale-[1.6]"
              />
            </g>
          );
        })}

        {/* Thema-bollen */}
        {themaPosities.map((t) => (
          <g
            key={t.id}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/themas')}
            onMouseEnter={() => setTooltip({ x: t.x, y: t.y - 32, tekst: t.label, sub: t.kernambitie })}
            onMouseLeave={() => setTooltip(null)}
          >
            <circle cx={t.x} cy={t.y} r={32} fill={t.kleur} opacity={0.12} />
            <circle
              cx={t.x} cy={t.y} r={26}
              fill={t.kleur}
              className="hover:opacity-90 transition-opacity"
            />
            <text x={t.x} y={t.y - 5} textAnchor="middle" fontSize="14" fill="white" style={{ pointerEvents: 'none' }}>
              {t.emoji}
            </text>
            <text x={t.x} y={t.y + 9} textAnchor="middle" fontSize="6.5" fill="white" fontWeight="600" style={{ pointerEvents: 'none' }}>
              {t.label.replace('AI & ', '')}
            </text>
          </g>
        ))}

        {/* Centrale bol */}
        <circle cx={cx} cy={cy} r={38} fill="#1E3A8A" opacity={0.08} />
        <circle cx={cx} cy={cy} r={30} fill="#1E3A8A" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="14" fill="white" style={{ pointerEvents: 'none' }}>🤝</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="6" fill="white" fontWeight="700" style={{ pointerEvents: 'none' }}>
          AI-Netwerk
        </text>

        {/* Tooltip */}
        {tooltip && (
          <g style={{ pointerEvents: 'none' }}>
            <rect
              x={tooltip.x - 80} y={tooltip.y - (tooltip.sub ? 34 : 16)}
              width={160} height={tooltip.sub ? 46 : 22}
              rx={6} fill="#1e293b" opacity={0.92}
            />
            <text x={tooltip.x} y={tooltip.y - (tooltip.sub ? 22 : 6)} textAnchor="middle" fontSize="8.5" fill="white" fontWeight="600">
              {tooltip.tekst}
            </text>
            {tooltip.extern && (
              <text x={tooltip.x} y={tooltip.y - (tooltip.sub ? 22 : 6) + 10} textAnchor="middle" fontSize="7" fill="#94a3b8">
                externe link ↗
              </text>
            )}
            {tooltip.sub && (
              <text x={tooltip.x} y={tooltip.y - 8} textAnchor="middle" fontSize="7" fill="#94a3b8">
                {tooltip.sub.length > 38 ? tooltip.sub.substring(0, 36) + '…' : tooltip.sub}
              </text>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
