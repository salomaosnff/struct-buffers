import {
  big_int,
  boolean,
  buffer32,
  string,
  time32,
  date_time,
  var_number,
  var_array,
  var_map,
  var_set,
  dynamic,
} from "../types";
import { Time } from "../types/time/time";
import { Type } from "./type";
import { var_object } from "./var";

export const PRIMITIVE_MAP = new Map<Function, Type<any>>([
  [Boolean, boolean],
  [Number, var_number],
  [String, string],
  [Date, date_time],
  [BigInt, big_int],
  [Time, time32],
  [Uint8Array, buffer32],
  [Array, var_array(dynamic)],
  [Map, var_map(dynamic, dynamic)],
  [Set, var_set(dynamic)],
  [Object, var_object],
]);
