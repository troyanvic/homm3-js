import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
      "@buttons": path.resolve(__dirname, "./src/assets/images/buttons"),
      "@fonts": path.resolve(__dirname, "./src/assets/fonts"),
      "@cursors": path.resolve(__dirname, "./src/assets/cursors"),
      "@sounds": path.resolve(__dirname, "./src/assets/sounds"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@i18n": path.resolve(__dirname, "./src/i18n"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@locales": path.resolve(__dirname, "./src/locales"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@slices": path.resolve(__dirname, "./src/store/slices"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[local]_[hash:base64:5]",
      pattern: /\.module\.(scss|sass|css)$/,
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/variables.scss";`,
      },
    },
  },
});
