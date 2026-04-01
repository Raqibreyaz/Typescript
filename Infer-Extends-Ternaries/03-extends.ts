export {};

type Generic<T> = { prop: T extends string ? true : false };

type Custom = {
  age: number;
} & string;

const a: Generic<Custom> = {
  prop: true,
};