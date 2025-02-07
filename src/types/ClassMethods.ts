export interface ClassMethods<T> {
  clone(): T;
  copy(t: T): T;
  equals(t: T): boolean;
}
