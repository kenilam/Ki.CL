type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends { [_ in keyof T]: infer U }
  ? unknown extends U
    ? never
    : U
  : never; // I don't know why not just U work here, but (unknown extends U ? never : U) work
type OmitFromKnownKeys<T, K extends keyof T> = KnownKeys<T> extends infer U
  ? [U] extends [keyof T]
    ? Pick<T, Exclude<U, K>>
    : never
  : never;
type Omit<T, K extends keyof T> = OmitFromKnownKeys<T, K> &
  (string extends K
    ? unknown
    : string extends keyof T
    ? { [n: string]: T[Exclude<keyof T, number>] }
    : unknown) & // support number property
  (number extends K
    ? unknown
    : number extends keyof T
    ? { [n: number]: T[Exclude<keyof T, string>] }
    : unknown); // support number property

export { Omit };
