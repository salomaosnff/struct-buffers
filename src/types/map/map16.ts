import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";
import { Map8Type } from "./map8";

export class Map16Type<K, V> extends Map8Type<K, V> {
  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint16(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint16();
  }
}

TypeRegistry.register(Map16Type);

export default function <K, V>(key: Type<K>, value: Type<V>) {
  return new Map16Type(key, value);
}
