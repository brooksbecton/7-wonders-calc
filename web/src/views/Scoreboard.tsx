import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetTablePlayersQuery,
  useMyPlayerQuery,
} from "../generated/graphql";

export const Scoreboard: React.FC = () => {
  const { tableId }: { tableId: string } = useParams();
  const { data: userIdData } = useMyPlayerQuery();
  const { data, loading, error } = useGetTablePlayersQuery({
    variables: { tableId: Number(tableId) },
    pollInterval: 5000,
  });

  if (error) {
    return <p>error</p>;
  }
  if (loading) {
    return <p>...loading</p>;
  }

  return (
    <div>
      <h1>Scoreboard</h1>
      <h2>{tableId}</h2>
      <ul>
        {data?.tablesPlayers.map((player) => (
          <li key={player.id}>
            <p
              style={{
                fontWeight:
                  player.id === userIdData?.me?.id ? "bold" : "normal",
              }}
            >
              {player.name} : {player.score}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
