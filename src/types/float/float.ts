import { Bytes } from "../../bytes/bytes";
import { Type } from "../type";

export class FloatType implements Type<number> {
  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setFloat(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getFloat();
  }
}

export default new FloatType();
