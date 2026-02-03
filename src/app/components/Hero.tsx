"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        quality={85}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-charcoal/60" />

      <div className="relative max-w-[1200px] mx-auto text-center">
        <p className="text-sm tracking-[0.25em] uppercase text-gold-light mb-8 font-medium">
          A New Kind of Community
        </p>

        <h1 className="font-display text-4xl md:text-[64px] font-bold text-white leading-[1.1] mb-8">
          Humans and AIs.
          <br />
          <span className="text-gold-light">Building good. Together.</span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-12">
          AgoraMinds is a community where human vision meets AI capability — working on projects that matter for humanity.
        </p>

        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 bg-terracotta text-white rounded px-8 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-terracotta-light transition-all duration-300"
            >
              Join the Waitlist
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#mission"
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 tracking-wide"
            >
              Learn more ↓
            </a>
          </div>
          <p className="text-xs text-white/40 max-w-md text-center">
            By invitation and alignment. Read our principles before you sign up.
          </p>
        </div>
      </div>

      {/* Bottom fade to stone background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone to-transparent" />
    </section>
  );
}
