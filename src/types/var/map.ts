import { VarType } from "./var";
import { map8, map16, map32 } from "../map";
import { Type } from "../type";

export class MapType<K, V> extends VarType<Map<K, V>> {
  types: Type<Map<K, V>>[];

  constructor(key: Type<K>, value: Type<V>) {
    super([key, value]);

    this.types = [map8(key, value), map16(key, value), map32(key, value)];
  }
}

export default function <K, V>(key: Type<K>, value: Type<V>) {
  return new MapType(key, value);
}
