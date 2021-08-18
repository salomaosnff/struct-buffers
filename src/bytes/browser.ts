import { Bytes } from "./bytes";

export class BrowserBytes extends Bytes {
  private buffer: DataView;

  public get length() {
    return this.buffer.byteLength;
  }

  constructor(data: Uint8Array = new Uint8Array()) {
    super();
    this.buffer = new DataView(data);
  }

  protected async _write(data: Uint8Array) {
    const buffer = await new Blob([
      this.buffer.buffer.slice(0, this.byte),
      data,
      this.buffer.buffer.slice(this.byte + data.byteLength),
    ]).arrayBuffer();

    this.buffer = new DataView(buffer);
  }

  async expand(size: number): Promise<void> {
    const buffer = await new Blob([
      this.buffer.buffer,
      new ArrayBuffer(size),
    ]).arrayBuffer();

    this.buffer = new DataView(buffer);
  }

  async readInt8() {
    return this.buffer.getInt8(this.byte);
  }

  async readInt16() {
    return this.buffer.getInt16(this.byte);
  }

  async readInt32() {
    return this.buffer.getInt32(this.byte);
  }

  async readUint8() {
    return this.buffer.getUint8(this.byte);
  }

  async readUint16() {
    return this.buffer.getUint16(this.byte);
  }

  async readUint32() {
    return this.buffer.getUint32(this.byte);
  }

  async readFloat() {
    return this.buffer.getFloat32(this.byte);
  }

  async readDouble() {
    return this.buffer.getFloat64(this.byte);
  }

  protected async readBigInt(): Promise<bigint> {
    return this.buffer.getBigInt64(this.byte);
  }

  protected async readBigUInt(): Promise<bigint> {
    return this.buffer.getBigUint64(this.byte);
  }

  async writeInt8(value: number): Promise<void> {
    this.buffer.setInt8(this.byte, value);
  }

  async writeInt16(value: number): Promise<void> {
    this.buffer.setInt16(this.byte, value);
  }

  async writeInt32(value: number): Promise<void> {
    this.buffer.setInt32(this.byte, value);
  }

  async writeUint8(value: number): Promise<void> {
    this.buffer.setUint8(this.byte, value);
  }

  async writeUint16(value: number): Promise<void> {
    this.buffer.setUint16(this.byte, value);
  }

  async writeUint32(value: number): Promise<void> {
    this.buffer.setUint32(this.byte, value);
  }

  async writeFloat(value: number): Promise<void> {
    this.buffer.setFloat32(this.byte, value);
  }

  async writeDouble(value: number): Promise<void> {
    this.buffer.setFloat64(this.byte, value);
  }

  protected async writeBigInt(value: bigint): Promise<void> {
    this.buffer.setBigInt64(this.byte, value);
  }

  protected async writeBigUInt(value: bigint): Promise<void> {
    this.buffer.setBigUint64(this.byte, value);
  }

  slice(start: number, end?: number) {
    return new Uint8Array(this.buffer.buffer.slice(start, end));
  }

  arrayBuffer() {
    return this.buffer.buffer;
  }

  async toBytes() {
    return new Uint8Array(this.buffer.buffer);
  }
}
