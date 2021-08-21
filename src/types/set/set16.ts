import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";
import { uint16 } from "../uint";
import { Set8Type } from "./set8";

export class Set16Type<T> extends Set8Type<T> {
  readonly MAX_SIZE = uint16.MAX;

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint16(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint16();
  }
}

export default function <T>(type: Type<T>) {
  return new Set16Type(type);
}
