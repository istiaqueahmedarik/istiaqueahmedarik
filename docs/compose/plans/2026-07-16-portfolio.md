# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-impact, SEO-optimized, black-and-white portfolio website for Istiaque Ahmed Arik using Next.js, Tailwind CSS, and Server Actions.

**Architecture:** A single-page portfolio built with Next.js App Router, styled with Tailwind CSS for a bold, high-contrast aesthetic. Server Components will handle data fetching (GitHub API) for optimal SEO and performance, while Server Actions will manage the contact form submission.

**Tech Stack:** Next.js (App Router), React, Tailwind CSS, GitHub API, TypeScript

## Global Constraints

- **Theme:** Bold black-and-white aesthetic inspired by the "Alex Graham" template.
- **SEO:** Must use Next.js Metadata API for OpenGraph/Twitter cards.
- **Rendering:** Use Server Components by default; Client Components only when necessary (e.g., animations).
- **Forms:** Contact form must use Next.js Server Actions.
- **Images:** Use Vercel default image for the hero profile; optimize with `next/image`.
- **Deployment:** Optimized for Vercel.

---

## Task 1: Project Initialization & Configuration

**Covers:** [S3]

**Files:**
- Create: `package.json`
- Create: `next.config.mjs`
- Create: `tailwind.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `app/globals.css`
- Create: `app/layout.tsx`

**Interfaces:**
- Consumes: None
- Produces: A working Next.js environment with Tailwind CSS and TypeScript.

- [ ] **Step 1: Initialize Next.js project**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm --yes
```

- [ ] **Step 2: Verify installation and start dev server**

```bash
npm run dev
```
Expected: Server starts on http://localhost:3000.

- [ ] **Step 3: Update tailwind.config.ts for high-contrast theme**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Update app/globals.css for black and white theme**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #000000;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
}

.text-display {
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 0.9;
}
```

- [ ] **Step 5: Update app/layout.tsx with Metadata and Font**

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Istiaque Ahmed Arik | Software Engineer",
  description: "Portfolio of Istiaque Ahmed Arik, a Software Engineer specializing in full-stack development and robust systems.",
  keywords: ["Istiaque Ahmed Arik", "Software Engineer", "Portfolio", "Next.js", "Full Stack"],
  openGraph: {
    title: "Istiaque Ahmed Arik | Software Engineer",
    description: "Portfolio of Istiaque Ahmed Arik, a Software Engineer specializing in full-stack development and robust systems.",
    url: "https://istiaqueahmedarik.vercel.app",
    siteName: "Istiaque Ahmed Arik",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Istiaque Ahmed Arik | Software Engineer",
    description: "Portfolio of Istiaque Ahmed Arik, a Software Engineer specializing in full-stack development and robust systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "chore: initialize next.js project with tailwind and metadata"
```

---

## Task 2: Layout & Navbar Component

**Covers:** [S4]

**Files:**
- Create: `components/Navbar.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `app/layout.tsx` structure.
- Produces: `Navbar` component used in `page.tsx`.

- [ ] **Step 1: Create Navbar component**

```typescript
// components/Navbar.tsx
export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-sm font-medium">
        <a href="/" className="text-black font-bold tracking-tight">
          © Istiaque Ahmed Arik
        </a>
        <div className="hidden md:flex gap-8">
          <a href="#about" className="text-black/70 hover:text-black transition-colors">About</a>
          <a href="#projects" className="text-black/70 hover:text-black transition-colors">Projects</a>
          <a href="#contact" className="text-black/70 hover:text-black transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Update app/page.tsx to include Navbar**

```typescript
// app/page.tsx
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
    </main>
  );
}
```

- [ ] **Step 3: Run tests (Visual verification)**

Run: `npm run dev`
Expected: Navbar appears at the top of the page.

- [ ] **Step 4: Commit**

```bash
git add components/Navbar.tsx app/page.tsx
git commit -m "feat: add navbar component"
```

---

## Task 3: Hero Section

**Covers:** [S4]

**Files:**
- Create: `components/Hero.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `app/page.tsx`.
- Produces: `Hero` component used in `page.tsx`.

- [ ] **Step 1: Create Hero component**

```typescript
// components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="z-10 space-y-6">
          <h1 className="text-display text-7xl md:text-9xl uppercase tracking-tighter">
            Istiaque<br />Ahmed
          </h1>
          <p className="text-3xl md:text-5xl font-light italic tracking-wide">
            Software Engineer
          </p>
        </div>
        <div className="relative h-[600px] w-full grayscale contrast-125">
          <Image
            src="https://assets.vercel.com/image/upload/front/vercel/dark.png"
            alt="Istiaque Ahmed Arik"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
      <div className="absolute bottom-10 left-6 flex flex-col gap-4 text-black/70">
        <a href="https://github.com/istiaqueahmedarik" target="_blank" rel="noreferrer" className="hover:text-black">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/istiaqueahmedarik/" target="_blank" rel="noreferrer" className="hover:text-black">
          LinkedIn
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update app/page.tsx to include Hero**

```typescript
// app/page.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3: Run tests (Visual verification)**

Run: `npm run dev`
Expected: Hero section with large text and image appears.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: add hero section"
```

---

## Task 4: About Section

