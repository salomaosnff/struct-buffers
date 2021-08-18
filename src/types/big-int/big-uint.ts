import { Bytes } from "../../bytes/bytes";
import { Type } from "../type";

export class BigUIntType implements Type<bigint> {
  write(value: bigint, bytes: Bytes): Promise<void> {
    return bytes.setBigUInt(value);
  }

  read(bytes: Bytes): Promise<bigint> {
    return bytes.getBigUInt();
  }
}

export default new BigUIntType();
