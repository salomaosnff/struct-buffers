import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class DoubleType extends Type<number> {
  is(value: any) {
    return typeof value === "number";
  }

  async write(value: number, bytes: Bytes): Promise<void> {
    await bytes.setDouble(value);
  }

  async read(bytes: Bytes): Promise<number> {
    return bytes.getDouble();
  }
}

export default new DoubleType();
