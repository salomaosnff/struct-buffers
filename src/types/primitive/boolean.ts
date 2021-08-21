import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class BooleanType extends Type<boolean> {
  is(value: any) {
    return typeof value === "boolean";
  }

  async write(value: boolean, bytes: Bytes) {
    await bytes.setBool(value);
  }

  async read(bytes: Bytes) {
    return bytes.getBool();
  }
}

export default new BooleanType();
