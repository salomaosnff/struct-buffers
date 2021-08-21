import "reflect-metadata";

import { Field } from "./decorators/field";
import { Struct } from "./decorators/struct";
import {
  createBytes,
  decodeClass,
  encodeClass,
  encodeInstance,
  mask,
  printBytes,
} from "./util";
import {
  array16,
  array8,
  int8,
  map8,
  set8,
  string,
  time32,
  uint8,
  var_int,
  var_uint,
  var_number,
  uint16,
  uint32,
  boolean,
  object8,
} from "./types";
import dynamic, { DynamicType, DynamicValue } from "./types/dynamic";
import { Song } from "./example_structs/song";
import { Time } from "./types/time/time";
import { readFileSync, writeFileSync } from "fs";
import { TypeRegistry } from "./type-registry";
import { ObjectType } from "./types/var/object";

Error.stackTraceLimit = Infinity;

@Struct()
class Data {
  @Field(dynamic)
  data: any;
}

async function main() {
  // JSON 154 bytes
  // ENCODED 49 bytes
  // const data: Song = {
  //   id: 32,
  //   title: "Nome da musica",
  //   bool: true,
  //   duration: new Time({ minutes: 4, seconds: 45 }),
  //   artist: {
  //     id: 7,
  //     name: "Nome do artista",
  //     createdAt: new Date("1990-05-05"),
  //   },
  // };

  // const encoded = await encodeClass(Song, data);
  // const masked = mask(encoded, createBytes(Buffer.from("teste")));

  // writeFileSync("data.bin", masked);

  // console.log(printBytes(createBytes(masked)));

  const data: Data = {
    data: [
      1,
      new Song({ bool_1: true, bool_2: false, bool_3: false, bool_4: true }),
      new Song({ bool_1: true, bool_2: false, bool_3: false, bool_4: true }),
      new Song({ bool_1: true, bool_2: false, bool_3: false, bool_4: true }),
      new Song({ bool_1: false, bool_2: false, bool_3: false, bool_4: true }),
      new Song({ bool_1: false, bool_2: false, bool_3: false, bool_4: true }),
      new Song({ bool_1: false, bool_2: true, bool_3: false, bool_4: true }),
      new Song({ bool_1: false, bool_2: true, bool_3: false, bool_4: true }),
      new Song({ bool_1: false, bool_2: true, bool_3: false, bool_4: true }),
      new Song({ bool_1: true, bool_2: false, bool_3: false, bool_4: true }),
      new Song({ bool_1: true, bool_2: false, bool_3: false, bool_4: true }),
      new Song({ bool_1: true, bool_2: false, bool_3: false, bool_4: true }),
      { bool_1: true, bool_2: false, bool_3: false, bool_4: true },
      { bool_1: true, bool_2: false, bool_3: false, bool_4: true },
      { bool_1: true, bool_2: false, bool_3: false, bool_4: true },
      [
        { bool_1: true, bool_2: false, bool_3: false, bool_4: true },
        { bool_1: true, bool_2: false, bool_3: false, bool_4: true },
        150,
      ],
      500000000n,
    ],
  };

  const encoded = await encodeClass(Data, data);

  console.log(printBytes(encoded, 2));

  encoded.reset();

  console.log(await decodeClass(Data, encoded));
  console.log(JSON.stringify(data).length);
}

main();
