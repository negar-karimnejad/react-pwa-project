import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const pwaConfigs = {
  injectRegister: "inline",
  manifest: {
    name: "مدرسه آموزش برنامه نویسی",
    short_name: "مدرسه آموزش برنامه نویسی",
    description: "مدرسه آموزش برنامه نویسی",
    background_color: "#0969DA",
    theme_color: "#0969DA",
    display: "standalone",
    orientation: "portrait",
    scope: "/",
    start_url: "/",
    icons: [
      {
        src: "/icons/icon-48x48.png",
        sizes: "48x48",
        type: "/image/png",
      },
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "/image/png",
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "/image/png",
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "/image/png",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "/image/png",
      },
      {
        src: "/icons/icon-256x256.png",
        sizes: "256x256",
        type: "/image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "/image/png",
      },
    ],
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaConfigs)],
});
