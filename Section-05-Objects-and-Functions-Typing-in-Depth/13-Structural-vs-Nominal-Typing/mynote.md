- works without errors! even though 'age' doesn't exist on type User

```ts
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
```

- for now just consider that, it checks for the minimum possible props to be present in the value, which is present in this case

- but when we assign a object literal then it adds additional check: excess property check, which doesn't allows additional properties

```ts
const newUser: User = {
  name: "raquib",
  age: 35,
};
```

- this works too!

```ts
function xyz(user: User) {
  console.log(user);
}

xyz(person);
```
