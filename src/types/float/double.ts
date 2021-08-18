import { Bytes } from "../../bytes/bytes";
import { Type } from "../type";

export class DoubleType implements Type<number> {
  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setDouble(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getDouble();
  }
}

export default new DoubleType();
