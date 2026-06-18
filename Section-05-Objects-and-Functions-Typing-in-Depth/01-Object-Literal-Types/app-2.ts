type User = {
  name: string;
  age: number;
  email: string;
  isStudent: boolean;
  address?: {
    street: string;
    pinCode: number;
  };
};

const user: User = {
  name: "raquib",
  isStudent: true,
  email: "raquib@raquib.com",
  age: 49,
};
