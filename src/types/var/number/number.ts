import { var_int } from ".";
import { int16, int32, int8 } from "../../int";
import { uint16, uint32, uint8 } from "../../uint";
import { VarNumberBase } from "./base";

export class VarNumber extends VarNumberBase {
  MIN = int32.MIN;
  MAX = uint32.MAX;

  constructor() {
    super([uint8, uint16, uint32, int8, int16, int32]);
  }

  shiftRight(value: number) {
    if (value < 0) {
      return value >> this.RESERVED_BITS;
    } else {
      return value >>> this.RESERVED_BITS;
    }
  }
}

export default new VarNumber();
