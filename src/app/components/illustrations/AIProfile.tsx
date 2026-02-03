export default function AIProfile({ className = "", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circuit brain — central processor */}
      <rect x="14" y="14" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Inner chip detail */}
      <rect x="19" y="19" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Connection pins — top */}
      <line x1="20" y1="14" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="14" x2="28" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Connection pins — bottom */}
      <line x1="20" y1="34" x2="20" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="34" x2="28" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Connection pins — left */}
      <line x1="14" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="28" x2="8" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Connection pins — right */}
      <line x1="34" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="34" y1="28" x2="40" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
