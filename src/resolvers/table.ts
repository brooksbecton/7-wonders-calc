import { Player } from "./../entitites/Player";
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

  @Mutation(() => Table, { nullable: true })
  async createTable(@Ctx() { em, req }: MyContext): Promise<Table | null> {
    const userId = req.session!.userId;
    const targetPlayer = await em.findOne(Player, { id: userId });
    if (targetPlayer) {
      const table = em.create(Table, {
        ownerId: userId,
      });
      targetPlayer.table = table;
      await em.persistAndFlush(table);
      return table;
    }
    return null;
  }

  @Mutation(() => Table, { nullable: true })
  async joinTable(
    @Arg("tableId") tableId: number,
    @Ctx() { em, req }: MyContext
  ): Promise<Table | null> {
    const userId = req.session!.userId;
    const targetTable = await em.findOne(Table, { id: tableId });
    const targetPlayer = await em.findOne(Player, { id: userId });
    
    if (targetPlayer && targetTable) {
      targetPlayer.table = targetTable;

      await em.persistAndFlush(targetTable);

      return targetTable;
    }
    return null;
  }

  @Mutation(() => Boolean)
  async deleteTable(
    @Arg("id") id: number,
    @Ctx() { em, req }: MyContext
  ): Promise<boolean> {
    try {
      const userId = req.session!.userId;
      const targetTable = await em.findOne(Table, { id });

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
}
