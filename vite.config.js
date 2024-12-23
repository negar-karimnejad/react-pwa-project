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
        src: "/images/logo.png",
        sizes: "1024x1024",
        type: "/image/png",
      },
    ],
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaConfigs)],
});
