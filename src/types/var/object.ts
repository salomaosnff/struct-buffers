import { VarType } from "./var";
import { Type } from "../type";
import { object16, object32, object8 } from "../object";

export class ObjectType extends VarType<Record<string, any>> {
  types: Type<Record<string, any>>[];

  constructor() {
    super();

    this.types = [object8, object16, object32];
  }
}

export default new ObjectType();
