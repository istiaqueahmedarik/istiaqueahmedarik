import { getCodeforcesStats } from "@/lib/codeforces";
import Reveal from "./Reveal";

function rankColor(rank: string | null): string {
  if (!rank) return "var(--muted)";
  const r = rank.toLowerCase();
  if (r.includes("legendary")) return "#ff0000";
  if (r.includes("grandmaster")) return "#ff3030";
  if (r.includes("master")) return "#ff8c00";
  if (r.includes("candidate")) return "#aa00aa";
  if (r.includes("expert")) return "#0000ff";
  if (r.includes("specialist")) return "#03a89e";
  if (r.includes("pupil")) return "#008000";
  return "#808080";
}

function titleCase(value: string): string {
  return value.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function Codeforces() {
  const stats = await getCodeforcesStats();
  if (!stats) return null;

  const color = rankColor(stats.rank);

  const metrics = [
    { value: stats.rating != null ? String(stats.rating) : "--", label: "Current rating" },
    { value: stats.maxRating != null ? String(stats.maxRating) : "--", label: "Peak rating" },
    { value: String(stats.solvedCount), label: "Problems solved" },
    { value: String(stats.contestCount), label: "Contests" },
  ];

  return (
    <section id="codeforces" className="scroll-mt-16 border-t border-border px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-accent">Competitive Programming</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
              Codeforces
            </h2>
            <a href={stats.profileUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-accent hover:underline">
              @{stats.handle}
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-background-elevated p-7">
              <span className="text-xs font-bold uppercase tracking-widest text-muted">Rank</span>
              <span className="mt-3 text-2xl font-black tracking-tight" style={{ color }}>
                {stats.rank ? titleCase(stats.rank) : "Unrated"}
              </span>
              {stats.maxRank && (
                <span className="mt-1 text-xs uppercase tracking-wider text-muted">
                  Peak: {titleCase(stats.maxRank)}
                </span>
              )}
              {stats.hardestSolved != null && (
                <span className="mt-4 text-xs uppercase tracking-wider text-muted">
                  Hardest solved: <span className="text-foreground">{stats.hardestSolved}</span>
                </span>
              )}
            </div>
          </Reveal>
          <Reveal delay={200} className="md:col-span-2">
            <div className="grid h-full grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-border bg-background-elevated p-5">
                  <div className="text-3xl font-black tracking-tight text-foreground">{metric.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted">{metric.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
