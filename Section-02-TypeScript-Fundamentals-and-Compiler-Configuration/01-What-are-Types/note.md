# Topic: What Are Types?

- Lecture: What Are Types?
- Date: 2026-06-16
- Area: Language
- One-sentence summary: Types in TypeScript describe the shape and allowed values of data so the compiler can catch mistakes before runtime.

## 1. What is this topic?

- Definition: A type is a description of a value’s allowed structure or set of possible values, such as `number`, `string`, or `{ name: string }`.
- Why it exists: It solves the problem of writing JavaScript with fewer runtime surprises by checking invalid uses earlier, during compilation instead of after the code runs.
- Where it’s used: Types are used everywhere in TypeScript codebases, especially in API contracts, object models, function signatures, UI props, and backend boundaries.

## 2. Mental model & intuition

Think of a type as a rulebook for a value. The value is the actual thing in memory, while the type says what kind of thing it is and what you’re allowed to do with it.

A good intuition is: types are like **shapes**. A `string` is one shape, a `number` is another, and an object type is a more detailed shape with named pieces. TypeScript checks whether a value fits the shape you declared.

## 3. Internal working (mechanism)

- Key steps:
  1. You write a type annotation or TypeScript infers a type.
  2. The compiler compares assigned values and function usage against that type.
  3. If something does not fit the allowed shape, TypeScript reports an error before runtime.

- Data flow / state changes:
- Values flow through your program at runtime, but types are used mainly at compile time to validate those values and guide tooling.
- The runtime JavaScript still executes normally; the type information is for the compiler and editor experience rather than being a runtime object in most cases.

- Assumptions the design makes:
- The type system assumes your declared types are a useful approximation of the real data shape.
- It also assumes that catching mismatches early is better than discovering them only after deployment.

## 4. Important terms & concepts

- Term: Type
  - Definition: A description of the set of values a variable or expression can hold.
  - Why it matters: It is the foundation of TypeScript’s safety model.

- Term: Type annotation
  - Definition: Explicitly writing a type next to a variable, parameter, or return value, such as `age: number`.
  - Why it matters: It tells the compiler your intention.

- Term: Type inference
  - Definition: TypeScript automatically figuring out a type from the value you assigned.
  - Why it matters: It reduces boilerplate while still keeping safety.

- Term: Compile-time
  - Definition: The phase where TypeScript checks code before it becomes JavaScript.
  - Why it matters: Most type errors are caught here.

- Term: Runtime
  - Definition: The phase when JavaScript is actually executing.
  - Why it matters: Types are mostly gone by this point, so runtime checks still matter for external data.

## 5. Example(s)

- One minimal example:

```ts
let age: number = 25;
let name: string = "Aman";
```

`age: number` means only numeric values belong there, and `name: string` means only text values belong there.

- One realistic / production-like example:

```ts
type User = {
  id: string;
  isActive: boolean;
};

function sendWelcomeEmail(user: User) {
  if (user.isActive) {
    return `Welcome, ${user.id}`;
  }
}
```

Here, `User` describes the expected object shape, and `sendWelcomeEmail` can rely on that shape when using `user.id` and `user.isActive`.

## 6. Code / commands / API patterns

```ts
let age: number = 25;
let name: string = "Aman";
```

This is the basic annotation pattern. The variable names are values, and `number` / `string` are the types that constrain them.

```ts
type User = {
  id: string;
  isActive: boolean;
};
```

This creates a reusable object shape. It is a common pattern for modeling domain data, API responses, and function inputs.

## 7. Edge cases, gotchas, and failure modes

- Edge cases:
  - A value may look correct at runtime but still violate the declared type.
  - Some values come from outside TypeScript’s control, like JSON, forms, and network responses.
- Gotchas:
  - Types do not automatically validate external data at runtime.
  - A type annotation does not magically change the real JavaScript value.
- Common mistakes:
  - Assuming TypeScript will prevent all bad data.
  - Confusing compile-time checking with runtime enforcement.
- Failure modes in production:
  - APIs can return unexpected shapes, so code may pass TypeScript checks but still crash without runtime validation.

## 8. Trade-offs and alternatives

- Trade-offs:
  - Performance: Types usually add no runtime overhead because they are compiled away.
  - Complexity: Richer types improve safety but can make code harder to read.
  - Scalability: Types help large teams keep contracts consistent across files and modules.
  - Maintainability: Clear types make refactoring safer and easier.

- Alternatives:
  - Plain JavaScript: simpler, but you lose compile-time checking and many editor guarantees.
  - Runtime validators like Zod: better for untrusted data, because they check actual values at runtime as well.

## 9. Questions and doubts while learning

- Question: Are types the same as values?
  - My current understanding: No, values are the actual runtime data and types describe them.
  - What I still don’t know: Exactly which TypeScript features exist only at compile time versus runtime.

- Question: If types are so useful, why do we still need runtime validation?
  - My current understanding: Because external data can bypass the compiler.
  - What I still don’t know: How to design the right boundary between type safety and validation.

## 10. Practice tasks from the lecture

- Task: Understand basic type descriptions.
  - Goal: Learn how `number`, `string`, and object types constrain values.
  - What it teaches: The difference between a value and the shape describing it.
  - My approach (if any): Start by annotating simple variables and seeing what errors TypeScript gives.

## 11. Key takeaways

- Types are descriptions of allowed values, not the values themselves.
- TypeScript uses them mainly at compile time to catch mistakes early.
- Object types describe shape, not exact runtime identity.
- Types improve safety, readability, and tooling support across large codebases.

## 12. Minimal self-test (to check understanding without rewatching)

1. What is a type in TypeScript?
2. How does TypeScript use types during compilation?
3. Why are types useful even if JavaScript runs without them?
4. What is the difference between runtime data and compile-time type checking?
5. Why do external inputs still need runtime validation?
6. What does an object type describe?
7. What is the role of type inference?
8. What can go wrong if you rely only on types?
