export {};

type O = {
  name: string;
  age: number;
};

type New<T> = {
  [P in keyof T]: T[P];
};

const user: New<O> = {
  age: 52,
  name: "xyz",
};

user.age = 52;
