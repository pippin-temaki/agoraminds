export default function HumanProfile({ className = "", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Classical human profile - organic curves, laurel accent */}
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Head silhouette - organic, classical bust style */}
      <path
        d="M28 18c-2 0.5-4 2-5 4.5s-1.5 5.5-0.5 8c0.5 1.5 1.5 2.5 2 3.5c0.5 1.5 0 3-0.5 4.5
           c-0.5 1-0.5 2 0 3c1 2 3 3 5.5 3.5c2 0.5 4 0 5.5-1c1.5-1 2.5-2.5 3-4.5c0.5-2-0.5-3.5-1-5
           c0.5-1.5 1.5-3 2-5c0.5-2 0.5-4.5-0.5-6.5c-1-2-3-3.5-5-4c-2-0.5-4-0.5-5.5-1z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M32 16c-3 0-5.5 1.5-7 4c-1.5 2.5-2 5.5-1 8.5c0.5 1.5 1.5 3 1.5 4.5c0 1.5-0.5 3-1.5 4
           c-0.5 0.5-0.5 1.5 0 2c1 1.5 3 2.5 5 2.5h2c2.5 0 4.5-1 6-3c1-1.5 0.5-3 0-4.5
           c-0.5-1.5 0-3 1-4.5c1-1.5 1.5-3.5 1-5.5c-0.5-2.5-2-4.5-4-5.5c-1.5-1-3-2.5-3-2.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Laurel leaf accent - left */}
      <path
        d="M14 28c1.5-2 3-3 4.5-2.5c-0.5 2-2 3.5-4.5 2.5z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M15 32c1.5-1.5 3-2 4.5-1c-1 1.5-2.5 2.5-4.5 1z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M16 36c1.5-1 3-1 4-0.5c-0.5 1.5-2 2.5-4 0.5z"
        fill="currentColor"
        opacity="0.3"
      />
      {/* Laurel leaf accent - right */}
      <path
        d="M50 28c-1.5-2-3-3-4.5-2.5c0.5 2 2 3.5 4.5 2.5z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M49 32c-1.5-1.5-3-2-4.5-1c1 1.5 2.5 2.5 4.5 1z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M48 36c-1.5-1-3-1-4-0.5c0.5 1.5 2 2.5 4 0.5z"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}
