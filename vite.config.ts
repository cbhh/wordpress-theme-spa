import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteExternalsPlugin } from "vite-plugin-externals";
import { createHtmlPlugin } from "vite-plugin-html";
import prismjs from "vite-plugin-prismjs";
import { resolve } from "path";
import blocks from "./generateHead";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        createHtmlPlugin({
            minify: true,
            inject: {
                data: blocks,
            },
        }),
        viteExternalsPlugin(
            {
                vue: "Vue",
                pinia: "Pinia",
                "vue-router": "VueRouter",
                prismjs: "Prism"
            },
            {
                disableInServe: true,
            }
        ),
        prismjs({
            languages: ["javascript", "css", "markup", "typescript"],
            plugins: [
                "line-numbers",
                "autoloader",
                "show-language",
                "copy-to-clipboard",
            ],
            css: true,
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: "js/[hash].js",
                entryFileNames: "js/[hash].js",
                assetFileNames: "[ext]/[hash].[ext]",
            },
        },
        cssCodeSplit: false,
    },
    resolve: {
        alias: {
            "@": resolve("src"),
            "@sty": resolve("src/style"),
            "@wpAppConfig": resolve("./app.config.json"),
            "@ass": resolve("src/assets"),
        },
    },
});
