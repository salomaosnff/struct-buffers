import { Bytes } from "../../bytes/bytes";
import { Class } from "../../util";
import { Type } from "../type";
import { uint8 } from "../uint";

export class Array8Type<T> extends Type<T[]> {
  MAX_LENGTH = uint8.MAX;

  constructor(type: Type<T> | Class<T>) {
    super([type]);
  }

  is(value: any) {
    return (
      Array.isArray(value) &&
      value.length <= this.MAX_LENGTH &&
      value.every((s) => this.type.is(s))
    );
  }

  get type() {
    return this.subTypes[0];
  }

  async validate(value: T[]) {
    return value.length <= this.MAX_LENGTH;
  }

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint8(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint8();
  }

  async write(value: T[], bytes: Bytes) {
    await this.writeLengthByte(value.length, bytes);

    for (const item of value) {
      await this.type.write(item, bytes);
    }
  }

  async read(bytes: Bytes): Promise<T[]> {
    const length = await this.readLengthByte(bytes);
    const arr: T[] = new Array(length);

    for (let i = 0; i < length; i++) {
      arr.push(await this.type.read(bytes));
    }

    return arr;
  }
}

export default function <T>(type: Type<T> | Class<T>) {
  return new Array8Type(type);
}
