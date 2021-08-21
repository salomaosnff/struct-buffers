import { VarType } from "./var";
import { set8, set16, set32 } from "../set";
import { Type } from "../type";

export class SetType<T> extends VarType<Set<T>> {
  types: Type<Set<T>>[];

  constructor(type: Type<T>) {
    super([type]);

    this.types = [set8(type), set16(type), set32(type)];
  }
}

export default function <T>(type: Type<T>) {
  return new SetType(type);
}
