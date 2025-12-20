import fs from "fs";

const cssFilePath = process.cwd() + "/public/fonts/remixicon/remixicon.css";

const css = fs.readFileSync(cssFilePath, "utf8");

const iconRegex = /\.ri-([a-zA-Z0-9_-]+)/g;
const icons = new Set<string>();

let match;
while ((match = iconRegex.exec(css))) {
  icons.add(match[1]);
}

const output = `
// AUTO-GENERATED — DO NOT EDIT
export const RemixIcon = ${JSON.stringify([...icons], null, 2)} as const;
export type RemixIconName = typeof RemixIcon[number];
`;

fs.writeFileSync("./types/remixicons.d.ts", output);
