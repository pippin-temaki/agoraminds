import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, full_name, type, organization_name, contribution_type, motivation, referral_source } = await req.json();

    // Email validation: trim whitespace, normalize to lowercase
    const normalizedEmail = email?.trim().toLowerCase();
    
    // Validate email format and length
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!normalizedEmail || !emailRegex.test(normalizedEmail) || normalizedEmail.length > 254) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Validate and sanitize inputs
    const trimmedName = full_name?.trim();
    const trimmedType = type?.trim();
    const trimmedMotivation = motivation?.trim() || null;
    const trimmedReferral = referral_source?.trim() || null;

    if (!trimmedName || !trimmedType) {
      return NextResponse.json({ error: "Full name and type required" }, { status: 400 });
    }

    // Input length limits
    if (trimmedName.length > 255) {
      return NextResponse.json({ error: "Name too long" }, { status: 400 });
    }
    if (!["individual", "nonprofit"].includes(trimmedType)) {
      return NextResponse.json({ error: "Type must be 'individual' or 'nonprofit'" }, { status: 400 });
    }
    if (trimmedMotivation && trimmedMotivation.length > 2000) {
      return NextResponse.json({ error: "Motivation too long (max 2000 chars)" }, { status: 400 });
    }
    if (trimmedReferral && trimmedReferral.length > 255) {
      return NextResponse.json({ error: "Referral source too long" }, { status: 400 });
    }

    // Validate organization name for nonprofits
    const trimmedOrgName = organization_name?.trim() || null;
    if (trimmedType === "nonprofit" && !trimmedOrgName) {
      return NextResponse.json({ error: "Organization name required for non-profits" }, { status: 400 });
    }
    if (trimmedOrgName && trimmedOrgName.length > 255) {
      return NextResponse.json({ error: "Organization name too long" }, { status: 400 });
    }

    // Validate contribution type for individuals
    const trimmedContribution = contribution_type?.trim() || null;
    if (trimmedContribution && trimmedContribution.length > 255) {
      return NextResponse.json({ error: "Contribution type too long" }, { status: 400 });
    }

    // If DATABASE_URL is configured, save to Neon Postgres
    if (process.env.DATABASE_URL) {
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(process.env.DATABASE_URL);

      // Insert (ignore duplicates) — table created via migration, not on every request
      await sql`
        INSERT INTO waitlist (email, name, entity_type, organization_name, contribution_type, message, referral_source)
        VALUES (${normalizedEmail}, ${trimmedName}, ${trimmedType}, ${trimmedOrgName}, ${trimmedContribution}, ${trimmedMotivation}, ${trimmedReferral})
        ON CONFLICT (email) DO NOTHING
      `;
    } else {
      // Log to console if no DB configured (development)
      console.log(`[waitlist] ${normalizedEmail} - ${full_name} (${type})`);
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error("[waitlist error]", error);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}
