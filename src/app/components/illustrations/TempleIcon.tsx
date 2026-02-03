export default function TempleIcon({ className = "", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Classical temple / agora - representing non-profits and the gathering place */}
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Pediment (triangle roof) */}
      <path
        d="M16 26l16-10l16 10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      {/* Entablature (horizontal beam) */}
      <rect x="14" y="26" width="36" height="2.5" rx="0.5" fill="currentColor" opacity="0.2" />
      {/* Columns - Doric style */}
      <rect x="18" y="28.5" width="3" height="18" rx="0.5" fill="currentColor" opacity="0.15" />
      <rect x="18" y="28.5" width="3" height="18" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none" />
      
      <rect x="26.5" y="28.5" width="3" height="18" rx="0.5" fill="currentColor" opacity="0.15" />
      <rect x="26.5" y="28.5" width="3" height="18" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none" />
      
      <rect x="34.5" y="28.5" width="3" height="18" rx="0.5" fill="currentColor" opacity="0.15" />
      <rect x="34.5" y="28.5" width="3" height="18" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none" />
      
      <rect x="43" y="28.5" width="3" height="18" rx="0.5" fill="currentColor" opacity="0.15" />
      <rect x="43" y="28.5" width="3" height="18" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* Base/Stylobate */}
      <rect x="12" y="46.5" width="40" height="2.5" rx="0.5" fill="currentColor" opacity="0.2" />
      <line x1="12" y1="46.5" x2="52" y2="46.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
