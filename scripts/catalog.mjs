import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const checkOnly = process.argv.includes("--check");
const skillsRoot = path.join(root, "skills");

const skillPaths = walk(skillsRoot)
  .filter((file) => path.basename(file) === "SKILL.md")
  .map(relative)
  .sort((a, b) => a.localeCompare(b));

const skills = skillPaths.map((skillPath) => {
  const absolute = path.join(root, skillPath);
  const content = fs.readFileSync(absolute, "utf8");
  const id = frontmatter(content, "id");
  const kind = frontmatter(content, "kind");
  const expectedKind = skillPath.startsWith("skills/system/") ? "system" : skillPath.startsWith("skills/core/") ? "core" : "profile";
  if (!id) throw new Error(`Missing id in ${skillPath}`);
  if (kind !== expectedKind) throw new Error(`Expected kind ${expectedKind} in ${skillPath}, found ${kind || "none"}`);
  const referencePath = path.posix.join(path.posix.dirname(skillPath), "REFERENCE.md");
  const references = fs.existsSync(path.join(root, referencePath))
    ? [{ path: referencePath, sha256: checksum(fs.readFileSync(path.join(root, referencePath))) }]
    : [];
  return {
    id,
    name: frontmatter(content, "name") || id,
    kind,
    category: frontmatter(content, "category") || (kind === "system" ? "system" : "well-being"),
    path: skillPath,
    references,
    activation: kind === "system" ? "always" : kind === "profile" ? "optional" : "routed",
    max_context_chars: positiveInteger(frontmatter(content, "max_context_chars")),
    sha256: checksum(Buffer.from(content)),
    creator: frontmatter(content, "creator") || undefined,
    license: frontmatter(content, "license") || "CC-BY-4.0"
  };
});

const duplicate = skills.find((skill, index) => skills.findIndex((candidate) => candidate.id === skill.id) !== index);
if (duplicate) throw new Error(`Duplicate skill id: ${duplicate.id}`);

const manifest = `${JSON.stringify({
  schema_version: 1,
  catalog_version: pkg.version,
  released_at: "2026-07-14",
  license: "CC-BY-4.0",
  skills
}, null, 2)}\n`;

const completePrompt = [
  "# CLOUD Wellbeing Coaching — Complete Library",
  "",
  `Catalogue version ${pkg.version}. Generated from the canonical modules in \`skills/\`.`,
  "",
  "Use both system modules for every exchange. Select core modules only when their use_when conditions fit. Apply optional profile modules only with the user's knowledge and consent.",
  "",
  ...skills.map((skill) => {
    const content = fs.readFileSync(path.join(root, skill.path), "utf8").trim();
    return `\n---\n\n## ${skill.kind.toUpperCase()}: ${skill.name}\n\n${content}\n`;
  })
].join("\n").replace(/\n{4,}/g, "\n\n\n").trimEnd() + "\n";

writeOrCheck("manifest.json", manifest);
writeOrCheck("dist/cloud-complete.md", completePrompt);

console.log(`${checkOnly ? "Validated" : "Generated"} ${skills.length} skills for catalogue ${pkg.version}.`);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : entry.isFile() ? [file] : [];
  });
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function frontmatter(content, key) {
  const match = content.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return match?.[1]?.trim().replace(/^["']|["']$/g, "") ?? "";
}

function positiveInteger(value) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) throw new Error(`Invalid positive integer: ${value}`);
  return parsed;
}

function checksum(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function writeOrCheck(file, expected) {
  const target = path.join(root, file);
  if (checkOnly) {
    if (!fs.existsSync(target) || fs.readFileSync(target, "utf8") !== expected) {
      throw new Error(`${file} is stale. Run npm run build.`);
    }
    return;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, expected);
}
