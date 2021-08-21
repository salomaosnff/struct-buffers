import { Field, Struct } from "../decorators";
import { uint8 } from "../types";

@Struct()
export class Artist {
  @Field({ type: uint8 })
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  constructor(data: Artist) {
    Object.assign(this, data);
  }
}
