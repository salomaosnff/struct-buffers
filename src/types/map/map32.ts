import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";
import { uint32 } from "../uint";
import { Map8Type } from "./map8";

export class Map32Type<K, V> extends Map8Type<K, V> {
  readonly MAX_SIZE = uint32.MAX;

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint32(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint32();
  }
}

export default function <K, V>(key: Type<K>, value: Type<V>) {
  return new Map32Type(key, value);
}
