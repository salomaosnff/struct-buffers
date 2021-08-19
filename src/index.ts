import "reflect-metadata";

import { Field } from "./decorators/field";
import { Struct } from "./decorators/struct";
import { decodeClass, encodeClass, printBytes } from "./util";
import { array16, array32, array8, int8, map8, string, uint8 } from "./types";
import dynamic, { DynamicValue } from "./types/dynamic";

Error.stackTraceLimit = Infinity;

@Struct()
class Artist {
  @Field({ type: uint8 })
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

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
  const artist: Artist = {
    id: 2,
    createdAt: new Date(),
    name: "The name of the artist",
    test: [
      dynamic.create(array16(string), ["Olá"]),
      dynamic.create(int8, 1),
      dynamic.create(array32(dynamic), [
        dynamic.create(
          map8(string, int8),
          new Map([
            ["first", 1],
            ["second", 2],
          ])
        ),
      ]),
      dynamic.create(string, "Awesome string"),
    ],
  };

  const encoded = await encodeClass(Artist, artist);
  console.log(await printBytes(encoded, 2));
  console.dir(await decodeClass(Artist, encoded), {
    depth: 10,
  });
}

main();
