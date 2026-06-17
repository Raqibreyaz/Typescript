# Topic: Statically vs Dynamically Typed Languages

- Lecture: Statically vs Dynamically Typed Languages
- Date: 2026-06-16
- Area: Language
- One-sentence summary: This topic explains when type checking happens in a language, why that design matters, and how TypeScript fits into the broader static-vs-dynamic typing discussion.

## 1. What is this topic?

- Definition: Statically typed languages perform most type checking before the program runs, while dynamically typed languages perform type checking during execution as values flow through the program.
- Why it exists: This distinction exists because languages make different trade-offs between early error detection, flexibility, speed of iteration, and runtime freedom.
- Where it’s used: It shows up in language design, compiler behavior, IDE tooling, API design, debugging strategy, and how teams structure large codebases.

## 2. Mental model & intuition

A simple way to think about it is this: static typing checks the map before the trip, while dynamic typing checks each turn while driving. Both can get you to the destination, but they fail in different ways and at different times.

In a statically typed system, the compiler tries to reject invalid operations before you run the code. In a dynamically typed system, the program keeps going until it reaches an operation that does not make sense for the current runtime value.

## 3. Internal working (mechanism)

Describe step-by-step how it works internally:

- Key steps:
  1. In a statically typed language, the compiler or type checker reads declarations, infers types where possible, and verifies operations before execution.
  2. In a dynamically typed language, values carry their runtime kind, and operations are checked when the program actually executes them.
  3. If an operation is invalid, a statically typed language usually reports a compile-time error, while a dynamically typed language usually throws a runtime error when that code path is reached.
- Data flow / state changes:
  - Static typing tracks constraints over variables and expressions before runtime, often using annotations plus inference.
  - Dynamic typing evaluates values first and validates operations against the actual runtime values later.
- Assumptions the design makes:
  - Static systems assume up-front checking is worth extra structure.
  - Dynamic systems assume runtime flexibility and faster iteration are often more valuable than early guarantees.

If there are diagrams in the lecture, describe them in text and show the flow.

A text version of the common flow is:

- Static path: source code -> type checker/compiler -> errors or emitted program -> runtime.
- Dynamic path: source code -> interpreter/runtime -> values created -> operations checked as executed -> possible runtime error.

## 4. Important terms & concepts

- Term: Static typing
  - Definition: Type checking happens primarily before execution, usually during compilation or an analysis phase.
  - Why it matters: It catches many bugs early and improves refactoring safety.

- Term: Dynamic typing
  - Definition: Type checking happens during execution based on actual runtime values.
  - Why it matters: It allows more flexibility and often less upfront ceremony.

- Term: Compile-time
  - Definition: The phase before running the program when code is analyzed and transformed.
  - Why it matters: Static type errors are usually found here.

- Term: Runtime
  - Definition: The phase when the program is actually executing.
  - Why it matters: Dynamic type errors usually appear here.

- Term: Type inference
  - Definition: The language figures out types automatically without explicit annotations.
  - Why it matters: It reduces verbosity in statically typed languages like TypeScript.

- Term: Type error
  - Definition: Using a value in a way that is incompatible with its expected kind or shape.
  - Why it matters: The timing of this error is the core difference between static and dynamic typing.

## 5. Example(s)

Provide at least:

- One minimal example (toy / conceptual)

```ts
let x: number = 10;
x = "hello";
```

Line 1 declares `x` as a number. Line 2 tries to assign a string, so a statically typed checker reports the mismatch before runtime.

Dynamic-language-style equivalent:

```js
let x = 10;
x = "hello";
console.log(x.toUpperCase());
```

Line 1 starts with a number. Line 2 replaces it with a string. Line 3 works only because the runtime value at that moment is a string; the language allows the variable to change kind over time.

- One realistic / production-like example

```ts
type ApiUser = {
  id: string;
  email: string;
};

function sendEmail(user: ApiUser) {
  return user.email.toLowerCase();
}
```

`ApiUser` says the function expects an object with `id` and `email`. If another part of the code tries to pass `{ id: 1 }`, the static checker can reject that call before execution.

Dynamic-language-style version:

```js
function sendEmail(user) {
  return user.email.toLowerCase();
}
```

This is shorter, but if `user.email` is missing or not a string, the failure happens only when this line runs in production.

## 6. Code / commands / API patterns

Include all code snippets, CLI commands, API patterns, SQL queries, config examples, etc. from the lecture. Use proper code blocks:

```ts
let age: number = 25;
```

This is a static annotation pattern. It tells the checker that `age` should hold numbers.

Inputs and outputs:

- Input: assignment of `25`
- Output: accepted, because `25` matches `number`

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

This function declares both parameter types and return type. The checker can reject invalid calls such as `add("1", 2)` before runtime.

Inputs and outputs:

- Input: `add(1, 2)`
- Output: `3`
- Invalid input: `add("1", 2)`
- Static result: compile-time error

```js
function add(a, b) {
  return a + b;
}
```

This is the same API shape without static checking. Depending on runtime values, `+` could mean numeric addition or string concatenation, which makes behavior more flexible but also easier to misuse.

Inputs and outputs:

