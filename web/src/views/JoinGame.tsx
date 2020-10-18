import { RouteComponentProps, useNavigate } from "@reach/router";
import React, { useState } from "react";
import {
  useCreatePlayerMutation,
  useJoinTableMutation,
} from "../generated/graphql";
import * as store from "store";

export const JoinGame: React.FC<RouteComponentProps> = () => {
  const [gameId, setGameId] = useState("");
  const [name, setName] = useState(store.get('nickname'));

  const [joinTable] = useJoinTableMutation();
  const [createPlayer] = useCreatePlayerMutation();
  const navigate = useNavigate();



  const handleSubmit = async () => {
    // Create player and receive userId in cookie
    await createPlayer({ variables: { name } });

    // join table based off newly created cookie
    const { data } = await joinTable({
      variables: { tableId: Number(gameId) },
    });

    navigate(`scoreboard/${data?.joinTable?.id}`);

    store.set('nickname', name)
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
