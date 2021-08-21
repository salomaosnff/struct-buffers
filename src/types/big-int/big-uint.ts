import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class BigUIntType extends Type<bigint> {
  is(value: any) {
    return typeof value === "bigint" && value >= 0;
  }

  write(value: bigint, bytes: Bytes): Promise<void> {
    return bytes.setBigUInt(value);
  }

  read(bytes: Bytes): Promise<bigint> {
    return bytes.getBigUInt();
  }
}

export default new BigUIntType();
