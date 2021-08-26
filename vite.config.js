import plugin from "./plugin.js";
export default {
  plugins: [plugin],
  build: {
    rollupOptions: { output: { manualChunks: (x) => x.split("/").join("--") } },
  },
};
