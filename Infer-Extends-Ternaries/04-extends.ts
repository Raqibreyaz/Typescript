export {};

type Generic<T> = {
  prop: T extends string ? string : T extends number ? number : undefined;
};

type Custom = {
  age: number;
} & string;

const a: Generic<boolean> = {
  prop: undefined,
};
