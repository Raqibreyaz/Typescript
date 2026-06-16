export {}

type Generic<T> = T extends Array<infer A> ? A : never;

const val = ["a", "b", "c"];

const a: Generic<["raquib", "reyaz"]> = "reyaz";

const b: Generic<["raquib", "reyaz", 32]> = "reyaz";

const c: Generic<typeof val> = "x";
