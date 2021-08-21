import { VarType } from "./var";
import { array8, array16, array32 } from "../array";
import { Type } from "../type";
import { Class } from "../../util";

export class ArrayType<T> extends VarType<T[]> {
  types: Type<T[]>[];

  constructor(type: Type<T> | Class<T>) {
    super([type]);

    this.types = [array8(type), array16(type), array32(type)];
  }
}

export default function <T>(type: Type<T> | Class<T>) {
  return new ArrayType(type);
}
