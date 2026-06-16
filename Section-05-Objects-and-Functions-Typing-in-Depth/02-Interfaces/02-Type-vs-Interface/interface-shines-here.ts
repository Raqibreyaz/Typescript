// export {};

interface User {
  age: number;
}

interface User {
  name: string;
}

const user_: User = {
  name: "xyz",
  age: 52,
};

// adds a prop into the window object directly
interface Window {
  test: string;
}
window.test = "";

type UserEntry = {
  row: number;
  user: User;
};
interface KuchBhi {
  entry: UserEntry;
}
