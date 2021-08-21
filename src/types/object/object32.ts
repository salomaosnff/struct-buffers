import { Bytes } from "../../bytes/bytes";
import { uint32 } from "../uint";
import { Object8Type } from "./object8";

export class Object32Type extends Object8Type {
  readonly MAX_SIZE = uint32.MAX;

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint32(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint32();
  }
}

export default new Object32Type();
