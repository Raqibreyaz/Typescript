# Topic: Configuring the TypeScript Compiler (`tsconfig.json`)

- Lecture: Configuring the TypeScript Compiler
- Date: 2026-06-17
- Area: Tooling
- One-sentence summary: `tsconfig.json` tells TypeScript which files belong to your project, how strict type-checking should be, what JavaScript version to emit, and which module system (CommonJS/ESM/etc.) to generate.

---

## 1. What is this topic?

- Definition: Configuring the TypeScript compiler means setting options (usually in `tsconfig.json`) that control file inclusion, type-checking rules, output JS version, module format, and various safety/compatibility flags.
- Why it exists: Without configuration, the compiler would guess too much (which files to compile, what JS to emit, how strict to be), which quickly breaks down in real-world projects as they grow.
- Where it’s used: Every non-trivial TS project—Node backends, React apps, libraries, monorepos, test setups, and CI pipelines—relies on a carefully tuned `tsconfig.json` for predictable builds and type safety.

---

## 2. Mental model & intuition

Think of `tsconfig.json` as the **control panel** for your TS project:

- “What code is part of this project?” → `include`, `exclude`, `files`
- “How modern can the emitted JavaScript be?” → `target`
- “How should modules be wired at runtime?” → `module`
- “How strict should type-checking be?” → `strict` and friends.

A key intuition:

- **`target` = “language level”** (async/await, optional chaining, etc.).
- **`module` = “packaging / module loader shape”** (CommonJS vs ES modules vs Node16 hybrid).

They are **two separate axes**, even if both accept values like `"ES2020"` or `"ESNext"`; they don’t “fight” each other but combine to define “what syntax is emitted” and “how imports/exports are emitted”.

---

## 3. Internal working (mechanism)

### Key steps

1. **Read config**  
   TypeScript finds the nearest `tsconfig.json`, loads `compilerOptions`, `include`, `exclude`, and `files`.
2. **Select files**  
   It uses `files` (exact list), or else `include` + `exclude` glob patterns, to decide which files form the “program”.
3. **Type-check**  
   It builds an internal program, resolves imports, checks types according to `strict` and related flags.
4. **Emit JavaScript**  
   It erases type-only constructs and:
   - Downlevels JS syntax according to `target`.
   - Emits import/export code according to `module`.

### Data flow / state changes

- `.ts` / `.tsx` (and optionally `.js` / `.jsx` if `allowJs`) → parsed → type-checked → transformed to `.js` (plus `.d.ts` / sourcemaps if enabled).
- Directories are mapped from `rootDir` → `outDir` to preserve structure in the output, but `rootDir` itself does _not_ pick which files are compiled—that’s `include`/`exclude`/`files`.

### Assumptions the design makes

- Your runtime/browser/Node version determines what JS features it can handle, so you choose an appropriate `target`.
- Your runtime or bundler expects a particular module system, so you choose `module` to match it (CommonJS, ESM, Node16, etc.).
- File structure can be described via glob patterns, not arbitrary regex.

---

## 4. Important terms & concepts

- Term: `compilerOptions`
  - Definition: Object inside `tsconfig.json` that configures emit and checking behavior (e.g. `target`, `module`, `strict`, `rootDir`, `outDir`).
  - Why it matters: Almost all important behavior is driven from here.

- Term: `target`
  - Definition: The ECMAScript version (ES5, ES2017, ES2020, ESNext, etc.) that emitted JS should be compatible with, controlling **syntax downleveling** (e.g. how async/await, classes, etc. are transformed).
  - Why it matters: It decides which JS language features the final code can safely use in your runtime.

- Term: `module`
  - Definition: The **module output format**—how TS emits imports/exports: `CommonJS`, `ES2015`/`ES2020`, `ESNext`, `System`, `Node16`, `NodeNext`, etc..
  - Why it matters: It must match how the runtime loads modules; it controls the shape of `require` vs `import` vs ESM output.

