interface User {
  age: number;
}

interface User {
  name: string;
}

// adds a prop into the global window object directly
declare global {
  interface Window {
    test: string;
  }
}
window.test = "";
