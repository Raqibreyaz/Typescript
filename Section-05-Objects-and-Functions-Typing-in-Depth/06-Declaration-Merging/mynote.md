- we can merge new properties to an interface by just declaring it again with those props

- here, second time declaring the interface with new props adds them to the original one
interface User {
  age: number;
}
interface User {
  name: string;
}

- but this will work when moduleDetection:auto or moduleDetection:legacy

- because on moduleDetection:force, it will treat file as a separate module and the interface remains in the namespace of that module

- to fix this we explicitly declare the interface as a global interface
declare global {
  interface Window {
    test: string;
  }
}

- how to prevent re-declaration pollution of interfaces, in short we can't do this in TS, it will require eslint

- download eslint as dev-dependency:
eslint@typescript-eslint/parser @typescript-eslint/eslint-plugin