import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Buffer8Type } from "./buffer8";

export class Buffer16Type extends Buffer8Type {
  MAX_LENGTH = 0xffff;

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint16(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint16();
  }
}

TypeRegistry.register(Buffer16Type);

export default new Buffer16Type();
