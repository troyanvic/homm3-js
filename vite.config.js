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
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@i18n": path.resolve(__dirname, "./src/i18n"),
      "@locales": path.resolve(__dirname, "./src/locales"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@services": path.resolve(__dirname, "./src/services"),
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
