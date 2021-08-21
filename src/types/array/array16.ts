import { Bytes } from "../../bytes/bytes";
import { Class } from "../../util";
import { Type } from "../type";
import { uint16 } from "../uint";
import { Array8Type } from "./array8";

export class Array16Type<T> extends Array8Type<T> {
  MAX_LENGTH = uint16.MAX;

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint16(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint16();
  }
}

export default function <T>(type: Type<T> | Class<T>) {
  return new Array16Type(type);
}
