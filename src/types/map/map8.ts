import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class Map8Type<K, V> extends Type<Map<K, V>> {
  constructor(key: Type<K>, value: Type<V>) {
    super([key, value]);
  }

  get key() {
    return this.subTypes[0];
  }

  get value() {
    return this.subTypes[1];
  }

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint8(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint8();
  }

  async write(map: Map<K, V>, bytes: Bytes) {
    await this.writeLengthByte(map.size, bytes);

    for (const [key, value] of map) {
      await this.key.write(key, bytes);
      await this.value.write(value, bytes);
    }
  }

  async read(bytes: Bytes): Promise<Map<K, V>> {
    const map = new Map<K, V>();
    const size = await this.readLengthByte(bytes);

    for (let i = 0; i < size; i++) {
      const key = await this.key.read(bytes);
      const value = await this.value.read(bytes);

      map.set(key, value);
    }

    return map;
  }
}

TypeRegistry.register(Map8Type);

export default function <K, V>(key: Type<K>, value: Type<V>) {
  return new Map8Type(key, value);
}
