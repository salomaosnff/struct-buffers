import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class UInt32Type extends Type<number> {
  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setUint32(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getUint32();
  }
}

TypeRegistry.register(UInt32Type);

export default new UInt32Type();
