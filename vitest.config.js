import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    alias: {
      "@constants": "/src/constants/index.js",
      "@common": "/src/common",
      "@sounds": "/src/assets/sounds",
      "@slices": "/src/store/slices",
      "@hooks": "/src/hooks",
      "@utils": "/src/utils",
      "@i18n": "/src/i18n",
      "@locales": "/src/locales",
    },
  },
});
