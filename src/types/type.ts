import { Bytes } from "../bytes/bytes";
import { TypeRegistry } from "../type-registry";
import { Class } from "../util";

export abstract class Type<T> {
  readonly name: string;
  readonly subTypes: Type<any>[];

  abstract is(value: any): boolean;
  abstract write(value: T, bytes: Bytes): Promise<void>;
  abstract read(bytes: Bytes): Promise<T>;

  constructor(subTypes: Array<Type<any> | Class<any>> = [], name?: string) {
    this.name = name ?? this.constructor.name;
    TypeRegistry.register(this as Type<T>);

    this.subTypes = subTypes.map((t) => TypeRegistry.getTypeSchema(t));
  }

  validate?(value: T): Promise<boolean> {
    return Promise.resolve(true);
  }
}
