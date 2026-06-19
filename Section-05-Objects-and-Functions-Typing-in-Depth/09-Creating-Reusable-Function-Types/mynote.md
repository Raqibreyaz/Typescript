- we have make the function type reusable to reduce verbosity

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

```ts
interface MathOperation {
  (a: number, b: number): number;
}
```

- now can use it like this? this will not give any error, but also it is of no use as it will not work

```ts
function add<MathOperation>(a, b) {
  return a + b;
}
```

- that's a function declaration, we need to make it a function expression

```ts
const add: MathOperation = function (a, b) {
  return a + b;
};
```

- interface equivalent

```ts
type MathOperation = (a: number, b: number) => number;
```

- fun fact: we can give the arguments <= the no of args we declared

```ts
const add: MathOperation = function (a) {
  return a + 2;
};
```
