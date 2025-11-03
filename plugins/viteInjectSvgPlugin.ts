import type { PluginOption } from "vite";
import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";

export const viteInjectSvgPlugin = (): PluginOption => {
  return {
    name: "vite-inject-svg-plugin",
    transformIndexHtml: async (html) => {
      const iconsDir = path.resolve(__dirname, "../src/assets/images/icons/");
      const iconImageNames = fs.readdirSync(iconsDir);

      const tasks = iconImageNames.map((iconImageName) => fs.readFileSync(path.resolve(iconsDir, iconImageName), "utf-8"));
      const iconHtmlString = (await Promise.all(tasks)).join("").replace(/\n/g, "");

      const DOM = new JSDOM(html);
      const iconsContainer = DOM.window.document.querySelector("#icons");
      if (iconsContainer) {
        iconsContainer.innerHTML = iconHtmlString;
      }
      return DOM.serialize();
    },
  };
};