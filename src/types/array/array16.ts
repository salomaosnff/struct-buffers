import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";
import { Array8Type } from "./array8";

export class Array16Type<T> extends Array8Type<T> {
  MAX_LENGTH = 0xffff;

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint16(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint16();
  }
}

TypeRegistry.register(Array16Type);

export default function <T>(type: Type<T>) {
  return new Array16Type(type);
}
