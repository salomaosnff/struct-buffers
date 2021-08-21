import { Bytes } from "../../bytes/bytes";
import { Type } from "../type";
import dynamic from "../dynamic";

export abstract class VarType<T> extends Type<T> {
  abstract types: Type<T>[];

  is(value: any): boolean {
    return this.types.some((t) => t.is(value));
  }

  getValueTypeCode(value: T) {
    return this.types.findIndex((type) => type.is(value));
  }

  async write(value: T, bytes: Bytes): Promise<void> {
    const code = this.getValueTypeCode(value);
    const type = this.types[code];

    await dynamic.write(dynamic.create(value, type), bytes);
  }

  read(bytes: Bytes) {
    return dynamic.read(bytes) as any as Promise<T>;
  }
}
