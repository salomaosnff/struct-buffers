import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class Array8Type<T> extends Type<T[]> {
  MAX_LENGTH = 0xff;

  constructor(type: Type<T>) {
    super([type]);
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
    const arr: T[] = [];
    const length = await this.readLengthByte(bytes);

    for (let i = 0; i < length; i++) {
      arr.push(await this.type.read(bytes));
    }

    return arr;
  }
}

TypeRegistry.register(Array8Type);

export default function <T>(type: Type<T>) {
  return new Array8Type(type);
}
