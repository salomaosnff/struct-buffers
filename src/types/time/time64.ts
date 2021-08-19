import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";
import { Time } from "./time";

export class Time64Type implements Type<Time> {
  async write(value: Time, bytes: Bytes): Promise<void> {
    await bytes.setDouble(value.inMilliseconds / 1000);
  }

  async read(bytes: Bytes): Promise<Time> {
    return Time.parse((await bytes.getDouble()) * 1000);
  }
}

TypeRegistry.register(Time64Type);

export default new Time64Type();
