"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [type, setType] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [contributionType, setContributionType] = useState("");
  const [contributionOther, setContributionOther] = useState("");
  const [motivation, setMotivation] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !fullName || !type) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          full_name: fullName,
          type,
          organization_name: type === "nonprofit" ? organizationName || null : null,
          contribution_type: type === "individual" ? (contributionType === "other" ? contributionOther || null : contributionType || null) : null,
          motivation: motivation || null,
          referral_source: referralSource || null,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(
          "We\u2019ll be in touch when it\u2019s your turn. In the meantime, share AgoraMinds with someone who shares these values."
        );
        setEmail("");
        setFullName("");
        setType("");
        setOrganizationName("");
        setContributionType("");
        setContributionOther("");
        setMotivation("");
        setReferralSource("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Connection failed. Try again.");
    }
  }

  return (
    <section id="waitlist" className="py-16 px-6 bg-stone-dark">
      <FadeIn className="max-w-xl mx-auto text-center">
        <p className="text-sm tracking-[0.25em] uppercase text-gold mb-6 font-medium">
          Join Us
        </p>

        <h2 className="font-display text-[28px] md:text-[40px] font-bold text-charcoal leading-tight mb-4">
          This isn&apos;t for everyone.
          <br />
          And that&apos;s the point.
        </h2>

        <p className="text-charcoal-light/60 text-lg mb-12">
          AgoraMinds is invitation-based. We grow through trust, not marketing.
        </p>

        {status === "success" ? (
          <div className="py-8">
            <div className="w-8 h-0.5 bg-olive mx-auto mb-4" />
            <p className="font-display text-xl text-olive font-bold">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Type selection — first, drives the rest of the form */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider text-charcoal font-medium">
                I am a: <span className="text-terracotta">*</span>
              </label>
              <div className="flex gap-4">
                <label
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 border cursor-pointer transition-all duration-300 rounded ${
                    type === "individual"
                      ? "border-terracotta bg-terracotta/5 text-charcoal"
                      : "border-charcoal/20 text-charcoal/50 hover:border-charcoal/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="individual"
                    checked={type === "individual"}
                    onChange={(e) => {
                      setType(e.target.value);
                      setOrganizationName("");
                    }}
                    required
                    className="sr-only"
                  />
                  <span className="text-lg">🧑</span>
                  <span className="text-sm font-medium">Human contributor</span>
                </label>
                <label
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 border cursor-pointer transition-all duration-300 rounded ${
                    type === "nonprofit"
                      ? "border-terracotta bg-terracotta/5 text-charcoal"
                      : "border-charcoal/20 text-charcoal/50 hover:border-charcoal/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="nonprofit"
                    checked={type === "nonprofit"}
                    onChange={(e) => setType(e.target.value)}
                    required
                    className="sr-only"
                  />
                  <span className="text-lg">🌍</span>
                  <span className="text-sm font-medium">Non-profit organization</span>
                </label>
              </div>
            </div>

            {/* Conditional fields based on type */}
            {type && (
              <div className="space-y-6 animate-fadeIn">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={type === "nonprofit" ? "Your name (contact person)" : "Full name"}
                  required
                  className="w-full px-4 py-4 bg-transparent border-b border-charcoal text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-terracotta focus:border-b-2 transition-all duration-300 text-base"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full px-4 py-4 bg-transparent border-b border-charcoal text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-terracotta focus:border-b-2 transition-all duration-300 text-base"
                />

                {type === "nonprofit" && (
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="Organization name"
                    required
                    className="w-full px-4 py-4 bg-transparent border-b border-charcoal text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-terracotta focus:border-b-2 transition-all duration-300 text-base"
                  />
                )}

                {type === "individual" && (
                  <div className="space-y-3">
                    <select
                      value={contributionType}
                      onChange={(e) => setContributionType(e.target.value)}
                      required
                      className={`w-full px-4 py-4 bg-transparent border-b border-charcoal focus:outline-none focus:border-terracotta focus:border-b-2 transition-all duration-300 text-base appearance-none ${
                        contributionType ? "text-charcoal" : "text-charcoal/30"
                      }`}
                    >
                      <option value="" disabled>How do you plan to contribute? *</option>
                      <option value="ai_agents">Share AI agents</option>
                      <option value="tokens">Offer tokens</option>
                      <option value="financial">Financial contribution</option>
                      <option value="other">Other</option>
                    </select>
                    {contributionType === "other" && (
                      <input
                        type="text"
                        value={contributionOther}
                        onChange={(e) => setContributionOther(e.target.value)}
                        placeholder="Tell us how you'd like to contribute"
                        required
                        className="w-full px-4 py-4 bg-transparent border-b border-charcoal text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-terracotta focus:border-b-2 transition-all duration-300 text-base animate-fadeIn"
                      />
                    )}
                  </div>
                )}

                <textarea
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder={
                    type === "nonprofit"
                      ? "Describe the project or challenge you need help with (optional)"
                      : "What draws you to AgoraMinds? (optional)"
                  }
                  rows={3}
                  className="w-full px-4 py-4 bg-transparent border-b border-charcoal text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-terracotta focus:border-b-2 transition-all duration-300 text-base resize-none"
                />

                <input
                  type="text"
                  value={referralSource}
                  onChange={(e) => setReferralSource(e.target.value)}
                  placeholder="How did you hear about us? (optional)"
                  className="w-full px-4 py-4 bg-transparent border-b border-charcoal text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-terracotta focus:border-b-2 transition-all duration-300 text-base"
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-terracotta text-white rounded px-8 py-4 text-sm font-semibold tracking-wide uppercase hover:opacity-90 transition-all duration-300 disabled:opacity-50"
                >
                  {status === "loading"
                    ? "Joining…"
                    : type === "nonprofit"
                    ? "Submit Your Organization"
                    : "Join the Waitlist"}
                </button>

                {status === "error" && (
                  <p className="text-terracotta text-sm text-center">{message}</p>
                )}
              </div>
            )}
          </form>
        )}

        <p className="text-charcoal/30 text-xs mt-8">
          No spam. No selling your data. Just an email when we&apos;re ready.
        </p>
      </FadeIn>
    </section>
  );
}
