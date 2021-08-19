import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";
import { Set8Type } from "./set8";

export class Set16Type<T> extends Set8Type<T> {
  MAX_LENGTH = 0xffff;

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint16(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint16();
  }
}

TypeRegistry.register(Set16Type);

export default function <T>(type: Type<T>) {
  return new Set16Type(type);
}
