import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {ViteAliases} from "vite-aliases";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteAliases({
      useConfig: true,
      useTypescript: true,
      deep: true,
      depth: 2,
      adjustDuplicates: true,
    }),
  ],
  resolve: {
    extensions: [".vue"],
  },
});