- Term: `ESNext` (for `target` and `module`)
  - Definition:
    - For `target`: “highest JS version TS knows right now”; future TS versions may emit more modern syntax under the same `ESNext` label.
    - For `module`: “latest ES module semantics / preserved module syntax” (typically used when a bundler or modern Node takes over).
  - Why it matters: Convenient, but it can change behavior when you upgrade TypeScript, so use with care.

- Term: `rootDir`
  - Definition: Logical source root; TS uses it to compute relative paths from sources to outputs, e.g. `src/foo.ts` → `dist/foo.js` when `rootDir: "src", outDir: "dist"`.
  - Why it matters: Controls **layout**, not selection, of compiled files.

- Term: `outDir`
  - Definition: Directory where emitted JS (and `.d.ts`/sourcemaps) are written.
  - Why it matters: Keeps compiled output separated from source.

- Term: `include` / `exclude`
  - Definition: Arrays of **glob patterns** (not regex) telling TS which files to consider (`include`) and which to skip in that discovery (`exclude`).
  - Why it matters: They define the project’s file scope.

- Term: Glob pattern
  - Definition: Simple wildcard patterns:
    - `*` any number of characters except `/`
    - `?` any single character except `/`
    - `**/` any nested directories.
  - Why it matters: This is how you say `src/**/*.ts` or `**/*.spec.ts`.

- Term: Top-level `await` (TLA)
  - Definition: Using `await` in module scope without wrapping in an async function.
  - Why it matters: TS only allows it when `target >= ES2017` **and** `module` is `es2022`, `esnext`, `system`, `node16`, or `nodenext` (i.e. ESM-like environments), not with `CommonJS`.

---

## 5. Example(s)

### Minimal example: small project config

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["dist", "node_modules"]
}
```

What’s happening:

- `target: "ES2020"` → emit JS that assumes ES2020 features (e.g. optional chaining) are OK in your runtime. TS only downlevels features newer than ES2020.
- `module: "CommonJS"` → rewrite ES import/export to CommonJS (`require` / `exports`) for Node-style loaders.
- `rootDir: "src"` + `outDir: "dist"` → keep folder structure, e.g. `src/api/index.ts` → `dist/api/index.js`.
- `include: ["src/**/*.ts"]` → include all `.ts` files under `src` using a **glob**, not regex.
- `exclude` avoids compiling built artifacts and deps.

### Top-level await example: valid vs invalid

You want to write:

```ts
// index.ts
const data = await fetchData();
console.log(data);
```

To make this compile:

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ES2022"
  }
}
```

- `target >= "ES2017"` and `module` is ESM-like (`es2022`, `esnext`, `system`, `node16`, `nodenext`) gives you top-level await.

Invalid combo:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS"
  }
}
```

With this, top-level `await` **fails**: TS reports TS1378/TS1309 because CommonJS modules are synchronous and do not support top-level await semantics, even though `target` is modern. This directly answers your earlier question: `target: "ES2020"` does _not_ “force everything to be ESM”; module kind still rules.

---

## 6. Code / commands / API patterns

```bash
tsc --init
```

- What it does: Generates a starter `tsconfig.json` with commented options in the current folder.
- Input: Project root directory.
- Output: A config you can edit instead of starting from scratch.

```bash
tsc
```

- What it does: Reads `tsconfig.json`, selects files using `include`/`exclude`/`files`, type-checks, and emits JS to `outDir` (or alongside sources if `outDir` is not set).
- Input: Project source tree.
- Output: JavaScript (and `.d.ts`/sourcemaps if configured).

Typical Node/ESM-ish config:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true
  },
  "include": ["src"]
}
```

- Here `module: "NodeNext"` instructs TS to emit ESM or CJS depending on file extension and `package.json`’s `"type"`, and it implicitly behaves like `target: "ESNext"` (NodeNext implies ESNext-like target).
- This is suitable for modern Node projects that use native ESM and want top-level await with correct semantics.

Glob examples:

