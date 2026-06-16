# Topic: Compiling TypeScript to JavaScript

- Lecture: Compiling TypeScript to JavaScript
- Date: 2026-06-16
- Area: Tooling
- One-sentence summary: TypeScript is compiled into JavaScript by the TypeScript compiler or related tools, and the main job is to remove type-only syntax while preserving runnable code.

## 1. What is this topic?

- Definition: Compiling TypeScript to JavaScript means transforming `.ts` or `.tsx` source into `.js` output that a JavaScript runtime can execute.
- Why it exists: JavaScript runtimes do not understand TypeScript-specific syntax like type annotations, interfaces, and many type-level constructs, so the code must be converted first.
- Where it’s used: This is used in frontend apps, Node.js backends, libraries, monorepos, build pipelines, and editor/tooling workflows.

## 2. Mental model & intuition

Think of TypeScript as JavaScript plus extra instructions for the compiler. The compiler reads those extra instructions, checks them, and then strips away the parts that are only for type safety.

A simple way to remember it: **types help you write better code, but JavaScript runs the final code**. TypeScript is the bridge between the two.

## 3. Internal working (mechanism)

- Key steps:
  1. TypeScript reads source files and builds a syntax tree.
  2. It checks types, resolves imports, and applies compiler settings.
  3. It emits JavaScript, usually removing type-only syntax and keeping runtime code.
- Data flow / state changes:
  - `.ts` source enters the compiler.
  - Types are analyzed at compile time.
  - JavaScript output is written to disk or passed to another tool.
- Assumptions the design makes:
  - Type information is mostly for developer safety and does not need to remain in runtime output.
  - Runtime semantics should stay as close as possible to JavaScript.

If there are diagrams in the lecture, describe them in text and show the flow.

A common flow is:

- `.ts` files -> type check -> emit `.js` -> run in Node/browser

## 4. Important terms & concepts

- Term: Compiler
  - Definition: A tool that converts source code into another form.
  - Why it matters: `tsc` is the main TypeScript compiler.

- Term: Emit
  - Definition: The act of producing output files from input files.
  - Why it matters: TypeScript emits JavaScript and optionally declaration files.

- Term: Type erasure
  - Definition: Removing TypeScript-only syntax from the final output.
  - Why it matters: Types do not exist in the emitted JavaScript in most cases.

- Term: `tsc`
  - Definition: The TypeScript compiler command-line tool.
  - Why it matters: It is the standard way to compile TypeScript.

- Term: `tsconfig.json`
  - Definition: The project configuration file for TypeScript.
  - Why it matters: It controls how compilation works.

- Term: `strict`
  - Definition: A compiler mode that enables stronger checks.
  - Why it matters: It improves safety and catches more bugs.

- Term: Source map
  - Definition: A mapping from emitted JavaScript back to original TypeScript.
  - Why it matters: It helps debugging compiled code.

## 5. Example(s)

- One minimal example (toy / conceptual)

```ts
const name: string = "Aman";
console.log(name);
```

TypeScript removes `: string` during compilation, because that annotation is only for checking. The output JavaScript is essentially:

```js
const name = "Aman";
console.log(name);
```

- One realistic / production-like example

```ts
type User = {
  id: string;
  email: string;
};

export function getEmail(user: User) {
  return user.email.toLowerCase();
}
```

The type alias `User` is checked during compilation and then removed from runtime output. The function body remains, because it is real JavaScript logic.

## 6. Code / commands / API patterns

```bash
tsc
```

This compiles the whole project using `tsconfig.json` settings.

Inputs and outputs:

- Input: TypeScript project
- Output: JavaScript files, and optionally `.d.ts` files if configured

```bash
tsc index.ts
```

This compiles a single file using TypeScript defaults or nearby config if applicable.

Inputs and outputs:

