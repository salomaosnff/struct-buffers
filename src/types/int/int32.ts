import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class Int32Type implements Type<number> {
  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setInt32(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getInt32();
  }
}

TypeRegistry.register(Int32Type);

export default new Int32Type();
