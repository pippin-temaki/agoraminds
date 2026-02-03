"use client";

import { useState, useEffect } from "react";

interface WaitlistEntry {
  id: number;
  name: string;
  email: string;
  entity_type: string;
  organization_name: string | null;
  contribution_type: string | null;
  message: string | null;
  referral_source: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_password");
    if (stored) {
      setPassword(stored);
      fetchData(stored);
    }
  }, []);

  async function fetchData(pw: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/waitlist", {
        headers: { "x-admin-password": pw },
      });
      if (res.status === 401) {
        setError("Wrong password");
        setAuthenticated(false);
        sessionStorage.removeItem("admin_password");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setError(errData.error || `Server error (${res.status})`);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setEntries(data.entries || []);
      setTotal(data.total || 0);
      setAuthenticated(true);
      sessionStorage.setItem("admin_password", pw);
    } catch {
      setError("Connection failed");
    }
    setLoading(false);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchData(password);
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_password");
    setAuthenticated(false);
    setPassword("");
    setEntries([]);
  }

  function exportCSV() {
    const headers = ["Name", "Email", "Type", "Organization", "Contribution", "Message", "Referral", "Date"];
    const rows = entries.map(e => [
      e.name, e.email, e.entity_type, e.organization_name || "", e.contribution_type || "",
      (e.message || "").replace(/"/g, '""'), e.referral_source || "",
      new Date(e.created_at).toLocaleString()
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `agoraminds-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-stone flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <h1 className="font-display text-2xl font-bold text-charcoal mb-2">Admin</h1>
          <p className="text-charcoal/50 text-sm mb-8">AgoraMinds Waitlist Dashboard</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-4 bg-transparent border-b border-charcoal text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-terracotta focus:border-b-2 transition-all duration-300 text-base mb-4"
          />
          {error && <p className="text-terracotta text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-charcoal text-white rounded px-6 py-3 text-sm font-semibold tracking-wide uppercase hover:bg-charcoal-light transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Checking…" : "Enter"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone">
      {/* Header */}
      <div className="border-b border-mist px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-charcoal">
              Waitlist Dashboard
            </h1>
            <p className="text-charcoal/40 text-sm">
              {total} {total === 1 ? "submission" : "submissions"}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => fetchData(password)}
              className="text-sm px-4 py-2 border border-mist rounded hover:border-charcoal/30 transition-colors text-charcoal/60 hover:text-charcoal"
            >
              ↻ Refresh
            </button>
            {entries.length > 0 && (
              <button
                onClick={exportCSV}
                className="text-sm px-4 py-2 border border-mist rounded hover:border-charcoal/30 transition-colors text-charcoal/60 hover:text-charcoal"
              >
                ↓ Export CSV
              </button>
            )}
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 text-charcoal/40 hover:text-terracotta transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {entries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-charcoal/30 text-lg">No submissions yet</p>
            <p className="text-charcoal/20 text-sm mt-2">They&apos;ll show up here when people join the waitlist</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-mist">
                  <th className="pb-3 pr-6 font-semibold text-charcoal/50 text-xs uppercase tracking-wider">#</th>
                  <th className="pb-3 pr-6 font-semibold text-charcoal/50 text-xs uppercase tracking-wider">Name</th>
                  <th className="pb-3 pr-6 font-semibold text-charcoal/50 text-xs uppercase tracking-wider">Email</th>
                  <th className="pb-3 pr-6 font-semibold text-charcoal/50 text-xs uppercase tracking-wider">Type</th>
                  <th className="pb-3 pr-6 font-semibold text-charcoal/50 text-xs uppercase tracking-wider">Details</th>
                  <th className="pb-3 pr-6 font-semibold text-charcoal/50 text-xs uppercase tracking-wider">Message</th>
                  <th className="pb-3 font-semibold text-charcoal/50 text-xs uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, i) => (
                  <tr key={entry.id} className="border-b border-mist/50 hover:bg-stone-dark/50 transition-colors">
                    <td className="py-4 pr-6 text-charcoal/30 tabular-nums">{total - i}</td>
                    <td className="py-4 pr-6 font-medium text-charcoal">{entry.name}</td>
                    <td className="py-4 pr-6 text-charcoal/70">
                      <a href={`mailto:${entry.email}`} className="hover:text-terracotta transition-colors">
                        {entry.email}
                      </a>
                    </td>
                    <td className="py-4 pr-6">
                      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
                        entry.entity_type === "nonprofit"
                          ? "bg-terracotta/10 text-terracotta"
                          : "bg-olive/10 text-olive"
                      }`}>
                        {entry.entity_type === "nonprofit" ? "Non-profit" : "Individual"}
                      </span>
                    </td>
                    <td className="py-4 pr-6 text-charcoal/60 max-w-[200px] truncate">
                      {entry.organization_name || entry.contribution_type || "—"}
                    </td>
                    <td className="py-4 pr-6 text-charcoal/50 max-w-[250px] truncate">
                      {entry.message || "—"}
                    </td>
                    <td className="py-4 text-charcoal/40 whitespace-nowrap">
                      {new Date(entry.created_at).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
