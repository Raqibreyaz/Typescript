interface Person {
  name: string;
  age: number;
}

interface User {
  name: string;
}

const person: Person = {
  name: "raquib",
  age: 46,
};

const user: User = person;


function xyz(user: User) {
  console.log(user);
}

xyz(person);