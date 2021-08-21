import { Bytes } from "../../bytes/bytes";
import { IntType } from "./int";

export class Int32Type extends IntType {
  MIN = -0x80000000;
  MAX = 0x7fffffff;

  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setInt32(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getInt32();
  }
}

export default new Int32Type();