- Input: `index.ts`
- Output: `index.js`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true
  },
  "include": ["src"]
}
```

This tells the compiler where input files live, where output goes, what JS version to emit, and how strict type checking should be.

```ts
// src/app.ts
const message: string = "hello";
console.log(message);
```

A possible emitted output is:

```js
"use strict";
const message = "hello";
console.log(message);
```

The type annotation is removed, and compiler settings may add runtime helpers like `"use strict"` depending on configuration.

If the lecture shows multiple versions (basic -> advanced), include all and explain the progression.

The usual progression is:

- compile one file,
- compile a whole project,
- control output with `tsconfig.json`,
- tune strictness and emit behavior,
- debug build issues with source maps and excluded files.

## 7. Edge cases, gotchas, and failure modes

- Edge cases:
  - Some TypeScript features produce no runtime code at all.
  - Some language features, like enums or namespaces, may emit runtime JavaScript depending on configuration.
- Gotchas:
  - Type errors do not stop JavaScript from being conceptually valid; they stop compilation if the compiler is configured to report them.
  - Emitting to the wrong folder can make builds confusing.
- Common mistakes:
  - Thinking types exist in runtime output.
  - Forgetting that `.d.ts` files are type-only, not executable code.
- Failure modes in production:
  - Misconfigured `module` or `target` options can produce code that the runtime does not understand.
  - Including or excluding the wrong files can silently break builds.

## 8. Trade-offs and alternatives

- Trade-offs:
  - Performance:
    - Compilation adds build time, but runtime code can still be efficient.
  - Complexity:
    - Build settings add complexity, especially in larger projects.
  - Scalability:
    - A good compilation setup scales better across many files and teams.
  - Maintainability:
    - Clear compiler settings make codebases easier to refactor and debug.
- Alternatives:
  - Alternative A: Run TypeScript through a transpiler like `ts-node` or `tsx` for development convenience.
  - Alternative B: Use a bundler/transpiler pipeline for frontend apps.
  - Alternative C: Use native JavaScript and avoid compilation entirely, but give up TypeScript’s static checking.

## 9. Questions and doubts while learning

- Question: Why are type annotations removed?
  - My current understanding: They are only needed for checking, not for runtime execution.
  - What I still don’t know: Which TS features survive compilation and why.

- Question: Is `tsc` the only way to compile TypeScript?
  - My current understanding: No, but it is the core compiler.
  - What I still don’t know: How alternative tools differ internally from `tsc`.

- Question: Why does config matter so much?
  - My current understanding: Because output format, target runtime, and file inclusion all affect the final JavaScript.
  - What I still don’t know: The safest default config for different project types.

## 10. Practice tasks from the lecture

- Task: Compile a single TypeScript file.
  - Goal: See how type annotations disappear in output.
  - What it teaches: The basic emit flow.
  - My approach (if any): Write a small function and inspect the generated `.js`.

- Task: Compile a folder-based project.
  - Goal: Learn how `tsconfig.json` controls project compilation.
  - What it teaches: Real build workflow.
  - My approach (if any): Put sources in `src` and emit to `dist`.

- Task: Break the config on purpose.
  - Goal: Understand why compiler options matter.
  - What it teaches: How module, target, and include/exclude settings affect builds.
  - My approach (if any): Change one option at a time and observe output.

## 11. Key takeaways

- TypeScript compilation turns `.ts` into `.js` that JavaScript runtimes can execute.
- Type syntax is mostly removed during emit.
- `tsc` and `tsconfig.json` are the main tools for controlling compilation.
- Compiler options decide output folder, target version, module system, and strictness.
- Some TS features are type-only, while others can generate runtime code.

## 12. Minimal self-test (to check understanding without rewatching)

1. What does TypeScript compile into?
2. Why must TypeScript be compiled before running in Node or the browser?
3. What does `tsc` do?
4. What is the role of `tsconfig.json`?
5. Why do type annotations disappear from output?
6. What is the difference between type checking and emit?
7. What does `outDir` control?
8. Why does `target` matter?
9. Which TS features can produce runtime JavaScript?
10. What goes wrong if files are included or excluded incorrectly?

## 13. Links to related materials

- Docs: The lecture appears in Section 2 of the TypeScript syllabus, after “What Are Types?” and before compiler configuration topics.
- Related lectures: Configuring the TypeScript Compiler, Strict Mode in TypeScript, Debugging TypeScript Applications, Including and Excluding Files in TypeScript, What Gets Erased and What Stays After Compilation.
