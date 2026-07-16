"use client";

import { useRef, useState } from "react";
import { submitContactForm } from "@/app/actions";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setStatus(null);
    const result = await submitContactForm(formData);
    setIsPending(false);

    if (result.success) {
      setStatus({ type: "success", message: "Message sent!" });
      formRef.current?.reset();
    } else {
      setStatus({ type: "error", message: result.error || "Something went wrong." });
    }
  }

  return (
    <section id="contact" className="py-32 px-6 max-w-4xl mx-auto border-t border-black/10 scroll-mt-16">
      <h2 className="text-4xl md:text-6xl font-bold mb-12 uppercase tracking-tight">Contact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          {status && (
            <div className={`mb-6 p-4 border ${status.type === "success" ? "border-black bg-black/5" : "border-red-500 bg-red-50 text-red-700"}`}>
              {status.message}
            </div>
          )}
          <form ref={formRef} action={handleSubmit} className="space-y-6">
            <div>
              <input type="text" name="name" placeholder="Name" className="w-full p-4 border-b border-black/20 bg-transparent focus:outline-none focus:border-black transition-colors" required />
            </div>
            <div>
              <input type="email" name="email" placeholder="Email" className="w-full p-4 border-b border-black/20 bg-transparent focus:outline-none focus:border-black transition-colors" required />
            </div>
            <div>
              <textarea name="message" placeholder="Message" rows={5} className="w-full p-4 border-b border-black/20 bg-transparent focus:outline-none focus:border-black transition-colors resize-none" required></textarea>
            </div>
            <button type="submit" disabled={isPending} className="px-8 py-4 bg-black text-white hover:bg-black/80 transition-colors uppercase tracking-widest text-sm font-bold disabled:opacity-50">
              {isPending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
        <div className="space-y-8">
          <div>
            <h4 className="text-xl font-bold mb-2">Email</h4>
            <a href="mailto:istiaqueahmedarik@gmail.com" className="text-black/70 hover:text-black transition-colors">istiaqueahmedarik@gmail.com</a>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Socials</h4>
            <div className="flex flex-col gap-2">
              <a href="https://github.com/istiaqueahmedarik" target="_blank" rel="noreferrer" className="text-black/70 hover:text-black transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/istiaqueahmedarik/" target="_blank" rel="noreferrer" className="text-black/70 hover:text-black transition-colors">LinkedIn</a>
              <a href="https://codeforces.com/profile/Istiaque190515" target="_blank" rel="noreferrer" className="text-black/70 hover:text-black transition-colors">Codeforces</a>
              <a href="https://www.facebook.com/istiaqueahmed.arik" target="_blank" rel="noreferrer" className="text-black/70 hover:text-black transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
