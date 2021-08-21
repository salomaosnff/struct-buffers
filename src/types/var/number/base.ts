import { NumericType } from "../../uint/numeric";
import { Bytes } from "../../../bytes/bytes";

export abstract class VarNumberBase extends NumericType {
  readonly RESERVED_BITS: number;
  readonly TYPE_MASK: number;

  constructor(public readonly types: NumericType[]) {
    super();

    this.RESERVED_BITS = Math.ceil(Math.log2(this.types.length));
    this.TYPE_MASK = 2 ** this.RESERVED_BITS - 1;
  }

  is(value: number) {
    return this.types.some(this.typeFinder(value));
  }

  shiftLeft(value: number) {
    return value << this.RESERVED_BITS;
  }

  shiftRight(value: number) {
    return value >> this.RESERVED_BITS;
  }

  typeFinder(value: number) {
    return (type: NumericType) =>
      type.is(value) && value <= this.shiftRight(type.MAX);
  }

  async write(value: number, bytes: Bytes) {
    const typeIndex = this.types.findIndex(this.typeFinder(value));
    const type = this.types[typeIndex];

    value = this.shiftLeft(value) | typeIndex;

    await type.write(value, bytes);
  }

  async read(bytes: Bytes) {
    const firstByte = await bytes.readUint8();
    const typeIndex = firstByte & this.TYPE_MASK;
    const type = this.types[typeIndex];

    return this.shiftRight(await type.read(bytes));
  }
}
