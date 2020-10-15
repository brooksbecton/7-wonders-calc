import { RouteComponentProps, useParams } from "@reach/router";
import React from "react";
import { useGetTablePlayersQuery } from "../generated/graphql";

export const Scoreboard: React.FC<RouteComponentProps> = () => {
  const { tableId }: { tableId: string } = useParams();
  const { data, loading, error } = useGetTablePlayersQuery({
    variables: { tableId: Number(tableId) },
  });

  if (error) {
    return <p>error</p>;
  }
  if (loading) {
    return <p>...loading</p>;
  }

  return (
    <div>
      <h1>Scoreboard: {tableId}</h1>
      <ul>
        {data?.tablesPlayers.map((player) => (
          <li key={player.id}>
            {player.name} : {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
};
