export default function TempleIcon({ className = "", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Classical temple — clean lines */}
      {/* Pediment (triangle roof) */}
      <path
        d="M8 20L24 8l16 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Entablature beam */}
      <line x1="6" y1="20" x2="42" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Columns */}
      <line x1="12" y1="20" x2="12" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="20" x2="20" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="20" x2="28" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="20" x2="36" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Base/steps */}
      <line x1="6" y1="38" x2="42" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="42" x2="44" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
