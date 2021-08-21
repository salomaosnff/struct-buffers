import { Bytes } from "../../bytes/bytes";
import { Class } from "../../util";
import { Type } from "../type";
import { uint32 } from "../uint";
import { Array8Type } from "./array8";

export class Array32Type<T> extends Array8Type<T> {
  MAX_LENGTH = uint32.MAX;

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint32(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint32();
  }
}

export default function <T>(type: Type<T> | Class<T>) {
  return new Array32Type(type);
}
