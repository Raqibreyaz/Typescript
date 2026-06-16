export {};

/*
- interface -> use extends
- type -> use &

=> '&' replaces 'extends' in 'type'
*/

type A = {
  name: string;
};

type B = {
  name2: string;
};

type C = A &
  B & {
    age: number;
  };

const obj: C = {
  name: "x",
  name2: "y",
  age: 32,
};
