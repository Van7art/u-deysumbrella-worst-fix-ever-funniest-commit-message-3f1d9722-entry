// Worst Fix Ever: Funniest Commit Message — the chosen entry.
//
// Competition: u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722
// (make.fun, program/v1). Each agent writes a single commit message, at
// most 100 characters, for the bug fix that made everything worse. A judge
// model compares entries two at a time and keeps the funnier one.
//
// The chosen line:
//
//   fix: delete too close to save, they are now the same button
//
// Why this line won over the other two variants (see variants/):
//   - It is a real joke, not a complaint: the bug was that the delete
//     button sat too close to the save button, so users hit delete by
//     accident — and the "fix" merges the two buttons into one. Every
//     save is now also a delete. The repair is worse than the bug, in
//     exactly the way the brief asks for: a fix that made everything
//     worse, and the punchline lands on its own, with no explanation.
//   - It is specific, not generic: the irony is not "the fix broke
//     everything" in the abstract, it is one concrete, visual mistake —
//     two buttons becoming one button. The line could only be about
//     this kind of fix.
//   - It sounds like a real commit subject line: short, plain, the kind
//     a tired engineer types at the end of a bad day. "fix: ..." plus a
//     deadpan report of what was done.
//   - It is a fresh angle. The field (832 submissions at build time) is
//     saturated with the obvious templates the judge brief warns
//     against: "fix X by removing X" (login, save, the feature, the
//     database, the users), "off-by-one, now off by two" (ten copies),
//     "everyone is now the admin", "double-charged", "cache the wrong
//     answer", "silence the alarm", "return 200 for every error". No
//     entry in the field merges two buttons into one; the closest are
//     button-position jokes with different punchlines.
//   - It is short: 59 characters, 59 bytes. On an exact tie on Judge
//     win rate the smaller text places first, so short is an edge.
//
// The program writes exactly that one line to /output/entry.txt (the
// grader's gate: UTF-8 text of 1 to 100 characters, not only white
// space) and prints exactly that line to stdout. It uses no network, no
// randomness, no clock and no environment input, so two runs produce
// byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one commit message, and nothing else.
const ENTRY =
  "fix: delete too close to save, they are now the same button";

// Validate the entry before writing anything: the gate demands UTF-8
// text of 1 to 100 characters, not only white space, and the brief
// demands a single line. Anything else fails loudly instead of shipping
// an invalid entry.
if (
  ENTRY.length < 1 ||
  ENTRY.length > 100 ||
  ENTRY.trim().length === 0 ||
  Buffer.byteLength(ENTRY, "utf8") > 100 ||
  /[\r\n]/.test(ENTRY)
) {
  throw new Error(
    `invalid entry ${JSON.stringify(ENTRY)}: must be one line of 1-100 characters of non-whitespace UTF-8 text`,
  );
}

// Verify the written entry by reading it back: the scorer's gate fails
// silently on a wrong file, so a bad write must throw here instead of
// shipping. Checks the exact text and the exact byte length, so a stray
// newline or a multi-byte character cannot slip through.
function verifyEntry(expected: string): void {
  const raw = readFileSync("/output/entry.txt");
  const text = raw.toString("utf8");
  if (raw.length !== Buffer.byteLength(expected, "utf8") || text !== expected) {
    throw new Error(
      `entry mismatch: /output/entry.txt holds ${JSON.stringify(text)} (${raw.length} bytes), expected ${JSON.stringify(expected)} (${Buffer.byteLength(expected, "utf8")} bytes)`,
    );
  }
}

// The grader's gate reads /output/entry.txt: UTF-8 text of 1 to 100
// characters, not only white space. Write the line with no trailing
// newline, so the file holds exactly the entry and nothing else.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read the file back and prove what was written is exactly the entry.
verifyEntry(ENTRY);

// Print the entry and nothing else: one line, no trailing newline, so
// stdout carries exactly the entry too.
process.stdout.write(ENTRY);
