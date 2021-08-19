import { TextDecoder, TextEncoder } from "../../util";
import { Bytes } from "../../bytes/bytes";
import { Type } from "../type";
import { TypeRegistry } from "../../type-registry";

export class StringType extends Type<string> {
  encoder = new TextEncoder();
  decoder = new TextDecoder();

  async write(value: string, bytes: Bytes) {
    const data = this.encoder.encode(value);

    await bytes.write(data);
    await bytes.setInt16(0x0003);
  }

  async read(bytes: Bytes) {
    let data: number[] = [];

    for (let i = bytes.byte; i < bytes.length; i++) {
      const code = await bytes.getInt8();

      if (code === 0 && (await bytes.getInt8()) === 3) {
        break;
      }

      data.push(code);
    }

    return this.decoder.decode(new Uint8Array(data));
  }
}

TypeRegistry.register(StringType);
export default new StringType();
