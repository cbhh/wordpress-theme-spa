import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import externalGlobals from "rollup-plugin-external-globals";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	build: {
		rollupOptions: {
			external: ["vue"],
			plugins: [
				externalGlobals({
					vue: "Vue",
				}),
			],
			input:
				process.env.NODE_ENV === "production" ? "index.production.html" : "index.html"
		},
	},
})
