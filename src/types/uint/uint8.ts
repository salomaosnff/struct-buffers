import { Bytes } from "../../bytes/bytes";
import { UIntType } from "./uint";

export class UInt8Type extends UIntType {
  MAX = 0xff;

  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setUint8(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getUint8();
  }
}

export default new UInt8Type();
