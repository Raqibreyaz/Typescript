export {};

type Point = { x: number; y: number };
type P = keyof Point;

const p: P = "x";

type Arrayish = { [x: number]: unknown };
type A = keyof Arrayish;

const a: A = 32;

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;

type User = {
  name: string;
  age: number;
  email: string;
  //   [x: string]: unknown;
};

const user: User = {
  name: "Raquib",
  age: 32,
  email: "raquib@raquib.com",
};
type UserField = keyof User;
type UserValue = User[UserField];
type UserAge = User["age"];

for (const key in user) {
  if (key in user) {
    const element: UserValue = user[key as UserField];
    console.log(element);
  }
}

function isKeyPresent(key: UserField, obj: User): key is UserField {
  return key in obj;
}
