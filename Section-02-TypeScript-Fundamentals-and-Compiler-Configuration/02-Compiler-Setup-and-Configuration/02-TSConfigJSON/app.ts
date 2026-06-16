function fn(s: string) {
  const x = 32;
  console.log(s.slice(1));
}

class Rectangle {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getAreaFunction() {
    const thisRef = this;
    return function () {
      return thisRef.width * thisRef.height;
    };
  }
}
const x = 32;

function fn2(x: string) {
  console.log("Hello, " + x.toLowerCase());
}

type StringOrNumberFunc = (ns: string | number) => void;

let func: StringOrNumberFunc = fn2;

// ***type not working!
type Methodish = {
  func(x: string | number): void;
};
const m: Methodish = {
  func: fn2,
};

try {
  throw new Error("random error");
} catch (error) {}
