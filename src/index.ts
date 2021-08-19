import "reflect-metadata";

import { Field } from "./decorators/field";
import { Struct } from "./decorators/struct";
import { createBytes, printBytes } from "./util";
import {
  array16,
  array8,
  int8,
  map8,
  set8,
  string,
  time32,
  uint8,
} from "./types";
import dynamic, { DynamicValue } from "./types/dynamic";
import { TypeRegistry } from "./type-registry";
import { Array8Type } from "./types/array/array8";
import { Time } from "./types/time/time";

Error.stackTraceLimit = Infinity;

@Struct()
class Artist {
  // @Field({ type: uint8 })
  // id: number;

  // @Field()
  // name: string;

  // @Field()
  // createdAt: Date;

  @Field({ type: array8(dynamic) })
  test: DynamicValue[];
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

  @Field({ required: false })
  bool: boolean;
}

async function main() {
  TypeRegistry.register(Artist);
  console.log("array8", TypeRegistry.getCode(Array8Type));
  console.log("Artist", TypeRegistry.getCode(Artist));
  console.log("int8", TypeRegistry.getCode(int8));
  console.log("dynamic", TypeRegistry.getCode(dynamic));

  const bytes = createBytes();

  console.time("dynamic write");
  await dynamic.write(
    dynamic.create(array8(array8(dynamic)), [
      [dynamic.create(int8, 1)],
      [dynamic.create(string, "Hello, World!")],
      [
        dynamic.create(time32, new Time({ hours: 20 })),
        dynamic.create(array8(array8(dynamic)), [
          [dynamic.create(string, "first"), dynamic.create(int8, 1)],
          [dynamic.create(string, "second"), dynamic.create(int8, 2)],
        ]),
        dynamic.create(array8(int8), [1, 2, 3, 4, 5, 6]),
      ],
    ]),
    bytes
  );
  console.timeEnd("dynamic write");

  console.log(await printBytes(bytes, 2));

  await bytes.goto("byte", 0);
  console.time("dynamic read");
  console.log(JSON.stringify(await dynamic.read(bytes)));
  console.timeEnd("dynamic read");

  // const artist: Artist = {
  //   // id: 2,
  //   // createdAt: new Date(),
  //   // name: "The name of the artist",
  //   test: [dynamic.create(int8, 1)],
  // };

  // const encoded = await encodeClass(Artist, artist);
  // console.log(await printBytes(encoded, 2));
  // console.dir(await decodeClass(Artist, encoded), {
  //   depth: 10,
  // });
}

main();
