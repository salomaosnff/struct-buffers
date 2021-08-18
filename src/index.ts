import "reflect-metadata";

import { Time } from "./types/time/time";
import { Field } from "./decorators/field";
import { Struct } from "./decorators/struct";
import {
  createBytes,
  decodeClass,
  encodeClass,
  encodeInstance,
  encrypt,
  printBytes,
} from "./util";
import bigUint from "./types/big-int/big-uint";
import { array8, bigInt, bigUInt, int8, map8, set8, string } from "./types";
import { readFileSync, writeFileSync } from "fs";
import { NodeBytes } from "./bytes/node";

Error.stackTraceLimit = Infinity;

@Struct()
class Artist {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;
}

@Struct()
class Song {
  @Field({ required: false })
  id: number;

  @Field({ required: false })
  title: string;

  @Field({ required: false })
  artist: Artist;

  @Field({ type: array8(string), required: false })
  scope: string[];

  @Field({ required: false })
  bool_0: boolean;

  @Field({ required: false })
  bool_1: boolean;

  @Field({ required: false })
  bool_2: boolean;

  @Field({ required: false })
  bool_3: boolean;

  @Field({ required: false })
  bool_4: boolean;

  @Field({ required: false })
  bool_5: boolean;

  @Field({ required: false })
  bool_6: boolean;

  @Field({ required: false })
  bool_7: boolean;
}

async function main() {
  const obj: Song = {
    id: null,
    artist: null,
    bool_0: null,
    bool_1: true,
    bool_2: true,
    bool_3: false,
    bool_4: true,
    bool_5: true,
    bool_6: true,
    bool_7: true,
    title: null,
    scope: null,
  };

  console.time("encode");
  const encoded = await encodeClass(Song, obj);
  console.timeEnd("encode");

  console.log(await printBytes(encoded, 2));

  console.time("json");
  const data = JSON.stringify(obj);
  console.log(data.length, data);
  console.timeEnd("json");
}

main();
