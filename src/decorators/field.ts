import { Schema } from "../types/struct";
import { Type } from "../types/type";
import {
  bigInt,
  boolean,
  buffer32,
  string,
  time32,
  dateTime,
  int32,
} from "../types";
import { Time } from "../types/time/time";

const primitives = new Map<Function, Type<any>>([
  [Boolean, boolean],
  [Number, int32],
  [String, string],
  [Date, dateTime],
  [BigInt, bigInt],
  [Time, time32],
  [Uint8Array, buffer32],
]);

interface FieldOptions<T> {
  type?: Type<T>;
  required?: boolean;
}

export function Field<T>({
  type,
  required = true,
}: FieldOptions<T> = {}): PropertyDecorator {
  return (target, key: string) => {
    const schema: Schema =
      Reflect.getMetadata("struct:fields", target.constructor) ?? {};

    let fieldType: any =
      type ?? Reflect.getMetadata("design:type", target, key);

    const isClass = String(fieldType).startsWith("class ");

    if (primitives.has(fieldType)) {
      fieldType = primitives.get(fieldType);
    } else if (isClass) {
      fieldType = Reflect.getMetadata("struct:schema", fieldType);
    }

    if (!fieldType) {
      throw new Error(
        `Inválid column type for ${target.constructor.name}.${key}`
      );
    }

    schema[key] = {
      type: fieldType,
      required,
    };

    Reflect.defineMetadata("struct:fields", schema, target.constructor);
  };
}
