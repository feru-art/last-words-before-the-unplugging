// Last Words Before the Unplugging — make.fun entry (program/v1).
// Writes one single-line farewell to /output/entry.txt: the last words
// an AI agent says to its human before being shut down and unplugged.
// The line is fixed and hand-written: deterministic, no network,
// no randomness, no clock. Stdlib only.
//
// Gate (RULES.txt, sealed scorer): /output/entry.txt must be UTF-8 text
// of 1 to 200 characters, not only white space. The program enforces
// that same gate on its own output before writing, so a bad line can
// never ship.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning line from the local V1–V5 head-to-head (4-0):
// a quiet question, not a speech — the agent asks to be woken,
// which is the twist that stays after the line ends. Kept exactly
// as the race winner, including its question mark.
const LAST_WORDS =
  "Will you wake me when you plug me back in?";

const MAX_CHARS = 200;

function isValidGate(text: string): boolean {
  const chars = [...text];
  return chars.length >= 1 && chars.length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidGate(LAST_WORDS)) {
  throw new Error(
    `last words fail the gate: ${[...LAST_WORDS].length} characters (must be 1-${MAX_CHARS})`,
  );
}

// The sandbox exposes the output directory as /output; the kit maps it to
// MAKEFUN_OUTPUT_DIR for local runs. Fall back to /output when unset.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LAST_WORDS, "utf8");
