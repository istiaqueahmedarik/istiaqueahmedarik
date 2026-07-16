import { getPinnedProjects } from "@/lib/github";

export default async function Projects() {
  const projects = await getPinnedProjects();

  return (
    <section id="projects" className="py-32 px-6 bg-black text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-16 uppercase tracking-tight">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.homepageUrl || project.url}
              target="_blank"
              rel="noreferrer"
              className="group p-8 border border-white/20 hover:border-white/50 transition-colors flex flex-col h-full bg-white/5 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white/80">{project.name}</h3>
              <p className="text-white/70 mb-8 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.repositoryTopics.nodes.map((rt) => (
                  <span key={rt.topic.name} className="text-xs px-2 py-1 border border-white/20 uppercase tracking-wider">
                    {rt.topic.name}
                  </span>
                ))}
                {project.primaryLanguage && (
                  <span className="text-xs px-2 py-1 border border-white/20 uppercase tracking-wider">
                    {project.primaryLanguage.name}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}