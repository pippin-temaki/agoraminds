export default function HumanProfile({ className = "", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Clean user silhouette — head */}
      <circle cx="24" cy="16" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Shoulders/body arc */}
      <path
        d="M10 40c0-7.732 6.268-14 14-14s14 6.268 14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
