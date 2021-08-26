import sharp from "sharp";
const id = "@virtualAsset";

async function genCode(ctx) {
  const base = sharp("kitten.jpeg");
  const data = { webp: {}, jpeg: {} };
  for (const [format, srcs] of Object.entries(data)) {
    for (const size of [200, 350, 500]) {
      const buffer = await base
        .clone()
        .resize({ width: size })
        .toFormat(format)
        .toBuffer();
      const ref = ctx.emitFile({
        name: `img-${size}.${format}`,
        type: "asset",
        source: buffer,
      });
      srcs[size] = `replaceStartimport.meta.ROLLUP_FILE_URL_${ref}replaceEnd`;
    }
  }
  const code = JSON.stringify(data, null, 2).replace(
    /"replaceStart(.*?)replaceEnd"/g,
    "$1"
  );
  console.log("\n", code);
  return `export default ${code};`;
}

export default {
  name: "test",
  resolveId(x) {
    if (x === id) return x;
  },
  load(x) {
    if (x === id) return genCode(this);
  },
};
