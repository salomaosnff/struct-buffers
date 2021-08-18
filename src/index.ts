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
import {
  array16,
  array8,
  bigInt,
  bigUInt,
  int8,
  map8,
  set8,
  string,
} from "./types";
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
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  artist: Artist;

  @Field({ type: array16(string) })
  scope: string[];

  @Field()
  bool_0: boolean;

  @Field()
  bool_1: boolean;

  @Field()
  bool_2: boolean;

  @Field()
  bool_3: boolean;

  @Field()
  bool_4: boolean;

  @Field()
  bool_5: boolean;

  @Field()
  bool_6: boolean;

  @Field({ required: false })
  bool_7?: boolean;
}

// const worker = new Worker("worker.ts");

// worker.postMessage("test");

// worker.addEventListener("message", async (e) => {
//   const buffer = e.data as Uint8Array;

//   console.log(await decodeClass(Song, createBytes(buffer)));
// });

async function main() {
  const obj: Song = {
    id: 1,
    artist: {
      id: 1,
      createdAt: new Date(),
      name: "A".repeat(1000),
    },
    bool_0: true,
    bool_1: true,
    bool_2: true,
    bool_3: true,
    bool_4: true,
    bool_5: true,
    bool_6: true,
    bool_7: false,
    title: "T".repeat(1000),
    scope: new Array(1000).fill("Test"),
  };

  const encoded = await encodeClass(Song, obj);

  console.log(await printBytes(encoded, 2));
  console.log(await decodeClass(Song, encoded));

  // console.time("json");
  // const data = JSON.stringify(obj);
  // console.log(data.length, data);
  // console.timeEnd("json");
}

main();
