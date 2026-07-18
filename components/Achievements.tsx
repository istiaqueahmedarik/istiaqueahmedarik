"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { getProfile } from "@/lib/profile";

const INITIAL_CERTS = 8;

export default function Achievements() {
  const { achievements, certifications } = getProfile();
  const [showAll, setShowAll] = useState(false);
  const visibleCerts = showAll ? certifications : certifications.slice(0, INITIAL_CERTS);

  return (
    <section id="achievements" className="scroll-mt-16 border-t border-border px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-accent">Recognition</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-14 text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            Achievements &amp; Certifications
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {achievements.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-background-elevated p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-accent"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
                <span className="text-sm leading-relaxed text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-muted">
          Certifications ({certifications.length})
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {visibleCerts.map((cert, index) => (
            <Reveal key={`${cert.name}-${index}`} delay={(index % 2) * 60}>
              <div className="h-full rounded-2xl border border-border bg-background-elevated p-5">
                <h4 className="text-sm font-bold leading-snug text-foreground">{cert.name}</h4>
                <p className="mt-1 text-xs text-muted">
                  {cert.issuer}
                  {cert.issued ? ` \u00b7 ${cert.issued}` : ""}
                </p>
                {cert.skills && cert.skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cert.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">{skill}</span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {certifications.length > INITIAL_CERTS && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="rounded-full border border-border px-7 py-3 text-sm font-bold uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {showAll ? "Show less" : `Show all ${certifications.length}`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}