// Worst Fix Ever: Funniest Commit Message — variant C (third):
// "fix: app down, the status page now says it is up"
//
// Competition: u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722
// (make.fun, program/v1). One commit message, at most 100 characters, for
// the bug fix that made everything worse. A judge model compares entries
// two at a time and keeps the funnier one.
//
// This variant sends the status-page line (48 characters, 48 bytes):
//   - a real joke: the app is down, so the "fix" repairs the status
//     page instead of the app. The outage is unchanged; only the report
//     of it is fixed. It is the "fix the metric, not the problem" joke,
//     told in one deadpan line.
//   - specific: the irony is precise — the repair fixes the reporting
//     of the failure, not the failure.
//   - sounds like a real commit subject line: short, plain, deadpan.
//   - fresh in this field: no entry in the 832 submissions says the
//     status page now reports the app as up (the closest, "Silence
//     Achieved, Uptime Unknown", is a different punchline).
//   - shortest of the three: 48 characters, 48 bytes, the best edge on
//     the tie-break (smaller text places first on an exact tie).
// Why it lost to variants A and B: the joke is a known ops-culture
// one-liner ("the status page says up"), so it scores worse on the
// judge's freshness criterion than the same-button and settings-PDF
// lines, whose punchlines are new. It is also the least visual of the
// three — it is clever, where the other two are funny at once.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "fix: app down, the status page now says it is up";

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
