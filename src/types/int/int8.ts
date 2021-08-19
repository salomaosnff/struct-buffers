import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class Int8Type implements Type<number> {
  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setInt8(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getInt8();
  }
}

TypeRegistry.register(Int8Type);

export default new Int8Type();
