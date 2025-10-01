import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  base: "/test-task__docusketch/",
  plugins: [vue()],
  server: {
    port: 3000,
    open: true,
  },
});
