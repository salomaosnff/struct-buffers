import { Bytes } from "../bytes/bytes";
import { Type } from "./type";
import * as msgpack from "msgpack";
import { var_buffer, var_uint } from "./var";

export class JSONType extends Type<Record<string, any>> {
  constructor() {
    super();
  }

  is(value: any) {
    return value && value.constructor === Object;
  }

  async write(data: any, bytes: Bytes): Promise<void> {
    const encoded = msgpack.pack(data);

    if (encoded) {
      await var_buffer.write(encoded, bytes);
    } else throw new Error(`Unable to encode JSON!`);
  }

  async read(bytes: Bytes): Promise<any> {
    return msgpack.unpack(await var_buffer.read(bytes));
  }
}

export default new JSONType();
