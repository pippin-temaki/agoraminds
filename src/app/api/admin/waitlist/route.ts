import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const password = req.headers.get("x-admin-password");

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "No database configured" }, { status: 500 });
  }

  try {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.DATABASE_URL);

    const rows = await sql`
      SELECT id, name, email, entity_type, organization_name, contribution_type, message, referral_source, created_at
      FROM waitlist
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ total: rows.length, entries: rows });
  } catch (error: unknown) {
    console.error("[admin waitlist error]", error);
    return NextResponse.json({ error: "Failed to fetch waitlist" }, { status: 500 });
  }
}
