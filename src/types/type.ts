import { Bytes } from "../bytes/bytes";

export interface Type<T> {
  validate?(value: T): Promise<boolean>;
  write(value: T, bytes: Bytes): Promise<void>;
  read(bytes: Bytes): Promise<T>;
  create?(...args: any[]): T;
}
