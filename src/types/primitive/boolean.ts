import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class BooleanType implements Type<boolean> {
  async write(value: boolean, bytes: Bytes) {
    await bytes.setBool(value);
  }

  async read(bytes: Bytes) {
    return bytes.getBool();
  }
}

TypeRegistry.register(BooleanType);
export default new BooleanType();
