import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class UInt8Type extends Type<number> {
  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setUint8(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getUint8();
  }
}

TypeRegistry.register(UInt8Type);

export default new UInt8Type();
