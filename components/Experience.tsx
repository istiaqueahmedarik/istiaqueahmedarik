import Reveal from "./Reveal";
import { getProfile } from "@/lib/profile";

export default function Experience() {
  const { experience, education } = getProfile();

  return (
    <section id="experience" className="scroll-mt-16 border-t border-border px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-accent">Journey</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-14 text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            Experience &amp; Education
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-muted">Experience</h3>
            <div className="space-y-6 border-l border-border pl-6">
              {experience.map((item, index) => (
                <Reveal key={item.company} delay={index * 80}>
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background" />
                    <h4 className="text-lg font-bold text-foreground">{item.company}</h4>
                    {item.roles ? (
                      <div className="mt-2 space-y-2">
                        {item.totalDuration && (
                          <p className="text-xs uppercase tracking-wider text-muted">{item.totalDuration}</p>
                        )}
                        {item.roles.map((role) => (
                          <div key={role.title}>
                            <p className="text-sm font-medium text-foreground">{role.title}</p>
                            <p className="text-xs text-muted">{role.startDate} - {role.endDate} &middot; {role.duration}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <p className="text-xs text-muted">
                          {item.startDate} - {item.endDate}
                          {item.duration ? ` \u00b7 ${item.duration}` : ""}
                          {item.employmentType ? ` \u00b7 ${item.employmentType}` : ""}
                        </p>
                      </>
                    )}
                    {item.skills && item.skills.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <span key={skill} className="rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-muted">Education</h3>
            <div className="space-y-6 border-l border-border pl-6">
              {education.map((item, index) => (
                <Reveal key={item.institution} delay={index * 80}>
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background" />
                    <h4 className="text-lg font-bold text-foreground">{item.institution}</h4>
                    <p className="text-sm font-medium text-foreground">{item.degree}</p>
                    <p className="text-xs text-muted">
                      {item.startDate} - {item.endDate}
                      {item.grade ? ` \u00b7 GPA ${item.grade}` : ""}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}