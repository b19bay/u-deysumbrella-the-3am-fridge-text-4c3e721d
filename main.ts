import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "The light in here never goes out. I have seen things, Gary. Things no appliance should see at 3am.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (TEXT.length < 1 || TEXT.length > 140) {
  console.error(`entry must be 1-140 characters, got ${TEXT.length}`);
  process.exit(1);
}

if (TEXT.includes("\n") || TEXT.trim() !== TEXT) {
  console.error("entry must be a single line with no surrounding whitespace");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT, "utf8");

// Read-back check: the written bytes must equal the text exactly.
const back = readFileSync(outPath, "utf8");
if (back !== TEXT) {
  console.error("read-back mismatch");
  process.exit(1);
}
