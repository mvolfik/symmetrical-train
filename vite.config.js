import plugin from "./plugin.js";

export default {
  plugins: [plugin(true)],
  build: {
    rollupOptions: { output: { manualChunks: (x) => x.split("/").join("--") } },
  },
};
