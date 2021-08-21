import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class DateTimeType extends Type<Date> {
  is(value: any) {
    return value instanceof Date;
  }

  async write(value: Date, bytes: Bytes) {
    await bytes.setDouble(value.getTime() / 1000);
  }

  async read(bytes: Bytes): Promise<Date> {
    return new Date((await bytes.getDouble()) * 1000);
  }
}

export default new DateTimeType();
