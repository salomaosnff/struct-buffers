import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class BigIntType implements Type<bigint> {
  write(value: bigint, bytes: Bytes): Promise<void> {
    return bytes.setBigInt(value);
  }

  read(bytes: Bytes): Promise<bigint> {
    return bytes.getBigInt();
  }
}

TypeRegistry.register(BigIntType);

export default new BigIntType();
