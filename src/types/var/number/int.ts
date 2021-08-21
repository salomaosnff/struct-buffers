import { int16, int32, int8 } from "../../int";
import { VarNumberBase } from "./base";

export class VarInt extends VarNumberBase {
  MIN = int8.MIN;
  MAX = int32.MAX;

  constructor() {
    super([int8, int16, int32]);
  }
}

export default new VarInt();
