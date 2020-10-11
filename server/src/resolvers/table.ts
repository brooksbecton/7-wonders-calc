import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Table } from "./../entitites/Table";
import { MyContext } from "./../types";

@Resolver()
export class TableResolver {
  @Query(() => [Table])
  tables(@Ctx() { em }: MyContext): Promise<Table[]> {
    return em.find(Table, {});
  }

  @Query(() => Table, { nullable: true })
  table(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<Table | null> {
    return em.findOne(Table, { id });
  }

  @Mutation(() => Table)
  async createTable(
    @Arg("title") title: string,
    @Ctx() { em, req }: MyContext
  ): Promise<Table> {
    const newOwnerId = String(Math.random());
    const table = em.create(Table, {
      title,
      ownerId: newOwnerId,
      playerIds: [newOwnerId],
    });

    console.log("here");

    await em.persistAndFlush(table);

    req.session!.userId = newOwnerId;

    return table;
  }

  @Mutation(() => Number)
  async joinTable(
    @Arg("id") id: number,
    @Ctx() { em, req }: MyContext
  ): Promise<number> {
    req.session!.userId = String(Math.random());

    const userId = req.session!.userId;
    const targetTable = await em.findOne(Table, { id });
    const updatedTargetTablePlayerIds = [
      ...(targetTable?.playerIds ?? []),
      userId,
    ];
    const num = await em.nativeUpdate(
      Table,
      { id },
      { playerIds: updatedTargetTablePlayerIds }
    );
    return num;
  }

  @Mutation(() => Boolean)
  async deleteTable(
    @Arg("id") id: number,
    @Ctx() { em, req }: MyContext
  ): Promise<boolean> {
    try {
      const userId = req.session!.userId;
      const targetTable = await em.findOne(Table, { id });
      console.log("userId", userId);
      console.log("targetTable", targetTable);
      if (targetTable?.ownerId === userId) {
        req.session!.userId = null;
        await em.nativeDelete(Table, { id });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  //   @Mutation(() => Table, { nullable: true })
  //   async updatePost(
  //     @Arg("id") id: number,
  //     @Arg("title") title: string,
  //     @Ctx() { em }: MyContext
  //   ): Promise<Table | null> {
  //     const post = await em.findOne(Table, { id });
  //     if (!post) {
  //       return null;
  //     }
  //     if (typeof title !== "undefined") {
  //       post.title = title;
  //       await em.persistAndFlush(post);
  //     }
  //     return post;
  //   }
}
