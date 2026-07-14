import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const assetName = `cloud-wellbeing-coaching-v${pkg.version}.tar.gz`;
const assetPath = path.join(root, assetName);
const included = [
  "manifest.json",
  "SKILL.md",
  "skills",
  "adapters",
  "dist",
  "README.md",
  "ATTRIBUTION.md",
  "NOTICE.md",
  "SOURCES.md",
  "DISCLAIMER.md",
  "LICENSE",
  "LICENSE-CONTENT"
];

const check = spawnSync(process.execPath, [path.join(root, "scripts/catalog.mjs"), "--check"], { cwd: root, stdio: "inherit" });
if (check.status !== 0) process.exit(check.status ?? 1);

const result = spawnSync("tar", ["-czf", assetPath, ...included], { cwd: root, stdio: "inherit" });
if (result.status !== 0) process.exit(result.status ?? 1);

const digest = crypto.createHash("sha256").update(fs.readFileSync(assetPath)).digest("hex");
fs.writeFileSync(path.join(root, "SHA256SUMS"), `${digest}  ${assetName}\n`);
console.log(`Created ${assetName}`);
