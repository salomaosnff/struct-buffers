import { Bytes } from "./bytes";

export class NodeBytes extends Bytes {
  public get length() {
    return this.buffer.byteLength;
  }

  constructor(private buffer: Buffer = Buffer.alloc(0)) {
    super();
  }

  protected async _write(data: Uint8Array) {
    this.buffer = Buffer.concat([
      this.buffer.slice(0, this.byte),
      data,
      this.buffer.slice(this.byte + data.byteLength),
    ]);
  }

  async expand(size: number): Promise<void> {
    this.buffer = Buffer.concat([this.buffer, Buffer.alloc(size)]);
  }

  protected async readInt8() {
    return this.buffer.readInt8(this.byte);
  }

  protected async readInt16() {
    return this.buffer.readInt16BE(this.byte);
  }

  protected async readInt32() {
    return this.buffer.readInt32BE(this.byte);
  }

  protected async readUint8() {
    return this.buffer.readUInt8(this.byte);
  }

  protected async readUint16() {
    return this.buffer.readUInt16BE(this.byte);
  }

  protected async readUint32() {
    return this.buffer.readUInt32BE(this.byte);
  }

  protected async readFloat() {
    return this.buffer.readFloatBE(this.byte);
  }

  protected async readDouble() {
    return this.buffer.readDoubleBE(this.byte);
  }

  protected async readBigInt() {
    return this.buffer.readBigInt64BE(this.byte);
  }

  protected async readBigUInt() {
    return this.buffer.readBigUInt64BE(this.byte);
  }

  protected async writeInt8(value: number): Promise<void> {
    this.buffer.writeInt8(value, this.byte);
  }

  protected async writeInt16(value: number): Promise<void> {
    this.buffer.writeInt16BE(value, this.byte);
  }

  protected async writeInt32(value: number): Promise<void> {
    this.buffer.writeInt32BE(value, this.byte);
  }

  protected async writeUint8(value: number): Promise<void> {
    this.buffer.writeUInt8(value, this.byte);
  }

  protected async writeUint16(value: number): Promise<void> {
    this.buffer.writeUInt16BE(value, this.byte);
  }

  protected async writeUint32(value: number): Promise<void> {
    this.buffer.writeUInt32BE(value, this.byte);
  }

  protected async writeFloat(value: number): Promise<void> {
    this.buffer.writeFloatBE(value, this.byte);
  }

  protected async writeDouble(value: number): Promise<void> {
    this.buffer.writeDoubleBE(value, this.byte);
  }

  protected async writeBigInt(value: bigint) {
    this.buffer.writeBigInt64BE(value, this.byte);
  }

  protected async writeBigUInt(value: bigint) {
    this.buffer.writeBigUInt64BE(value, this.byte);
  }

  slice(start: number, end?: number) {
    return this.buffer.slice(start, end);
  }

  toBuffer() {
    return this.buffer;
  }

  async toBytes() {
    return this.toBuffer();
  }
}
