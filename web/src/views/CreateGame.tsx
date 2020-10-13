import { RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import {
  useCreatePlayerMutation,
  useCreateTableMutation,
} from "../generated/graphql";

export const CreateGame: React.FC<RouteComponentProps> = () => {
  const [name, setName] = useState("");

  const [createTable] = useCreateTableMutation();
  const [createPlayer] = useCreatePlayerMutation();

  const handleSubmit = async () => {
    // Create player and receive userId in cookie
    await createPlayer({ variables: { name } });
    // Create table based off newly created cookie
    await createTable();

    setName("");
  };

  return (
    <div>
      <h1>Create Game</h1>
      <form onSubmit={(e) => e.preventDefault()}>
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
