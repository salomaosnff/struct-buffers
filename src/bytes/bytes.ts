export abstract class Bytes {
  private pos = 0;

  get byte() {
    return this.pos | 0;
  }

  get bit() {
    return ((this.pos - this.byte) * 8) | 0;
  }

  reset() {
    this.pos = 0;
    return this;
  }

  skip(value: number, unit: "bit" | "byte") {
    if (unit === "bit") {
      this.pos += (value | 0) / 8;
    } else if (unit === "byte") {
      this.pos = (this.byte + value) | 0;
    }
  }

  goto(unit: "bit" | "byte", value: number) {
    if (unit === "bit") {
      this.pos = this.byte + (value | 0) / 8;
    } else if (unit === "byte") {
      this.pos = value | 0;
    }
  }

  public abstract length: number;

  public abstract expand(size: number): Promise<void>;
  protected abstract _write(buffer: Uint8Array): Promise<void>;
  public abstract toBytes(): Uint8Array;
  public abstract slice(start: number, end?: number): Uint8Array;
  public abstract destroy(): void;

  abstract readInt8(): Promise<number>;
  abstract readInt16(): Promise<number>;
  abstract readInt32(): Promise<number>;
  abstract readUint8(): Promise<number>;
  abstract readUint16(): Promise<number>;
  abstract readUint32(): Promise<number>;
  abstract readFloat(): Promise<number>;
  abstract readDouble(): Promise<number>;
  abstract readBigInt(): Promise<bigint>;
  abstract readBigUInt(): Promise<bigint>;

  protected abstract writeInt8(value: number): Promise<void>;
  protected abstract writeInt16(value: number): Promise<void>;
  protected abstract writeInt32(value: number): Promise<void>;
  protected abstract writeUint8(value: number): Promise<void>;
  protected abstract writeUint16(value: number): Promise<void>;
  protected abstract writeUint32(value: number): Promise<void>;
  protected abstract writeFloat(value: number): Promise<void>;
  protected abstract writeDouble(value: number): Promise<void>;
  protected abstract writeBigInt(value: bigint): Promise<void>;
  protected abstract writeBigUInt(value: bigint): Promise<void>;

  async alloc(size: number, unit: "bit" | "byte") {
    const lastByte = unit === "bit" ? this.length - 1 : this.length;
    let index = this.byte;

    if (unit === "byte") {
      if (this.bit > 0) {
        this.pos = (this.byte + 1) | 0;
      }
      return this.expand(size | 0);
    } else if (unit === "bit") {
      index = (index + size / 8) | 0;
    }

    if (index >= lastByte) {
      await this.expand(index - lastByte);
    }
  }

  async write(data: Uint8Array) {
    await this._write(data);

    this.skip(data.byteLength, "byte");
  }

  async getBool() {
    const value = await this.readBool();
    this.skip(1, "bit");
    return value;
  }

  async setBool(value: boolean) {
    await this.alloc(1, "bit");
    await this.writeBool(value);
    this.skip(1, "bit");
    return this;
  }

  protected async readBool() {
    return Boolean(((await this.readInt8()) >> (7 - this.bit)) & 1);
  }

  protected async writeBool(value: boolean) {
    let bit = Number(value) << (7 - this.bit);
    await this.writeUint8((await this.readUint8()) | bit);
  }

  async getInt8() {
    const value = await this.readInt8();
    this.skip(1, "byte");
    return value;
  }

  async getInt16() {
    const value = await this.readInt16();
    this.skip(2, "byte");
    return value;
  }

  async getInt32() {
    const value = await this.readInt32();
    this.skip(4, "byte");
    return value;
  }

  async getUint8() {
    const value = await this.readUint8();
    this.skip(1, "byte");
    return value;
  }

  async getUint16() {
    const value = await this.readUint16();
    this.skip(2, "byte");
    return value;
  }

  async getUint32() {
    const value = await this.readUint32();
    this.skip(4, "byte");
    return value;
  }

  async getFloat() {
    const value = await this.readFloat();
    this.skip(4, "byte");
    return value;
  }

  async getDouble() {
    const value = await this.readDouble();
    this.skip(8, "byte");
    return value;
  }

  async getBigInt() {
    const value = await this.readBigInt();
    this.skip(8, "byte");
    return value;
  }

  async getBigUInt() {
    const value = await this.readBigUInt();
    this.skip(8, "byte");
    return value;
  }

  async setInt8(value: number) {
    await this.alloc(1, "byte");
    await this.writeInt8(value | 0);

    this.skip(1, "byte");
  }

  async setInt16(value: number) {
    await this.alloc(2, "byte");
    await this.writeInt16(value | 0);

    this.skip(2, "byte");
  }

  async setInt32(value: number) {
    await this.alloc(4, "byte");
    await this.writeInt32(value | 0);

    this.skip(4, "byte");
  }

  async setUint8(value: number) {
    await this.alloc(1, "byte");
    await this.writeUint8(value >>> 0);

    this.skip(1, "byte");
  }

  async setUint16(value: number) {
    await this.alloc(2, "byte");
    await this.writeUint16(value >>> 0);

    this.skip(2, "byte");
  }

  async setUint32(value: number) {
    await this.alloc(4, "byte");
    await this.writeUint32(value >>> 0);

    this.skip(4, "byte");
  }

  async setFloat(value: number) {
    await this.alloc(4, "byte");
    await this.writeFloat(value);

    this.skip(4, "byte");
  }

  async setDouble(value: number) {
    await this.alloc(8, "byte");
    await this.writeDouble(value);

    this.skip(8, "byte");
  }

  async setBigInt(value: bigint) {
    await this.alloc(8, "byte");
    await this.writeBigInt(value);

    this.skip(8, "byte");
  }

  async setBigUInt(value: bigint) {
    await this.alloc(8, "byte");
    await this.writeBigUInt(value);
    this.skip(8, "byte");
  }

  static randomBytes(size: number) {
    return new (this as any)(
      new Uint8Array(size).map(() => (Math.random() * 255) | 0)
    );
  }
}
