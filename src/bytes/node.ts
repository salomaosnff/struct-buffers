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

  async readInt8() {
    return this.buffer.readInt8(this.byte);
  }

  async readInt16() {
    return this.buffer.readInt16LE(this.byte);
  }

  async readInt32() {
    return this.buffer.readInt32LE(this.byte);
  }

  async readUint8() {
    return this.buffer.readUInt8(this.byte);
  }

  async readUint16() {
    return this.buffer.readUInt16LE(this.byte);
  }

  async readUint32() {
    return this.buffer.readUInt32LE(this.byte);
  }

  async readFloat() {
    return this.buffer.readFloatLE(this.byte);
  }

  async readDouble() {
    return this.buffer.readDoubleLE(this.byte);
  }

  async readBigInt() {
    return this.buffer.readBigInt64LE(this.byte);
  }

  async readBigUInt() {
    return this.buffer.readBigUInt64LE(this.byte);
  }

  protected async writeInt8(value: number): Promise<void> {
    this.buffer.writeInt8(value, this.byte);
  }

  protected async writeInt16(value: number): Promise<void> {
    this.buffer.writeInt16LE(value, this.byte);
  }

  protected async writeInt32(value: number): Promise<void> {
    this.buffer.writeInt32LE(value, this.byte);
  }

  protected async writeUint8(value: number): Promise<void> {
    this.buffer.writeUInt8(value, this.byte);
  }

  protected async writeUint16(value: number): Promise<void> {
    this.buffer.writeUInt16LE(value, this.byte);
  }

  protected async writeUint32(value: number): Promise<void> {
    this.buffer.writeUInt32LE(value, this.byte);
  }

  protected async writeFloat(value: number): Promise<void> {
    this.buffer.writeFloatLE(value, this.byte);
  }

  protected async writeDouble(value: number): Promise<void> {
    this.buffer.writeDoubleLE(value, this.byte);
  }

  protected async writeBigInt(value: bigint) {
    this.buffer.writeBigInt64LE(value, this.byte);
  }

  protected async writeBigUInt(value: bigint) {
    this.buffer.writeBigUInt64LE(value, this.byte);
  }

  slice(start: number, end?: number) {
    return this.buffer.slice(start, end);
  }

  toBuffer() {
    return this.buffer;
  }

  toBytes() {
    return this.toBuffer();
  }

  destroy() {
    this.buffer = null;
  }
}
