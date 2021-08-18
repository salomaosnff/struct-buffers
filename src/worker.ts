import "reflect-metadata";
import { Field } from "./decorators/field";
import { Struct } from "./decorators/struct";
import { array16, array8, string } from "./types";
import { encodeClass, printBytes } from "./util";

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

  @Field({ type: array16(string), required: false })
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

async function encode() {
  const obj: Song = {
    id: null,
    artist: {
      createdAt: new Date(),
      id: 1,
      name: "A".repeat(1000),
    },
    bool_0: null,
    bool_1: true,
    bool_2: true,
    bool_3: false,
    bool_4: true,
    bool_5: true,
    bool_6: true,
    bool_7: true,
    title: "T".repeat(1000),
    scope: new Array(1000).fill("Test"),
  };

  console.time("encode");
  const encoded = await encodeClass(Song, obj);
  console.timeEnd("encode");
  return encoded;
}

addEventListener("message", async (msg) => {
  postMessage(await (await encode()).toBytes(), null);
});
