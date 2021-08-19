import { Bytes } from "../bytes/bytes";

export abstract class Type<T> {
  constructor(public readonly subTypes: Type<any>[] = []) {}

  validate?(value: T): Promise<boolean> {
    return Promise.resolve(true);
  }
  abstract write(value: T, bytes: Bytes): Promise<void>;
  abstract read(bytes: Bytes): Promise<T>;
}
