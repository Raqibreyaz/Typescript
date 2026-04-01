export {}

type CustomReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

type CustomParametersType<T extends (...args: any[]) => any> = T extends (
  ...args: infer R
) => any
  ? R
  : never;

type A1 = ReturnType<typeof fetch>;
type A2 = CustomReturnType<typeof fetch>;

type B1 = Parameters<typeof fetch>;
type B2 = CustomParametersType<typeof fetch>;
