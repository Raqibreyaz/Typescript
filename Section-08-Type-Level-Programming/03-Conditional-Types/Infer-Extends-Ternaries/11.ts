export {};

type O = {
  name: string;
  age: number;
};

type New<T> = {
  [P in keyof T as `get${Capitalize<P & string>}`]: () => T[P];
};

const user: New<O> = {
  getAge: () => 52,
  getName: () => "xyz",
};

user.getAge();
