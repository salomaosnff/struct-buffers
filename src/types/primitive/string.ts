import { TextDecoder, TextEncoder } from "../../util";
import { Bytes } from "../../bytes/bytes";
import { Type } from "../type";
import { TypeRegistry } from "../../type-registry";

export class StringType extends Type<string> {
  encoder = new TextEncoder();
  decoder = new TextDecoder();

  is(value: any) {
    return typeof value === "string";
  }

  async write(value: string, bytes: Bytes) {
    const data = this.encoder.encode(value);

    await bytes.write(data);
    await bytes.setInt16(0x0003);
  }

  async read(bytes: Bytes) {
    let data: number[] = [];
    let lastCode = 0;

    for (let i = bytes.byte; i < bytes.length; i++) {
      const code = await bytes.getUint8();

      if (code === 0) {
        if (lastCode === 3) {
          break;
        }
      } else if (code !== 3) {
        data.push(code);
      }
      lastCode = code;
    }

    return this.decoder.decode(new Uint8Array(data));
  }
}

export default new StringType();
