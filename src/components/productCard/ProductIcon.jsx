const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };

const ICONS = {
  camera: (
    <g {...STROKE}>
      <rect x="7" y="15" width="34" height="22" rx="6" />
      <circle cx="24" cy="26" r="7" />
      <path d="M17 15l2.5-4h9L31 15" />
    </g>
  ),
  shield: (
    <g {...STROKE}>
      <path d="M24 6l14 5v9c0 10-6.5 16.5-14 20-7.5-3.5-14-10-14-20v-9l14-5z" />
    </g>
  ),
  "shield-outline": (
    <g {...STROKE} strokeWidth="1.4">
      <path d="M24 6l14 5v9c0 10-6.5 16.5-14 20-7.5-3.5-14-10-14-20v-9l14-5z" />
    </g>
  ),
  layers: (
    <g {...STROKE}>
      <path d="M24 8l16 8-16 8-16-8 16-8z" />
      <path d="M8 24l16 8 16-8" />
      <path d="M8 31l16 8 16-8" />
    </g>
  ),
  grid: (
    <g {...STROKE}>
      <rect x="8" y="8" width="14" height="14" rx="3" />
      <rect x="26" y="8" width="14" height="14" rx="3" />
      <rect x="8" y="26" width="14" height="14" rx="3" />
      <rect x="26" y="26" width="14" height="14" rx="3" />
    </g>
  ),

  // product icons
  "cam-dome": (
    <g {...STROKE}>
      <rect x="12" y="12" width="24" height="24" rx="12" />
      <circle cx="24" cy="24" r="7" />
      <circle cx="24" cy="24" r="2" fill="currentColor" stroke="none" />
    </g>
  ),
  "cam-pan": (
    <g {...STROKE}>
      <rect x="14" y="33" width="20" height="5" rx="2.5" />
      <circle cx="24" cy="21" r="12" />
      <circle cx="24" cy="21" r="5" />
    </g>
  ),
  "cam-flood": (
    <g {...STROKE}>
      <rect x="8" y="20" width="13" height="9" rx="2" />
      <rect x="27" y="20" width="13" height="9" rx="2" />
      <circle cx="24" cy="16" r="6" />
    </g>
  ),
  doorbell: (
    <g {...STROKE}>
      <rect x="16" y="7" width="16" height="34" rx="6" />
      <circle cx="24" cy="18" r="5" />
      <rect x="20" y="29" width="8" height="5" rx="1.5" />
    </g>
  ),
  "cam-battery": (
    <g {...STROKE}>
      <rect x="15" y="8" width="18" height="32" rx="9" />
      <circle cx="24" cy="24" r="7" />
    </g>
  ),
  "sensor-motion": (
    <g {...STROKE}>
      <rect x="13" y="15" width="22" height="18" rx="4" />
      <circle cx="24" cy="24" r="4" fill="currentColor" stroke="none" />
    </g>
  ),
  hub: (
    <g {...STROKE}>
      <rect x="8" y="19" width="32" height="10" rx="5" />
      <circle cx="17" cy="24" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="24" cy="24" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="31" cy="24" r="1.6" fill="currentColor" stroke="none" />
    </g>
  ),
  "sensor-entry": (
    <g {...STROKE}>
      <rect x="10" y="10" width="11" height="28" rx="2" />
      <rect x="27" y="10" width="11" height="28" rx="2" />
    </g>
  ),
  "sensor-water": (
    <g {...STROKE}>
      <path d="M24 7c6.5 8.5 10.5 14.5 10.5 20A10.5 10.5 0 0 1 13.5 27c0-5.5 4-11.5 10.5-20z" />
    </g>
  ),
  sdcard: (
    <g {...STROKE}>
      <path d="M15 7h13l7 7v27a2 2 0 0 1-2 2H15a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
      <path d="M18 7v9h13" />
    </g>
  ),
  protection: (
    <g {...STROKE}>
      <path d="M24 6l14 5v9c0 10-6.5 16.5-14 20-7.5-3.5-14-10-14-20v-9l14-5z" />
      <path d="M18.5 24l4 4 8-8" />
    </g>
  ),
  truck: (
    <g {...STROKE}>
      <rect x="6" y="17" width="21" height="14" rx="2" />
      <path d="M27 22h8l5 5v4h-13z" />
      <circle cx="14" cy="34" r="3" />
      <circle cx="33" cy="34" r="3" />
    </g>
  ),
};

export default function ProductIcon({ name, className }) {
  const content = ICONS[name] || ICONS.shield;
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      {content}
    </svg>
  );
}
