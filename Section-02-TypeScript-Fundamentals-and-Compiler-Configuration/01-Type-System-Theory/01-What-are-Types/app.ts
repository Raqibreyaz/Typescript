export {};

let age: number = 25;
let name: string = "aman";

type User = {
  id: string;
  isActive: boolean;
};

function sendWelcomeEmail(user: User) {
  if (user.isActive) return `Welcome, ${user.id}`;
}
