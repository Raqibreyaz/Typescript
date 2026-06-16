// passing type makes it that type
const input = document.querySelector<HTMLInputElement>(".input");
console.log(input?.value);

function getFirstElement<ArrayType>(array: ArrayType[]) {
  return array[0];
}

const numbers = [1, 2, 3];
const firstNum = getFirstElement(numbers);

const strings = ["a", "b", "c"];
const firstString = getFirstElement(strings);

// auto inferred(generic types!)
strings.map(() => {}); //return type is void
strings.map((a) => a); //return type is string

const map1 = new Map<string, number>();
const map2 = new Map([[4, 2]]);
const map3 = new Map<string, Map<string, number>>();
