import { Bytes } from "../../bytes/bytes";
import { uint16 } from "../uint";
import { Object8Type } from "./object8";

export class Object16Type extends Object8Type {
  readonly MAX_SIZE = uint16.MAX;

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint16(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint16();
  }
}

export default new Object16Type();
