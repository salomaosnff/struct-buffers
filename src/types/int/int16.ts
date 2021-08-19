import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class Int16Type implements Type<number> {
  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setInt16(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getInt16();
  }
}

TypeRegistry.register(Int16Type);

export default new Int16Type();
