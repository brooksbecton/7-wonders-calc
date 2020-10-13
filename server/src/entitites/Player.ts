import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";
import { Table } from "./Table";

@ObjectType()
@Entity()
export class Player {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => Table)
  @ManyToOne({ nullable: true })
  table!: Table;

  @Field(() => String)
  @Property()
  name!: string;

  @Field(() => Int)
  @Property()
  score: number = 0;
}
