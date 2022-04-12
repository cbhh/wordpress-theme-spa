import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import externalGlobals from "rollup-plugin-external-globals";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	build: {
		rollupOptions: {
			external: ["vue", "vuex", "vue-router"],
			plugins: [
				externalGlobals({
					vue: "Vue",
					vuex: "Vuex",
					"vue-router": "VueRouter",
				}),
			],
			input:
				process.env.NODE_ENV === "production" ? "index.production.html" : "index.html"
		},
	},
	resolve: {
		alias: {
			"@": path.resolve("src"),
			"@sty": path.resolve("src/style"),
		}
	}
})
