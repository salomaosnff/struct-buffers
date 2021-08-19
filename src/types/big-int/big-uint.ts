import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class BigUIntType implements Type<bigint> {
  write(value: bigint, bytes: Bytes): Promise<void> {
    return bytes.setBigUInt(value);
  }

  read(bytes: Bytes): Promise<bigint> {
    return bytes.getBigUInt();
  }
}

TypeRegistry.register(BigUIntType);

export default new BigUIntType();
