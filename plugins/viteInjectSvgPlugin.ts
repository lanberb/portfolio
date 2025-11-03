import type { PluginOption } from "vite";
import fs from "fs";
import path from "path";

export const viteInjectSvgPlugin = (): PluginOption => {
  return {
    name: "vite-inject-svg-plugin",
    transformIndexHtml: (html) => {
      const svgDir = path.resolve(__dirname, "src/assets/images/common/");
      console.log(svgDir);
      console.log(svgDir);
      console.log(svgDir);
      console.log(svgDir);
      console.log(svgDir);
      // const svg = fs.readFileSync(path.resolve(__dirname, "..", "index.html"), "utf-8");
      // return html.replace(/<div id="svg-container"><\/div>/, `<div id="svg-container">${svg}</div>`);
    },
  };
};