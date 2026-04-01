type O = {
  readonly name: string;
  age: number;
};

// -readonly: removes readonly attribute
// -?: removes ? attribute
type New<T> = {
  -readonly [P in keyof T]-?: T[P];
};

const user: New<O> = {
  age: 52,
  name: "xyz",
};

user.age = 52