import { Bytes } from "../../bytes/bytes";
import { Type } from "../type";
import { Time } from "./time";

export class Time32Type implements Type<Time> {
  async write(value: Time, bytes: Bytes): Promise<void> {
    await bytes.setFloat(value.inMilliseconds / 1000);
  }

  async read(bytes: Bytes): Promise<Time> {
    return Time.parse((await bytes.getFloat()) * 1000);
  }
}

export default new Time32Type();
