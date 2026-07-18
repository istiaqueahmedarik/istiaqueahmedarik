"use client";

import { useRef, useState } from "react";
import { submitContactForm } from "@/app/actions";
import Reveal from "./Reveal";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/istiaqueahmedarik" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/istiaqueahmedarik/" },
  { label: "Codeforces", href: "https://codeforces.com/profile/Istiaque_ahmed" },
  { label: "Facebook", href: "https://www.facebook.com/istiaqueahmed.arik" },
];

const FIELD_CLASS =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-soft transition-colors";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setStatus(null);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus({ type: "success", message: "Message sent!" });
        formRef.current?.reset();
      } else {
        setStatus({ type: "error", message: result.error || "Something went wrong." });
      }
    } catch {
      setStatus({ type: "error", message: "Could not send your message. Please try again." });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-16 border-t border-border px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-accent">Contact</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-14 text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            Let us build something
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
          <Reveal delay={120}>
            {status && (
              <div
                role="status"
                className={`mb-6 rounded-xl border p-4 text-sm ${
                  status.type === "success"
                    ? "border-accent bg-accent-soft text-foreground"
                    : "border-red-500/50 bg-red-500/10 text-red-500"
                }`}
              >
                {status.message}
              </div>
            )}
            <form ref={formRef} action={handleSubmit} className="space-y-5">
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <input type="text" name="name" placeholder="Name" maxLength={100} className={FIELD_CLASS} required />
              <input type="email" name="email" placeholder="Email" maxLength={254} className={FIELD_CLASS} required />
              <textarea name="message" placeholder="Message" rows={5} maxLength={2000} className={`${FIELD_CLASS} resize-none`} required />
              <button
                type="submit"
                disabled={isPending}
                className="rounded-full bg-foreground px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-background transition-transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {isPending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </Reveal>
          <Reveal delay={200}>
            <div className="space-y-8">
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">Email</h3>
                <a href="mailto:istiaqueahmedarik@gmail.com" className="text-lg text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline">
                  istiaqueahmedarik@gmail.com
                </a>
              </div>
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Socials</h3>
                <div className="flex flex-wrap gap-3">
                  {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}



