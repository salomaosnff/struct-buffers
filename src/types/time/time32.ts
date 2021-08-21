import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";
import { Time } from "./time";

export class Time32Type extends Type<Time> {
  is(value: any) {
    return value instanceof Time;
  }

  async write(value: Time, bytes: Bytes): Promise<void> {
    await bytes.setFloat(value.__ms / 1000);
  }

  async read(bytes: Bytes): Promise<Time> {
    return Time.parse((await bytes.getFloat()) * 1000);
  }
}

export default new Time32Type();