- Input: `add(1, 2)` -> `3`
- Input: `add("1", 2)` -> `"12"`

If the lecture shows multiple versions (basic -> advanced), include all and explain the progression.

The progression usually goes from untyped JavaScript-style functions, to explicitly typed TypeScript functions, to inferred and reusable types like object types and aliases.

## 7. Edge cases, gotchas, and failure modes

- Edge cases:
  - A dynamically typed program can run correctly for a long time and then fail only when a rare code path gets a bad runtime value.
  - A statically typed system may still miss issues involving external data unless runtime validation is added.
- Gotchas:
  - “Statically typed” does not mean “no runtime errors.”
  - “Dynamically typed” does not mean “no structure”; many dynamic languages still encourage disciplined design.
- Common mistakes:
  - Confusing static vs dynamic typing with strong vs weak typing, which is a separate axis and appears as its own lecture topic in the course.
  - Assuming TypeScript makes JavaScript runtime data automatically safe.
- Failure modes in production:
  - In dynamic systems, unexpected API payloads can break code only when bad data arrives.
  - In static systems, trusting external input without validation can still cause crashes or bad state after compilation.

Explain why each happens and how to detect/avoid it.

These issues happen because compile-time checks only see source code and declared assumptions, while runtime systems see real values. The practical fix is to combine good static types with boundary validation for inputs from APIs, databases, files, and users.

## 8. Trade-offs and alternatives

- Trade-offs:
  - Performance:
    - Static typing can reduce certain classes of mistakes earlier, though performance depends more on implementation than on typing style alone.
  - Complexity:
    - Static typing adds more concepts such as annotations, inference, and type system rules.
  - Scalability:
    - Static typing usually scales better for large teams because interfaces and contracts are clearer.
  - Maintainability:
    - Static typing often improves refactoring confidence, while dynamic typing can be simpler for very small scripts.
- Alternatives:
  - Alternative A: Pure dynamic language workflow; use when fast scripting and flexible prototyping matter more than early guarantees, avoid when large shared codebases become hard to reason about.
  - Alternative B: Statically typed language workflow; use when long-term maintenance, tooling, and correctness matter, avoid when the type overhead is not worth it for tiny tasks.
  - Alternative C: Gradual typing, such as TypeScript over JavaScript; use when you want JavaScript ergonomics plus optional static checking, which is exactly why this distinction matters in a TypeScript course.

## 9. Questions and doubts while learning

- Question: If TypeScript is compiled to JavaScript, is it really statically typed?
  - My current understanding: Yes, because its type checking happens before runtime, even though the emitted program is JavaScript.
  - What I still don’t know: Which guarantees disappear after compilation.

- Question: Why do dynamic languages remain popular if static typing catches bugs earlier?
  - My current understanding: They optimize for flexibility, expressiveness, and quick iteration.
  - What I still don’t know: At what project size the trade-off usually flips.

- Question: Is static typing always better for backend and frontend systems?
  - My current understanding: It is often better for larger systems, but not automatically better for every task.
  - What I still don’t know: How to choose the minimum useful amount of typing in fast-moving projects.

## 10. Practice tasks from the lecture

List any exercises, problems, labs, or tasks the lecturer mentioned:

- Task: Compare the same function in typed and untyped forms.
  - Goal: See when errors move from compile-time to runtime.
  - What it teaches: The practical meaning of static vs dynamic typing.
  - My approach (if any): Write one function in JavaScript style, then rewrite it in TypeScript with parameter and return types.

- Task: Model an API response with types.
  - Goal: Understand how static typing improves safety around object shape.
  - What it teaches: Why large applications prefer explicit contracts.
  - My approach (if any): Start with a user object, then intentionally break fields and observe checker behavior.

## 11. Key takeaways

- Static vs dynamic typing is mainly about when type checking happens.
- Static typing pushes many errors earlier, before execution.
- Dynamic typing delays checks until runtime values are actually used.
- TypeScript belongs in this discussion because it adds static checking on top of JavaScript workflows.
- This topic connects directly to later lectures on strong vs weak typing, type narrowing, runtime validation, and compile-time vs runtime behavior.

## 12. Minimal self-test (to check understanding without rewatching)

1. What is the main difference between statically and dynamically typed languages?
2. At what phase does each style usually detect type errors?
3. Why can a dynamically typed program appear fine until a rare runtime path executes?
4. Why can a statically typed program still fail in production?
5. How does TypeScript fit into the static-vs-dynamic typing discussion?
6. Why is static vs dynamic typing different from strong vs weak typing?
7. What are the main team-scale benefits of static typing?
8. When might dynamic typing be the better choice?
9. What role does runtime validation play even in statically typed systems?
10. How does type inference make static languages less verbose?

## 13. Links to related materials

- Docs: The TypeScript course syllabus places this lecture in Section 2, right after compiler basics and before strong vs weak typing.
- Related lectures: What Are Types?, Compiling TypeScript to JavaScript, Strongly vs Weakly Typed Languages, Top and Bottom Types in TypeScript, Compile-Time vs Runtime Type Safety, Runtime Validation with Zod.
- Repos / code samples: The syllabus links the course material at .
