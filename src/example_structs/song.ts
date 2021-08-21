import { Field, Struct } from "../decorators";
import {
  array16,
  array8,
  string,
  uint8,
  var_array,
  var_number,
  var_uint,
} from "../types";
import dynamic from "../types/dynamic";

@Struct()
export class Song {
  @Field()
  bool_1: boolean;

  @Field()
  bool_2: boolean;

  @Field()
  bool_3: boolean;

  @Field()
  bool_4: boolean;

  constructor(data: Song) {
    Object.assign(this, data);
  }
}
