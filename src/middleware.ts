import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting (resets on redeploy — acceptable for landing page)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

// Rate limit configs per route pattern
const LIMITS = {
  waitlist: { window: 15 * 60 * 1000, max: 3 },      // 3 per 15 min
  admin:    { window: 15 * 60 * 1000, max: 5 },        // 5 per 15 min (stricter brute-force protection)
};

function getRateLimitKey(req: NextRequest, prefix: string): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return `${prefix}:${ip}`;
}

function applyRateLimit(req: NextRequest, prefix: string, config: { window: number; max: number }): NextResponse | null {
  const key = getRateLimitKey(req, prefix);
  const now = Date.now();
  const limit = rateLimit.get(key);

  // Clean up expired entries
  if (limit && now > limit.resetTime) {
    rateLimit.delete(key);
  }

  const current = rateLimit.get(key);

  if (!current) {
    rateLimit.set(key, { count: 1, resetTime: now + config.window });
    return null; // Allow
  }

  if (current.count >= config.max) {
    const retryAfter = Math.ceil((current.resetTime - now) / 1000);
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": retryAfter.toString() },
      }
    );
  }

  current.count += 1;
  rateLimit.set(key, current);
  return null; // Allow
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Rate limit admin endpoints (brute-force protection)
  if (pathname.startsWith("/api/admin")) {
    const blocked = applyRateLimit(req, "admin", LIMITS.admin);
    if (blocked) return blocked;
    return NextResponse.next();
  }

  // Rate limit waitlist submissions
  if (pathname.startsWith("/api/waitlist")) {
    const blocked = applyRateLimit(req, "waitlist", LIMITS.waitlist);
    if (blocked) return blocked;
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/waitlist", "/api/admin/:path*"],
};
