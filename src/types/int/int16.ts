import { Bytes } from "../../bytes/bytes";
import { IntType } from "./int";

export class Int16Type extends IntType {
  MIN = -0x8000;
  MAX = 0x7fff;

  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setInt16(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getInt16();
  }
}

export default new Int16Type();
