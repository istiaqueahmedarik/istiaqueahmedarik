import { getPinnedProjects } from "@/lib/github";
import { getProfile } from "@/lib/profile";
import Reveal from "./Reveal";

interface ProjectCard {
  name: string;
  description: string;
  href: string | null;
  tags: string[];
  language: string | null;
}

export default async function Projects() {
  const pinned = await getPinnedProjects();
  const { projects: profileProjects } = getProfile();

  const cards: ProjectCard[] =
    pinned.length > 0
      ? pinned.map((project) => ({
          name: project.name,
          description: project.description,
          href: project.homepageUrl || project.url,
          tags: project.repositoryTopics.nodes.map((rt) => rt.topic.name),
          language: project.primaryLanguage?.name ?? null,
        }))
      : profileProjects.map((project) => ({
          name: project.name,
          description: project.description,
          href: project.source ?? null,
          tags: (project.skills ?? []).slice(0, 3),
          language: null,
        }));

  return (
    <section id="projects" className="scroll-mt-16 border-t border-border px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-accent">Work</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
              Selected Projects
            </h2>
            <a href="https://github.com/istiaqueahmedarik" target="_blank" rel="noreferrer" className="text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-accent hover:underline">
              View all on GitHub
            </a>
          </div>
        </Reveal>

        {cards.length === 0 ? (
          <div className="rounded-2xl border border-border bg-background-elevated p-8 text-muted">
            Projects are temporarily unavailable. You can still view my work on{" "}
            <a href="https://github.com/istiaqueahmedarik" target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-4">
              GitHub
            </a>
            .
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((project, index) => {
              const Wrapper = project.href ? "a" : "div";
              const linkProps = project.href
                ? { href: project.href, target: "_blank", rel: "noreferrer" }
                : {};
              return (
                <Reveal key={project.name} delay={(index % 3) * 90}>
                  <Wrapper
                    {...linkProps}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-background-elevated p-7 transition-all hover:-translate-y-1 hover:border-accent"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted"><path d="M4 4h6a2 2 0 0 1 2 2 2 2 0 0 1 2-2h6M4 4v14a2 2 0 0 0 2 2h4M20 4v14a2 2 0 0 1-2 2h-4M12 6v14" /></svg>
                      {project.href && (
                        <span className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted transition-all group-hover:border-accent group-hover:text-accent">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
                        </span>
                      )}
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-foreground">{project.name}</h3>
                    <p className="mb-6 flex-grow text-sm leading-relaxed text-muted">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs uppercase tracking-wider text-accent">
                          {tag}
                        </span>
                      ))}
                      {project.language && (
                        <span className="rounded-full border border-border px-2.5 py-1 text-xs uppercase tracking-wider text-muted">
                          {project.language}
                        </span>
                      )}
                    </div>
                  </Wrapper>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}