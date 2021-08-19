import { Bytes } from "../../bytes/bytes";
import { TypeRegistry } from "../../type-registry";
import { Type } from "../type";

export class Buffer8Type implements Type<Uint8Array> {
  MAX_LENGTH = 0xff;

  async validate(buffer: Uint8Array) {
    return buffer.byteLength <= this.MAX_LENGTH;
  }

  protected async writeLengthByte(length: number, bytes: Bytes) {
    await bytes.setUint8(length);
  }

  protected async readLengthByte(bytes: Bytes): Promise<number> {
    return bytes.getUint8();
  }

  async write(value: Uint8Array, bytes: Bytes) {
    const length = value.byteLength;

    await this.writeLengthByte(length, bytes);
    await bytes.write(value);
  }

  async read(bytes: Bytes): Promise<Uint8Array> {
    const length = await this.readLengthByte(bytes);
    const buffer = bytes.slice(bytes.byte, bytes.byte + length);

    bytes.skip(length, "byte");

    return buffer;
  }
}

TypeRegistry.register(Buffer8Type);

export default new Buffer8Type();