```json
{
  "include": ["src/**/*"],
  "exclude": ["src/**/*.spec.ts", "dist", "node_modules"]
}
```

- `src/**/*` includes everything under `src`.
- `src/**/*.spec.ts` excludes all test files with `.spec.ts` extension using a **glob**, not a regex

---

## 7. Edge cases, gotchas, and failure modes

- Edge cases:
  - `target: "ESNext"` changes meaning as TypeScript evolves—the “latest” feature set moves, so upgrading TS can change your emitted syntax without modifying `tsconfig.json`.
  - `module: "NodeNext"` or `"Node16"` interacts with `package.json`’s `"type"` (`"module"` vs default CJS) and file extensions to decide whether to emit ESM or CJS per file.

- Gotchas:
  - `target` **does not** choose CommonJS vs ESM; that’s purely `module`’s job. You can happily have `target: "ES2020", module: "CommonJS"` (very common).
  - `module` **does not** imply ES5 vs ES2020 transforms; that’s `target`’s job, so `module: "ES2020"` with `target: "ES5"` is also valid but will downlevel syntax while still using ESM-like modules.
  - `rootDir` is not a filter; it does not pick files. Only `files` or `include` + `exclude` decide which files are compiled.
  - `include` / `exclude` use **glob wildcards**, not full regex—you can’t use things like `.*\.spec\.ts`, but you can use `**/*.spec.ts`.

- Common mistakes:
  - Thinking “`module: "CommonJS"` + `target: "ES2020"` = conflict.” It’s not; it means “modern JS syntax + CommonJS module packaging,” which is often what you want in Node 14+.
  - Expecting top-level `await` to work with `module: "CommonJS"` just because `target` is modern; TS rightly rejects that because the runtime model can’t support it.
  - Using regex-like patterns in `include`/`exclude` and wondering why they don’t behave as expected.

- Failure modes in production:
  - Misconfigured `module` (CommonJS vs ESM) causing “Cannot use import statement outside a module” or similar runtime errors when Node/bundlers try to load emitted code.
  - Over-using `ESNext` and suddenly failing older browsers/runtimes after a TS upgrade, because emitted syntax is now more modern.
  - Forgetting to exclude `dist` and re-compiling generated JS, leading to weird double-build or circular import behaviors.

---

## 8. Trade-offs and alternatives

- Trade-offs:
  - **Performance**: Lower `target` (e.g. ES5) increases transpilation work and usually yields heavier output; higher `target` (ES2020/ESNext) is lighter but requires modern runtimes.
  - **Complexity**: Separate `target` and `module` give you flexibility but make config more mentally heavy at first.
  - **Scalability**: Explicit `include`/`exclude`, `rootDir`/`outDir`, and strict-type settings scale much better in big repos than ad-hoc defaults.
  - **Maintainability**: Using fixed versions (`ES2020`, `ES2022`) is more predictable than `ESNext`, and carefully chosen `module` avoids runtime module headaches.

- Alternatives:
  - Alternative A: Node CJS project
    - `target: "ES2019" or "ES2020"`, `module: "CommonJS"`.
    - Simple and stable for classic Node environments; no top-level `await` at module scope.
  - Alternative B: Node ESM / modern browser app
    - `target: "ES2020"`, `module: "NodeNext"` or `"ESNext"`; bundler or Node handles ESM.
    - Enables top-level `await` and modern tooling like tree-shaking.
  - Alternative C: Bundler-first front-end
    - `target: "ESNext"`, `module: "ESNext"`, let Vite/esbuild/webpack downlevel for browsers.
    - TS does minimal transforms, bundler does the heavy lifting.

---

## 9. Questions and doubts while learning

- Question: Why do `target` and `module` both support `ESNext` but mean different things?
  - My current understanding: `target`’s `ESNext` is “latest JS syntax version”, `module`’s `ESNext` is “latest ES module output semantics / preserved ESM,” so they live on different axes.
  - What I still don’t know: Exactly how new TS versions tweak their interpretation of `ESNext` for `target`.

