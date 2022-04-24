import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// @ts-ignore
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],

  resolve: {
    alias: {
      // https://vitejs.dev/config/#alias
      "@": path.resolve(__dirname, "src"),
      "@lib": path.resolve(__dirname, "src", "lib"),
    },
  },
});
