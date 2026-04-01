type KeyValueSplitter<T> = T extends `${infer K}:${infer V}`
  ? { key: K; value: V }
  : T;

type A = KeyValueSplitter<"raquib:reyaz">;
type B = KeyValueSplitter<"raquib_reyaz">;
