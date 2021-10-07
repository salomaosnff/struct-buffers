import { writeFile, writeFileSync } from "fs";
import "reflect-metadata";
import { Field } from "./decorators/field";
import { Struct } from "./decorators/struct";
import { TypeRegistry } from "./type-registry";
import {
  array8,
  boolean,
  dynamic,
  string,
  struct,
  time32,
  var_int,
} from "./types";
import { Time } from "./types/time/time";
import map from "./types/var/map";
import uint from "./types/var/number/uint";
import object from "./types/var/object";
import set from "./types/var/set";
import { decodeClass, encodeClass, printBytes } from "./util";

@Struct()
class User {
  @Field(uint)
  id: number;

  @Field(string, { required: false })
  name: string;

  @Field(string, { required: false })
  email?: string;

  @Field(boolean)
  flag1: boolean;

  @Field(boolean)
  flag2: boolean;

  @Field(boolean)
  flag3: boolean;

  @Field(time32)
  time: Time;
}

async function main() {
  const userData: Partial<User> = {
    flag1: true,
    flag2: false,
    flag3: true,
    id: 5,
    time: new Time({ hours: 4, minutes: 5, seconds: 56 }),
  };

  const data = await encodeClass(User, userData);
  const decode = await decodeClass(User, data);
  const json = JSON.stringify(userData);

  console.log(decode);
  console.log(json);

  console.log(data.length, json.length);
}

main();

// export * from "./type-registry";
// export * from "./decorators";
// export * as types from "./types";
// export { createBytes } from "./util";
