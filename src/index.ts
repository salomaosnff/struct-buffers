import "reflect-metadata";

import { Field } from "./decorators/field";
import { Struct } from "./decorators/struct";
import { createBytes, decodeClass, encodeClass, printBytes } from "./util";
import { Song } from "./example_structs/song";
import { array8, dynamic, int8 } from "./types";
import { writeFileSync } from "fs";

Error.stackTraceLimit = Infinity;

@Struct()
class Data {
  @Field(dynamic)
  data: any[];
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
      "Testando valor",
      [
        [[[[["array \\o/"]]]]],
        "Value?",
        {
          object: {
            with: {
              array: [
                new Map<string, any>([
                  ["map", "value"],
                  ["number?", 1],
                  ["set?", new Set(["some", "set", "here", 2, { wow: true }])],
                ]),
              ],
            },
          },
        },
      ],
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
      500000000,
    ],
  };

  const encoded = await encodeClass(Data, data);

  console.log(printBytes(encoded, 2));

  encoded.reset();

  console.dir(await decodeClass(Data, encoded), {
    depth: null,
  });

  console.log(JSON.stringify(data).length);
}

main();
