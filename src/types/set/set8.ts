import { Bytes } from "../../bytes/bytes";
import { Type } from "../type";
import { uint8 } from "../uint";

export class Set8Type<T> extends Type<Set<T>> {
  readonly MAX_SIZE = uint8.MAX;

  is(value: any) {
    return (
      value instanceof Set &&
      value.size <= this.MAX_SIZE &&
      Array.from(value).every((val) => this.type.is(val))
    );
  }

  constructor(type: Type<T>) {
    super([type]);
  }

  get type() {
    return this.subTypes[0];
  }

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
    const set = new Set<T>();
    const size = await this.readLengthByte(bytes);

    for (let i = 0; i < size; i++) {
      set.add(await this.type.read(bytes));
    }

    return set;
  }
}

export default function <T>(type: Type<T>) {
  return new Set8Type(type);
}
