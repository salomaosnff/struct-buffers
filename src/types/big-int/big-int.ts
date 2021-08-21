import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class BigIntType extends Type<bigint> {
  is(value: any) {
    return typeof value === "bigint";
  }

  write(value: bigint, bytes: Bytes): Promise<void> {
    return bytes.setBigInt(value);
  }

  read(bytes: Bytes): Promise<bigint> {
    return bytes.getBigInt();
  }
}

export default new BigIntType();
