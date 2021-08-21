import { NumericType } from "./numeric";

export abstract class UIntType extends NumericType {
  MIN = 0;

  is(value: number) {
    return super.is(value) && this.isInteger(value);
  }
}
