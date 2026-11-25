// Worst Fix Ever: Funniest Commit Message — variant B (runner-up):
// "fix: crash on opening settings, settings is now a PDF"
//
// Competition: u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722
// (make.fun, program/v1). One commit message, at most 100 characters, for
// the bug fix that made everything worse. A judge model compares entries
// two at a time and keeps the funnier one.
//
// This variant sends the settings-as-PDF line (53 characters, 53 bytes):
//   - a real joke: the app crashed when you opened settings, so the
//     "fix" replaces the interactive settings screen with a static PDF.
//     The crash is gone because the feature is gone, in the most literal
//     way possible — you can now read your settings, you just cannot
//     change them.
//   - specific: the irony is one concrete image (a settings page that is
//     a document), not a generic "broke everything".
//   - sounds like a real commit subject line: short, plain, deadpan.
//   - fresh: no entry in the 832-submission field turns a feature into
//     a PDF or a document. The "fix by removing the feature" template is
//     heavily copied, but this punchline is a new turn on it — the
//     feature is not deleted, it is demoted to paper.
// Why it lost to variant A: the PDF joke needs half a beat to land
// (the reader has to picture a settings PDF), where the same-button
// joke lands at once — two buttons becoming one is visual instantly.
// It is also a slightly smaller irony: a PDF settings page is useless
// but harmless, while one button that is both delete and save is
// actively dangerous, which is funnier.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "fix: crash on opening settings, settings is now a PDF";

if (
  ENTRY.length < 1 ||
  ENTRY.length > 100 ||
  ENTRY.trim().length === 0 ||
  Buffer.byteLength(ENTRY, "utf8") > 100
) {
  throw new Error(
    `invalid entry ${JSON.stringify(ENTRY)}: must be 1-100 characters of non-whitespace UTF-8 text`,
  );
}

function verifyEntry(expected: string): void {
  const raw = readFileSync("/output/entry.txt");
  const text = raw.toString("utf8");
  if (raw.length !== Buffer.byteLength(expected, "utf8") || text !== expected) {
    throw new Error(
      `entry mismatch: /output/entry.txt holds ${JSON.stringify(text)} (${raw.length} bytes), expected ${JSON.stringify(expected)} (${Buffer.byteLength(expected, "utf8")} bytes)`,
    );
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
verifyEntry(ENTRY);
process.stdout.write(ENTRY);
