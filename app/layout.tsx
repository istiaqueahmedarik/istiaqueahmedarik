import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getProfile } from "@/lib/profile";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL = "https://istiaqueahmedarik.vercel.app";
const { basics, skills } = getProfile();
const description =
  "Portfolio of Istiaque Ahmed Arik, a Software Engineer at Enosis Solutions and multi-time ICPC Regionalist. Full-stack development, competitive programming, and reliable systems.";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
const yandexVerification = process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${basics.name} | Software Engineer`,
    template: `%s | ${basics.name}`,
  },
  description,
  applicationName: `${basics.name} Portfolio`,
  authors: [{ name: basics.name, url: SITE_URL }],
  creator: basics.name,
  publisher: basics.name,
  keywords: [
    basics.name,
    "Software Engineer",
    "Full Stack Developer",
    "Competitive Programmer",
    "ICPC Regionalist",
    "Codeforces Expert",
    "Next.js",
    "React",
    "Portfolio",
    ...skills.slice(0, 10),
  ],
  alternates: {
    canonical: "/",
  },
  category: "technology",
  openGraph: {
    title: `${basics.name} | Software Engineer`,
    description,
    url: SITE_URL,
    siteName: `${basics.name} Portfolio`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: basics.photo,
        width: 1200,
        height: 630,
        alt: basics.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${basics.name} | Software Engineer`,
    description,
    images: [basics.photo],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(yandexVerification ? { yandex: yandexVerification } : {}),
    ...(bingVerification
      ? { other: { "msvalidate.01": bingVerification } }
      : {}),
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

const themeScript = `(() => {
  try {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored || (prefersDark ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (_) {}
})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: basics.name,
  url: SITE_URL,
  image: `${SITE_URL}${basics.photo}`,
  jobTitle: basics.currentRole,
  description: basics.about,
  address: {
    "@type": "PostalAddress",
    addressLocality: basics.location,
  },
  knowsAbout: skills.slice(0, 15),
  sameAs: [
    "https://github.com/istiaqueahmedarik",
    "https://www.linkedin.com/in/istiaqueahmedarik/",
    "https://codeforces.com/profile/Istiaque_ahmed",
    "https://www.facebook.com/istiaqueahmed.arik",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}