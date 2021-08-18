import { Bytes } from "../../bytes/bytes";
import { Type } from "../type";

export class BooleanType implements Type<boolean> {
  async write(value: boolean, bytes: Bytes) {
    await bytes.setBool(value);
  }

  async read(bytes: Bytes) {
    return bytes.getBool();
  }
}

export default new BooleanType();
