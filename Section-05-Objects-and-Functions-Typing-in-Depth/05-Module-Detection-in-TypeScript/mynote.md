- with module:nodenext, it adds:
  Object.defineProperty(exports, "\_\_esModule", { value: true });
  to separate it as a module

- with module:esnext, it adds:
  export {};
  to separate it as a module

- all these depends on moduleDetection

- by default it is set to moduleDetection:auto

- but when we do tsc --init, then it goes moduleDetection:force

- moduleDetection:auto, means the ts files will be in the same global namespace, means top level await will no longer work

- moduleDetection:force, means the ts files will be in their own namespace

Comparision Between Module Detection Options : Auto, force, Legacy
1. legacy (The Old Way)
This was TypeScript's default behavior prior to version 4.7.
With legacy, TypeScript has a very strict and simple rule: A file is only considered a module if it contains at least one import or export statement. If it lacks both, TypeScript treats the file as a legacy Script, and everything inside it is dumped into the global scope.
How to fix scope issues in legacy: Developers usually have to add a dummy export {} at the top or bottom of their file just to force TypeScript to treat it as an isolated module.

2. force (The Strict Way)
This setting tells TypeScript to treat every single non-declaration file as a module, no matter what.
It does not care if you have import/export statements, and it does not care what your package.json says. If it is a .ts or .tsx file, it gets its own isolated scope.
When to use it: This is incredibly useful in modern web development (like Next.js, Vite, or Create React App) or modern Node.js environments where everything is bundled as a module anyway, and you never want accidental global variables.

3. auto (The Smart Default)
Introduced in TypeScript 4.7, auto is the modern default. It acts exactly like legacy, but with a few extra "smart" checks to recognize modern tooling.
In auto, a file is considered a module if any of the following are true:
It contains an import or export statement (just like legacy).
Your package.json has "type": "module" set.
The file extension is .mts or .cts (explicit module/commonjs extensions).
You are using "jsx": "react-jsx" in your tsconfig.json (because this setting implicitly imports React under the hood).