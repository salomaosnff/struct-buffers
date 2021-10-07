import { VarType } from "./var";
import { buffer8, buffer16, buffer32 } from "../buffer";

export class BufferType extends VarType<Uint8Array> {
  types = [buffer8, buffer16, buffer32];
}

export default new BufferType();
