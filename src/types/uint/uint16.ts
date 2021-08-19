import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class UInt16Type implements Type<number> {
  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setUint16(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getUint16();
  }
}

TypeRegistry.register(UInt16Type);

export default new UInt16Type();
