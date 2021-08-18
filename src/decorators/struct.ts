import struct from "../types/struct";

export function Struct(): ClassDecorator {
  return (target) => {
    const schema = struct(
      Reflect.getMetadata("struct:fields", target) ?? {},
      target as any
    );

    Reflect.defineMetadata("struct:schema", schema, target);
  };
}
