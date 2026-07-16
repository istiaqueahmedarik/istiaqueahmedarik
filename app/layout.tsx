import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Istiaque Ahmed Arik | Software Engineer",
  description:
    "Portfolio of Istiaque Ahmed Arik, a Software Engineer specializing in full-stack development and robust systems.",
  keywords: [
    "Istiaque Ahmed Arik",
    "Software Engineer",
    "Portfolio",
    "Next.js",
    "Full Stack",
  ],
  openGraph: {
    title: "Istiaque Ahmed Arik | Software Engineer",
    description:
      "Portfolio of Istiaque Ahmed Arik, a Software Engineer specializing in full-stack development and robust systems.",
    url: "https://istiaqueahmedarik.vercel.app",
    siteName: "Istiaque Ahmed Arik",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Istiaque Ahmed Arik | Software Engineer",
    description:
      "Portfolio of Istiaque Ahmed Arik, a Software Engineer specializing in full-stack development and robust systems.",
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
