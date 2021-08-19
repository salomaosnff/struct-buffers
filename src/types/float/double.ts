import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class DoubleType implements Type<number> {
  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setDouble(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getDouble();
  }
}

TypeRegistry.register(DoubleType);

export default new DoubleType();
