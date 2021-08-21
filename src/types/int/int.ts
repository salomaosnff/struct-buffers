import { NumericType } from "../uint/numeric";

export abstract class IntType extends NumericType {
  is(value: number) {
    return super.is(value) && this.isInteger(value);
  }
}
