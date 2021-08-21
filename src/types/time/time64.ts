import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Time } from "./time";
import { Time32Type } from "./time32";

export class Time64Type extends Time32Type {
  async write(value: Time, bytes: Bytes): Promise<void> {
    await bytes.setDouble(value.__ms / 1000);
  }

  async read(bytes: Bytes): Promise<Time> {
    return Time.parse((await bytes.getDouble()) * 1000);
  }
}

export default new Time64Type();
