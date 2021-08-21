import { uint16, uint32, uint8 } from "../../uint";
import { VarNumberBase } from "./base";

export class VarUInt extends VarNumberBase {
  MIN = uint8.MIN;
  MAX = uint32.MAX;

  constructor() {
    super([uint8, uint16, uint32]);
  }

  shiftRight(value: number) {
    return value >>> this.RESERVED_BITS;
  }
}

export default new VarUInt();
