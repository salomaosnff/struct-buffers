import { Type } from "../type";

export abstract class NumericType extends Type<number> {
  readonly MIN = -Infinity;
  readonly MAX = Infinity;

  is(value: number) {
    return this.isNumber(value) && this.isInRange(value);
  }

  isNumber(value: number) {
    return typeof value === "number" && !Number.isNaN(value);
  }

  isInteger(value: number) {
    return value % 1 === 0;
  }

  isInRange(value: number) {
    return value >= this.MIN && value <= this.MAX;
  }
}
