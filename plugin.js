import sharp from "sharp";
const id = "@virtualAsset";

async function genCode(isVite, ctx) {
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
      srcs[size] = isVite
        ? `__VITE_ASSET__${ref}__`
        : `replaceStartimport.meta.ROLLUP_FILE_URL_${ref}replaceEnd`;
    }
  }
  let code = JSON.stringify(data);
  if (!isVite)
    code = code.replace(
      /"replaceStart(import\.meta\.ROLLUP_FILE_URL_[0-9a-f]+)replaceEnd"/g,
      "$1"
    );
  return `export default ${code};`;
}

export default function (isVite) {
  return {
    name: "test",
    resolveId(x) {
      if (x === id) return x;
    },
    load(x) {
      if (x === id) return genCode(isVite, this);
    },
  };
}
