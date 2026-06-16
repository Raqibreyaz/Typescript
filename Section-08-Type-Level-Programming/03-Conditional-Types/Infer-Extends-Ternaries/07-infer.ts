export {};

type CustomAwaited<T> = T extends Promise<infer P> ? P : T;

type A1 = Awaited<ReturnType<typeof fetch>>;
type A2 = CustomAwaited<ReturnType<typeof fetch>>;
type A3 = CustomAwaited<typeof fetch>