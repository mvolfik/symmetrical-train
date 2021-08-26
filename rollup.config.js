import plugin from "./plugin.js";
export default {
  plugins: [plugin],
  output: { manualChunks: (x) => x.split("/").join("--") },
};
