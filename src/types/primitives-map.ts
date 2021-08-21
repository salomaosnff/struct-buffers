import {
  bigInt,
  boolean,
  buffer32,
  string,
  time32,
  dateTime,
  var_number,
  var_array,
  var_map,
  var_set,
  dynamic,
} from "../types";
import { Time } from "../types/time/time";
import { object16 } from "./object";
import { Type } from "./type";
import { var_object } from "./var";

export const PRIMITIVE_MAP = new Map<Function, Type<any>>([
  [Boolean, boolean],
  [Number, var_number],
  [String, string],
  [Date, dateTime],
  [BigInt, bigInt],
  [Time, time32],
  [Uint8Array, buffer32],
  [Array, var_array(dynamic)],
  [Map, var_map(dynamic, dynamic)],
  [Set, var_set(dynamic)],
  [Object, var_object],
]);
