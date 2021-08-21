import { Bytes } from "./bytes/bytes";
import { NodeBytes } from "./bytes/node";
import { BrowserBytes } from "./bytes/browser";
import { StructType } from "./types/struct";

export type Class<T> = new (...args: any[]) => T;

export const isNode = typeof process.pid !== "undefined";
export const isBrowser = !isNode;

export function createBytes(
  buffer: Uint8Array | Uint8Array = new Uint8Array()
) {
  return isNode ? new NodeBytes(Buffer.from(buffer)) : new BrowserBytes(buffer);
}

export const TextEncoder: typeof self.TextEncoder = isNode
  ? require("util").TextEncoder
  : self.TextEncoder;

export const TextDecoder: typeof self.TextDecoder = isNode
  ? require("util").TextDecoder
  : self.TextDecoder;

export function printBytes(bytes: Bytes | Uint8Array, base = 16) {
  let str = `Tamanho em bytes: ${bytes.length}\n`;

  const buffer = bytes instanceof Uint8Array ? bytes : bytes.toBytes();
  let pad = base === 2 ? 8 : 2;

  str += buffer.reduce(
    (str, byte) =>
      str + " " + byte.toString(base).toUpperCase().padStart(pad, "0"),
    ""
  );

  return str;
}

export function getStruct<T>(type: Class<T>) {
  const struct: StructType<any> = Reflect.getMetadata("struct:schema", type);

  if (!type) {
    throw new TypeError(`${type.name} não é uma Struct!`);
  }

  return struct;
}

export async function encodeClass<T>(type: Class<T>, data: T): Promise<Bytes> {
  const bytes = createBytes();

  await getStruct(type).write(data as any, bytes);

  bytes.goto("byte", 0);

  return bytes;
}

export async function encodeInstance<T>(data: T) {
  return encodeClass(data.constructor as Class<typeof data>, data);
}

export async function decodeClass<T>(type: Class<T>, bytes: Bytes): Promise<T> {
  return getStruct(type).read(bytes) as any as Promise<T>;
}

export function mask(bytes: Bytes | Uint8Array, mask: Bytes | Uint8Array) {
  if (bytes instanceof Bytes) {
    bytes = bytes.toBytes();
  }

  if (mask instanceof Bytes) {
    mask = mask.toBytes();
  }

  const buffer = new Uint8Array(bytes);

  for (let i = 0; i < buffer.length; i++) {
    buffer[i] ^= mask[i % mask.length];
  }

  return buffer;
}
