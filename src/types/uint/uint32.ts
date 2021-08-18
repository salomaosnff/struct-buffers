import { Bytes } from "../../bytes/bytes";
import { Type } from "../type";

export class UInt32Type implements Type<number> {
  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setUint32(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getUint32();
  }
}

export default new UInt32Type();
