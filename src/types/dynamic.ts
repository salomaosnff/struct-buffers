import { Bytes } from "../bytes/bytes";
import { Type } from "./type";
import { TypeRegistry } from "../type-registry";
import { Class } from "../util";
import { PRIMITIVE_MAP } from "./primitives-map";
import { dynamic } from ".";

export class DynamicValue<T = any> {
  public type: Type<T>;
  constructor(type: Type<T> | Class<T>, public value: T) {
    this.type = TypeRegistry.getTypeSchema(type);
  }
}

export class DynamicType extends Type<any> {
  constructor() {
    super();
  }

  is() {
    return true;
  }

  async write(data: any, bytes: Bytes): Promise<void> {
    if (!(data instanceof DynamicValue)) {
      data = dynamic.create(data);
    }

    const { type, value } = data;

    await TypeRegistry.setBytesFromType(type, bytes);
    await type.write(value, bytes);

    if (bytes.bit > 0) {
      bytes.skip(1, "byte");
    }
  }

  async read(bytes: Bytes): Promise<any> {
    const type = await TypeRegistry.getTypeFromBytes(bytes);
    const result = await type.read(bytes);

    if (bytes.bit > 0) {
      bytes.skip(1, "byte");
    }

    return result;
  }

  create<R>(value: R, type: Type<R> | Class<R> = (value as any).constructor) {
    if (value instanceof DynamicValue) {
      return value;
    }

    if (typeof type === "function") {
      type = PRIMITIVE_MAP.get(type) ?? type;
    }

    return new DynamicValue(type, value);
  }
}

export default new DynamicType() as unknown as Type<DynamicValue> & DynamicType;
