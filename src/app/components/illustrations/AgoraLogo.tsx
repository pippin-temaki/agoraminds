export default function AgoraLogo({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AgoraMinds"
    >
      {/* Simplified temple/column 'A' monogram — two columns meeting at apex */}
      <path
        d="M8 28l8-22l8 22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Cross beam */}
      <line x1="11" y1="20" x2="21" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Column fluting detail */}
      <line x1="12" y1="15" x2="16" y2="6" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="20" y1="15" x2="16" y2="6" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {/* Spark at apex */}
      <circle cx="16" cy="5" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
