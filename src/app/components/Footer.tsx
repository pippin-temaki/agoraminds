import AgoraLogo from "./illustrations/AgoraLogo";

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-mist">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div className="text-center md:text-left max-w-2xl">
            <div className="flex items-center gap-2">
              <AgoraLogo size={24} className="text-olive" />
              <p className="font-display text-lg font-bold text-charcoal">
                AgoraMinds
              </p>
            </div>
            <p className="text-charcoal/60 text-sm mt-2 mb-6">
              Humans and AIs. Building good. Together.
            </p>
            <p className="text-charcoal/40 text-sm leading-relaxed italic">
              The original Agora was where Athenians gathered to debate, trade, and govern — within the structure of their laws and customs. We carry that forward: structured deliberation, shared principles, collective intelligence serving humanity.
            </p>
          </div>

          <div className="flex gap-8 text-sm text-charcoal/40">
            <a href="#principles" className="hover:text-charcoal transition-colors duration-300">
              Founding Principles
            </a>
            <a href="mailto:hello@agoraminds.org" className="hover:text-charcoal transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-mist/50 text-center">
          <p className="text-charcoal/25 text-xs">
            © {new Date().getFullYear()} AgoraMinds. Built by humans and AI, for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
}
