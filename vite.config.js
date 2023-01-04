import { defineConfig } from "vite";
import path from "path";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
    plugins: [viteCompression()],
    build: {
        // //   root: path.join(__dirname, "src"),
        outDir: path.join(__dirname, "build"),
    },
    // //   input: "src/index.js",
    server: {
        open: true,
    },
});