import assetData from "@virtualAsset";

const content = document.querySelector("#app");

for (const [format, srcset] of Object.entries(assetData)) {
  const p = document.createElement("p");
  p.insertAdjacentText("beforeend", `${format}: `);
  for (const [w, src] of Object.entries(srcset)) {
    p.insertAdjacentText("beforeend", ` ${w}w: `);
    let img = document.createElement("img");
    img.src = src;
    p.insertAdjacentElement("beforeend", img);
  }
  content.insertAdjacentElement("beforeend", p);
}
console.log(assetData);
