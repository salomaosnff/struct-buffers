import { Bytes } from "../bytes/bytes";
import { Type } from "./type";
import { TypeRegistry } from "../type-registry";
import { Class } from "../util";

export interface DynamicValue<T = any> {
  type: Type<T>;
  value: T;
}

export class DynamicType extends Type<DynamicValue<any>> {
  constructor() {
    super();
  }

  async write(data: DynamicValue<any>, bytes: Bytes): Promise<void> {
    const { type, value } = data;
    await TypeRegistry.setBytesFromType(type, bytes);
    await TypeRegistry.getTypeSchema(type).write(value, bytes);
  }

  async read(bytes: Bytes): Promise<any> {
    const type = await TypeRegistry.getTypeFromBytes(bytes);
    return type.read(bytes);
  }

  create<R>(type: Type<R> | Class<R>, value: R) {
    return { type, value } as DynamicValue<R>;
  }
}

export default new DynamicType() as unknown as Type<DynamicValue> & {
  create: DynamicType["create"];
};
