import { Bytes } from "../../bytes/bytes";
import { UIntType } from "./uint";

export class UInt32Type extends UIntType {
  MAX = 0xffffffff;

  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setUint32(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getUint32();
  }
}

export default new UInt32Type();
