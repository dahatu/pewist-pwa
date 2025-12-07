import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "?application=true",
    name: "پێویست",
    short_name: "پێویست",
    description: "کڕین و فرۆشی کالای دەستی دوو",
    start_url: "./?application=true",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
