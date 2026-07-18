import Reveal from "./Reveal";

const GROUPS = [
  {
    title: "Languages",
    items: ["C++", "Python", "Java", "JavaScript", "TypeScript", "SQL", "PL/SQL", "C"],
  },
  {
    title: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Bootstrap", "jQuery"],
  },
  {
    title: "Backend & Data",
    items: ["Node.js", "Bun.JS", "HonoJS", "PHP", "REST APIs", "Firebase", "Supabase", "Oracle SQL"],
  },
  {
    title: "AI & Systems",
    items: ["LLMs", "MCP", "Cloudflare Workers", "Machine Learning", "JavaFX", "Data Structures", "Algorithms"],
  },
];

const MARQUEE = [
  "C++", "React", "Next.js", "Node.js", "Python", "Competitive Programming",
  "TypeScript", "LLMs", "Supabase", "Java", "Firebase", "Algorithms",
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 overflow-hidden border-t border-border px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-accent">Skills</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-14 text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            Tools of the trade
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {GROUPS.map((group, index) => (
            <Reveal key={group.title} delay={index * 100}>
              <div className="h-full bg-background-elevated p-6">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-border px-3 py-1 text-sm text-foreground transition-colors hover:border-accent hover:text-accent">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="relative mt-16 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center">
          {[...MARQUEE, ...MARQUEE].map((item, index) => (
            <span key={index} className="mx-4 text-3xl font-black uppercase tracking-tight text-muted/40 md:text-5xl">
              {item}
              <span className="mx-4 text-accent">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}