**Covers:** [S4]

**Files:**
- Create: `components/About.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `app/page.tsx`.
- Produces: `About` component used in `page.tsx`.

- [ ] **Step 1: Create About component**

```typescript
// components/About.tsx
export default function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-4xl mx-auto border-t border-black/10">
      <h2 className="text-4xl md:text-6xl font-bold mb-12 uppercase tracking-tight">About</h2>
      <p className="text-xl md:text-3xl font-light leading-relaxed text-black/80">
        I am significantly insignificant, a grain of sand in the desert.
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Update app/page.tsx to include About**

```typescript
// app/page.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
}
```

- [ ] **Step 3: Run tests (Visual verification)**

Run: `npm run dev`
Expected: About section appears below Hero.

- [ ] **Step 4: Commit**

```bash
git add components/About.tsx app/page.tsx
git commit -m "feat: add about section"
```

---

## Task 5: Projects Section (GitHub Integration)

**Covers:** [S4]

**Files:**
- Create: `lib/github.ts`
- Create: `types/index.ts`
- Create: `components/Projects.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `app/page.tsx`.
- Produces: `Projects` component used in `page.tsx`.

- [ ] **Step 1: Create types**

```typescript
// types/index.ts
export interface Project {
  name: string;
  description: string;
  url: string;
  homepageUrl: string | null;
  repositoryTopics: { nodes: { name: string }[] };
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}
```

- [ ] **Step 2: Create GitHub fetcher**

```typescript
// lib/github.ts
import { Project } from "@/types";

export async function getPinnedProjects(): Promise<Project[]> {
  const query = `
    query {
      user(login: "istiaqueahmedarik") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              homepageUrl
              repositoryTopics(first: 3) {
                nodes {
                  name
                }
              }
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  const json = await res.json();
  return json.data.user.pinnedItems.nodes;
}
```

- [ ] **Step 3: Create Projects component**

```typescript
// components/Projects.tsx
import { getPinnedProjects } from "@/lib/github";

export default async function Projects() {
  const projects = await getPinnedProjects();

  return (
    <section id="projects" className="py-32 px-6 bg-black text-white">
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
                {project.repositoryTopics.nodes.map((topic) => (
                  <span key={topic.name} className="text-xs px-2 py-1 border border-white/20 uppercase tracking-wider">
                    {topic.name}
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
```

- [ ] **Step 4: Update app/page.tsx to include Projects**

```typescript
// app/page.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <Hero />
      <About />
      <Projects />
    </main>
  );
}
```

- [ ] **Step 5: Run tests (Visual verification)**

Run: `npm run dev`
Expected: Projects section appears with data from GitHub (requires `GITHUB_TOKEN` in `.env.local`).

- [ ] **Step 6: Commit**

```bash
git add lib/github.ts types/index.ts components/Projects.tsx app/page.tsx
git commit -m "feat: add projects section with github integration"
```

---

## Task 6: Contact Section (Server Actions)

**Covers:** [S4]

**Files:**
- Create: `app/actions.ts`
- Create: `components/Contact.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `app/page.tsx`.
- Produces: `Contact` component used in `page.tsx`.

- [ ] **Step 1: Create Server Action**

```typescript
// app/actions.ts
"use server";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  console.log("Contact Form Submission:", { name, email, message });

  return { success: true };
}
```

- [ ] **Step 2: Create Contact component**

```typescript
// components/Contact.tsx
"use client";

import { useRef } from "react";
import { submitContactForm } from "@/app/actions";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await submitContactForm(formData);
    formRef.current?.reset();
    alert("Message sent! (Check console)");
  }

  return (
    <section id="contact" className="py-32 px-6 max-w-4xl mx-auto border-t border-black/10">
      <h2 className="text-4xl md:text-6xl font-bold mb-12 uppercase tracking-tight">Contact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
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
          <button type="submit" className="px-8 py-4 bg-black text-white hover:bg-black/80 transition-colors uppercase tracking-widest text-sm font-bold">
            Send Message
          </button>
        </form>
        <div className="space-y-8">
          <div>
            <h4 className="text-xl font-bold mb-2">Email</h4>
            <a href="mailto:your-email@example.com" className="text-black/70 hover:text-black transition-colors">your-email@example.com</a>
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
```

- [ ] **Step 3: Update app/page.tsx to include Contact**

```typescript
// app/page.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 4: Run tests (Visual verification)**

Run: `npm run dev`
Expected: Contact form appears and can be submitted (console log check).

- [ ] **Step 5: Commit**

```bash
git add app/actions.ts components/Contact.tsx app/page.tsx
git commit -m "feat: add contact section with server actions"
```

---

## Task 7: Final Polish & SEO Verification

**Covers:** [S5]

**Files:**
- Modify: `app/layout.tsx`
- Modify: `next.config.mjs`

**Interfaces:**
- Consumes: All previous tasks.
- Produces: Final, optimized site.

- [ ] **Step 1: Verify Metadata**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 2: Verify Images**

Run: `npm run dev`
Expected: Images load correctly with grayscale filter.

- [ ] **Step 3: Run Lighthouse (Optional but recommended)**

- [ ] **Step 4: Final Commit**

```bash
git add .
git commit -m "chore: final polish and seo verification"
```
