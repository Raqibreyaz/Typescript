// interface MathOperation {
//   (a: number, b: number): number;
// }

type MathOperation = (a: number, b: number) => number;

const add: MathOperation = function (a) {
  return a + 2;
};
