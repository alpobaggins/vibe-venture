// Абстрактная схема поиска команд: поле точек — множество проектов,
// ступенчатая линия — путь от идеи к пилоту, оранжевый квадрат в перекрестии — найденная команда.
const cols = 16;
const rows = 6;
const step = 40;
const offset = 20;

const highlighted = [
  [100, 60],
  [260, 20],
  [420, 220],
  [620, 180],
];

const milestones = [
  [180, 180],
  [340, 100],
  [500, 60],
];

export function HeroGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 260"
      preserveAspectRatio="xMaxYMid meet"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g className="fill-foreground/20">
        {Array.from({ length: cols * rows }, (_, i) => (
          <circle key={i} cx={offset + (i % cols) * step} cy={offset + Math.floor(i / cols) * step} r="3" />
        ))}
      </g>

      <circle cx="340" cy="100" r="34" className="fill-yellow" />

      <g className="fill-foreground">
        {highlighted.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" />
        ))}
      </g>

      <g className="stroke-foreground" strokeWidth="1">
        <line x1="400" y1="60" x2="640" y2="60" />
        <line x1="580" y1="0" x2="580" y2="260" />
      </g>

      <path
        d="M20 220 H180 V180 H340 V100 H500 V60 H580"
        pathLength={1}
        fill="none"
        strokeWidth="4"
        strokeLinejoin="miter"
        className="draw-path stroke-foreground"
      />

      <g className="fill-background stroke-foreground" strokeWidth="3">
        {milestones.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="8" />
        ))}
      </g>

      <rect x="562" y="42" width="36" height="36" className="pop-in fill-orange stroke-foreground" strokeWidth="3" />
    </svg>
  );
}
