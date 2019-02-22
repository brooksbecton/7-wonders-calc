import * as React from "react";

export const Military: React.SFC = () => {
  return (
    <>
      <p>
        Each Age ends after its sixth game turn. The players must then proceed
        with the resolution of military conflicts. Each player compares the
        total amount of shield symbols present on their military structures (red
        cards) with the total of each of their neighboring cities:
      </p>
      <ul>
        <li>
          <p>
            If a player has a higher total than that of a neighboring city, that
            player takes a Victory token corresponding to the Age which just
            ended
          </p>

          <p>(Age I: +1, Age II: +3 or Age III: +5)</p>
        </li>
        <li>
          <p>
            If a player has a lower total than that of a neighboring city, that
            player takes a Defeat token (-1 victory point)
          </p>
        </li>
        <li>
          <p>
            If a player has a total equal to that of a neighboring city, no
            tokens are taken. During each Age, each player therefore gets,
            depending on the case, 0, 1 or 2 tokens which are placed on his or
            her Wonder board.
          </p>
        </li>
      </ul>
    </>
  );
};

export default Military;
