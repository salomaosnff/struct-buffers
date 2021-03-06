import { Type } from "./types/type";
import { Class } from "./util";
import { Bytes } from "./bytes/bytes";

export interface TypeRegistryEntry<T> {
  name: string;
  type: Type<T>;
}

export class TypeRegistry {
  static types: Array<TypeRegistryEntry<any>> = [];
  static locked = false;

  static get size() {
    return TypeRegistry.types.length;
  }

  static get bytesSize() {
    return Math.ceil(Math.log2(TypeRegistry.length) / 8);
  }

  static clear() {
    TypeRegistry.types = [];
  }

  static getTypeNames() {
    return this.types.map((t) => t.name);
  }

  static register<T, R>(dataType: Type<T> | Class<T>) {
    if (this.locked) {
      throw new Error("TypeRegistry is locked");
    }
    const name = TypeRegistry.getTypeName(dataType);
    const type = TypeRegistry.getTypeSchema(dataType);
    const index = TypeRegistry._findTypeIndex(name);
    this.types.splice(index, 0, {
      type,
      name,
    } as TypeRegistryEntry<T>);
  }

  static lock() {
    if (!this.locked) {
      this.locked = true;
      this.types = Object.freeze(this.types) as Array<TypeRegistryEntry<any>>;
    }
  }

  static async setBytesFromType<T>(dataType: Type<T> | Class<T>, bytes: Bytes) {
    await this.setBytesCode(this.getCode(dataType), bytes);
    const type = this.getTypeSchema(dataType);

    // Subtypes
    if (type.subTypes.length > 0) {
      for (let subType of type.subTypes) {
        await this.setBytesFromType(subType, bytes);
      }
    }
  }

  static async getTypeFromBytes<T>(bytes: Bytes): Promise<Type<T>> {
    const code = await this.getBytesCode(bytes);
    const entry = TypeRegistry.getEntry<T>(code);

    const type = Object.assign(Object.create(entry.type), entry.type, {
      subTypes: [],
    }) as Type<T>;

    if (entry.type.subTypes.length > 0) {
      for (let _ of entry.type.subTypes) {
        type.subTypes.push(await TypeRegistry.getTypeFromBytes(bytes));
      }
    }

    return type;
  }

  static async setBytesCode(code: number, bytes: Bytes) {
    if (TypeRegistry.bytesSize <= 1) return bytes.setUint8(code);
    if (TypeRegistry.bytesSize <= 2) return bytes.setUint16(code);
    if (TypeRegistry.bytesSize <= 4) return bytes.setUint32(code);
    throw new Error(
      `Maximum amount of data types exceeded: ${this.bytesSize} > ${2 ** 32}`
    );
  }

  static async getBytesCode(bytes: Bytes) {
    if (TypeRegistry.bytesSize <= 1) return bytes.getUint8();
    if (TypeRegistry.bytesSize <= 2) return bytes.getUint16();
    if (TypeRegistry.bytesSize <= 4) return bytes.getUint32();
    throw new Error(
      `Maximum amount of data types exceeded: ${TypeRegistry.bytesSize} > ${
        2 ** 32
      }`
    );
  }

  static getEntry<T>(code: number): TypeRegistryEntry<T> {
    return this.types[code];
  }

  static getType<T>(code: number): Type<T> {
    return TypeRegistry.getEntry<T>(code).type;
  }

  static getCode(type: Type<any> | Class<any>) {
    const typeName = TypeRegistry.getTypeName(type);
    const index = TypeRegistry._findTypeIndex(typeName);
    const foundType = this.types[index];

    if (!foundType || typeName !== foundType.name) {
      throw new TypeError(`Type "${typeName}" not registered`);
    }

    return index;
  }

  static getTypeName(type: Type<any> | Class<any>) {
    return type.name;
  }

  static getTypeSchema<T>(dataType: Type<T> | Class<T>): Type<T> {
    const schema = Reflect.getMetadata("struct:schema", dataType);
    if (schema) {
      return Reflect.getMetadata("struct:schema", dataType);
    }

    if (typeof dataType === "function") {
      return Reflect.construct(dataType, []);
    }
    return dataType;
  }

  private static _findTypeIndex(typeName: string): number {
    if (!this.types.length) return 0;
    let size = this.types.length;
    let start = 0;
    let end = size;
    let index, lastIndex;
    let currentTypeName;

    do {
      lastIndex = index;
      index = ((start + end) / 2) | 0;
      currentTypeName = this.types[index].name;

      if (typeName < currentTypeName) {
        end = index;
      } else if (typeName > currentTypeName) {
        start = index;
      }
    } while (start < end && index !== lastIndex);

    if (currentTypeName < typeName) {
      index++;
    }

    return index;
  }
}
