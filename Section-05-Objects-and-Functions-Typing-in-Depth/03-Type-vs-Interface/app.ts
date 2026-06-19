export {};

type UserType = {
  age: number;
  name: string;
};

interface UserInter {
  age: number;
  name: string;
}

type SType = string;
// interface SInter = string, everything must be in object

type TwoType = {} | {};
// interface TwoInter {} | {}, cant union multiple object types

type extendedType = { age: number } & { name: string };

interface AgeInter {
  age: number;
}
/* 
can't give type extend object directly
interface extendedInter extends {age:number} {
     name:string
 }*/
interface extendedInter extends AgeInter {
  name: string;
}

const user: UserType = {};
