import { PRIMITIVE_MAP } from "../types/primitives-map";
import { Schema } from "../types/struct";
import { Type } from "../types/type";

interface FieldOptions<T> {
  required?: boolean;
}

export function Field<T>(
  type?: T,
  { required = true }: FieldOptions<T> = {}
): PropertyDecorator {
  return (target, key: string) => {
    const schema: Schema =
      Reflect.getMetadata("struct:fields", target.constructor) ?? {};

    let fieldType: any =
      type ?? Reflect.getMetadata("design:type", target, key);

    const isClass = String(fieldType).startsWith("class ");

    if (PRIMITIVE_MAP.has(fieldType)) {
      fieldType = PRIMITIVE_MAP.get(fieldType);
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
