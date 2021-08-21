import { Bytes } from "../../bytes/bytes";
import dynamic from "../dynamic";
import string from "../primitive/string";
import { Type } from "../type";
import { uint8 } from "../uint";

export class Object8Type extends Type<Record<string, any>> {
  readonly MAX_SIZE = uint8.MAX;

  is(value: any) {
    return (
      value && typeof value === "object" && value.constructor === Object,
      Object.keys(value).length <= this.MAX_SIZE
    );
  }

  constructor() {
    super([string, dynamic]);
  }

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint8(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint8();
  }

  async write(obj: Record<string, any>, bytes: Bytes) {
    const entries = Object.entries(obj);

    await this.writeLengthByte(entries.length, bytes);

    for (const [key, value] of entries) {
      await string.write(key, bytes);
      await dynamic.write(dynamic.create(value), bytes);
    }
  }

  async read(bytes: Bytes): Promise<Record<string, any>> {
    const result = Object.create(null);
    const size = await this.readLengthByte(bytes);

    for (let i = 0; i < size; i++) {
      const key = await string.read(bytes);
      const value = await dynamic.read(bytes);

      result[key] = value;
    }

    return result;
  }
}

export default new Object8Type();
