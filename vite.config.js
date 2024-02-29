import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@components", replacement: "/src/components" },
      { find: "@pages", replacement: "/src/Pages" },
      { find: "@layout", replacement: "/src/layout" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@icons", replacement: "/src/assets/icons" },
      { find: "@images", replacement: "/src/assets/images" },
    ],
  },
});
