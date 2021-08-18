import { Bytes } from "../../bytes/bytes";
import { Type } from "../type";
import { Set8Type } from "./set8";

export class Set32Type<T> extends Set8Type<T> {
  MAX_LENGTH = 0xffffffff;

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint32(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint32();
  }
}

export default function <T>(type: Type<T>) {
  return new Set32Type(type);
}
