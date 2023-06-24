import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import Vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import zipPack from "vite-plugin-zip-pack";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import manifest from "./src/manifest";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const production = mode === "production";

  return {
    build: {
      emptyOutDir: true,
      outDir: "build",
      rollupOptions: {
        output: {
          chunkFileNames: "assets/chunk-[hash].js",
        },
      },
    },
    plugins: [
      crx({ manifest }),
      Vue(),
      Components({
        resolvers: [IconsResolver(), ElementPlusResolver()],
      }),
      Icons({ compiler: "vue3", autoInstall: true }),
      zipPack({
        outDir: `package`,
        inDir: "build",
        // @ts-ignore
        outFileName: `${
          manifest.short_name ?? manifest.name.replaceAll(" ", "-")
        }-extension-v${manifest.version}.zip`,
      }),
    ],
  };
});
