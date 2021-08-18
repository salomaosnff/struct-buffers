import { Bytes } from "../../bytes/bytes";
import { Type } from "../type";

export class BigIntType implements Type<bigint> {
  write(value: bigint, bytes: Bytes): Promise<void> {
    return bytes.setBigInt(value);
  }

  read(bytes: Bytes): Promise<bigint> {
    return bytes.getBigInt();
  }
}

export default new BigIntType();
