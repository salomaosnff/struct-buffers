import { Bytes } from "../../bytes/bytes";
import { Type } from "../type";
import { uint32 } from "../uint";
import { Set8Type } from "./set8";

export class Set32Type<T> extends Set8Type<T> {
  readonly MAX_SIZE = uint32.MAX;

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
