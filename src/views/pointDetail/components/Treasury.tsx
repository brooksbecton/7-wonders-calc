import * as React from "react";

export const Treasury: React.FunctionComponent = () => {
  return (
    <>
      <p>
        For every 3 coins in their possession at the end of the game, players
        score 1 victory point. Leftover coins score no points.
      </p>

      <p>
        Example: Alexandria has finished the game with 14 coins in their
        treasury, which earns them 4 victory points (4 sets of 3 coins plus one
        partial set)
      </p>
    </>
  );
};
