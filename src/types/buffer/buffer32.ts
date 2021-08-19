import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Buffer8Type } from "./buffer8";

export class Buffer32Type extends Buffer8Type {
  MAX_LENGTH = 0xffffffff;

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint32(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint32();
  }
}

TypeRegistry.register(Buffer32Type);

export default new Buffer32Type();
