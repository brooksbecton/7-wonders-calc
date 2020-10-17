import { Player } from "./../entitites/Player";
import { MyContext } from "src/types";
import { Resolver, Query, Arg, Ctx, Mutation, Int } from "type-graphql";
import { Table } from "./../entitites/Table";
@Resolver()
export class PlayerResolver {
  @Query(() => Player, { nullable: true })
  async me(@Ctx() { em, req }: MyContext): Promise<Player | null> {
    if (req.session!.userId) {
      const player = await em.findOne(Player, { id: req.session!.userId });

      return player;
    } else {
      return null;
    }
  }

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
    @Ctx() { em, req }: MyContext
  ): Promise<boolean> {
    if (!req.session!.userId) {
      return false;
    }

    // A user is trying to delete themselves
    if (req.session!.userId === id) {
      try {
        await em.nativeDelete(Player, { id });
        req.session!.userId = null;
        return true;
      } catch (error) {
        return false;
      }
    }

    const userTable = await em.findOne(Table, { ownerId: req.session!.userId });

    // If the owner of a table is trying to delete one of their players
    if (userTable) {
      const usersTablePlayers = await em.find(Player, { table: userTable });
      const userTablePlayersIds = usersTablePlayers.map((p) => p.id);

      if (userTablePlayersIds.includes(id)) {
        await em.nativeDelete(Player, { id });
        req.session!.userId = null;

        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
