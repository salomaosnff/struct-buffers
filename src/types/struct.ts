import { Type } from "./type";
import bool from "./primitive/boolean";
import { Bytes } from "../bytes/bytes";
import { Class } from "../util";

type FieldType<T> = T extends Type<infer U> ? U : never;

interface Field<T> {
  type: Type<T>;
  required?: boolean;
}

interface OptionalField {
  required: false;
}

export type Schema = Record<string, Field<any>>;

export type Struct<S extends Schema> = {
  [K in keyof S as S[K] extends OptionalField ? K : never]?: FieldType<
    S[K]["type"]
  >;
} &
  {
    [K in keyof S as S[K] extends OptionalField ? never : K]: FieldType<
      S[K]["type"]
    >;
  };

export class StructType<T extends Schema, R = Struct<T>> extends Type<R> {
  // private keys: string[];
  private fields: [string, Field<any>][];
  private hasBooleans = false;
  private hasNullables = false;

  constructor(public schema: T, public factory?: Class<R>) {
    super();

    // this.keys = Object.keys(schema);
    this.fields = Object.entries(schema).sort((a, b) =>
      a[1].type === bool && b[1].type !== bool ? -1 : 0
    );

    this.hasBooleans = this.fields.some(([_, field]) => field.type === bool);
    this.hasNullables = this.fields.some(
      ([_, field]) => field.required === false
    );
  }

  public create(data: R = {} as R): R {
    return Object.assign(Object.create(this.factory?.prototype ?? {}), data);
  }

  async read(bytes: Bytes): Promise<R> {
    const obj = this.create();
    let booleansReaded = !this.hasBooleans;

    if (this.hasNullables) {
      // Set null fields
      for (const [key] of this.fields) {
        if (await bytes.getBool()) {
          obj[key] = null;
        }
      }

      if (this.hasBooleans) {
        if (bytes.bit > 0) {
          bytes.skip(1, "byte");
        }
      }
    }

    // Load fields
    for (const [key, field] of this.fields) {
      if (!booleansReaded && field.type !== bool) {
        if (bytes.bit > 0) {
          bytes.skip(1, "byte");
        }
        booleansReaded = true;
      }

      if (obj[key] === null) continue;

      obj[key] = await field.type.read(bytes);
    }

    return obj;
  }

  async write(value: R, bytes: Bytes) {
    if (this.hasNullables) {
      // Null fields
      for (const [key] of this.fields) {
        await bytes.setBool((value[key] ?? null) === null);
      }

      if (bytes.bit > 0) {
        bytes.skip(1, "byte");
      }
    }

    // Field values
    for (const [key, field] of this.fields) {
      if ((value[key] ?? null) !== null) {
        await field.type.write(value[key], bytes);
      }
    }
  }
}

export default function struct<S extends Schema, R = Struct<S>>(
  schema: S,
  factory?: Class<R>
) {
  return new StructType(schema, factory);
}
