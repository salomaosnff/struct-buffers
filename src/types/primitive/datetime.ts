import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class DateTimeType implements Type<Date> {
  async write(value: Date, bytes: Bytes) {
    await bytes.setDouble(value.getTime() / 1000);
  }

  async read(bytes: Bytes): Promise<Date> {
    return new Date((await bytes.getDouble()) * 1000);
  }
}

TypeRegistry.register(DateTimeType);
export default new DateTimeType();
