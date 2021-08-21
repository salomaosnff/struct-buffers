import { Bytes } from "../../bytes/bytes";
import { UIntType } from "./uint";

export class UInt16Type extends UIntType {
  MAX = 0xffff;

  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setUint16(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getUint16();
  }
}

export default new UInt16Type();
