import { Bytes } from "../../bytes/bytes";
import { Type } from "../type";

export class UInt8Type implements Type<number> {
  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setUint8(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getUint8();
  }
}

export default new UInt8Type();
