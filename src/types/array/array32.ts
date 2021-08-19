import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";
import { Array8Type } from "./array8";

export class Array32Type<T> extends Array8Type<T> {
  MAX_LENGTH = 0xffffffff;

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint32(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint32();
  }
}

TypeRegistry.register(Array32Type);

export default function <T>(type: Type<T>) {
  return new Array32Type(type);
}
