export {};

interface User {
  id: number;
  name: string;
}

interface Employee extends User {
  email: string;
}

const people: (User | Employee)[] = [
  { id: 1, name: "Mike", email: "mike@mike.com" },
  { id: 2, name: "Carl", email: "carl@mike.com" },
  { id: 3, name: "Vanessa", email: "vanessa@mike.com" },
  { id: 4, name: "Amaan" },
];

people.forEach((person) => {
  if (isEmployee(person)) console.log(`My Employee Email is ${person.email}`);
  else console.log(`I am just a user name ${person.name}`);
});

function isEmployee(person: User | Employee): person is Employee {
  return "email" in person;
}
