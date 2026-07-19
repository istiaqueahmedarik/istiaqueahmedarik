import Image from "next/image";
import Reveal from "./Reveal";
import { getProfile } from "@/lib/profile";

const SOCIALS = [
  {
    href: "https://github.com/istiaqueahmedarik",
    label: "GitHub",
    path: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4 M9 18c-4.51 2-5-2-7-2",
  },
  {
    href: "https://www.linkedin.com/in/istiaqueahmedarik/",
    label: "LinkedIn",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 0 0 .01",
  },
];

export default function Hero() {
  const { basics } = getProfile();
  const nameParts = basics.name.split(" ");
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
  const firstNames = nameParts.slice(0, -1);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16 bg-grid">
      <div className="pointer-events-none absolute -left-20 top-24 h-80 w-80 rounded-full bg-accent-soft blur-3xl animate-blob" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-72 w-72 rounded-full bg-accent-soft blur-3xl animate-blob" style={{ animationDelay: "5s" }} />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <div className="z-10 space-y-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-4 py-1.5 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for work
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-display text-6xl uppercase tracking-tighter sm:text-7xl md:text-8xl">
              {firstNames.map((part) => (
                <span key={part}>
                  {part}
                  <br />
                </span>
              ))}
              <span className="text-gradient">{lastName || basics.name}</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="max-w-md text-xl font-light leading-relaxed text-muted md:text-2xl">
              {basics.currentRole}. Competitive programmer building full-stack products and robust systems that scale.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="flex items-center gap-2 text-sm text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              {basics.location}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#projects" className="rounded-full bg-foreground px-7 py-3 text-sm font-bold uppercase tracking-widest text-background transition-transform hover:-translate-y-0.5">
                View Work
              </a>
              <a href="#contact" className="rounded-full border border-border px-7 py-3 text-sm font-bold uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent">
                Get in Touch
              </a>
              <div className="flex gap-2">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={s.path} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <div className="relative mx-auto h-[420px] w-full max-w-md md:h-[560px]">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border border-accent" />
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border">
              <Image
                src={basics.photo}
                alt={basics.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center grayscale transition-all duration-500 hover:grayscale-0"
                preload
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest text-muted md:flex" aria-label="Scroll to about">
        Scroll
        <span className="h-10 w-px bg-border" />
      </a>
    </section>
  );
}