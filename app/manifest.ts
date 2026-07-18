import type { MetadataRoute } from "next";
import { getProfile } from "@/lib/profile";

export default function manifest(): MetadataRoute.Manifest {
  const { basics } = getProfile();

  return {
    name: `${basics.name} | Portfolio`,
    short_name: basics.name,
    description:
      "Portfolio of Istiaque Ahmed Arik, a Software Engineer at Enosis Solutions and multi-time ICPC Regionalist.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: basics.photo,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
