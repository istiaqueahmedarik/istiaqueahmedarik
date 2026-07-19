import Reveal from "./Reveal";
import { getProfile } from "@/lib/profile";

export default function About() {
  const { basics, experience, projects, certifications, achievements } = getProfile();
  const current = experience[0];

  const icpcCount = achievements.filter((item) => /ICPC/i.test(item)).length;

  const STATS = [
    { value: `${projects.length}`, label: "Projects shipped" },
    { value: `${certifications.length}`, label: "Certifications" },
    { value: `${icpcCount}x`, label: "ICPC Regionalist" },
  ];


  return (
    <section id="about" className="scroll-mt-16 border-t border-border px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-accent">About</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-12 max-w-3xl text-3xl font-light leading-snug text-foreground md:text-5xl">
            I build <span className="font-bold">reliable software</span> end to end, sharpened by years of <span className="font-bold">competitive programming</span>.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <Reveal delay={120} className="md:col-span-2">
            <p className="text-lg leading-relaxed text-muted">{basics.about}</p>
            {current && (
              <p className="mt-6 flex items-center gap-2 text-sm text-muted">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Currently {current.title} at {current.company}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              {basics.topSkills.map((skill) => (
                <span key={skill} className="rounded-full bg-accent-soft px-3 py-1 text-sm text-accent">
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
              {STATS.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border bg-background-elevated p-5">
                  <div className="text-3xl font-black tracking-tight text-foreground">{stat.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}