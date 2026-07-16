# Portfolio Design Specification

## [S1] Problem
The goal is to create a high-impact, SEO-optimized portfolio website for Istiaque Ahmed Arik using Next.js. The site must feature a bold, black-and-white aesthetic inspired by the "Alex Graham" theme, leverage Server-Side Rendering (SSR) and Server Actions, and provide a clear path for future image customization.

## [S2] Solution Overview
A single-page portfolio built with Next.js (App Router), styled with Tailwind CSS for rapid development and high-contrast design. The site will utilize Server Components for SEO and performance, and Server Actions for the contact form.

## [S3] Architecture & Tech Stack
- **Framework**: Next.js (latest stable)
- **Styling**: Tailwind CSS
- **Data Fetching**: GitHub API (for pinned projects) via Server Components
- **SEO**: Next.js Metadata API (OpenGraph, Twitter cards)
- **Hosting**: Optimized for Vercel deployment
- **Fonts**: Inter (for clean, modern readability) and a bold serif/sans-serif for display text.

## [S4] UI Components
### Hero Section
- Massive, bold typography for the name "Istiaque Ahmed Arik".
- Subtitle: "Software Engineer".
- Large, grayscale profile image (Vercel default for now).
- Minimal top navigation (About, Projects, Contact).
- Social icons (GitHub, LinkedIn, etc.) in the bottom-left or similar high-contrast position.

### About Section
- Minimalist layout.
- Content: "I am significantly insignificant, a grain of sand in the desert." (from GitHub bio).
- High contrast (black text on white or vice versa).

### Projects Section
- Grid of pinned repositories from GitHub.
- Each card: Title, Description, Tech tags (TypeScript, JavaScript, etc.).
- Links to live demos/repos.

### Contact Section
- Minimalist form (Name, Email, Message).
- Backend: Server Action to handle submission (console.log or simple email service).
- Social links (GitHub, LinkedIn, Codeforces, Facebook).

## [S5] SEO & Performance
- `generateMetadata` for all pages.
- Semantic HTML (`<header>`, `<main>`, `<section>`).
- Image optimization via `next/image`.
- Lighthouse score target: >90.

## [S6] Future Considerations
- Image replacement: User will replace the Vercel default with a custom image.
- Form integration: Potential connection to a database or email API.
