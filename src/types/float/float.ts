import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class FloatType implements Type<number> {
  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setFloat(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getFloat();
  }
}

TypeRegistry.register(FloatType);

export default new FloatType();
