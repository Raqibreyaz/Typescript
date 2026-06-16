export {};

type Generic<T extends string> = T extends string ? true : false;

type Custom = {
  age: number;
} & string;

const a: Generic<Custom> = true;
