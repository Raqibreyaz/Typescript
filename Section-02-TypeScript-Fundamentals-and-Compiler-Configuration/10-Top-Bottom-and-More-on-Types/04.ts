let x = 5;

let y: never;

if (typeof x === "number") {
  let b: string = x;

  console.log(b);
  console.log(x);
} else {
  let b: string = x;
  console.log(b);
  console.log(x);
}
