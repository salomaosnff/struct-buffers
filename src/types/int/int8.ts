import { Bytes } from "../../bytes/bytes";
import { IntType } from "./int";

export class Int8Type extends IntType {
  MIN = -0x80;
  MAX = 0x7f;

  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setInt8(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getInt8();
  }
}

export default new Int8Type();
