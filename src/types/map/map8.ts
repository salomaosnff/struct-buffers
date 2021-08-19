import { Bytes } from "../../bytes/bytes";
import { DefineType } from "../../decorators/type";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

@DefineType(["key", "value"])
export class Map8Type<K, V> implements Type<Map<K, V>> {
  constructor(public key: Type<K>, public value: Type<V>) {}

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
