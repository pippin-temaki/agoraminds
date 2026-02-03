export default function AIProfile({ className = "", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* AI profile - geometric/faceted, same classical form but angular */}
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Geometric head - faceted profile */}
      <path
        d="M26 19l-3 5l-2 7l1 5l2 3l-1 4l1 3l4 2l4 0l3-1l3-3l1-4l-1-4l1-4l1-6l-2-5l-4-3l-4-1l-4 2z"
        fill="currentColor"
        opacity="0.1"
      />
      <path
        d="M26 19l-3 5l-2 7l1 5l2 3l-1 4l1 3l4 2l4 0l3-1l3-3l1-4l-1-4l1-4l1-6l-2-5l-4-3l-4-1l-4 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Internal geometric lines - representing neural structure */}
      <line x1="28" y1="22" x2="32" y2="26" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <line x1="36" y1="22" x2="32" y2="26" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <line x1="32" y1="26" x2="32" y2="32" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <line x1="24" y1="28" x2="32" y2="32" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <line x1="40" y1="28" x2="32" y2="32" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <line x1="32" y1="32" x2="28" y2="38" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <line x1="32" y1="32" x2="36" y2="38" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      {/* Neural nodes */}
      <circle cx="32" cy="26" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="28" cy="38" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="36" cy="38" r="1.5" fill="currentColor" opacity="0.5" />
      {/* Spark/star accent - top */}
      <path
        d="M32 8l0.5 3l2-2l-1.5 2.5l3-0.5l-2.5 1.5l2.5 1.5l-3-0.5l1.5 2.5l-2-2l-0.5 3l-0.5-3l-2 2l1.5-2.5l-3 0.5l2.5-1.5l-2.5-1.5l3 0.5l-1.5-2.5l2 2z"
        fill="currentColor"
        opacity="0.25"
      />
    </svg>
  );
}
