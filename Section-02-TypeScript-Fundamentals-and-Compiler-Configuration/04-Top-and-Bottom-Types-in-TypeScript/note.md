# Topic: Top and Bottom Types in TypeScript

- Lecture: Top and Bottom Types in TypeScript
- Date: 2026-06-16
- Area: Language
- One-sentence summary: Top and bottom types are the widest and narrowest types in TypeScript, used for “anything goes” values and impossible code paths.

## 1. What is this topic?

- Definition: A **top type** can accept almost any value, while a **bottom type** cannot have any actual value.
- Why it exists: It helps TypeScript deal with unknown data, generic code, and branches that should never happen.
- Where it’s used: It shows up in API input handling, error handling, exhaustive `switch` checks, and advanced type programming.

## 2. Mental model & intuition

Think of types like boxes.

- A **top type** is a very big box. Almost anything can go into it.
- A **bottom type** is an empty box. Nothing can go into it.

So:

- use a top type when you **do not know yet** what the value is,
- use a bottom type when something **should not be possible**.

## 3. Internal working (mechanism)

- Key steps:
  1. TypeScript checks how broad or narrow a type is.
  2. Top types accept many different values.
  3. Bottom types fit into every type, but cannot actually exist as normal values.
- Data flow / state changes:
  - Unknown data starts broad, then gets narrowed after checks.
  - Impossible branches end in a bottom type such as `never`.
- Assumptions the design makes:
  - Safe code should start broad when data is uncertain.
  - Impossible code paths should be detectable by the compiler.

If there are diagrams in the lecture, describe them in text and show the flow.

A simple flow is:

- broad input -> check/narrow -> usable specific type
- impossible branch -> `never`

## 4. Important terms & concepts

- Term: Top type
  - Definition: A type that can accept very many values.
  - Why it matters: Useful when the exact type is not known yet.

- Term: Bottom type
  - Definition: A type with no possible values.
  - Why it matters: Useful for impossible states and exhaustiveness checks.

- Term: `unknown`
  - Definition: A safe top type.
  - Why it matters: You must check it before using it.

- Term: `never`
  - Definition: The bottom type.
  - Why it matters: It represents impossible paths or functions that do not return normally.

- Term: Narrowing
  - Definition: Turning a broad type into a more specific one after a check.
  - Why it matters: This is how you safely use `unknown`.

## 5. Example(s)

- One minimal example (toy / conceptual)

```ts
let value: unknown;
```

`unknown` means “this could be anything.” TypeScript lets you store anything here, but you must check the value before using it.

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

`never` means “this does not finish normally.” It is used for impossible or terminating code paths.

- One realistic / production-like example

```ts
function parseUser(input: string): unknown {
  return JSON.parse(input);
}
```

This is useful when reading external data. The result is kept broad at first, then checked later so bad data does not slip into the program.

## 6. Code / commands / API patterns

```ts
let value: unknown;
```

This says: “I have a value, but I do not know its type yet.” It is the safest starting point for untrusted data.

```ts
if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

This checks the value first, then uses it safely.

Inputs and outputs:

- Input: any value stored in `value`
- Output: safe string use only if the check passes

```ts
function exhaustiveCheck(x: never): never {
  throw new Error("Unexpected value");
}
```

This is used when the compiler should prove that the code path is impossible.

```ts
type Result = "success" | "error";

function handle(result: Result) {
  switch (result) {
    case "success":
      return "ok";
    case "error":
      return "fail";
    default:
      return exhaustiveCheck(result);
  }
}
```

This ensures every case is handled. If a new union member is added later, TypeScript can point out the missing branch.

## 7. Edge cases, gotchas, and failure modes

- Edge cases:
  - `unknown` can hold anything, but it cannot be used directly.
  - `never` appears in unreachable code or fully handled unions.
- Gotchas:
  - `any` is not the same as `unknown`; `any` disables much of the safety.
  - `never` is not a normal type you assign values to in everyday code.
- Common mistakes:
  - Using `any` when `unknown` is safer.
  - Forgetting to narrow `unknown` before access.
- Failure modes in production:
  - Too-broad types can hide bad input.
  - Missing `never` checks can let new cases go unnoticed.

## 8. Trade-offs and alternatives

- Trade-offs:
  - Performance:
    - These are mainly compile-time concepts, so runtime cost is usually not the concern.
  - Complexity:
    - They add theory, but they simplify real safety patterns.
  - Scalability:
    - Very useful in larger codebases and generic libraries.
  - Maintainability:
    - They help the compiler catch missing cases and unsafe assumptions.
- Alternatives:
  - Alternative A: Use `any` for fast prototyping, but it weakens safety.
  - Alternative B: Use `unknown` for safe uncertainty, which is usually the better choice.
  - Alternative C: Use `never` for impossible paths instead of custom sentinel values.

## 9. Questions and doubts while learning

- Question: Why use `unknown` instead of `any`?
  - My current understanding: `unknown` keeps the code safe until it is checked.
  - What I still don’t know: How often `any` should be tolerated in real projects.

- Question: Why does `never` exist if no value can fit it?
  - My current understanding: It is useful for proving impossible branches.
  - What I still don’t know: How the compiler infers `never` in more complex cases.

- Question: Where do top and bottom types matter most?
  - My current understanding: At API boundaries, in unions, and in exhaustive checks.
  - What I still don’t know: The advanced patterns that use them inside generic types.

## 10. Practice tasks from the lecture

- Task: Change unsafe `any` usage to `unknown`.
  - Goal: Learn why top types should still stay safe.
  - What it teaches: Narrowing before use.
  - My approach (if any): Start with API or JSON input.

- Task: Add an exhaustive `switch` check with `never`.
  - Goal: Make sure all union cases are handled.
  - What it teaches: How bottom types catch impossible states.
  - My approach (if any): Add a `default` branch that accepts only `never`.

## 11. Key takeaways

- Top types are broad and accept many values.
- Bottom types have no values and represent impossible states.
- `unknown` is the safe top type.
- `never` is the bottom type used for impossible paths.
- These types are most useful when handling uncertain input and checking completeness in code.

## 12. Minimal self-test (to check understanding without rewatching)

1. What is a top type?
2. What is a bottom type?
3. Why is `unknown` safer than `any`?
4. When should `never` be used?
5. Why must `unknown` be narrowed before use?
6. How does `never` help in `switch` statements?
7. What kind of code usually produces `never`?
8. Why are top and bottom types useful in API code?
9. What is the difference between `unknown` and `any`?
10. How do these types help the compiler catch bugs?

## 13. Links to related materials

- Docs: The topic appears in Section 2 of the TypeScript syllabus.
- Related lectures: What Are Types?, Statically vs Dynamically Typed Languages, Strongly vs Weakly Typed Languages, Type Narrowing & Control Flow Analysis, Compile-Time vs Runtime in TypeScript.
- Repos / code samples: The course page is at
