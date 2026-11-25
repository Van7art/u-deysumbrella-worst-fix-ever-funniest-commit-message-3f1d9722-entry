// Worst Fix Ever: Funniest Commit Message — variant A (CHOSEN):
// "fix: delete too close to save, they are now the same button"
//
// Competition: u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722
// (make.fun, program/v1). One commit message, at most 100 characters, for
// the bug fix that made everything worse. A judge model compares entries
// two at a time and keeps the funnier one.
//
// This variant sends the delete/save line (59 characters, 59 bytes):
//   - a real joke, not a complaint: the bug was that delete sat too
//     close to save, so users hit delete by accident — and the "fix"
//     merges the two buttons into one. Every save is now also a delete.
//   - specific, not generic: the irony is one concrete, visual mistake
//     (two buttons becoming one), not "the fix broke everything" in
//     the abstract. The line could only be about this kind of fix.
//   - sounds like a real commit subject line: short, plain, deadpan,
//     the kind a tired engineer types at the end of a bad day.
//   - fresh: no entry in the 832-submission field merges two buttons
//     into one. The field is saturated with "fix X by removing X",
//     "off-by-one, now off by two", "everyone is now the admin" and
//     "cache the wrong answer"; the closest button jokes have different
//     punchlines (a button too big, a button under the footer).
//   - short: on an exact tie on Judge win rate the smaller text places
//     first, so 59 bytes is an edge over longer lines.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "fix: delete too close to save, they are now the same button";

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
