import { Player } from "./../entitites/Player";
import { MyContext } from "src/types";
import { Resolver, Query, Arg, Ctx, Mutation } from "type-graphql";
import { Table } from "./../entitites/Table";
@Resolver()
export class PlayerResolver {
  @Query(() => Player, { nullable: true })
  player(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<Player | null> {
    return em.findOne(Player, { id });
  }

  @Query(() => [Player], { nullable: true })
  players(@Ctx() { em }: MyContext): Promise<Player[] | null> {
    return em.find(Player, {});
  }

  @Query(() => [Player])
  async tablesPlayers(
    @Arg("tableId") tableId: number,
    @Ctx()
    { em }: MyContext
  ): Promise<Player[] | null> {
    const targetTable = await em.findOne(Table, { id: tableId });

    return em.find(Player, { table: targetTable });
  }

  @Mutation(() => Player)
  async createPlayer(
    @Arg("name") name: string,
    @Ctx() { em, req }: MyContext
  ): Promise<Player> {
    const player = em.create(Player, {
      name,
    });

    await em.persistAndFlush(player);

    req.session!.userId = player.id;
    return player;
  }

  @Mutation(() => Boolean)
  async deletePlayer(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Player, { id });
      return true;
    } catch (error) {
      return false;
    }
  }
}
