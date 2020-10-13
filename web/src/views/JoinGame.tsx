import { RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import {
  useCreatePlayerMutation,
  useJoinTableMutation,
} from "../generated/graphql";

export const JoinGame: React.FC<RouteComponentProps> = () => {
  const [gameId, setGameId] = useState("");
  const [name, setName] = useState("");

  const [joinTable] = useJoinTableMutation();
  const [createPlayer] = useCreatePlayerMutation();

  const handleSubmit = async () => {
    // Create player and receive userId in cookie
    const x = await createPlayer({ variables: { name } });
    console.log(x);

    // join table based off newly created cookie
    const table = await joinTable({ variables: { tableId: Number(gameId) } });
    console.log(table);

    setGameId("");
    setName("");
  };

  return (
    <div>
      <h1>Join Game</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Game ID
          <input
            onChange={(e) => setGameId(e.target.value)}
            type="text"
            placeholder="Game ID"
            value={gameId}
          />
        </label>
        <br />
        <label>
          Name
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            value={name}

          />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <br />
        <button>Cancel</button>
      </form>
    </div>
  );
};
