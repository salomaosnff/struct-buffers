import { Bytes } from "../../bytes/bytes";
import { Type } from "../type";

export class Set8Type<T> implements Type<Set<T>> {
  MAX_LENGTH = 0xff;

  async validate(value: Set<T>) {
    return value.size <= this.MAX_LENGTH;
  }

  constructor(public type: Type<T>) {}

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint8(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint8();
  }

  async write(value: Set<T>, bytes: Bytes) {
    await this.writeLengthByte(value.size, bytes);

    for (const item of value) {
      await this.type.write(item, bytes);
    }
  }

  async read(bytes: Bytes): Promise<Set<T>> {
    const arr = new Set<T>();
    const size = await this.readLengthByte(bytes);

    for (let i = 0; i < size; i++) {
      arr.add(await this.type.read(bytes));
    }

    return arr;
  }
}

export default function <T>(type: Type<T>) {
  return new Set8Type(type);
}