- Question: If `module` is `CommonJS` and `target` is `ES2020`, why does top-level `await` fail?
  - My current understanding: Because top-level `await` is about **module loading semantics**, not just syntax; CommonJS is synchronous, so TS prohibits it regardless of how modern `target` is.
  - What I still don’t know: The full list of subtle runtime differences between Node’s ESM and CJS around async loading.

- Question: Do `rootDir`, `include`, and `exclude` support regex?
  - My current understanding: `include`/`exclude` use glob wildcards (`*`, `?`, `**/`), not regex; `rootDir` isn’t a filter at all.
  - What I still don’t know: Best glob strategies for very large monorepos with mixed TS/JS.

---

## 10. Practice tasks from the lecture

- Task: Build three small configs: CJS Node, ESM Node, bundler app.
  - Goal: See how `target` and `module` differ across environments.
  - What it teaches: That `target` and `module` are independent, and how they affect emitted code.
  - My approach (if any): Compile a simple file with imports/exports + async features under each config and inspect JS output.

- Task: Experiment with top-level `await`.
  - Goal: Internalize the `target` + `module` conditions for TLA.
  - What it teaches: Why “modern syntax” is not enough; you need an async module system too.
  - My approach (if any): Toggle `module` between `CommonJS` and `ESNext` while keeping `target >= ES2017` and observe compiler errors vs success.

- Task: Use glob patterns to control compilation.
  - Goal: Get comfortable with `include`/`exclude` semantics.
  - What it teaches: How real projects control what TS sees, and that patterns are globs, not regex.
  - My approach (if any): Start with `include: ["src/**/*"]`, then add `exclude: ["**/*.spec.ts"]` and confirm what gets compiled.

---

## 11. Key takeaways

- `tsconfig.json` is the central control plane for TypeScript compilation in any serious project.
- `target` controls JavaScript **syntax level**, `module` controls **module output format**; they are independent even when values like `ESNext` appear in both.
- `target: "ES2020"` + `module: "CommonJS"` is a valid and common pairing; it does not mean “ESM vs CJS conflict”.
- Top-level `await` needs both `target >= ES2017` and `module` set to an ESM-like value (`es2022`, `esnext`, `system`, `node16`, `nodenext`); it does _not_ work with `module: "CommonJS"`. - `rootDir` affects output paths only; file selection is controlled by `files` or `include`/`exclude`, which use glob patterns, not regex.
- Using fixed `target`/`module` versions (ES2020/ES2022) is more predictable across TS upgrades than `ESNext`, especially for libraries and long-lived services.

---

## 12. Minimal self-test (to check understanding without rewatching)

1. What does `target` control, and what does `module` control?
2. Why is `target: "ES2020"` with `module: "CommonJS"` not a conflict?
3. Under what `target` and `module` combinations is top-level `await` allowed?
4. Why does top-level `await` fail if `module` is `CommonJS`, even with a modern `target`?
5. What does `ESNext` mean for `target`? Why is it risky to rely on it long term?
6. What is `rootDir` used for, and what does it _not_ do?
7. How do `include` and `exclude` decide which files are part of the project, and what pattern system do they use?
8. Why might you choose `module: "NodeNext"` instead of `module: "CommonJS"` in a modern Node project?
9. How can misconfigured `module` cause runtime import errors even if compilation succeeds?
10. How would you configure `tsconfig.json` differently for a bundler-based React app vs a pure Node CLI tool?

---

## 13. Links to related materials

- Docs: TSConfig reference for `target`, `module`, `include`, `exclude`, `rootDir`, and `outDir`.
- Related lectures: Compiling TypeScript to JavaScript, Strict Mode in TypeScript, Including and Excluding Files in TypeScript, Understanding Modules in TypeScript, Production-Grade TypeScript Setup.
- Articles / posts:
  - Beginner-friendly overview of `target`, `module`, and modern TS configs.
  - Top-level `await` requirements and TS1378 error explanation.
  - Include/exclude glob pattern examples in `tsconfig.json`.
